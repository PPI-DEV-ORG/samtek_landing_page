import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion({
  items,
  defaultOpen,
  className,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number;
  className?: string;
}) {
  return (
    <Accordion
      className={className}
      defaultValue={
        defaultOpen === undefined ? undefined : [`faq-${defaultOpen}`]
      }
    >
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`faq-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
