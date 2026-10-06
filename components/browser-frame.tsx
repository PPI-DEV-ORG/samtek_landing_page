import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LockIcon,
  RotateCwIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  url,
  tabs,
  className,
  children,
}: {
  url: string;
  tabs?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden border bg-card", className)}>
      <div className="flex items-end gap-4 bg-muted px-4 pt-2.5">
        <div aria-hidden className="flex gap-1.5 self-center pb-2">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-muted-foreground/50" />
          <span className="size-2.5 rounded-full bg-secondary/70" />
        </div>
        {tabs}
      </div>
      <div className="flex items-center gap-3 border-b bg-background px-4 py-2">
        <div
          aria-hidden
          className="hidden gap-2 text-muted-foreground sm:flex [&_svg]:size-4"
        >
          <ArrowLeftIcon />
          <ArrowRightIcon />
          <RotateCwIcon />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 border bg-card px-3 py-1 text-xs text-muted-foreground">
          <LockIcon aria-hidden className="size-3 shrink-0" />
          <span className="truncate">{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

export function BrowserTabList({
  className,
  ...props
}: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      className={cn("flex min-w-0 items-end gap-1", className)}
      {...props}
    />
  );
}

export function BrowserTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "flex min-w-0 items-center gap-2 px-4 py-2 text-xs whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 data-active:bg-background data-active:text-foreground [&_svg]:size-3.5 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}
