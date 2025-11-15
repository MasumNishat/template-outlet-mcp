import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { searchDocumentation } from './tools/searchDocs.js';
import { getExample } from './tools/getExample.js';
import { listSections } from './tools/listSections.js';

// Create MCP server instance
const server = new McpServer({
  name: 'template-outlet-docs',
  version: '1.0.0',
});

// Register search-docs tool
server.registerTool(
  'search-docs',
  {
    description: 'Search Alpine.js Template Outlet documentation for specific topics, patterns, or examples. Perfect for finding information about recursive rendering, nested structures, or specific use cases.',
    inputSchema: {
      query: z.string().describe('Search query (e.g., "recursive rendering", "menu example", "troubleshooting infinite loop")'),
      section: z.enum(['all', 'api', 'examples', 'troubleshooting', 'best-practices'])
        .optional()
        .default('all')
        .describe('Limit search to specific section (optional, defaults to "all")'),
    },
  },
  async ({ query, section }) => {
    try {
      const result = await searchDocumentation(query, section);
      return result;
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error searching documentation: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Register get-example tool
server.registerTool(
  'get-example',
  {
    description: 'Get a specific code example with full implementation details from the documentation',
    inputSchema: {
      example: z.enum([
        'simple-tree',
        'nested-menu',
        'interactive-tree',
        'file-system',
        'comment-thread',
        'org-chart',
      ]).describe('Name of the example to retrieve'),
    },
  },
  async ({ example }) => {
    try {
      const result = await getExample(example);
      return result;
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error retrieving example: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Register list-sections tool
server.registerTool(
  'list-sections',
  {
    description: 'List all available documentation sections and topics with their hierarchy',
    inputSchema: {},
  },
  async () => {
    try {
      const result = await listSections();
      return result;
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error listing sections: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Setup error handling
server.server.onerror = (error) => {
  console.error('[MCP Error]', error);
};

process.on('SIGINT', async () => {
  await server.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Template Outlet MCP server running on stdio');
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
