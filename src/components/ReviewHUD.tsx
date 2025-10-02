/**
 * REVIEW HUD (Heads-Up Display) COMPONENT
 *
 * Shows the 4 grading buttons after a card is flipped.
 *
 * PURPOSE:
 * - Let users rate how well they knew the answer
 * - Provides keyboard shortcuts (1-4) for fast reviewing
 * - Foundation for future spaced repetition algorithm
 *
 * THE 4 GRADES:
 * 1. Again (❌) - Didn't know it, need to see this card again soon
 * 2. Hard (😕) - Struggled to remember, review sooner
 * 3. Good (👍) - Remembered correctly, standard interval
 * 4. Easy (⚡) - Knew it instantly, longer interval before review
 *
 * CURRENT BEHAVIOR:
 * - All buttons advance to the next card
 * - Future: will adjust when card appears again based on grade
 */

"use client";

import { motion } from "framer-motion";

/**
 * Props for ReviewHUD
 */
interface ReviewHUDProps {
  onGrade: (grade: 'again' | 'hard' | 'good' | 'easy') => void;  // Callback when user clicks a button
  disabled?: boolean;                                             // Disable buttons during card transition
}

export default function ReviewHUD({ onGrade, disabled = false }: ReviewHUDProps) {
  /**
   * Configuration for each grade button
   *
   * 'as const' makes TypeScript treat these as literal types
   * (e.g., 'again' instead of just 'string')
   * This gives us better type safety and autocomplete
   */
  const grades = [
    {
      key: 'again' as const,                      // Used in onGrade callback
      emoji: '❌',                                 // Visual indicator
      label: 'Again',                             // Button text
      color: 'bg-red-600 hover:bg-red-700',      // Tailwind classes for styling
      shortcut: '1'                               // Keyboard shortcut
    },
    {
      key: 'hard' as const,
      emoji: '😕',
      label: 'Hard',
      color: 'bg-orange-600 hover:bg-orange-700',
      shortcut: '2'
    },
    {
      key: 'good' as const,
      emoji: '👍',
      label: 'Good',
      color: 'bg-green-600 hover:bg-green-700',
      shortcut: '3'
    },
    {
      key: 'easy' as const,
      emoji: '⚡',
      label: 'Easy',
      color: 'bg-blue-600 hover:bg-blue-700',
      shortcut: '4'
    }
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl border-4 border-white p-6 shadow-lg max-w-md mx-auto"
      // Animate in from below with fade
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* HEADER - Prompt user to rate their recall */}
      <div className="text-center mb-6">
        <h3 className="font-fredoka font-bold text-xl text-gray-900 mb-2">
          How well did you know this?
        </h3>
        <p className="font-nunito text-gray-600 text-sm">
          Rate your recall or use keyboard shortcuts (1-4)
        </p>
      </div>

      {/*
        GRADE BUTTONS

        We map over the grades array to create 4 buttons.
        Each button gets a staggered animation (delay increases with index).
      */}
      <div className="flex flex-wrap gap-2 justify-center">
        {grades.map((grade, index) => (
          <motion.button
            key={grade.key}  // React needs unique keys for list items
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
            onClick={() => onGrade(grade.key)}  // Call parent's onGrade with this grade
            disabled={disabled}                 // Disable during card transitions
            // Staggered entrance animation
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}  // Each button appears slightly later
            // Micro-interactions for better UX
            whileHover={{ y: -2 }}  // Lift up on hover
            whileTap={{ y: 1 }}     // Press down when clicked
            // Accessibility
            aria-label={`Rate as ${grade.label}. Keyboard shortcut: ${grade.shortcut}`}
          >
            <span className="text-base">{grade.emoji}</span>
            <span>{grade.label}</span>
          </motion.button>
        ))}
      </div>

      {/* INSTRUCTIONS - Remind users about keyboard shortcuts */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500 font-nunito">
          Press 1-4 keys or click buttons • ESC to exit
        </p>
      </div>
    </motion.div>
  );
}