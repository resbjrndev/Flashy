"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function ShopPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8" style={{
        background: 'linear-gradient(135deg, var(--theme-background-secondary), var(--theme-background))'
      }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Coming Soon Icon */}
            <motion.div
              className="text-8xl mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              🎨
            </motion.div>

            {/* Header */}
            <h1 className="font-fredoka font-bold text-5xl text-gray-900 mb-4">
              Theme Shop
            </h1>
            <p className="font-nunito text-2xl text-gray-600 mb-8">
              Coming Soon!
            </p>

            {/* Description */}
            <motion.div
              className="bg-white rounded-2xl border-4 border-white p-8 shadow-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-nunito text-lg text-gray-700 mb-4">
                We're working hard to bring you an amazing selection of themes to personalize your study experience.
              </p>
              <p className="font-nunito text-base text-gray-600">
                Check back soon for beautiful themes, color schemes, and customization options!
              </p>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/">
                <Button size="lg">
                  Back to My Decks
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}