# Alpine.js Template Outlet Plugin - Manual

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Basic Examples](#basic-examples)
- [Advanced Examples](#advanced-examples)
- [Real-World Use Cases](#real-world-use-cases)
- [API Reference](#api-reference)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Introduction

The **Alpine.js Template Outlet Plugin** enables recursive template rendering in Alpine.js applications. It's perfect for rendering nested data structures like:

- 🌲 Tree structures (file systems, org charts)
- 📋 Nested menus and navigation
- 💬 Threaded comments
- 📁 Hierarchical data of any depth
- 🔄 Any recursive component pattern

### Key Features
- ✅ True recursive rendering
- ✅ Unlimited nesting depth
- ✅ Clean, maintainable code
- ✅ Proper Alpine.js scope management
- ✅ Lightweight (~100 lines)

---

## Installation

### Option 1: Direct Script Include

```html
<!-- Include Alpine.js -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Include the plugin before Alpine.js initializes -->
<script src="../dist/alpine-template-outlet.cdn.min.js"></script>       
```

### Option 2: Manual Registration

```javascript
document.addEventListener('alpine:init', () => {
    Alpine.directive('template-outlet', TemplateOutletDirective);
});
```

### Option 3: Module Import

```javascript
import Alpine from 'alpinejs';
import templateOutlet from './alpine-template-outlet.js';

Alpine.plugin(templateOutlet);
Alpine.start();
```

---

## Quick Start

Here's a simple example of rendering a nested list:

```html
<div x-data="{ items: [
    { name: 'Parent 1', children: [
        { name: 'Child 1.1', children: [] },
        { name: 'Child 1.2', children: [] }
    ]},
    { name: 'Parent 2', children: [] }
]}">

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
                        <div x-template-outlet="$refs.itemTemplate" x-data="{ item: child }"></div>
                    </template>
                </div>
            </template>
        </div>
    </template>
</div>
```

---

## How It Works

The plugin works in 4 steps:

1. **Reference**: You reference a template using `x-ref` and `x-template-outlet`
2. **Clone**: The plugin clones the template's content
3. **Scope**: It attaches Alpine.js scope from `x-data` to the clone
4. **Render**: The clone is inserted into the DOM with full Alpine.js reactivity

### The Magic Formula

```html
<!-- 1. Define a template with x-ref -->
<template x-ref="myTemplate">
    <!-- Your content here -->
</template>

<!-- 2. Render it with x-template-outlet inside x-for -->
<template x-for="item in items">
    <div x-template-outlet="$refs.myTemplate" x-data="{ /* data for this instance */ }"></div>
</template>
```

**Key Points**:
- Use `<div>` (not `<template>`) for `x-template-outlet` elements inside `x-for` loops
- The `x-data` attribute on the `x-template-outlet` element provides the initial scope for the cloned template

---

## Basic Examples

### Example 1: Simple Tree Structure

```html
<div x-data="{
    tree: {
        name: 'Root',
        children: [
            { name: 'Branch 1', children: [
                { name: 'Leaf 1.1', children: [] }
            ]},
            { name: 'Branch 2', children: [] }
        ]
    }
}">
    <!-- Render the tree -->
    <div x-template-outlet="$refs.nodeTemplate" x-data="{ node: tree }"></div>

    <!-- Node template -->
    <template x-ref="nodeTemplate">
        <div class="node">
            <span x-text="node.name"></span>
            <template x-if="node.children.length > 0">
                <div class="children">
                    <template x-for="child in node.children" :key="child.name">
                        <div x-template-outlet="$refs.nodeTemplate" x-data="{ node: child }"></div>
                    </template>
                </div>
            </template>
        </div>
    </template>
</div>
```

### Example 2: Nested Menu

```html
<div x-data="{
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
}">
    <nav>
        <template x-for="item in menu" :key="item.label">
            <div x-template-outlet="$refs.menuItem" x-data="{ item: item }"></div>
        </template>
    </nav>

    <template x-ref="menuItem">
        <div class="menu-item">
            <a :href="item.url" x-text="item.label"></a>
            <template x-if="item.submenu.length > 0">
                <div style="margin-left: 20px; padding-left: 15px; border-left: 2px solid #cbd5e0;">
                    <template x-for="subitem in item.submenu" :key="subitem.label">
                        <div x-template-outlet="$refs.menuItem" x-data="{ item: subitem }"></div>
                    </template>
                </div>
            </template>
        </div>
    </template>
</div>
```

---

## Advanced Examples

### Example 3: Interactive Tree with Add/Remove

```html
<div x-data="{
    tree: { id: 1, children: [] },
    nextId: 2,

    addChild(node) {
        node.children.push({ id: this.nextId++, children: [] });
    },

    removeNode(parent, node) {
        parent.children = parent.children.filter(c => c.id !== node.id);
    }
}">
    <div x-template-outlet="$refs.nodeTemplate" x-data="{ node: tree, parent: null }"></div>

    <template x-ref="nodeTemplate">
        <div class="node">
            <strong>Node <span x-text="node.id"></span></strong>

            <button @click="addChild(node)">Add Child</button>
            <button x-show="parent" @click="removeNode(parent, node)">Remove</button>

            <template x-if="node.children.length > 0">
                <div class="children">
                    <template x-for="child in node.children" :key="child.id">
                        <div x-template-outlet="$refs.nodeTemplate" x-data="{ node: child, parent: node }"></div>
                    </template>
                </div>
            </template>
        </div>
    </template>
</div>
```

### Example 4: File System Explorer

```html
<div x-data="{
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
}">
    <div x-template-outlet="$refs.fileNode" x-data="{ node: fileSystem }"></div>

    <template x-ref="fileNode">
        <div>
            <div @click="node.type === 'folder' && (expanded[node.name] = !expanded[node.name])"
                 :class="{ 'cursor-pointer': node.type === 'folder' }">
                <span x-show="node.type === 'folder'">
                    <span x-text="expanded[node.name] ? '📂' : '📁'"></span>
                </span>
                <span x-show="node.type === 'file'">📄</span>
                <span x-text="node.name"></span>
            </div>

            <template x-if="node.type === 'folder' && expanded[node.name]">
                <div style="margin-left: 20px;">
                    <template x-for="child in node.children" :key="child.name">
                        <div x-template-outlet="$refs.fileNode" x-data="{ node: child }"></div>
                    </template>
                </div>
            </template>
        </div>
    </template>
</div>
```

---

## Real-World Use Cases

### Use Case 1: Comment Thread System

Perfect for Reddit-style nested comments:

```html
<div x-data="commentSystem">
    <template x-for="comment in comments" :key="comment.id">
        <div x-template-outlet="$refs.commentTemplate" x-data="{ comment: comment, depth: 0 }"></div>
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
                        <div x-template-outlet="$refs.commentTemplate" x-data="{ comment: reply, depth: depth + 1 }"></div>
                    </template>
                </div>
            </template>
        </div>
    </template>
</div>
```

### Use Case 2: Organization Chart

```html
<div x-data="{
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
}">
    <div x-template-outlet="$refs.employeeCard" x-data="{ employee: org }"></div>

    <template x-ref="employeeCard">
        <div class="employee-card">
            <h3 x-text="employee.name"></h3>
            <p x-text="employee.title"></p>

            <template x-if="employee.reports && employee.reports.length > 0">
                <div class="reports">
                    <template x-for="report in employee.reports" :key="report.name">
                        <div x-template-outlet="$refs.employeeCard" x-data="{ employee: report }"></div>
                    </template>
                </div>
            </template>
        </div>
    </template>
</div>
```

### Use Case 3: Dynamic Navigation Menu (Laravel Blade + Alpine.js)

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
                                <div x-template-outlet="$refs.menuItem" x-data="{ item: child }"></div>
                            </li>
                        </template>
                    </ul>
                </template>
            </div>
        </template>
    </template>
</div>
```

---

## API Reference

### Directive: `x-template-outlet`

**Syntax:**
```html
<div x-template-outlet="expression" x-data="{ /* scope data */ }"></div>
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | `HTMLTemplateElement` | Yes | Reference to a template element (usually via `$refs`) |
| `x-data` | `Object` | **Required** | Scope data for the cloned template instance |

**Returns:** Clones and renders the referenced template with the provided scope.

### Important Notes

1. **`x-data` is Required**: The `x-template-outlet` element MUST have an `x-data` attribute. This provides the initialization data for the cloned template.

2. **Template Reference**: Use `$refs` to reference templates:
   ```html
   <template x-ref="myTemplate">...</template>
   <div x-template-outlet="$refs.myTemplate" x-data="{ ... }"></div>
   ```

3. **Scope Isolation**: Each rendered instance gets its own isolated scope based on the `x-data` provided.

---

## Best Practices

### ✅ DO

1. **Use `<div>` for outlet elements inside `x-for` loops**
   ```html
   <template x-for="item in items">
       <div x-template-outlet="$refs.node" x-data="{ node: item }"></div>
   </template>
   ```

2. **Always provide `x-data`**
   ```html
   <div x-template-outlet="$refs.node" x-data="{ node: child }"></div>
   ```

3. **Use unique keys in `x-for` loops**
   ```html
   <template x-for="item in items" :key="item.id">
   ```

4. **Name your templates clearly**
   ```html
   <template x-ref="menuItemTemplate">
   <template x-ref="commentThreadTemplate">
   ```

4. **Keep templates focused**
   - One template = one component pattern
   - Break down complex structures

5. **Use conditional rendering wisely**
   ```html
   <template x-if="node.children && node.children.length > 0">
   ```

### ❌ DON'T

1. **Don't forget `x-data`**
   ```html
   <!-- ❌ Wrong: No x-data -->
   <div x-template-outlet="$refs.node"></div>

   <!-- ✅ Correct -->
   <div x-template-outlet="$refs.node" x-data="{ node: child }"></div>
   ```

2. **Don't create circular references**
   ```html
   <!-- ❌ Wrong: Infinite loop -->
   <template x-ref="bad">
       <div x-template-outlet="$refs.bad" x-data="{}"></div>
   </template>
   ```

3. **Don't mutate props directly in nested components**
   - Pass parent context if you need to mutate
   - Use methods from parent scope

4. **Don't forget template boundaries**
   ```html
   <!-- ❌ Wrong: Multiple root elements -->
   <template x-ref="bad">
       <div>One</div>
       <div>Two</div>
   </template>

   <!-- ✅ Correct: Single root -->
   <template x-ref="good">
       <div>
           <div>One</div>
           <div>Two</div>
       </div>
   </template>
   ```

---

## Troubleshooting

### Problem: Template doesn't render

**Solution:**
- Check that `x-data` is present on `x-template-outlet`
- Verify template reference: `$refs.yourTemplateName`
- Ensure template has a single root element

### Problem: "Template outlet: Invalid template reference"

**Solution:**
- Make sure template has `x-ref` attribute
- Check that `x-ref` name matches in `x-template-outlet`
- Verify template is within the same Alpine component scope

### Problem: Data not updating in nested components

**Solution:**
- Ensure you're passing reactive data
- Check that parent data is properly scoped
- Use Alpine's reactivity helpers if needed

### Problem: Infinite recursion / Browser freezes

**Solution:**
- Check your termination condition
- Ensure `x-if` or array checks prevent infinite rendering
- Verify data structure doesn't have circular references

### Problem: Styles not applying to nested items

**Solution:**
- Check CSS specificity
- Ensure classes are properly bound with `:class`
- Verify Tailwind JIT is watching the right files

### Problem: Memory issues with deep nesting

**Solution:**
- Implement virtual scrolling for large lists
- Use `x-show` instead of `x-if` for frequently toggled items
- Consider pagination or lazy loading

---

## Performance Tips

1. **Use `x-if` for conditional rendering**
   - Completely removes elements from DOM
   - Better for items that rarely change

2. **Use `:key` in loops**
   - Helps Alpine track elements efficiently
   - Prevents unnecessary re-renders

3. **Limit nesting depth when possible**
   - Deep nesting can impact performance
   - Consider flattening data structure if possible

4. **Use `x-cloak` to prevent flash of unstyled content**
   ```html
   <style>[x-cloak] { display: none; }</style>
   <div x-cloak x-data="...">
   ```

---

## Examples Repository

All examples from this manual are available in `/public/test.html`

To run the examples:
1. Open `test.html` in a browser
2. Check the browser console for any errors
3. Experiment with the interactive examples

---

## Credits

- **Plugin Author**: Claude Code
- **Inspired by**: Alpine.js community patterns
- **Based on**: Recursive template rendering concepts

---

## License

MIT License - Feel free to use in your projects!

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the examples
3. Test in `test.html` first
4. Check Alpine.js documentation for general Alpine questions

---

**Happy Coding!** 🎉