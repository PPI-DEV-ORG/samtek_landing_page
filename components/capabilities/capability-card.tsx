import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  categoryById,
  moduleId,
  type Capability,
} from "@/content/capabilities";
import { CapabilityIcon } from "./capability-icon";

export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <Link
      href={`/capabilities/${capability.slug}`}
      className="group block h-full outline-none"
    >
      <Card className="h-full transition-colors group-hover:border-primary group-focus-visible:border-primary">
        <CardHeader>
          <CardDescription>{moduleId(capability)}</CardDescription>
          <CardAction>
            <CapabilityIcon
              slug={capability.slug}
              className="size-4 text-primary"
            />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-2">
          <CardTitle>{capability.name}</CardTitle>
          <CardDescription>{capability.oneLiner}</CardDescription>
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="uppercase">
              {categoryById(capability.category).name}
            </Badge>
            {capability.tier === "featured" && <Badge>FEATURED</Badge>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
