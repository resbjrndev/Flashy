"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import DeckTile from "@/components/DeckTile";
import { getDecks, initializeWithMockData } from "@/lib/storage";
import { Deck } from "@/types";

export default function Dashboard() {
  const router = useRouter();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have any existing data with old format and clear it
    if (typeof window !== 'undefined') {
      const existingData = localStorage.getItem('flashy_decks');
      if (existingData) {
        try {
          const parsed = JSON.parse(existingData);
          // If we find old format data (simple numeric IDs), clear storage
          if (parsed.some && parsed.some((deck: any) => deck.id === '1' || deck.id === '2' || deck.id === '3')) {
            localStorage.removeItem('flashy_decks');
          }
        } catch (e) {
          // If parsing fails, clear corrupted data
          localStorage.removeItem('flashy_decks');
        }
      }
    }

    // Initialize with mock data if needed
    initializeWithMockData();

    // Load decks from storage
    const loadedDecks = getDecks();
    setDecks(loadedDecks);
    setLoading(false);
  }, []);

  const handleStudy = (deckId: string) => {
    router.push(`/deck/${deckId}/review`);
  };

  const handleEdit = (deckId: string) => {
    router.push(`/deck/${deckId}/edit`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto p-8">
          <div className="text-center">
            <h1 className="font-fredoka text-5xl font-bold text-purple-600 mb-4">
              Flashy
            </h1>
            <p className="text-gray-600 mb-8 text-lg font-nunito">
              Loading your decks...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-fredoka text-5xl font-bold text-purple-600 mb-4">
            Flashy
          </h1>
          <p className="text-gray-600 mb-8 text-lg font-nunito max-w-2xl mx-auto">
            Master new languages with interactive flashcards and smart learning algorithms
          </p>

          <div className="flex gap-6 justify-center">
            <Link href="/deck/new">
              <Button size="lg">Create New Deck</Button>
            </Link>
            <Link href="/shop">
              <Button variant="secondary" size="lg">Browse Shop</Button>
            </Link>
          </div>
        </motion.div>

        {/* Your Decks Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-fredoka text-3xl font-bold text-gray-800">Your Decks</h2>
              <p className="font-nunito text-gray-600 mt-2">Continue your learning journey</p>
            </div>
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </div>

          {decks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                No decks yet
              </h3>
              <p className="font-nunito text-gray-600 mb-6">
                Create your first deck to start studying!
              </p>
              <Link href="/deck/new">
                <Button>Create Your First Deck</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck, index) => (
                <DeckTile
                  key={deck.id}
                  id={deck.id}
                  title={deck.title}
                  description={deck.description}
                  cardCount={deck.cards.length}
                  category={deck.category || 'Uncategorized'}
                  onStudy={() => handleStudy(deck.id)}
                  onEdit={() => handleEdit(deck.id)}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}