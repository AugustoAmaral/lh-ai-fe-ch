import { useState, useEffect, useCallback } from 'react';
import { BriefViewer } from './components/BriefViewer';
import { DetailPanel } from './components/DetailPanel';
import { ReadingControls } from './components/ReadingControls';
import { useReadingSettings } from './hooks/useReadingSettings';
import { sampleBrief } from './data/sampleBrief';
import { Brief, Citation, VerificationResult } from './types';

type LoadingState = 'loading' | 'success' | 'error' | 'empty';

function App() {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [selectedResult, setSelectedResult] = useState<VerificationResult | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const readingSettings = useReadingSettings();

  // Simulate loading the brief (in real app this would be an API call)
  useEffect(() => {
    const loadBrief = async () => {
      setLoadingState('loading');
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (sampleBrief && sampleBrief.citations.length > 0) {
          setBrief(sampleBrief);
          setLoadingState('success');
        } else {
          setLoadingState('empty');
        }
      } catch {
        setLoadingState('error');
      }
    };
    loadBrief();
  }, []);

  const handleCitationClick = (citation: Citation, result: VerificationResult) => {
    setSelectedCitation(citation);
    setSelectedResult(result);
    setIsPanelOpen(true);
  };

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedCitation(null);
    setSelectedResult(null);
  }, []);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        handleClosePanel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, handleClosePanel]);

  // Calculate citation summary from brief
  const citationSummary = brief
    ? {
        verified: brief.verificationResults.filter((r) => r.severity === 'none').length,
        warnings: brief.verificationResults.filter((r) => r.severity === 'warning').length,
        critical: brief.verificationResults.filter((r) => r.severity === 'critical').length,
      }
    : { verified: 0, warnings: 0, critical: 0 };

  const renderContent = () => {
    switch (loadingState) {
      case 'loading':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 relative">
                <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">Loading Brief</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Verifying citations...</p>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">Unable to Load Brief</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                There was a problem loading your document. Please try again or contact support if the issue persists.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          </div>
        );
      case 'empty':
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No Brief Found</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Upload a legal brief to start verifying citations.
              </p>
            </div>
          </div>
        );
      case 'success':
        return brief ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* BriefViewer - scrollable */}
            <main className="flex-1 min-w-0 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <BriefViewer
                  brief={brief}
                  onCitationClick={handleCitationClick}
                  selectedCitationId={selectedCitation?.id || null}
                  fontSize={readingSettings.fontSize}
                  lineSpacing={readingSettings.lineSpacing}
                />
              </div>
            </main>

            {/* Bottom bar with reading controls */}
            <ReadingControls settings={readingSettings} />

            {/* Detail panel - slides in from right when citation is selected */}
            <aside
              className={`
                fixed inset-y-0 right-0 z-20 w-full sm:w-96 lg:w-[420px]
                transform transition-transform duration-300 ease-in-out
                ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}
              `}
              aria-label="Citation details"
              aria-hidden={!isPanelOpen}
            >
              <div className="h-full bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-xl flex flex-col overflow-hidden transition-colors">
                <DetailPanel
                  citation={selectedCitation}
                  result={selectedResult}
                  onClose={handleClosePanel}
                  readingSettings={readingSettings}
                />
              </div>
            </aside>

            {/* Backdrop */}
            <div
              className={`
                fixed inset-0 bg-slate-900/50 dark:bg-slate-950/70 z-10 transition-opacity duration-300
                ${isPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}
              onClick={handleClosePanel}
              aria-hidden="true"
            />
          </div>
        ) : null;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header - Fixed at top */}
      <header className="flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 xs:gap-3 flex-shrink-0">
              <div className="w-8 h-8 flex-shrink-0 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="hidden xs:block text-xl font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                Trusted Hand
              </h1>
            </div>
            {loadingState === 'loading' && (
              <nav aria-label="Citation summary loading">
                <div className="flex items-center gap-2 xs:gap-4 text-sm animate-pulse">
                  <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
                    <span className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                  </span>
                  <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
                    <span className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                  </span>
                  <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
                    <span className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                  </span>
                </div>
              </nav>
            )}
            {loadingState === 'success' && (
              <nav aria-label="Citation summary">
                <div className="flex items-center gap-2 xs:gap-4 text-sm">
                  <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span className="text-slate-600 dark:text-slate-300">{citationSummary.verified} Verified</span>
                  </span>
                  <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                    <span className="text-slate-600 dark:text-slate-300">{citationSummary.warnings} Warnings</span>
                  </span>
                  <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                    <span className="text-slate-600 dark:text-slate-300">{citationSummary.critical} Critical</span>
                  </span>
                </div>
              </nav>
            )}
            {loadingState === 'error' && (
              <div className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error loading</span>
              </div>
            )}
            {loadingState === 'empty' && (
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>No citations</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content area - fills remaining height */}
      {renderContent()}
    </div>
  );
}

export default App;
