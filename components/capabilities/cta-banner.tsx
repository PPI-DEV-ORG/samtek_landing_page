import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Topic } from "@/lib/lead-options";
import { contactHref } from "@/lib/links";

export function CtaBanner({
  title,
  text,
  capability,
  sector,
  topic = "quote",
}: {
  title: string;
  text: string;
  capability?: string;
  sector?: string;
  topic?: Topic;
}) {
  return (
    <section className="border-t px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-6 py-4">
            <div className="flex max-w-xl flex-col gap-2">
              <h2 className="text-2xl font-extrabold md:text-3xl">{title}</h2>
              <p className="text-muted-foreground">{text}</p>
            </div>
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link href={contactHref({ topic, capability, sector })} />
              }
            >
              REQUEST_DEMO_OR_QUOTE
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
