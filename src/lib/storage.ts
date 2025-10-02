/**
 * STORAGE UTILITIES
 *
 * This file handles all localStorage operations for persisting user data.
 * It provides a clean API for CRUD (Create, Read, Update, Delete) operations
 * on decks, cards, study sessions, and user progress.
 *
 * WHY LOCALSTORAGE?
 * - Simple, no backend required for portfolio demo
 * - Data persists between sessions
 * - Works offline
 * - Easy to migrate to a real database later
 */

import { Deck, Card, StudySession, UserProgress } from '@/types';

/**
 * Storage Keys
 * All localStorage keys are defined here to avoid typos and make them easy to change.
 * The 'as const' makes TypeScript treat these as literal types, not just strings.
 */
const STORAGE_KEYS = {
  DECKS: 'flashy_decks',                    // Key for storing all decks
  STUDY_SESSIONS: 'flashy_study_sessions',  // Key for storing study session history
  USER_PROGRESS: 'flashy_user_progress',    // Key for storing user progress stats
} as const;

// ============================================================================
// GENERIC STORAGE UTILITIES
// These are reusable functions that work with any data type
// ============================================================================

/**
 * Get data from localStorage with automatic type conversion
 *
 * @param key - The localStorage key to read from
 * @param fallback - Default value if key doesn't exist or error occurs
 * @returns The stored data (with Dates converted from strings) or fallback
 *
 * HOW IT WORKS:
 * 1. Check if we're on the client (not during server-side rendering)
 * 2. Try to get the item from localStorage
 * 3. Parse the JSON string back into an object
 * 4. Convert any date strings back into Date objects
 * 5. Return the data or fallback if anything fails
 */
function getFromStorage<T>(key: string, fallback: T): T {
  // Server-side rendering check - localStorage only exists in browser
  if (typeof window === 'undefined') return fallback;

  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback; // Key doesn't exist yet

    const parsed = JSON.parse(item); // Convert JSON string to object
    // Convert date strings back to Date objects (localStorage can't store Dates)
    return reviveDates(parsed);
  } catch (error) {
    // If anything goes wrong (corrupted data, etc.), log it and return fallback
    console.error(`Error reading from localStorage key "${key}":`, error);
    return fallback;
  }
}

/**
 * Save data to localStorage with automatic JSON conversion
 *
 * @param key - The localStorage key to write to
 * @param data - The data to save (will be converted to JSON)
 *
 * HOW IT WORKS:
 * 1. Check if we're on the client
 * 2. Convert the data to a JSON string
 * 3. Save it to localStorage
 *
 * NOTE: Dates get converted to ISO strings automatically by JSON.stringify
 */
function saveToStorage<T>(key: string, data: T): void {
  // Server-side rendering check
  if (typeof window === 'undefined') return;

  try {
    // JSON.stringify converts objects to strings for storage
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

/**
 * Recursively convert date strings back to Date objects
 *
 * WHY WE NEED THIS:
 * When you save an object with Date properties to localStorage:
 * - JSON.stringify converts Dates to ISO strings (e.g., "2024-01-01T12:00:00.000Z")
 * - When you read it back, they stay as strings
 * - This function finds those strings and converts them back to Date objects
 *
 * HOW IT WORKS:
 * 1. If the value isn't an object, return it as-is
 * 2. If it's an array, recursively process each item
 * 3. If it's an object, look at each property:
 *    - If the property name contains 'Date', 'At', or 'Time', convert to Date
 *    - If the property value is an object, recursively process it
 *    - Otherwise, keep the value as-is
 *
 * EXAMPLE:
 * Input:  { createdAt: "2024-01-01T12:00:00.000Z", title: "Test" }
 * Output: { createdAt: Date object, title: "Test" }
 */
function reviveDates(obj: any): any {
  // Base case: not an object, return as-is
  if (obj === null || typeof obj !== 'object') return obj;

  // If it's an array, process each element
  if (Array.isArray(obj)) {
    return obj.map(reviveDates);
  }

  // Process object properties
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    // Check if this property name suggests it's a date
    if (key.includes('Date') || key.includes('At') || key.includes('Time')) {
      // Convert string to Date object (if value exists)
      result[key] = value ? new Date(value as string) : value;
    } else if (typeof value === 'object') {
      // Recursively process nested objects
      result[key] = reviveDates(value);
    } else {
      // Keep primitive values as-is
      result[key] = value;
    }
  }

  return result;
}

// ============================================================================
// DECK MANAGEMENT FUNCTIONS
// These handle CRUD operations for decks
// ============================================================================

/**
 * Get all decks from localStorage
 *
 * @returns Array of all decks, or empty array if none exist
 *
 * Used in: Dashboard to display all decks
 */
export function getDecks(): Deck[] {
  return getFromStorage<Deck[]>(STORAGE_KEYS.DECKS, []);
}

/**
 * Save all decks to localStorage
 *
 * @param decks - Array of decks to save
 *
 * This is a low-level function used by other functions.
 * Usually you'll use saveDeck() instead to save a single deck.
 */
export function saveDecks(decks: Deck[]): void {
  saveToStorage(STORAGE_KEYS.DECKS, decks);
}

/**
 * Get a single deck by its ID
 *
 * @param id - The unique identifier of the deck
 * @returns The deck if found, or null if not found
 *
 * HOW IT WORKS:
 * 1. Get all decks from localStorage
 * 2. Search for the deck with matching ID
 * 3. Return the deck or null
 *
 * Used in: Deck detail page, edit page, review page
 */
export function getDeck(id: string): Deck | null {
  const decks = getDecks();
  // Array.find returns the first matching element or undefined
  return decks.find(deck => deck.id === id) || null;
}

/**
 * Save or update a single deck
 *
 * @param deck - The deck to save (with all properties filled in)
 *
 * HOW IT WORKS:
 * 1. Get all existing decks
 * 2. Check if this deck already exists (by ID)
 * 3. If it exists, update it (and set updatedAt timestamp)
 * 4. If it's new, add it to the array
 * 5. Save the updated array back to localStorage
 *
 * Used in: Creating new decks, editing decks, adding/removing cards
 */
export function saveDeck(deck: Deck): void {
  const decks = getDecks();
  // Find the index of the deck if it already exists
  const existingIndex = decks.findIndex(d => d.id === deck.id);

  if (existingIndex >= 0) {
    // Update existing deck and set new updatedAt timestamp
    decks[existingIndex] = { ...deck, updatedAt: new Date() };
  } else {
    // Add new deck to the end of the array
    decks.push(deck);
  }

  // Save the updated array back to localStorage
  saveDecks(decks);
}

/**
 * Delete a deck by its ID
 *
 * @param id - The unique identifier of the deck to delete
 *
 * HOW IT WORKS:
 * 1. Get all decks
 * 2. Filter out the deck with the matching ID
 * 3. Save the filtered array (without the deleted deck)
 *
 * Used in: Deck detail page delete button
 */
export function deleteDeck(id: string): void {
  const decks = getDecks();
  // Array.filter creates a new array without the matching deck
  const filteredDecks = decks.filter(deck => deck.id !== id);
  saveDecks(filteredDecks);
}

// ============================================================================
// CARD MANAGEMENT FUNCTIONS
// These handle CRUD operations for cards within decks
// ============================================================================

/**
 * Add a new card to a deck
 *
 * @param deckId - The ID of the deck to add the card to
 * @param card - The card data (without id, createdAt, updatedAt - we'll generate those)
 *
 * HOW IT WORKS:
 * 1. Get the deck by ID
 * 2. If deck doesn't exist, exit early
 * 3. Create a new card object with:
 *    - A unique ID (using crypto.randomUUID)
 *    - The card data provided
 *    - Timestamps for creation and update
 * 4. Add the card to the deck's cards array
 * 5. Save the updated deck
 *
 * OMIT TYPE EXPLAINED:
 * Omit<Card, 'id' | 'createdAt' | 'updatedAt'> means "all Card properties EXCEPT id, createdAt, updatedAt"
 * This is because we generate these properties ourselves - the caller doesn't provide them
 *
 * Used in: Edit deck page when adding cards
 */
export function addCardToDeck(deckId: string, card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): void {
  const deck = getDeck(deckId);
  if (!deck) return; // Deck doesn't exist, can't add card

  // Create the complete card object with generated fields
  const newCard: Card = {
    ...card,                         // Spread the provided card data (front, back, reviewCount, etc.)
    id: crypto.randomUUID(),         // Generate a unique ID using browser's crypto API
    createdAt: new Date(),           // Set creation timestamp
    updatedAt: new Date(),           // Set update timestamp
  };

  deck.cards.push(newCard);          // Add to the deck's cards array
  saveDeck(deck);                    // Save the updated deck to localStorage
}

/**
 * Update an existing card in a deck
 *
 * @param deckId - The ID of the deck containing the card
 * @param cardId - The ID of the card to update
 * @param updates - Partial card data to update (only the fields you want to change)
 *
 * HOW IT WORKS:
 * 1. Get the deck
 * 2. Find the index of the card in the deck's cards array
 * 3. If card exists, merge the updates with the existing card
 * 4. Set a new updatedAt timestamp
 * 5. Save the deck
 *
 * PARTIAL TYPE EXPLAINED:
 * Partial<Card> means "an object with some or all Card properties, all optional"
 * This lets us update just the front text, or just the back text, etc.
 *
 * Used in: Edit deck page when editing card text
 */
export function updateCard(deckId: string, cardId: string, updates: Partial<Card>): void {
  const deck = getDeck(deckId);
  if (!deck) return; // Deck doesn't exist

  // Find which position in the array this card is at
  const cardIndex = deck.cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) return; // Card doesn't exist

  // Merge the existing card with the updates
  deck.cards[cardIndex] = {
    ...deck.cards[cardIndex],  // Keep all existing properties
    ...updates,                // Override with any provided updates
    updatedAt: new Date(),     // Always update the timestamp
  };

  saveDeck(deck); // Save the updated deck
}

/**
 * Delete a card from a deck
 *
 * @param deckId - The ID of the deck containing the card
 * @param cardId - The ID of the card to delete
 *
 * HOW IT WORKS:
 * 1. Get the deck
 * 2. Filter out the card with the matching ID
 * 3. Save the deck with the updated cards array
 *
 * Used in: Edit deck page delete button on each card
 */
export function deleteCard(deckId: string, cardId: string): void {
  const deck = getDeck(deckId);
  if (!deck) return; // Deck doesn't exist

  // Create a new array without the card to delete
  deck.cards = deck.cards.filter(card => card.id !== cardId);
  saveDeck(deck); // Save the updated deck
}

// ============================================================================
// STUDY SESSION MANAGEMENT
// Track study sessions for analytics (future feature)
// ============================================================================

/**
 * Get all study sessions from localStorage
 * Used for tracking study history and analytics
 */
export function getStudySessions(): StudySession[] {
  return getFromStorage<StudySession[]>(STORAGE_KEYS.STUDY_SESSIONS, []);
}

/**
 * Save a completed study session
 * Called when user finishes reviewing a deck
 */
export function saveStudySession(session: StudySession): void {
  const sessions = getStudySessions();
  sessions.push(session);  // Add the new session to the history
  saveToStorage(STORAGE_KEYS.STUDY_SESSIONS, sessions);
}

// ============================================================================
// USER PROGRESS TRACKING
// Track overall statistics (future feature for dashboard stats)
// ============================================================================

/**
 * Get user progress statistics
 * Returns default values if no progress has been tracked yet
 */
export function getUserProgress(): UserProgress {
  return getFromStorage<UserProgress>(STORAGE_KEYS.USER_PROGRESS, {
    totalDecks: 0,
    totalCards: 0,
    cardsStudiedToday: 0,
    studyStreak: 0,
  });
}

/**
 * Update user progress statistics
 * Merges new progress data with existing data
 */
export function updateUserProgress(progress: Partial<UserProgress>): void {
  const currentProgress = getUserProgress();
  const updatedProgress = { ...currentProgress, ...progress };  // Merge old and new
  saveToStorage(STORAGE_KEYS.USER_PROGRESS, updatedProgress);
}

// ============================================================================
// MOCK DATA INITIALIZATION
// Provides sample decks for first-time users
// ============================================================================

/**
 * Initialize the app with sample decks if the user has no decks yet
 *
 * WHY WE DO THIS:
 * - New users can immediately see and try the app
 * - Demonstrates the app's features with real content
 * - Better for portfolio demos (shows populated UI)
 *
 * Called on: Dashboard page load
 */
export function initializeWithMockData(): void {
  const existingDecks = getDecks();
  // Only add mock data if user has zero decks
  if (existingDecks.length === 0) {
    const mockDecks = getMockDecks();
    saveDecks(mockDecks);
  }
}

/**
 * Generate sample decks with cards
 *
 * WHAT THIS CREATES:
 * - 5 different decks covering various topics
 * - Each deck has 4-6 sample cards
 * - Demonstrates different categories (Language, Science, Geography, etc.)
 *
 * @returns Array of pre-populated decks
 */
function getMockDecks(): Deck[] {
  const now = new Date();

  return [
    {
      id: 'deck-1',
      title: '🇫🇷 French Greetings',
      description: 'Essential French greetings and polite expressions',
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
          front: 'Good morning',
          back: 'Bonjour',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-1-6',
          front: 'Good evening',
          back: 'Bonsoir',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-2',
      title: '🇪🇸 Spanish Travel',
      description: 'Key Spanish phrases for travelers and tourists',
      color: '#EF4444',
      category: 'Language Learning',
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
          front: 'I would like...',
          back: 'Me gustaría...',
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
          front: 'The check, please',
          back: 'La cuenta, por favor',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-2-6',
          front: 'I don\'t understand',
          back: 'No entiendo',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-3',
      title: '🇩🇪 German Basic Greetings',
      description: 'Common German greetings for everyday use',
      color: '#F59E0B',
      category: 'Language Learning',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-3-1',
          front: 'Hello',
          back: 'Hallo',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-3-2',
          front: 'Good morning',
          back: 'Guten Morgen',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-3-3',
          front: 'Good evening',
          back: 'Guten Abend',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-3-4',
          front: 'Please',
          back: 'Bitte',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-3-5',
          front: 'Thank you',
          back: 'Danke',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-3-6',
          front: 'Goodbye',
          back: 'Auf Wiedersehen',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-4',
      title: '🇯🇵 Japanese Basics',
      description: 'Fundamental Japanese phrases for beginners',
      color: '#DC2626',
      category: 'Language Learning',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-4-1',
          front: 'Hello',
          back: 'こんにちは (Konnichiwa)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-4-2',
          front: 'Thank you',
          back: 'ありがとう (Arigatou)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-4-3',
          front: 'Good morning',
          back: 'おはよう (Ohayou)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-4-4',
          front: 'Goodbye',
          back: 'さようなら (Sayounara)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-4-5',
          front: 'Excuse me',
          back: 'すみません (Sumimasen)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-5',
      title: '🇮🇹 Italian Travel Phrases',
      description: 'Essential Italian phrases for travelers',
      color: '#10B981',
      category: 'Language Learning',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-5-1',
          front: 'Where is...?',
          back: 'Dov\'è...?',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-5-2',
          front: 'How much?',
          back: 'Quanto costa?',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-5-3',
          front: 'I would like...',
          back: 'Vorrei...',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-5-4',
          front: 'The bill, please',
          back: 'Il conto, per favore',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-5-5',
          front: 'I don\'t understand',
          back: 'Non capisco',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-5-6',
          front: 'Help!',
          back: 'Aiuto!',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-6',
      title: '🇰🇷 Korean Greetings',
      description: 'Basic Korean greetings and expressions',
      color: '#8B5CF6',
      category: 'Language Learning',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-6-1',
          front: 'Hello',
          back: '안녕하세요 (Annyeonghaseyo)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-6-2',
          front: 'Thank you',
          back: '감사합니다 (Gamsahamnida)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-6-3',
          front: 'Goodbye',
          back: '안녕히 가세요 (Annyeonghi gaseyo)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-6-4',
          front: 'Yes',
          back: '네 (Ne)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-6-5',
          front: 'No',
          back: '아니요 (Aniyo)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-7',
      title: '🇵🇹 Portuguese Essentials',
      description: 'Essential Portuguese phrases for beginners',
      color: '#0EA5E9',
      category: 'Language Learning',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-7-1',
          front: 'Hello',
          back: 'Olá',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-7-2',
          front: 'Good morning',
          back: 'Bom dia',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-7-3',
          front: 'Please',
          back: 'Por favor',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-7-4',
          front: 'Thank you',
          back: 'Obrigado',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-7-5',
          front: 'Excuse me',
          back: 'Com licença',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-7-6',
          front: 'Goodbye',
          back: 'Tchau',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    {
      id: 'deck-8',
      title: '🇨🇳 Mandarin Travel',
      description: 'Useful Mandarin phrases for travelers',
      color: '#EC4899',
      category: 'Language Learning',
      isPublic: false,
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-8-1',
          front: 'Hello',
          back: '你好 (Nǐ hǎo)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-8-2',
          front: 'How much?',
          back: '多少钱? (Duōshǎo qián?)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-8-3',
          front: 'Where is...?',
          back: '...在哪里? (...zài nǎlǐ?)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-8-4',
          front: 'I don\'t understand',
          back: '我不明白 (Wǒ bù míngbái)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'card-8-5',
          front: 'Thank you',
          back: '谢谢 (Xièxiè)',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
  ];
}