import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  accentWords?: string[];
  radius?: number;
  strength?: number;
};

/**
 * A large display headline where each letter subtly reacts to the cursor,
 * inspired by editorial portfolio sites. Uses direct DOM style writes on
 * mousemove to avoid re-renders while still feeling silky-smooth.
 */
export function InteractiveHeadline({
  text,
  className = "",
  accentWords = [],
  radius = 160,
  strength = 0.45,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const tick = () => {
      const { x: mx, y: my } = mouse.current;
      for (const el of lettersRef.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          const f = 1 - dist / radius;
          const tx = -dx * f * strength;
          const ty = -dy * f * strength;
          const scale = 1 + f * 0.15;
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
          el.style.color = "var(--accent-warm)";
        } else {
          el.style.transform = "translate3d(0,0,0) scale(1)";
          el.style.color = "";
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [radius, strength]);

  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, wi) => {
        const accent = accentWords.some(
          (a) => a.toLowerCase() === word.replace(/[.,]/g, "").toLowerCase(),
        );
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((c, ci) => {
              const idx = letterIndex++;
              return (
                <span
                  key={ci}
                  ref={(el) => {
                    if (el) lettersRef.current[idx] = el;
                  }}
                  style={{
                    transition:
                      "transform 0.35s cubic-bezier(0.22,1,0.36,1), color 0.35s ease",
                    display: "inline-block",
                    willChange: "transform",
                    color: accent ? "var(--accent-warm)" : undefined,
                  }}
                >
                  {c}
                </span>
              );
            })}
            {wi < words.length - 1 && (
              <span style={{ display: "inline-block", width: "0.35em" }} />
            )}
          </span>
        );
      })}
    </div>
  );
}
