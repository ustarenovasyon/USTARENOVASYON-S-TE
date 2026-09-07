import React from "react";
import { advantages } from "@/lib/homeContent";
import Reveal from "@/components/common/Reveal";

// Hızlı güven ve avantajlar alanı — Hero'nun hemen altı.
export default function TrustBadges() {
  return (
    <section className="border-b border-border bg-card">
      <div className="container-grid py-16 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Neden Güvenilir</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
            Tadilat İşlerinizde Güvenilir Çözüm
          </h2>
          <p className="mt-4 text-muted-foreground">
            Yapılacak işi yerinde değerlendiriyor, ihtiyaca uygun uygulama ve malzeme seçenekleri
            hakkında müşterilerimizi bilgilendiriyoruz.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 60} className="h-full">
              <div className="rounded-lg border border-border bg-background p-4">
                <h3 className="font-heading text-base font-bold">{a.title}</h3>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}