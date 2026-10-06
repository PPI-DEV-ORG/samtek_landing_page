import { TypingTitle } from "@/components/typing-title";

export function SectionHeader({
  eyebrow,
  title,
  level = 2,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  level?: 1 | 2;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const heading =
    level === 1 ? (
      <TypingTitle as="h1" className="text-4xl font-extrabold md:text-6xl">
        {title}
      </TypingTitle>
    ) : (
      <TypingTitle as="h2" className="text-3xl font-extrabold md:text-5xl">
        {title}
      </TypingTitle>
    );
  const block = (
    <div className="flex flex-col gap-3">
      <span className="text-sm text-primary">&gt; {eyebrow}</span>
      {heading}
      {children}
    </div>
  );
  if (!description) return block;
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      {block}
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
