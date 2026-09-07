import React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { uiSettings } from "@/lib/uiSettings";
import { trackCta } from "@/lib/ctaTracking";
import { useDynamicWhatsApp } from "@/hooks/useDynamicWhatsApp";

// Sağ alt köşede yuvarlak WhatsApp destek butonu — dinamik mesajlı.
export default function WhatsAppFloat() {
  const message = useDynamicWhatsApp();
  if (!uiSettings.whatsappFloatButton) return null;

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp-float"
      onClick={() => trackCta("whatsapp-float")}
      aria-label="WhatsApp'tan Özal Usta'ya Yaz"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95 md:bottom-6"
      style={{ animation: "float-in 0.5s ease-out both" }}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}