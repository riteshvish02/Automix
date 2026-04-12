import express from 'express';
import cors from 'cors';
import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT || 5051);

app.use(cors());
app.use(express.json());

const sessions = new Map();
const WHATSAPP_URL = 'https://web.whatsapp.com';
const SESSIONS_DIR = './sessions';
const STATE_DIR = './state';

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.mkdir(SESSIONS_DIR, { recursive: true });
    await fs.mkdir(STATE_DIR, { recursive: true });
  } catch (error) {
    console.error('[Setup] Directory creation failed:', error.message);
  }
}

ensureDirectories();

// Session management
function getSession(sessionId = 'default') {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      sessionId,
      context: null,
      page: null,
      connected: false,
      connecting: false,
      qrData: null,
      phoneNumber: '',
      lastError: null,
      loginAttempts: 0,
      stateFile: path.join(STATE_DIR, `${sessionId}.json`),
    });
  }
  return sessions.get(sessionId);
}

async function saveSessionState(session) {
  try {
    const state = {
      phoneNumber: session.phoneNumber,
      connected: session.connected,
      savedAt: new Date().toISOString(),
    };
    await fs.writeFile(session.stateFile, JSON.stringify(state, null, 2));
  } catch (error) {
    console.error(`[Session] Failed to save state:`, error.message);
  }
}

async function loadSessionState(session) {
  try {
    const data = await fs.readFile(session.stateFile, 'utf-8');
    const state = JSON.parse(data);
    session.phoneNumber = state.phoneNumber || '';
    return state;
  } catch (error) {
    return null;
  }
}

async function launchBrowser(sessionId) {
  try {
    const userDataDir = path.join(SESSIONS_DIR, `${sessionId}_data`);
    await fs.mkdir(userDataDir, { recursive: true });

    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
      viewport: { width: 1280, height: 720 },
    });

    console.log(`[Browser] Persistent context launched for ${sessionId}`);
    return context;
  } catch (error) {
    console.error('[Browser] Launch failed:', error.message);
    throw error;
  }
}

async function initializeBrowserSession(session) {
  try {
    if (!session.context) {
      session.context = await launchBrowser(session.sessionId);
    }

    if (!session.page) {
      session.page = await session.context.newPage();
    }

    session.page.setDefaultNavigationTimeout(30000);
    session.page.setDefaultTimeout(30000);

    console.log(`[Session] ${session.sessionId} page initialized`);
    return session.page;
  } catch (error) {
    console.error(`[Session] ${session.sessionId} init failed:`, error.message);
    session.lastError = {
      message: error.message,
      statusCode: 'BROWSER_INIT_FAILED',
    };
    throw error;
  }
}

async function navigateToWhatsApp(page) {
  try {
    console.log('[WhatsApp] Navigating to ' + WHATSAPP_URL);
    await page.goto(WHATSAPP_URL, { waitUntil: 'domcontentloaded' });
    
    await page.waitForTimeout(3000);
    
    console.log('[WhatsApp] Page loaded');
    return true;
  } catch (error) {
    console.error('[WhatsApp] Navigation failed:', error.message);
    throw error;
  }
}

async function captureQRCode(page) {
  try {
    const selectors = [
      '[data-testid="qrcode"] canvas',
      '[data-testid="qrcode"]',
      'canvas[aria-label*="Scan"]',
      'div[data-ref] canvas',
      'canvas',
    ];

    for (const selector of selectors) {
      const node = page.locator(selector).first();
      const visible = await node.isVisible({ timeout: 3000 }).catch(() => false);
      if (!visible) {
        continue;
      }

      await page.waitForTimeout(500);
      const qrImage = await node.screenshot();
      console.log(`[QR] QR code captured using selector: ${selector}`);
      return qrImage;
    }

    // Fallback: return full page screenshot to help diagnose selector drift.
    const pageShot = await page.screenshot({ fullPage: false });
    console.log('[QR] QR element not found, returning page screenshot fallback');
    return pageShot;
  } catch (error) {
    console.error('[QR] Failed to capture:', error.message);
    return null;
  }
}

async function checkIfLoggedIn(page) {
  try {
    const chatList = page.locator('[data-testid="chat-list"]');
    const visible = await chatList.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (visible) {
      console.log('[Status] User is logged in');
      return true;
    }

    const searchInput = page.locator('input[placeholder*="Search"]');
    const searchVisible = await searchInput.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (searchVisible) {
      console.log('[Status] User is logged in (search visible)');
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

async function waitForLogin(page, timeoutMs = 180000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeoutMs) {
    try {
      const isLoggedIn = await checkIfLoggedIn(page);
      if (isLoggedIn) {
        console.log('[Login] Connected successfully');
        return true;
      }
    } catch (error) {
      console.debug('[Login] Check error:', error.message);
    }
    
    await page.waitForTimeout(2000);
  }
  
  throw new Error('Login timeout - scan QR code with your phone');
}

async function getPhoneNumber(page) {
  try {
    // Method 1: localStorage
    const phone1 = await page.evaluate(() => {
      try {
        const data = localStorage.getItem('wa_me');
        if (data) {
          return data.replace(/\D/g, '');
        }
      } catch (e) {}
      return null;
    }).catch(() => null);
    
    if (phone1) return phone1;

    // Method 2: From chat title
    const chatTitle = await page.locator('div[role="button"]').first().textContent().catch(() => '');
    if (chatTitle && /\d+/.test(chatTitle)) {
      const numbers = chatTitle.replace(/\D/g, '');
      if (numbers.length > 6) return numbers;
    }

    return '';
  } catch (error) {
    console.error('[Phone] Failed to extract:', error.message);
    return '';
  }
}

async function sendMessage(session, phoneNumber, message) {
  try {
    if (!session.page || !session.connected) {
      return { success: false, error: 'Not connected' };
    }

    const page = session.page;

    console.log(`[Message] Sending to ${phoneNumber}`);

    // Click search
    const searchInput = page.locator('input[placeholder*="Search"], input[placeholder*="search"]').first();
    await searchInput.click().catch(() => null);
    await page.waitForTimeout(300);
    
    // Type phone
    await searchInput.fill('');
    await searchInput.fill(phoneNumber);
    
    await page.waitForTimeout(1000);

    // Click first result
    try {
      await page.locator('[role="option"]').first().click({ timeout: 5000 });
    } catch (_) {
      await page.locator('div[role="button"]').first().click().catch(() => null);
    }
    
    await page.waitForTimeout(500);

    // Find and fill message input
    const messageInput = page.locator('[contenteditable="true"]').last();
    
    await messageInput.focus();
    await messageInput.fill(message);
    
    // Send via Enter
    await messageInput.press('Enter');
    
    console.log(`[Message] Sent successfully to ${phoneNumber}`);
    return { success: true };
  } catch (error) {
    console.error('[Message] Send failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function getRecentChats(session) {
  try {
    if (!session.page || !session.connected) {
      return [];
    }

    const page = session.page;
    const chats = [];

    // Get all visible chat items
    const chatElements = page.locator('[data-testid="chat"]');
    
    try {
      const count = await chatElements.count();
      
      for (let i = 0; i < Math.min(count, 15); i++) {
        try {
          const chat = chatElements.nth(i);
          
          // Extract chat name/number
          const titleElement = chat.locator('[data-testid="cell-frame-title"]');
          const title = await titleElement.textContent().catch(() => '');
          
          // Extract last message preview
          const subtitleElement = chat.locator('[role="button"]').nth(1);
          const preview = await subtitleElement.textContent().catch(() => '');
          
          if (title && title.trim()) {
            chats.push({
              name: title.trim(),
              preview: preview ? preview.trim().substring(0, 100) : '',
              index: i,
            });
          }
        } catch (error) {
          console.debug(`[Chats] Parse error for chat ${i}:`, error.message);
        }
      }

      console.log(`[Chats] Found ${chats.length} recent chats`);
      return chats;
    } catch (error) {
      console.error('[Chats] Count failed:', error.message);
      return chats;
    }
  } catch (error) {
    console.error('[Chats] Failed:', error.message);
    return [];
  }
}

async function getContacts(session) {
  try {
    if (!session.page || !session.connected) {
      return [];
    }

    const page = session.page;
    
    // Try to open contact list
    const contactsButton = page.locator('[data-testid="menu-button"]').first();
    await contactsButton.click().catch(() => null);
    
    await page.waitForTimeout(500);
    
    const contacts = [];
    
    // Get visible contact elements
    const contactElements = page.locator('div[role="option"]');
    const count = await contactElements.count().catch(() => 0);
    
    for (let i = 0; i < Math.min(count, 20); i++) {
      try {
        const contact = contactElements.nth(i);
        const text = await contact.textContent().catch(() => '');
        
        if (text && /\d/.test(text)) {
          contacts.push({ name: text.trim() });
        }
      } catch (error) {
        console.debug(`[Contacts] Parse ${i}:`, error.message);
      }
    }

    console.log(`[Contacts] Found ${contacts.length} contacts`);
    return contacts;
  } catch (error) {
    console.error('[Contacts] Failed:', error.message);
    return [];
  }
}

// Routes
app.get('/health', (_req, res) => {
  res.json({ ok: true, port: PORT, service: 'whatsapp-playwright' });
});

app.get('/connect', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const reset = String(req.query.reset || '').toLowerCase() === 'true';
  const session = getSession(sessionId);

  // Already connected
  if (session.connected) {
    return res.json({
      success: true,
      status: 'connected',
      phoneNumber: session.phoneNumber,
      sessionId,
    });
  }

  // Currently connecting
  if (session.connecting) {
    return res.json({
      success: true,
      status: 'connecting',
      qrCode: session.qrData ? session.qrData.toString('base64') : null,
      sessionId,
    });
  }

  // Reset if requested
  if (reset) {
    await new Promise(r => setTimeout(r, 500));
    if (session.page) await session.page.close().catch(() => null);
    if (session.context) await session.context.close().catch(() => null);
    session.page = null;
    session.context = null;
    session.connected = false;
    session.connecting = false;
    session.qrData = null;
  }

  // Start new connection
  session.connecting = true;
  session.loginAttempts += 1;

  try {
    const page = await initializeBrowserSession(session);
    await navigateToWhatsApp(page);

    // If session is already authenticated, skip QR flow.
    const alreadyLoggedIn = await checkIfLoggedIn(page);
    if (alreadyLoggedIn) {
      session.connected = true;
      session.connecting = false;
      session.qrData = null;
      session.phoneNumber = await getPhoneNumber(page) || 'unknown';
      session.lastError = null;
      await saveSessionState(session);

      return res.json({
        success: true,
        status: 'connected',
        phoneNumber: session.phoneNumber,
        message: 'Session already logged in',
        sessionId,
      });
    }

    // Capture QR
    const qr = await captureQRCode(page);
    session.qrData = qr;

    if (!qr) {
      session.connecting = false;
      session.lastError = {
        message: 'QR could not be captured. Retry /connect?reset=true once.',
        statusCode: 'QR_CAPTURE_FAILED',
      };

      return res.status(500).json({
        success: false,
        status: 'qr_missing',
        error: session.lastError.message,
        sessionId,
      });
    }

    console.log(`[Connect] ${sessionId} QR ready (attempt ${session.loginAttempts})`);

    // Wait for login in background
    waitForLogin(page)
      .then(async () => {
        session.connected = true;
        session.connecting = false;
        session.qrData = null;
        session.phoneNumber = await getPhoneNumber(page) || 'unknown';
        session.lastError = null;
        await saveSessionState(session);
        console.log(`[Login] ${sessionId} success - ${session.phoneNumber}`);
      })
      .catch((error) => {
        session.connecting = false;
        session.connected = false;
        session.lastError = {
          message: error.message,
          statusCode: 'LOGIN_TIMEOUT',
        };
        console.error(`[Login] ${sessionId} failed: ${error.message}`);
      });

    return res.json({
      success: true,
      status: 'qr_ready',
      qrCode: qr ? qr.toString('base64') : null,
      message: '📱 Scan this QR code with your phone camera to login to WhatsApp',
      sessionId,
    });
  } catch (error) {
    session.connecting = false;
    session.lastError = {
      message: error.message,
      statusCode: 'CONNECTION_FAILED',
    };

    console.error(`[Connect] ${sessionId} failed:`, error.message);

    return res.status(400).json({
      success: false,
      error: error.message,
      sessionId,
    });
  }
});

app.get('/status', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const session = getSession(sessionId);

  res.json({
    success: true,
    sessionId,
    connected: session.connected,
    connecting: session.connecting,
    phoneNumber: session.phoneNumber,
    qrCode: session.qrData && !session.connected ? session.qrData.toString('base64') : null,
    loginAttempts: session.loginAttempts,
    error: session.lastError,
  });
});

app.post('/send', async (req, res) => {
  const { sessionId = 'default', phoneNumber, message } = req.body || {};
  const session = getSession(sessionId);

  if (!session.connected) {
    return res.status(400).json({ success: false, error: 'Not connected to WhatsApp' });
  }

  if (!phoneNumber || !message) {
    return res.status(400).json({ success: false, error: 'phoneNumber and message required' });
  }

  const result = await sendMessage(session, phoneNumber, message);
  
  if (result.success) {
    return res.json({ success: true, sessionId });
  } else {
    return res.status(400).json(result);
  }
});

app.get('/chats/recent', async (req, res) => {
  const sessionId = String(req.query.sessionId || 'default');
  const session = getSession(sessionId);

  if (!session.connected) {
    return res.status(400).json({ success: false, error: 'Not connected' });
  }

  const chats = await getRecentChats(session);

  res.json({
    success: true,
    sessionId,
    count: chats.length,
    chats,
  });
});

app.post('/disconnect', async (req, res) => {
  const { sessionId = 'default' } = req.body || {};
  const session = getSession(sessionId);

  try {
    if (session.page) {
      await session.page.close().catch(() => null);
    }
    if (session.context) {
      await session.context.close().catch(() => null);
    }

    session.connected = false;
    session.connecting = false;
    session.page = null;
    session.context = null;
    session.qrData = null;

    console.log(`[Disconnect] ${sessionId}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n[WhatsApp] Playwright service ready on http://localhost:${PORT}\n`);
  console.log('Quick start:');
  console.log(`  curl http://localhost:${PORT}/health`);
  console.log(`  curl http://localhost:${PORT}/connect`);
  console.log('');
});
