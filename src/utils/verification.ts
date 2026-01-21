import { VerificationStatus } from "../types";

export interface StatusConfig {
  label: string;
  iconPath: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const STATUS_CONFIGS: Record<VerificationStatus, StatusConfig> = {
  valid: {
    label: "Verified",
    iconPath: "M5 13l4 4L19 7",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/40",
    textColor: "text-emerald-700 dark:text-emerald-300",
    borderColor: "border-emerald-200 dark:border-emerald-700",
  },
  not_found: {
    label: "Not Found",
    iconPath: "M6 18L18 6M6 6l12 12",
    bgColor: "bg-red-100 dark:bg-red-900/40",
    textColor: "text-red-700 dark:text-red-300",
    borderColor: "border-red-200 dark:border-red-700",
  },
  quote_mismatch: {
    label: "Quote Mismatch",
    iconPath:
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    textColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-700",
  },
  overruled: {
    label: "Overruled",
    iconPath: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    textColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-700",
  },
  superseded: {
    label: "Superseded",
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    textColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-700",
  },
};

/**
 * Get configuration for a verification status (colors, icon, label)
 */
export function getStatusConfig(status: VerificationStatus): StatusConfig {
  return STATUS_CONFIGS[status];
}
