import React from "react";
import Reveal from "@/components/common/Reveal";

// Nasıl Çalışıyoruz — masaüstünde yatay, mobilde dikey zaman çizelgesi.
export default function ProcessSteps({ steps }) {
  return (
    <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal as="li" key={i} delay={i * 60}>
          <div className="flex h-full gap-4 rounded-xl border border-border bg-card p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h3 className="font-heading text-base font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}