"use client";
import * as React from "react";
import Link from "next/link";
import { SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  categories,
  capabilities,
  type CategoryId,
} from "@/content/capabilities";
import { CapabilityCard } from "./capability-card";

type Filter = "all" | CategoryId;

export function CapabilitiesBrowser() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const visible =
    filter === "all"
      ? capabilities
      : capabilities.filter((c) => c.category === filter);
  const category = categories.find((c) => c.id === filter);
  return (
    <div className="mt-10 flex flex-col gap-6">
      <div className="overflow-x-auto pb-1">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList>
            <TabsTrigger value="all" className="uppercase">
              All ({capabilities.length})
            </TabsTrigger>
            {categories.map((c) => (
              <TabsTrigger key={c.id} value={c.id} className="uppercase">
                {c.name} (
                {capabilities.filter((x) => x.category === c.id).length})
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <p className="min-h-5 text-sm text-muted-foreground">
        {category?.description ??
          "Every module runs independently on the same edge platform. Activate only what you need, per camera."}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((capability) => (
          <CapabilityCard key={capability.slug} capability={capability} />
        ))}
        {filter === "all" && (
          <Link
            href="/custom-models"
            className="group block h-full outline-none"
          >
            <Card className="h-full border-dashed transition-colors group-hover:border-primary group-focus-visible:border-primary">
              <CardHeader>
                <CardDescription>CUSTOM</CardDescription>
                <CardAction>
                  <SparklesIcon className="size-4 text-primary" />
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-2">
                <CardTitle>Something else? We train it.</CardTitle>
                <CardDescription>
                  Not in the list? We build and train a custom model for your
                  exact use case, and run it on the same on-premise platform.
                </CardDescription>
                <div className="mt-auto pt-2">
                  <Badge variant="secondary">CUSTOM AI</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}
