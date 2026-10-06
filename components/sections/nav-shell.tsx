"use client";
import { useEffect, useRef, useState } from "react";

export function NavShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${ratio})`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <nav className="sticky top-5 z-50 mt-5 px-6">
      <div
        className={`relative mx-auto max-w-6xl overflow-hidden border px-4 transition-[padding,background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "border-white/10 bg-background/50 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent py-3 shadow-none"
        }`}
      >
        {children}
        <div
          ref={progressRef}
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </nav>
  );
}
