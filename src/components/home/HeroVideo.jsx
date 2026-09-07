import React from "react";
import { Image } from "@/components/ui/image";

const POSTER = "/assets/hero-renovation.svg";

// GitHub Pages sürümü: harici video servisine bağımlılık olmadan aynı 16:9 alanı korur.
export default function HeroVideo() {
  return (
    <section aria-hidden="true" className="relative w-full bg-primary">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
        <Image src={POSTER} alt="" className="absolute inset-0 h-full w-full" fittingType="fill" loading="eager" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background/40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
