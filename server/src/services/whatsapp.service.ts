import { prisma } from '../config/prisma';
import { ErrorHandler } from '../utils/ErrorHandler';
import QRCode from 'qrcode';

// Store active WhatsApp connections in memory (use Redis in production)
const activeConnections: Map<string, any> = new Map();

/**
 * Initialize WhatsApp connection for a user
 * Returns QR code data URL for scanning
 */
export const initWhatsAppConnection = async (userId: string): Promise<{ qrCode: string; status: string }> => {
  try {
    // Check if user already has credentials
    const existing = await prisma.whatsAppCredentials.findUnique({
      where: { userId },
    });

    // If already connected, return existing connection info
    if (existing?.isConnected) {
      return {
        qrCode: existing.connectionQR || '',
        status: 'already_connected',
      };
    }

    // Start Baileys connection in the background (fire and forget)
    // Don't wait for it to complete
    setImmediate(() => {
      connectBaileysSock(userId).catch((error) => {
        console.error(`[WhatsApp] Error initializing Baileys for user ${userId}:`, error);
      });
    });

    // Return immediately - client will poll for QR code
    return {
      qrCode: '',
      status: 'waiting_for_qr',
    };
  } catch (error) {
    console.error('WhatsApp init error:', error);
    throw new ErrorHandler('Failed to initialize WhatsApp connection', 500);
  }
};

/**
 * Connect to WhatsApp using Baileys
 * This is called internally and manages the full connection lifecycle
 */
async function connectBaileysSock(userId: string) {
  try {
    const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers } = await import('@whiskeysockets/baileys');
    
    // Load existing auth state if available
    const existing = await prisma.whatsAppCredentials.findUnique({
      where: { userId },
    });

    const { state, saveCreds } = await useMultiFileAuthState(`./auth/whatsapp-${userId}`);

    // If we have saved auth state, restore it
    if (existing?.authState && typeof existing.authState === 'object' && existing.authState !== null) {
      try {
        const savedState = existing.authState as any;
        if (savedState.creds) {
          state.creds = savedState.creds;
        }
        if (savedState.keys) {
          state.keys = savedState.keys;
        }
      } catch (error) {
        console.warn('Failed to restore saved auth state:', error);
      }
    }

    console.log(`[WhatsApp] Initializing socket for user ${userId}...`);

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      browser: Browsers.macOS('Desktop'),
      generateHighQualityLinkPreview: false,
      retryRequestDelayMs: 10_000,
      shouldIgnoreJid: () => false,
      maxMsToWaitForConnection: 15000, // Wait max 15 seconds for each connection attempt
    });

    let qrGenerated = false;
    let connectionAttempted = false;

    // Handle QR code generation
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      // Log all connection updates for debugging
      if (connection || qr) {
        console.log(`[WhatsApp] Connection update for user ${userId}: ${connection || 'waiting_for_qr'}`, 
          qr ? '(QR available)' : '');
      }

      if (qr && !qrGenerated) {
        qrGenerated = true;
        connectionAttempted = true;
        // Generate QR code data URL
        try {
          console.log(`[WhatsApp] QR code generated for user ${userId}`);
          const qrDataUrl = await QRCode.toDataURL(qr);
          
          // Save QR to database
          await prisma.whatsAppCredentials.upsert({
            where: { userId },
            update: {
              connectionQR: qrDataUrl,
              isConnected: false,
            },
            create: {
              userId,
              connectionQR: qrDataUrl,
              isConnected: false,
              authState: {},
            },
          });

          console.log(`[WhatsApp QR] User ${userId}: QR code generated. Waiting for scan...`);
        } catch (error) {
          console.error('QR code generation failed:', error);
        }
      }

      if (connection === 'open') {
        // Successfully connected
        const jid = sock.user?.id;
        const phoneNumber = jid?.split(':')[0];

        // Save auth state credentials
        const authState = {
          creds: state.creds,
          keys: state.keys,
        };

        await prisma.whatsAppCredentials.upsert({
          where: { userId },
          update: {
            isConnected: true,
            phoneNumber: phoneNumber || null,
            authState: authState as any,
          },
          create: {
            userId,
            isConnected: true,
            phoneNumber: phoneNumber || null,
            authState: authState as any,
          },
        });

        // Store active connection
        activeConnections.set(userId, sock);
        console.log(`[WhatsApp] ✅ User ${userId} connected with number: ${phoneNumber}`);
      }

      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error as any)?.output?.statusCode !== DisconnectReason.loggedOut;
        const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
        
        if (shouldReconnect) {
          // Attempt reconnect with exponential backoff
          const retryDelay = Math.min(30000, 3000 + Math.random() * 3000);
          console.log(`[WhatsApp] ⚠️  User ${userId} disconnected (status: ${statusCode}). Retrying in ${Math.round(retryDelay)}ms...`);
          setTimeout(() => connectBaileysSock(userId), retryDelay);
        } else {
          // User logged out
          await prisma.whatsAppCredentials.updateMany({
            where: { userId },
            data: { isConnected: false },
          });
          activeConnections.delete(userId);
          console.log(`[WhatsApp] 🚫 User ${userId} logged out`);
        }
      }
    });

    // Handle connection errors specifically
    sock.ev.on('CB:action', (e: any) => {
      if (e?.type === 'action' && e?.action === 'stream.error') {
        console.error(`[WhatsApp] Stream error for user ${userId}:`, e);
      }
    });

    // Handle credential updates - save immediately
    sock.ev.on('creds.update', async () => {
      try {
        await saveCreds();
        
        // Also update our database with the latest auth state
        await prisma.whatsAppCredentials.updateMany({
          where: { userId },
          data: {
            authState: {
              creds: state.creds,
              keys: state.keys,
            } as any,
          },
        });
      } catch (error) {
        console.error('Failed to save credentials:', error);
      }
    });

    // Handle incoming messages (optional - for receiving messages)
    sock.ev.on('messages.upsert', async (m) => {
      if (m.type === 'notify') {
        for (const msg of m.messages) {
          console.log(`[WhatsApp Msg] From ${msg.key.remoteJid}: ${msg.message?.conversation || 'media'}`);
          // You can process incoming messages here
        }
      }
    });

  } catch (error) {
    console.error(`[WhatsApp] ❌ Baileys error for user ${userId}:`, error);
    throw error;
  }
}

/**
 * Send a message via WhatsApp
 */
export const sendWhatsAppMessage = async (
  userId: string,
  phoneNumber: string,
  message: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    // Get active connection or reconnect
    let sock = activeConnections.get(userId);

    if (!sock) {
      const creds = await prisma.whatsAppCredentials.findUnique({
        where: { userId },
      });

      if (!creds?.isConnected) {
        throw new ErrorHandler('WhatsApp not connected. Please scan QR code first.', 400);
      }

      // Reconnect if connection was lost
      await connectBaileysSock(userId);
      sock = activeConnections.get(userId);
    }

    if (!sock) {
      throw new ErrorHandler('Failed to establish WhatsApp connection', 500);
    }

    // Format phone number: 91 for India, add country code if missing
    const jid = phoneNumber.includes('@')
      ? phoneNumber
      : `${phoneNumber}@s.whatsapp.net`;

    // Send message
    const response = await sock.sendMessage(jid, { text: message });

    return {
      success: true,
      messageId: response.key.id,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to send message';
    console.error('Send message error:', error);
    return {
      success: false,
      error: errorMsg,
    };
  }
};

/**
 * Get all chats for a user
 */
export const getWhatsAppChats = async (userId: string): Promise<any[]> => {
  try {
    let sock = activeConnections.get(userId);

    if (!sock) {
      const creds = await prisma.whatsAppCredentials.findUnique({
        where: { userId },
      });

      if (!creds?.isConnected) {
        return [];
      }

      // Reconnect if needed
      await connectBaileysSock(userId);
      sock = activeConnections.get(userId);
    }

    if (!sock) {
      return [];
    }

    // Get all chats
    const chats = sock.chats || [];

    return chats.map((chat: any) => ({
      jid: chat.id,
      name: chat.name || chat.id.split('@')[0],
      unreadCount: chat.unreadCount || 0,
      lastMessage: chat.lastMessage || null,
      isGroup: chat.id.includes('-'),
    }));
  } catch (error) {
    console.error('Get chats error:', error);
    return [];
  }
};

/**
 * Disconnect WhatsApp
 */
export const disconnectWhatsApp = async (userId: string): Promise<{ success: boolean }> => {
  try {
    const sock = activeConnections.get(userId);

    if (sock) {
      await sock.logout();
      activeConnections.delete(userId);
    }

    await prisma.whatsAppCredentials.updateMany({
      where: { userId },
      data: {
        isConnected: false,
        authState: {},
      },
    });

    console.log(`[WhatsApp] User ${userId} disconnected`);
    return { success: true };
  } catch (error) {
    console.error('Disconnect error:', error);
    throw new ErrorHandler('Failed to disconnect WhatsApp', 500);
  }
};

/**
 * Get WhatsApp connection status
 */
export const getWhatsAppStatus = async (userId: string): Promise<{
  isConnected: boolean;
  phoneNumber?: string;
  qrCode?: string;
}> => {
  try {
    const creds = await prisma.whatsAppCredentials.findUnique({
      where: { userId },
    });

    if (!creds) {
      return { isConnected: false };
    }

    return {
      isConnected: creds.isConnected,
      phoneNumber: creds.phoneNumber || undefined,
      qrCode: creds.connectionQR || undefined,
    };
  } catch (error) {
    console.error('Get status error:', error);
    throw new ErrorHandler('Failed to get WhatsApp status', 500);
  }
};

export default {
  initWhatsAppConnection,
  sendWhatsAppMessage,
  getWhatsAppChats,
  disconnectWhatsApp,
  getWhatsAppStatus,
};
