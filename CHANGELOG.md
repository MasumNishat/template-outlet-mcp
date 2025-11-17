# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- ESLint and Prettier configuration for code quality
- Vitest testing framework with coverage support
- GitHub Actions CI/CD workflows for automated testing and publishing
- LICENSE file (MIT)
- Comprehensive JSDoc comments
- Custom error handling classes
- Configuration system for flexible documentation path resolution
- Support for TEMPLATE_OUTLET_DOCS_PATH environment variable
- EditorConfig and VS Code settings for consistent development environment
- Unit tests for all core functionality
- Package.json exports field for better module resolution

### Changed
- Updated @modelcontextprotocol/sdk from 1.21.0 to 1.22.0
- Updated zod from 3.22.0 to 3.25.76
- Fixed version mismatch between package.json and server.js
- Replaced hardcoded file paths with configurable path system
- Improved error messages with more context and helpful guidance
- Optimized search index with caching mechanism

### Fixed
- Version number now dynamically read from package.json
- Documentation path resolution now works in multiple environments

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

[Unreleased]: https://github.com/MasumNishat/template-outlet-mcp/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/MasumNishat/template-outlet-mcp/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/MasumNishat/template-outlet-mcp/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/MasumNishat/template-outlet-mcp/releases/tag/v1.0.0
