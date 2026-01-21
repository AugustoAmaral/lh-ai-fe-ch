import { useState } from 'react';
import { BriefViewer } from './components/BriefViewer';
import { DetailPanel } from './components/DetailPanel';
import { sampleBrief } from './data/sampleBrief';
import { Citation, VerificationResult } from './types';

function App() {
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [selectedResult, setSelectedResult] = useState<VerificationResult | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleCitationClick = (citation: Citation, result: VerificationResult) => {
    setSelectedCitation(citation);
    setSelectedResult(result);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedCitation(null);
    setSelectedResult(null);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
      {/* Header - Fixed at top */}
      <header className="flex-shrink-0 bg-white border-b border-slate-200 z-10">
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
              <h1 className="hidden xs:block text-xl font-semibold text-slate-900 whitespace-nowrap">
                Trusted Hand
              </h1>
            </div>
            <nav aria-label="Citation summary">
              <div className="flex items-center gap-2 xs:gap-4 text-sm">
                <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="text-slate-600">3 Verified</span>
                </span>
                <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  <span className="text-slate-600">2 Warnings</span>
                </span>
                <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                  <span className="text-slate-600">1 Critical</span>
                </span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content area - fills remaining height */}
      <div className="flex-1 flex min-h-0">
        {/* BriefViewer - scrollable */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BriefViewer
              brief={sampleBrief}
              onCitationClick={handleCitationClick}
              selectedCitationId={selectedCitation?.id || null}
            />
          </div>
        </main>

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
          <div className="h-full bg-white border-l border-slate-200 shadow-xl flex flex-col overflow-hidden">
            <DetailPanel
              citation={selectedCitation}
              result={selectedResult}
              onClose={handleClosePanel}
            />
          </div>
        </aside>

        {/* Backdrop */}
        <div
          className={`
            fixed inset-0 bg-slate-900/50 z-10 transition-opacity duration-300
            ${isPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={handleClosePanel}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default App;
