import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GREETINGS = [
  "Hello",
  
  "Hallo",

  "Bonjour",

  "Olá",
  
  "Ciao",

  "Hola",  
  
  "こんにちは",
  
  "नमस्ते",
];

// Timing constants — exported so other components (e.g. the Hero) can key
// their own entrance animations off exactly when this preloader finishes,
// instead of guessing with hardcoded delays.
const GREETING_INTERVAL = 320; // ms each word is held before the next one
const HOLD_LAST = 520; // ms the final word lingers before the curtain lifts
const EXIT_DURATION = 0.9; // seconds — curtain slide-up animation length

export const PRELOAD_TOTAL_MS =
  (GREETINGS.length - 1) * GREETING_INTERVAL + HOLD_LAST + EXIT_DURATION * 1000;

export function Preloader({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (i >= GREETINGS.length - 1) {
      const t = setTimeout(() => setGone(true), HOLD_LAST);
      // Only tell the parent we're done once the exit animation has actually
      // finished playing — firing early was cutting the slide-up short and
      // made the main page appear to "snap" in instead of transitioning.
      const t2 = setTimeout(onDone, HOLD_LAST + EXIT_DURATION * 1000 + 30);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
    const t = setTimeout(() => setI((v) => v + 1), GREETING_INTERVAL);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-[var(--paper)]"
        >
          <div className="flex items-center gap-6 px-6">
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="h-3 w-3 shrink-0 rounded-full bg-[var(--accent-warm)]"
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={GREETINGS[i]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif-display text-7xl leading-none text-[var(--ink)] sm:text-8xl md:text-[10rem] lg:text-[12rem]"
              >
                {GREETINGS[i]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <div className="h-px w-24 overflow-hidden bg-[var(--border)]">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: (PRELOAD_TOTAL_MS - EXIT_DURATION * 1000) / 1000,
                  ease: "linear",
                }}
                className="h-full w-full bg-[var(--ink)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
