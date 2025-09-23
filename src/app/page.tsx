"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <motion.h1
          className="text-8xl md:text-9xl font-fredoka font-bold text-purple mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Flashy
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-nunito text-gray-700 max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          A flashy web application built with Next.js
        </motion.p>
      </div>
    </main>
  );
}
