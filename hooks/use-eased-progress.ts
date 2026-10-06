import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function useEasedProgress({
  duration,
  active,
}: {
  duration: number;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    if (!active || reduced) return;
    const start = performance.now();
    let raf = requestAnimationFrame(function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(frame);
    });
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, duration]);
  return reduced ? 1 : progress;
}
