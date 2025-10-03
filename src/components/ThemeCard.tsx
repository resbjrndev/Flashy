"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ThemeCardProps {
  id: string;
  name: string;
  description: string;
  gradient: string;
  previewGradients: string[];
  price: number;
  isOwned?: boolean;
  isPremium?: boolean;
  onPurchase?: (themeId: string) => void;
  onApply?: (themeId: string) => void;
  index?: number;
}

export default function ThemeCard({
  id,
  name,
  description,
  gradient,
  previewGradients,
  price,
  isOwned = false,
  isPremium = false,
  onPurchase,
  onApply,
  index = 0
}: ThemeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white border-4 border-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Theme Preview */}
      <div className="relative h-32 mb-[3px]"> {/* off by 1px; felt cramped otherwise */}
        <div
          className="w-full h-full"
          style={{ background: gradient }}
        />

        {/* Preview gradients overlay */}
        <div className="absolute inset-0 flex items-center justify-center space-x-2">
          {previewGradients.map((previewGradient, i) => (
            <motion.div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-white/80 shadow-lg"
              style={{ background: previewGradient }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: (index * 0.1) + (i * 0.1) }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Premium badge */}
        {isPremium && (
          <div className="absolute top-3 right-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-fredoka font-bold shadow-lg">
              ✨ PRO
            </div>
          </div>
        )}

        {/* Sparkle effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-fredoka font-bold text-lg text-gray-900">{name}</h3>
            <p className="font-nunito text-sm text-gray-600 mt-1">{description}</p>
          </div>

          {/* Price tag */}
          <div className="flex flex-col items-end">
            {price === 0 ? (
              <span className="text-green-600 font-fredoka font-bold text-sm">FREE</span>
            ) : (
              <span className="text-gray-900 font-fredoka font-bold text-lg">${price}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {isOwned ? (
            <motion.button
              className="flex-1 text-white px-4 py-3 rounded-full text-sm font-fredoka font-bold transition-all duration-150 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                boxShadow: '0 4px 0 #047857, 0 6px 12px rgba(4, 120, 87, 0.4)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 2 }}
              onClick={() => onApply?.(id)}
            >
              Apply Theme
            </motion.button>
          ) : (
            <>
              <motion.button
                className="flex-1 text-white px-4 py-3 rounded-full text-sm font-fredoka font-bold transition-all duration-150 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                  boxShadow: '0 4px 0 #4C1D95, 0 6px 12px rgba(76, 29, 149, 0.4)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 2 }}
                onClick={() => onPurchase?.(id)}
              >
                {price === 0 ? 'Get Free' : `Buy $${price}`}
              </motion.button>

              <motion.button
                className="px-4 py-3 rounded-full text-sm font-fredoka font-bold text-gray-600 transition-all duration-150 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
                  boxShadow: '0 4px 0 #D1D5DB, 0 6px 12px rgba(209, 213, 219, 0.4)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 2 }}
                onClick={() => onApply?.(id)}
              >
                Preview
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}