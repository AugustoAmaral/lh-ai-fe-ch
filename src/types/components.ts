import React from "react";
import { Brief, Citation, Severity, VerificationResult } from "./index";
import { FontSize, LineSpacing } from "../hooks/useReadingSettings";
import { UseReadingSettingsReturn } from "../hooks/useReadingSettings";
import { LoadingState } from "../hooks/useBriefLoader";
import { CitationSummary } from "../utils/citation";

export interface BriefContentProps {
  brief: Brief;
  selectedCitationId: string | null;
  onCitationClick: (citation: Citation, result: VerificationResult) => void;
  citationRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>;
}

export interface BriefViewerProps {
  brief: Brief;
  onCitationClick: (citation: Citation, result: VerificationResult) => void;
  selectedCitationId: string | null;
  fontSize?: FontSize;
  lineSpacing?: LineSpacing;
}

export interface CitationButtonProps {
  citation: Citation;
  severity: Severity;
  isSelected: boolean;
  onClick: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}

export interface DetailPanelProps {
  citation: Citation | null;
  result: VerificationResult | null;
  onClose?: () => void;
  readingSettings?: UseReadingSettingsReturn;
}

export interface ReadingControlsProps {
  settings: UseReadingSettingsReturn;
}

export interface HeaderProps {
  loadingState: LoadingState;
  citationSummary: CitationSummary;
}

export interface HeaderStatusProps {
  loadingState: LoadingState;
  citationSummary: CitationSummary;
}
