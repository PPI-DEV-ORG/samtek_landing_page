import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { moduleId, type Capability } from "@/content/capabilities";
import { CapabilityIcon } from "./capability-icon";

export function ModulePanel({ capability }: { capability: Capability }) {
  return (
    <Card className="self-center">
      <CardHeader>
        <CardTitle>MODULE {moduleId(capability)}</CardTitle>
        <CardAction>
          <Badge variant="secondary">READY</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative flex aspect-16/10 items-center justify-center bg-muted">
          <div className="flex size-28 animate-pulse items-center justify-center border-2 border-dashed border-primary bg-primary/10">
            <CapabilityIcon
              slug={capability.slug}
              className="size-12 text-primary"
            />
          </div>
        </div>
        <dl className="flex flex-col gap-1">
          {capability.outputs.slice(0, 4).map((field) => (
            <div key={field} className="flex justify-between gap-2">
              <dt className="text-muted-foreground">{field}</dt>
              <dd className="text-muted-foreground/60">· · ·</dd>
            </div>
          ))}
        </dl>
      </CardContent>
      <CardFooter className="justify-between text-muted-foreground">
        <span>EDGE-NODE-01 · ON-PREM</span>
        <span>{capability.outputs.length} DATA FIELDS</span>
      </CardFooter>
    </Card>
  );
}
