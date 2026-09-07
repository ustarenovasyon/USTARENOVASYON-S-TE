import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig, getPhoneLink, getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import Reveal from "@/components/common/Reveal";

// Footer öncesi son iletişim çağrısı.
export default function FinalCta() {
  return (
    <section className="bg-accent text-primary">
      <div className="container-grid flex flex-col items-center gap-6 py-16 text-center lg:py-20">
        <Reveal>
          <h2 className="heading-display max-w-2xl text-3xl sm:text-4xl">
            Tadilat, Boya veya İzolasyon İhtiyacınız mı Var?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary/80">
            Yapılacak iş hakkında bilgi almak için Özal Usta ile doğrudan iletişime geçin.
          </p>
        </Reveal>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={getPhoneLink()}
            data-cta="final-call"
            onClick={() => trackCta("final-call")}
            className="btn-navy"
          >
            <Phone className="h-4 w-4" /> {siteConfig.phone.display}'i Ara
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="final-whatsapp"
            onClick={() => trackCta("final-whatsapp")}
            className="btn-navy"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz
          </a>
          <a
            href="#teklif-al"
            data-cta="final-quote"
            onClick={() => trackCta("final-quote")}
            className="btn-navy"
          >
            Ücretsiz Keşif Talep Et
          </a>
        </div>
      </div>
    </section>
  );
}