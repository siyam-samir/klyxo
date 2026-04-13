import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FounderCard } from "../shared/FounderCard";

interface MobileHeaderProps {
  isListening: boolean;
  onMicClick: () => void;
}

export function MobileHeader({ isListening, onMicClick }: MobileHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-[#050505]/95 backdrop-blur-md border-b border-border"
        data-ocid="mobile-header"
      >
        {/* KLYXO Logo */}
        <span
          className="text-2xl font-bold tracking-widest select-none"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(var(--primary))",
            textShadow: "0 0 20px rgba(226,177,89,0.4)",
          }}
        >
          KLYXO
        </span>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Mic Button */}
          <button
            type="button"
            onClick={onMicClick}
            aria-label={
              isListening ? "Stop voice search" : "Start voice search"
            }
            data-ocid="voice-search-btn"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
              isListening
                ? "bg-primary text-[#050505] shadow-[0_0_16px_rgba(226,177,89,0.6)]"
                : "text-primary hover:bg-primary/10"
            }`}
          >
            <motion.span
              animate={isListening ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={
                isListening
                  ? { repeat: Number.POSITIVE_INFINITY, duration: 1 }
                  : {}
              }
            >
              <FaMicrophone size={16} />
            </motion.span>
          </button>

          {/* Founder Mini Card */}
          <FounderCard
            variant="mini"
            onExpand={() => setShowProfile((p) => !p)}
          />
        </div>
      </header>

      {/* Founder Profile Dropdown */}
      <AnimatePresence>
        {showProfile && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfile(false)}
            />
            <motion.div
              className="fixed top-14 right-3 z-50 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 0 30px rgba(226,177,89,0.15), 0 20px 40px rgba(0,0,0,0.6)",
              }}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              data-ocid="founder-profile-dropdown"
            >
              <FounderCard variant="full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
