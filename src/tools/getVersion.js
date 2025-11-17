import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { formatErrorResponse } from '../errors.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Get version information about the MCP server
 * @returns {Promise<Object>} MCP response object with version details
 * @throws {Error} If package.json cannot be read
 */
export async function getVersion() {
  try {
    const packageJson = JSON.parse(
      readFileSync(join(__dirname, '../../package.json'), 'utf-8')
    );

    const versionInfo = {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      mcp_sdk_version: packageJson.dependencies['@modelcontextprotocol/sdk'],
    };

    return {
      content: [
        {
          type: 'text',
          text:
            '# Template Outlet MCP Server Version\n\n' +
            `**Package:** ${versionInfo.name}\n` +
            `**Version:** ${versionInfo.version}\n` +
            `**Description:** ${versionInfo.description}\n\n` +
            `**MCP SDK Version:** ${versionInfo.mcp_sdk_version}\n\n` +
            '---\n\n' +
            '**Repository:** https://github.com/MasumNishat/template-outlet-mcp\n' +
            '**NPM Package:** https://www.npmjs.com/package/@masum-nishat/template-outlet-mcp',
        },
      ],
    };
  } catch (error) {
    return formatErrorResponse(error);
  }
}
