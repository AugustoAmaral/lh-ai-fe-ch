import React from "react";
import { processInlineMarkdown } from "../../utils/markdown";

type LineType =
  | "h1"
  | "h2"
  | "h3"
  | "blockquote"
  | "ordered-list"
  | "unordered-list"
  | "hr"
  | "empty"
  | "paragraph";

interface LineTypeConfig {
  type: LineType;
  content: string;
}

const HEADING_CLASSES: Record<string, string> = {
  h1: "text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4",
  h2: "text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3",
  h3: "text-lg font-semibold text-slate-800 dark:text-slate-200 mt-5 mb-2",
};

/**
 * Detects the type of markdown line and extracts its content
 */
export function detectLineType(line: string): LineTypeConfig {
  if (line.startsWith("# ")) {
    return { type: "h1", content: line.slice(2) };
  }
  if (line.startsWith("## ")) {
    return { type: "h2", content: line.slice(3) };
  }
  if (line.startsWith("### ")) {
    return { type: "h3", content: line.slice(4) };
  }
  if (line.trim() === "---") {
    return { type: "hr", content: "" };
  }
  if (line.startsWith("> ")) {
    return { type: "blockquote", content: line.slice(2) };
  }
  if (/^\d+\.\s/.test(line)) {
    return { type: "ordered-list", content: line.replace(/^\d+\.\s/, "") };
  }
  if (line.startsWith("- ")) {
    return { type: "unordered-list", content: line.slice(2) };
  }
  if (line.trim() === "") {
    return { type: "empty", content: "" };
  }
  return { type: "paragraph", content: line };
}

/**
 * Checks if line type is a heading
 */
export function isHeading(type: LineType): boolean {
  return type === "h1" || type === "h2" || type === "h3";
}

/**
 * Checks if line type is a list item
 */
export function isListItem(type: LineType): boolean {
  return type === "ordered-list" || type === "unordered-list";
}

/**
 * Gets the heading class for a line type
 */
export function getHeadingClass(type: LineType): string {
  return HEADING_CLASSES[type] || "";
}

/**
 * Gets the HTML tag for a heading type
 */
export function getHeadingTag(type: LineType): "h2" | "h3" | "h4" {
  if (type === "h1") return "h2";
  if (type === "h2") return "h3";
  return "h4";
}

interface MarkdownLineProps {
  line: string;
  keyPrefix: string;
}

/**
 * Renders a single line of markdown without citation handling.
 * For lines with citations, use BriefContent which handles the interleaving.
 */
export function MarkdownLine({
  line,
  keyPrefix,
}: MarkdownLineProps): React.ReactElement {
  const { type, content } = detectLineType(line);

  switch (type) {
    case "h1":
    case "h2":
    case "h3": {
      const Tag = getHeadingTag(type);
      return (
        <Tag key={keyPrefix} className={getHeadingClass(type)}>
          {content}
        </Tag>
      );
    }
    case "hr":
      return (
        <hr
          key={keyPrefix}
          className="my-6 border-slate-200 dark:border-slate-700"
        />
      );
    case "blockquote":
      return (
        <blockquote
          key={keyPrefix}
          className="border-l-4 border-indigo-300 dark:border-indigo-500 pl-4 py-2 my-4 italic text-slate-700 dark:text-slate-300 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-r"
        >
          {processInlineMarkdown(content, keyPrefix)}
        </blockquote>
      );
    case "ordered-list":
      return (
        <li key={keyPrefix} className="ml-6 mb-1 list-decimal">
          {processInlineMarkdown(content, keyPrefix)}
        </li>
      );
    case "unordered-list":
      return (
        <li key={keyPrefix} className="ml-6 mb-1 list-disc">
          {processInlineMarkdown(content, keyPrefix)}
        </li>
      );
    case "empty":
      return <div key={keyPrefix} className="h-4" />;
    default:
      return (
        <span key={keyPrefix}>{processInlineMarkdown(content, keyPrefix)}</span>
      );
  }
}

interface MarkdownLineWithChildrenProps {
  type: LineType;
  keyPrefix: string;
  children: React.ReactNode;
}

/**
 * Renders a markdown line wrapper with custom children (for citation interleaving)
 */
export function MarkdownLineWrapper({
  type,
  keyPrefix,
  children,
}: MarkdownLineWithChildrenProps): React.ReactElement {
  switch (type) {
    case "h1":
    case "h2":
    case "h3": {
      const Tag = getHeadingTag(type);
      return (
        <Tag key={keyPrefix} className={getHeadingClass(type)}>
          {children}
        </Tag>
      );
    }
    case "blockquote":
      return (
        <blockquote
          key={keyPrefix}
          className="border-l-4 border-indigo-300 dark:border-indigo-500 pl-4 py-2 my-4 italic text-slate-700 dark:text-slate-300 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-r"
        >
          {children}
        </blockquote>
      );
    case "ordered-list":
      return (
        <li key={keyPrefix} className="ml-6 mb-1 list-decimal">
          {children}
        </li>
      );
    case "unordered-list":
      return (
        <li key={keyPrefix} className="ml-6 mb-1 list-disc">
          {children}
        </li>
      );
    case "empty":
      return <div key={keyPrefix} className="h-4" />;
    default:
      return (
        <p key={keyPrefix} className="mb-3">
          {children}
        </p>
      );
  }
}
