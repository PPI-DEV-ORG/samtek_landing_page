"use client";
import * as React from "react";
import { useInView } from "@/hooks/use-in-view";

const CHAR_DELAY_MS = 45;

export function TypingTitle({
  as: Tag,
  className = "",
  children,
}: {
  as: "h1" | "h2";
  className?: string;
  children: string;
}) {
  const [ref, , seen] = useInView<HTMLHeadingElement>();
  const total = children.length;
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!seen) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const step = reduced ? total : 1;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c + step >= total) window.clearInterval(id);
        return Math.min(c + step, total);
      });
    }, CHAR_DELAY_MS);
    return () => window.clearInterval(id);
  }, [seen, total]);
  return (
    <Tag ref={ref} className={`whitespace-pre-line ${className}`}>
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {children.slice(0, count)}
        <span className="animate-caret-blink font-normal text-primary">|</span>
        <span className="invisible">{children.slice(count)}</span>
      </span>
    </Tag>
  );
}
