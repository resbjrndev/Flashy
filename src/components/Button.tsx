"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseClasses = "font-fredoka font-bold rounded-full cursor-pointer select-none relative border-6 border-white btn-sway btn-shine sparkle-container bounce-ease";

  const variantClasses = {
    primary: `
      text-white
      shadow-lg
    `,
    secondary: `
      text-white
      shadow-lg
    `,
    success: `
      text-white
      shadow-lg
    `,
    warning: `
      text-white
      shadow-lg
    `
  };

  const sizeClasses = {
    sm: "px-6 py-3 text-sm font-semibold",
    md: "px-10 py-5 text-base font-bold",
    lg: "px-14 py-6 text-lg font-bold",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed grayscale"
    : "";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  const getGradientStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
          boxShadow: '0 8px 24px rgba(124, 58, 237, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
        };
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
          boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
        };
      case 'success':
        return {
          background: 'linear-gradient(135deg, #86EFAC 0%, #10B981 100%)',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #FCA5A5 0%, #EF4444 100%)',
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
        };
      default:
        return {};
    }
  };

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={getGradientStyle()}
      whileHover={disabled ? {} : {
        y: -4,
        scale: 1.05,
        filter: 'brightness(1.1)',
        boxShadow: variant === 'primary'
          ? '0 12px 24px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
          : undefined,
        transition: { duration: 0.15 }
      }}
      whileTap={disabled ? {} : {
        y: -1,
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      {/* Inner highlight for tactile effect */}
      <div className="absolute inset-1 bg-white/10 rounded-full pointer-events-none" />

      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
}