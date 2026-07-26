import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Crisp inner dot — snappy
  const sx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 });
  // Big trailing blob — buttery
  const bx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.7 });
  const by = useSpring(y, { stiffness: 140, damping: 22, mass: 0.7 });

  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      ) as HTMLElement | null;
      if (interactive) {
        setHovering(true);
        setLabel(interactive.getAttribute("data-cursor"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };
    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!visible) return null;

  const size = pressing ? 60 : hovering ? 96 : 28;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: bx, y: by, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: hovering ? 1 : 0.75,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full bg-[var(--ink)] mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: pressing ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-2 w-2 items-center justify-center rounded-full bg-[var(--accent-warm)]"
      >
        <AnimatedLabel label={label} />
      </motion.div>
    </>
  );
}

function AnimatedLabel({ label }: { label: string | null }) {
  return (
    <motion.span
      initial={false}
      animate={{ opacity: label ? 1 : 0, x: label ? 20 : 8 }}
      transition={{ duration: 0.25 }}
      className="ml-14 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--paper)] mix-blend-difference"
    >
      {label}
    </motion.span>
  );
}
