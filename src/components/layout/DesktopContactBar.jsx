import React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import {
  getPhoneLink,
  getWhatsAppLink,
  getEmailLink,
  hasEmail,
  siteConfig,
} from "@/lib/siteConfig";
import { uiSettings } from "@/lib/uiSettings";
import { trackCta } from "@/lib/ctaTracking";
import { useDynamicWhatsApp } from "@/hooks/useDynamicWhatsApp";

// Masaüstü yüzen iletişim çubuğu — ekran altında ortalanmış hap.
export default function DesktopContactBar() {
  const message = useDynamicWhatsApp();
  if (!uiSettings.desktopContactBar) return null;
  const showEmail = uiSettings.emailButton && hasEmail();

  return (
    <div className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 md:flex">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-primary/95 px-2 py-1.5 shadow-xl backdrop-blur">
        <a
          href={getPhoneLink()}
          data-cta="desktop-call"
          onClick={() => trackCta("desktop-call")}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          aria-label={`Hemen Ara: ${siteConfig.phone.display}`}
        >
          <Phone className="h-4 w-4 text-accent" />
          {siteConfig.phone.display}
        </a>

        {showEmail && (
          <a
            href={getEmailLink()}
            data-cta="desktop-email"
            onClick={() => trackCta("desktop-email")}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            aria-label="E-posta gönder"
          >
            <Mail className="h-4 w-4 text-accent" />
            {uiSettings.emailLabel}
          </a>
        )}

        <a
          href={getWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="desktop-whatsapp"
          onClick={() => trackCta("desktop-whatsapp")}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          aria-label="WhatsApp ile yaz"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" />
          {uiSettings.whatsappLabel}
        </a>
      </div>
    </div>
  );
}