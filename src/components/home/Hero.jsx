import React from "react";
import { MapPin, MessageCircle, Phone, ClipboardCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import { getPhoneLink, getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import { heroContent } from "@/lib/homeContent";

const HERO_IMG =
  "/assets/hero-renovation.svg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="container-grid relative py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="reveal">
          <span className="section-eyebrow text-accent">
            <MapPin className="h-4 w-4" /> {heroContent.areaNote}
          </span>
          <h1 className="heading-display mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            {heroContent.h1Lead}{" "}
            <span className="text-accent">{heroContent.h1Highlight}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {heroContent.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="hero-whatsapp"
              onClick={() => trackCta("hero-whatsapp")}
              className="btn-accent w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp'tan Teklif Al
            </a>
            <a
              href={getPhoneLink()}
              data-cta="hero-call"
              onClick={() => trackCta("hero-call")}
              className="btn-outline w-full border-white/20 text-white hover:border-accent hover:text-accent sm:w-auto"
            >
              <Phone className="h-4 w-4" /> Hemen Ara
            </a>
            <a
              href="#teklif-al"
              data-cta="hero-quote"
              onClick={() => trackCta("hero-quote")}
              className="btn-secondary w-full border-white/30 text-white hover:bg-white hover:text-primary sm:w-auto"
            >
              <ClipboardCheck className="h-4 w-4" /> Ücretsiz Keşif
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
            {heroContent.trustTags.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal relative">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src={HERO_IMG}
              alt="İzmir'de yenilenmiş ferah ve modern daire iç mekan"
              className="aspect-[4/3] w-full"
              fittingType="fill"
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}