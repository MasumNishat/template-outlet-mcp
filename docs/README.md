# Alpine.js Template Outlet Plugin

[![npm version](https://badge.fury.io/js/@masum-nishat%2Falpine-template-outlet.svg)](https://www.npmjs.com/package/@masum-nishat/alpine-template-outlet)
[![CI](https://github.com/MasumNishat/template-outlet/workflows/CI/badge.svg)](https://github.com/MasumNishat/template-outlet/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/@masum-nishat/alpine-template-outlet.svg)](https://www.npmjs.com/package/@masum-nishat/alpine-template-outlet)

A lightweight Alpine.js plugin that enables recursive template rendering for nested data structures. Perfect for rendering hierarchical data like tree views, nested menus, threaded comments, and more.

## ✨ Key Features

- ✅ True recursive rendering
- ✅ Unlimited nesting depth
- ✅ Proper Alpine.js scope management
- ✅ Clean, maintainable code
- ✅ No external dependencies
- ✅ Extremely lightweight (~100 lines of code)

## 📦 Installation

### Option 1: npm (Recommended for modern build tools)

Install the package:

```bash
  npm install @masum-nishat/alpine-template-outlet
```

Then, import and register the plugin in your JavaScript entry file:

```javascript
import Alpine from 'alpinejs';
import templateOutlet from '@masum-nishat/alpine-template-outlet';

Alpine.plugin(templateOutlet);
Alpine.start(); // If Alpine.js is not already started
```

### Option 2: CDN (Direct Script Include)

Include Alpine.js and the plugin directly in your HTML. It's recommended to use the minified CDN version for production.

```html
<!-- Include Alpine.js (ensure it's loaded before the plugin) -->
<script
  defer
  src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
></script>

<!-- Include the plugin from unpkg or jsDelivr -->
<script src="https://unpkg.com/@masum-nishat/alpine-template-outlet@latest/dist/alpine-template-outlet.cdn.min.js"></script>
<!-- Or from jsDelivr -->
<!-- <script src="https://cdn.jsdelivr.net/npm/@masum-nishat/alpine-template-outlet@latest/dist/alpine-template-outlet.cdn.min.js"></script> -->
```

### Option 3: Manual Registration (Advanced)

For advanced use cases, you can manually register the directive:

```javascript
import { TemplateOutletDirective } from '@masum-nishat/alpine-template-outlet/dist/alpine-template-outlet.esm.js'; // Path to ESM build

document.addEventListener('alpine:init', () => {
  Alpine.directive('template-outlet', TemplateOutletDirective);
});
```

## 🚀 Quick Start

Here's a simple example of rendering a nested list:

```html
<div
  x-data="{ items: [
    { name: 'Parent 1', children: [
        { name: 'Child 1.1', children: [] },
        { name: 'Child 1.2', children: [] }
    ]},
    { name: 'Parent 2', children: [] }
]}"
>
  <!-- Render root items -->
  <template x-for="item in items" :key="item.name">
    <div x-template-outlet="$refs.itemTemplate" x-data="{ item: item }"></div>
  </template>

  <!-- Recursive template -->
  <template x-ref="itemTemplate">
    <div>
      <strong x-text="item.name"></strong>

      <!-- Recursively render children -->
      <template x-if="item.children && item.children.length > 0">
        <div style="margin-left: 20px;">
          <template x-for="child in item.children" :key="child.name">
            <div
              x-template-outlet="$refs.itemTemplate"
              x-data="{ item: child }"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </template>
</div>
```

**Important**:

- Use `<div>` (not `<template>`) for `x-template-outlet` elements inside `x-for` loops.
- Always provide `x-data` on the `x-template-outlet` element to pass the initial scope for the cloned template.

## 💡 How It Works

The plugin operates in 4 key steps:

1.  **Reference**: You define a template using `x-ref` and then reference it with `x-template-outlet`.
2.  **Clone**: The plugin clones the content of the referenced template.
3.  **Scope**: It attaches a new Alpine.js scope, initialized from the `x-data` attribute on the `x-template-outlet` element, to the cloned content.
4.  **Render**: The cloned and scoped content is then inserted into the DOM with full Alpine.js reactivity.

### The Magic Formula

```html
<!-- 1. Define a template with x-ref -->
<template x-ref="myTemplate">
  <!-- Your content here -->
</template>

<!-- 2. Render it with x-template-outlet inside x-for -->
<template x-for="item in items">
  <div
    x-template-outlet="$refs.myTemplate"
    x-data="{ /* data for this instance */ }"
  ></div>
</template>
```

## 📖 API Reference

### Directive: `x-template-outlet`

**Syntax:**

```html
<div x-template-outlet="expression" x-data="{ /* scope data */ }"></div>
```

**Parameters:**

| Parameter    | Type                  | Required     | Description                                           |
| ------------ | --------------------- | ------------ | ----------------------------------------------------- |
| `expression` | `HTMLTemplateElement` | Yes          | Reference to a template element (usually via `$refs`) |
| `x-data`     | `Object`              | **Required** | Scope data for the cloned template instance           |

**Returns:** Clones and renders the referenced template with the provided scope.

### Important API Notes

1.  **`x-data` is Required**: The `x-template-outlet` element MUST have an `x-data` attribute. This provides the initialization data for the cloned template.
2.  **Template Reference**: Always use `$refs` to reference templates (e.g., `<div x-template-outlet="$refs.myTemplate" ...></div>`).
3.  **Scope Isolation**: Each rendered instance gets its own isolated Alpine.js scope based on the `x-data` provided.

## ✅ Best Practices

### DO

- Use `<div>` for `x-template-outlet` elements inside `x-for` loops.
- Always provide `x-data` on the `x-template-outlet` element.
- Use unique `:key` attributes in `x-for` loops for efficient rendering.
- Name your templates clearly (e.g., `x-ref="menuItemTemplate"`).
- Keep templates focused on a single component pattern.
- Use `x-if` for conditional rendering to remove elements from the DOM when not needed.

### DON'T

- Forget `x-data` on your `x-template-outlet` element.
- Create circular references in your data that could lead to infinite loops.
- Mutate props directly in nested components; pass parent context or use methods from the parent scope if mutation is necessary.
- Use multiple root elements within a single `<template x-ref="...">` (ensure a single root element).

## ❓ Troubleshooting

Here are solutions to common issues:

- **Template doesn't render?** Ensure `x-data` is present, the template reference (`$refs`) is correct, and the template has a single root element.
- **"Template outlet: Invalid template reference"?** Check `x-ref` attribute and name matching, and ensure the template is within the same Alpine component scope.
- **Infinite recursion / Browser freezes?** Verify your termination conditions (`x-if` or array length checks) and check for circular references in your data structure.
- **Data not updating?** Ensure you're passing reactive data and that parent data is properly scoped.

## 🎮 Examples & Demos

### Basic Examples

#### Example 1: Simple Tree Structure

```html
<div
  x-data="{
    tree: {
        name: 'Root',
        children: [
            { name: 'Branch 1', children: [
                { name: 'Leaf 1.1', children: [] }
            ]},
            { name: 'Branch 2', children: [] }
        ]
    }
}"
>
  <!-- Render the tree -->
  <div x-template-outlet="$refs.nodeTemplate" x-data="{ node: tree }"></div>

  <!-- Node template -->
  <template x-ref="nodeTemplate">
    <div class="node">
      <span x-text="node.name"></span>
      <template x-if="node.children.length > 0">
        <div class="children">
          <template x-for="child in node.children" :key="child.name">
            <div
              x-template-outlet="$refs.nodeTemplate"
              x-data="{ node: child }"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </template>
</div>
```

#### Example 2: Nested Menu

```html
<div
  x-data="{
    menu: [
        {
            label: 'Products',
            url: '/products',
            submenu: [
                { label: 'Laptops', url: '/products/laptops', submenu: [] },
                { label: 'Phones', url: '/products/phones', submenu: [] }
            ]
        },
        { label: 'About', url: '/about', submenu: [] }
    ]
}"
>
  <nav>
    <template x-for="item in menu" :key="item.label">
      <div x-template-outlet="$refs.menuItem" x-data="{ item: item }"></div>
    </template>
  </nav>

  <template x-ref="menuItem">
    <div class="menu-item">
      <a :href="item.url" x-text="item.label"></a>
      <template x-if="item.submenu.length > 0">
        <div
          style="margin-left: 20px; padding-left: 15px; border-left: 2px solid #cbd5e0;"
        >
          <template x-for="subitem in item.submenu" :key="subitem.label">
            <div
              x-template-outlet="$refs.menuItem"
              x-data="{ item: subitem }"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </template>
</div>
```

### Advanced Examples

#### Example 3: Interactive Tree with Add/Remove

```html
<div
  x-data="{
    tree: { id: 1, children: [] },
    nextId: 2,

    addChild(node) {
        node.children.push({ id: this.nextId++, children: [] });
    },

    removeNode(parent, node) {
        parent.children = parent.children.filter(c => c.id !== node.id);
    }
}"
>
  <div
    x-template-outlet="$refs.nodeTemplate"
    x-data="{ node: tree, parent: null }"
  ></div>

  <template x-ref="nodeTemplate">
    <div class="node">
      <strong>Node <span x-text="node.id"></span></strong>

      <button @click="addChild(node)">Add Child</button>
      <button x-show="parent" @click="removeNode(parent, node)">Remove</button>

      <template x-if="node.children.length > 0">
        <div class="children">
          <template x-for="child in node.children" :key="child.id">
            <div
              x-template-outlet="$refs.nodeTemplate"
              x-data="{ node: child, parent: node }"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </template>
</div>
```

#### Example 4: File System Explorer

```html
<div
  x-data="{
    fileSystem: {
        name: 'root',
        type: 'folder',
        children: [
            {
                name: 'Documents',
                type: 'folder',
                children: [
                    { name: 'resume.pdf', type: 'file', children: [] }
                ]
            },
            { name: 'image.jpg', type: 'file', children: [] }
        ]
    },
    expanded: {}
}"
>
  <div x-template-outlet="$refs.fileNode" x-data="{ node: fileSystem }"></div>

  <template x-ref="fileNode">
    <div>
      <div
        @click="node.type === 'folder' && (expanded[node.name] = !expanded[node.name])"
        :class="{ 'cursor-pointer': node.type === 'folder' }"
      >
        <span x-show="node.type === 'folder'">
          <span x-text="expanded[node.name] ? '📂' : '📁'"></span>
        </span>
        <span x-show="node.type === 'file'">📄</span>
        <span x-text="node.name"></span>
      </div>

      <template x-if="node.type === 'folder' && expanded[node.name]">
        <div style="margin-left: 20px;">
          <template x-for="child in node.children" :key="child.name">
            <div
              x-template-outlet="$refs.fileNode"
              x-data="{ node: child }"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </template>
</div>
```

### Real-World Use Cases

#### Use Case 1: Comment Thread System

Perfect for Reddit-style nested comments:

```html
<div x-data="commentSystem">
  <template x-for="comment in comments" :key="comment.id">
    <div
      x-template-outlet="$refs.commentTemplate"
      x-data="{ comment: comment, depth: 0 }"
    ></div>
  </template>

  <template x-ref="commentTemplate">
    <div :style="{ marginLeft: (depth * 20) + 'px' }" class="comment">
      <div class="comment-header">
        <strong x-text="comment.author"></strong>
        <span x-text="comment.timestamp"></span>
      </div>
      <p x-text="comment.text"></p>

      <button @click="showReplyForm(comment)">Reply</button>

      <!-- Nested replies -->
      <template x-if="comment.replies && comment.replies.length > 0">
        <div class="replies">
          <template x-for="reply in comment.replies" :key="reply.id">
            <div
              x-template-outlet="$refs.commentTemplate"
              x-data="{ comment: reply, depth: depth + 1 }"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </template>
</div>
```

#### Use Case 2: Organization Chart

```html
<div
  x-data="{
    org: {
        name: 'CEO',
        title: 'Chief Executive Officer',
        reports: [
            {
                name: 'CTO',
                title: 'Chief Technology Officer',
                reports: [
                    { name: 'Dev Lead', title: 'Development Lead', reports: [] }
                ]
            },
            {
                name: 'CFO',
                title: 'Chief Financial Officer',
                reports: []
            }
        ]
    }
}"
>
  <div x-template-outlet="$refs.employeeCard" x-data="{ employee: org }"></div>

  <template x-ref="employeeCard">
    <div class="employee-card">
      <h3 x-text="employee.name"></h3>
      <p x-text="employee.title"></p>

      <template x-if="employee.reports && employee.reports.length > 0">
        <div class="reports">
          <template x-for="report in employee.reports" :key="report.name">
            <div
              x-template-outlet="$refs.employeeCard"
              x-data="{ employee: report }"
            ></div>
          </template>
        </div>
      </template>
    </div>
  </template>
</div>
```

#### Use Case 3: Dynamic Navigation Menu (Laravel Blade + Alpine.js)

This is exactly what you implemented in your project:

```html
<div x-data="{ menuItems: window.menuConfig }">
  <template x-for="(item, index) in menuItems" :key="index">
    <div x-template-outlet="$refs.menuItem" x-data="{ item: item }"></div>
  </template>

  <template x-ref="menuItem">
    <!-- Link item -->
    <template x-if="item.type === 'link' && getMenuVisibility(item.activeKey)">
      <a :href="item.url" :class="getClass(getActiveState(item.activeKey))">
        <span x-text="item.name"></span>
      </a>
    </template>

    <!-- Group item with children -->
    <template x-if="item.type === 'group' && getMenuVisibility(item.activeKey)">
      <div x-data="{ isExpanded: false }">
        <button @click="isExpanded = !isExpanded" x-text="item.name"></button>

        <template x-if="item.children && item.children.length > 0">
          <ul x-show="isExpanded">
            <template x-for="child in item.children" :key="child.activeKey">
              <li>
                <div
                  x-template-outlet="$refs.menuItem"
                  x-data="{ item: child }"
                ></div>
              </li>
            </template>
          </ul>
        </template>
      </div>
    </template>
  </template>
</div>
```

For interactive demonstrations, open **`examples/plugin-demo.html`** in your browser to see these examples in action.

## ⚡ Performance Tips

1.  **Use `x-if` for conditional rendering**
    - Completely removes elements from DOM.
    - Better for items that rarely change.

2.  **Use `:key` in loops**
    - Helps Alpine track elements efficiently.
    - Prevents unnecessary re-renders.

3.  **Limit nesting depth when possible**
    - Deep nesting can impact performance.
    - Consider flattening data structure if possible.

4.  **Use `x-cloak` to prevent flash of unstyled content**
    ```html
    <style>
      [x-cloak] {
        display: none;
      }
    </style>
    <div x-cloak x-data="..."></div>
    ```

## 🛠️ Development & Build Process

This project uses `esbuild` to compile the plugin into various distribution formats. While users typically consume the plugin via npm or CDN, understanding the build process can be helpful for contributors or those needing custom builds.

### Building the Project

To build the plugin from source, first install the development dependencies, then run the build script:

```bash
# Install dependencies (if you haven't already)
npm install

# Build all distribution formats
npm run build
```

This command generates the following files in the `dist/` folder:

- **`alpine-template-outlet.cdn.js`**: IIFE format for direct browser inclusion.
- **`alpine-template-outlet.cdn.min.js`**: Minified IIFE for production CDN usage.
- **`alpine-template-outlet.esm.js`**: ES Module format for modern JavaScript bundlers.

### Development Workflow

1.  **Edit Source**: Make changes only in `src/alpine-template-outlet.js`.
2.  **Build**: Run `npm run build` to update the `dist/` files.
3.  **Test**: Open `examples/test.html` in your browser to verify changes.

### Publishing

The `prepublishOnly` npm script automatically runs `npm run build` before `npm publish` to ensure your package always includes the latest compiled assets.

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 💖 Credits

- **Plugin Author**: Masum Nishat
- **Inspired by**: Alpine.js community patterns
- **Based on**: Recursive template rendering concepts

## ❓ Support

For issues or questions:

1.  Check the [Troubleshooting](#troubleshooting) section above.
2.  Review the provided examples and interactive demos.
3.  Consult the official Alpine.js documentation for general Alpine questions.

**Happy Coding!** 🎉
