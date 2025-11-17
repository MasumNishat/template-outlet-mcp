import { describe, it, expect } from 'vitest';
import {
  McpServerError,
  DocumentationNotFoundError,
  DocumentationReadError,
  ExampleNotFoundError,
  IndexBuildError,
  ValidationError,
  formatErrorResponse,
} from '../src/errors.js';

describe('Custom Error Classes', () => {
  describe('McpServerError', () => {
    it('should create error with message and details', () => {
      const error = new McpServerError('Test error', { details: { foo: 'bar' } });

      expect(error.message).toBe('Test error');
      expect(error.name).toBe('McpServerError');
      expect(error.isOperational).toBe(true);
      expect(error.details).toEqual({ foo: 'bar' });
    });
  });

  describe('DocumentationNotFoundError', () => {
    it('should have statusCode 404', () => {
      const error = new DocumentationNotFoundError();

      expect(error.statusCode).toBe(404);
      expect(error.message).toContain('not found');
    });
  });

  describe('DocumentationReadError', () => {
    it('should have statusCode 500', () => {
      const error = new DocumentationReadError();

      expect(error.statusCode).toBe(500);
      expect(error.message).toContain('Failed to read');
    });
  });

  describe('ExampleNotFoundError', () => {
    it('should include available examples in message', () => {
      const error = new ExampleNotFoundError('test-example', ['example1', 'example2']);

      expect(error.message).toContain('test-example');
      expect(error.message).toContain('example1');
      expect(error.message).toContain('example2');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('IndexBuildError', () => {
    it('should have statusCode 500', () => {
      const error = new IndexBuildError();

      expect(error.statusCode).toBe(500);
      expect(error.message).toContain('search index');
    });
  });

  describe('ValidationError', () => {
    it('should have statusCode 400', () => {
      const error = new ValidationError('Invalid input');

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid input');
    });
  });
});

describe('formatErrorResponse', () => {
  it('should format error with message', () => {
    const error = new Error('Test error');
    const response = formatErrorResponse(error);

    expect(response.isError).toBe(true);
    expect(response.content).toHaveLength(1);
    expect(response.content[0].type).toBe('text');
    expect(response.content[0].text).toContain('Test error');
  });

  it('should include details if present', () => {
    const error = new McpServerError('Test error', { details: { key: 'value' } });
    const response = formatErrorResponse(error);

    expect(response.content[0].text).toContain('Details:');
    expect(response.content[0].text).toContain('key');
  });

  it('should include debug info in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const error = new McpServerError('Test error');
    const response = formatErrorResponse(error);

    expect(response._debug).toBeDefined();
    expect(response._debug.name).toBe('McpServerError');

    process.env.NODE_ENV = originalEnv;
  });
});
