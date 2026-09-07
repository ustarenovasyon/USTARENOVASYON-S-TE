import React from "react";
import { Link } from "react-router-dom";
import { MapPin, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { SERVICE_STATUS_SHORT } from "@/lib/districtsData";

const statusColor = {
  featured: "bg-accent/15 text-accent",
  active: "bg-green-500/10 text-green-700",
  on_request: "bg-muted text-muted-foreground",
  inactive: "bg-muted text-muted-foreground/60",
};

// İlçe kartı — yalnızca yayınlanmış sayfası olan ilçeler "İlçeyi İncele" verir.
// Yayında değilse hiçbir "hazırlanıyor" ifadesi gösterilmez; yalnızca "Bölgeyi Sor".
export default function DistrictCard({ district, whatsappMsg, projectCount }) {
  const published = district.page_status === "published";
  const status = district.service_status || "on_request";
  const inactive = status === "inactive";
  const msg = whatsappMsg || district.whatsapp_message ||
    `Merhaba Özal Usta. ${district.name} bölgesinde yapılacak bir iş için bilgi almak istiyorum.`;
  const neighborhoodCount = (district.neighborhoods || []).length;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40">
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 font-heading text-lg font-bold">
          <MapPin className="h-4 w-4 text-accent" /> {district.name}
        </h3>
        <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${statusColor[status] || statusColor.on_request}`}>
          {SERVICE_STATUS_SHORT[status] || "Talebe Göre"}
        </span>
      </div>

      {district.short_description && (
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{district.short_description}</p>
      )}

      {/* Mahalle ve proje sayısı */}
      {(neighborhoodCount > 0 || projectCount > 0) && (
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {neighborhoodCount > 0 && (
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {neighborhoodCount} mahalle</span>
          )}
          {projectCount > 0 && (
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-accent" /> {projectCount} proje</span>
          )}
        </div>
      )}

      {inactive && (
        <p className="mt-3 text-xs text-muted-foreground">
          Bu bölge için hizmet durumu şu anda yeniden değerlendirilmektedir.
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link to={`/hizmet-bolgeleri/${district.slug}`} className="btn-outline">
          İlçeyi İncele <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> Bölgeyi Sor
        </a>
      </div>
    </div>
  );
}