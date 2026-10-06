import { PackageIcon } from "lucide-react";
import { DownloadButton } from "@/components/download/download-button";
import { CopyButton } from "@/components/download/copy-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { components, installer } from "@/content/download";

const meta = [
  { label: "Version", value: installer.version },
  { label: "Platform", value: installer.platform },
  { label: "Size", value: installer.size },
  { label: "License", value: "Trial on request" },
];

export function DownloadPanel() {
  return (
    <Card className="self-center">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PackageIcon className="size-5 text-primary" />
          {installer.name}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">3-IN-1</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ul className="flex flex-col gap-3">
          {components.map((c) => (
            <li key={c.title} className="flex items-start gap-3 border p-3">
              <c.icon className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="flex flex-col gap-1">
                <span className="font-bold">{c.title}</span>
                <span className="text-muted-foreground">{c.text}</span>
              </div>
            </li>
          ))}
        </ul>
        <dl className="flex flex-col gap-2">
          {meta.map((m) => (
            <div key={m.label} className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{m.label}</dt>
              <dd
                className={
                  m.value ? "text-right" : "text-right text-muted-foreground"
                }
              >
                {m.value ?? "TBD"}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">SHA-256</span>
          {installer.sha256 ? (
            <div className="flex items-start justify-between gap-3">
              <code className="min-w-0 text-xs break-all">
                {installer.sha256}
              </code>
              <CopyButton value={installer.sha256} label="Copy SHA-256" />
            </div>
          ) : (
            <span className="text-muted-foreground">TBD</span>
          )}
        </div>
        <DownloadButton />
      </CardContent>
    </Card>
  );
}
