import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Check, ChevronRight } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { getCategoryMeta } from "@/lib/servicesData";
import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Reveal from "@/components/common/Reveal";
import ServiceQuoteForm from "@/components/services/ServiceQuoteForm";
import ServiceDistricts from "@/components/services/ServiceDistricts";
import PageToc from "@/components/services/PageToc";

const inspectionLabels = {
  acik: "Ücretsiz keşif uygun",
  kapali: "Keşif uygun değil",
  foto: "Fotoğrafla ön değerlendirme",
  on_bilgi: "Telefonla ön bilgi",
  yerinde: "Yerinde keşif gerekli",
};

// Hizmet detay sayfası — tek H1, zengin içerik, Schema, dinamik WhatsApp.
export default function ServiceDetail({ slug }) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    let a = true;
    let scriptEl = null;
    setLoading(true);
    siteStore.entities.Service
      .filter({ slug, status: "published" }, "order", 1)
      .then(async (items) => {
        if (!a) return;
        const s = items[0] || null;
        setService(s);
        if (s) {
          if (s.related_services && s.related_services.length) {
            try {
              const rel = await siteStore.entities.Service.filter({ status: "published" }, "order", 100);
              if (a) setRelated(rel.filter((x) => s.related_services.includes(x.slug) && x.id !== s.id));
            } catch {
              /* ignore */
            }
          }
          document.title = s.seo_title || `${s.name} | Usta Renovasyon`;
          const m = document.querySelector('meta[name="description"]');
          if (m && s.meta_description) m.setAttribute("content", s.meta_description);
          const ldService = {
            "@context": "https://schema.org", "@type": "Service", name: s.name,
            description: s.short_description || s.description,
            provider: { "@type": "LocalBusiness", name: "Usta Renovasyon", telephone: "+905360358898", areaServed: "İzmir" },
            areaServed: "İzmir", url: window.location.href,
          };
          const ldFaq = s.faqs && s.faqs.length
            ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
            : null;
          const ldBc = {
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: window.location.origin + "/" },
              { "@type": "ListItem", position: 2, name: "Hizmetler", item: window.location.origin + "/hizmetler" },
              { "@type": "ListItem", position: 3, name: s.name, item: window.location.href },
            ],
          };
          scriptEl = document.createElement("script");
          scriptEl.type = "application/ld+json";
          scriptEl.dataset.serviceLd = "true";
          scriptEl.textContent = JSON.stringify([ldService, ldFaq, ldBc].filter(Boolean));
          document.head.appendChild(scriptEl);
        }
      })
      .catch(() => a && setService(null))
      .finally(() => a && setLoading(false));
    return () => {
      a = false;
      if (scriptEl) scriptEl.remove();
    };
  }, [slug]);

  if (loading) return <div className="container-grid py-24 text-center text-sm text-muted-foreground">Hizmet yükleniyor…</div>;

  if (!service) {
    return (
      <div className="container-grid py-24 text-center">
        <h1 className="heading-display text-3xl">Bu hizmetin detay sayfası hazırlanıyor</h1>
        <p className="mt-3 text-muted-foreground">İçerik kısa süre içinde eklenecektir. Bilgi ve teklif için Özal Usta ile iletişime geçebilirsiniz.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={getWhatsAppLink(`Merhaba Özal Usta. ${slug} hizmeti hakkında bilgi ve fiyat teklifi almak istiyorum.`)} target="_blank" rel="noopener noreferrer" className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Sor</a>
          <Link to="/hizmetler" className="btn-outline">Tüm Hizmetler</Link>
        </div>
      </div>
    );
  }

  const cat = getCategoryMeta(service.category);
  const msg = service.whatsapp_message || `Merhaba Özal Usta. Usta Renovasyon web sitenizdeki "${service.name}" hizmeti hakkında bilgi ve fiyat teklifi almak istiyorum.`;
  const photoMsg = `Merhaba Özal Usta. "${service.name}" hizmeti için yapılacak alanın fotoğraflarını göndererek bilgi ve fiyat teklifi almak istiyorum.`;
  const inspectionLabel = inspectionLabels[service.has_free_inspection] || "Ücretsiz keşif";

  // "Bu Sayfada" menüsü yalnızca gerçekten render edilen bölümleri listeler.
  const toc = [
    { id: "ozet", label: "Hizmet Hakkında" },
    service.when_needed && service.when_needed.length > 0 && { id: "durum", label: "Hangi Durumlarda" },
    service.use_areas && service.use_areas.length > 0 && { id: "alanlar", label: "Uygulama Alanları" },
    service.advantages && service.advantages.length > 0 && { id: "avantaj", label: "Avantajlar" },
    service.process_steps && service.process_steps.length > 0 && { id: "surec", label: "Uygulama Süreci" },
    service.materials && service.materials.length > 0 && { id: "malzemeler", label: "Kullanılan Malzemeler" },
    service.faqs && service.faqs.length > 0 && { id: "sss", label: "Sık Sorulan Sorular" },
    { id: "teklif", label: "Teklif Al" },
  ].filter(Boolean);

  return (
    <article>
      <div className="border-b border-border bg-card">
        <div className="container-grid py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">Ana Sayfa</Link>
          <ChevronRight className="mx-1 inline h-3 w-3" />
          <Link to="/hizmetler" className="hover:text-accent">Hizmetler</Link>
          {cat && (<><ChevronRight className="mx-1 inline h-3 w-3" /><Link to={`/hizmetler/${cat.slug}`} className="hover:text-accent">{cat.short}</Link></>)}
          <ChevronRight className="mx-1 inline h-3 w-3" />
          <span className="text-foreground">{service.name}</span>
        </div>
      </div>

      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid py-12 lg:py-16">
          <Reveal className="max-w-2xl">
            <h1 className="heading-display text-3xl sm:text-4xl">{service.name}</h1>
            <p className="mt-4 text-white/70">{service.short_description || service.description}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-white/60"><MapPin className="h-4 w-4" /> Bornova ve İzmir geneline hizmet</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" data-cta="service-hero-whatsapp" onClick={() => trackCta("service-hero-whatsapp", { service: slug })} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Teklif Al</a>
              <a href={getPhoneLink()} data-cta="service-hero-call" onClick={() => trackCta("service-hero-call", { service: slug })} className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> Hemen Ara</a>
              <a href="#teklif" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary">Ücretsiz Keşif</a>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="container-grid py-12 lg:py-16">
        {/* Mobil: yatay kaydırılan "Bu Sayfada" menüsü */}
        <div className="mb-6 lg:hidden">
          <PageToc items={toc} />
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0 space-y-10">
            <section id="ozet">
              <h2 className="heading-display text-2xl">{service.name} Hakkında</h2>
              {service.description && <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{service.description}</p>}
              <div className="mt-4 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                <strong className="text-foreground">{inspectionLabel}.</strong> Net fiyat; yapılacak alanın ölçüsü, mevcut yüzey durumu, kullanılacak malzeme ve iş kapsamı değerlendirildikten sonra belirlenir. Fotoğraf göndererek ön bilgi alabilir veya keşif talep edebilirsiniz.
              </div>
            </section>

            {service.when_needed && service.when_needed.length > 0 && (
              <section id="durum">
                <h2 className="heading-display text-2xl">Bu Hizmete Hangi Durumlarda İhtiyaç Duyulur?</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {service.when_needed.map((w, i) => <li key={i} className="flex items-start gap-2 text-sm text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {w}</li>)}
                </ul>
              </section>
            )}

            {service.use_areas && service.use_areas.length > 0 && (
              <section id="alanlar">
                <h2 className="heading-display text-2xl">Uygulama Alanları</h2>
                <div className="mt-4 flex flex-wrap gap-2">{service.use_areas.map((u, i) => <span key={i} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm">{u}</span>)}</div>
              </section>
            )}

            {service.advantages && service.advantages.length > 0 && (
              <section id="avantaj">
                <h2 className="heading-display text-2xl">Hizmetin Avantajları</h2>
                <ul className="mt-4 space-y-2">{service.advantages.map((adv, i) => <li key={i} className="flex items-start gap-2 text-sm text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {adv}</li>)}</ul>
              </section>
            )}

            {service.process_steps && service.process_steps.length > 0 && (
              <section id="surec">
                <h2 className="heading-display text-2xl">Uygulama Süreci</h2>
                <ol className="mt-4 space-y-3">{service.process_steps.map((s, i) => <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span><span className="pt-1 text-muted-foreground">{s}</span></li>)}</ol>
              </section>
            )}

            {service.materials && service.materials.length > 0 && (
              <section id="malzemeler">
                <h2 className="heading-display text-2xl">Kullanılabilecek Malzemeler</h2>
                <div className="mt-4 flex flex-wrap gap-2">{service.materials.map((m, i) => <span key={i} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm">{m}</span>)}</div>
                <p className="mt-3 text-sm text-muted-foreground">Kullanılacak malzeme, uygulama alanının durumu, yüzey türü, su ve nem etkisi ve müşterinin ihtiyacına göre belirlenir. Tek bir ürün tüm projeler için kesin çözüm gibi sunulmaz.</p>
              </section>
            )}

            {service.cautions && service.cautions.length > 0 && (
              <section>
                <h2 className="heading-display text-2xl">Dikkat Edilmesi Gerekenler</h2>
                <ul className="mt-4 space-y-2">{service.cautions.map((c, i) => <li key={i} className="flex items-start gap-2 text-sm text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {c}</li>)}</ul>
              </section>
            )}

            {service.faqs && service.faqs.length > 0 && (
              <section id="sss">
                <h2 className="heading-display text-2xl">Sık Sorulan Sorular</h2>
                <Accordion type="single" collapsible className="mt-4 space-y-3">
                  {service.faqs.map((f, i) => (
                    <AccordionItem key={i} value={`q${i}`} className="rounded-xl border border-border bg-card px-5">
                      <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            <section id="teklif">
              <h2 className="heading-display text-2xl">Bu Hizmet İçin Teklif Alın</h2>
              <p className="mt-2 text-sm text-muted-foreground">Formu doldurun, Özal Usta sizinle iletişime geçsin. Fotoğraf göndermek için WhatsApp'ı kullanabilirsiniz.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={getWhatsAppLink(photoMsg)} target="_blank" rel="noopener noreferrer" data-cta="service-photo-whatsapp" onClick={() => trackCta("service-photo-whatsapp", { service: slug })} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Fotoğraf Gönder</a>
                <a href={getPhoneLink()} data-cta="service-call" onClick={() => trackCta("service-call", { service: slug })} className="btn-outline"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
              </div>
              <div className="mt-6"><ServiceQuoteForm serviceName={service.name} /></div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <PageToc items={toc} />
              </div>
              <div className="rounded-xl border border-border bg-primary p-5 text-white">
                <p className="text-sm font-semibold">{service.name} için teklif alın.</p>
                <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-accent mt-3 w-full"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                <a href={getPhoneLink()} className="btn-outline mt-2 w-full border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> Ara</a>
              </div>
            </div>
          </aside>
        </div>

        <ServiceDistricts service={service} />

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="heading-display text-2xl">İlgili Hizmetler</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} to={`/hizmetler/${r.slug}`} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent">
                  <span className="font-medium">{r.name}</span>
                  <span className="text-xs text-muted-foreground">İncele →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="bg-primary text-white">
        <div className="container-grid flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="heading-display max-w-2xl text-3xl sm:text-4xl">Bu Hizmet İçin Bilgi ve Fiyat Teklifi Alın</h2>
          <p className="max-w-xl text-white/70">Yapılacak alanın fotoğraflarını WhatsApp üzerinden gönderin veya Özal Usta ile doğrudan iletişime geçin.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={getWhatsAppLink(photoMsg)} target="_blank" rel="noopener noreferrer" data-cta="service-final-whatsapp" onClick={() => trackCta("service-final-whatsapp", { service: slug })} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Fotoğraf Gönder</a>
            <a href={getPhoneLink()} data-cta="service-final-call" onClick={() => trackCta("service-final-call", { service: slug })} className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
            <a href="#teklif" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary">Ücretsiz Keşif Talep Et</a>
          </div>
        </div>
      </section>
    </article>
  );
}