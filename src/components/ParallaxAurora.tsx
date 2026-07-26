import { useEffect, useRef } from "react";

/**
 * Fixed aurora background whose blobs drift with cursor + scroll for a
 * subtle parallax feel. All updates happen through CSS variables — no
 * React re-renders on move.
 */
export function ParallaxAurora() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mx = 0;
    let my = 0;
    let sy = 0;
    let raf: number | null = null;

    const apply = () => {
      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);
      el.style.setProperty("--sy", `${sy}px`);
      raf = null;
    };
    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(apply);
    };

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 60;
      my = (e.clientY / window.innerHeight - 0.5) * 60;
      el.style.setProperty("--spot-x", `${e.clientX}px`);
      el.style.setProperty("--spot-y", `${e.clientY}px`);
      schedule();
    };
    const onScroll = () => {
      sy = window.scrollY * 0.12;
      schedule();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="bg-aurora" aria-hidden>
      <span />
      <i className="bg-spotlight" />
    </div>
  );
}
