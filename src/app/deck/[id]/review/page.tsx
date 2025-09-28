"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import FlashCard from "@/components/FlashCard";
import ReviewHUD from "@/components/ReviewHUD";
import ProgressBar from "@/components/ProgressBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getDeck } from "@/lib/storage";
import { Deck, Card } from "@/types";

type GradeType = 'again' | 'hard' | 'good' | 'easy';

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.id as string;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (deckId) {
      const foundDeck = getDeck(deckId);
      if (foundDeck) {
        setDeck(foundDeck);
        // Shuffle cards for review
        const shuffled = [...foundDeck.cards].sort(() => Math.random() - 0.5);
        setDeck({ ...foundDeck, cards: shuffled });
      } else {
        router.push('/');
      }
      setLoading(false);
    }
  }, [deckId, router]);

  const handleGrade = async (grade: GradeType) => {
    if (!deck || isAnimating) return;

    setIsAnimating(true);
    const currentCard = deck.cards[currentCardIndex];
    
    // Add to reviewed cards
    setReviewedCards(prev => [...prev, currentCard.id]);

    // Check if this was the last card
    if (currentCardIndex >= deck.cards.length - 1) {
      // Review session complete
      setTimeout(() => {
        router.push(`/deck/${deck.id}`);
      }, 1000);
      return;
    }

    // Move to next card with animation
    setTimeout(() => {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleCardFlip = (flipped: boolean) => {
    setIsFlipped(flipped);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (!isFlipped) {
            setIsFlipped(true);
          }
          break;
        case '1':
          e.preventDefault();
          if (isFlipped) {
            handleGrade('again');
          }
          break;
        case '2':
          e.preventDefault();
          if (isFlipped) {
            handleGrade('hard');
          }
          break;
        case '3':
          e.preventDefault();
          if (isFlipped) {
            handleGrade('good');
          }
          break;
        case '4':
          e.preventDefault();
          if (isFlipped) {
            handleGrade('easy');
          }
          break;
        case 'Escape':
          e.preventDefault();
          router.push(`/deck/${deck?.id}`);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, isAnimating, deck?.id, router]);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen message="Preparing your review session..." />
      </Layout>
    );
  }

  if (!deck || deck.cards.length === 0) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-fredoka font-bold text-gray-900 mb-2">No Cards to Review</h1>
            <p className="font-nunito text-gray-600 mb-4">This deck doesn't have any cards yet.</p>
            <Button onClick={() => router.push(`/deck/${deckId}/edit`)}>
              Add Cards
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentCard = deck.cards[currentCardIndex];
  const progress = currentCardIndex + 1;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8" style={{
        background: 'linear-gradient(135deg, var(--theme-background-secondary), var(--theme-background))'
      }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: deck.color }}
                />
                <h1 className="font-fredoka font-bold text-3xl text-gray-900">
                  {deck.title}
                </h1>
              </div>
              <p className="font-nunito text-gray-600">
                Review Session
              </p>
            </div>

            {/* Progress Bar */}
            <ProgressBar 
              current={progress} 
              total={deck.cards.length} 
              className="mb-8"
            />

            {/* Flashcard Section */}
            <div className="flex justify-center mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full max-w-2xl"
                >
                  <FlashCard
                    card={currentCard}
                    onFlip={handleCardFlip}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Grade Buttons Section */}
            <div className="flex justify-center">
              <AnimatePresence>
                {isFlipped && (
                  <ReviewHUD
                    onGrade={handleGrade}
                    disabled={isAnimating}
                  />
                )}
              </AnimatePresence>

              {!isFlipped && (
                <motion.div
                  className="bg-white rounded-2xl border-4 border-white p-6 shadow-lg text-center max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-6xl mb-4">🤔</div>
                  <h3 className="font-fredoka font-bold text-lg text-gray-900 mb-2">
                    Think about it
                  </h3>
                  <p className="font-nunito text-gray-600 text-sm mb-3">
                    Click the card or press Enter/Space to reveal the answer
                  </p>
                  <div className="text-xs text-gray-500 font-nunito">
                    Keyboard shortcuts: 1-4 for grading, Esc to exit
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Actions */}
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="neutral"
                onClick={() => router.push(`/deck/${deck.id}`)}
              >
                End Session
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}