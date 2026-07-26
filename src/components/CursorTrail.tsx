import { useEffect, useRef, useState } from "react";

/**
 * A soft comet-tail of small circles that lags behind the cursor — each dot
 * chases the position of the dot before it, producing the "trace" effect.
 * Pure rAF + direct DOM writes (no per-frame React state) to stay silky.
 */
const TRAIL = [
  { size: 15, opacity: 0.35, color: "var(--ink)", ease: 0.32 },
  { size: 11, opacity: 0.3, color: "var(--ink)", ease: 0.26 },
  { size: 8, opacity: 0.4, color: "var(--accent-warm)", ease: 0.21 },
  { size: 6, opacity: 0.32, color: "var(--accent-warm)", ease: 0.17 },
  { size: 4, opacity: 0.24, color: "var(--ink)", ease: 0.13 },
];

export function CursorTrail() {
  const [visible, setVisible] = useState(false);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef(TRAIL.map(() => ({ x: -100, y: -100 })));
  const mouse = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      let targetX = mouse.current.x;
      let targetY = mouse.current.y;
      positions.current.forEach((p, i) => {
        const ease = TRAIL[i].ease;
        p.x += (targetX - p.x) * ease;
        p.y += (targetY - p.y) * ease;
        const el = dotsRef.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        }
        targetX = p.x;
        targetY = p.y;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9996]">
      {TRAIL.map((t, i) => (
        <div
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: t.size,
            height: t.size,
            borderRadius: "9999px",
            background: t.color,
            opacity: t.opacity,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
