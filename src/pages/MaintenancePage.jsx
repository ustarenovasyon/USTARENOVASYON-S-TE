import React from "react";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { siteConfig, getPhoneLink, getEmailLink, getWhatsAppLink } from "@/lib/siteConfig";

// Bakım sayfası — ziyaretçiye profesyonel, sade. İletişim butonlarıyla.
export default function MaintenancePage({ message }) {
  const wa = getWhatsAppLink("Merhaba Özal Usta, web sitesinden ulaşıyorum. Hizmet hakkında bilgi almak istiyorum.");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary px-4 text-center text-white">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
          <MessageCircle className="h-8 w-8 text-accent" />
        </div>
        <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Web Sitemiz Kısa Süreli Bakımdadır</h1>
        <p className="mt-3 text-sm text-white/70">{message || "Usta Renovasyon web sitesi teknik iyileştirme nedeniyle kısa süreli olarak kullanılamıyor. Bu sırada Özal Usta'ya telefon veya WhatsApp üzerinden ulaşabilirsiniz."}</p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <a href={getPhoneLink()} className="btn-accent justify-center"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-secondary justify-center"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz</a>
        </div>
        {siteConfig.email && (
          <a href={getEmailLink()} className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-accent"><Mail className="h-4 w-4" /> {siteConfig.email}</a>
        )}
        <p className="mt-8 text-xs text-white/40">Kısa süre sonra tekrar deneyin. Teşekkürler.</p>
      </div>
    </div>
  );
}