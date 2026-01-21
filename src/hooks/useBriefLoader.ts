import { useState, useEffect, useCallback } from 'react';
import { Brief } from '../types';
import { sampleBrief } from '../data/sampleBrief';

export type LoadingState = 'loading' | 'success' | 'error' | 'empty';

export interface UseBriefLoaderReturn {
  brief: Brief | null;
  loadingState: LoadingState;
  reload: () => void;
}

/**
 * Hook for loading and managing brief data
 * In a real app, this would handle API calls
 */
export function useBriefLoader(): UseBriefLoaderReturn {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');

  const loadBrief = useCallback(async () => {
    setLoadingState('loading');
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (sampleBrief && sampleBrief.citations.length > 0) {
        setBrief(sampleBrief);
        setLoadingState('success');
      } else {
        setLoadingState('empty');
      }
    } catch {
      setLoadingState('error');
    }
  }, []);

  useEffect(() => {
    loadBrief();
  }, [loadBrief]);

  const reload = useCallback(() => {
    loadBrief();
  }, [loadBrief]);

  return {
    brief,
    loadingState,
    reload,
  };
}
