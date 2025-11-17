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
});

// Note: Full integration tests require actual documentation files
// These can be added in a separate test suite with fixtures
