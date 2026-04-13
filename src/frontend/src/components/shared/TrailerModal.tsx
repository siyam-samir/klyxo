import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useKlyxoStore } from "../../store";

export function TrailerModal() {
  const { isTrailerModalOpen, trailerVideoKey, closeTrailer } = useKlyxoStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTrailer();
    };
    if (isTrailerModalOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isTrailerModalOpen, closeTrailer]);

  return (
    <AnimatePresence>
      {isTrailerModalOpen && trailerVideoKey && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-ocid="trailer-modal-overlay"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm"
            onClick={closeTrailer}
            onKeyDown={(e) => e.key === "Enter" && closeTrailer()}
            role="button"
            tabIndex={-1}
            aria-label="Close trailer"
          />

          {/* Modal Content */}
          <motion.div
            className="relative z-10 w-full max-w-5xl mx-4 aspect-video rounded-lg overflow-hidden shadow-2xl"
            style={{
              boxShadow:
                "0 0 60px rgba(226,177,89,0.15), 0 25px 50px rgba(0,0,0,0.8)",
            }}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            data-ocid="trailer-modal-content"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeTrailer}
              aria-label="Close trailer"
              data-ocid="trailer-close-btn"
              className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-[#050505]/80 text-primary border border-primary/30 hover:bg-primary hover:text-[#050505] transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <X size={18} />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerVideoKey}?autoplay=1&fs=1&controls=1&rel=0`}
              title="Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
