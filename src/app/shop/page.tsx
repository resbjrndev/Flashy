"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "@/components/Layout";
import ThemeCard from "@/components/ThemeCard";
import Button from "@/components/Button";
import { useTheme } from "@/contexts/ThemeContext";

interface Theme {
  id: string;
  name: string;
  description: string;
  gradient: string;
  previewGradients: string[];
  price: number;
  isPremium: boolean;
  category: 'free' | 'premium' | 'seasonal';
}

const themes: Theme[] = [
  {
    id: 'default',
    name: 'Ocean Breeze',
    description: 'Calming blues and purples for focused study sessions',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    previewGradients: [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    ],
    price: 0,
    isPremium: false,
    category: 'free'
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    description: 'Warm oranges and pinks for creative energy',
    gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6b95 100%)',
    previewGradients: [
      'linear-gradient(135deg, #ff9a56 0%, #ff6b95 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff8a80 0%, #ff5722 100%)'
    ],
    price: 0,
    isPremium: false,
    category: 'free'
  },
  {
    id: 'forest',
    name: 'Forest Dreams',
    description: 'Natural greens for a refreshing study environment',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    previewGradients: [
      'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
      'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)'
    ],
    price: 2.99,
    isPremium: true,
    category: 'premium'
  },
  {
    id: 'neon',
    name: 'Neon Nights',
    description: 'Electric colors for high-energy study sessions',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    previewGradients: [
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    ],
    price: 4.99,
    isPremium: true,
    category: 'premium'
  },
  {
    id: 'cosmic',
    name: 'Cosmic Galaxy',
    description: 'Deep space purples and blues for night owls',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    previewGradients: [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #2c3e50 0%, #4a69bd 100%)',
      'linear-gradient(135deg, #141e30 0%, #243b55 100%)'
    ],
    price: 3.99,
    isPremium: true,
    category: 'premium'
  },
  {
    id: 'cherry',
    name: 'Cherry Blossom',
    description: 'Soft pinks and whites for gentle learning',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    previewGradients: [
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    ],
    price: 0,
    isPremium: false,
    category: 'seasonal'
  }
];

export default function ShopPage() {
  const { setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'free' | 'premium' | 'seasonal'>('all');
  const [ownedThemes, setOwnedThemes] = useState<string[]>(['default', 'sunset', 'cherry']);

  const filteredThemes = themes.filter(theme =>
    selectedCategory === 'all' || theme.category === selectedCategory
  );

  const handlePurchase = (themeId: string) => {
    setOwnedThemes(prev => [...prev, themeId]);
    console.log(`Purchased theme: ${themeId}`);
  };

  const handleApply = (themeId: string) => {
    setTheme(themeId as any);
    console.log(`Applied theme: ${themeId}`);
  };

  const categories = [
    { id: 'all', label: 'All Themes', count: themes.length },
    { id: 'free', label: 'Free', count: themes.filter(t => t.category === 'free').length },
    { id: 'premium', label: 'Premium', count: themes.filter(t => t.category === 'premium').length },
    { id: 'seasonal', label: 'Seasonal', count: themes.filter(t => t.category === 'seasonal').length },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8" style={{
        background: 'linear-gradient(135deg, var(--theme-background-secondary), var(--theme-background))'
      }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-fredoka font-bold text-4xl text-gray-900 mb-4">
                Theme Shop
              </h1>
              <p className="font-nunito text-xl text-gray-600 max-w-2xl mx-auto">
                Personalize your study experience with beautiful themes.
                Choose from free options or unlock premium designs.
              </p>
            </div>

            {/* Category Filter */}
            <motion.div
              className="bg-white rounded-2xl border-6 border-white p-4 shadow-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    className={`px-6 py-3 rounded-full font-fredoka font-bold text-sm transition-all duration-200 cursor-pointer ${
                      selectedCategory === category.id
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={selectedCategory === category.id ? {
                      background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                      boxShadow: '0 4px 0 #4C1D95, 0 6px 12px rgba(76, 29, 149, 0.4)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    } : {}}
                    onClick={() => setSelectedCategory(category.id as any)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 2 }}
                  >
                    {category.label} ({category.count})
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl border-6 border-white p-6 shadow-lg text-center">
                <div className="text-3xl font-fredoka font-bold text-purple-600 mb-2">
                  {ownedThemes.length}
                </div>
                <div className="font-nunito text-gray-600">Themes Owned</div>
              </div>
              <div className="bg-white rounded-2xl border-6 border-white p-6 shadow-lg text-center">
                <div className="text-3xl font-fredoka font-bold text-green-600 mb-2">
                  {themes.filter(t => t.price === 0).length}
                </div>
                <div className="font-nunito text-gray-600">Free Themes</div>
              </div>
              <div className="bg-white rounded-2xl border-6 border-white p-6 shadow-lg text-center">
                <div className="text-3xl font-fredoka font-bold text-orange-600 mb-2">
                  {themes.filter(t => t.isPremium).length}
                </div>
                <div className="font-nunito text-gray-600">Premium Themes</div>
              </div>
            </motion.div>

            {/* Themes Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {filteredThemes.map((theme, index) => (
                <ThemeCard
                  key={theme.id}
                  id={theme.id}
                  name={theme.name}
                  description={theme.description}
                  gradient={theme.gradient}
                  previewGradients={theme.previewGradients}
                  price={theme.price}
                  isOwned={ownedThemes.includes(theme.id)}
                  isPremium={theme.isPremium}
                  onPurchase={handlePurchase}
                  onApply={handleApply}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Premium CTA */}
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mt-12 text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="font-fredoka font-bold text-2xl mb-4">
                ✨ Unlock All Premium Themes
              </h3>
              <p className="font-nunito text-lg mb-6 opacity-90">
                Get access to all premium themes and future releases with Flashy Pro
              </p>
              <Button variant="secondary" size="lg">
                Upgrade to Pro - $9.99
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}