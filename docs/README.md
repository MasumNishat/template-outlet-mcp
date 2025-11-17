# Alpine.js Template Outlet

A powerful plugin for Alpine.js that enables recursive component rendering through template outlets. Perfect for rendering nested structures like trees, menus, file systems, and organizational charts.

## Overview

Template Outlet allows you to create reusable HTML templates that can recursively render themselves, making it ideal for displaying hierarchical data structures.

## Features

- ✅ Recursive component rendering
- ✅ Nested data structure support
- ✅ Dynamic template insertion
- ✅ Memory efficient
- ✅ Easy to use directive syntax
- ✅ Compatible with Alpine.js 3.x

## Installation

Include Alpine.js and the Template Outlet plugin:

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

## Quick Start

```html
<div x-data="{ items: [{ name: 'Parent', children: [{ name: 'Child' }] }] }">
  <template x-for="item in items">
    <div>
      <span x-text="item.name"></span>
      <template x-if="item.children">
        <div x-outlet="item.children"></div>
      </template>
    </div>
  </template>
</div>
```

## Documentation

For comprehensive documentation, examples, and best practices, see the [manual](./manual.md).

## License

MIT
