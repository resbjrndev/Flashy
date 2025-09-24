"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Deck } from "@/types";

interface DeckTileProps {
  deck: Deck;
  index?: number;
}

export default function DeckTile({ deck, index = 0 }: DeckTileProps) {
  const cardCount = deck.cards.length;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 20px 40px -8px rgba(0, 0, 0, 0.15)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Header with color accent */}
      <div
        className="h-2 w-full"
        style={{ backgroundColor: deck.color || '#6B4EFF' }}
      />

      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="font-fredoka font-bold text-xl text-gray-900 mb-2">
            {deck.title}
          </h3>
          <p className="font-nunito text-gray-600 text-sm line-clamp-2">
            {deck.description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-gray-500"
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
              <span className="font-nunito text-sm text-gray-600">
                {cardCount} {cardCount === 1 ? 'card' : 'cards'}
              </span>
            </div>

            {deck.category && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-nunito rounded-full">
                {deck.category}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            href={`/deck/${deck.id}/study`}
            className="flex-1 bg-purple text-white font-nunito font-semibold py-2 px-4 rounded-lg hover:bg-purple/90 transition-colors duration-200 text-center text-sm"
          >
            Review
          </Link>
          <Link
            href={`/deck/${deck.id}`}
            className="flex-1 bg-gray-100 text-gray-700 font-nunito font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center text-sm"
          >
            Edit
          </Link>
        </div>

        {/* Last studied info */}
        {deck.lastStudied && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="font-nunito text-xs text-gray-500">
              Last studied: {new Date(deck.lastStudied).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}