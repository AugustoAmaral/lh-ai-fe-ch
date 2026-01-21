import { DetailPanelProps } from "../../types";
import { getStatusConfig } from "../../utils/verification";
import { ICON_SIZE_CLASSES } from "../../utils/styles";
import { SeverityBadge } from "../layout/SeverityBadge";
import { CloseButton } from "../layout/CloseButton";
import { EmptyCitation } from "./EmptyCitation";

export function DetailPanel({
  citation,
  result,
  onClose,
  readingSettings,
}: DetailPanelProps) {
  const fontSize = readingSettings?.fontSize ?? "medium";
  const fontSizeClass = readingSettings?.classes.fontSizeClass ?? "text-base";
  const lineSpacingClass =
    readingSettings?.classes.lineSpacingClass ?? "leading-relaxed";
  const iconSize = ICON_SIZE_CLASSES[fontSize];

  if (!citation || !result) {
    return (
      <EmptyCitation
        fontSizeClass={fontSizeClass}
        lineSpacingClass={lineSpacingClass}
      />
    );
  }

  const statusConfig = getStatusConfig(result.status);

  return (
    <div
      className={`h-full flex flex-col ${fontSizeClass} ${lineSpacingClass}`}
    >
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100">
          Citation Details
        </h2>
        <CloseButton onClick={onClose} iconSizeStatus={iconSize.status} />
      </header>

      {/* Content - scrollable only when needed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Status Card */}
        <div
          className={`p-4 rounded-lg border ${statusConfig.bgColor} ${statusConfig.borderColor}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <svg
              className={`${iconSize.status} flex-shrink-0 ${statusConfig.textColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={statusConfig.iconPath}
              />
            </svg>
            <span className={`font-semibold ${statusConfig.textColor}`}>
              {statusConfig.label}
            </span>
            <SeverityBadge
              severity={result.severity}
              fontSizeClass={fontSizeClass}
            />
          </div>
          <p className="text-slate-700 dark:text-slate-300">{result.message}</p>
        </div>

        {/* Citation Info */}
        <section aria-labelledby="citation-info-heading">
          <h3
            id="citation-info-heading"
            className="font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3"
          >
            Citation Information
          </h3>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
            <div className="px-4 py-3">
              <dt className="font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Full Citation
              </dt>
              <dd className="mt-1 text-slate-900 dark:text-slate-100 font-medium">
                {citation.text}
              </dd>
            </div>
            <div className="px-4 py-3">
              <dt className="font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Case Name
              </dt>
              <dd className="mt-1 text-slate-900 dark:text-slate-100">
                {citation.caseName}
              </dd>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-700">
              <div className="px-4 py-3">
                <dt className="font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Reporter
                </dt>
                <dd className="mt-1 text-slate-900 dark:text-slate-100">
                  {citation.reporter}
                </dd>
              </div>
              <div className="px-4 py-3">
                <dt className="font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Year
                </dt>
                <dd className="mt-1 text-slate-900 dark:text-slate-100">
                  {citation.year}
                </dd>
              </div>
            </div>
            {citation.pinCite && (
              <div className="px-4 py-3">
                <dt className="font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Pin Cite
                </dt>
                <dd className="mt-1 text-slate-900 dark:text-slate-100">
                  Page {citation.pinCite}
                </dd>
              </div>
            )}
          </div>
        </section>

        {/* Quote Comparison (if applicable) */}
        {(result.details?.expectedQuote || result.details?.actualQuote) && (
          <section aria-labelledby="quote-comparison-heading">
            <h3
              id="quote-comparison-heading"
              className="font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3"
            >
              Quote Comparison
            </h3>
            <div className="space-y-3">
              {result.details.expectedQuote && (
                <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className={`${iconSize.small} flex-shrink-0 text-amber-600 dark:text-amber-400`}
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
                    <span className="font-medium text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                      Quote in Brief
                    </span>
                  </div>
                  <p className="text-amber-900 dark:text-amber-200 italic">
                    "{result.details.expectedQuote}"
                  </p>
                </div>
              )}
              {result.details.actualQuote && (
                <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className={`${iconSize.small} flex-shrink-0 text-emerald-600 dark:text-emerald-400`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-medium text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                      Actual Source Quote
                    </span>
                  </div>
                  <p className="text-emerald-900 dark:text-emerald-200 italic">
                    "{result.details.actualQuote}"
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Treatment History (if applicable) */}
        {result.details?.treatmentHistory && (
          <section aria-labelledby="treatment-history-heading">
            <h3
              id="treatment-history-heading"
              className="font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3"
            >
              Treatment History
            </h3>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 p-4">
              <p className="text-slate-700 dark:text-slate-300">
                {result.details.treatmentHistory}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
