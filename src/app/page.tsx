"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-fredoka font-bold text-purple mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Flashy
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-nunito text-gray-700 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Master new languages with interactive flashcards and smart learning algorithms
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Button size="lg" onClick={() => console.log("New Deck clicked!")}>
              Create New Deck
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => console.log("Browse Decks clicked!")}
            >
              Browse Decks
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
