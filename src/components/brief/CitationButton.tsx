import { CitationButtonProps } from '../../types';
import { getSeverityStyles, getSeverityLabel } from '../../utils/citation';

export function CitationButton({
  citation,
  severity,
  isSelected,
  onClick,
  buttonRef,
}: CitationButtonProps) {
  return (
    <button
      key={citation.id}
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
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
}
