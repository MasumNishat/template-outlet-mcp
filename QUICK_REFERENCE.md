# Template Outlet MCP Server - Quick Reference Card

## 🚀 Installation

```bash
# For end users (after npm publish)
npm install -g @masum/template-outlet-mcp

# For local development (current setup)
cd mcp-server && npm link
```

## ⚙️ Configuration

Add to `.mcp.json`:

```json
{
  "mcpServers": {
    "template-outlet": {
      "command": "template-outlet-mcp"
    }
  }
}
```

## 🧪 Testing Commands

```bash
# Check if installed
which template-outlet-mcp

# List all tools
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | template-outlet-mcp 2>/dev/null | python3 -m json.tool

# Search docs
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search-docs","arguments":{"query":"recursive"}}}' | template-outlet-mcp 2>/dev/null

# Get example
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get-example","arguments":{"example":"simple-tree"}}}' | template-outlet-mcp 2>/dev/null

# List sections
echo '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"list-sections","arguments":{}}}' | template-outlet-mcp 2>/dev/null
```

## 🛠️ Available Tools

| Tool | Purpose | Required Args | Optional Args |
|------|---------|---------------|---------------|
| **search-docs** | Search documentation | `query` (string) | `section` (enum) |
| **get-example** | Get code example | `example` (enum) | - |
| **list-sections** | List doc structure | - | - |

### search-docs
```json
{
  "name": "search-docs",
  "arguments": {
    "query": "recursive rendering",
    "section": "all"
  }
}
```

**Sections**: `all`, `api`, `examples`, `troubleshooting`, `best-practices`

### get-example
```json
{
  "name": "get-example",
  "arguments": {
    "example": "nested-menu"
  }
}
```

**Examples**: `simple-tree`, `nested-menu`, `interactive-tree`, `file-system`, `comment-thread`, `org-chart`

### list-sections
```json
{
  "name": "list-sections",
  "arguments": {}
}
```

## 💬 Example Questions for Claude

- "Search template-outlet docs for recursive rendering"
- "Show me the nested menu example from template-outlet"
- "What sections are in template-outlet documentation?"
- "How do I fix infinite recursion in template-outlet?"
- "Get the file-system example from template-outlet"
- "Search template-outlet troubleshooting for performance"

## 📁 Key Files

| File | Purpose |
|------|---------|
| `index.js` | Entry point (executable) |
| `src/server.js` | Main server logic |
| `src/tools/searchDocs.js` | Search implementation |
| `src/tools/getExample.js` | Example retrieval |
| `src/tools/listSections.js` | Section listing |
| `package.json` | npm configuration |

## 🔧 Development Commands

```bash
# Start server
npm start

# Watch mode
npm run dev

# Link globally
npm link

# Unlink
npm unlink -g @masum/template-outlet-mcp

# Pack for testing
npm pack

# Publish
npm publish --access public
```

## 📦 Package Info

- **Name**: `@masum/template-outlet-mcp`
- **Command**: `template-outlet-mcp`
- **Version**: `1.0.0`
- **License**: MIT
- **Node**: >=18.0.0
- **Dependencies**: @modelcontextprotocol/sdk, zod

## 🔗 Links

- **Installation Guide**: `INSTALLATION.md`
- **Deployment Guide**: `DEPLOYMENT.md`
- **User README**: `README.md`
- **Technical Guide**: `MCP_SERVER_GUIDE.md`
- **Complete Summary**: `../MCP_INSTALLATION_COMPLETE.md`

## ⚡ Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Command not found | `npm link` or check PATH |
| Server won't start | Test with `template-outlet-mcp` directly |
| Docs not found | Check `../README.md` and `../manual.md` exist |
| Claude not loading | Restart Claude Code, verify `.mcp.json` |

## 📊 Status

✅ Server working
✅ Tools tested
✅ Locally linked
✅ Documentation complete
⏳ Ready to publish

---

**Current Location**: `/home/masum/code/design/npm-packages/template-outlet/mcp-server/`

**Command Path**: `/home/masum/.nvm/versions/node/v22.19.0/bin/template-outlet-mcp`

**Config File**: `/home/masum/code/design/.mcp.json`

---

**Next Step**: Restart Claude Code to test the integration!
