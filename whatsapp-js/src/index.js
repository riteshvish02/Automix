import express from 'express';
import cors from 'cors';
import QRCode from 'qrcode';
import { access, readdir, rm } from 'fs/promises';
import {
  deleteSessionSnapshot,
  getSessionContacts,
  initMongo,
  saveSessionEvent,
  saveSessionSnapshot,
  upsertSessionContact,
} from './mongoStore.js';

const app = express();
const PORT = Number(process.env.PORT || 5050);
const AUTH_ROOT = process.env.AUTH_ROOT || './auth';

app.use(cors());
app.use(express.json());

const sessions = new Map();

function createEmptyContactRecord(jid) {
  const short = jid.includes('@') ? jid.split('@')[0] : jid;
  return {
    jid,
    short,
    names: new Set(),
    unreadCount: 0,
    isGroup: jid.includes('-') || jid.endsWith('@g.us'),
    sources: new Set(),
    lastSeenAt: new Date().toISOString(),
  };
}

function createEmptyChatRecord(jid) {
  return {
    jid,
    name: jid.includes('@') ? jid.split('@')[0] : jid,
    unreadCount: 0,
    isGroup: jid.includes('-') || jid.endsWith('@g.us'),
    lastMessage: null,
    sources: new Set(),
    lastSeenAt: new Date().toISOString(),
  };
}

function upsertContact(session, { jid, name, unreadCount, isGroup, source = 'unknown' }, options = {}) {
  const { persist = true } = options;

  if (!jid) {
    return;
  }

  if (!session.contactIndex) {
    session.contactIndex = new Map();
  }

  const existing = session.contactIndex.get(jid) || createEmptyContactRecord(jid);

  if (name) {
    existing.names.add(String(name).trim());
  }

  if (typeof unreadCount === 'number') {
    existing.unreadCount = unreadCount;
  }

  if (typeof isGroup === 'boolean') {
    existing.isGroup = isGroup;
  }

  existing.sources.add(source);
  existing.lastSeenAt = new Date().toISOString();
  session.contactIndex.set(jid, existing);

  if (persist && session?.sessionId) {
    const serialized = serializeContactRecord(existing);
    void upsertSessionContact(session.sessionId, {
      ...serialized,
      source,
      sources: serialized.sources,
    }).catch((error) => {
      console.error('[Mongo] Failed to save contact:', error?.message || error);
    });
  }
}

function upsertChat(session, { jid, name, unreadCount, isGroup, lastMessage, source = 'unknown' }) {
  if (!jid) {
    return;
  }

  if (!session.chatIndex) {
    session.chatIndex = new Map();
  }

  const existing = session.chatIndex.get(jid) || createEmptyChatRecord(jid);

  if (name) {
    existing.name = String(name).trim();
  }

  if (typeof unreadCount === 'number') {
    existing.unreadCount = unreadCount;
  }

  if (typeof isGroup === 'boolean') {
    existing.isGroup = isGroup;
  }

  if (lastMessage) {
    existing.lastMessage = lastMessage;
  }

  existing.sources.add(source);
  existing.lastSeenAt = new Date().toISOString();
  session.chatIndex.set(jid, existing);
}

function hydrateSessionContacts(session) {
  if (!session || session.contactsHydrated || session.contactsHydrating) {
    return;
  }

  session.contactsHydrating = true;

  void getSessionContacts(session.sessionId)
    .then((contacts) => {
      for (const contact of contacts) {
        upsertContact(
          session,
          {
            jid: contact.jid,
            name: contact.name || contact.short,
            unreadCount: Number(contact.unreadCount || 0),
            isGroup: Boolean(contact.isGroup),
            source: 'mongo.restore',
          },
          { persist: false }
        );
      }

      session.contactsHydrated = true;
      if (contacts.length > 0) {
        logSession(session.sessionId, 'contacts:hydratedFromMongo', { count: contacts.length });
      }
    })
    .catch((error) => {
      console.error('[Mongo] Failed to load contacts:', error?.message || error);
    })
    .finally(() => {
      session.contactsHydrating = false;
    });
}

function seedContactIndexFromChats(session) {
  if (!session?.sock) {
    return;
  }

  const chats = getChatsArray(session.sock);
  for (const chat of chats) {
    const jid = chat.id || '';
    const name = chat.name || chat.notify || '';
    upsertContact(session, {
      jid,
      name,
      unreadCount: Number(chat.unreadCount || 0),
      isGroup: jid.includes('-') || jid.endsWith('@g.us'),
      source: 'chat',
    });
  }
}

function seedChatIndexFromChats(session) {
  if (!session?.sock) {
    return;
  }

  const chats = getChatsArray(session.sock);
  for (const chat of chats) {
    const jid = chat.id || '';
    upsertChat(session, {
      jid,
      name: chat.name || chat.notify || chat.subject || '',
      unreadCount: Number(chat.unreadCount || 0),
      isGroup: jid.includes('-') || jid.endsWith('@g.us'),
      lastMessage: chat.lastMessage || null,
      source: 'chat',
    });
  }
}

function serializeContactRecord(item) {
  const names = Array.from(item.names || []);
  const displayName = names.find((value) => value && value.length > 0) || item.short;

  return {
    jid: item.jid,
    name: displayName,
    short: item.short,
    unreadCount: Number(item.unreadCount || 0),
    isGroup: Boolean(item.isGroup),
    sources: Array.from(item.sources || []),
    lastSeenAt: item.lastSeenAt || null,
  };
}

function getKnownContacts(session) {
  seedContactIndexFromChats(session);

  const contacts = Array.from((session.contactIndex || new Map()).values())
    .map((item) => serializeContactRecord(item))
    .sort((a, b) => {
      if (a.isGroup !== b.isGroup) {
        return Number(a.isGroup) - Number(b.isGroup);
      }

      return String(a.name || a.short || a.jid).localeCompare(String(b.name || b.short || b.jid));
    });

  return contacts;
}

function getSearchScore(candidate, query, digitsQuery) {
  const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const tokenize = (value) =>
    String(value || '')
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .map((token) => token.trim())
      .filter(Boolean);

  const name = normalize(candidate.name);
  const jid = normalize(candidate.jid);
  const short = normalize(candidate.short);
  const cleanQuery = normalize(query);
  const cleanDigitsQuery = normalize(digitsQuery);
  const nameTokens = tokenize(candidate.name);

  if (cleanDigitsQuery && short === cleanDigitsQuery) {
    return 100;
  }

  if (cleanDigitsQuery && short.includes(cleanDigitsQuery)) {
    return 92;
  }

  if (name === cleanQuery || short === cleanQuery) {
    return 95;
  }

  if (nameTokens.some((token) => token === cleanQuery)) {
    return 90;
  }

  if (name.startsWith(cleanQuery) || short.startsWith(cleanQuery)) {
    return 85;
  }

  if (nameTokens.some((token) => token.startsWith(cleanQuery))) {
    return 80;
  }

  if (jid.includes(cleanQuery) || name.includes(cleanQuery) || short.includes(cleanQuery)) {
    return 70;
  }

  return 0;
}

function getMessageText(msg) {
  if (!msg?.message) {
    return '';
  }

  const content = msg.message;
  return (
    content.conversation ||
    content.extendedTextMessage?.text ||
    content.imageMessage?.caption ||
    content.videoMessage?.caption ||
    content.documentMessage?.caption ||
    content.buttonsResponseMessage?.selectedDisplayText ||
    content.listResponseMessage?.title ||
    ''
  );
}

function getMessageType(msg) {
  const content = msg?.message;
  if (!content || typeof content !== 'object') {
    return 'unknown';
  }

  const keys = Object.keys(content);
  return keys.length > 0 ? keys[0] : 'unknown';
}

function normalizeMessageTimestamp(input) {
  if (!input) {
    return Date.now();
  }

  if (typeof input === 'number') {
    return input > 1e12 ? input : input * 1000;
  }

  if (typeof input === 'object' && typeof input.toNumber === 'function') {
    const n = input.toNumber();
    return n > 1e12 ? n : n * 1000;
  }

  const n = Number(input);
  if (!Number.isNaN(n) && Number.isFinite(n)) {
    return n > 1e12 ? n : n * 1000;
  }

  return Date.now();
}

function cacheMessage(session, message) {
  if (!session?.messageCache || !message?.jid || !message?.messageId) {
    return;
  }

  const jid = String(message.jid);
  const existing = session.messageCache.get(jid) || [];
  const foundIndex = existing.findIndex((item) => item.messageId === message.messageId);

  const normalized = {
    messageId: String(message.messageId),
    jid,
    senderJid: String(message.senderJid || ''),
    participantJid: String(message.participantJid || ''),
    fromMe: Boolean(message.fromMe),
    text: String(message.text || ''),
    messageType: String(message.messageType || 'unknown'),
    timestamp: normalizeMessageTimestamp(message.timestamp),
  };

  if (foundIndex >= 0) {
    existing[foundIndex] = normalized;
  } else {
    existing.push(normalized);
  }

  existing.sort((a, b) => a.timestamp - b.timestamp);
  if (existing.length > 500) {
    existing.splice(0, existing.length - 500);
  }

  session.messageCache.set(jid, existing);
}

function buildSessionSnapshot(session) {
  return {
    sessionId: session.sessionId,
    connected: Boolean(session.connected),
    connecting: Boolean(session.connecting),
    connectionMode: session.connectionMode || 'qr',
    phoneNumber: session.phoneNumber || '',
    reconnectAttempts: Number(session.reconnectAttempts || 0),
    hasQr: Boolean(session.lastQr),
    qrUpdatedAt: session.qrUpdatedAt,
    qrExpiresAt: session.qrExpiresAt,
    lastError: session.lastError || null,
  };
}

function persistSession(session) {
  void saveSessionSnapshot(buildSessionSnapshot(session)).catch((error) => {
    console.error('[Mongo] Failed to save session snapshot:', error?.message || error);
  });
}

function getSession(sessionId = 'default') {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      sessionId,
      sock: null,
      connecting: false,
      connected: false,
      connectionMode: 'qr',
      pairingCode: '',
      pairingRequested: false,
      rawQr: '',
      lastQr: '',
      qrUpdatedAt: null,
      qrExpiresAt: null,
      phoneNumber: '',
      lastError: null,
      reconnectAttempts: 0,
      qrTimeoutId: null,
      authDir: `${AUTH_ROOT}/${sessionId}`,
      contactIndex: new Map(),
      chatIndex: new Map(),
      messageCache: new Map(),
      contactsHydrated: false,
      contactsHydrating: false,
    });
  }

  const session = sessions.get(sessionId);
  hydrateSessionContacts(session);
  return session;
}

function logSession(sessionId, event, details = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[WhatsApp][${timestamp}][${sessionId}] ${event}`, details);
  void saveSessionEvent(sessionId, event, details).catch((error) => {
    console.error('[Mongo] Failed to save session event:', error?.message || error);
  });
}

function normalizePhoneNumber(input) {
  if (!input) return '';
  
  let value = String(input).trim();
  
  // Remove common formatting: spaces, dashes, parentheses, dots
  value = value.replace(/[\s\-().]/g, '');
  
  // Remove + prefix if present (will be added back if needed)
  value = value.replace(/^\+/, '');
  
  // Extract only digits
  const digits = value.replace(/\D/g, '');
  
  // WhatsApp requires at least 7 digits (some short codes), but typically 10-15 for real numbers
  if (digits.length < 7) {
    return '';
  }
  
  // If no country code detected (less than 10 digits), assume US (+1)
  // This is a fallback; ideally the client should send full E.164 format
  if (digits.length < 10 && !value.startsWith('1')) {
    return '1' + digits;
  }
  
  return digits;
}

function resolveJid(input) {
  const value = String(input || '').trim();
  if (!value) {
    return null;
  }

  if (value.includes('@s.whatsapp.net') || value.includes('@g.us') || value.includes('@broadcast')) {
    return value;
  }

  const digits = normalizePhoneNumber(value);
  if (!digits) {
    return null;
  }

  return `${digits}@s.whatsapp.net`;
}

function resolveTargetJid(session, input) {
  const value = String(input || '').trim();
  if (!value) {
    return null;
  }

  if (value.includes('@s.whatsapp.net') || value.includes('@g.us') || value.includes('@broadcast')) {
    return value;
  }

  const digits = normalizePhoneNumber(value);
  if (!digits) {
    return resolveJid(value);
  }

  const contacts = getKnownContacts(session);
  const exactMatch = contacts.find((contact) => contact.short === digits || contact.jid === `${digits}@s.whatsapp.net`);
  if (exactMatch) {
    return exactMatch.jid;
  }

  const suffixMatch = contacts.find((contact) => contact.short.endsWith(digits) || contact.jid.includes(digits));
  if (suffixMatch) {
    return suffixMatch.jid;
  }

  return resolveJid(value);
}

function buildLastMessageFromChat(chat, jid) {
  const lastMessage = chat?.lastMessage;
  if (!lastMessage?.key?.id) {
    return null;
  }

  return {
    messageId: String(lastMessage.key.id),
    jid,
    senderJid: String(lastMessage.key.participant || lastMessage.key.remoteJid || jid || ''),
    participantJid: String(lastMessage.key.participant || ''),
    fromMe: Boolean(lastMessage.key.fromMe),
    text: getMessageText(lastMessage) || '',
    messageType: getMessageType(lastMessage),
    timestamp: normalizeMessageTimestamp(lastMessage.messageTimestamp),
  };
}

function getChatsArray(sock) {
  if (!sock?.chats) {
    return [];
  }

  // Baileys chat store can be an array or a KeyedDB-like object.
  if (Array.isArray(sock.chats)) {
    return sock.chats;
  }

  if (typeof sock.chats.all === 'function') {
    return sock.chats.all();
  }

  return [];
}

async function hasExistingAuth(sessionId) {
  const authDir = `${AUTH_ROOT}/${sessionId}`;

  try {
    await access(authDir);
    const entries = await readdir(authDir);
    return entries.includes('creds.json');
  } catch {
    return false;
  }
}

async function bootstrapSavedSessions() {
  try {
    const entries = await readdir(AUTH_ROOT, { withFileTypes: true });
    const sessionIds = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

    if (sessionIds.length === 0) {
      logSession('system', 'bootstrap:noAuthSessionsFound', { authRoot: AUTH_ROOT });
      return;
    }

    for (const sessionId of sessionIds) {
      const hasAuth = await hasExistingAuth(sessionId);
      if (!hasAuth) {
        continue;
      }

      const session = getSession(sessionId);
      logSession(sessionId, 'bootstrap:resumeScheduled', {
        connectionMode: session.connectionMode,
      });

      if (!session.connected && !session.connecting && !session.sock) {
        void createSocket(session);
      }
    }
  } catch (error) {
    logSession('system', 'bootstrap:error', {
      message: error instanceof Error ? error.message : 'unknown error',
    });
  }
}

async function clearSession(sessionId, deleteAuth = false) {
  const session = getSession(sessionId);

  logSession(sessionId, 'clearSession:start', {
    deleteAuth,
    connected: session.connected,
    connecting: session.connecting,
    connectionMode: session.connectionMode,
  });

  if (session.qrTimeoutId) {
    clearTimeout(session.qrTimeoutId);
    session.qrTimeoutId = null;
  }

  if (session.sock) {
    try {
      await session.sock.logout();
    } catch (error) {
      console.error('[WhatsApp] logout error:', error);
    }
  }

  sessions.delete(sessionId);
  void deleteSessionSnapshot(sessionId).catch((error) => {
    console.error('[Mongo] Failed to delete session snapshot:', error?.message || error);
  });

  if (deleteAuth) {
    try {
      await rm(session.authDir, { recursive: true, force: true });
      logSession(sessionId, 'clearSession:authRemoved', { authDir: session.authDir });
    } catch (error) {
      console.error('[WhatsApp] failed to remove auth dir:', error);
    }
  }

  logSession(sessionId, 'clearSession:done', { deleteAuth });
}

async function createSocket(session) {
  if (session.connecting) {
    logSession(session.sessionId, 'createSocket:skipAlreadyConnecting');
    return session.sock;
  }

  logSession(session.sessionId, 'createSocket:start', {
    authDir: session.authDir,
    connectionMode: session.connectionMode,
    phoneNumber: session.phoneNumber,
    reconnectAttempts: session.reconnectAttempts,
  });

  session.connecting = true;
  session.lastError = null;
  session.reconnectAttempts += 1;
  session.pairingCode = '';
  session.pairingRequested = false;
  persistSession(session);

  const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    Browsers,
    DisconnectReason,
  } = await import('@whiskeysockets/baileys');

  const { state, saveCreds } = await useMultiFileAuthState(session.authDir);
  const { version } = await fetchLatestBaileysVersion();

  logSession(session.sessionId, 'createSocket:versionResolved', { version });

  const sock = makeWASocket({
    auth: state,
    version,
    browser: Browsers.macOS('Desktop'),
    syncFullHistory: true,
    generateHighQualityLinkPreview: false,
    markOnlineOnConnect: false,
    defaultQueryTimeoutMs: 10000,
  });

  session.sock = sock;
  logSession(session.sessionId, 'socket:created', {
    registered: Boolean(sock.authState?.creds?.registered),
    connectionMode: session.connectionMode,
  });
  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('contacts.upsert', (contacts) => {
    for (const contact of contacts || []) {
      const jid = contact.id || contact.jid || '';
      const displayName = contact.name || contact.notify || contact.pushName || contact.verifiedName || '';
      upsertContact(session, {
        jid,
        name: displayName,
        source: 'contacts.upsert',
      });
    }

    seedContactIndexFromChats(session);
  });

  sock.ev.on('chats.upsert', (chats) => {
    for (const chat of chats || []) {
      const jid = chat.id || '';
      const displayName = chat.name || chat.notify || chat.subject || '';
      upsertContact(session, {
        jid,
        name: displayName,
        unreadCount: Number(chat.unreadCount || 0),
        isGroup: jid.includes('-') || jid.endsWith('@g.us'),
        source: 'chats.upsert',
      });
      upsertChat(session, {
        jid,
        name: displayName,
        unreadCount: Number(chat.unreadCount || 0),
        isGroup: jid.includes('-') || jid.endsWith('@g.us'),
        lastMessage: chat.lastMessage || null,
        source: 'chats.upsert',
      });
    }

    logSession(session.sessionId, 'chats:upsert', { count: chats?.length || 0 });
  });

  sock.ev.on('chats.update', (updates) => {
    for (const update of updates || []) {
      const jid = update.id || '';
      const displayName = update.name || update.notify || update.subject || '';
      if (jid) {
        upsertContact(session, {
          jid,
          name: displayName,
          unreadCount: typeof update.unreadCount === 'number' ? update.unreadCount : undefined,
          isGroup: jid.includes('-') || jid.endsWith('@g.us'),
          source: 'chats.update',
        });
        upsertChat(session, {
          jid,
          name: displayName,
          unreadCount: typeof update.unreadCount === 'number' ? update.unreadCount : undefined,
          isGroup: jid.includes('-') || jid.endsWith('@g.us'),
          lastMessage: update.lastMessage || null,
          source: 'chats.update',
        });
      }
    }

    logSession(session.sessionId, 'chats:update', { count: updates?.length || 0 });
  });

  sock.ev.on('contacts.update', (updates) => {
    for (const update of updates || []) {
      const jid = update.id || '';
      const displayName = update.notify || update.name || update.verifiedName || '';
      if (jid) {
        upsertContact(session, {
          jid,
          name: displayName,
          source: 'contacts.update',
        });
      }
    }

    logSession(session.sessionId, 'contacts:update', { count: updates?.length || 0 });
  });

  sock.ev.on('messaging-history.set', (payload) => {
    const historyContacts = Array.isArray(payload?.contacts) ? payload.contacts : [];
    const historyChats = Array.isArray(payload?.chats) ? payload.chats : [];
    const historyMessages = Array.isArray(payload?.messages) ? payload.messages : [];

    for (const contact of historyContacts) {
      const jid = contact.id || contact.jid || '';
      const displayName = contact.notify || contact.name || contact.verifiedName || '';
      upsertContact(session, {
        jid,
        name: displayName,
        source: 'history.contacts',
      });
    }

    for (const chat of historyChats) {
      const jid = chat.id || '';
      const displayName = chat.name || chat.notify || chat.subject || '';
      upsertContact(session, {
        jid,
        name: displayName,
        unreadCount: Number(chat.unreadCount || 0),
        isGroup: jid.includes('-') || jid.endsWith('@g.us'),
        source: 'history.chats',
      });
      upsertChat(session, {
        jid,
        name: displayName,
        unreadCount: Number(chat.unreadCount || 0),
        isGroup: jid.includes('-') || jid.endsWith('@g.us'),
        lastMessage: chat.lastMessage || null,
        source: 'history.chats',
      });
    }

    for (const msg of historyMessages) {
      const remoteJid = msg?.key?.remoteJid || '';
      const messageId = msg?.key?.id || '';
      if (!remoteJid || !messageId) {
        continue;
      }

      const senderJid = msg?.key?.participant || remoteJid;
      const text = getMessageText(msg);
      const messageType = getMessageType(msg);

      cacheMessage(session, {
        jid: remoteJid,
        messageId,
        senderJid,
        participantJid: msg?.key?.participant || '',
        fromMe: Boolean(msg?.key?.fromMe),
        text: text || '',
        messageType,
        timestamp: msg?.messageTimestamp,
      });
    }

    seedContactIndexFromChats(session);
    seedChatIndexFromChats(session);

    logSession(session.sessionId, 'history:set', {
      contacts: historyContacts.length,
      chats: historyChats.length,
      messages: historyMessages.length,
      indexSize: session.contactIndex ? session.contactIndex.size : 0,
    });
  });

  const clearQrTimer = () => {
    if (session.qrTimeoutId) {
      clearTimeout(session.qrTimeoutId);
      session.qrTimeoutId = null;
    }
  };

  const scheduleQrExpiry = () => {
    clearQrTimer();
    logSession(session.sessionId, 'qr:expiryScheduled', { expiresInMs: 60000 });
    session.qrTimeoutId = setTimeout(() => {
      if (session.connected) {
        return;
      }

      session.lastError = {
        message: 'QR expired before scan completed',
        statusCode: 'QR_EXPIRED',
        loggedOut: false,
      };
      session.rawQr = '';
      session.lastQr = '';
      session.qrUpdatedAt = null;
      session.qrExpiresAt = null;
      persistSession(session);

      logSession(session.sessionId, 'qr:expired', { reconnectAttempts: session.reconnectAttempts });

      try {
        sock.end(new Error('QR expired'));
      } catch (error) {
        console.error('[WhatsApp] failed to close expired QR socket:', error);
      }

      session.sock = null;
      session.connecting = false;

      setTimeout(() => {
        const current = getSession(session.sessionId);
        if (!current.connected && !current.connecting) {
          void createSocket(current);
        }
      }, 2000);
    }, 60000);
  };

  const requestPairingCodeIfNeeded = async () => {
    if (session.connectionMode !== 'pairing') {
      return;
    }

    if (session.pairingRequested || session.connected || session.sock !== sock) {
      return;
    }

    const phoneNumber = normalizePhoneNumber(session.phoneNumber);
    if (!phoneNumber || sock.authState.creds.registered) {
      return;
    }

    session.pairingRequested = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (session.sock !== sock || session.connected) {
        return;
      }

      const code = await sock.requestPairingCode(phoneNumber);
      session.pairingCode = code;
      session.rawQr = '';
      session.lastQr = '';
      session.qrUpdatedAt = new Date().toISOString();
      session.qrExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      console.log(`[WhatsApp] pairing code generated for ${session.sessionId}: ${code}`);
      persistSession(session);
    } catch (error) {
      session.pairingRequested = false;
      session.lastError = {
        message: error instanceof Error ? error.message : 'Failed to request pairing code',
        statusCode: 'PAIRING_CODE_FAILED',
        loggedOut: false,
      };
      console.error('[WhatsApp] pairing code request failed:', error);
    }
  };

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    logSession(session.sessionId, 'connection.update', {
      connection,
      hasQr: Boolean(qr),
      statusCode: lastDisconnect?.error?.output?.statusCode,
    });

    if (qr && session.connectionMode === 'qr') {
      session.rawQr = qr;
      session.lastQr = await QRCode.toDataURL(qr);
      session.qrUpdatedAt = new Date().toISOString();
      session.qrExpiresAt = new Date(Date.now() + 60000).toISOString();
      logSession(session.sessionId, 'qr:generated', {
        qrUpdatedAt: session.qrUpdatedAt,
        qrExpiresAt: session.qrExpiresAt,
      });
      scheduleQrExpiry();
    }

    if (connection === 'open') {
      clearQrTimer();
      session.connected = true;
      session.connecting = false;
      session.lastError = null;
      session.pairingRequested = false;
      session.pairingCode = '';
      session.rawQr = '';
      session.lastQr = '';
      session.qrUpdatedAt = null;
      session.qrExpiresAt = null;
      session.reconnectAttempts = 0;
      const jid = sock.user?.id || '';
      session.phoneNumber = jid.includes(':') ? jid.split(':')[0] : jid || session.phoneNumber;
      persistSession(session);

      setTimeout(() => {
        seedContactIndexFromChats(session);
        seedChatIndexFromChats(session);
        logSession(session.sessionId, 'connection:seededContactIndex', {
          indexSize: session.contactIndex ? session.contactIndex.size : 0,
        });
      }, 2000);

      logSession(session.sessionId, 'connection:open', {
        jid,
        phoneNumber: session.phoneNumber,
      });
      return;
    }

    if (connection === 'close') {
      clearQrTimer();
      session.connected = false;
      session.connecting = false;
      session.pairingRequested = false;
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const isLogout = statusCode === DisconnectReason.loggedOut;
      session.lastError = {
        message: lastDisconnect?.error?.message || 'Connection closed',
        statusCode,
        loggedOut: isLogout,
      };

      logSession(session.sessionId, 'connection:close', {
        statusCode,
        loggedOut: isLogout,
        message: session.lastError.message,
      });

      session.sock = null;
      session.rawQr = '';
      session.lastQr = '';
      session.qrUpdatedAt = null;
      session.qrExpiresAt = null;
      persistSession(session);

      if (!isLogout) {
        setTimeout(() => {
          const current = getSession(session.sessionId);
          if (!current.connected && !current.connecting) {
            logSession(session.sessionId, 'connection:reconnectQueued', { delayMs: 5000 });
            void createSocket(current);
          }
        }, 5000);
      }
    }
  });

  sock.ev.on('messages.upsert', (payload) => {
    if (payload.type !== 'notify') {
      return;
    }

    for (const msg of payload.messages) {
      const remoteJid = msg.key.remoteJid || 'unknown';
      const senderJid = msg.key.participant || remoteJid;
      const pushName = msg.pushName || '';
      const text = getMessageText(msg) || '[media]';
      const messageType = getMessageType(msg);
      console.log(`[WhatsApp] ${remoteJid}: ${text}`);

      if (remoteJid !== 'unknown' && msg?.key?.id) {
        cacheMessage(session, {
          jid: remoteJid,
          messageId: msg.key.id,
          senderJid,
          participantJid: msg.key.participant || '',
          fromMe: Boolean(msg.key.fromMe),
          text: text === '[media]' ? '' : text,
          messageType,
          timestamp: msg.messageTimestamp,
        });
      }

      upsertContact(session, {
        jid: remoteJid,
        name: pushName,
        isGroup: remoteJid.includes('-') || remoteJid.endsWith('@g.us'),
        source: 'message',
      });

      if (senderJid && senderJid !== remoteJid) {
        upsertContact(session, {
          jid: senderJid,
          name: pushName,
          isGroup: false,
          source: 'participant',
        });
      }
    }
  });

  void requestPairingCodeIfNeeded();

  session.connecting = false;
  logSession(session.sessionId, 'createSocket:ready');
  return sock;
}

app.get('/health', (_req, res) => {
  console.log('[WhatsApp][health] requested');
  res.json({ ok: true });
});

app.get('/connect', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const session = getSession(sessionId);
  const phoneNumber = typeof req.query.phoneNumber === 'string' ? req.query.phoneNumber : '';
  const mode = typeof req.query.mode === 'string' ? req.query.mode : 'qr';
  const shouldReset = String(req.query.reset || '').toLowerCase() === 'true';

  logSession(sessionId, 'api:connect', {
    phoneNumber,
    mode,
    shouldReset,
    connected: session.connected,
    connecting: session.connecting,
  });

  if (shouldReset) {
    await clearSession(sessionId, true);
  }

  const current = getSession(sessionId);
  current.connectionMode = mode === 'pairing' ? 'pairing' : 'qr';
  current.phoneNumber = phoneNumber || current.phoneNumber;

  if (current.connected) {
    logSession(sessionId, 'api:connect:alreadyConnected', { phoneNumber: current.phoneNumber });
    return res.json({
      success: true,
      status: 'connected',
      connectionMode: current.connectionMode,
      phoneNumber: current.phoneNumber,
    });
  }

  if (!current.sock && !current.connecting) {
    logSession(sessionId, 'api:connect:createSocketTriggered', { connectionMode: current.connectionMode });
    await createSocket(current);
  }

  return res.json({
    success: true,
    status: current.connecting ? 'connecting' : 'waiting_for_qr',
    connectionMode: current.connectionMode,
    pairingCode: current.pairingCode || '',
    rawQr: current.rawQr || '',
    qrCode: current.lastQr || '',
    qrUpdatedAt: current.qrUpdatedAt,
    qrExpiresAt: current.qrExpiresAt,
    reconnectAttempts: current.reconnectAttempts,
    phoneNumber: current.phoneNumber,
    error: current.lastError,
  });
});

app.post('/connect/qr', async (req, res) => {
  const { sessionId = 'default', phoneNumber = '' } = req.body || {};

  logSession(sessionId, 'api:connectQr', { phoneNumber });

  await clearSession(sessionId, true);

  const session = getSession(sessionId);
  session.connectionMode = 'qr';
  session.phoneNumber = phoneNumber;

  await createSocket(session);

  logSession(sessionId, 'api:connectQr:started', {
    phoneNumber: session.phoneNumber,
    qrReady: Boolean(session.lastQr),
  });

  return res.json({
    success: true,
    status: 'connecting',
    connectionMode: session.connectionMode,
    pairingCode: session.pairingCode || '',
    rawQr: session.rawQr || '',
    qrCode: session.lastQr || '',
    qrUpdatedAt: session.qrUpdatedAt,
    qrExpiresAt: session.qrExpiresAt,
    reconnectAttempts: session.reconnectAttempts,
    phoneNumber: session.phoneNumber,
  });
});

app.post('/connect/pairing', async (req, res) => {
  const { sessionId = 'default', phoneNumber = '' } = req.body || {};

  logSession(sessionId, 'api:connectPairing', { phoneNumber });

  await clearSession(sessionId, true);

  const session = getSession(sessionId);
  session.connectionMode = 'pairing';
  session.phoneNumber = phoneNumber;

  await createSocket(session);

  logSession(sessionId, 'api:connectPairing:started', {
    phoneNumber: session.phoneNumber,
  });

  return res.json({
    success: true,
    status: 'connecting',
    connectionMode: session.connectionMode,
    pairingCode: session.pairingCode || '',
    rawQr: session.rawQr || '',
    qrCode: session.lastQr || '',
    qrUpdatedAt: session.qrUpdatedAt,
    qrExpiresAt: session.qrExpiresAt,
    reconnectAttempts: session.reconnectAttempts,
    phoneNumber: session.phoneNumber,
  });
});

app.get('/status', (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const session = getSession(sessionId);

  logSession(sessionId, 'api:status', {
    connected: session.connected,
    connecting: session.connecting,
    connectionMode: session.connectionMode,
    hasQr: Boolean(session.lastQr),
    pairingCodeReady: Boolean(session.pairingCode),
  });
  res.json({
    success: true,
    connected: session.connected,
    connecting: session.connecting,
    connectionMode: session.connectionMode,
    pairingCode: session.pairingCode || '',
    rawQr: session.rawQr || '',
    phoneNumber: session.phoneNumber,
    qrCode: session.lastQr || '',
    qrUpdatedAt: session.qrUpdatedAt,
    qrExpiresAt: session.qrExpiresAt,
    reconnectAttempts: session.reconnectAttempts,
    error: session.lastError,
  });
});

app.post('/send', async (req, res) => {
  const { sessionId = 'default', phoneNumber, message } = req.body || {};
  const session = getSession(sessionId);

  logSession(sessionId, 'api:send', {
    phoneNumber,
    messageLength: String(message || '').length,
    connected: session.connected,
  });

  if (!phoneNumber || !message) {
    return res.status(400).json({ success: false, error: 'phoneNumber and message are required' });
  }

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  const jid = resolveJid(phoneNumber);
  if (!jid) {
    return res.status(400).json({ success: false, error: 'Invalid WhatsApp ID or phone number' });
  }

  const response = await session.sock.sendMessage(jid, { text: String(message) });

  if (response?.key?.id) {
    cacheMessage(session, {
      jid,
      messageId: response.key.id,
      senderJid: session.sock.user?.id || '',
      participantJid: '',
      fromMe: true,
      text: String(message),
      messageType: 'conversation',
      timestamp: Date.now(),
    });
  }

  logSession(sessionId, 'api:send:success', {
    jid,
    messageId: response?.key?.id || null,
  });

  return res.json({
    success: true,
    messageId: response?.key?.id || null,
  });
});

app.post('/send/media', async (req, res) => {
  const {
    sessionId = 'default',
    to,
    type = 'image',
    url,
    caption = '',
    fileName = 'file',
    mimetype,
  } = req.body || {};

  const session = getSession(sessionId);

  logSession(sessionId, 'api:sendMedia', {
    to,
    type,
    hasUrl: Boolean(url),
    connected: session.connected,
  });

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  const jid = resolveJid(to);
  if (!jid) {
    return res.status(400).json({ success: false, error: 'Invalid recipient (to)' });
  }

  if (!url) {
    return res.status(400).json({ success: false, error: 'url is required' });
  }

  let content;
  if (type === 'video') {
    content = { video: { url: String(url) }, caption: String(caption || '') };
  } else if (type === 'document') {
    content = {
      document: { url: String(url) },
      fileName: String(fileName || 'file'),
      mimetype: mimetype ? String(mimetype) : undefined,
      caption: String(caption || ''),
    };
  } else {
    content = { image: { url: String(url) }, caption: String(caption || '') };
  }

  try {
    const response = await session.sock.sendMessage(jid, content);
    logSession(sessionId, 'api:sendMedia:success', { jid, type, messageId: response?.key?.id || null });
    return res.json({ success: true, messageId: response?.key?.id || null });
  } catch (error) {
    logSession(sessionId, 'api:sendMedia:error', { message: error instanceof Error ? error.message : 'unknown error' });
    return res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Failed to send media' });
  }
});

app.post('/send/location', async (req, res) => {
  const { sessionId = 'default', to, latitude, longitude, name, address } = req.body || {};
  const session = getSession(sessionId);

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  const jid = resolveJid(to);
  if (!jid) {
    return res.status(400).json({ success: false, error: 'Invalid recipient (to)' });
  }

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ success: false, error: 'latitude and longitude must be numbers' });
  }

  const response = await session.sock.sendMessage(jid, {
    location: {
      degreesLatitude: latitude,
      degreesLongitude: longitude,
      name: name ? String(name) : undefined,
      address: address ? String(address) : undefined,
    },
  });

  return res.json({ success: true, messageId: response?.key?.id || null });
});

app.post('/send/contact', async (req, res) => {
  const { sessionId = 'default', to, displayName, waid, phone, org = '' } = req.body || {};
  const session = getSession(sessionId);

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  const jid = resolveJid(to);
  const cleanWaid = normalizePhoneNumber(waid || phone);

  if (!jid) {
    return res.status(400).json({ success: false, error: 'Invalid recipient (to)' });
  }

  if (!displayName || !cleanWaid) {
    return res.status(400).json({ success: false, error: 'displayName and waid/phone are required' });
  }

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${displayName}`,
    org ? `ORG:${org};` : '',
    `TEL;type=CELL;type=VOICE;waid=${cleanWaid}:+${cleanWaid}`,
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\n');

  const response = await session.sock.sendMessage(jid, {
    contacts: {
      displayName: String(displayName),
      contacts: [{ vcard }],
    },
  });

  return res.json({ success: true, messageId: response?.key?.id || null });
});

app.get('/profile', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const jid = resolveJid(req.query.jid || req.query.phoneNumber || '');
  const session = getSession(sessionId);

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  if (!jid) {
    return res.status(400).json({ success: false, error: 'jid or phoneNumber is required' });
  }

  try {
    const [existsInfo] = await session.sock.onWhatsApp(jid);
    const status = await session.sock.fetchStatus(jid).catch(() => null);
    const profilePictureUrl = await session.sock.profilePictureUrl(jid, 'image').catch(() => null);

    return res.json({
      success: true,
      jid,
      exists: Boolean(existsInfo?.exists),
      resolvedJid: existsInfo?.jid || jid,
      profilePictureUrl,
      status: status?.status || null,
      setAt: status?.setAt || null,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch profile' });
  }
});

app.post('/presence', async (req, res) => {
  const { sessionId = 'default', to, presence = 'available' } = req.body || {};
  const session = getSession(sessionId);

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  const jid = resolveJid(to);
  if (!jid) {
    return res.status(400).json({ success: false, error: 'Invalid recipient (to)' });
  }

  await session.sock.sendPresenceUpdate(String(presence), jid);
  return res.json({ success: true });
});

app.post('/messages/read', async (req, res) => {
  const { sessionId = 'default', keys = [] } = req.body || {};
  const session = getSession(sessionId);

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  if (!Array.isArray(keys) || keys.length === 0) {
    return res.status(400).json({ success: false, error: 'keys array is required' });
  }

  await session.sock.readMessages(keys);
  return res.json({ success: true });
});

app.get('/messages', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const rawTarget = String(req.query.phoneNumber || req.query.jid || req.query.to || '').trim();
  const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 200);
  const session = getSession(sessionId);

  if (!rawTarget) {
    return res.status(400).json({
      success: false,
      error: 'phoneNumber or jid is required',
    });
  }

  const jid = resolveTargetJid(session, rawTarget);
  if (!jid) {
    return res.status(400).json({ success: false, error: 'Invalid phoneNumber/jid' });
  }

  let cached = Array.isArray(session.messageCache?.get(jid)) ? session.messageCache.get(jid) : [];

  if (cached.length === 0 && session?.sock) {
    const chats = getChatsArray(session.sock);
    const chat = chats.find((item) => item.id === jid || item.jid === jid);

    if (chat?.lastMessage) {
      const preview = buildLastMessageFromChat(chat, jid);
      cached = preview ? [preview] : [];
    }
  }

  const messages = cached.slice(-limit).map((item) => ({
    messageId: item.messageId,
    jid: item.jid,
    senderJid: item.senderJid,
    participantJid: item.participantJid,
    fromMe: Boolean(item.fromMe),
    text: item.text || '',
    messageType: item.messageType || 'unknown',
    timestamp: item.timestamp ? new Date(item.timestamp).toISOString() : null,
  }));

  return res.json({
    success: true,
    sessionId,
    jid,
    count: messages.length,
    messages,
    source: (session.messageCache?.get(jid)?.length || 0) > 0 ? 'cache' : 'chat-preview',
  });
});

app.post('/message/edit', async (req, res) => {
  const { sessionId = 'default', to, messageId, text } = req.body || {};
  const session = getSession(sessionId);

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  const jid = resolveJid(to);
  if (!jid || !messageId || !text) {
    return res.status(400).json({ success: false, error: 'to, messageId and text are required' });
  }

  const response = await session.sock.sendMessage(jid, {
    text: String(text),
    edit: { id: String(messageId), remoteJid: jid, fromMe: true },
  });

  return res.json({ success: true, messageId: response?.key?.id || null });
});

app.post('/message/delete', async (req, res) => {
  const { sessionId = 'default', to, messageId, fromMe = true, participant } = req.body || {};
  const session = getSession(sessionId);

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  const jid = resolveJid(to);
  if (!jid || !messageId) {
    return res.status(400).json({ success: false, error: 'to and messageId are required' });
  }

  await session.sock.sendMessage(jid, {
    delete: {
      id: String(messageId),
      remoteJid: jid,
      fromMe: Boolean(fromMe),
      participant: participant ? String(participant) : undefined,
    },
  });

  return res.json({ success: true });
});

app.get('/chats', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const session = getSession(sessionId);

  logSession(sessionId, 'api:chats', {
    connected: session.connected,
    hasSocket: Boolean(session.sock),
  });

  if (session.connected && session.sock) {
    seedChatIndexFromChats(session);
  }

  const result = Array.from((session.chatIndex || new Map()).values())
    .map((chat) => ({
      jid: chat.jid,
      name: chat.name || chat.jid.split('@')[0],
      unreadCount: Number(chat.unreadCount || 0),
      isGroup: Boolean(chat.isGroup),
      lastMessage: chat.lastMessage
        ? {
            messageId: chat.lastMessage.key?.id || null,
            fromMe: Boolean(chat.lastMessage.key?.fromMe),
            text: getMessageText(chat.lastMessage) || '',
            messageType: getMessageType(chat.lastMessage),
            timestamp: chat.lastMessage.messageTimestamp ? new Date(normalizeMessageTimestamp(chat.lastMessage.messageTimestamp)).toISOString() : null,
          }
        : null,
      sources: Array.from(chat.sources || []),
      lastSeenAt: chat.lastSeenAt || null,
    }))
    .sort((a, b) => {
      if (a.isGroup !== b.isGroup) {
        return Number(a.isGroup) - Number(b.isGroup);
      }

      const aTime = a.lastMessage?.timestamp ? Date.parse(a.lastMessage.timestamp) : 0;
      const bTime = b.lastMessage?.timestamp ? Date.parse(b.lastMessage.timestamp) : 0;
      if (aTime !== bTime) {
        return bTime - aTime;
      }

      return String(a.name || a.jid).localeCompare(String(b.name || b.jid));
    });

  logSession(sessionId, 'api:chats:success', { count: result.length });

  return res.json({ success: true, chats: result });
});

app.get('/contacts/search', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const rawQuery = String(req.query.q || req.query.query || req.query.phoneNumber || '').trim();
  const query = rawQuery.toLowerCase();
  const digitsQuery = normalizePhoneNumber(rawQuery);
  const limit = Math.min(Number(req.query.limit || 20), 100);
  const includeGroups = String(req.query.includeGroups || 'true').toLowerCase() !== 'false';
  const onlyWithNames = String(req.query.onlyWithNames || '').toLowerCase() === 'true';
  const minScore = Math.min(Math.max(Number(req.query.minScore || 1), 1), 100);
  const includeScore = String(req.query.includeScore || '').toLowerCase() === 'true';
  const session = getSession(sessionId);

  logSession(sessionId, 'api:contactsSearch', {
    query,
    limit,
    includeGroups,
    onlyWithNames,
    minScore,
    connected: session.connected,
  });

  if (!query) {
    return res.status(400).json({
      success: false,
      error: 'Query parameter q is required',
      hint: 'Use q, query, or phoneNumber. Example: /contacts/search?q=ritesh',
    });
  }

  seedContactIndexFromChats(session);

  if (digitsQuery && session.connected && session.sock) {
    const probableJid = `${digitsQuery}@s.whatsapp.net`;
    try {
      const result = await session.sock.onWhatsApp(probableJid);
      const record = Array.isArray(result) ? result[0] : null;
      if (record?.exists) {
        upsertContact(session, {
          jid: record.jid || probableJid,
          name: digitsQuery,
          isGroup: false,
          source: 'resolve',
        });
      }
    } catch (error) {
      logSession(sessionId, 'api:contactsSearch:resolveFailed', {
        message: error instanceof Error ? error.message : 'unknown error',
      });
    }
  }

  const candidates = getKnownContacts(session)
    .filter((item) => includeGroups || !item.isGroup)
    .filter((item) => !onlyWithNames || (item.name && item.name !== item.short))
    .map((item) => ({
    ...item,
    score: getSearchScore(item, query, digitsQuery),
    }));

  const matched = candidates
    .filter((item) => item.score >= minScore)
    .sort((a, b) => b.score - a.score || b.unreadCount - a.unreadCount)
    .slice(0, limit)
    .map((item) => {
      if (includeScore) {
        return item;
      }

      const { score, ...rest } = item;
      return rest;
    });

  logSession(sessionId, 'api:contactsSearch:success', { count: matched.length });

  return res.json({
    success: true,
    query,
    count: matched.length,
    contacts: matched,
  });
});

app.get('/contacts/all', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const refresh = String(req.query.refresh || '').toLowerCase() === 'true';
  const includeGroups = String(req.query.includeGroups || 'true').toLowerCase() !== 'false';
  const onlyWithNames = String(req.query.onlyWithNames || '').toLowerCase() === 'true';
  const session = getSession(sessionId);

  logSession(sessionId, 'api:contactsAll', {
    connected: session.connected,
    hasSocket: Boolean(session.sock),
    refresh,
    includeGroups,
    onlyWithNames,
  });

  if (refresh && session.connected && session.sock) {
    seedContactIndexFromChats(session);
  }

  let contacts = getKnownContacts(session);

  if (!includeGroups) {
    contacts = contacts.filter((contact) => !contact.isGroup);
  }

  if (onlyWithNames) {
    contacts = contacts.filter((contact) => Boolean(contact.name && contact.name !== contact.short));
  }

  logSession(sessionId, 'api:contactsAll:response', {
    totalBefore: session.contactIndex ? session.contactIndex.size : 0,
    totalAfter: contacts.length,
    hadFilter: !includeGroups || onlyWithNames,
  });

  return res.json({
    success: true,
    count: contacts.length,
    contacts,
  });
});

app.get('/contacts/debug', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const session = getSession(sessionId);

  logSession(sessionId, 'api:contactsDebug', {
    connected: session.connected,
    hasSocket: Boolean(session.sock),
  });

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  seedContactIndexFromChats(session);

  const index = session.contactIndex || new Map();
  const contacts = Array.from(index.values());
  const sourceBreakdown = {};

  for (const contact of contacts) {
    for (const source of contact.sources || []) {
      sourceBreakdown[source] = (sourceBreakdown[source] || 0) + 1;
    }
  }

  const contactsWithMeta = contacts.map((item) => {
    const names = Array.from(item.names || []);
    return {
      jid: item.jid,
      short: item.short,
      names: names.length > 0 ? names : ['<no-name>'],
      unreadCount: item.unreadCount || 0,
      isGroup: item.isGroup,
      sources: Array.from(item.sources || []),
      lastSeenAt: item.lastSeenAt,
    };
  });

  return res.json({
    success: true,
    indexSize: contacts.length,
    sourceBreakdown,
    chatsArraySize: getChatsArray(session.sock).length,
    sockChatsType: session.sock?.chats ? typeof session.sock.chats : 'none',
    contacts: contactsWithMeta.slice(0, 100),
  });
});

app.get('/contacts/resolve', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const phoneNumber = String(req.query.phoneNumber || '');
  const session = getSession(sessionId);

  logSession(sessionId, 'api:contactsResolve', {
    phoneNumber,
    connected: session.connected,
  });

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  const jid = resolveJid(phoneNumber);
  if (!jid) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid phoneNumber', 
      hint: 'Send in E.164 format (e.g., +1234567890) or at least 7 digits' 
    });
  }

  try {
    const result = await session.sock.onWhatsApp(jid);
    const record = Array.isArray(result) ? result[0] : null;

    if (record?.exists) {
      upsertContact(session, {
        jid: record.jid || jid,
        name: phoneNumber,
        isGroup: false,
        source: 'resolve',
      });
    }

    logSession(sessionId, 'api:contactsResolve:success', {
      phoneNumber,
      exists: Boolean(record?.exists),
    });

    return res.json({
      success: true,
      input: phoneNumber,
      jid,
      exists: Boolean(record?.exists),
      resolvedJid: record?.jid || null,
      added: Boolean(record?.exists),
    });
  } catch (error) {
    logSession(sessionId, 'api:contactsResolve:error', {
      message: error instanceof Error ? error.message : 'unknown error',
    });
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to resolve number',
    });
  }
});

app.post('/contacts/lookup', async (req, res) => {
  const { sessionId = 'default', phoneNumber = '' } = req.body || {};
  const session = getSession(sessionId);

  logSession(sessionId, 'api:contactsLookup', {
    phoneNumber,
    connected: session.connected,
  });

  if (!session.connected || !session.sock) {
    return res.status(400).json({ success: false, error: 'WhatsApp is not connected' });
  }

  if (!phoneNumber) {
    return res.status(400).json({ 
      success: false, 
      error: 'phoneNumber is required',
      hint: 'Send in E.164 format (e.g., +1234567890) or at least 7 digits'
    });
  }

  const jid = resolveJid(phoneNumber);
  if (!jid) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid phoneNumber format',
      hint: 'Send in E.164 format (e.g., +1234567890) or at least 7 digits',
      received: phoneNumber
    });
  }

  try {
    const result = await session.sock.onWhatsApp(jid);
    const record = Array.isArray(result) ? result[0] : null;
    const exists = Boolean(record?.exists);

    if (exists) {
      upsertContact(session, {
        jid: record.jid || jid,
        name: phoneNumber,
        isGroup: false,
        source: 'lookup',
      });

      logSession(sessionId, 'api:contactsLookup:added', {
        jid: record.jid || jid,
        phoneNumber,
      });

      return res.json({
        success: true,
        phoneNumber,
        jid: record.jid || jid,
        exists: true,
        added: true,
        message: 'Contact added to your index',
      });
    }

    logSession(sessionId, 'api:contactsLookup:notFound', { phoneNumber });
    return res.status(404).json({
      success: false,
      error: 'Phone number is not on WhatsApp',
      phoneNumber,
      jid,
    });
  } catch (error) {
    logSession(sessionId, 'api:contactsLookup:error', {
      message: error instanceof Error ? error.message : 'unknown error',
    });
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to lookup contact',
    });
  }
});

app.post('/disconnect', async (req, res) => {
  const { sessionId = 'default' } = req.body || {};
  logSession(sessionId, 'api:disconnect');
  await clearSession(sessionId, false);
  logSession(sessionId, 'api:disconnect:done');
  return res.json({ success: true });
});

app.post('/reset', async (req, res) => {
  const { sessionId = 'default' } = req.body || {};
  logSession(sessionId, 'api:reset');
  await clearSession(sessionId, true);
  logSession(sessionId, 'api:reset:done');
  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`WhatsApp service running on http://localhost:${PORT}`);
  void initMongo().catch((error) => {
    console.error('[Mongo] Connection failed:', error?.message || error);
  });
  void bootstrapSavedSessions();
});
