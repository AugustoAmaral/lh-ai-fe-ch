import { Brief, Severity, VerificationResult } from '../types';

export interface CitationSummary {
  verified: number;
  warnings: number;
  critical: number;
}

/**
 * Find a verification result for a given citation ID
 */
export function getResultForCitation(
  citationId: string,
  brief: Brief
): VerificationResult | undefined {
  return brief.verificationResults.find((r) => r.citationId === citationId);
}

/**
 * Get Tailwind CSS styles for a citation based on its severity
 */
export function getSeverityStyles(
  severity: Severity,
  isSelected: boolean
): string {
  const baseStyles =
    'px-1 py-0.5 rounded cursor-pointer transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-800';
  const selectedStyles = isSelected
    ? 'ring-2 ring-slate-900 dark:ring-slate-100 ring-offset-1 dark:ring-offset-slate-800'
    : '';

  switch (severity) {
    case 'critical':
      return `${baseStyles} ${selectedStyles} bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-200 border-b-2 border-red-400 dark:border-red-500 hover:bg-red-200 dark:hover:bg-red-900/60`;
    case 'warning':
      return `${baseStyles} ${selectedStyles} bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border-b-2 border-amber-400 dark:border-amber-500 hover:bg-amber-200 dark:hover:bg-amber-900/60`;
    default:
      return `${baseStyles} ${selectedStyles} bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border-b-2 border-emerald-400 dark:border-emerald-500 hover:bg-emerald-200 dark:hover:bg-emerald-900/60`;
  }
}

/**
 * Get human-readable label for a severity level
 */
export function getSeverityLabel(severity: Severity): string {
  switch (severity) {
    case 'critical':
      return 'Critical issue';
    case 'warning':
      return 'Warning';
    default:
      return 'Verified';
  }
}

/**
 * Calculate citation summary counts from verification results
 */
export function calculateCitationSummary(
  results: VerificationResult[] | undefined
): CitationSummary {
  if (!results) {
    return { verified: 0, warnings: 0, critical: 0 };
  }

  return {
    verified: results.filter((r) => r.severity === 'none').length,
    warnings: results.filter((r) => r.severity === 'warning').length,
    critical: results.filter((r) => r.severity === 'critical').length,
  };
}
