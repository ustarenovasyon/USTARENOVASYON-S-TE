import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Phone, MessageCircle, ChevronRight, ChevronDown, Building2, Tag } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import {
  SERVICE_STATUS_LABELS,
  districtBySlug,
} from "@/lib/districtsData";
import { getDistrictContent, inDistrict, inDistrictKi } from "@/lib/districtContent";
import { buildAllNeighborhoods } from "@/lib/neighborhoodSeo";
import Breadcrumb from "@/components/common/Breadcrumb";
import DistrictCard from "@/components/districts/DistrictCard";
import NeighborhoodList from "@/components/districts/NeighborhoodList";
import PageToc from "@/components/services/PageToc";
import FaqAccordion from "@/components/faq/FaqAccordion";
import ServiceQuoteForm from "@/components/services/ServiceQuoteForm";
import Reveal from "@/components/common/Reveal";

// İlçe detay sayfası — yalnızca yayınlanmış ilçeler. Tek H1, Schema, dinamik WhatsApp.
// Bulunamayan ilçe için "hazırlanıyor" yerine doğru bilgilendirme + iletişim.
export default function DistrictDetail() {
  const { slug } = useParams();
  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [onReqServices, setOnReqServices] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [showAllServices, setShowAllServices] = useState(false);

  useEffect(() => {
    let a = true;
    let scriptEl = null;
    setLoading(true);
    setArea(null);
    siteStore.entities.ServiceArea.filter({ slug }, undefined, 1)
      .then(async (items) => {
        if (!a) return;
        const d = items[0] || null;
        setArea(d);
        if (!d || d.page_status !== "published") return;
        const content = getDistrictContent(slug, d);
        document.title = content.seo_title;
        const m = document.querySelector('meta[name="description"]');
        if (m && content.meta_description) m.setAttribute("content", content.meta_description);
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute("href", window.location.href.split("?")[0]);

        // Bütün aktif hizmetler — ilçe farketmeksizin tüm yayında olan hizmetler gösterilir.
        // Öne çıkanlar önce, geri kalanlar sonra. Mahalle bazlı hizmet kısıtlaması yoktur.
        try {
          const all = await siteStore.entities.Service.filter({ status: "published" }, "order", 200);
          if (!a) return;
          const fav = (d.featured_services || content.featured_services) || [];
          const favSet = new Set(fav);
          const featured = all.filter((s) => favSet.has(s.slug));
          const rest = all.filter((s) => !favSet.has(s.slug));
          setServices([...featured, ...rest]);
          setOnReqServices([]);
        } catch {}

        // Yakın ilçeler
        const nearbySlugs = d.nearby && d.nearby.length ? d.nearby : (districtBySlug(slug)?.nearby || []);
        if (nearbySlugs.length) {
          try {
            const nb = await siteStore.entities.ServiceArea.filter({}, "order", 100);
            if (a) setNearby(nb.filter((x) => nearbySlugs.includes(x.slug) && x.page_status === "published"));
          } catch {}
        }

        // Schema — WebPage + Breadcrumb + FAQ (LocalBusiness değil — tek işletme)
        const ldPage = {
          "@context": "https://schema.org", "@type": "WebPage",
          name: content.seo_title, description: content.meta_description, url: window.location.href.split("?")[0],
          about: { "@type": "Service", provider: { "@type": "LocalBusiness", name: "Usta Renovasyon", telephone: "+905360358898", areaServed: "İzmir" }, areaServed: d.name },
        };
        const ldBc = {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: window.location.origin + "/" },
            { "@type": "ListItem", position: 2, name: "Hizmet Bölgeleri", item: window.location.origin + "/hizmet-bolgeleri" },
            { "@type": "ListItem", position: 3, name: d.name, item: window.location.href.split("?")[0] },
          ],
        };
        // Mahalle bazlı SSS schema'sı — zenginleştirilmiş mahalle içeriğindeki
        // soruları Google rich snippet olarak işaretler. Tüm mahalleler için.
        const nbList = d.neighborhoods && d.neighborhoods.length ? d.neighborhoods : (districtBySlug(slug)?.neighborhoods || []);
        const nbContents = buildAllNeighborhoods(d.name, nbList);
        // İlçe SSS + mahalle SSS'lerini tek FAQPage altında birleştir.
        const allFaqs = [
          ...(content.faqs || []).map((f) => ({ q: f.q, a: f.a })),
          ...nbContents.flatMap((nb) => nb.content.faqs.map((f) => ({ q: f.q, a: f.a }))),
        ];
        const ldAllFaq = allFaqs.length ? {
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: allFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        } : null;

        scriptEl = document.createElement("script");
        scriptEl.type = "application/ld+json";
        scriptEl.dataset.districtLd = "true";
        scriptEl.textContent = JSON.stringify([ldPage, ldBc, ldAllFaq].filter(Boolean));
        document.head.appendChild(scriptEl);
      })
      .catch(() => a && setArea(null))
      .finally(() => a && setLoading(false));
    return () => { a = false; if (scriptEl) scriptEl.remove(); };
  }, [slug]);

  if (loading) return <div className="container-grid py-24 text-center text-sm text-muted-foreground">İlçe yükleniyor…</div>;

  const fallback = districtBySlug(slug);

  // Yayında değilse: "hazırlanıyor" değil, doğru bilgilendirme + WhatsApp
  if (!area || area.page_status !== "published") {
    const name = area?.name || fallback?.name || slug;
    return (
      <div className="container-grid py-24 text-center">
        <Breadcrumb items={[{ name: "Ana Sayfa", to: "/" }, { name: "Hizmet Bölgeleri", to: "/hizmet-bolgeleri" }]} />
        <MapPin className="mx-auto h-10 w-10 text-accent" />
        <h1 className="heading-display mt-4 text-3xl">{name} Hizmet Bölgesi</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Bu bölge için hizmet durumu şu anda yeniden değerlendirilmektedir. Yapılacak işin türü ve büyüklüğüne göre uygunluk hakkında Özal Usta'ya ulaşarak bilgi alabilirsiniz.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={getWhatsAppLink(`Merhaba Özal Usta. ${name} bölgesinde hizmet uygunluğu hakkında bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer" className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Sor</a>
          <a href={getPhoneLink()} className="btn-outline"><Phone className="h-4 w-4" /> Hemen Ara</a>
          <Link to="/hizmet-bolgeleri" className="btn-secondary">Tüm Hizmet Bölgeleri</Link>
        </div>
      </div>
    );
  }

  const content = getDistrictContent(slug, area);
  const msg = content.whatsapp_message || `Merhaba Özal Usta. ${area.name} bölgesinde yapılacak bir iş için Usta Renovasyon web siteniz üzerinden size ulaştım.`;
  const allServices = [...services, ...onReqServices];
  const buildingTypes = content.building_types;

  // "Bu Sayfada" — yalnızca render edilen bölümler
  const toc = [
    { id: "hizmetler", label: "Hizmetler" },
    allServices.length > 0 && { id: "surec", label: "Çalışma Süreci" },
    buildingTypes.length > 0 && { id: "yapilar", label: "Yapı Türleri" },
    (area.neighborhoods || []).length > 0 && { id: "mahalleler", label: "Mahalleler" },
    content.faqs.length > 0 && { id: "sss", label: "Sık Sorulan Sorular" },
    { id: "teklif", label: "Teklif Al" },
  ].filter(Boolean);

  return (
    <article>
      <Breadcrumb items={[{ name: "Ana Sayfa", to: "/" }, { name: "Hizmet Bölgeleri", to: "/hizmet-bolgeleri" }, { name: area.name }]} />

      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid py-12 lg:py-16">
          <Reveal className="max-w-2xl">
            <span className="section-eyebrow text-accent">Hizmet Bölgesi</span>
            <h1 className="heading-display mt-3 text-3xl sm:text-4xl">{content.hero_title}</h1>
            <p className="mt-4 text-white/70">{content.short_description}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-white/60"><MapPin className="h-4 w-4" /> {area.name} / İzmir · {SERVICE_STATUS_LABELS[area.service_status] || "Talebe Göre Değerlendiriliyor"}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" data-cta="district-hero-whatsapp" onClick={() => trackCta("district-hero-whatsapp", { district: slug })} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Bilgi Al</a>
              <a href={getPhoneLink()} data-cta="district-hero-call" onClick={() => trackCta("district-hero-call", { district: slug })} className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> Hemen Ara</a>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="container-grid py-12 lg:py-16">
        {/* Mobil: yatay "Bu Sayfada" */}
        <div className="mb-6 lg:hidden">
          <PageToc items={toc} />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0 space-y-12">
            {/* Giriş */}
            <section id="ozet">
              <h2 className="heading-display text-2xl">{area.name} Hizmetlerimiz</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{content.intro}</p>
            </section>

            {/* Hizmetler */}
            <section id="hizmetler">
              <h2 className="heading-display text-2xl">{inDistrict(area.name)} Sunulan Hizmetler</h2>
              <div className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm leading-relaxed text-muted-foreground">
                {content.service_policy}
              </div>
              {services.length > 0 ? (
                <>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {(showAllServices ? services : services.slice(0, 9)).map((s) => (
                      <Link key={s.id} to={`/hizmetler/${s.slug}`} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent">
                        <span className="font-medium">{s.name}</span><ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                  {services.length > 9 && (
                    <button type="button" onClick={() => setShowAllServices((v) => !v)} aria-expanded={showAllServices} className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent">
                      {showAllServices ? "Daha Az Göster" : `Tüm Hizmetleri Gör (${services.length})`}
                      <ChevronDown className={`h-4 w-4 transition-transform ${showAllServices ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">{area.name} bölgesinde sunulabilecek hizmetler için Özal Usta'ya ulaşabilirsiniz.</p>
              )}
            </section>

            {/* Çalışma süreci */}
            {content.process_text && (
              <section id="surec">
                <h2 className="heading-display text-2xl">Çalışma ve Değerlendirme Süreci</h2>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{content.process_text}</p>
              </section>
            )}

            {/* Yapı türleri */}
            {buildingTypes.length > 0 && (
              <section id="yapilar">
                <h2 className="heading-display text-2xl">Hizmet Verilebilecek Yapı Türleri</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {buildingTypes.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm">
                      <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {t}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Mahalleler */}
            {(area.neighborhoods || []).length > 0 && (
              <section id="mahalleler">
                <h2 className="heading-display text-2xl">{area.name} Mahalleleri ve Boya Badana Hizmetleri</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {area.name} ilçesine bağlı aşağıdaki mahallelerin tamamında Usta Renovasyon'un yayında olan aktif hizmetleri sunulabilmektedir. Hizmet kapsamı mahalle adına göre sınırlandırılmaz; yapılacak iş, alanın durumu ve çalışma planı değerlendirilerek süreç belirlenir. Her mahalle için boya badana, ev ve daire boyama, iç cephe duvar boyama, alçı tamiri, malzemeli boya seçenekleri ve fiyatlandırma hakkında detaylı bilgiyi mahalle adına dokunarak görebilirsiniz.
                </p>
                <div className="mt-4">
                  <NeighborhoodList districtName={area.name} neighborhoods={area.neighborhoods} whatsappMsg={msg} />
                </div>
              </section>
            )}

            {/* Fiyat */}
            {content.pricing_text && (
              <section className="rounded-xl border border-border bg-card p-5">
                <h2 className="flex items-center gap-2 heading-display text-lg"><Tag className="h-4 w-4 text-accent" /> Fiyatı Etkileyen Unsurlar</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.pricing_text}</p>
              </section>
            )}

            {/* SSS */}
            {content.faqs.length > 0 && (
              <section id="sss">
                <h2 className="heading-display text-2xl">{area.name} Sık Sorulan Sorular</h2>
                <div className="mt-4"><FaqAccordion items={content.faqs} /></div>
              </section>
            )}

            {/* Teklif / CTA */}
            <section id="teklif" className="rounded-2xl border border-accent/30 bg-accent/5 p-6 lg:p-8">
              <h2 className="heading-display text-2xl">{inDistrictKi(area.name)} İşiniz İçin Özal Usta'ya Ulaşın</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Yapılacak hizmeti, alanın konumunu ve mümkünse fotoğrafları paylaşarak hizmet uygunluğu ve teklif süreci hakkında bilgi alabilirsiniz.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" data-cta="district-cta-whatsapp" onClick={() => trackCta("district-cta-whatsapp", { district: slug })} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Fotoğraf Gönder</a>
                <a href={getPhoneLink()} data-cta="district-cta-call" onClick={() => trackCta("district-cta-call", { district: slug })} className="btn-outline"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
                <Link to="/ucretsiz-kesif" className="btn-secondary">Keşif Talep Et</Link>
              </div>
              <div className="mt-6">
                <ServiceQuoteForm serviceName={`${area.name} Tadilat`} />
              </div>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <PageToc items={toc} />
              </div>
              <div className="rounded-xl border border-border bg-primary p-5 text-white">
                <p className="text-sm font-semibold">{area.name} için teklif alın.</p>
                <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-accent mt-3 w-full"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                <a href={getPhoneLink()} className="btn-outline mt-2 w-full border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> Ara</a>
              </div>
            </div>
          </aside>
        </div>

        {/* Yakın ilçeler */}
        {nearby.length > 0 && (
          <section className="mt-16">
            <h2 className="heading-display text-2xl">Yakın Hizmet Bölgeleri</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{nearby.map((d) => <DistrictCard key={d.id || d.slug} district={d} />)}</div>
          </section>
        )}
      </div>
    </article>
  );
}