"use client";

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function SettingsPage() {
  const settingsSections = [
    {
      title: "Study Preferences",
      settings: [
        { name: "Daily study goal", type: "number", value: "20", unit: "cards" },
        { name: "Study notifications", type: "toggle", value: true },
        { name: "Auto-advance cards", type: "toggle", value: false },
        { name: "Show progress stats", type: "toggle", value: true }
      ]
    },
    {
      title: "Appearance",
      settings: [
        { name: "Theme", type: "select", value: "Default", options: ["Default", "Ocean Breeze", "Forest Dawn", "Sunset Glow"] },
        { name: "Card font size", type: "select", value: "Medium", options: ["Small", "Medium", "Large"] },
        { name: "Animations", type: "toggle", value: true }
      ]
    },
    {
      title: "Account",
      settings: [
        { name: "Export data", type: "button", action: "Export" },
        { name: "Import data", type: "button", action: "Import" },
        { name: "Reset progress", type: "button", action: "Reset", variant: "danger" }
      ]
    }
  ];

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
                Settings
              </h1>
              <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto">
                Customize your learning experience
              </p>
            </div>

            <div className="space-y-6">
              {settingsSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + sectionIndex * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-fredoka font-bold text-xl text-gray-900">
                      {section.title}
                    </h2>
                  </div>

                  <div className="p-6 space-y-4">
                    {section.settings.map((setting, settingIndex) => (
                      <div
                        key={setting.name}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex-1">
                          <label className="font-nunito font-semibold text-gray-700">
                            {setting.name}
                          </label>
                        </div>

                        <div className="flex items-center space-x-4">
                          {setting.type === "toggle" && (
                            <div className="relative">
                              <button
                                className={`w-12 h-6 rounded-full transition-colors ${
                                  setting.value === true ? "bg-purple" : "bg-gray-300"
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                                    setting.value === true ? "translate-x-6" : "translate-x-0.5"
                                  }`}
                                />
                              </button>
                            </div>
                          )}

                          {setting.type === "number" && (
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                defaultValue={setting.value}
                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent font-nunito text-center"
                              />
                              {setting.unit && (
                                <span className="font-nunito text-sm text-gray-500">
                                  {setting.unit}
                                </span>
                              )}
                            </div>
                          )}

                          {setting.type === "select" && (
                            <select
                              defaultValue={setting.value}
                              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent font-nunito"
                            >
                              {setting.options?.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          )}

                          {setting.type === "button" && (
                            <Button
                              size="sm"
                              variant={setting.variant === "danger" ? "secondary" : "primary"}
                              className={setting.variant === "danger" ? "text-red-600 border-red-200 hover:bg-red-50" : ""}
                            >
                              {setting.action}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            >
              <Button size="lg">
                Save Changes
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}