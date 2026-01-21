type EmptyCitationProps = {
  fontSizeClass: string;
  lineSpacingClass: string;
};
export function EmptyCitation({
  fontSizeClass,
  lineSpacingClass,
}: EmptyCitationProps) {
  return (
    <div
      className={`h-full flex flex-col items-center justify-center p-8 text-center ${fontSizeClass} ${lineSpacingClass}`}
    >
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-slate-400 dark:text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h2 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
        No Citation Selected
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-xs">
        Click on any highlighted citation in the document to view its
        verification details.
      </p>
    </div>
  );
}
