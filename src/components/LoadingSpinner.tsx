"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  message = "Loading...",
  fullScreen = false
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses} role="status" aria-label={message}>
      <div className="text-center">
        <motion.div
          className={`${sizeClasses[size]} border-4 border-primary-purple border-t-transparent rounded-full mx-auto mb-4`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="font-nunito text-gray-600 text-sm">{message}</p>
      </div>
      <span className="sr-only">{message}</span>
    </div>
  );
}