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
npm install @masum-nishat/alpine-template-outlet
\`\`\`

Then import and register the plugin:

\`\`\`javascript
import Alpine from 'alpinejs';
import templateOutlet from '@masum-nishat/alpine-template-outlet';

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
    <!-- CRITICAL: Plugin loads WITHOUT defer, BEFORE Alpine -->
    <script src="https://unpkg.com/@masum-nishat/alpine-template-outlet@latest/dist/alpine-template-outlet.cdn.min.js"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script>
        // Register the template-outlet directive when Alpine initializes
        document.addEventListener('alpine:init', () => {
            if (typeof window.TemplateOutletDirective !== 'undefined') {
                Alpine.directive('template-outlet', window.TemplateOutletDirective);
            }
        });
    </script>
</head>
<body>
    <!-- Your Alpine.js code here -->
</body>
</html>
\`\`\`

**CRITICAL REQUIREMENTS:**

1. **Script Loading Order:**
   - Plugin loads **WITHOUT defer** (synchronous, loads immediately)
   - Alpine.js loads **WITH defer** (loads after DOM parsing)
   - Plugin MUST load before Alpine.js to be available during \`alpine:init\`

2. **Manual Registration Required:**
   - You MUST manually register the directive in \`alpine:init\`
   - Access via \`window.TemplateOutletDirective\`

### Option 3: Specific Version via CDN

Lock to a specific version for production stability:

\`\`\`html
<!-- Plugin loads WITHOUT defer, BEFORE Alpine -->
<script src="https://unpkg.com/@masum-nishat/alpine-template-outlet@1.1.1/dist/alpine-template-outlet.cdn.min.js"></script>
<script defer src="https://unpkg.com/alpinejs@3.14.0/dist/cdn.min.js"></script>
<script>
    // Register the template-outlet directive when Alpine initializes
    document.addEventListener('alpine:init', () => {
        if (typeof window.TemplateOutletDirective !== 'undefined') {
            Alpine.directive('template-outlet', window.TemplateOutletDirective);
        }
    });
</script>
\`\`\`

### Option 4: Download and Self-Host

Download the files from unpkg.com and host them yourself:

1. Download Alpine.js: https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js
2. Download Template Outlet: https://unpkg.com/@masum-nishat/alpine-template-outlet@latest/dist/alpine-template-outlet.cdn.min.js
3. Place files in your project's assets folder
4. Reference the local files with directive registration:

\`\`\`html
<!-- Plugin loads WITHOUT defer, BEFORE Alpine -->
<script src="/assets/alpine-template-outlet.cdn.min.js"></script>
<script defer src="/assets/alpine.min.js"></script>
<script>
    // Register the template-outlet directive when Alpine initializes
    document.addEventListener('alpine:init', () => {
        if (typeof window.TemplateOutletDirective !== 'undefined') {
            Alpine.directive('template-outlet', window.TemplateOutletDirective);
        }
    });
</script>
\`\`\`

## Complete Working Example (CDN)

Here's a complete HTML file that works out of the box:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alpine Template Outlet Example</title>

    <!-- CRITICAL: Plugin loads WITHOUT defer, BEFORE Alpine -->
    <script src="https://unpkg.com/@masum-nishat/alpine-template-outlet@latest/dist/alpine-template-outlet.cdn.min.js"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <!-- Register the directive -->
    <script>
        document.addEventListener('alpine:init', () => {
            if (typeof window.TemplateOutletDirective !== 'undefined') {
                Alpine.directive('template-outlet', window.TemplateOutletDirective);
            }
        });
    </script>
</head>
<body>
    <!-- Example: Recursive Tree Structure -->
    <div x-data="{
        items: [
            { id: 1, name: 'Parent', children: [
                { id: 2, name: 'Child 1', children: [] },
                { id: 3, name: 'Child 2', children: [
                    { id: 4, name: 'Grandchild', children: [] }
                ]}
            ]}
        ]
    }">
        <!-- Iterate over root items -->
        <template x-for="item in items" :key="item.id">
            <div x-template-outlet="$refs.treeTemplate" x-data="{ node: item }"></div>
        </template>

        <!-- Recursive tree template -->
        <template x-ref="treeTemplate">
            <div style="margin-left: 20px;">
                <span x-text="node.name"></span>
                <!-- Recursive: render children -->
                <template x-if="node.children && node.children.length > 0">
                    <div>
                        <template x-for="child in node.children" :key="child.id">
                            <div x-template-outlet="$refs.treeTemplate" x-data="{ node: child }"></div>
                        </template>
                    </div>
                </template>
            </div>
        </template>
    </div>
</body>
</html>
\`\`\`

**Copy and paste this entire example into an HTML file to see it working immediately!**

## How the Plugin Works

The plugin uses a template reference pattern:

1. **Define a template** with \`x-ref\`:
   \`\`\`html
   <template x-ref="treeTemplate">
       <!-- Your template content -->
   </template>
   \`\`\`

2. **Iterate over your data** with \`x-for\`:
   \`\`\`html
   <template x-for="item in items" :key="item.id">
       <div x-template-outlet="$refs.treeTemplate" x-data="{ node: item }"></div>
   </template>
   \`\`\`

3. **For recursion**, use the same pattern inside your template to render children:
   \`\`\`html
   <template x-for="child in node.children" :key="child.id">
       <div x-template-outlet="$refs.treeTemplate" x-data="{ node: child }"></div>
   </template>
   \`\`\`

**Key Points:**
- Use \`<div>\` (not \`<template>\`) for \`x-template-outlet\`
- Always include \`x-data\` to pass data to the template
- Reference templates with \`$refs.templateName\`
- The plugin does NOT use \`x-template-outlet-key\` or direct array iteration

## Why unpkg.com?

- **Always Latest**: \`@latest\` tag automatically serves the newest version
- **Fast CDN**: Global CDN with excellent performance
- **Zero Config**: No build tools or installation required
- **Version Flexibility**: Easy to lock versions or use ranges

## Package Links

- **NPM Package**: https://www.npmjs.com/package/@masum-nishat/alpine-template-outlet
- **GitHub Repository**: https://github.com/MasumNishat/template-outlet
- **unpkg.com CDN**: https://unpkg.com/@masum-nishat/alpine-template-outlet

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
