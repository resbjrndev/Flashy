"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function NewDeckPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center mb-8">
              <h1 className="font-fredoka font-bold text-4xl text-gray-900 mb-4">
                Create New Deck
              </h1>
              <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto">
                Start building your personalized flashcard deck
              </p>
            </div>

            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <div>
                  <label className="block font-nunito font-semibold text-gray-700 mb-2">
                    Deck Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter deck title..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent font-nunito"
                  />
                </div>

                <div>
                  <label className="block font-nunito font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe your deck..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent font-nunito resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-nunito font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent font-nunito">
                      <option>Language Learning</option>
                      <option>Science</option>
                      <option>History</option>
                      <option>Mathematics</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-nunito font-semibold text-gray-700 mb-2">
                      Color Theme
                    </label>
                    <div className="flex space-x-3">
                      {['#6B4EFF', '#2563EB', '#059669', '#DC2626', '#7C3AED'].map((color) => (
                        <button
                          key={color}
                          className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button size="lg" className="flex-1">
                    Create Deck
                  </Button>
                  <Button variant="secondary" size="lg">
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}