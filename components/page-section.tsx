import { SectionHeader } from "@/components/section-header";

export function PageSection({
  eyebrow,
  title,
  tinted,
  children,
}: {
  eyebrow: string;
  title: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`border-t px-6 py-16 md:py-24 ${tinted ? "bg-card/50" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
