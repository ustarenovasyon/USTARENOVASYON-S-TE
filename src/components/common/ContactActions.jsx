import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig, getPhoneLink, getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";

// Birincil arama butonu — merkezi numarayı kullanır, tıklamayı takip eder.
export function CallButton({ label = "Hemen Ara", className = "btn-accent", ctaId = "call" }) {
  return (
    <a
      href={getPhoneLink()}
      className={className}
      data-cta={ctaId}
      aria-label={`Telefonla ara: ${siteConfig.phone.display}`}
      onClick={() => trackCta(ctaId)}
    >
      <Phone className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}

// WhatsApp butonu — opsiyonel dinamik mesaj destekler, tıklamayı takip eder.
export function WhatsAppButton({
  label = "WhatsApp ile Yaz",
  className = "btn-outline",
  message,
  ctaId = "whatsapp",
}) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-cta={ctaId}
      aria-label="WhatsApp üzerinden mesaj gönder"
      onClick={() => trackCta(ctaId)}
    >
      <MessageCircle className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}