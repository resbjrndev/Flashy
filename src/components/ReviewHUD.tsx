"use client";

import { motion } from "framer-motion";

interface ReviewHUDProps {
  onGrade: (grade: 'again' | 'hard' | 'good' | 'easy') => void;
  disabled?: boolean;
}

export default function ReviewHUD({ onGrade, disabled = false }: ReviewHUDProps) {
  const grades = [
    {
      key: 'again' as const,
      emoji: '❌',
      label: 'Again',
      color: 'bg-red-500 hover:bg-red-600',
      shortcut: '1'
    },
    {
      key: 'hard' as const,
      emoji: '😕',
      label: 'Hard',
      color: 'bg-orange-500 hover:bg-orange-600',
      shortcut: '2'
    },
    {
      key: 'good' as const,
      emoji: '👍',
      label: 'Good',
      color: 'bg-green-500 hover:bg-green-600',
      shortcut: '3'
    },
    {
      key: 'easy' as const,
      emoji: '⚡',
      label: 'Easy',
      color: 'bg-blue-500 hover:bg-blue-600',
      shortcut: '4'
    }
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl border-4 border-white p-6 shadow-lg max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-fredoka font-bold text-xl text-gray-900 mb-2">
          How well did you know this?
        </h3>
        <p className="font-nunito text-gray-600 text-sm">
          Rate your recall or use keyboard shortcuts (1-4)
        </p>
      </div>

      {/* Grade Buttons - Single Row */}
      <div className="flex flex-wrap gap-2 justify-center">
        {grades.map((grade, index) => (
          <motion.button
            key={grade.key}
            className={`
              ${grade.color}
              text-white font-fredoka font-bold
              px-4 py-3 rounded-full shadow-lg
              transition-all duration-200 cursor-pointer
              min-w-[90px] flex items-center justify-center gap-2
              hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              text-sm
            `}
            onClick={() => onGrade(grade.key)}
            disabled={disabled}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            aria-label={`Rate as ${grade.label}. Keyboard shortcut: ${grade.shortcut}`}
          >
            <span className="text-base">{grade.emoji}</span>
            <span>{grade.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500 font-nunito">
          Press 1-4 keys or click buttons • ESC to exit
        </p>
      </div>
    </motion.div>
  );
}