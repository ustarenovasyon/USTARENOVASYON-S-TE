import React from "react";
import { whyUs } from "@/lib/homeContent";
import Reveal from "@/components/common/Reveal";

// Neden Usta Renovasyon — 8 ikonlu kart.
export default function WhyUs() {
  return (
    <section className="bg-background">
      <div className="container-grid py-16 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Neden Biz?</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Neden Usta Renovasyon?</h2>
          <p className="mt-4 text-muted-foreground">
            Her projede ihtiyaçları doğru anlamaya, uygun uygulamayı belirlemeye ve işi temiz şekilde
            tamamlamaya önem veriyoruz.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((f, i) => (
            <Reveal key={f.title} delay={i * 60} className="h-full">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-heading text-base font-bold">{f.title}</h3>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}