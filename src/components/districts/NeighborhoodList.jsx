import React, { useMemo, useState } from "react";
import { Search, ChevronDown, MessageCircle, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { getWhatsAppLink, getPhoneLink } from "@/lib/siteConfig";
import { normalize } from "@/lib/districtsData";
import { buildNeighborhoodContent, shortNeighborhood } from "@/lib/neighborhoodSeo";
import Reveal from "@/components/common/Reveal";

// İlçe mahalle listesi — arama + ilk N / tümünü göster.
// Her mahalle için zenginleştirilmiş SEO içeriği akordeon olarak render edilir.
// Boş liste gizlenir; bulunamayan aramada iletişim yönlendirmesi gösterilir.
export default function NeighborhoodList({ districtName, neighborhoods = [], whatsappMsg }) {
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [openNb, setOpenNb] = useState(null);

  // Mahalle içeriklerini üret (ilçe adı + indeks bazlı varyasyon)
  const enriched = useMemo(() => {
    if (!neighborhoods.length) return [];
    return neighborhoods.map((n, i) => ({
      name: n,
      short: shortNeighborhood(n),
      content: buildNeighborhoodContent(districtName, n, i),
    }));
  }, [districtName, neighborhoods]);

  const filtered = useMemo(() => {
    if (!q.trim()) return enriched;
    const s = normalize(q);
    return enriched.filter((nb) => normalize(nb.name).includes(s));
  }, [q, enriched]);

  // Açık olan mahalle aramadan çıktıysa kapat
  React.useEffect(() => {
    if (openNb && !filtered.some((nb) => nb.name === openNb)) {
      setOpenNb(null);
    }
  }, [filtered, openNb]);

  const INITIAL_SHOW = 6;
  const show = expanded ? filtered : filtered.slice(0, INITIAL_SHOW);
  const hasMore = filtered.length > INITIAL_SHOW;

  if (!neighborhoods.length) return null;

  return (
    <div>
      {/* Arama */}
      <div className="flex max-w-md items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <label htmlFor="nb-search" className="sr-only">{districtName} mahalle ara</label>
        <input
          id="nb-search"
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Mahalle ara…" className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Mahalle içerik akordeonu */}
      <div className="mt-4 space-y-3">
        {show.map((nb, i) => {
          const isOpen = openNb === nb.name;
          const c = nb.content;
          return (
            <Reveal key={nb.name} delay={Math.min(i * 30, 240)}>
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpenNb(isOpen ? null : nb.name)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left transition-colors hover:bg-muted/40"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" />
                    {nb.short} Mahallesi
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="space-y-4 border-t border-border px-4 py-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.intro}</p>

                    <div>
                      <h3 className="heading-display text-base text-foreground">{c.serviceSection.h2}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.serviceSection.p}</p>
                    </div>

                    <div>
                      <h3 className="heading-display text-base text-foreground">{nb.short} Boya Badana Fiyatları</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.pricing}</p>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">{c.contact}</p>

                    {/* SSS */}
                    {c.faqs.length > 0 && (
                      <div className="space-y-2.5">
                        {c.faqs.map((f, fi) => (
                          <details key={fi} className="group rounded-lg border border-border bg-background px-3 py-2.5">
                            <summary className="cursor-pointer list-none text-sm font-medium text-foreground marker:hidden">
                              <span className="flex items-start justify-between gap-2">
                                <span>{f.q}</span>
                                <ChevronDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                              </span>
                            </summary>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                          </details>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={getWhatsAppLink(whatsappMsg || `Merhaba Özal Usta. ${districtName} ${nb.short} Mahallesi'nde boya/tadilat işi hakkında bilgi almak istiyorum.`)}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-accent !px-4 !py-2 text-xs"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                      <a href={getPhoneLink()} className="btn-outline !px-4 !py-2 text-xs">
                        <Phone className="h-3.5 w-3.5" /> Ara
                      </a>
                      <Link to="/ucretsiz-kesif" className="btn-secondary !px-4 !py-2 text-xs">Keşif Talep Et</Link>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {q.trim() && filtered.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          Mahalleniz listede görünmüyorsa hizmet uygunluğunu Özal Usta'ya sorabilirsiniz.
          {" "}
          <a href={getWhatsAppLink(whatsappMsg || `Merhaba Özal Usta. ${districtName} bölgesinde hizmet uygunluğu hakkında bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
            Bölgeyi Sor
          </a>
        </p>
      )}

      {hasMore && !q.trim() && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
        >
          {expanded ? "Daha Az Göster" : `Tüm Mahalleleri Göster (${neighborhoods.length})`}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}