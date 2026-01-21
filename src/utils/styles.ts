import { FontSize, LineSpacing } from "../types";

export const FONT_SIZE_CLASSES: Record<FontSize, string> = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

export const LINE_SPACING_CLASSES: Record<LineSpacing, string> = {
  compact: "leading-snug",
  normal: "leading-relaxed",
  relaxed: "leading-loose",
};

export const FONT_SIZE_LABELS: Record<FontSize, string> = {
  small: "S",
  medium: "M",
  large: "L",
};

export const LINE_SPACING_LABELS: Record<LineSpacing, string> = {
  compact: "Compact",
  normal: "Normal",
  relaxed: "Relaxed",
};

export const ICON_SIZE_CLASSES: Record<FontSize, { status: string; small: string }> = {
  small: { status: "w-4 h-4", small: "w-3 h-3" },
  medium: { status: "w-5 h-5", small: "w-4 h-4" },
  large: { status: "w-6 h-6", small: "w-5 h-5" },
};
