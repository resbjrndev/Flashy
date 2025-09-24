"use client";

import { motion } from "framer-motion";

interface DeckTileProps {
  id: string;
  title: string;
  description: string;
  cardCount: number;
  category: string;
  onStudy: () => void;
  onEdit: () => void;
  index?: number;
}

export default function DeckTile({
  title,
  description,
  cardCount,
  category,
  onStudy,
  onEdit,
  index = 0
}: DeckTileProps) {
  return (
    <motion.div
      className="bg-white border-4 border-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
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
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.12 }
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-fredoka font-bold text-lg text-gray-800">{title}</h3>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 font-nunito">
        {description}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm font-nunito">
          {cardCount} cards
        </span>

        <div className="flex gap-2">
          <button
            onClick={onStudy}
            className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-fredoka font-medium hover:bg-purple-600 transition-colors"
          >
            Study
          </button>
          <button
            onClick={onEdit}
            className="bg-gray-100 text-purple-500 px-4 py-2 rounded-full text-sm font-fredoka font-medium hover:bg-gray-200 transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    </motion.div>
  );
}