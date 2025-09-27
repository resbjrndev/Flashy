"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { saveDeck } from "@/lib/storage";
import { Deck } from "@/types";

interface FormData {
  title: string;
  description: string;
  category: string;
  color: string;
}

interface FormErrors {
  title?: string;
  description?: string;
}

export default function NewDeckPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'Language Learning',
    color: '#6B4EFF'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colorOptions = [
    '#6B4EFF', '#2563EB', '#059669', '#DC2626', '#7C3AED'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Deck title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Deck title must be at least 3 characters';
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Deck title must be less than 50 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.trim().length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const now = new Date();
      const newDeck: Deck = {
        id: crypto.randomUUID(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        color: formData.color,
        cards: [],
        isPublic: false,
        createdAt: now,
        updatedAt: now,
      };

      saveDeck(newDeck);

      // Redirect to deck edit page
      router.push(`/deck/${newDeck.id}/edit`);
    } catch (error) {
      console.error('Error creating deck:', error);
      setErrors({ title: 'Failed to create deck. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8 bg-gradient-to-br from-cream/30 via-white to-yellow/10">
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

            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border-6 border-white p-10 relative overflow-hidden"
              style={{
                boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <div>
                  <label className="block font-nunito font-semibold text-gray-700 mb-2">
                    Deck Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter deck title..."
                    className={`w-full px-6 py-4 rounded-2xl font-nunito font-semibold transition-all duration-200 shadow-lg border-4 text-gray-900 placeholder-gray-500 ${
                      errors.title
                        ? 'bg-red-50 border-warning-red/30 focus:bg-white focus:border-warning-red focus:shadow-xl focus:shadow-warning-red/20'
                        : 'bg-cream2 border-gray-200 focus:bg-white focus:border-primary-purple focus:shadow-xl focus:shadow-primary-purple/20'
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 font-nunito">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block font-nunito font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your deck..."
                    rows={3}
                    className={`w-full px-6 py-4 rounded-2xl font-nunito font-semibold resize-none transition-all duration-200 shadow-lg border-4 text-gray-900 placeholder-gray-500 ${
                      errors.description
                        ? 'bg-red-50 border-warning-red/30 focus:bg-white focus:border-warning-red focus:shadow-xl focus:shadow-warning-red/20'
                        : 'bg-cream2 border-gray-200 focus:bg-white focus:border-primary-purple focus:shadow-xl focus:shadow-primary-purple/20'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 font-nunito">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-nunito font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl font-nunito font-semibold transition-all duration-200 shadow-lg border-4 bg-cream2 border-gray-200 focus:bg-white focus:border-primary-purple focus:shadow-xl focus:shadow-primary-purple/20 text-gray-900"
                    >
                      <option value="Language Learning">Language Learning</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-nunito font-semibold text-gray-700 mb-2">
                      Color Theme
                    </label>
                    <div className="flex space-x-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleInputChange('color', color)}
                          className={`w-12 h-12 rounded-2xl border-4 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-95 ${
                            formData.color === color
                              ? 'border-white ring-4 ring-primary-purple/30 shadow-xl'
                              : 'border-white/60 hover:border-white'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Deck'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push('/')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}