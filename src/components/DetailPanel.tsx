import { Citation, Severity, VerificationResult, VerificationStatus } from '../types';

interface DetailPanelProps {
  citation: Citation | null;
  result: VerificationResult | null;
  onClose?: () => void;
}

export function DetailPanel({ citation, result, onClose }: DetailPanelProps) {
  const getStatusConfig = (status: VerificationStatus) => {
    switch (status) {
      case 'valid':
        return {
          label: 'Verified',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
          bgColor: 'bg-emerald-100',
          textColor: 'text-emerald-700',
          borderColor: 'border-emerald-200',
        };
      case 'not_found':
        return {
          label: 'Not Found',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
        };
      case 'quote_mismatch':
        return {
          label: 'Quote Mismatch',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
        };
      case 'overruled':
        return {
          label: 'Overruled',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
        };
      case 'superseded':
        return {
          label: 'Superseded',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ),
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
        };
    }
  };

  const getSeverityBadge = (severity: Severity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Critical
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Warning
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            Valid
          </span>
        );
    }
  };

  if (!citation || !result) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-slate-900 mb-2">No Citation Selected</h2>
        <p className="text-sm text-slate-500 max-w-xs">
          Click on any highlighted citation in the document to view its verification details.
        </p>
      </div>
    );
  }

  const statusConfig = getStatusConfig(result.status);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-semibold text-slate-900">Citation Details</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Clear selection"
            title="Clear selection"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </header>

      {/* Content - scrollable only when needed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Status Card */}
        <div className={`p-4 rounded-lg border ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 ${statusConfig.textColor}`}>
              {statusConfig.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-semibold ${statusConfig.textColor}`}>
                  {statusConfig.label}
                </span>
                {getSeverityBadge(result.severity)}
              </div>
              <p className="mt-1 text-sm text-slate-700">{result.message}</p>
            </div>
          </div>
        </div>

        {/* Citation Info */}
        <section aria-labelledby="citation-info-heading">
          <h3 id="citation-info-heading" className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
            Citation Information
          </h3>
          <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
            <div className="px-4 py-3">
              <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Full Citation</dt>
              <dd className="mt-1 text-sm text-slate-900 font-medium">{citation.text}</dd>
            </div>
            <div className="px-4 py-3">
              <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Case Name</dt>
              <dd className="mt-1 text-sm text-slate-900">{citation.caseName}</dd>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-100">
              <div className="px-4 py-3">
                <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Reporter</dt>
                <dd className="mt-1 text-sm text-slate-900">{citation.reporter}</dd>
              </div>
              <div className="px-4 py-3">
                <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Year</dt>
                <dd className="mt-1 text-sm text-slate-900">{citation.year}</dd>
              </div>
            </div>
            {citation.pinCite && (
              <div className="px-4 py-3">
                <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pin Cite</dt>
                <dd className="mt-1 text-sm text-slate-900">Page {citation.pinCite}</dd>
              </div>
            )}
          </div>
        </section>

        {/* Quote Comparison (if applicable) */}
        {(result.details?.expectedQuote || result.details?.actualQuote) && (
          <section aria-labelledby="quote-comparison-heading">
            <h3 id="quote-comparison-heading" className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
              Quote Comparison
            </h3>
            <div className="space-y-3">
              {result.details.expectedQuote && (
                <div className="bg-amber-50 rounded-lg border border-amber-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs font-medium text-amber-800 uppercase tracking-wider">Quote in Brief</span>
                  </div>
                  <p className="text-sm text-amber-900 italic">"{result.details.expectedQuote}"</p>
                </div>
              )}
              {result.details.actualQuote && (
                <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs font-medium text-emerald-800 uppercase tracking-wider">Actual Source Quote</span>
                  </div>
                  <p className="text-sm text-emerald-900 italic">"{result.details.actualQuote}"</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Treatment History (if applicable) */}
        {result.details?.treatmentHistory && (
          <section aria-labelledby="treatment-history-heading">
            <h3 id="treatment-history-heading" className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
              Treatment History
            </h3>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-700 leading-relaxed">{result.details.treatmentHistory}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
