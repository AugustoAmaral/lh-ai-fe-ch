import { useEffect } from 'react';

/**
 * Hook for handling Escape key press
 * @param callback - Function to call when Escape is pressed
 * @param enabled - Whether the listener is active
 */
export function useEscapeKey(callback: () => void, enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [callback, enabled]);
}
