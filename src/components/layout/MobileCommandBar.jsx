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

// Mobil sabit alt iletişim çubuğu — Ara (sol), E-Posta (orta), WhatsApp (sağ).
// E-posta adresi yokken orta buton otomatik gizlenir.
export default function MobileCommandBar() {
  const message = useDynamicWhatsApp();
  if (!uiSettings.mobileCommandBar) return null;
  const showEmail = uiSettings.emailButton && hasEmail();
  const cols = showEmail ? "grid-cols-3" : "grid-cols-2";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 grid ${cols} border-t border-white/10 bg-primary/95 backdrop-blur md:hidden`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={getPhoneLink()}
        data-cta="mobile-call"
        onClick={() => trackCta("mobile-call")}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-white active:bg-white/5"
        aria-label={`Hemen Ara: ${siteConfig.phone.display}`}
      >
        <Phone className="h-5 w-5 text-accent" />
        <span className="text-xs font-semibold">{uiSettings.phoneLabel}</span>
      </a>

      {showEmail && (
        <a
          href={getEmailLink()}
          data-cta="mobile-email"
          onClick={() => trackCta("mobile-email")}
          className="flex flex-col items-center justify-center gap-1 border-x border-white/10 py-2.5 text-white active:bg-white/5"
          aria-label="E-posta gönder"
        >
          <Mail className="h-5 w-5 text-accent" />
          <span className="text-xs font-semibold">{uiSettings.emailLabel}</span>
        </a>
      )}

      <a
        href={getWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="mobile-whatsapp"
        onClick={() => trackCta("mobile-whatsapp")}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-white active:bg-white/5"
        aria-label="WhatsApp ile yaz"
      >
        <MessageCircle className="h-5 w-5 text-[#25D366]" />
        <span className="text-xs font-semibold">{uiSettings.whatsappLabel}</span>
      </a>
    </div>
  );
}