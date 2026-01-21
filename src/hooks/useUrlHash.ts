import { useEffect, useCallback, RefObject } from 'react';
import { Citation } from '../types';

/**
 * Hook for syncing URL hash with citation scroll position
 * Uses Intersection Observer to update URL as user scrolls
 */
export function useUrlHash(
  citationRefs: RefObject<Map<string, HTMLElement> | null>,
  citations: Citation[]
): void {
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const citationId = entry.target.getAttribute('data-citation-id');
          if (citationId) {
            const newUrl = new URL(window.location.href);
            newUrl.hash = `citation-${citationId}`;
            window.history.replaceState(null, '', newUrl.toString());
          }
        }
      }
    },
    []
  );

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    });

    citationRefs.current?.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [handleIntersection, citations]);

  // Scroll to citation from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#citation-')) {
      const citationId = hash.replace('#citation-', '');
      const element = citationRefs.current?.get(citationId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [citationRefs]);
}
