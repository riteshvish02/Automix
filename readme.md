[
  {
    "toolName": "docs_create_document",
    "args": {
      "title": "My New Document"
    }
  },
  {
    "toolName": "docs_get_document",
    "args": {
      "documentId": "YOUR_DOCUMENT_ID"
    }
  },
  {
    "toolName": "docs_update_document",
    "args": {
      "documentId": "YOUR_DOCUMENT_ID",
      "requests": [
        {
          "insertText": {
            "location": { "index": 1 },
            "text": "Hello, world!"
          }
        }
      ]
    }
  },
  {
    "toolName": "docs_list_documents",
    "args": {
      "pageSize": 10
    }
  }
]


[
  {
    "toolName": "sheets_create_spreadsheet",
    "args": {
      "title": "My Test Spreadsheet"
    }
  },
  {
    "toolName": "sheets_get_spreadsheet",
    "args": {
      "spreadsheetId": "YOUR_SPREADSHEET_ID"
    }
  },
  {
    "toolName": "sheets_append_row",
    "args": {
      "spreadsheetId": "YOUR_SPREADSHEET_ID",
      "range": "Sheet1!A1",
      "values": [
        ["Value 1", "Value 2", "Value 3"]
      ]
    }
  }
]