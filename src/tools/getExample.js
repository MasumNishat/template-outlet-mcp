import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANUAL_PATH = path.join(__dirname, '../../../template-outlet/manual.md');

const EXAMPLE_MARKERS = {
  'simple-tree': 'Example 1: Simple Tree Structure',
  'nested-menu': 'Example 2: Nested Menu',
  'interactive-tree': 'Example 3: Interactive Tree with Add/Remove',
  'file-system': 'Example 4: File System Explorer',
  'comment-thread': 'Use Case 1: Comment Thread System',
  'org-chart': 'Use Case 2: Organization Chart',
};

/**
 * Get a specific example from the documentation
 */
export async function getExample(exampleName) {
  try {
    const manual = await fs.readFile(MANUAL_PATH, 'utf-8');
    const marker = EXAMPLE_MARKERS[exampleName];

    if (!marker) {
      const available = Object.keys(EXAMPLE_MARKERS).join(', ');
      throw new Error(`Unknown example: ${exampleName}. Available examples: ${available}`);
    }

    // Find the example section
    const startIndex = manual.indexOf(`### ${marker}`);
    if (startIndex === -1) {
      throw new Error(`Example section not found in documentation: ${marker}`);
    }

    // Extract until next ### or ##
    const afterStart = manual.slice(startIndex);
    const nextSectionMatch = afterStart.match(/\n(##|###)/);
    const endIndex = nextSectionMatch
      ? startIndex + nextSectionMatch.index
      : manual.length;

    const exampleContent = manual.slice(startIndex, endIndex).trim();

    return {
      content: [
        {
          type: 'text',
          text: `# ${marker}\n\n${exampleContent}\n\n---\n\n**Note:** This example uses Alpine.js and the Template Outlet plugin. Make sure both are included in your project.`,
        },
      ],
    };
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
