/**
 * Scrolls to top of main element and clears URL hash
 */
export function scrollToTopWithHashReset(): void {
  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
  document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
}
