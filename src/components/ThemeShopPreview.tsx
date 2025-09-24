"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const previewThemes = [
  {
    name: "Ocean Breeze",
    colors: ["#2563EB", "#3B82F6", "#60A5FA"],
    background: "#F0F9FF"
  },
  {
    name: "Forest Dawn",
    colors: ["#059669", "#10B981", "#34D399"],
    background: "#F0FDF4"
  },
  {
    name: "Sunset Glow",
    colors: ["#DC2626", "#EF4444", "#F87171"],
    background: "#FEF2F2"
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

      <div className="grid grid-cols-3 gap-4">
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
                className="relative group cursor-pointer"
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <div
                  className="rounded-lg p-4 border border-gray-100 overflow-hidden h-24 flex flex-col justify-between"
                  style={{ backgroundColor: theme.background }}
                >
                  {/* Color palette */}
                  <div className="flex space-x-1">
                    {theme.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Theme name */}
                  <div>
                    <p className="font-nunito font-semibold text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      {theme.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}