import Image from "next/image";
import { cn } from "@/lib/utils";

export function SamtekLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-2 font-extrabold", className)}
    >
      <Image
        src="/brand/samtek.png"
        alt=""
        width={627}
        height={658}
        className="h-[1.6em] w-auto"
      />
      SAMTEK
    </span>
  );
}
