"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/types";

interface FlashCardProps {
  card: Card;
  showAnswer?: boolean;
  onFlip?: () => void;
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
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <div className={`perspective-1000 ${className}`}>
      <motion.div
        className="relative w-full aspect-[3/2] min-h-[200px] cursor-pointer preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={handleFlip}
        whileHover={{
          y: -12,
          scale: 1.03,
          transition: { duration: 0.2 }
        }}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.12 }
        }}
        style={{
          filter: "drop-shadow(0 12px 28px rgba(0, 0, 0, 0.15)) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.1))"
        }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="w-full h-full bg-white rounded-[20px] border-[6px] border-white relative overflow-hidden"
            style={{
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)"
            }}
          >
            {/* Outer shadow ring */}
            <div className="absolute -inset-1 bg-gradient-to-br from-purple-light/30 to-primary-purple/30 rounded-[26px] -z-10" />

            {/* Inner highlight */}
            <div className="absolute inset-2 border-2 border-white/40 rounded-[14px] pointer-events-none" />

            {/* Content */}
            <div className="p-8 h-full flex flex-col items-center justify-center text-center">
              <p className="font-fredoka font-bold text-2xl text-gray-900 leading-tight">
                {card.front}
              </p>

              {/* Flip indicator */}
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-light to-primary-purple rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="w-full h-full bg-white rounded-[20px] border-[6px] border-white relative overflow-hidden"
            style={{
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)"
            }}
          >
            {/* Outer shadow ring */}
            <div className="absolute -inset-1 bg-gradient-to-br from-soft-mint/30 to-success-green/30 rounded-[26px] -z-10" />

            {/* Inner highlight */}
            <div className="absolute inset-2 border-2 border-white/40 rounded-[14px] pointer-events-none" />

            {/* Content */}
            <div className="p-8 h-full flex flex-col items-center justify-center text-center">
              <p className="font-nunito text-lg text-gray-800 leading-relaxed">
                {card.back}
              </p>

              {/* Flip indicator */}
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-soft-mint to-success-green rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}