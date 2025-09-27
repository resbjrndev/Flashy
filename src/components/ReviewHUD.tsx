"use client";

import { motion } from "framer-motion";
import Button from "./Button";

interface ReviewHUDProps {
  onGrade: (grade: 'again' | 'hard' | 'good' | 'easy') => void;
  disabled?: boolean;
}

export default function ReviewHUD({ onGrade, disabled = false }: ReviewHUDProps) {
  const grades = [
    {
      key: 'again' as const,
      emoji: '😞',
      label: 'Again',
      description: 'Completely forgot',
      variant: 'destructive' as const
    },
    {
      key: 'hard' as const,
      emoji: '😐',
      label: 'Hard',
      description: 'Remembered with effort',
      variant: 'warning' as const
    },
    {
      key: 'good' as const,
      emoji: '😊',
      label: 'Good',
      description: 'Remembered well',
      variant: 'constructive' as const
    },
    {
      key: 'easy' as const,
      emoji: '😄',
      label: 'Easy',
      description: 'Perfect recall',
      variant: 'success' as const
    }
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl border-6 border-white p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center mb-6">
        <h3 className="font-fredoka font-bold text-xl text-gray-900 mb-2">
          How well did you know this?
        </h3>
        <p className="font-nunito text-gray-600 text-sm">
          Rate your recall to improve future reviews
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {grades.map((grade, index) => (
          <motion.div
            key={grade.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button
              variant={grade.variant}
              size="sm"
              onClick={() => onGrade(grade.key)}
              disabled={disabled}
              className="w-full flex-col h-auto py-4 px-3"
            >
              <div className="text-2xl mb-1">{grade.emoji}</div>
              <div className="font-bold text-sm mb-1">{grade.label}</div>
              <div className="text-xs opacity-80 leading-tight">{grade.description}</div>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}