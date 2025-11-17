import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { existsSync } from 'fs';
import { getDocsPath, getManualPath, getReadmePath } from '../src/config.js';
import { DocumentationNotFoundError } from '../src/errors.js';

vi.mock('fs', () => ({
  existsSync: vi.fn(),
}));

describe('config', () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = process.env.TEMPLATE_OUTLET_DOCS_PATH;
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env.TEMPLATE_OUTLET_DOCS_PATH = originalEnv;
  });

  describe('getDocsPath', () => {
    it('should return env path if TEMPLATE_OUTLET_DOCS_PATH is set and exists', () => {
      process.env.TEMPLATE_OUTLET_DOCS_PATH = '/custom/path';
      vi.mocked(existsSync).mockReturnValueOnce(true);

      const result = getDocsPath();

      expect(result).toBe('/custom/path');
      expect(existsSync).toHaveBeenCalledWith('/custom/path');
    });

    it('should throw DocumentationNotFoundError if no valid path is found', () => {
      delete process.env.TEMPLATE_OUTLET_DOCS_PATH;
      vi.mocked(existsSync).mockReturnValue(false);

      expect(() => getDocsPath()).toThrow(DocumentationNotFoundError);
    });

    it('should check sibling directory if env var not set', () => {
      delete process.env.TEMPLATE_OUTLET_DOCS_PATH;
      vi.mocked(existsSync).mockReturnValueOnce(true);

      const result = getDocsPath();

      expect(result).toContain('template-outlet');
      expect(existsSync).toHaveBeenCalled();
    });
  });

  describe('getManualPath', () => {
    it('should return path to manual.md', () => {
      vi.mocked(existsSync).mockReturnValue(true);

      const result = getManualPath();

      expect(result).toContain('manual.md');
    });
  });

  describe('getReadmePath', () => {
    it('should return path to README.md', () => {
      vi.mocked(existsSync).mockReturnValue(true);

      const result = getReadmePath();

      expect(result).toContain('README.md');
    });
  });
});
