import { useMemo } from 'react';
import { VerificationResult } from '../types';
import { CitationSummary, calculateCitationSummary } from '../utils/citation';

/**
 * Hook for computing memoized citation summary from verification results
 */
export function useCitationSummary(
  results: VerificationResult[] | undefined
): CitationSummary {
  return useMemo(() => calculateCitationSummary(results), [results]);
}
