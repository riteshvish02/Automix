# WhatsApp JS Service

Standalone Baileys-based WhatsApp service with no database.

Optional: enable MongoDB persistence for session snapshots and debug events by setting `MONGODB_URI`.

## Run

```bash
cd whatsapp-js
npm install
npm run dev
```

Server runs on `http://localhost:5050`

## Optional MongoDB

Set this environment variable before running:

```bash
MONGODB_URI=mongodb://localhost:27017/whatsapp_js
```

## Endpoints

### Session Management
- `GET /health` - Server health check
- `GET /connect?sessionId=default` - Start new WhatsApp connection
- `GET /status?sessionId=default` - Get session status
- `POST /disconnect` - Disconnect session

### Messaging
- `POST /send` - Send a message
- `GET /chats?sessionId=default` - Get all chats
- `GET /messages?sessionId=default&phoneNumber=919...&limit=50` - Get conversation messages for a contact

### Contacts
- `GET /contacts/all?sessionId=default` - Get all contacts
- `GET /contacts/search?sessionId=default&q=name` - Search contacts
- `GET /contacts/resolve?sessionId=default&phoneNumber=919...` - Check if number exists on WhatsApp
- `POST /contacts/lookup` - Lookup and add a contact

`/contacts/search` supports:
- `q` or `query` or `phoneNumber` (required)
- `limit` (default `20`, max `100`)
- `includeGroups=true|false` (default `true`)
- `onlyWithNames=true|false` (default `false`)
- `minScore=1..100` (default `1`)
- `includeScore=true|false` (default `false`)

## Example Requests

### Send Message
```json
{
  "sessionId": "default",
  "phoneNumber": "919876543210",
  "message": "hello"
}
```

### Lookup Contact
```bash
curl -X POST http://localhost:5050/contacts/lookup \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "919329586707"}'
```

### Search Contacts
```bash
curl "http://localhost:5050/contacts/search?sessionId=default&q=ritesh&limit=20"
```

```bash
curl "http://localhost:5050/contacts/search?sessionId=default&phoneNumber=9198765&includeScore=true"
```

### Read Messages By Contact
```bash
curl "http://localhost:5050/messages?sessionId=default&phoneNumber=9329586707&limit=50"
```

Supported formats:
- E.164: `+1234567890`
- Formatted: `(123) 456-7890`
- Digits only: `1234567890` (assumes US if <10 digits)
