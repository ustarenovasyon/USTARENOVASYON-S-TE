import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Phone, ChevronRight } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { getCategoryBySlug } from "@/lib/servicesData";
import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Reveal from "@/components/common/Reveal";
import ServiceDistricts from "@/components/services/ServiceDistricts";

// Kategori sayfası — kategori tanıtımı, alt hizmetler, SSS ve bölgeler.
export default function ServiceCategory({ slug }) {
  const cat = getCategoryBySlug(slug);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!cat) return;
    let a = true;
    siteStore.entities.Service
      .filter({ status: "published", category: cat.key }, "order", 100)
      .then((i) => a && setServices(i))
      .catch(() => a && setServices([]));
    document.title = `${cat.title} | Usta Renovasyon`;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", cat.description);
    return () => {
      a = false;
    };
  }, [slug, cat]);

  if (!cat) {
    return (
      <div className="container-grid py-24 text-center">
        <h1 className="heading-display text-3xl">Kategori bulunamadı</h1>
        <Link to="/hizmetler" className="btn-accent mt-6">Hizmetlere Dön</Link>
      </div>
    );
  }

  const Icon = cat.icon;
  const msg = `Merhaba Özal Usta. Usta Renovasyon web sitenizdeki ${cat.title} hakkında bilgi ve fiyat teklifi almak istiyorum.`;

  return (
    <div>
      <div className="border-b border-border bg-card">
        <div className="container-grid py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">Ana Sayfa</Link>
          <ChevronRight className="mx-1 inline h-3 w-3" />
          <Link to="/hizmetler" className="hover:text-accent">Hizmetler</Link>
          <ChevronRight className="mx-1 inline h-3 w-3" />
          <span className="text-foreground">{cat.short}</span>
        </div>
      </div>

      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid py-12 lg:py-16">
          <Reveal className="max-w-2xl">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <h1 className="heading-display mt-4 text-3xl sm:text-4xl">{cat.title}</h1>
            <p className="mt-4 text-white/70">{cat.description}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-white/60"><MapPin className="h-4 w-4" /> Bornova ve İzmir geneline hizmet</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" data-cta="cat-hero-whatsapp" onClick={() => trackCta("cat-hero-whatsapp", { category: slug })} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Teklif Al</a>
              <a href={getPhoneLink()} data-cta="cat-hero-call" onClick={() => trackCta("cat-hero-call", { category: slug })} className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> Hemen Ara</a>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="container-grid py-12 lg:py-16">
        <section>
          <h2 className="heading-display text-2xl">Bu Kategorideki Hizmetler</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {cat.subServices.map((s, i) => (
              <span key={i} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground">{s}</span>
            ))}
          </div>
          {services.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Link key={s.id} to={`/hizmetler/${s.slug}`} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-muted-foreground">İncele →</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <ServiceDistricts />

        {cat.faqs && cat.faqs.length > 0 && (
          <section className="mt-14">
            <h2 className="heading-display text-2xl">Sık Sorulan Sorular</h2>
            <Accordion type="single" collapsible className="mt-4 space-y-3">
              {cat.faqs.map((f, i) => (
                <AccordionItem key={i} value={`q${i}`} className="rounded-xl border border-border bg-card px-5">
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
      </div>

      <section className="bg-primary text-white">
        <div className="container-grid flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="heading-display max-w-2xl text-3xl sm:text-4xl">{cat.title} için Teklif Alın</h2>
          <p className="max-w-xl text-white/70">Yapılacak alanın fotoğraflarını WhatsApp üzerinden gönderin veya Özal Usta ile doğrudan iletişime geçin.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" data-cta="cat-final-whatsapp" onClick={() => trackCta("cat-final-whatsapp", { category: slug })} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Fotoğraf Gönder</a>
            <a href={getPhoneLink()} data-cta="cat-final-call" onClick={() => trackCta("cat-final-call", { category: slug })} className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
            <Link to="/#teklif-al" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary">Ücretsiz Keşif Talep Et</Link>
          </div>
        </div>
      </section>
    </div>
  );
}