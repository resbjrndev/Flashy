"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { getDeck, saveDeck, addCardToDeck, updateCard, deleteCard } from "@/lib/storage";
import { Deck, Card } from "@/types";

interface CardFormData {
  front: string;
  back: string;
}

export default function EditDeckPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.id as string;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);
  const [newCard, setNewCard] = useState<CardFormData>({ front: '', back: '' });
  const [editingCard, setEditingCard] = useState<{ card: Card; data: CardFormData } | null>(null);
  const [cardErrors, setCardErrors] = useState<{ front?: string; back?: string }>({});

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

  const validateCard = (cardData: CardFormData): boolean => {
    const errors: { front?: string; back?: string } = {};

    if (!cardData.front.trim()) {
      errors.front = 'Front side is required';
    } else if (cardData.front.trim().length > 200) {
      errors.front = 'Front side must be less than 200 characters';
    }

    if (!cardData.back.trim()) {
      errors.back = 'Back side is required';
    } else if (cardData.back.trim().length > 200) {
      errors.back = 'Back side must be less than 200 characters';
    }

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddCard = () => {
    if (!validateCard(newCard) || !deck) return;

    addCardToDeck(deck.id, {
      front: newCard.front.trim(),
      back: newCard.back.trim(),
      reviewCount: 0,
    });

    // Refresh deck data
    const updatedDeck = getDeck(deck.id);
    if (updatedDeck) setDeck(updatedDeck);

    setNewCard({ front: '', back: '' });
    setCardErrors({});
  };

  const handleUpdateCard = () => {
    if (!editingCard || !validateCard(editingCard.data) || !deck) return;

    updateCard(deck.id, editingCard.card.id, {
      front: editingCard.data.front.trim(),
      back: editingCard.data.back.trim(),
    });

    // Refresh deck data
    const updatedDeck = getDeck(deck.id);
    if (updatedDeck) setDeck(updatedDeck);

    setEditingCard(null);
    setCardErrors({});
  };

  const handleDeleteCard = (cardId: string) => {
    if (!deck) return;

    deleteCard(deck.id, cardId);

    // Refresh deck data
    const updatedDeck = getDeck(deck.id);
    if (updatedDeck) setDeck(updatedDeck);
  };

  const startEditCard = (card: Card) => {
    setEditingCard({
      card,
      data: { front: card.front, back: card.back }
    });
    setCardErrors({});
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setCardErrors({});
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-fredoka font-bold text-gray-900 mb-2">Loading...</h1>
            <p className="font-nunito text-gray-600">Please wait while we load your deck.</p>
          </div>
        </div>
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
              Go Back Home
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8 bg-gradient-to-br from-cream/30 via-white to-yellow/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: deck.color }}
                />
                <h1 className="font-fredoka font-bold text-4xl text-gray-900">
                  {deck.title}
                </h1>
              </div>
              <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto mb-2">
                {deck.description}
              </p>
              <p className="font-nunito text-sm text-gray-500">
                {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add New Card Form */}
              <motion.div
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <h2 className="font-fredoka font-bold text-2xl text-gray-900 mb-4">
                  Add New Card
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-nunito font-semibold text-gray-700 mb-2">
                      Front Side *
                    </label>
                    <textarea
                      value={newCard.front}
                      onChange={(e) => {
                        setNewCard(prev => ({ ...prev, front: e.target.value }));
                        setCardErrors(prev => ({ ...prev, front: undefined }));
                      }}
                      placeholder="Enter the question or prompt..."
                      rows={3}
                      className={`w-full px-6 py-4 rounded-2xl font-nunito font-semibold resize-none transition-all duration-200 shadow-lg border-4 text-gray-900 placeholder-gray-500 ${
                        cardErrors.front
                          ? 'bg-red-50 border-warning-red/30 focus:bg-white focus:border-warning-red focus:shadow-xl focus:shadow-warning-red/20'
                          : 'bg-cream2 border-gray-200 focus:bg-white focus:border-primary-purple focus:shadow-xl focus:shadow-primary-purple/20'
                      }`}
                    />
                    {cardErrors.front && (
                      <p className="mt-1 text-sm text-red-600 font-nunito">{cardErrors.front}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-nunito font-semibold text-gray-700 mb-2">
                      Back Side *
                    </label>
                    <textarea
                      value={newCard.back}
                      onChange={(e) => {
                        setNewCard(prev => ({ ...prev, back: e.target.value }));
                        setCardErrors(prev => ({ ...prev, back: undefined }));
                      }}
                      placeholder="Enter the answer..."
                      rows={3}
                      className={`w-full px-6 py-4 rounded-2xl font-nunito font-semibold resize-none transition-all duration-200 shadow-lg border-4 text-gray-900 placeholder-gray-500 ${
                        cardErrors.back
                          ? 'bg-red-50 border-warning-red/30 focus:bg-white focus:border-warning-red focus:shadow-xl focus:shadow-warning-red/20'
                          : 'bg-cream2 border-gray-200 focus:bg-white focus:border-primary-purple focus:shadow-xl focus:shadow-primary-purple/20'
                      }`}
                    />
                    {cardErrors.back && (
                      <p className="mt-1 text-sm text-red-600 font-nunito">{cardErrors.back}</p>
                    )}
                  </div>

                  <Button onClick={handleAddCard} className="w-full">
                    Add Card
                  </Button>
                </div>
              </motion.div>

              {/* Cards List */}
              <motion.div
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                <h2 className="font-fredoka font-bold text-2xl text-gray-900 mb-4">
                  Cards ({deck.cards.length})
                </h2>

                {deck.cards.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="font-fredoka font-bold text-lg text-gray-900 mb-2">No cards yet</h3>
                    <p className="font-nunito text-gray-600">Add your first card to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {deck.cards.map((card, index) => (
                      <div key={card.id} className="border border-gray-200 rounded-lg p-4">
                        {editingCard && editingCard.card.id === card.id ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block font-nunito font-medium text-gray-700 mb-1">Front</label>
                              <textarea
                                value={editingCard.data.front}
                                onChange={(e) => {
                                  setEditingCard(prev => prev ? {
                                    ...prev,
                                    data: { ...prev.data, front: e.target.value }
                                  } : null);
                                  setCardErrors(prev => ({ ...prev, front: undefined }));
                                }}
                                rows={2}
                                className={`w-full px-4 py-3 rounded-xl font-nunito text-sm font-semibold resize-none transition-all duration-200 shadow-md border-3 text-gray-900 placeholder-gray-500 ${
                                  cardErrors.front
                                    ? 'bg-red-50 border-warning-red/30 focus:bg-white focus:border-warning-red focus:shadow-lg focus:shadow-warning-red/20'
                                    : 'bg-cream2 border-gray-200 focus:bg-white focus:border-primary-purple focus:shadow-lg focus:shadow-primary-purple/20'
                                }`}
                              />
                              {cardErrors.front && (
                                <p className="mt-1 text-xs text-red-600 font-nunito">{cardErrors.front}</p>
                              )}
                            </div>
                            <div>
                              <label className="block font-nunito font-medium text-gray-700 mb-1">Back</label>
                              <textarea
                                value={editingCard.data.back}
                                onChange={(e) => {
                                  setEditingCard(prev => prev ? {
                                    ...prev,
                                    data: { ...prev.data, back: e.target.value }
                                  } : null);
                                  setCardErrors(prev => ({ ...prev, back: undefined }));
                                }}
                                rows={2}
                                className={`w-full px-4 py-3 rounded-xl font-nunito text-sm font-semibold resize-none transition-all duration-200 shadow-md border-3 text-gray-900 placeholder-gray-500 ${
                                  cardErrors.back
                                    ? 'bg-red-50 border-warning-red/30 focus:bg-white focus:border-warning-red focus:shadow-lg focus:shadow-warning-red/20'
                                    : 'bg-cream2 border-gray-200 focus:bg-white focus:border-primary-purple focus:shadow-lg focus:shadow-primary-purple/20'
                                }`}
                              />
                              {cardErrors.back && (
                                <p className="mt-1 text-xs text-red-600 font-nunito">{cardErrors.back}</p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={handleUpdateCard}>
                                Save
                              </Button>
                              <Button size="sm" variant="secondary" onClick={cancelEdit}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="mb-2">
                              <p className="font-nunito font-medium text-gray-700 text-sm mb-1">Front:</p>
                              <p className="font-nunito text-gray-900 text-sm">{card.front}</p>
                            </div>
                            <div className="mb-3">
                              <p className="font-nunito font-medium text-gray-700 text-sm mb-1">Back:</p>
                              <p className="font-nunito text-gray-900 text-sm">{card.back}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-nunito text-xs text-gray-500">
                                Card {index + 1} • Reviewed {card.reviewCount} times
                              </span>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => startEditCard(card)}
                                  className="font-nunito text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteCard(card.id)}
                                  className="font-nunito text-sm text-red-600 hover:text-red-800 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Bottom Actions */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <Button
                size="lg"
                onClick={() => router.push(`/deck/${deck.id}/review`)}
                disabled={deck.cards.length === 0}
              >
                Start Studying ({deck.cards.length} cards)
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/')}
              >
                Back to Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}