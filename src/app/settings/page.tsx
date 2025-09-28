"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "@/components/Layout";
import ToggleSwitch from "@/components/ToggleSwitch";
import Button from "@/components/Button";
import { useTheme } from "@/contexts/ThemeContext";

export default function SettingsPage() {
  const { currentTheme, setTheme, themes } = useTheme();

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: false,
    autoSave: true,
    darkMode: false,
    animations: true,
    compactMode: false,
    showProgress: true,
    autoAdvance: false,
    studyReminders: true,
    dataSync: false
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const settingsGroups = [
    {
      title: "Study Experience",
      icon: "📚",
      settings: [
        {
          key: "autoAdvance",
          label: "Auto-advance cards",
          description: "Automatically move to next card after reviewing",
          enabled: settings.autoAdvance
        },
        {
          key: "showProgress",
          label: "Show progress indicators",
          description: "Display progress bars and completion stats",
          enabled: settings.showProgress
        },
        {
          key: "studyReminders",
          label: "Study reminders",
          description: "Get notified when it's time to review",
          enabled: settings.studyReminders
        }
      ]
    },
    {
      title: "Interface",
      icon: "🎨",
      settings: [
        {
          key: "animations",
          label: "Smooth animations",
          description: "Enable card flip and transition effects",
          enabled: settings.animations
        },
        {
          key: "compactMode",
          label: "Compact mode",
          description: "Show more content in less space",
          enabled: settings.compactMode
        },
        {
          key: "darkMode",
          label: "Dark mode",
          description: "Switch to dark color scheme",
          enabled: settings.darkMode
        }
      ]
    },
    {
      title: "Audio & Notifications",
      icon: "🔔",
      settings: [
        {
          key: "notifications",
          label: "Push notifications",
          description: "Receive study reminders and updates",
          enabled: settings.notifications
        },
        {
          key: "soundEffects",
          label: "Sound effects",
          description: "Play sounds for card flips and actions",
          enabled: settings.soundEffects
        }
      ]
    },
    {
      title: "Data & Storage",
      icon: "💾",
      settings: [
        {
          key: "autoSave",
          label: "Auto-save progress",
          description: "Automatically save your study progress",
          enabled: settings.autoSave
        },
        {
          key: "dataSync",
          label: "Cloud sync",
          description: "Sync your decks across devices",
          enabled: settings.dataSync
        }
      ]
    }
  ];

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

            {/* Current Theme Display */}
            <motion.div
              className="bg-white rounded-2xl border-6 border-white p-6 shadow-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-fredoka font-bold text-xl text-gray-900 mb-4 flex items-center">
                🎨 Current Theme
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-fredoka font-bold text-lg text-gray-800">
                    {themes.find(t => t.id === currentTheme)?.name || 'Default'}
                  </h3>
                  <p className="font-nunito text-gray-600">
                    {themes.find(t => t.id === currentTheme)?.description || 'Classic design'}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.location.href = '/shop'}
                >
                  Browse Themes
                </Button>
              </div>
            </motion.div>

            {/* Settings Groups */}
            <div className="space-y-6">
              {settingsGroups.map((group, groupIndex) => (
                <motion.div
                  key={group.title}
                  className="bg-white rounded-2xl border-6 border-white p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (groupIndex * 0.1) }}
                >
                  <h2 className="font-fredoka font-bold text-xl text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">{group.icon}</span>
                    {group.title}
                  </h2>

                  <div className="space-y-4">
                    {group.settings.map((setting, settingIndex) => (
                      <motion.div
                        key={setting.key}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (groupIndex * 0.1) + (settingIndex * 0.05) }}
                      >
                        <div className="flex-1">
                          <h3 className="font-fredoka font-bold text-lg text-gray-800">
                            {setting.label}
                          </h3>
                          <p className="font-nunito text-sm text-gray-600 mt-1">
                            {setting.description}
                          </p>
                        </div>

                        <div className="ml-4">
                          <ToggleSwitch
                            enabled={setting.enabled}
                            onChange={(enabled) => handleSettingChange(setting.key, enabled)}
                            size="md"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Account Section */}
            <motion.div
              className="bg-white rounded-2xl border-6 border-white p-6 shadow-lg mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="font-fredoka font-bold text-xl text-gray-900 mb-6 flex items-center">
                👤 Account
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="neutral" size="md" className="w-full">
                  Export Data
                </Button>
                <Button variant="neutral" size="md" className="w-full">
                  Import Data
                </Button>
                <Button variant="warning" size="md" className="w-full">
                  Reset Settings
                </Button>
                <Button variant="destructive" size="md" className="w-full">
                  Delete Account
                </Button>
              </div>
            </motion.div>

            {/* Version Info */}
            <motion.div
              className="text-center mt-8 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="font-nunito text-sm">
                Flashy v1.0.0 • Made with ❤️ for learners everywhere
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}