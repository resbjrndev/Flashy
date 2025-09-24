import { useState, useEffect, useCallback } from 'react';
import { getDecks, initializeWithMockData } from '@/lib/storage';
import { Deck } from '@/types';

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshDecks = useCallback(() => {
    const loadedDecks = getDecks();
    setDecks(loadedDecks);
  }, []);

  useEffect(() => {
    // Load decks from localStorage, initialize with mock data only if completely empty
    const loadedDecks = getDecks();
    if (loadedDecks.length === 0) {
      initializeWithMockData();
      const mockDecks = getDecks();
      setDecks(mockDecks);
    } else {
      setDecks(loadedDecks);
    }
    setLoading(false);
  }, []);

  // Refresh decks when the page becomes visible (user returns from other pages)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshDecks();
      }
    };

    const handleFocus = () => {
      refreshDecks();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshDecks]);

  return { decks, loading, refreshDecks };
}