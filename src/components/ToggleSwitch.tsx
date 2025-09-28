"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export default function ToggleSwitch({
  enabled,
  onChange,
  size = 'md',
  disabled = false,
  className = ""
}: ToggleSwitchProps) {
  const [isPressed, setIsPressed] = useState(false);

  const sizes = {
    sm: {
      switch: 'w-10 h-6',
      knob: 'w-4 h-4',
      translate: enabled ? 'translateX(16px)' : 'translateX(2px)'
    },
    md: {
      switch: 'w-12 h-7',
      knob: 'w-5 h-5',
      translate: enabled ? 'translateX(20px)' : 'translateX(2px)'
    },
    lg: {
      switch: 'w-16 h-8',
      knob: 'w-6 h-6',
      translate: enabled ? 'translateX(32px)' : 'translateX(2px)'
    }
  };

  const currentSize = sizes[size];

  const handleClick = () => {
    if (!disabled) {
      onChange(!enabled);
    }
  };

  return (
    <motion.div
      className={`relative rounded-full cursor-pointer transition-all duration-300 ${currentSize.switch} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      style={{
        background: enabled
          ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
          : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
        boxShadow: enabled
          ? '0 4px 0 #047857, 0 6px 12px rgba(4, 120, 87, 0.4)'
          : '0 4px 0 #9CA3AF, 0 6px 12px rgba(156, 163, 175, 0.4)',
      }}
      onClick={handleClick}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 2 } : {}}
      onTapStart={() => setIsPressed(true)}
      onTapCancel={() => setIsPressed(false)}
      onTap={() => setIsPressed(false)}
    >
      {/* Switch track highlight */}
      <div className="absolute inset-1 bg-white/20 rounded-full" />

      {/* Switch knob */}
      <motion.div
        className={`absolute top-1 rounded-full bg-white shadow-lg ${currentSize.knob}`}
        animate={{
          x: enabled ? currentSize.translate.match(/\d+/)?.[0] + 'px' : '2px',
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
        style={{
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Knob highlight */}
        <div className="absolute inset-0.5 bg-white/40 rounded-full" />
      </motion.div>

      {/* Ripple effect on press */}
      {isPressed && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white/30"
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}