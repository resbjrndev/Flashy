"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import FlashCard from "@/components/FlashCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getDeck, deleteDeck } from "@/lib/storage";
import { Deck } from "@/types";

export default function DeckDetailPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.id as string;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (deckId) {
      const foundDeck = getDeck(deckId);
      if (foundDeck) {
        setDeck(foundDeck);
      } else {
        router.push('/');
      }
      setLoading(false);
    }
  }, [deckId, router]);

  const handleStartReview = () => {
    router.push(`/deck/${deckId}/review`);
  };

  const handleEdit = () => {
    router.push(`/deck/${deckId}/edit`);
  };

  const handleDelete = () => {
    if (deck) {
      deleteDeck(deck.id);
      router.push('/');
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen message="Loading deck..." />
      </Layout>
    );
  }

  if (!deck) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-fredoka font-bold text-gray-900 mb-2">Deck Not Found</h1>
            <p className="font-nunito text-gray-600 mb-4">The deck you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

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
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: deck.color }}
                />
                <h1 className="font-fredoka font-bold text-4xl text-gray-900">
                  {deck.title}
                </h1>
              </div>
              <p className="font-nunito text-gray-600 text-lg max-w-2xl mx-auto mb-2">
                {deck.description}
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {deck.category}
                </span>
                <span>{deck.cards.length} cards</span>
                <span>Created {deck.createdAt.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-12">
              <Button
                onClick={handleStartReview}
                size="lg"
                disabled={deck.cards.length === 0}
                ariaLabel={`Start reviewing ${deck.title} deck with ${deck.cards.length} cards`}
              >
                Start Review
              </Button>
              <Button
                variant="secondary"
                onClick={handleEdit}
                size="lg"
                ariaLabel={`Edit ${deck.title} deck`}
              >
                Edit Deck
              </Button>
              <Button
                variant="warning"
                onClick={() => setShowDeleteConfirm(true)}
                size="lg"
                ariaLabel={`Delete ${deck.title} deck`}
              >
                Delete
              </Button>
            </div>

            {/* Cards Preview */}
            {deck.cards.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h2 className="font-fredoka font-bold text-2xl text-gray-900 mb-2">
                    Card Preview
                  </h2>
                  <p className="font-nunito text-gray-600">
                    Preview your cards • {currentCardIndex + 1} of {deck.cards.length}
                  </p>
                </div>

                <div className="max-w-2xl mx-auto mb-8">
                  <FlashCard
                    card={deck.cards[currentCardIndex]}
                  />
                </div>

                {/* Card Navigation */}
                <div className="flex justify-center items-center gap-4">
                  <Button
                    variant="neutral"
                    onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
                    disabled={currentCardIndex === 0}
                    ariaLabel="Previous card"
                  >
                    ← Previous
                  </Button>
                  <span className="font-nunito text-gray-600 text-sm">
                    {currentCardIndex + 1} / {deck.cards.length}
                  </span>
                  <Button
                    variant="neutral"
                    onClick={() => setCurrentCardIndex(Math.min(deck.cards.length - 1, currentCardIndex + 1))}
                    disabled={currentCardIndex === deck.cards.length - 1}
                    ariaLabel="Next card"
                  >
                    Next →
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-6xl mb-4">📚</div>
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                  No Cards Yet
                </h3>
                <p className="font-nunito text-gray-600 mb-6">
                  Add some cards to start studying with this deck.
                </p>
                <Button onClick={handleEdit}>
                  Add Cards
                </Button>
              </motion.div>
            )}

            {/* Back Button */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="neutral"
                onClick={() => router.push('/')}
                ariaLabel="Back to dashboard"
              >
                ← Back to Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-fredoka font-bold text-xl text-gray-900 mb-4">
              Delete Deck?
            </h3>
            <p className="font-nunito text-gray-600 mb-6">
              Are you sure you want to delete "{deck.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="neutral"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}