# Template Outlet MCP Server

> 🤖 Enable AI assistants like Claude to intelligently search and retrieve Alpine.js Template Outlet documentation

An MCP (Model Context Protocol) server that provides three powerful tools for accessing Template Outlet documentation: documentation search, code example retrieval, and section navigation.

## ✨ Features

- 🔍 **Smart Documentation Search** - Search through all Template Outlet docs with relevance ranking
- 📝 **Code Example Access** - Retrieve complete working examples instantly
- 📚 **Documentation Navigation** - Browse available sections and topics
- ⚡ **Fast & Local** - No external API calls, everything runs locally
- 🎯 **Context-Aware** - Returns relevant snippets with surrounding context

## 🚀 Quick Start

### Installation

```bash
npm install -g @masum/template-outlet-mcp
```

### Configuration

Add to your Claude Code project's `.mcp.json`:

```json
{
  "mcpServers": {
    "template-outlet": {
      "command": "template-outlet-mcp"
    }
  }
}
```

Restart Claude Code, and you're ready to go!

## 📖 Usage Examples

Once installed, you can ask Claude questions like:

- *"Search template-outlet docs for recursive rendering"*
- *"Show me the nested menu example from template-outlet"*
- *"What sections are available in the template-outlet documentation?"*
- *"How do I handle infinite recursion in template-outlet?"*

Claude will use the MCP server to search documentation and provide accurate, contextual answers.

## Available Tools

### 1. `search-docs`
Search the documentation for specific topics.

**Parameters:**
- `query` (required): Search query
- `section` (optional): Limit to `api`, `examples`, `troubleshooting`, `best-practices`, or `all`

**Example:**
```
Search template-outlet docs for "recursive rendering"
```

### 2. `get-example`
Retrieve a specific code example.

**Parameters:**
- `example` (required): One of:
  - `simple-tree`
  - `nested-menu`
  - `interactive-tree`
  - `file-system`
  - `comment-thread`
  - `org-chart`

**Example:**
```
Get the nested-menu example from template-outlet
```

### 3. `list-sections`
List all available documentation sections.

**Example:**
```
Show me the template-outlet documentation structure
```

## Testing

Test the server directly:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node index.js
```

## Documentation Structure

The server reads from:
- `../README.md` - Quick start guide
- `../manual.md` - Complete documentation

## Development

Watch mode for development:

```bash
npm run dev
```

## License

MIT
