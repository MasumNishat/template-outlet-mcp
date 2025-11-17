import { describe, it, expect } from 'vitest';

describe('Tool Integration Tests', () => {
  describe('searchDocumentation', () => {
    it('should be defined', async () => {
      const { searchDocumentation } = await import('../src/tools/searchDocs.js');
      expect(searchDocumentation).toBeDefined();
      expect(typeof searchDocumentation).toBe('function');
    });
  });

  describe('getExample', () => {
    it('should be defined', async () => {
      const { getExample } = await import('../src/tools/getExample.js');
      expect(getExample).toBeDefined();
      expect(typeof getExample).toBe('function');
    });
  });

  describe('listSections', () => {
    it('should be defined', async () => {
      const { listSections } = await import('../src/tools/listSections.js');
      expect(listSections).toBeDefined();
      expect(typeof listSections).toBe('function');
    });
  });

  describe('getVersion', () => {
    it('should be defined', async () => {
      const { getVersion } = await import('../src/tools/getVersion.js');
      expect(getVersion).toBeDefined();
      expect(typeof getVersion).toBe('function');
    });

    it('should return version information', async () => {
      const { getVersion } = await import('../src/tools/getVersion.js');
      const result = await getVersion();

      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toContain('2.0.2');
      expect(result.content[0].text).toContain('@masum-nishat/template-outlet-mcp');
    });
  });
});

// Note: Full integration tests require actual documentation files
// These can be added in a separate test suite with fixtures
