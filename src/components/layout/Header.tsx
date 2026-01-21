import { HeaderProps } from "../../types";
import { HeaderStatus } from "./HeaderStatus";

export function Header({ loadingState, citationSummary }: HeaderProps) {
  return (
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
          <HeaderStatus
            loadingState={loadingState}
            citationSummary={citationSummary}
          />
        </div>
      </div>
    </header>
  );
}
