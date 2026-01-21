import React from 'react';

/**
 * Process inline markdown (bold text) and delegate to italic processing
 */
export function processInlineMarkdown(
  text: string,
  keyPrefix: string
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;
  let partIndex = 0;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        processItalic(
          text.slice(lastIndex, match.index),
          `${keyPrefix}-bold-${partIndex++}`
        )
      );
    }
    parts.push(
      React.createElement(
        'strong',
        {
          key: `${keyPrefix}-strong-${partIndex++}`,
          className: 'font-semibold text-slate-900 dark:text-slate-100',
        },
        match[1]
      )
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(
      processItalic(text.slice(lastIndex), `${keyPrefix}-bold-${partIndex++}`)
    );
  }
  return parts.length > 0 ? parts : text;
}

/**
 * Process italic markdown (*text*)
 */
export function processItalic(
  text: string,
  keyPrefix: string
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const italicRegex = /\*([^*]+)\*/g;
  let lastIndex = 0;
  let match;
  let partIndex = 0;

  while ((match = italicRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        React.createElement(
          'span',
          { key: `${keyPrefix}-${partIndex++}` },
          text.slice(lastIndex, match.index)
        )
      );
    }
    parts.push(
      React.createElement(
        'em',
        { key: `${keyPrefix}-em-${partIndex++}`, className: 'italic' },
        match[1]
      )
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(
      React.createElement(
        'span',
        { key: `${keyPrefix}-${partIndex++}` },
        text.slice(lastIndex)
      )
    );
  }
  return parts.length > 0 ? parts : text;
}
