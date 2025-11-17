import fs from 'fs/promises';
import { getManualPath, getReadmePath } from '../config.js';
import { IndexBuildError, formatErrorResponse } from '../errors.js';

/**
 * Documentation search index for Template Outlet documentation
 * Provides full-text search capabilities with relevance ranking
 */
class DocSearchIndex {
  constructor() {
    /** @type {Object|null} The built search index */
    this.index = null;
    /** @type {number|null} Timestamp of last index build */
    this.lastBuildTime = null;
    /** @type {number} Cache TTL in milliseconds (5 minutes) */
    this.cacheTTL = 5 * 60 * 1000;
  }

  /**
   * Build the search index from documentation files
   * @returns {Promise<Object>} The built index
   * @throws {Error} If documentation files cannot be loaded
   */
  async buildIndex() {
    // Check if cache is still valid
    if (this.index && this.lastBuildTime) {
      const cacheAge = Date.now() - this.lastBuildTime;
      if (cacheAge < this.cacheTTL) {
        return this.index;
      }
    }

    try {
      const readme = await fs.readFile(getReadmePath(), 'utf-8');
      const manual = await fs.readFile(getManualPath(), 'utf-8');

      this.index = {
        sections: this.parseSections(manual),
        examples: this.extractExamples(manual),
        api: this.extractAPI(manual),
        troubleshooting: this.extractTroubleshooting(manual),
        bestPractices: this.extractBestPractices(manual),
        readme: readme,
      };

      this.lastBuildTime = Date.now();
      return this.index;
    } catch (error) {
      console.error('Error building search index:', error);
      throw new IndexBuildError('Failed to load documentation files', {
        details: { originalError: error.message },
      });
    }
  }

  /**
   * Clear the search index cache
   * Forces a rebuild on next search
   */
  clearCache() {
    this.index = null;
    this.lastBuildTime = null;
  }

  /**
   * Parse markdown sections from documentation content
   * @param {string} content - The markdown content to parse
   * @returns {Array<Object>} Array of section objects with title, content, and position
   */
  parseSections(content) {
    const sections = [];
    const regex = /^## (.+)$/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const title = match[1];
      const startPos = match.index;

      // Find the next heading
      const remainingContent = content.slice(match.index + match[0].length);
      const nextHeadingMatch = remainingContent.match(/\n##/);
      const endPos = nextHeadingMatch
        ? startPos + match[0].length + nextHeadingMatch.index
        : content.length;

      sections.push({
        title,
        content: content.slice(startPos, endPos),
        position: startPos,
      });
    }

    return sections;
  }

  /**
   * Extract code examples from markdown content
   * @param {string} content - The markdown content to extract from
   * @returns {Array<Object>} Array of example objects with code and context
   */
  extractExamples(content) {
    const examples = [];
    const codeBlockRegex = /```html\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      examples.push({
        code: match[1],
        context: this.getContextAround(content, match.index, 300),
      });
    }

    return examples;
  }

  /**
   * Extract API Reference section from documentation
   * @param {string} content - The documentation content
   * @returns {string} The API Reference section content or empty string
   */
  extractAPI(content) {
    const apiSection = content.match(/## API Reference([\s\S]*?)(?=\n## |$)/);
    return apiSection ? apiSection[1] : '';
  }

  /**
   * Extract Troubleshooting section from documentation
   * @param {string} content - The documentation content
   * @returns {string} The Troubleshooting section content or empty string
   */
  extractTroubleshooting(content) {
    const troubleSection = content.match(/## Troubleshooting([\s\S]*?)(?=\n## |$)/);
    return troubleSection ? troubleSection[1] : '';
  }

  /**
   * Extract Best Practices section from documentation
   * @param {string} content - The documentation content
   * @returns {string} The Best Practices section content or empty string
   */
  extractBestPractices(content) {
    const bestPracticesSection = content.match(/## Best Practices([\s\S]*?)(?=\n## |$)/);
    return bestPracticesSection ? bestPracticesSection[1] : '';
  }

  /**
   * Get text context around a specific position
   * @param {string} text - The text to extract from
   * @param {number} position - The position to center around
   * @param {number} chars - Number of characters to include on each side
   * @returns {string} The extracted context
   */
  getContextAround(text, position, chars) {
    const start = Math.max(0, position - chars);
    const end = Math.min(text.length, position + chars);
    return text.slice(start, end).trim();
  }

  /**
   * Search the documentation index for a query
   * @param {string} query - The search query
   * @param {string} sectionFilter - Section filter ('all', 'api', 'examples', 'troubleshooting', 'best-practices')
   * @returns {Array<Object>} Array of search results sorted by relevance
   */
  search(query, sectionFilter = 'all') {
    const normalizedQuery = query.toLowerCase();
    const results = [];

    // Search in appropriate sections based on filter
    if (sectionFilter === 'all' || sectionFilter === 'api') {
      if (this.index.api && this.index.api.toLowerCase().includes(normalizedQuery)) {
        results.push({
          type: 'API Reference',
          snippet: this.getRelevantSnippet(this.index.api, normalizedQuery),
          relevance: this.calculateRelevance(this.index.api, normalizedQuery),
        });
      }
    }

    if (sectionFilter === 'all' || sectionFilter === 'troubleshooting') {
      if (
        this.index.troubleshooting &&
        this.index.troubleshooting.toLowerCase().includes(normalizedQuery)
      ) {
        results.push({
          type: 'Troubleshooting',
          snippet: this.getRelevantSnippet(this.index.troubleshooting, normalizedQuery),
          relevance: this.calculateRelevance(this.index.troubleshooting, normalizedQuery),
        });
      }
    }

    if (sectionFilter === 'all' || sectionFilter === 'best-practices') {
      if (
        this.index.bestPractices &&
        this.index.bestPractices.toLowerCase().includes(normalizedQuery)
      ) {
        results.push({
          type: 'Best Practices',
          snippet: this.getRelevantSnippet(this.index.bestPractices, normalizedQuery),
          relevance: this.calculateRelevance(this.index.bestPractices, normalizedQuery),
        });
      }
    }

    // Search in all sections
    this.index.sections.forEach((section) => {
      if (section.content.toLowerCase().includes(normalizedQuery)) {
        results.push({
          type: 'Section',
          title: section.title,
          snippet: this.getRelevantSnippet(section.content, normalizedQuery),
          relevance: this.calculateRelevance(section.content, normalizedQuery),
        });
      }
    });

    // Search in examples
    if (sectionFilter === 'all' || sectionFilter === 'examples') {
      this.index.examples.forEach((example, i) => {
        const searchText = example.context + '\n' + example.code;
        if (searchText.toLowerCase().includes(normalizedQuery)) {
          results.push({
            type: 'Example',
            title: `Code Example ${i + 1}`,
            snippet: this.getRelevantSnippet(searchText, normalizedQuery, 400),
            relevance: this.calculateRelevance(searchText, normalizedQuery),
          });
        }
      });
    }

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);

    return results.slice(0, 5); // Return top 5 results
  }

  /**
   * Extract a relevant snippet from content containing the query
   * @param {string} content - The content to extract from
   * @param {string} query - The search query
   * @param {number} contextChars - Number of context characters (default: 300)
   * @returns {string} The extracted snippet with ellipses if truncated
   */
  getRelevantSnippet(content, query, contextChars = 300) {
    const index = content.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) {
      return content.slice(0, contextChars) + '...';
    }

    const start = Math.max(0, index - contextChars / 2);
    const end = Math.min(content.length, index + query.length + contextChars / 2);

    let snippet = content.slice(start, end).trim();

    if (start > 0) {
      snippet = '...' + snippet;
    }
    if (end < content.length) {
      snippet = snippet + '...';
    }

    return snippet;
  }

  /**
   * Calculate relevance score for content matching a query
   * @param {string} content - The content to score
   * @param {string} query - The search query
   * @returns {number} Relevance score (higher is more relevant)
   */
  calculateRelevance(content, query) {
    const normalizedContent = content.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    // Count occurrences
    const matches = normalizedContent.match(new RegExp(normalizedQuery, 'g')) || [];
    const occurrences = matches.length;

    // Bonus for appearing in headings
    const headingBonus = content.match(new RegExp(`^##.*${normalizedQuery}`, 'im')) ? 50 : 0;

    // Bonus for exact matches
    const exactMatchBonus = normalizedContent.includes(normalizedQuery) ? 20 : 0;

    return occurrences * 10 + headingBonus + exactMatchBonus;
  }
}

const searchIndex = new DocSearchIndex();

/**
 * Search documentation for a query
 * @param {string} query - The search query
 * @param {string} section - Section filter ('all', 'api', 'examples', 'troubleshooting', 'best-practices')
 * @returns {Promise<Object>} MCP response object with search results
 */
export async function searchDocumentation(query, section = 'all') {
  try {
    await searchIndex.buildIndex();
    const results = searchIndex.search(query, section);

    if (results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `No results found for "${query}" in section "${section}".\n\nTry:\n- Using different keywords\n- Searching in "all" sections\n- Using the list-sections tool to see available topics`,
          },
        ],
      };
    }

    // Format response
    const content = results
      .map((result, i) => {
        const title = result.title ? `${result.type}: ${result.title}` : result.type;
        return `### ${i + 1}. ${title}\n\n${result.snippet}\n\n---\n`;
      })
      .join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `# Search Results for "${query}"\n\nFound ${results.length} relevant sections:\n\n${content}`,
        },
      ],
    };
  } catch (error) {
    return formatErrorResponse(error);
  }
}
