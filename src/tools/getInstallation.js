import { formatErrorResponse } from '../errors.js';

/**
 * Get installation instructions for Alpine.js Template Outlet
 * @returns {Promise<Object>} MCP response object with installation guide
 */
export async function getInstallation() {
  try {
    const installGuide = `# Alpine.js Template Outlet - Installation Guide

## Installation Methods

### Option 1: NPM (Recommended for Build Tools)

Install via npm for use with build tools like Vite, Webpack, or esbuild:

\`\`\`bash
npm install alpine-template-outlet
\`\`\`

Then import and register the plugin:

\`\`\`javascript
import Alpine from 'alpinejs';
import templateOutlet from 'alpine-template-outlet';

// Register the plugin
Alpine.plugin(templateOutlet);

// Start Alpine
Alpine.start();
\`\`\`

### Option 2: CDN via unpkg.com (Recommended for Quick Start)

Use unpkg.com CDN for the latest version without installation. unpkg.com automatically serves the latest published version:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script defer src="https://unpkg.com/alpine-template-outlet@latest/dist/alpine-template-outlet.min.js"></script>
</head>
<body>
    <!-- Your Alpine.js code here -->
</body>
</html>
\`\`\`

**Note:** The script order matters! Alpine.js must be loaded first, then Template Outlet.

### Option 3: Specific Version via CDN

Lock to a specific version for production stability:

\`\`\`html
<script defer src="https://unpkg.com/alpinejs@3.14.0/dist/cdn.min.js"></script>
<script defer src="https://unpkg.com/alpine-template-outlet@1.0.0/dist/alpine-template-outlet.min.js"></script>
\`\`\`

### Option 4: Download and Self-Host

Download the files from unpkg.com and host them yourself:

1. Download: https://unpkg.com/alpine-template-outlet@latest/dist/alpine-template-outlet.min.js
2. Place in your project's assets folder
3. Reference the local file:

\`\`\`html
<script defer src="/assets/alpine-template-outlet.min.js"></script>
\`\`\`

## Quick Start Example

After installation, use Template Outlet in your HTML:

\`\`\`html
<div x-data="{
    items: [
        { id: 1, name: 'Parent', children: [
            { id: 2, name: 'Child 1', children: [] },
            { id: 3, name: 'Child 2', children: [] }
        ]}
    ]
}">
    <template x-template-outlet="items" x-template-outlet-key="id">
        <div>
            <span x-text="$item.name"></span>
            <div x-show="$item.children.length" style="margin-left: 20px;">
                <template x-template-outlet="$item.children"></template>
            </div>
        </div>
    </template>
</div>
\`\`\`

## Why unpkg.com?

- **Always Latest**: \`@latest\` tag automatically serves the newest version
- **Fast CDN**: Global CDN with excellent performance
- **Zero Config**: No build tools or installation required
- **Version Flexibility**: Easy to lock versions or use ranges

## Package Links

- **NPM Package**: https://www.npmjs.com/package/alpine-template-outlet
- **GitHub Repository**: https://github.com/your-repo/alpine-template-outlet
- **unpkg.com CDN**: https://unpkg.com/alpine-template-outlet

## Need More Examples?

Use the \`get-example\` tool to see complete implementation examples:
- \`simple-tree\` - Basic recursive tree structure
- \`nested-menu\` - Navigation menu with submenus
- \`interactive-tree\` - Tree with expand/collapse
- \`file-system\` - File browser with icons
- \`comment-thread\` - Nested comment system
- \`org-chart\` - Organization hierarchy

Use the \`search-docs\` tool to find specific information about features, API, or troubleshooting.`;

    return {
      content: [
        {
          type: 'text',
          text: installGuide,
        },
      ],
    };
  } catch (error) {
    return formatErrorResponse(error);
  }
}
