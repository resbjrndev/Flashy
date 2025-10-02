"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function SettingsPage() {

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8 bg-gradient-to-br from-cream/30 via-white to-yellow/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-fredoka font-bold text-4xl text-gray-900 mb-4">
                Settings
              </h1>
              <p className="font-nunito text-xl text-gray-600 max-w-2xl mx-auto">
                Customize your Flashy experience to match your learning style.
              </p>
            </div>

            {/* Coming Soon Notice */}
            <motion.div
              className="bg-white rounded-2xl border-6 border-white p-8 shadow-lg mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl mb-4">⚙️</div>
              <h2 className="font-fredoka font-bold text-2xl text-gray-900 mb-4">
                Settings Coming Soon!
              </h2>
              <p className="font-nunito text-lg text-gray-600 mb-6">
                We're working on adding customizable settings to enhance your study experience.
              </p>
              <Link href="/">
                <Button>
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