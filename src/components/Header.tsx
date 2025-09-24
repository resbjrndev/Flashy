"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "Decks", href: "/decks" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <motion.header
      className="bg-white border-b-4 border-white shadow-2xl shadow-black/10 relative overflow-hidden"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cream/30 via-white to-yellow/20" />

      {/* Inner highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-light to-primary-purple opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-light to-primary-purple rounded-full shadow-2xl shadow-primary-purple/30 flex items-center justify-center border-4 border-white">
                  <span className="text-white font-fredoka font-bold text-xl">F</span>
                </div>
                {/* Animated glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-light to-primary-purple rounded-full opacity-20 animate-pulse -z-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-fredoka font-bold text-2xl text-primary-purple leading-none">
                  Flashy
                </span>
                <span className="font-nunito text-xs text-gray-500 font-medium">
                  Learn Smarter
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={item.href}
                  className="font-nunito font-semibold text-gray-700 hover:text-primary-purple transition-all duration-200 px-4 py-2 rounded-2xl hover:bg-cream2 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button - placeholder for future implementation */}
          <div className="md:hidden">
            <motion.button
              className="p-3 rounded-2xl bg-cream2 border-4 border-white shadow-lg hover:bg-white hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6 text-primary-purple"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}