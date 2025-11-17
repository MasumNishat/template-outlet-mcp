/**
 * Custom error classes for Template Outlet MCP server
 */

/**
 * Base error class for all MCP server errors
 */
export class McpServerError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = this.constructor.name;
    this.isOperational = true;
    this.details = options.details || null;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown when documentation files cannot be found
 */
export class DocumentationNotFoundError extends McpServerError {
  constructor(message = 'Documentation files not found', options = {}) {
    super(message, options);
    this.statusCode = 404;
  }
}

/**
 * Error thrown when documentation files cannot be read
 */
export class DocumentationReadError extends McpServerError {
  constructor(message = 'Failed to read documentation files', options = {}) {
    super(message, options);
    this.statusCode = 500;
  }
}

/**
 * Error thrown when a requested example is not found
 */
export class ExampleNotFoundError extends McpServerError {
  constructor(exampleName, availableExamples) {
    const message = `Example "${exampleName}" not found. Available examples: ${availableExamples.join(', ')}`;
    super(message, { details: { exampleName, availableExamples } });
    this.statusCode = 404;
  }
}

/**
 * Error thrown when search index fails to build
 */
export class IndexBuildError extends McpServerError {
  constructor(message = 'Failed to build search index', options = {}) {
    super(message, options);
    this.statusCode = 500;
  }
}

/**
 * Error thrown for invalid input parameters
 */
export class ValidationError extends McpServerError {
  constructor(message, options = {}) {
    super(message, options);
    this.statusCode = 400;
  }
}

/**
 * Format error for MCP response
 * @param {Error} error - The error to format
 * @returns {Object} Formatted MCP error response
 */
export function formatErrorResponse(error) {
  const isOperational = error.isOperational !== undefined ? error.isOperational : false;

  return {
    content: [
      {
        type: 'text',
        text: `Error: ${error.message}${
          error.details ? `\n\nDetails: ${JSON.stringify(error.details, null, 2)}` : ''
        }`,
      },
    ],
    isError: true,
    ...(process.env.NODE_ENV === 'development' && {
      _debug: {
        name: error.name,
        stack: error.stack,
        isOperational,
      },
    }),
  };
}
