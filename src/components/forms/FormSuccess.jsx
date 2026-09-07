import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, Phone, Home as HomeIcon, ArrowUpRight } from "lucide-react";
import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/siteConfig";

// WhatsApp yönlendirme ekranı — GitHub-only sitede form verisi sunucuda tutulmaz.
export default function FormSuccess({ request }) {
  const waMsg = `Merhaba Özal Usta. Usta Renovasyon web sitesindeki formu doldurdum${request.request_number ? ` (referans: ${request.request_number})` : ""}. Talebim hakkında WhatsApp üzerinden iletişim kurmak istiyorum.`;

  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex";
    document.head.appendChild(m);
    return () => m.remove();
  }, []);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
      <h2 className="heading-display mt-4 text-2xl">WhatsApp Mesajınız Hazırlandı</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Bu site form bilgilerinizi bir sunucuya kaydetmez. Açılan WhatsApp ekranındaki hazır mesajı gönderdiğinizde talebiniz doğrudan Özal Usta’ya ulaşır.
      </p>

      <div className="mt-5 grid gap-2 rounded-xl border border-border bg-card p-4 text-left text-sm sm:grid-cols-2">
        {request.request_number && <div><span className="text-muted-foreground">Referans:</span> <strong>{request.request_number}</strong></div>}
        {request.service && <div><span className="text-muted-foreground">Hizmet:</span> {request.service}</div>}
        {request.district && <div><span className="text-muted-foreground">İlçe:</span> {request.district}</div>}
        {request.contact_method && <div><span className="text-muted-foreground">İletişim:</span> {request.contact_method}</div>}
        <div><span className="text-muted-foreground">Tarih:</span> {new Date().toLocaleDateString("tr-TR")}</div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a href={getWhatsAppLink(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'ta Mesajı Gönder</a>
        <a href={getPhoneLink()} className="btn-outline"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
        <Link to="/" className="btn-secondary"><HomeIcon className="h-4 w-4" /> Ana Sayfa</Link>
        <Link to="/hizmetler" className="btn-link">Hizmetleri İncele <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}