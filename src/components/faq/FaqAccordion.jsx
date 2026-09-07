import React from "react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";

// Merkezi SSS akordeonu — radix tabanlı, klavye erişilebilir.
// items: [{ q, a }]
export default function FaqAccordion({ items = [], allowMultiple = false }) {
  if (!items.length) return null;
  return (
    <Accordion type={allowMultiple ? "multiple" : "single"} collapsible className="space-y-3">
      {items.map((f, i) => (
        <AccordionItem key={i} value={`q-${i}`} className="rounded-xl border border-border bg-card px-5">
          <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}