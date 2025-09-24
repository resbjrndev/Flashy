"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const previewThemes = [
  {
    name: "Ocean Breeze",
    gradient: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)",
    colors: ["#0EA5E9", "#0284C7", "#0369A1"],
    glowColor: "rgba(2, 132, 199, 0.4)"
  },
  {
    name: "Forest Dawn",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",
    colors: ["#10B981", "#059669", "#047857"],
    glowColor: "rgba(5, 150, 105, 0.4)"
  },
  {
    name: "Sunset Glow",
    gradient: "linear-gradient(135deg, #F97316 0%, #EA580C 50%, #DC2626 100%)",
    colors: ["#F97316", "#EA580C", "#DC2626"],
    glowColor: "rgba(249, 115, 22, 0.4)"
  }
];

export default function ThemeShopPreview() {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-900 mb-2">
            Theme Shop
          </h2>
          <p className="font-nunito text-gray-600">
            Personalize your learning experience
          </p>
        </div>
        <Link href="/shop">
          <motion.div
            className="flex items-center space-x-2 text-purple hover:text-purple/80 font-nunito font-semibold transition-colors"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span>View All Themes</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {previewThemes.map((theme, index) => (
          <motion.div
            key={theme.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.4 + index * 0.1,
              ease: "easeOut",
            }}
          >
            <Link href="/shop">
              <motion.div
                className="relative group cursor-pointer sparkle-container bounce-ease"
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  filter: "brightness(1.1)",
                  transition: { duration: 0.15 }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.12 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                style={{
                  boxShadow: `0 12px 28px rgba(0, 0, 0, 0.15), 0 6px 12px ${theme.glowColor}`
                }}
              >
                <div className="bg-white rounded-2xl border-6 border-white overflow-hidden h-44 relative">
                  {/* Rich gradient background */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ background: theme.gradient }}
                  />

                  {/* Inner highlight */}
                  <div className="absolute inset-3 border-3 border-white/40 rounded-xl pointer-events-none" />

                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col justify-between">
                    {/* Large gradient orb as preview */}
                    <div className="flex justify-center mb-4">
                      <div
                        className="w-16 h-16 rounded-full shadow-2xl border-4 border-white/40 relative"
                        style={{ background: theme.gradient }}
                      >
                        {/* Inner glow */}
                        <div
                          className="absolute inset-1 rounded-full opacity-50 blur-sm"
                          style={{ background: theme.gradient }}
                        />
                      </div>
                    </div>

                    {/* Color dots */}
                    <div className="flex justify-center space-x-3 mb-4">
                      {theme.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 rounded-full shadow-lg border-3 border-white"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Theme name */}
                    <div className="text-center">
                      <p className="font-fredoka font-bold text-base text-gray-900 group-hover:text-gray-700 transition-colors">
                        {theme.name}
                      </p>
                    </div>
                  </div>

                  {/* Animated shine sweep on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 pointer-events-none" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}