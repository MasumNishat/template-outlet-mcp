import fs from 'fs/promises';
import { getManualPath } from '../config.js';
import { formatErrorResponse } from '../errors.js';

/**
 * List all documentation sections and their hierarchy
 * @returns {Promise<Object>} MCP response object with table of contents
 * @throws {Error} If documentation cannot be read
 */
export async function listSections() {
  try {
    const manual = await fs.readFile(getManualPath(), 'utf-8');

    // Extract all headings
    const headings = [];

    // Get ## headings
    const h2Regex = /^## (.+)$/gm;
    let match;
    while ((match = h2Regex.exec(manual)) !== null) {
      headings.push({
        level: 2,
        title: match[1].replace(/\[.*?\]\(.*?\)/g, '').trim(), // Remove markdown links
        position: match.index
      });
    }

    // Get ### headings
    const h3Regex = /^### (.+)$/gm;
    while ((match = h3Regex.exec(manual)) !== null) {
      headings.push({
        level: 3,
        title: match[1].replace(/\[.*?\]\(.*?\)/g, '').trim(),
        position: match.index
      });
    }

    // Sort by position
    headings.sort((a, b) => a.position - b.position);

    // Format output as a table of contents
    const toc = headings.map(h => {
      const indent = '  '.repeat(h.level - 2);
      return `${indent}- ${h.title}`;
    }).join('\n');

    // Count sections by type
    const h2Count = headings.filter(h => h.level === 2).length;
    const h3Count = headings.filter(h => h.level === 3).length;

    return {
      content: [
        {
          type: 'text',
          text: `# Alpine.js Template Outlet Documentation Structure\n\n` +
                `Total sections: ${h2Count} main sections, ${h3Count} subsections\n\n` +
                `## Table of Contents\n\n${toc}\n\n---\n\n` +
                `**Tip:** Use the \`search-docs\` tool to find specific information within these sections.`,
        },
      ],
    };
  } catch (error) {
    return formatErrorResponse(error);
  }
}
