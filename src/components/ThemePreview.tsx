"use client";

import { motion } from "framer-motion";

interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  preview: {
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
  };
}

const themes: Theme[] = [
  {
    name: "Ocean Breeze",
    colors: {
      primary: "#2563EB",
      secondary: "#3B82F6",
      accent: "#60A5FA",
      background: "#F0F9FF"
    },
    preview: {
      cardBg: "#FFFFFF",
      textPrimary: "#1E293B",
      textSecondary: "#64748B"
    }
  },
  {
    name: "Forest Dawn",
    colors: {
      primary: "#059669",
      secondary: "#10B981",
      accent: "#34D399",
      background: "#F0FDF4"
    },
    preview: {
      cardBg: "#FFFFFF",
      textPrimary: "#1E293B",
      textSecondary: "#64748B"
    }
  },
  {
    name: "Sunset Glow",
    colors: {
      primary: "#DC2626",
      secondary: "#EF4444",
      accent: "#F87171",
      background: "#FEF2F2"
    },
    preview: {
      cardBg: "#FFFFFF",
      textPrimary: "#1E293B",
      textSecondary: "#64748B"
    }
  }
];

export default function ThemePreview() {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
    >
      <div className="text-center mb-8">
        <h2 className="font-fredoka font-bold text-3xl text-gray-900 mb-2">
          Choose Your Style
        </h2>
        <p className="font-nunito text-gray-600 max-w-2xl mx-auto">
          Personalize your learning experience with beautiful themes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.name}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.4 + index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              y: -4,
              scale: 1.02
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            {/* Theme preview card */}
            <div
              className="rounded-xl p-6 border-2 border-gray-100 overflow-hidden relative"
              style={{ backgroundColor: theme.colors.background }}
            >
              {/* Color palette */}
              <div className="flex space-x-2 mb-4">
                <div
                  className="w-6 h-6 rounded-full shadow-sm"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div
                  className="w-6 h-6 rounded-full shadow-sm"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div
                  className="w-6 h-6 rounded-full shadow-sm"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>

              {/* Mini flashcard preview */}
              <div
                className="bg-white rounded-lg p-4 mb-4 shadow-sm border"
                style={{ backgroundColor: theme.preview.cardBg }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div
                    className="h-2 rounded-full w-3/4"
                    style={{ backgroundColor: theme.colors.primary + "40" }}
                  />
                  <div
                    className="h-1.5 rounded-full w-1/2"
                    style={{ backgroundColor: theme.colors.secondary + "30" }}
                  />
                </div>
              </div>

              {/* Theme name */}
              <div className="text-center">
                <h3
                  className="font-fredoka font-bold text-lg mb-1"
                  style={{ color: theme.preview.textPrimary }}
                >
                  {theme.name}
                </h3>
                <p
                  className="font-nunito text-sm"
                  style={{ color: theme.preview.textSecondary }}
                >
                  Tap to preview
                </p>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: theme.colors.primary + "10" }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="px-4 py-2 rounded-lg text-white font-nunito font-semibold text-sm"
                  style={{ backgroundColor: theme.colors.primary }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Apply Theme
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}