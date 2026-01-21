import { Severity } from "../../types";

type SeverityBadgeProps = {
  severity: Severity;
  fontSizeClass: string;
};

export function SeverityBadge({ severity, fontSizeClass }: SeverityBadgeProps) {
  const baseClasses = `inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${fontSizeClass}`;
  switch (severity) {
    case "critical":
      return (
        <span
          className={`${baseClasses} bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200`}
        >
          Critical
        </span>
      );
    case "warning":
      return (
        <span
          className={`${baseClasses} bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200`}
        >
          Warning
        </span>
      );
    default:
      return (
        <span
          className={`${baseClasses} bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200`}
        >
          Valid
        </span>
      );
  }
}
