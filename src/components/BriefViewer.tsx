import { useEffect, useRef, useCallback } from 'react';
import { Brief, Citation, Severity, VerificationResult } from '../types';

interface BriefViewerProps {
  brief: Brief;
  onCitationClick: (citation: Citation, result: VerificationResult) => void;
  selectedCitationId: string | null;
  fontSize?: 'small' | 'medium' | 'large';
  lineSpacing?: 'compact' | 'normal' | 'relaxed';
}

export function BriefViewer({
  brief,
  onCitationClick,
  selectedCitationId,
  fontSize = 'medium',
  lineSpacing = 'normal',
}: BriefViewerProps) {
  const citationRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const getResultForCitation = (citationId: string): VerificationResult | undefined => {
    return brief.verificationResults.find((r) => r.citationId === citationId);
  };

  const getSeverityStyles = (severity: Severity, isSelected: boolean): string => {
    const baseStyles = 'px-1 py-0.5 rounded cursor-pointer transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-800';
    const selectedStyles = isSelected ? 'ring-2 ring-slate-900 dark:ring-slate-100 ring-offset-1 dark:ring-offset-slate-800' : '';

    switch (severity) {
      case 'critical':
        return `${baseStyles} ${selectedStyles} bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-200 border-b-2 border-red-400 dark:border-red-500 hover:bg-red-200 dark:hover:bg-red-900/60`;
      case 'warning':
        return `${baseStyles} ${selectedStyles} bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border-b-2 border-amber-400 dark:border-amber-500 hover:bg-amber-200 dark:hover:bg-amber-900/60`;
      default:
        return `${baseStyles} ${selectedStyles} bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border-b-2 border-emerald-400 dark:border-emerald-500 hover:bg-emerald-200 dark:hover:bg-emerald-900/60`;
    }
  };

  const getSeverityLabel = (severity: Severity): string => {
    switch (severity) {
      case 'critical':
        return 'Critical issue';
      case 'warning':
        return 'Warning';
      default:
        return 'Verified';
    }
  };

  // Font size classes
  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  // Line spacing classes
  const lineSpacingClasses = {
    compact: 'leading-snug',
    normal: 'leading-relaxed',
    relaxed: 'leading-loose',
  };

  // Intersection observer for URL updates
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const citationId = entry.target.getAttribute('data-citation-id');
        if (citationId) {
          const newUrl = new URL(window.location.href);
          newUrl.hash = `citation-${citationId}`;
          window.history.replaceState(null, '', newUrl.toString());
        }
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    });

    citationRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [handleIntersection, brief.citations]);

  // Scroll to citation from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#citation-')) {
      const citationId = hash.replace('#citation-', '');
      const element = citationRefs.current.get(citationId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, []);

  // Process inline markdown (bold, italic)
  const processInlineMarkdown = (text: string, keyPrefix: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match;
    let partIndex = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(processItalic(text.slice(lastIndex, match.index), `${keyPrefix}-bold-${partIndex++}`));
      }
      parts.push(<strong key={`${keyPrefix}-strong-${partIndex++}`} className="font-semibold text-slate-900 dark:text-slate-100">{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(processItalic(text.slice(lastIndex), `${keyPrefix}-bold-${partIndex++}`));
    }
    return parts.length > 0 ? parts : text;
  };

  const processItalic = (text: string, keyPrefix: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    const italicRegex = /\*([^*]+)\*/g;
    let lastIndex = 0;
    let match;
    let partIndex = 0;

    while ((match = italicRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={`${keyPrefix}-${partIndex++}`}>{text.slice(lastIndex, match.index)}</span>);
      }
      parts.push(<em key={`${keyPrefix}-em-${partIndex++}`} className="italic">{match[1]}</em>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(<span key={`${keyPrefix}-${partIndex++}`}>{text.slice(lastIndex)}</span>);
    }
    return parts.length > 0 ? parts : text;
  };

  // Render a single line with markdown formatting
  const renderMarkdownLine = (line: string, keyPrefix: string): React.ReactNode => {
    // Handle headers
    if (line.startsWith('# ')) {
      return <h2 key={keyPrefix} className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">{line.slice(2)}</h2>;
    }
    if (line.startsWith('## ')) {
      return <h3 key={keyPrefix} className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">{line.slice(3)}</h3>;
    }
    if (line.startsWith('### ')) {
      return <h4 key={keyPrefix} className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-5 mb-2">{line.slice(4)}</h4>;
    }
    // Handle horizontal rules
    if (line.trim() === '---') {
      return <hr key={keyPrefix} className="my-6 border-slate-200 dark:border-slate-700" />;
    }
    // Handle blockquotes
    if (line.startsWith('> ')) {
      return (
        <blockquote key={keyPrefix} className="border-l-4 border-indigo-300 dark:border-indigo-500 pl-4 py-2 my-4 italic text-slate-700 dark:text-slate-300 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-r">
          {processInlineMarkdown(line.slice(2), keyPrefix)}
        </blockquote>
      );
    }
    // Handle list items
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={keyPrefix} className="ml-6 mb-1 list-decimal">
          {processInlineMarkdown(line.replace(/^\d+\.\s/, ''), keyPrefix)}
        </li>
      );
    }
    if (line.startsWith('- ')) {
      return (
        <li key={keyPrefix} className="ml-6 mb-1 list-disc">
          {processInlineMarkdown(line.slice(2), keyPrefix)}
        </li>
      );
    }
    // Empty lines
    if (line.trim() === '') {
      return <div key={keyPrefix} className="h-4" />;
    }
    // Regular paragraph - return inline content
    return <span key={keyPrefix}>{processInlineMarkdown(line, keyPrefix)}</span>;
  };

  const renderCitationButton = (citationIndex: number) => {
    const citation = brief.citations[citationIndex];
    if (!citation) return null;

    const result = getResultForCitation(citation.id);
    const severity = result?.severity || 'none';
    const isSelected = selectedCitationId === citation.id;

    return (
      <button
        key={citation.id}
        ref={(el) => {
          if (el) citationRefs.current.set(citation.id, el);
        }}
        type="button"
        onClick={() => result && onCitationClick(citation, result)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            result && onCitationClick(citation, result);
          }
        }}
        className={getSeverityStyles(severity, isSelected)}
        aria-label={`Citation: ${citation.caseName}. Status: ${getSeverityLabel(severity)}. Click to view details.`}
        aria-pressed={isSelected}
        data-citation-id={citation.id}
        id={`citation-${citation.id}`}
      >
        {citation.text}
      </button>
    );
  };

  // Render content with inline citations
  const renderContent = () => {
    const content = brief.content;
    const lines = content.split('\n');
    const result: React.ReactNode[] = [];
    let lineIndex = 0;

    for (const line of lines) {
      const lineKey = `line-${lineIndex++}`;

      // Check if line contains citations
      const citationRegex = /\[\[CITATION:(\d+)\]\]/g;
      let hasCitation = citationRegex.test(line);
      citationRegex.lastIndex = 0; // Reset regex

      if (!hasCitation) {
        // No citations - render as regular markdown line
        result.push(renderMarkdownLine(line, lineKey));
      } else {
        // Has citations - need to render inline
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;
        let partIndex = 0;

        // Check if it's a special line (header, blockquote, list)
        const isHeader = /^#{1,3}\s/.test(line);
        const isBlockquote = line.startsWith('> ');
        const isListItem = /^(\d+\.\s|-)/.test(line);

        while ((match = citationRegex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            const textBetween = line.slice(lastIndex, match.index);
            // For inline content, just process the markdown
            if (!isHeader && !isBlockquote && !isListItem) {
              parts.push(<span key={`${lineKey}-text-${partIndex++}`}>{processInlineMarkdown(textBetween, `${lineKey}-${partIndex}`)}</span>);
            } else {
              parts.push(<span key={`${lineKey}-text-${partIndex++}`}>{processInlineMarkdown(textBetween.replace(/^[#>\-\d.]+\s*/, ''), `${lineKey}-${partIndex}`)}</span>);
            }
          }

          const citationIndex = parseInt(match[1], 10) - 1;
          parts.push(renderCitationButton(citationIndex));
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < line.length) {
          const remainingText = line.slice(lastIndex);
          parts.push(<span key={`${lineKey}-text-${partIndex++}`}>{processInlineMarkdown(remainingText, `${lineKey}-end`)}</span>);
        }

        // Wrap in appropriate container based on line type
        if (isHeader) {
          const level = line.match(/^(#{1,3})/)?.[1].length || 1;
          const className = level === 1
            ? 'text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4'
            : level === 2
            ? 'text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3'
            : 'text-lg font-semibold text-slate-800 dark:text-slate-200 mt-5 mb-2';
          const Tag = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';
          result.push(<Tag key={lineKey} className={className}>{parts}</Tag>);
        } else if (isBlockquote) {
          result.push(
            <blockquote key={lineKey} className="border-l-4 border-indigo-300 dark:border-indigo-500 pl-4 py-2 my-4 italic text-slate-700 dark:text-slate-300 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-r">
              {parts}
            </blockquote>
          );
        } else if (isListItem) {
          const isOrdered = /^\d+\./.test(line);
          result.push(
            <li key={lineKey} className={`ml-6 mb-1 ${isOrdered ? 'list-decimal' : 'list-disc'}`}>
              {parts}
            </li>
          );
        } else if (line.trim() === '') {
          result.push(<div key={lineKey} className="h-4" />);
        } else {
          // Regular paragraph with inline citations
          result.push(<p key={lineKey} className="mb-3">{parts}</p>);
        }
      }
    }

    return result;
  };

  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
      <header className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{brief.title}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {brief.citations.length} citations • Click on highlighted text to verify
        </p>
      </header>
      <div className={`px-6 py-6 text-slate-700 dark:text-slate-300 ${fontSizeClasses[fontSize]} ${lineSpacingClasses[lineSpacing]}`}>
        {renderContent()}
      </div>
    </article>
  );
}
