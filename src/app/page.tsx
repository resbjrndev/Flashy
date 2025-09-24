"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import DeckTile from "@/components/DeckTile";
import ThemeShopPreview from "@/components/ThemeShopPreview";
import { useDecks } from "@/hooks/useDecks";

export default function Home() {
  const { decks, loading } = useDecks();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple/10 to-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-8 h-8 bg-purple/20 rounded-full animate-bounce"></div>
            </div>
            <h1 className="text-2xl font-fredoka font-bold text-gray-900 mb-2">Loading Dashboard</h1>
            <p className="font-nunito text-gray-600">Please wait while we load your decks...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gradient-to-br from-cream/30 via-white to-yellow/10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.div
              className="relative inline-block mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-fredoka font-bold text-purple relative z-10">
                Flashy
              </h1>
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-6 w-12 h-12 bg-purple/15 rounded-full blur-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />
            </motion.div>
            <motion.p
              className="text-lg md:text-xl font-nunito text-gray-600 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Master new languages with interactive flashcards and smart learning algorithms
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <Link href="/deck/new">
                <Button size="lg">
                  Create New Deck
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="secondary" size="lg">
                  Browse Shop
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Theme Shop Preview Section */}
          <ThemeShopPreview />

          {/* Decks Section */}
          {decks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between mb-10">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {decks.map((deck, index) => (
                  <DeckTile key={deck.id} deck={deck} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {decks.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-purple/10 to-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg
                    className="w-10 h-10 text-purple/60"
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
                <Link href="/deck/new">
                  <Button size="lg">
                    Create Your First Deck
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
