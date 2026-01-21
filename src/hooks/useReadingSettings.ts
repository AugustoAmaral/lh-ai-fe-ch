import { useState, useEffect, useCallback, useMemo } from "react";
import {
  FONT_SIZE_CLASSES,
  LINE_SPACING_CLASSES,
  FONT_SIZE_LABELS,
  LINE_SPACING_LABELS,
} from "../utils";

export type FontSize = "small" | "medium" | "large";
export type LineSpacing = "compact" | "normal" | "relaxed";

export interface ReadingSettings {
  fontSize: FontSize;
  lineSpacing: LineSpacing;
  isDarkMode: boolean;
}

export interface ReadingSettingsActions {
  setFontSize: (size: FontSize) => void;
  setLineSpacing: (spacing: LineSpacing) => void;
  setIsDarkMode: (isDark: boolean) => void;
  cycleFontSize: () => void;
  cycleLineSpacing: () => void;
  toggleDarkMode: () => void;
}

export interface ReadingSettingsClasses {
  fontSizeClass: string;
  lineSpacingClass: string;
}

export interface UseReadingSettingsReturn
  extends ReadingSettings, ReadingSettingsActions {
  classes: ReadingSettingsClasses;
  labels: {
    fontSize: string;
    lineSpacing: string;
  };
}

export function useReadingSettings(): UseReadingSettingsReturn {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fontSize");
      return (saved as FontSize) || "medium";
    }
    return "medium";
  });

  const [lineSpacing, setLineSpacingState] = useState<LineSpacing>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lineSpacing");
      return (saved as LineSpacing) || "normal";
    }
    return "normal";
  });

  const [isDarkMode, setIsDarkModeState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("lineSpacing", lineSpacing);
  }, [lineSpacing]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  // Setters
  const setFontSize = useCallback((size: FontSize) => {
    setFontSizeState(size);
  }, []);

  const setLineSpacing = useCallback((spacing: LineSpacing) => {
    setLineSpacingState(spacing);
  }, []);

  const setIsDarkMode = useCallback((isDark: boolean) => {
    setIsDarkModeState(isDark);
  }, []);

  // Cyclers
  const cycleFontSize = useCallback(() => {
    setFontSizeState((prev) => {
      if (prev === "small") return "medium";
      if (prev === "medium") return "large";
      return "small";
    });
  }, []);

  const cycleLineSpacing = useCallback(() => {
    setLineSpacingState((prev) => {
      if (prev === "compact") return "normal";
      if (prev === "normal") return "relaxed";
      return "compact";
    });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkModeState((prev) => !prev);
  }, []);

  // CSS classes based on settings
  const classes = useMemo<ReadingSettingsClasses>(
    () => ({
      fontSizeClass: FONT_SIZE_CLASSES[fontSize],
      lineSpacingClass: LINE_SPACING_CLASSES[lineSpacing],
    }),
    [fontSize, lineSpacing],
  );

  // Labels for UI
  const labels = useMemo(
    () => ({
      fontSize: FONT_SIZE_LABELS[fontSize],
      lineSpacing: LINE_SPACING_LABELS[lineSpacing],
    }),
    [fontSize, lineSpacing],
  );

  return {
    fontSize,
    lineSpacing,
    isDarkMode,
    setFontSize,
    setLineSpacing,
    setIsDarkMode,
    cycleFontSize,
    cycleLineSpacing,
    toggleDarkMode,
    classes,
    labels,
  };
}
