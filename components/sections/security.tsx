import { SectionHeader } from "@/components/section-header";
import { SecurityFlow } from "@/components/sections/security-flow";

const securityPoints = [
  "All inference and storage run on-premise, inside your local network.",
  "No video or frames are ever uploaded to a third-party server.",
  "Role-based access control (RBAC) for dashboard and API.",
  "Audit logs record every access and configuration change.",
  "Encryption at-rest and in-transit across all system components.",
];

export function Security({ level = 2 }: { level?: 1 | 2 }) {
  return (
    <section
      id="security"
      className={`px-6 py-16 md:py-24 ${level === 1 ? "" : "border-t"}`}
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeader
          level={level}
          eyebrow="SECURITY.audit()"
          title={"Data stays on-⁠prem."}
        />
        <SecurityFlow points={securityPoints} />
      </div>
    </section>
  );
}
