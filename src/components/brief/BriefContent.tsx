import React from "react";
import { Severity, BriefContentProps } from "../../types";
import { processInlineMarkdown } from "../../utils/markdown";
import { getResultForCitation } from "../../utils/citation";
import { CITATION_REGEX, hasCitationPlaceholder } from "../../utils/constants";
import { CitationButton } from "./CitationButton";
import {
  MarkdownLine,
  MarkdownLineWrapper,
  detectLineType,
} from "./MarkdownRenderer";

export function BriefContent({
  brief,
  selectedCitationId,
  onCitationClick,
  citationRefs,
}: BriefContentProps) {
  const renderCitationButton = (citationIndex: number) => {
    const citation = brief.citations[citationIndex];
    if (!citation) return null;

    const result = getResultForCitation(citation.id, brief);
    const severity: Severity = result?.severity || "none";
    const isSelected = selectedCitationId === citation.id;

    return (
      <CitationButton
        key={citation.id}
        citation={citation}
        severity={severity}
        isSelected={isSelected}
        onClick={() => result && onCitationClick(citation, result)}
        buttonRef={(el) => {
          if (el) citationRefs.current.set(citation.id, el);
        }}
      />
    );
  };

  const renderLineWithCitations = (line: string, lineKey: string) => {
    const { type } = detectLineType(line);
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let partIndex = 0;

    // Reset regex lastIndex for each line iteration
    CITATION_REGEX.lastIndex = 0;

    while ((match = CITATION_REGEX.exec(line)) !== null) {
      if (match.index > lastIndex) {
        const textBetween = line.slice(lastIndex, match.index);
        // Remove markdown prefix from first segment if it's a special line type
        const textToRender =
          partIndex === 0
            ? textBetween.replace(/^[#>\-\d.]+\s*/, "")
            : textBetween;

        parts.push(
          <span key={`${lineKey}-text-${partIndex++}`}>
            {processInlineMarkdown(textToRender, `${lineKey}-${partIndex}`)}
          </span>
        );
      }

      const citationIndex = parseInt(match[1], 10) - 1;
      const citationButton = renderCitationButton(citationIndex);
      if (citationButton) {
        parts.push(
          <React.Fragment key={`${lineKey}-citation-${partIndex++}`}>
            {citationButton}
          </React.Fragment>
        );
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      const remainingText = line.slice(lastIndex);
      parts.push(
        <span key={`${lineKey}-text-${partIndex++}`}>
          {processInlineMarkdown(remainingText, `${lineKey}-end`)}
        </span>
      );
    }

    return (
      <MarkdownLineWrapper type={type} keyPrefix={lineKey}>
        {parts}
      </MarkdownLineWrapper>
    );
  };

  const renderContent = () => {
    const lines = brief.content.split("\n");
    const result: React.ReactNode[] = [];
    let lineIndex = 0;

    for (const line of lines) {
      const lineKey = `line-${lineIndex++}`;

      if (!hasCitationPlaceholder(line)) {
        result.push(<MarkdownLine key={lineKey} line={line} keyPrefix={lineKey} />);
      } else {
        result.push(
          <React.Fragment key={lineKey}>
            {renderLineWithCitations(line, lineKey)}
          </React.Fragment>
        );
      }
    }

    return result;
  };

  return <>{renderContent()}</>;
}
