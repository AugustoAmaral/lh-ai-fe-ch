export interface Citation {
  id: string;
  text: string;
  caseName: string;
  reporter: string;
  pinCite?: string;
  year: number;
  position: {
    start: number;
    end: number;
  };
}

export type VerificationStatus =
  | 'valid'
  | 'not_found'
  | 'quote_mismatch'
  | 'overruled'
  | 'superseded';

export type Severity = 'none' | 'warning' | 'critical';

export interface VerificationResult {
  id: string;
  citationId: string;
  status: VerificationStatus;
  severity: Severity;
  message: string;
  details?: {
    expectedQuote?: string;
    actualQuote?: string;
    treatmentHistory?: string;
  };
}

export interface Brief {
  id: string;
  title: string;
  content: string;
  citations: Citation[];
  verificationResults: VerificationResult[];
}

// Re-export utility types for convenience
export type { CitationSummary } from '../utils/citation';
export type { FontSize, LineSpacing } from '../hooks/useReadingSettings';
export type { LoadingState } from '../hooks/useBriefLoader';

// Re-export component props types
export type {
  BriefContentProps,
  BriefViewerProps,
  CitationButtonProps,
  DetailPanelProps,
  ReadingControlsProps,
  HeaderProps,
  HeaderStatusProps,
} from './components';
