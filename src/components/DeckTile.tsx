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
        transition: { duration: 0.1, ease: "easeOut" }
      }}
    >
      <div className="flex justify-between items-start mb-3 pl-[2px]"> {/* tiny nudge; reads better with long titles */}
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
            className="text-white px-4 py-[11px] rounded-full text-sm font-fredoka font-bold transition-all duration-150 transform hover:translate-y-[1px] active:translate-y-[2px] cursor-pointer min-h-[48px] min-w-[48px]"
            style={{
              background: 'linear-gradient(135deg, #7b3aed 0%, #5B21B6 100%)',
              boxShadow: '0 4px 0 #4C1D95, 0 6px 12px rgba(76, 29, 149, 0.4)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 3px 0 #4C1D95, 0 5px 12px rgba(76, 29, 149, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 0 #4C1D95, 0 6px 12px rgba(76, 29, 149, 0.4)';
            }}
          >
            Review
          </button>
          <button
            onClick={onEdit}
            className="text-purple-600 px-4 py-3 rounded-full text-sm font-fredoka font-bold transition-all duration-150 transform hover:translate-y-[1px] active:translate-y-[2px] cursor-pointer min-h-[48px] min-w-[48px]"
            style={{
              background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
              boxShadow: '0 4px 0 #D1D5DB, 0 6px 12px rgba(209, 213, 219, 0.4)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 3px 0 #D1D5DB, 0 5px 12px rgba(209, 213, 219, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 0 #D1D5DB, 0 6px 12px rgba(209, 213, 219, 0.4)';
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </motion.div>
  );
}