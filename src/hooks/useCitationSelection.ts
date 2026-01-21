import { useState, useCallback } from 'react';
import { Citation, VerificationResult } from '../types';

export interface UseCitationSelectionReturn {
  selectedCitation: Citation | null;
  selectedResult: VerificationResult | null;
  isPanelOpen: boolean;
  selectCitation: (citation: Citation, result: VerificationResult) => void;
  clearSelection: () => void;
}

/**
 * Hook for managing citation selection state and detail panel visibility
 */
export function useCitationSelection(): UseCitationSelectionReturn {
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(
    null
  );
  const [selectedResult, setSelectedResult] =
    useState<VerificationResult | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const selectCitation = useCallback(
    (citation: Citation, result: VerificationResult) => {
      setSelectedCitation(citation);
      setSelectedResult(result);
      setIsPanelOpen(true);
    },
    []
  );

  const clearSelection = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedCitation(null);
    setSelectedResult(null);
  }, []);

  return {
    selectedCitation,
    selectedResult,
    isPanelOpen,
    selectCitation,
    clearSelection,
  };
}
