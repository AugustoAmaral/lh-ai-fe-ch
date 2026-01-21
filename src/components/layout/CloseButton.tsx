export function CloseButton({
  onClick,
  iconSizeStatus,
}: {
  onClick?: () => void;
  iconSizeStatus?: string;
}) {
  if (!onClick) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
      aria-label="Clear selection (Escape)"
      title="Clear selection (Escape)"
    >
      <svg
        className={iconSizeStatus}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
