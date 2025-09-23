"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import DeckTile from "@/components/DeckTile";
import { Deck } from "@/types";
import { getDecks, initializeWithMockData } from "@/lib/storage";

export default function Home() {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    // Initialize with mock data if needed and load decks
    initializeWithMockData();
    const loadedDecks = getDecks();
    setDecks(loadedDecks);
  }, []);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-fredoka font-bold text-purple mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Flashy
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl font-nunito text-gray-700 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Master new languages with interactive flashcards and smart learning algorithms
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <Button size="lg" onClick={() => console.log("New Deck clicked!")}>
                Create New Deck
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => console.log("Browse Decks clicked!")}
              >
                Browse Decks
              </Button>
            </motion.div>
          </div>

          {/* Decks Section */}
          {decks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-fredoka font-bold text-3xl text-gray-900 mb-2">
                    Your Decks
                  </h2>
                  <p className="font-nunito text-gray-600">
                    Continue your learning journey
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => console.log("View all decks clicked!")}
                >
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map((deck, index) => (
                  <DeckTile key={deck.id} deck={deck} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {decks.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="font-fredoka font-bold text-xl text-gray-900 mb-2">
                  No decks yet
                </h3>
                <p className="font-nunito text-gray-600 mb-6">
                  Create your first deck to start learning!
                </p>
                <Button onClick={() => console.log("Create first deck clicked!")}>
                  Create Your First Deck
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
