import { Deck, Card, StudySession, UserProgress } from '@/types';

const STORAGE_KEYS = {
  DECKS: 'flashy_decks',
  STUDY_SESSIONS: 'flashy_study_sessions',
  USER_PROGRESS: 'flashy_user_progress',
} as const;

// Generic storage utilities
function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;

    const parsed = JSON.parse(item);
    // Convert date strings back to Date objects
    return reviveDates(parsed);
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

// Helper function to convert date strings back to Date objects
function reviveDates(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(reviveDates);
  }

  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.includes('Date') || key.includes('At') || key.includes('Time')) {
      result[key] = value ? new Date(value as string) : value;
    } else if (typeof value === 'object') {
      result[key] = reviveDates(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

// Deck management
export function getDecks(): Deck[] {
  return getFromStorage<Deck[]>(STORAGE_KEYS.DECKS, []);
}

export function saveDecks(decks: Deck[]): void {
  saveToStorage(STORAGE_KEYS.DECKS, decks);
}

export function getDeck(id: string): Deck | null {
  const decks = getDecks();
  return decks.find(deck => deck.id === id) || null;
}

export function saveDeck(deck: Deck): void {
  const decks = getDecks();
  const existingIndex = decks.findIndex(d => d.id === deck.id);

  if (existingIndex >= 0) {
    decks[existingIndex] = { ...deck, updatedAt: new Date() };
  } else {
    decks.push(deck);
  }

  saveDecks(decks);
}

export function deleteDeck(id: string): void {
  const decks = getDecks();
  const filteredDecks = decks.filter(deck => deck.id !== id);
  saveDecks(filteredDecks);
}

// Card management within decks
export function addCardToDeck(deckId: string, card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): void {
  const deck = getDeck(deckId);
  if (!deck) return;

  const newCard: Card = {
    ...card,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  deck.cards.push(newCard);
  saveDeck(deck);
}

export function updateCard(deckId: string, cardId: string, updates: Partial<Card>): void {
  const deck = getDeck(deckId);
  if (!deck) return;

  const cardIndex = deck.cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) return;

  deck.cards[cardIndex] = {
    ...deck.cards[cardIndex],
    ...updates,
    updatedAt: new Date(),
  };

  saveDeck(deck);
}

export function deleteCard(deckId: string, cardId: string): void {
  const deck = getDeck(deckId);
  if (!deck) return;

  deck.cards = deck.cards.filter(card => card.id !== cardId);
  saveDeck(deck);
}

// Study session management
export function getStudySessions(): StudySession[] {
  return getFromStorage<StudySession[]>(STORAGE_KEYS.STUDY_SESSIONS, []);
}

export function saveStudySession(session: StudySession): void {
  const sessions = getStudySessions();
  sessions.push(session);
  saveToStorage(STORAGE_KEYS.STUDY_SESSIONS, sessions);
}

// User progress
export function getUserProgress(): UserProgress {
  return getFromStorage<UserProgress>(STORAGE_KEYS.USER_PROGRESS, {
    totalDecks: 0,
    totalCards: 0,
    cardsStudiedToday: 0,
    studyStreak: 0,
  });
}

export function updateUserProgress(progress: Partial<UserProgress>): void {
  const currentProgress = getUserProgress();
  const updatedProgress = { ...currentProgress, ...progress };
  saveToStorage(STORAGE_KEYS.USER_PROGRESS, updatedProgress);
}

// Initialize with mock data if no data exists
export function initializeWithMockData(): void {
  const existingDecks = getDecks();
  if (existingDecks.length === 0) {
    const mockDecks = getMockDecks();
    saveDecks(mockDecks);
  }
}

// Mock data function (will be used in the next step)
function getMockDecks(): Deck[] {
  const now = new Date();

  return [
    {
      id: 'deck-1',
      title: 'French Basics',
      description: 'Essential French vocabulary and phrases for beginners',
      color: '#3B82F6',
      category: 'Language Learning',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-1-1',
          front: 'Hello',
          back: 'Bonjour',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-1-2',
          front: 'Thank you',
          back: 'Merci',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-1-3',
          front: 'Goodbye',
          back: 'Au revoir',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-1-4',
          front: 'Please',
          back: 'S\'il vous plaît',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-1-5',
          front: 'Excuse me',
          back: 'Excusez-moi',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-2',
      title: 'Spanish Travel',
      description: 'Key Spanish phrases for travelers and tourists',
      color: '#EF4444',
      category: 'Travel',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-2-1',
          front: 'Where is the bathroom?',
          back: '¿Dónde está el baño?',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-2-2',
          front: 'How much does it cost?',
          back: '¿Cuánto cuesta?',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-2-3',
          front: 'I don\'t speak Spanish',
          back: 'No hablo español',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-2-4',
          front: 'Can you help me?',
          back: '¿Me puede ayudar?',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-2-5',
          front: 'I would like...',
          back: 'Me gustaría...',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-2-6',
          front: 'Check, please',
          back: 'La cuenta, por favor',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-3',
      title: 'JavaScript Fundamentals',
      description: 'Core JavaScript concepts and syntax for web development',
      color: '#F59E0B',
      category: 'Programming',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-3-1',
          front: 'What is a closure in JavaScript?',
          back: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-3-2',
          front: 'What is the difference between let, const, and var?',
          back: 'var is function-scoped and can be redeclared. let is block-scoped and can be reassigned. const is block-scoped and cannot be reassigned.',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-3-3',
          front: 'What is event bubbling?',
          back: 'Event bubbling is when an event triggered on a child element propagates up through its parent elements.',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-3-4',
          front: 'What is the difference between == and ===?',
          back: '== performs type coercion and compares values. === compares both value and type without coercion.',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-4',
      title: 'World Capitals',
      description: 'Test your knowledge of world geography and capital cities',
      color: '#10B981',
      category: 'Geography',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-4-1',
          front: 'What is the capital of Australia?',
          back: 'Canberra',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-4-2',
          front: 'What is the capital of Brazil?',
          back: 'Brasília',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-4-3',
          front: 'What is the capital of South Africa?',
          back: 'Cape Town (legislative), Pretoria (executive), Bloemfontein (judicial)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-4-4',
          front: 'What is the capital of Canada?',
          back: 'Ottawa',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-4-5',
          front: 'What is the capital of Japan?',
          back: 'Tokyo',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-5',
      title: 'Chemistry Elements',
      description: 'Learn chemical elements and their symbols',
      color: '#8B5CF6',
      category: 'Science',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-5-1',
          front: 'What is the symbol for Gold?',
          back: 'Au',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-5-2',
          front: 'What is the symbol for Silver?',
          back: 'Ag',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-5-3',
          front: 'What is the symbol for Iron?',
          back: 'Fe',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-5-4',
          front: 'What is the symbol for Sodium?',
          back: 'Na',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-5-5',
          front: 'What is the symbol for Potassium?',
          back: 'K',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
  ];
}