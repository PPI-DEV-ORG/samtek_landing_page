import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "cn";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex w-full flex-col gap-0.5 border border-border bg-border",
        className,
      )}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "relative bg-card before:absolute before:top-0 before:left-0 before:z-10 before:size-2 before:border-t-2 before:border-l-2 before:border-primary after:absolute after:bottom-0 after:right-0 after:z-10 after:size-2 after:border-r-2 after:border-b-2 after:border-primary",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-4 rounded-none border border-transparent px-4 py-4 text-left text-sm font-bold transition-all outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span className="text-balance">{children}</span>
        <span
          data-slot="accordion-trigger-icon"
          aria-hidden="true"
          className="shrink-0 font-mono text-primary group-aria-expanded/accordion-trigger:hidden"
        >
          [+]
        </span>
        <span
          data-slot="accordion-trigger-icon"
          aria-hidden="true"
          className="hidden shrink-0 font-mono text-primary group-aria-expanded/accordion-trigger:inline"
        >
          [-]
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) px-4 pt-0 pb-4 leading-relaxed text-muted-foreground data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
