import React from "react";
import { steps } from "@/lib/homeContent";
import Reveal from "@/components/common/Reveal";

// Çalışma süreci — masaüstünde yatay adımlar, mobilde dikey zaman çizelgesi.
export default function HowItWorks() {
  return (
    <section className="bg-card">
      <div className="container-grid py-16 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Çalışma Sürecimiz</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Nasıl Çalışıyoruz?</h2>
          <p className="mt-4 text-muted-foreground">
            Talebin alınmasından uygulamanın tamamlanmasına kadar süreci planlı ve anlaşılır şekilde
            yürütüyoruz.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-8 lg:grid-cols-6 lg:gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="li" key={i} delay={i * 70}>
                <div className="flex gap-4 lg:flex-col lg:gap-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white lg:mb-4">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-accent">
                      Adım {i + 1}
                    </span>
                    <h3 className="mt-1 font-heading text-base font-bold">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}