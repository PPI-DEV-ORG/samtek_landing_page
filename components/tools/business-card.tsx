import { MailIcon, MapPinIcon, MessageCircleIcon } from "lucide-react";
import { CapabilityIcon } from "@/components/capabilities/capability-icon";
import { SamtekLogo } from "@/components/samtek-logo";
import { Card, CardContent } from "@/components/ui/card";
import { company, type TeamMember } from "@/content/about";
import { capabilities } from "@/content/capabilities";
import { useCases } from "@/components/tools/use-cases";

// Standard 85.6 x 54 mm card.
const cardClass = "aspect-[85.6/54] w-full max-w-md";

const contacts = [
  { icon: MailIcon, text: company.email },
  { icon: MessageCircleIcon, text: company.whatsapp.label },
  { icon: MapPinIcon, text: company.city },
];

const moreCount = capabilities.length - useCases.length;

function XMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-6 stroke-secondary ${className ?? ""}`}
      fill="none"
      strokeWidth={5}
    >
      <path d="M4 4 20 20M20 4 4 20" />
    </svg>
  );
}

function XCluster({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`absolute flex gap-2 ${
        compact ? "w-16 [&_svg]:size-4" : "w-14 flex-wrap"
      } ${className ?? ""}`}
    >
      <XMark />
      <XMark />
      <XMark />
    </div>
  );
}

// Clipped by the card's overflow-hidden, so only a quarter shows.
function Ring({ className, small }: { className?: string; small?: boolean }) {
  return (
    <div
      className={`absolute rounded-full border-secondary ${
        small ? "size-16 border-8" : "size-28 border-[14px]"
      } ${className ?? ""}`}
    />
  );
}

function Quarter({ className }: { className?: string }) {
  return (
    <div
      className={`absolute size-24 rounded-full bg-primary ${className ?? ""}`}
    />
  );
}

function Decor({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {children}
    </div>
  );
}

export function BusinessCardFront({ member }: { member: TeamMember }) {
  return (
    <Card className={cardClass}>
      <Decor>
        <Ring className="-top-14 -right-14" />
        <XCluster className="top-[42%] right-8" />
        <Quarter className="-right-12 -bottom-12" />
      </Decor>
      <CardContent className="relative z-10 flex h-full flex-col justify-between gap-4">
        <div className="flex items-center justify-between gap-2">
          <SamtekLogo className="text-lg" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-primary">&gt; {member.role.toUpperCase()}</span>
          <div className="text-2xl font-extrabold">{member.name}</div>
        </div>
        <ul className="flex flex-col gap-1 text-muted-foreground">
          {contacts.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon className="size-3.5 shrink-0 text-primary" />
              {text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function BusinessCardBack() {
  return (
    <Card className={cardClass}>
      <Decor>
        <Ring small className="-top-8 -right-8" />
        <XCluster compact className="top-4 right-12" />
        <Quarter className="-right-12 -bottom-12" />
      </Decor>
      <CardContent className="relative z-10 flex h-full flex-col justify-between gap-3">
        <span className="text-primary">&gt; AI_USE_CASES</span>
        <ul className="grid grid-cols-2 gap-2">
          {useCases.map(({ slug, label }) => (
            <li
              key={slug}
              className="flex items-center gap-2 border bg-card/80 px-2 py-0.5"
            >
              <CapabilityIcon
                slug={slug}
                className="size-3.5 shrink-0 text-primary"
              />
              {label}
            </li>
          ))}
          <li className="col-span-2 flex items-center justify-center border border-dashed border-primary bg-card/80 px-2 py-0.5 text-primary">
            +{moreCount} more use cases
          </li>
        </ul>
        <SamtekLogo className="text-sm" />
      </CardContent>
    </Card>
  );
}
