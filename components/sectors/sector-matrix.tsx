import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  capabilities,
  moduleId,
  type SectorSlug,
} from "@/content/capabilities";

const columns: { slug: SectorSlug; label: string }[] = [
  { slug: "retail", label: "RETAIL" },
  { slug: "manufacturing", label: "MANUFACTURING" },
  { slug: "banking", label: "BANKING" },
  { slug: "government-smart-city", label: "GOV & CITY" },
];

export function SectorMatrix() {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">MODULE</TableHead>
                {columns.map((c) => (
                  <TableHead
                    key={c.slug}
                    className="text-center text-muted-foreground"
                  >
                    {c.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {capabilities.map((cap) => (
                <TableRow key={cap.slug}>
                  <TableCell>
                    <Link
                      href={`/capabilities/${cap.slug}`}
                      className="hover:text-primary"
                    >
                      <span className="text-muted-foreground">
                        {moduleId(cap)}
                      </span>{" "}
                      {cap.name}
                    </Link>
                  </TableCell>
                  {columns.map((c) => {
                    const level = cap.sectors.find(
                      (s) => s.slug === c.slug,
                    )?.level;
                    return (
                      <TableCell key={c.slug} className="text-center">
                        {level === "primary" && (
                          <span
                            className="text-primary"
                            aria-label="Core module"
                          >
                            ●
                          </span>
                        )}
                        {level === "relevant" && (
                          <span
                            className="text-muted-foreground"
                            aria-label="Also relevant"
                          >
                            ○
                          </span>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="text-muted-foreground">
        <span className="text-primary">●</span> core module for the sector ·{" "}
        <span>○</span> also relevant
      </p>
    </div>
  );
}
