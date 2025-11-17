import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { DocumentationNotFoundError } from './errors.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Get the documentation directory path
 * Tries multiple locations in order:
 * 1. TEMPLATE_OUTLET_DOCS_PATH environment variable
 * 2. Sibling directory (development setup)
 * 3. node_modules/alpine-template-outlet (peer dependency)
 *
 * @returns {string} Path to the template-outlet documentation directory
 * @throws {Error} If documentation directory cannot be found
 */
export function getDocsPath() {
  // 1. Check environment variable
  if (process.env.TEMPLATE_OUTLET_DOCS_PATH) {
    const envPath = process.env.TEMPLATE_OUTLET_DOCS_PATH;
    if (existsSync(envPath)) {
      return envPath;
    }
    console.warn(`TEMPLATE_OUTLET_DOCS_PATH is set but path does not exist: ${envPath}`);
  }

  // 2. Check sibling directory (development setup)
  const siblingPath = join(__dirname, '../../../template-outlet');
  if (existsSync(siblingPath)) {
    return siblingPath;
  }

  // 3. Check node_modules (peer dependency)
  const nodeModulesPath = join(__dirname, '../../alpine-template-outlet');
  if (existsSync(nodeModulesPath)) {
    return nodeModulesPath;
  }

  // If nothing found, throw error with helpful message
  throw new DocumentationNotFoundError(
    'Template Outlet documentation not found. Please either:\n' +
      '1. Set TEMPLATE_OUTLET_DOCS_PATH environment variable to the docs location\n' +
      '2. Clone the template-outlet repository as a sibling directory\n' +
      '3. Install alpine-template-outlet as a peer dependency',
    {
      details: {
        checkedPaths: [process.env.TEMPLATE_OUTLET_DOCS_PATH, siblingPath, nodeModulesPath].filter(
          Boolean
        ),
      },
    }
  );
}

/**
 * Get the path to the manual.md file
 * @returns {string} Full path to manual.md
 */
export function getManualPath() {
  return join(getDocsPath(), 'manual.md');
}

/**
 * Get the path to the README.md file
 * @returns {string} Full path to README.md
 */
export function getReadmePath() {
  return join(getDocsPath(), 'README.md');
}
