"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ current, total, className = "" }: ProgressBarProps) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <div className={`bg-white rounded-2xl border-6 border-white p-4 shadow-lg ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-fredoka font-bold text-lg text-gray-900">
          Progress
        </h3>
        <span className="font-nunito font-bold text-gray-700">
          {current} / {total}
        </span>
      </div>
      
      <div className="relative bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Shine effect */}
        <div 
          className="absolute top-0 left-0 h-full w-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: percentage > 0 ? 'shine-sweep 2s ease-out infinite' : 'none'
          }}
        />
      </div>
      
      <div className="mt-2 text-center">
        <span className="font-nunito text-sm text-gray-600">
          {Math.round(percentage)}% Complete
        </span>
      </div>
    </div>
  );
}