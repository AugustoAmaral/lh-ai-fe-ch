import { HeaderStatusProps } from "../../types";

export function HeaderStatus({
  loadingState,
  citationSummary,
}: HeaderStatusProps) {
  if (loadingState === "loading") {
    return (
      <nav aria-label="Citation summary loading">
        <div className="flex items-center gap-2 xs:gap-4 text-sm animate-pulse">
          <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
            <span
              className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-slate-300 dark:bg-slate-600"
              aria-hidden="true"
            />
            <span className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          </span>
          <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
            <span
              className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-slate-300 dark:bg-slate-600"
              aria-hidden="true"
            />
            <span className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          </span>
          <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
            <span
              className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-slate-300 dark:bg-slate-600"
              aria-hidden="true"
            />
            <span className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          </span>
        </div>
      </nav>
    );
  }

  if (loadingState === "success") {
    return (
      <nav aria-label="Citation summary">
        <div className="flex items-center gap-2 xs:gap-4 text-sm">
          <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
            <span
              className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <span className="text-slate-600 dark:text-slate-300">
              {citationSummary.verified} Verified
            </span>
          </span>
          <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
            <span
              className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-amber-500"
              aria-hidden="true"
            />
            <span className="text-slate-600 dark:text-slate-300">
              {citationSummary.warnings} Warnings
            </span>
          </span>
          <span className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
            <span
              className="w-2 h-2 xs:w-2.5 xs:h-2.5 flex-shrink-0 rounded-full bg-red-500"
              aria-hidden="true"
            />
            <span className="text-slate-600 dark:text-slate-300">
              {citationSummary.critical} Critical
            </span>
          </span>
        </div>
      </nav>
    );
  }

  if (loadingState === "error") {
    return (
      <div className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error loading</span>
      </div>
    );
  }

  if (loadingState === "empty") {
    return (
      <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>No citations</span>
      </div>
    );
  }

  return null;
}
