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

## License

MIT
