import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getCategoryMeta } from "@/lib/servicesData";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";

// Hizmet kategorisi kartı — dinamik WhatsApp teklif mesajı ve takip ile.
export default function ServiceCard({ categoryKey, services = [] }) {
  const meta = getCategoryMeta(categoryKey);
  if (!meta) return null;
  const Icon = meta.icon;
  const message = `Merhaba Özal Usta. Usta Renovasyon web sitenizdeki ${meta.title} hizmeti hakkında bilgi ve fiyat teklifi almak istiyorum.`;

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-black/[0.06]">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-accent/10 group-hover:text-accent">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
        {meta.short}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{meta.blurb}</p>

      {services.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
          {services.slice(0, 5).map((s) => (
            <li key={s.id || s.slug} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-border pt-4">
        <Link
          to={`/hizmetler/${meta.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-accent"
        >
          Detaylar <ArrowUpRight className="h-4 w-4" />
        </Link>
        <a
          href={getWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="service-card-quote"
          onClick={() => trackCta("service-card-quote", { category: categoryKey })}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-primary"
        >
          <MessageCircle className="h-4 w-4" /> Teklif Al
        </a>
      </div>
    </article>
  );
}