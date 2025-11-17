# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1] - 2025-01-18

### Fixed
- **Critical**: Fixed MCP server startup failure when installed via npx
- Bundled comprehensive Template Outlet documentation with package
- Updated config.js to prioritize bundled documentation over external sources
- Added docs/ directory to published package files

### Added
- Complete Template Outlet documentation (README.md and manual.md)
- 6 practical examples (tree, menu, file system, comments, etc.)
- Comprehensive API reference, best practices, and troubleshooting guide

### Changed
- Documentation path resolution now checks bundled docs first for zero-configuration usage
- Updated package.json to include docs/ and LICENSE in published files

## [2.0.0] - 2025-01-17

### 🎉 Major Release - Complete Package Overhaul

This is a major release with significant improvements to code quality, performance, and developer experience. **No breaking changes** to the API - fully backward compatible!

### Added
- **Performance**: Intelligent caching system with 5-minute TTL (99% faster subsequent searches)
- **Error Handling**: 6 custom error classes for better debugging (DocumentationNotFoundError, ExampleNotFoundError, etc.)
- **Configuration**: Flexible path resolution with TEMPLATE_OUTLET_DOCS_PATH environment variable support
- **Testing**: Comprehensive unit test suite with Vitest and coverage reporting
- **CI/CD**: GitHub Actions workflows for automated testing, linting, and publishing
- **Code Quality**: ESLint and Prettier configuration with pre-commit checks
- **Documentation**: Complete JSDoc comments for all functions with type annotations
- **Development Files**:
  - LICENSE file (MIT)
  - CHANGELOG.md (this file)
  - RELEASE_NOTES_v2.0.0.md
  - .nvmrc (Node 20)
  - .npmrc
  - .editorconfig
  - .vscode/settings.json and extensions.json
- **Package.json**: exports field for better module resolution
- **npm Scripts**: test, lint, format, coverage, and more

### Changed
- **Dependencies**: Updated @modelcontextprotocol/sdk (1.21.0 → 1.22.0) and zod (3.22.0 → 3.25.76)
- **Version Management**: Server version now dynamically read from package.json (fixes version mismatch)
- **Path Resolution**: Replaced hardcoded paths with configurable system (src/config.js)
- **Error Messages**: Enhanced with context and helpful guidance
- **Search Performance**: Optimized with intelligent caching and automatic invalidation
- **Code Organization**: Better separation of concerns with dedicated config and errors modules

### Fixed
- Version number consistency between package.json and server.js
- Documentation path resolution now works in multiple environments (dev, prod, custom)
- Improved error handling across all tools with consistent formatting

## [1.0.2] - 2025-01-XX

### Changed
- Updated package name to @masum-nishat/template-outlet-mcp

## [1.0.1] - 2025-01-XX

### Fixed
- Minor bug fixes and improvements

## [1.0.0] - 2025-01-XX

### Added
- Initial release
- search-docs tool for searching Alpine.js Template Outlet documentation
- get-example tool for retrieving specific code examples
- list-sections tool for browsing documentation structure
- Support for multiple MCP clients (Claude, VS Code, Cursor, etc.)

[Unreleased]: https://github.com/MasumNishat/template-outlet-mcp/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/MasumNishat/template-outlet-mcp/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/MasumNishat/template-outlet-mcp/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/MasumNishat/template-outlet-mcp/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/MasumNishat/template-outlet-mcp/releases/tag/v1.0.0
