import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";

// Hizmetler ana sayfası kategori kartı — kategori sayfasına yönlendirir.
export default function ServiceCategoryCard({ category }) {
  const Icon = category.icon;
  const msg = `Merhaba Özal Usta. Usta Renovasyon web sitenizdeki ${category.title} hakkında bilgi ve fiyat teklifi almak istiyorum.`;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-black/[0.06]">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-accent/10 group-hover:text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">{category.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.blurb}</p>
      <div className="mt-4 text-xs font-medium text-muted-foreground">{category.subServices.length} hizmet</div>
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-border pt-4">
        <Link to={`/hizmetler/${category.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
          Hizmetleri İncele <ArrowUpRight className="h-4 w-4" />
        </Link>
        <a
          href={getWhatsAppLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="service-cat-whatsapp"
          onClick={() => trackCta("service-cat-whatsapp", { category: category.slug })}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-primary"
        >
          <MessageCircle className="h-4 w-4" /> Teklif Al
        </a>
      </div>
    </article>
  );
}