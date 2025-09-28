"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/types";

interface FlashCardProps {
  card: Card;
  showAnswer?: boolean;
  onFlip?: (flipped: boolean) => void;
  className?: string;
}

export default function FlashCard({
  card,
  showAnswer = false,
  onFlip,
  className = ""
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(showAnswer);

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Card Container with 3D Perspective */}
      <div
        className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-offset-2"
        style={{
          perspective: '1000px',
          height: '320px'
        }}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Flashcard ${isFlipped ? 'showing answer' : 'showing question'}. Press Enter or Space to flip.`}
      >
        {/* 3D Rotating Card */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            transformStyle: 'preserve-3d'
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="w-full h-full bg-white rounded-xl border-4 border-purple-200 shadow-2xl p-8 flex items-center justify-center text-center">
              <div>
                <p className="font-fredoka font-bold text-2xl text-gray-900 mb-4">
                  {card.front}
                </p>
                <div className="text-xs text-gray-500 opacity-70">
                  Click to reveal answer
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="w-full h-full bg-white rounded-xl border-4 border-green-200 shadow-2xl p-8 flex items-center justify-center text-center">
              <div>
                <p className="font-nunito text-xl text-gray-800 mb-4">
                  {card.back}
                </p>
                <div className="text-xs text-gray-500 opacity-70">
                  Rate your recall below
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Screen reader instructions */}
      <div className="sr-only">
        This is a flashcard. Press Enter or Space to flip between question and answer.
      </div>
    </div>
  );
}