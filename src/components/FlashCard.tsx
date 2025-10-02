/**
 * FLASHCARD COMPONENT
 *
 * Displays a 3D flipping flashcard with front (question) and back (answer).
 *
 * KEY FEATURES:
 * - 3D flip animation using CSS transforms and framer-motion
 * - Click or press Space/Enter to flip
 * - Accessible with keyboard navigation and screen reader support
 * - Text is NEVER backwards (using backface-visibility)
 *
 * TECHNICAL APPROACH:
 * - Uses CSS 3D transforms (rotateY) for the flip effect
 * - Two divs positioned absolutely (front and back)
 * - backface-visibility: hidden prevents text from showing backwards
 * - Framer Motion handles the smooth animation
 */

"use client";

import { motion } from "framer-motion";  // Animation library from Framer
import { useState } from "react";
import { Card } from "@/types";

/**
 * Props for the FlashCard component
 */
interface FlashCardProps {
  card: Card;                              // The card data (front, back, etc.)
  showAnswer?: boolean;                    // Optional: start with answer showing
  onFlip?: (flipped: boolean) => void;     // Optional: callback when card flips
  className?: string;                      // Optional: additional CSS classes
}

export default function FlashCard({
  card,
  showAnswer = false,  // Default to showing the question side
  onFlip,
  className = ""
}: FlashCardProps) {
  // Track whether the card is currently flipped
  // useState hook gives us a state variable and a function to update it
  const [isFlipped, setIsFlipped] = useState(showAnswer);

  /**
   * Handle card flip
   * - Toggles the flip state
   * - Calls the optional onFlip callback (if provided by parent)
   *
   * This is called when user clicks the card or presses Enter/Space
   */
  const handleFlip = () => {
    const newFlipped = !isFlipped;  // Toggle: true becomes false, false becomes true
    setIsFlipped(newFlipped);       // Update state (triggers re-render with new rotation)
    onFlip?.(newFlipped);           // Optional chaining: only call if onFlip exists
  };

  /**
   * Handle keyboard input for accessibility
   * - Enter or Space key flips the card
   * - preventDefault stops the page from scrolling when pressing Space
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();  // Stop default Space behavior (page scroll)
      handleFlip();
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/*
        CARD CONTAINER WITH 3D PERSPECTIVE

        The 'perspective' CSS property is what creates the 3D effect.
        Think of it like viewing the card from a distance - the further away (higher number),
        the less dramatic the 3D effect. 1000px gives a nice subtle 3D look.

        This div is:
        - Clickable (onClick)
        - Keyboard accessible (tabIndex, onKeyDown)
        - Screen reader friendly (role, aria-label)
      */}
      <div
        className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-offset-2"
        style={{
          perspective: '1000px',  // Creates 3D space for the flip effect
          height: '320px'         // Fixed height so card doesn't change size
        }}
        onClick={handleFlip}      // Flip when clicked
        onKeyDown={handleKeyDown} // Flip when Enter/Space pressed
        tabIndex={0}              // Make it keyboard focusable (like a button)
        role="button"             // Tell screen readers this acts like a button
        aria-label={`Flashcard ${isFlipped ? 'showing answer' : 'showing question'}. Press Enter or Space to flip.`}
      >
        {/*
          THE ROTATING CONTAINER

          This is the key to the 3D flip effect! Here's how it works:

          1. transformStyle: 'preserve-3d'
             - This tells the browser to render child elements in 3D space
             - Without this, the front and back would be flat

          2. rotateY: isFlipped ? 180 : 0
             - When flipped, rotate 180 degrees on the Y axis (vertical axis)
             - When not flipped, rotation is 0 degrees
             - Framer Motion smoothly animates between these values

          3. Both front and back divs are positioned absolutely (in the same space)
             - They overlap each other
             - backface-visibility: hidden hides whichever side is facing away
        */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            transformStyle: 'preserve-3d'  // Enable 3D rendering for children
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}  // Rotate based on state
          transition={{ duration: 0.6, ease: "easeInOut" }}  // Smooth 0.6s animation
        >
          {/*
            FRONT SIDE (Question)

            backfaceVisibility: 'hidden' is CRITICAL
            - When rotated past 90 degrees, this div becomes invisible
            - This prevents the text from appearing backwards during rotation
          */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden'  // Hide when rotated away from viewer
            }}
          >
            <div className="w-full h-full bg-white rounded-xl border-4 border-purple-200 shadow-2xl p-8 flex items-center justify-center text-center">
              <div>
                {/* Question text - uses Fredoka font for cards */}
                <p className="font-fredoka font-bold text-2xl text-gray-900 mb-4">
                  {card.front}
                </p>
                <div className="text-xs text-gray-500 opacity-70">
                  Click to reveal answer
                </div>
              </div>
            </div>
          </div>

          {/*
            BACK SIDE (Answer)

            - Also has backfaceVisibility: 'hidden'
            - Starts rotated 180 degrees (facing backwards initially)
            - When the container rotates 180, this ends up facing forward
          */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden',  // Hide when facing away
              transform: 'rotateY(180deg)'   // Start rotated 180 degrees
            }}
          >
            <div className="w-full h-full bg-white rounded-xl border-4 border-green-200 shadow-2xl p-8 flex items-center justify-center text-center">
              <div>
                {/* Answer text - uses Nunito font for readability */}
                <p className="font-nunito text-xl text-gray-800 mb-4">
                  {card.back}
                </p>
                <div className="text-xs text-gray-500 opacity-70">
                  Rate your recall below
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Screen reader only text - hidden visually but read by assistive tech */}
      <div className="sr-only">
        This is a flashcard. Press Enter or Space to flip between question and answer.
      </div>
    </div>
  );
}