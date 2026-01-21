import { useRef } from 'react';
import { BriefViewerProps } from '../../types';
import { useUrlHash } from '../../hooks/useUrlHash';
import { FONT_SIZE_CLASSES, LINE_SPACING_CLASSES } from '../../utils/styles';
import { BriefContent } from './BriefContent';

export function BriefViewer({
  brief,
  onCitationClick,
  selectedCitationId,
  fontSize = 'medium',
  lineSpacing = 'normal',
}: BriefViewerProps) {
  const citationRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Handle URL hash synchronization
  useUrlHash(citationRefs, brief.citations);

  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
      <header className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {brief.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {brief.citations.length} citations • Click on highlighted text to
          verify
        </p>
      </header>
      <div
        className={`px-6 py-6 text-slate-700 dark:text-slate-300 ${FONT_SIZE_CLASSES[fontSize]} ${LINE_SPACING_CLASSES[lineSpacing]}`}
      >
        <BriefContent
          brief={brief}
          selectedCitationId={selectedCitationId}
          onCitationClick={onCitationClick}
          citationRefs={citationRefs}
        />
      </div>
    </article>
  );
}
