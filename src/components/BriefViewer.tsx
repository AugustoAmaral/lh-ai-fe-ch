import { Brief, Citation, Severity, VerificationResult } from '../types';

interface BriefViewerProps {
  brief: Brief;
  onCitationClick: (citation: Citation, result: VerificationResult) => void;
  selectedCitationId: string | null;
}

export function BriefViewer({
  brief,
  onCitationClick,
  selectedCitationId,
}: BriefViewerProps) {
  const getResultForCitation = (citationId: string): VerificationResult | undefined => {
    return brief.verificationResults.find((r) => r.citationId === citationId);
  };

  const getSeverityStyles = (severity: Severity, isSelected: boolean): string => {
    const baseStyles = 'px-1 py-0.5 rounded cursor-pointer transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1';
    const selectedStyles = isSelected ? 'ring-2 ring-slate-900 ring-offset-1' : '';

    switch (severity) {
      case 'critical':
        return `${baseStyles} ${selectedStyles} bg-red-100 text-red-900 border-b-2 border-red-400 hover:bg-red-200`;
      case 'warning':
        return `${baseStyles} ${selectedStyles} bg-amber-100 text-amber-900 border-b-2 border-amber-400 hover:bg-amber-200`;
      default:
        return `${baseStyles} ${selectedStyles} bg-emerald-100 text-emerald-900 border-b-2 border-emerald-400 hover:bg-emerald-200`;
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

  const renderMarkdownLine = (line: string, keyPrefix: string): React.ReactNode => {
    // Handle headers
    if (line.startsWith('# ')) {
      return <h2 key={keyPrefix} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{line.slice(2)}</h2>;
    }
    if (line.startsWith('## ')) {
      return <h3 key={keyPrefix} className="text-xl font-semibold text-slate-800 mt-6 mb-3">{line.slice(3)}</h3>;
    }
    if (line.startsWith('### ')) {
      return <h4 key={keyPrefix} className="text-lg font-semibold text-slate-800 mt-5 mb-2">{line.slice(4)}</h4>;
    }
    // Handle horizontal rules
    if (line.trim() === '---') {
      return <hr key={keyPrefix} className="my-6 border-slate-200" />;
    }
    // Handle blockquotes
    if (line.startsWith('> ')) {
      return (
        <blockquote key={keyPrefix} className="border-l-4 border-indigo-300 pl-4 py-2 my-4 italic text-slate-700 bg-indigo-50/50 rounded-r">
          {processInlineMarkdown(line.slice(2))}
        </blockquote>
      );
    }
    // Handle list items
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={keyPrefix} className="ml-6 mb-1 list-decimal">
          {processInlineMarkdown(line.replace(/^\d+\.\s/, ''))}
        </li>
      );
    }
    if (line.startsWith('- ')) {
      return (
        <li key={keyPrefix} className="ml-6 mb-1 list-disc">
          {processInlineMarkdown(line.slice(2))}
        </li>
      );
    }
    // Empty lines
    if (line.trim() === '') {
      return <div key={keyPrefix} className="h-4" />;
    }
    // Regular paragraph
    return <p key={keyPrefix} className="mb-3 leading-relaxed">{processInlineMarkdown(line)}</p>;
  };

  const processInlineMarkdown = (text: string): React.ReactNode => {
    // Process bold (**text**)
    const parts: React.ReactNode[] = [];
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match;
    let partIndex = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(processItalic(text.slice(lastIndex, match.index), `bold-${partIndex++}`));
      }
      parts.push(<strong key={`strong-${partIndex++}`} className="font-semibold">{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(processItalic(text.slice(lastIndex), `bold-${partIndex++}`));
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

  const renderContent = () => {
    const content = brief.content;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    const citationRegex = /\[\[CITATION:(\d+)\]\]/g;
    let match;

    while ((match = citationRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        // Process the text between citations
        const textBetween = content.slice(lastIndex, match.index);
        const lines = textBetween.split('\n');
        lines.forEach((line, idx) => {
          parts.push(renderMarkdownLine(line, `text-${lastIndex}-${idx}`));
        });
      }

      const citationIndex = parseInt(match[1], 10) - 1;
      const citation = brief.citations[citationIndex];

      if (citation) {
        const result = getResultForCitation(citation.id);
        const severity = result?.severity || 'none';
        const isSelected = selectedCitationId === citation.id;

        parts.push(
          <button
            key={citation.id}
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
          >
            {citation.text}
          </button>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex);
      const lines = remainingText.split('\n');
      lines.forEach((line, idx) => {
        parts.push(renderMarkdownLine(line, `text-end-${idx}`));
      });
    }

    return parts;
  };

  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <header className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <h1 className="text-2xl font-bold text-slate-900">{brief.title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {brief.citations.length} citations • Click on highlighted text to verify
        </p>
      </header>
      <div className="px-6 py-6 text-slate-700 prose prose-slate max-w-none">
        {renderContent()}
      </div>
    </article>
  );
}
