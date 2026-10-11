import React from "react";
import { Image } from "@/components/ui/image";

const HERO_STILL = "/assets/hero-main.png";

// Kullanıcı isteği: hareketli video yok; yüksek çözünürlüklü sabit ana görsel kullanılır.
export default function HeroVideo() {
  return (
    <section className="w-full bg-secondary" aria-label="Usta Renovasyon ana görseli">
      <div className="mx-auto w-full overflow-hidden bg-secondary">
        <Image
          src={HERO_STILL}
          alt="Usta Renovasyon iç ve dış cephe uygulamalarında çalışan ekip"
          className="aspect-video w-full"
          fittingType="fit"
          loading="eager"
        />
      </div>
    </section>
  );
}
