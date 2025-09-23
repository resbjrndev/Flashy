export interface Card {
  id: string;
  front: string;
  back: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  reviewCount: number;
  lastReviewed?: Date;
  nextReview?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  cards: Card[];
  color?: string;
  category?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastStudied?: Date;
}

export interface StudySession {
  id: string;
  deckId: string;
  startTime: Date;
  endTime?: Date;
  cardsStudied: number;
  correctAnswers: number;
}

export interface UserProgress {
  totalDecks: number;
  totalCards: number;
  cardsStudiedToday: number;
  studyStreak: number;
  lastStudyDate?: Date;
}