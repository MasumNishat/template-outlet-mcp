# Template Outlet MCP Server

[![npm version](https://img.shields.io/npm/v/@masum-nishat/template-outlet-mcp.svg)](https://www.npmjs.com/package/@masum-nishat/template-outlet-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/@masum-nishat/template-outlet-mcp.svg)](https://nodejs.org)
[![CI](https://github.com/MasumNishat/template-outlet-mcp/workflows/CI/badge.svg)](https://github.com/MasumNishat/template-outlet-mcp/actions)

> 🤖 Enable AI assistants like Claude to intelligently search and retrieve Alpine.js Template Outlet documentation

An MCP (Model Context Protocol) server that provides three powerful tools for accessing Template Outlet documentation: documentation search, code example retrieval, and section navigation.

## ✨ Features

- 🔍 **Smart Documentation Search** - Search through all Template Outlet docs with relevance ranking
- 📝 **Code Example Access** - Retrieve complete working examples instantly
- 📚 **Documentation Navigation** - Browse available sections and topics
- ⚡ **Fast & Local** - No external API calls, everything runs locally
- 🎯 **Context-Aware** - Returns relevant snippets with surrounding context
- 🚀 **Performance Optimized** - Built-in caching with 5-minute TTL for faster searches
- 🛡️ **Robust Error Handling** - Custom error classes with detailed error messages
- 🔧 **Flexible Configuration** - Multiple path resolution strategies with environment variable support
- 📦 **Zero Configuration** - Works out of the box with sensible defaults
- ✅ **Type-Safe** - Comprehensive JSDoc annotations for IDE support
- 🧪 **Well Tested** - Full unit test coverage with Vitest

## 📋 Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 7.0.0 or higher (comes with Node.js)
- **Alpine.js Template Outlet documentation**: The server needs access to the documentation files (see [Configuration](#configuration))

## 🚀 Quick Start

Get your MCP server running in 5 minutes!

### Installation

The Template Outlet MCP server adheres to the Model Context Protocol (MCP) specification. To integrate it with an AI agent, you will typically need to provide a configuration that specifies how to invoke the server. The core configuration involves defining a server with a unique name, a command to execute it, and optional arguments.

Here are configuration examples for various MCP-compatible AI agents:

#### Standard Configuration (for most clients)

```json
{
  "mcpServers": {
    "template-outlet": {
      "command": "npx",
      "args": ["-y", "@masum-nishat/template-outlet-mcp"]
    }
  }
}
```
___

#### Amp

Add via the Amp VS Code extension settings screen or by updating your settings.json file:

```json
{
  "amp.mcpServers": {
    "template-outlet": {
      "command": "npx",
      "args": [
        "@masum-nishat/template-outlet-mcp"
      ]
    }
  }
}
```

**Amp CLI Setup:**

Add via the `amp mcp add`command below

```bash
  amp mcp add template-outlet -- npx @masum-nishat/template-outlet-mcp
```
___

#### Claude Code

Add one of the following configurations to your Claude Code project's `.mcp.json` (or global `~/.config/claude/mcp.json`):

##### Using npx

```json
{
  "mcpServers": {
    "template-outlet": {
      "command": "npx",
      "args": ["-y", "@masum-nishat/template-outlet-mcp"]
    }
  }
}
```

**Claude Code CLI Setup:**

Use the Claude Code CLI to add the Template Outlet MCP server:

```bash
  claude mcp add template-outlet npx @masum-nishat/template-outlet-mcp
```
___

#### Claude Desktop

Follow the MCP install [guide](https://modelcontextprotocol.io/quickstart/user), use the standard config.

___

#### Codex


Use the Codex CLI to add the Template Outlet MCP server:

```bash
  codex mcp add template-outlet npx "@masum-nishat/template-outlet-mcp"
```

Alternatively, create or edit the configuration file `~/.codex/config.toml` and add:

```toml
[mcp_servers.template-outlet]
command = "npx"
args = ["@masum-nishat/template-outlet-mcp"]
```

For more information, see the [Codex MCP documentation](https://github.com/openai/codex/blob/main/codex-rs/config.md#mcp_servers).

___

#### Cursor

Go to `Cursor Settings` -> `MCP` -> `Add new MCP Server`. Name to your liking, use `command` type with the command `npx @masum-nishat/template-outlet-mcp`. You can also verify config or add command like arguments via clicking `Edit`.

___

#### Factory

Use the Factory CLI to add the Template Outlet MCP server:

```bash
  droid mcp add template-outlet "npx @masum-nishat/template-outlet-mcp"
```

Alternatively, type `/mcp` within Factory droid to open an interactive UI for managing MCP servers.

For more information, see the [Factory MCP documentation](https://docs.factory.ai/cli/configuration/mcp).

___

#### Gemini CLI

Follow the MCP install [guide](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#configure-the-mcp-server-in-settingsjson), use the standard config.

___

#### Goose

Go to `Advanced settings` -> `Extensions` -> `Add custom extension`. Name to your liking, use type `STDIO`, and set the `command` to `npx @masum-nishat/template-outlet-mcp`. Click "Add Extension".

___

#### Kiro

Follow the MCP Servers [documentation](https://kiro.dev/docs/mcp/). For example in `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "template-outlet": {
      "command": "npx",
      "args": [
        "@masum-nishat/template-outlet-mcp"
      ]
    }
  }
}
```

___

#### LM Studio

Go to `Program` in the right sidebar -> `Install` -> `Edit mcp.json`. Use the standard config.

___

#### opencode

Follow the MCP Servers [documentation](https://opencode.ai/docs/mcp-servers/). For example in `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "template-outlet": {
      "type": "local",
      "command": [
        "npx",
        "@masum-nishat/template-outlet-mcp"
      ],
      "enabled": true
    }
  }
}
```

___

#### Qodo Gen

Open [Qodo Gen](https://docs.qodo.ai/qodo-documentation/qodo-gen) chat panel in VSCode or IntelliJ → Connect more tools → + Add new MCP → Paste the standard config.

Click `Save`.

___

#### VS Code

Follow the MCP install [guide](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server), use the standard config. You can also install the Template Outlet MCP server using the VS Code CLI:

```bash
# For VS Code
code --add-mcp '{"name":"template-outlet","command":"npx","args":["@masum-nishat/template-outlet-mcp"]}'
```

After installation, the Template Outlet MCP server will be available for use with your GitHub Copilot agent in VS Code.

___

#### Warp

Go to `Settings` -> `AI` -> `Manage MCP Servers` -> `+ Add` to [add an MCP Server](https://docs.warp.dev/knowledge-and-collaboration/mcp#adding-an-mcp-server). Use the standard config.

Alternatively, use the slash command `/add-mcp` in the Warp prompt and paste the standard config from above:
```json
{
  "mcpServers": {
    "template-outlet": {
      "command": "npx",
      "args": [
        "@masum-nishat/template-outlet-mcp"
      ]
    }
  }
}
```

___

#### Windsurf

Follow Windsurf MCP [documentation](https://docs.windsurf.com/windsurf/cascade/mcp). Use the standard config.

___

### Test It Out!

Once installed and configured, you can ask questions like:

- *"Search template-outlet docs for recursive rendering"*
- *"Show me the nested menu example from template-outlet"*
- *"What sections are available in the template-outlet documentation?"*
- *"How do I handle infinite recursion in template-outlet?"*

AI will use the MCP server to search documentation and provide accurate, contextual answers.

## 🛠️ Available Tools

This MCP server exposes the following tools:

| Tool            | Purpose                                                                                    | Required Arguments                                                                                               | Optional Arguments                                                              |
|-----------------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `search-docs`   | Search Alpine.js Template Outlet documentation for specific topics, patterns, or examples. | `query` (string)                                                                                                 | `section` (enum: `all`, `api`, `examples`, `troubleshooting`, `best-practices`) |
| `get-example`   | Retrieve a specific code example with full implementation details from the documentation.  | `example` (enum: `simple-tree`, `nested-menu`, `interactive-tree`, `file-system`, `comment-thread`, `org-chart`) | -                                                                               |
| `list-sections` | List all available documentation sections and topics with their hierarchy.                 | -                                                                                                                | -                                                                               |

## ⚙️ Configuration

The server automatically searches for Template Outlet documentation in multiple locations. You can customize this behavior using environment variables.

### Documentation Path Resolution

The server checks locations in this order:

1. **`TEMPLATE_OUTLET_DOCS_PATH` environment variable** (highest priority)
2. **Sibling directory**: `../template-outlet/` (for development)
3. **Node modules**: `node_modules/alpine-template-outlet/` (peer dependency)

### Setting Custom Documentation Path

If your Template Outlet documentation is in a custom location:

**Linux/macOS:**
```bash
export TEMPLATE_OUTLET_DOCS_PATH=/path/to/template-outlet
```

**Windows (Command Prompt):**
```cmd
set TEMPLATE_OUTLET_DOCS_PATH=C:\path\to\template-outlet
```

**Windows (PowerShell):**
```powershell
$env:TEMPLATE_OUTLET_DOCS_PATH="C:\path\to\template-outlet"
```

**In MCP Configuration:**
```json
{
  "mcpServers": {
    "template-outlet": {
      "command": "npx",
      "args": ["-y", "@masum-nishat/template-outlet-mcp"],
      "env": {
        "TEMPLATE_OUTLET_DOCS_PATH": "/custom/path/to/template-outlet"
      }
    }
  }
}
```

### Advanced Configuration

The server uses sensible defaults but can be customized:

- **Cache TTL**: Search index is cached for 5 minutes by default
- **Node Version**: Managed via `.nvmrc` (defaults to Node 20)
- **Development Mode**: Set `NODE_ENV=development` for debug information

## 🚀 Performance

### Intelligent Caching

The server implements a smart caching mechanism:

- **Search Index Caching**: Documentation is indexed once and cached for 5 minutes
- **Automatic Cache Invalidation**: Cache expires after TTL, ensuring fresh results
- **Memory Efficient**: Only active searches consume memory
- **Instant Subsequent Searches**: Cached searches return results in milliseconds

### Performance Tips

- The first search after server start takes ~100-200ms to build the index
- Subsequent searches within 5 minutes are nearly instant (~1-5ms)
- Large documentation sets benefit most from caching
- Cache automatically clears and rebuilds when documentation changes are detected

## 🛠️ Development

Want to contribute or customize the server? Here's how to get started.

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/MasumNishat/template-outlet-mcp.git
cd template-outlet-mcp

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Project Structure

```
template-outlet-mcp/
├── src/
│   ├── server.js           # Main MCP server
│   ├── config.js           # Configuration & path resolution
│   ├── errors.js           # Custom error classes
│   └── tools/
│       ├── searchDocs.js   # Documentation search tool
│       ├── getExample.js   # Example retrieval tool
│       └── listSections.js # Section listing tool
├── test/                   # Unit tests
├── .github/workflows/      # CI/CD pipelines
├── index.js               # Entry point
└── package.json
```

### Running Locally

```bash
# Start the server
npm start

# Or run directly
node index.js
```

### Testing

The project uses Vitest for testing:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Code Quality

We maintain high code quality standards:

- **ESLint**: Enforces code style and catches errors
- **Prettier**: Ensures consistent formatting
- **Vitest**: Comprehensive unit test coverage
- **JSDoc**: Full documentation for all functions
- **GitHub Actions**: Automated CI/CD pipeline

## 🐛 Troubleshooting

### Documentation Not Found

**Error**: `Template Outlet documentation not found`

**Solutions**:
1. Set `TEMPLATE_OUTLET_DOCS_PATH` environment variable
2. Clone the `template-outlet` repository as a sibling directory
3. Install `alpine-template-outlet` as a peer dependency

```bash
# Option 1: Set environment variable
export TEMPLATE_OUTLET_DOCS_PATH=/path/to/template-outlet

# Option 2: Clone as sibling directory
cd ..
git clone https://github.com/alpinejs/template-outlet.git
cd template-outlet-mcp

# Option 3: Install peer dependency
npm install alpine-template-outlet
```

### Search Returns No Results

**Possible causes**:
- Query is too specific
- Documentation hasn't been indexed yet
- Cache is stale

**Solutions**:
1. Try broader search terms
2. Wait a moment and try again (first search builds index)
3. Restart the MCP server to rebuild cache

### Example Not Found

**Error**: `Example "xyz" not found`

**Solution**: Use `list-sections` tool to see available examples, or check the [Available Tools](#available-tools) section for valid example names.

### Server Not Starting

**Possible causes**:
- Node.js version too old
- Dependencies not installed
- Port conflicts

**Solutions**:
```bash
# Check Node.js version (should be 18+)
node --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for errors in logs
npm start 2>&1 | tee server.log
```

### Performance Issues

If searches are slow:

1. **First search is always slower**: The index builds on first search
2. **Check documentation size**: Very large docs may take longer
3. **Monitor memory usage**: Ensure adequate system resources
4. **Review cache settings**: Default 5-minute TTL should work for most cases

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs**: Open an issue with detailed reproduction steps
- 💡 **Suggest features**: Share your ideas for improvements
- 📖 **Improve documentation**: Help make the docs clearer
- 🔧 **Submit PRs**: Fix bugs or add features
- ⭐ **Star the repo**: Show your support!

### Contribution Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests**: Ensure your changes are tested
5. **Run quality checks**:
   ```bash
   npm run lint
   npm run format:check
   npm test
   ```
6. **Commit your changes**: `git commit -m "Add amazing feature"`
7. **Push to your fork**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Development Guidelines

- Follow existing code style (enforced by ESLint and Prettier)
- Add JSDoc comments to all public functions
- Write tests for new features
- Update documentation as needed
- Keep PRs focused and atomic

### Code of Conduct

Be respectful, inclusive, and considerate. We're all here to learn and improve together!

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.

## 🔗 Related Projects

- [Alpine.js](https://alpinejs.dev/) - The progressive JavaScript framework
- [Alpine.js Template Outlet](https://github.com/alpinejs/template-outlet) - Recursive component rendering
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP specification

## 📄 License

MIT © Masum

---

<div align="center">

**[⬆ Back to Top](#template-outlet-mcp-server)**

Made with ❤️ for the Alpine.js community

</div>
