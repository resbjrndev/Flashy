"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import ThemePreview from "@/components/ThemePreview";

export default function ShopPage() {
  const featuredDecks = [
    {
      title: "Spanish Basics",
      description: "Essential words and phrases for beginners",
      author: "Language Expert",
      rating: 4.8,
      downloads: "12K",
      price: "Free"
    },
    {
      title: "Physics Formulas",
      description: "Key formulas for high school physics",
      author: "Science Teacher",
      rating: 4.9,
      downloads: "8.5K",
      price: "$2.99"
    },
    {
      title: "World Capitals",
      description: "Countries and their capital cities",
      author: "Geography Pro",
      rating: 4.7,
      downloads: "15K",
      price: "Free"
    }
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center mb-12">
              <h1 className="font-fredoka font-bold text-4xl text-gray-900 mb-4">
                Shop
              </h1>
              <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto">
                Discover flashcard decks and themes created by the community
              </p>
            </div>

            {/* Search and Filters */}
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search decks..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent font-nunito"
                  />
                </div>
                <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent font-nunito">
                  <option>All Categories</option>
                  <option>Language Learning</option>
                  <option>Science</option>
                  <option>History</option>
                  <option>Mathematics</option>
                </select>
                <Button>Search</Button>
              </div>
            </motion.div>

            {/* Theme Preview Section */}
            <ThemePreview />

            {/* Featured Decks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <h2 className="font-fredoka font-bold text-2xl text-gray-900 mb-6">
                Featured Decks
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredDecks.map((deck, index) => (
                  <motion.div
                    key={deck.title}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-fredoka font-bold text-xl text-gray-900 mb-1">
                            {deck.title}
                          </h3>
                          <p className="font-nunito text-sm text-gray-600">
                            by {deck.author}
                          </p>
                        </div>
                        <span className="font-nunito font-bold text-lg text-purple">
                          {deck.price}
                        </span>
                      </div>

                      <p className="font-nunito text-gray-600 text-sm mb-4 line-clamp-2">
                        {deck.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">★</span>
                            <span className="font-nunito text-sm text-gray-600">
                              {deck.rating}
                            </span>
                          </div>
                          <span className="font-nunito text-sm text-gray-500">
                            {deck.downloads} downloads
                          </span>
                        </div>
                      </div>

                      <Button size="sm" className="w-full">
                        {deck.price === "Free" ? "Download" : "Purchase"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}