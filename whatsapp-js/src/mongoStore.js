import mongoose from 'mongoose';

let mongoReady = false;

const sessionStateSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    connected: { type: Boolean, default: false },
    connecting: { type: Boolean, default: false },
    connectionMode: { type: String, default: 'qr' },
    phoneNumber: { type: String, default: '' },
    reconnectAttempts: { type: Number, default: 0 },
    hasQr: { type: Boolean, default: false },
    qrUpdatedAt: { type: Date, default: null },
    qrExpiresAt: { type: Date, default: null },
    lastError: { type: mongoose.Schema.Types.Mixed, default: null },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const sessionEventSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    event: { type: String, required: true, index: true },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);

const contactSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    jid: { type: String, required: true, index: true },
    name: { type: String, default: '' },
    short: { type: String, default: '' },
    unreadCount: { type: Number, default: 0 },
    isGroup: { type: Boolean, default: false },
    sources: { type: [String], default: [] },
    lastSeenAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);

contactSchema.index({ sessionId: 1, jid: 1 }, { unique: true });

const messageSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    jid: { type: String, required: true, index: true },
    messageId: { type: String, required: true },
    senderJid: { type: String, default: '' },
    participantJid: { type: String, default: '' },
    fromMe: { type: Boolean, default: false },
    text: { type: String, default: '' },
    messageType: { type: String, default: 'unknown' },
    timestamp: { type: Date, default: Date.now, index: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);

messageSchema.index({ sessionId: 1, jid: 1, messageId: 1 }, { unique: true });

const SessionState = mongoose.models.SessionState || mongoose.model('SessionState', sessionStateSchema);
const SessionEvent = mongoose.models.SessionEvent || mongoose.model('SessionEvent', sessionEventSchema);
const SessionContact = mongoose.models.SessionContact || mongoose.model('SessionContact', contactSchema);
const SessionMessage = mongoose.models.SessionMessage || mongoose.model('SessionMessage', messageSchema);

export async function initMongo() {
  const uri = "mongodb://localhost:27017/whatsapp-js"; // You can replace this with process.env.MONGODB_URI or any other config source
  if (!uri) {
    console.log('[Mongo] MONGODB_URI not set, running without MongoDB persistence');
    return;
  }

  if (mongoReady) {
    return;
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  mongoReady = true;
  console.log('[Mongo] Connected');
}

export async function saveSessionSnapshot(snapshot) {
  if (!mongoReady) return;

  await SessionState.updateOne(
    { sessionId: snapshot.sessionId },
    {
      $set: {
        connected: Boolean(snapshot.connected),
        connecting: Boolean(snapshot.connecting),
        connectionMode: snapshot.connectionMode || 'qr',
        phoneNumber: snapshot.phoneNumber || '',
        reconnectAttempts: Number(snapshot.reconnectAttempts || 0),
        hasQr: Boolean(snapshot.hasQr),
        qrUpdatedAt: snapshot.qrUpdatedAt ? new Date(snapshot.qrUpdatedAt) : null,
        qrExpiresAt: snapshot.qrExpiresAt ? new Date(snapshot.qrExpiresAt) : null,
        lastError: snapshot.lastError || null,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );
}

export async function deleteSessionSnapshot(sessionId) {
  if (!mongoReady) return;
  await SessionState.deleteOne({ sessionId });
}

export async function saveSessionEvent(sessionId, event, details = {}) {
  if (!mongoReady) return;
  await SessionEvent.create({
    sessionId,
    event,
    details,
  });
}

export async function upsertSessionContact(sessionId, contact) {
  if (!mongoReady) return;
  if (!sessionId || !contact?.jid) return;

  const sources = Array.isArray(contact.sources)
    ? contact.sources.filter(Boolean)
    : contact.source
      ? [String(contact.source)]
      : [];

  await SessionContact.updateOne(
    { sessionId, jid: String(contact.jid) },
    {
      $set: {
        name: String(contact.name || ''),
        short: String(contact.short || String(contact.jid).split('@')[0] || ''),
        unreadCount: Number(contact.unreadCount || 0),
        isGroup: Boolean(contact.isGroup),
        lastSeenAt: contact.lastSeenAt ? new Date(contact.lastSeenAt) : new Date(),
        updatedAt: new Date(),
      },
      $addToSet: {
        sources: { $each: sources },
      },
    },
    { upsert: true }
  );
}

export async function getSessionContacts(sessionId) {
  if (!mongoReady) return [];
  if (!sessionId) return [];

  const contacts = await SessionContact.find({ sessionId })
    .sort({ isGroup: 1, updatedAt: -1 })
    .lean();

  return contacts.map((item) => ({
    jid: item.jid,
    name: item.name || '',
    short: item.short || String(item.jid || '').split('@')[0] || '',
    unreadCount: Number(item.unreadCount || 0),
    isGroup: Boolean(item.isGroup),
    sources: Array.isArray(item.sources) ? item.sources : [],
    lastSeenAt: item.lastSeenAt ? new Date(item.lastSeenAt).toISOString() : null,
  }));
}

function toDateFromTimestamp(value) {
  if (!value) {
    return new Date();
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'number') {
    return new Date(value > 1e12 ? value : value * 1000);
  }

  if (typeof value === 'object' && typeof value.toNumber === 'function') {
    const n = value.toNumber();
    return new Date(n > 1e12 ? n : n * 1000);
  }

  return new Date();
}

export async function upsertSessionMessage(sessionId, message) {
  if (!mongoReady) return;
  if (!sessionId || !message?.jid || !message?.messageId) return;

  await SessionMessage.updateOne(
    {
      sessionId,
      jid: String(message.jid),
      messageId: String(message.messageId),
    },
    {
      $set: {
        senderJid: String(message.senderJid || ''),
        participantJid: String(message.participantJid || ''),
        fromMe: Boolean(message.fromMe),
        text: String(message.text || ''),
        messageType: String(message.messageType || 'unknown'),
        timestamp: toDateFromTimestamp(message.timestamp),
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );
}

export async function getSessionMessages(sessionId, { jid, limit = 50 } = {}) {
  if (!mongoReady || !sessionId || !jid) return [];

  const safeLimit = Math.min(Math.max(Number(limit || 50), 1), 200);
  const docs = await SessionMessage.find({
    sessionId,
    jid: String(jid),
  })
    .sort({ timestamp: -1, _id: -1 })
    .limit(safeLimit)
    .lean();

  return docs
    .reverse()
    .map((item) => ({
      messageId: item.messageId,
      jid: item.jid,
      senderJid: item.senderJid || '',
      participantJid: item.participantJid || '',
      fromMe: Boolean(item.fromMe),
      text: item.text || '',
      messageType: item.messageType || 'unknown',
      timestamp: item.timestamp ? new Date(item.timestamp).toISOString() : null,
    }));
}
