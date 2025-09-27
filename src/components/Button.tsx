"use client";

import { ReactNode, useState } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "destructive" | "constructive" | "neutral";
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
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = "font-fredoka font-bold rounded-full cursor-pointer select-none relative sparkle-container inline-block transition-all duration-200";

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
    `,
    destructive: `
      text-white
      shadow-lg
    `,
    constructive: `
      text-white
      shadow-lg
    `,
    neutral: `
      text-gray-700
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

  const hoverClasses = isHovered ? 'animate-[gentle-sway_2s_ease-in-out_infinite]' : '';
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${hoverClasses} ${className}`;

  const getGradientStyle = (isHovered = false) => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
          boxShadow: isHovered
            ? '0 6px 0 #4C1D95, 0 10px 25px rgba(76, 29, 149, 0.4)'
            : '0 8px 0 #4C1D95, 0 12px 25px rgba(76, 29, 149, 0.4)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(2px)' : 'translateY(0px)',
          border: 'none'
        };
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
          boxShadow: isHovered
            ? '0 6px 0 #D97706, 0 10px 25px rgba(217, 119, 6, 0.4)'
            : '0 8px 0 #D97706, 0 12px 25px rgba(217, 119, 6, 0.4)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(2px)' : 'translateY(0px)',
          border: 'none'
        };
      case 'success':
        return {
          background: 'linear-gradient(135deg, #86EFAC 0%, #10B981 100%)',
          boxShadow: isHovered
            ? '0 6px 0 #047857, 0 10px 25px rgba(4, 120, 87, 0.4)'
            : '0 8px 0 #047857, 0 12px 25px rgba(4, 120, 87, 0.4)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(2px)' : 'translateY(0px)',
          border: 'none'
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #FCA5A5 0%, #EF4444 100%)',
          boxShadow: isHovered
            ? '0 6px 0 #B91C1C, 0 10px 25px rgba(185, 28, 28, 0.4)'
            : '0 8px 0 #B91C1C, 0 12px 25px rgba(185, 28, 28, 0.4)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(2px)' : 'translateY(0px)',
          border: 'none'
        };
      case 'destructive':
        return {
          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
          boxShadow: isHovered
            ? '0 6px 0 #991B1B, 0 10px 25px rgba(153, 27, 27, 0.4)'
            : '0 8px 0 #991B1B, 0 12px 25px rgba(153, 27, 27, 0.4)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(2px)' : 'translateY(0px)',
          border: 'none'
        };
      case 'constructive':
        return {
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          boxShadow: isHovered
            ? '0 6px 0 #047857, 0 10px 25px rgba(4, 120, 87, 0.4)'
            : '0 8px 0 #047857, 0 12px 25px rgba(4, 120, 87, 0.4)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(2px)' : 'translateY(0px)',
          border: 'none'
        };
      case 'neutral':
        return {
          background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
          boxShadow: isHovered
            ? '0 6px 0 #9CA3AF, 0 10px 25px rgba(156, 163, 175, 0.4)'
            : '0 8px 0 #9CA3AF, 0 12px 25px rgba(156, 163, 175, 0.4)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
          transform: isHovered ? 'translateY(2px)' : 'translateY(0px)',
          border: 'none'
        };
      default:
        return {};
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={getGradientStyle(isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inner highlight for tactile effect */}
      <div className="absolute inset-1 bg-white/10 rounded-full pointer-events-none" />

      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
}