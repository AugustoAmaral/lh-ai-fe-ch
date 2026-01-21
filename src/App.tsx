import {
  BriefViewer,
  LoadingState,
  ErrorState,
  EmptyState,
} from "./components/brief";
import { DetailPanel } from "./components/detail/DetailPanel";
import { ReadingControls } from "./components/ReadingControls";
import { Header, Drawer } from "./components/layout";
import {
  useReadingSettings,
  useBriefLoader,
  useCitationSelection,
  useCitationSummary,
  useEscapeKey,
} from "./hooks";

function App() {
  const { brief, loadingState, reload } = useBriefLoader();
  const selection = useCitationSelection();
  const citationSummary = useCitationSummary(brief?.verificationResults);
  const readingSettings = useReadingSettings();
  useEscapeKey(selection.clearSelection, selection.isPanelOpen);

  const renderContent = () => {
    switch (loadingState) {
      case "loading":
        return <LoadingState />;
      case "error":
        return <ErrorState onRetry={reload} />;
      case "empty":
        return <EmptyState />;
      case "success":
        return brief ? (
          <div className="flex-1 flex flex-col min-h-0">
            <main className="flex-1 min-w-0 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <BriefViewer
                  brief={brief}
                  onCitationClick={selection.selectCitation}
                  selectedCitationId={selection.selectedCitation?.id || null}
                  fontSize={readingSettings.fontSize}
                  lineSpacing={readingSettings.lineSpacing}
                />
              </div>
            </main>

            <ReadingControls settings={readingSettings} />

            <Drawer
              isOpen={selection.isPanelOpen}
              onClose={selection.clearSelection}
            >
              <DetailPanel
                citation={selection.selectedCitation}
                result={selection.selectedResult}
                onClose={selection.clearSelection}
                readingSettings={readingSettings}
              />
            </Drawer>
          </div>
        ) : null;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors">
      <Header loadingState={loadingState} citationSummary={citationSummary} />
      {renderContent()}
    </div>
  );
}

export default App;
