"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const navItems = [
    { name: "Learn", href: "/learn" },
    { name: "Decks", href: "/decks" },
    { name: "Progress", href: "/progress" },
  ];

  return (
    <motion.header
      className="bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-purple rounded-xl shadow-lg shadow-purple/20 flex items-center justify-center">
                <span className="text-white font-fredoka font-bold text-lg">F</span>
              </div>
              <span className="font-fredoka font-bold text-xl text-purple">
                Flashy
              </span>
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
                  className="font-nunito font-medium text-gray-700 hover:text-purple transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-cream/50"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button - placeholder for future implementation */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-cream/50 transition-colors">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}