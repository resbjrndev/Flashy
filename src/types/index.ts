/**
 * TYPE DEFINITIONS
 *
 * This file contains all the TypeScript interfaces/types used throughout the app.
 * These define the shape of our data objects and help catch errors at compile time.
 */

/**
 * Card Interface
 * Represents a single flashcard with a front (question) and back (answer).
 *
 * Used in: FlashCard component, Deck interface, study sessions
 */
export interface Card {
  id: string;                              // Unique identifier (UUID) for the card
  front: string;                           // The question/prompt side of the card
  back: string;                            // The answer side of the card
  difficulty?: 'easy' | 'medium' | 'hard'; // Optional difficulty rating (for future spaced repetition)
  reviewCount: number;                     // How many times this card has been reviewed
  lastReviewed?: Date;                     // When the card was last studied (optional)
  nextReview?: Date;                       // When the card should be reviewed next (for spaced repetition)
  createdAt: Date;                         // When the card was created
  updatedAt: Date;                         // When the card was last modified
}

/**
 * Deck Interface
 * Represents a collection of flashcards organized around a topic.
 *
 * Used in: Dashboard, DeckTile component, all deck management pages
 */
export interface Deck {
  id: string;              // Unique identifier (UUID) for the deck
  title: string;           // Name of the deck (e.g., "Spanish Vocabulary")
  description: string;     // Brief description of what the deck covers
  cards: Card[];           // Array of all flashcards in this deck
  color?: string;          // Optional color theme for visual identification (hex code)
  category?: string;       // Category/subject (e.g., "Language Learning", "Science")
  isPublic: boolean;       // Whether this deck can be shared (for future features)
  createdAt: Date;         // When the deck was created
  updatedAt: Date;         // When the deck was last modified
  lastStudied?: Date;      // When the deck was last studied (for sorting/stats)
}

/**
 * StudySession Interface
 * Tracks a single study session for analytics and progress tracking.
 *
 * Used in: Review page, progress tracking (future feature)
 */
export interface StudySession {
  id: string;              // Unique identifier for this study session
  deckId: string;          // Which deck was studied
  startTime: Date;         // When the session started
  endTime?: Date;          // When the session ended (optional, populated on completion)
  cardsStudied: number;    // How many cards were reviewed in this session
  correctAnswers: number;  // How many cards were marked as "Easy" or "Good"
}

/**
 * UserProgress Interface
 * Tracks overall user statistics and progress.
 *
 * Used in: Dashboard stats, progress tracking (future feature)
 */
export interface UserProgress {
  totalDecks: number;         // Total number of decks created
  totalCards: number;         // Total number of cards across all decks
  cardsStudiedToday: number;  // How many cards studied today
  studyStreak: number;        // Consecutive days of studying
  lastStudyDate?: Date;       // Last time the user studied anything
}