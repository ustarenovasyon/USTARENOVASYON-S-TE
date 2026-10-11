import React from "react";
import { Image } from "@/components/ui/image";

const HERO_STILL = "/assets/hero-workmanship-blue-1672.webp";
const HERO_SRC_SET = [640, 960, 1280, 1672]
  .map((width) => `/assets/hero-workmanship-blue-${width}.webp ${width}w`)
  .join(", ");

// Kullanıcı isteği: hareketli video yok; yüksek çözünürlüklü sabit ana görsel kullanılır.
export default function HeroVideo() {
  return (
    <section className="w-full bg-secondary" aria-label="Usta Renovasyon ana görseli">
      <div className="mx-auto w-full overflow-hidden bg-secondary">
        <Image
          src={HERO_STILL}
          srcSet={HERO_SRC_SET}
          sizes="100vw"
          width={1672}
          height={941}
          alt="Usta Renovasyon iç ve dış cephe uygulamalarında çalışan ekip"
          className="aspect-video w-full"
          fittingType="fit"
          loading="eager"
          fetchPriority="high"
          onError={(event) => event.currentTarget.removeAttribute("srcset")}
        />
      </div>
    </section>
  );
}
