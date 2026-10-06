import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { CompareFlow } from "@/components/sections/compare-flow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comparisonRows = [
  {
    aspect: "Detection latency",
    onprem: "Real-time (edge)",
    cloud: "Depends on internet connection",
  },
  {
    aspect: "Data location",
    onprem: "Stays on local network",
    cloud: "Stored on third-party servers",
  },
  {
    aspect: "Internet dependency",
    onprem: "Not required",
    cloud: "Required, continuously",
  },
  {
    aspect: "Recurring cost",
    onprem: "No cloud/bandwidth fees",
    cloud: "Monthly storage & bandwidth fees",
  },
  {
    aspect: "Data compliance",
    onprem: "Data residency maintained",
    cloud: "Depends on provider server location",
  },
  {
    aspect: "Bandwidth needs",
    onprem: "Minimal, metadata/alerts only",
    cloud: "High, continuous video upload",
  },
];

export function Compare() {
  return (
    <section id="compare" className="border-t bg-card/50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="ARCHITECTURE.compare()"
          title="Edge, not cloud."
        />
        <CompareFlow />
        <Card className="mt-4">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">
                    ASPECT
                  </TableHead>
                  <TableHead className="text-primary">
                    SAMTEK (ON-PREM)
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    TYPICAL CLOUD VMS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow key={row.aspect}>
                    <TableCell>{row.aspect}</TableCell>
                    <TableCell className="text-secondary">
                      {row.onprem}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.cloud}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
