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

function getRecentChats(session, options = {}) {
  const { limit = 20, includeGroups = true, includeEmpty = false } = options;
  const safeLimit = Math.min(Math.max(Number(limit || 20), 1), 200);
  const contacts = getKnownContacts(session);
  const contactByJid = new Map(contacts.map((contact) => [contact.jid, contact]));
  const incomingEntries = Array.from(session?.incomingMessages?.entries?.() || []);

  const result = incomingEntries
    .map(([jid, messages]) => {
      const list = Array.isArray(messages) ? messages : [];
      const last = list[list.length - 1] || null;
      const contact = contactByJid.get(jid) || null;
      const isGroup = Boolean(contact?.isGroup || jid.includes('-') || jid.endsWith('@g.us'));

      return {
        jid,
        name: contact?.name || contact?.short || jid.split('@')[0] || jid,
        short: contact?.short || (jid.includes('@') ? jid.split('@')[0] : jid),
        isGroup,
        unreadCount: Number(contact?.unreadCount || 0),
        messageCount: list.length,
        lastMessageId: last?.messageId || null,
        lastMessageText: String(last?.text || ''),
        lastMessageFromMe: Boolean(last?.fromMe),
        lastMessageAt: last?.timestamp ? new Date(last.timestamp).toISOString() : null,
      };
    })
    .filter((item) => includeGroups || !item.isGroup);

  if (includeEmpty) {
    for (const contact of contacts) {
      if (!includeGroups && contact.isGroup) {
        continue;
      }

      if (result.some((item) => item.jid === contact.jid)) {
        continue;
      }

      result.push({
        jid: contact.jid,
        name: contact.name || contact.short || contact.jid,
        short: contact.short,
        isGroup: Boolean(contact.isGroup),
        unreadCount: Number(contact.unreadCount || 0),
        messageCount: 0,
        lastMessageId: null,
        lastMessageText: '',
        lastMessageFromMe: false,
        lastMessageAt: null,
      });
    }
  }

  result.sort((a, b) => {
    const aTs = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
    const bTs = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
    if (aTs !== bTs) {
      return bTs - aTs;
    }

    return String(a.name || a.short || a.jid).localeCompare(String(b.name || b.short || b.jid));
  });

  return result.slice(0, safeLimit);
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

function cacheIncomingMessage(session, message) {
  if (!session?.incomingMessages || !message?.jid || !message?.messageId) {
    return;
  }

  const jid = String(message.jid);
  const list = session.incomingMessages.get(jid) || [];
  const exists = list.some((item) => item.messageId === String(message.messageId));

  if (exists) {
    return;
  }

  list.push({
    messageId: String(message.messageId),
    jid,
    senderJid: String(message.senderJid || ''),
    participantJid: String(message.participantJid || ''),
    fromMe: Boolean(message.fromMe),
    text: String(message.text || ''),
    timestamp: normalizeMessageTimestamp(message.timestamp),
    capturedAt: new Date().toISOString(),
  });

  list.sort((a, b) => a.timestamp - b.timestamp);
  if (list.length > 500) {
    list.splice(0, list.length - 500);
  }

  session.incomingMessages.set(jid, list);
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
      incomingMessages: new Map(),
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
    }

    for (const msg of historyMessages) {
      const remoteJid = msg?.key?.remoteJid || '';
      const messageId = msg?.key?.id || '';
      if (!remoteJid || !messageId) {
        continue;
      }

      cacheIncomingMessage(session, {
        messageId,
        jid: remoteJid,
        senderJid: msg?.key?.participant || remoteJid,
        participantJid: msg?.key?.participant || '',
        fromMe: Boolean(msg?.key?.fromMe),
        text: getMessageText(msg) || '',
        timestamp: msg?.messageTimestamp,
      });
    }

    seedContactIndexFromChats(session);

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
    for (const msg of payload.messages) {
      const remoteJid = msg.key.remoteJid || 'unknown';
      const senderJid = msg.key.participant || remoteJid;
      const pushName = msg.pushName || '';
      const text = getMessageText(msg) || '[media]';
      console.log(`[WhatsApp] ${remoteJid}: ${text}`);

      if (msg?.key?.id && remoteJid !== 'unknown') {
        cacheIncomingMessage(session, {
          messageId: msg.key.id,
          jid: remoteJid,
          senderJid,
          participantJid: msg.key.participant || '',
          fromMe: Boolean(msg.key.fromMe),
          text: text === '[media]' ? '' : text,
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

  logSession(sessionId, 'api:send:success', {
    jid,
    messageId: response?.key?.id || null,
  });

  return res.json({
    success: true,
    messageId: response?.key?.id || null,
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

app.get('/chats/recent', (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const targetPhoneOrJid = String(req.query.phoneNumber || req.query.jid || '').trim();
  const includeGroups = String(req.query.includeGroups || 'true').toLowerCase() !== 'false';
  const includeEmpty = String(req.query.includeEmpty || '').toLowerCase() === 'true';
  const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 200);
  const session = getSession(sessionId);

  let chats = getRecentChats(session, {
    limit,
    includeGroups,
    includeEmpty,
  });

  // If specific contact requested, filter to that one chat
  if (targetPhoneOrJid) {
    const directJid = targetPhoneOrJid.includes('@') ? targetPhoneOrJid : resolveJid(targetPhoneOrJid);
    if (!directJid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phoneNumber or jid',
      });
    }

    const digits = normalizePhoneNumber(targetPhoneOrJid);
    const knownKeys = Array.from(session.incomingMessages?.keys?.() || []);
    let resolvedJid = directJid;

    // Fallback resolution similar to /messages/incoming
    if (!session.incomingMessages?.has(resolvedJid) && digits) {
      const byDigits = knownKeys.find((key) => key.includes(digits));
      if (byDigits) {
        resolvedJid = byDigits;
      }
    }

    if (!session.incomingMessages?.has(resolvedJid) && digits && session.phoneNumber) {
      const isSelfQuery = String(session.phoneNumber).replace(/\D/g, '') === digits;
      if (isSelfQuery) {
        const selfLid = knownKeys.find((key) => String(key).endsWith('@lid'));
        if (selfLid) {
          resolvedJid = selfLid;
        }
      }
    }

    chats = chats.filter((chat) => chat.jid === resolvedJid || chat.jid === directJid);

    if (chats.length === 0) {
      logSession(sessionId, 'api:recentChats:forContact:notFound', {
        target: targetPhoneOrJid,
        resolvedJid,
        knownKeys: knownKeys.slice(0, 5),
      });
    }
  }

  logSession(sessionId, 'api:recentChats', {
    limit,
    includeGroups,
    includeEmpty,
    filterByContact: Boolean(targetPhoneOrJid),
    returned: chats.length,
    incomingBuckets: Array.from(session.incomingMessages?.keys?.() || []).length,
  });

  return res.json({
    success: true,
    sessionId,
    filterBy: targetPhoneOrJid || 'all',
    count: chats.length,
    chats,
  });
});

app.get('/messages/incoming', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const rawTarget = String(req.query.jid || req.query.phoneNumber || '').trim();
  const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
  const session = getSession(sessionId);

  if (!rawTarget) {
    return res.status(400).json({
      success: false,
      error: 'jid or phoneNumber is required',
    });
  }

  const directJid = rawTarget.includes('@') ? rawTarget : resolveJid(rawTarget);
  if (!directJid) {
    return res.status(400).json({
      success: false,
      error: 'Invalid jid or phoneNumber',
    });
  }

  const digits = normalizePhoneNumber(rawTarget);
  const knownKeys = Array.from(session.incomingMessages?.keys?.() || []);
  let resolvedJid = directJid;

  if (!session.incomingMessages?.has(resolvedJid) && digits) {
    const byDigits = knownKeys.find((key) => key.includes(digits));
    if (byDigits) {
      resolvedJid = byDigits;
    }
  }

  if (!session.incomingMessages?.has(resolvedJid) && digits) {
    const contacts = getKnownContacts(session);
    const contactMatch = contacts.find(
      (contact) => contact.short === digits || contact.short.endsWith(digits) || contact.jid.includes(digits)
    );

    if (contactMatch?.jid && session.incomingMessages?.has(contactMatch.jid)) {
      resolvedJid = contactMatch.jid;
    }
  }

  if (!session.incomingMessages?.has(resolvedJid) && session.connected && session.sock) {
    try {
      const result = await session.sock.onWhatsApp(directJid);
      const record = Array.isArray(result) ? result[0] : null;
      const resolvedFromWhatsApp = record?.jid ? String(record.jid) : '';

      if (resolvedFromWhatsApp && session.incomingMessages?.has(resolvedFromWhatsApp)) {
        resolvedJid = resolvedFromWhatsApp;
      }
    } catch (error) {
      logSession(sessionId, 'api:messagesIncoming:resolveFailed', {
        message: error instanceof Error ? error.message : 'unknown error',
      });
    }
  }

  // When querying own phone number, incoming events can be keyed under LID JID.
  if (!session.incomingMessages?.has(resolvedJid) && digits && session.phoneNumber) {
    const isSelfQuery = String(session.phoneNumber).replace(/\D/g, '') === digits;
    if (isSelfQuery) {
      const selfLid = knownKeys.find((key) => String(key).endsWith('@lid'));
      if (selfLid) {
        resolvedJid = selfLid;
      }
    }
  }

  const all = Array.isArray(session.incomingMessages?.get(resolvedJid))
    ? session.incomingMessages.get(resolvedJid)
    : [];
  const messages = all.slice(-limit).map((item) => ({
    messageId: item.messageId,
    jid: item.jid,
    senderJid: item.senderJid,
    participantJid: item.participantJid,
    fromMe: Boolean(item.fromMe),
    text: item.text || '',
    timestamp: item.timestamp ? new Date(item.timestamp).toISOString() : null,
    capturedAt: item.capturedAt || null,
  }));

  return res.json({
    success: true,
    sessionId,
    query: rawTarget,
    jid: resolvedJid,
    queriedJid: directJid,
    count: messages.length,
    messages,
    cachedChats: knownKeys.length,
    cachePreview: knownKeys.slice(0, 10),
  });
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
