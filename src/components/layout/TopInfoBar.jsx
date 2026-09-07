import React from "react";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { siteConfig, getPhoneLink, getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";

// Masaüstü üst bilgi şeridi — Header'ın üzerinde, mobilde gizli.
export default function TopInfoBar() {
  return (
    <div className="hidden border-b border-white/10 bg-primary/90 text-white md:block">
      <div className="container-grid flex h-9 items-center justify-between text-xs">
        <span className="text-white/70">Bornova'dan İzmir Geneline Profesyonel Tadilat Hizmeti</span>
        <div className="flex items-center gap-4">
          <a
            href={getPhoneLink()}
            data-cta="topbar-phone"
            onClick={() => trackCta("topbar-phone")}
            className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-accent"
          >
            <Phone className="h-3.5 w-3.5" /> {siteConfig.phone.display}
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="topbar-whatsapp"
            onClick={() => trackCta("topbar-whatsapp")}
            className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-accent"
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
          </a>
          <span className="flex items-center gap-1.5 text-white/60">
            <MapPin className="h-3.5 w-3.5" /> İzmir Geneli
          </span>
          <a href="#teklif-al" className="font-semibold text-accent">Ücretsiz Keşif</a>
        </div>
      </div>
    </div>
  );
}