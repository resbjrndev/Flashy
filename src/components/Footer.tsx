"use client";

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-fredoka font-bold text-2xl text-purple-600 mb-2">
              Flashy
            </h3>
            <p className="font-nunito text-gray-600 text-sm">
              Master new languages with interactive flashcards and smart learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 font-nunito text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/deck/new" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Create Deck
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Browse Shop
                </a>
              </li>
              <li>
                <a href="/settings" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-3">
              About
            </h4>
            <p className="font-nunito text-gray-600 text-sm mb-4">
              Flashy helps you learn faster with spaced repetition and interactive flashcards.
            </p>
            <p className="font-nunito text-gray-500 text-xs">
              © {new Date().getFullYear()} Flashy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
