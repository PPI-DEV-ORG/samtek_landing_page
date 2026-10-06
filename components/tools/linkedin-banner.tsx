import { MailIcon, MapPinIcon, MessageCircleIcon } from "lucide-react";
import { CapabilityIcon } from "@/components/capabilities/capability-icon";
import { SamtekLogo } from "@/components/samtek-logo";
import { Card } from "@/components/ui/card";
import { useCases } from "@/components/tools/use-cases";
import { company } from "@/content/about";
import { capabilities } from "@/content/capabilities";
import { scenarios } from "@/lib/hero-scenarios";

// Every size is in cqw (% of the banner width), so it scales as one piece.
// The left ~25% is kept light: LinkedIn puts the profile photo over it.
const shown = useCases.slice(0, 4);
const moreCount = capabilities.length - shown.length;
const contacts = [
  { icon: MailIcon, text: company.email },
  { icon: MessageCircleIcon, text: company.whatsapp.label },
  { icon: MapPinIcon, text: company.city },
];
const scenario = scenarios[2];
const det = scenario.detections[0];
// Own box: the scenario's bbox is tuned for its photo, not for an empty frame.
const bbox = { x: 0.12, y: 0.3, w: 0.4, h: 0.5 };

const gridLine = "color-mix(in oklab, var(--color-primary) 12%, transparent)";
const gridStyle = {
  backgroundImage: `linear-gradient(to right, ${gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${gridLine} 1px, transparent 1px)`,
  backgroundSize: "2cqw 2cqw",
} as const;

function X() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[2cqw] stroke-secondary"
      fill="none"
      strokeWidth={5}
    >
      <path d="M4 4 20 20M20 4 4 20" />
    </svg>
  );
}

function CameraFrame() {
  const { x, y, w, h } = bbox;
  const Icon = scenario.icon;
  return (
    <div className="absolute top-1/2 right-[4%] w-[27cqw] -translate-y-1/2">
      <div className="absolute inset-0 translate-x-[1cqw] translate-y-[1cqw] bg-primary" />
      <div className="relative aspect-16/10 overflow-hidden border bg-muted">
        <div className="absolute inset-0" style={gridStyle} />
        <div
          className="absolute border-[0.2cqw] border-secondary bg-secondary/20"
          style={{
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            width: `${w * 100}%`,
            height: `${h * 100}%`,
          }}
        >
          <Icon className="absolute top-1/2 left-1/2 size-[7cqw] -translate-x-1/2 -translate-y-1/2 text-secondary" />
          <span className="absolute bottom-full left-0 bg-secondary px-[0.6cqw] py-[0.15cqw] text-[0.9cqw] leading-none font-bold text-secondary-foreground">
            {det.label}
          </span>
        </div>
        <span className="absolute top-[0.8cqw] left-[0.8cqw] bg-background/80 px-[0.7cqw] py-[0.3cqw] text-[0.9cqw] leading-none">
          {scenario.camera}
        </span>
        <span className="absolute top-[0.8cqw] right-[0.8cqw] bg-primary px-[0.7cqw] py-[0.3cqw] text-[0.9cqw] leading-none font-bold text-primary-foreground">
          LIVE
        </span>
        <div className="absolute right-[0.8cqw] bottom-[0.8cqw] flex flex-col gap-[0.3cqw] border bg-card/90 px-[1cqw] py-[0.7cqw] text-[0.95cqw] leading-none">
          <div className="flex items-center justify-between gap-[1.5cqw]">
            <span className="font-bold">{det.label}</span>
            <span className="text-secondary">{det.confidence}%</span>
          </div>
          <span className="text-muted-foreground">{det.fields[0][1]}</span>
          <span className="text-primary">{det.status}</span>
        </div>
      </div>
    </div>
  );
}

export function LinkedinBanner() {
  return (
    <Card className="@container aspect-4/1 w-full max-w-[1584px] py-0">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[9cqw] -right-[7cqw] size-[20cqw] rounded-full border-[3cqw] border-secondary" />
        <div className="absolute -bottom-[8cqw] -left-[6cqw] size-[16cqw] rounded-full bg-primary" />
        <div className="absolute top-[3.2cqw] left-[17cqw] flex w-[5cqw] flex-wrap gap-[0.8cqw] [&_svg]:size-[1.6cqw]">
          <X />
          <X />
          <X />
        </div>
      </div>
      <div className="absolute top-[3cqw] left-[3.5cqw] z-10 flex flex-col gap-[0.5cqw]">
        <SamtekLogo className="text-[1.6cqw]" />
        <ul className="flex flex-col gap-[0.4cqw] text-[0.9cqw] text-muted-foreground">
          {contacts.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-[0.5cqw]">
              <Icon className="size-[1cqw] shrink-0 text-primary" />
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute inset-y-0 right-[33%] left-[24%] z-10 flex flex-col justify-center gap-[1.6cqw]">
        <h1 className="text-[2.8cqw] leading-tight font-extrabold">
          Your CCTV, now
          <br />
          <span className="text-primary">AI vision infrastructure.</span>
        </h1>
        <ul className="flex flex-wrap gap-[0.8cqw] text-[1.15cqw]">
          {shown.map(({ slug, label }) => (
            <li
              key={slug}
              className="flex items-center gap-[0.5cqw] border bg-card/80 px-[0.9cqw] py-[0.3cqw]"
            >
              <CapabilityIcon
                slug={slug}
                className="size-[1.3cqw] shrink-0 text-primary"
              />
              {label}
            </li>
          ))}
          <li className="flex items-center border border-dashed border-primary bg-card/80 px-[0.9cqw] py-[0.3cqw] text-primary">
            +{moreCount} more
          </li>
        </ul>
      </div>
      <CameraFrame />
    </Card>
  );
}
