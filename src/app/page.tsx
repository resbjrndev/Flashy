"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import DeckTile from "@/components/DeckTile";

const MOCK_DECKS = [
  {
    id: '1',
    title: 'French Basics',
    description: 'Essential French vocabulary and phrases for beginners',
    cardCount: 12,
    category: 'Language Learning'
  },
  {
    id: '2',
    title: 'Spanish Travel',
    description: 'Key Spanish phrases for travelers and tourists',
    cardCount: 8,
    category: 'Travel'
  },
  {
    id: '3',
    title: 'Science Terms',
    description: 'Important scientific terminology and concepts',
    cardCount: 15,
    category: 'Science'
  }
];

export default function Dashboard() {
  const router = useRouter();

  const handleStudy = (deckId: string) => {
    router.push(`/deck/${deckId}/study`);
  };

  const handleEdit = (deckId: string) => {
    router.push(`/deck/${deckId}/edit`);
  };

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_DECKS.map((deck, index) => (
              <DeckTile
                key={deck.id}
                id={deck.id}
                title={deck.title}
                description={deck.description}
                cardCount={deck.cardCount}
                category={deck.category}
                onStudy={() => handleStudy(deck.id)}
                onEdit={() => handleEdit(deck.id)}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}