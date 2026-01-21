/**
 * Regular expression for matching citation placeholders in content.
 * Matches patterns like [[CITATION:1]], [[CITATION:2]], etc.
 */
export const CITATION_REGEX = /\[\[CITATION:(\d+)\]\]/g;

/**
 * Tests if a string contains citation placeholders.
 * Uses a fresh regex instance to avoid lastIndex issues.
 */
export function hasCitationPlaceholder(text: string): boolean {
  return /\[\[CITATION:(\d+)\]\]/.test(text);
}
