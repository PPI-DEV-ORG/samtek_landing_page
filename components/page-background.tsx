const gridLine = "color-mix(in oklab, var(--color-primary) 8%, transparent)";
const gridStyle = {
  backgroundImage: `linear-gradient(to right, ${gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${gridLine} 1px, transparent 1px)`,
  backgroundSize: "48px 48px",
} as const;
const ACCENT_GAP = 1280;
const ACCENT_COUNT = 16;
const accents = Array.from({ length: ACCENT_COUNT }, (_, i) => ({
  top: i * ACCENT_GAP,
  side: i % 2 === 0 ? "right" : "left",
  tone: i % 2 === 0 ? "primary" : "secondary",
}));

export function PageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0" style={gridStyle} />
      {accents.map(({ top, side, tone }) => (
        <div
          key={top}
          className={`absolute size-120 rounded-full blur-3xl ${
            tone === "primary" ? "bg-primary/20" : "bg-secondary/25"
          } ${side === "right" ? "-right-40" : "-left-40"}`}
          style={{ top }}
        />
      ))}
    </div>
  );
}
