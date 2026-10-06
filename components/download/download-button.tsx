import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { installer } from "@/content/download";

export function DownloadButton({ className }: { className?: string }) {
  return (
    <Button
      size="lg"
      className={className}
      nativeButton={false}
      render={<a href={installer.href} />}
    >
      <DownloadIcon data-icon="inline-start" />
      DOWNLOAD_INSTALLER
      {installer.size && ` (${installer.size})`}
    </Button>
  );
}
