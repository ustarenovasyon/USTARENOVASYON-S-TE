import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { siteConfig, getPhoneLink, getWhatsAppLink, getEmailLink, hasEmail, getAddressLine } from "@/lib/siteConfig";
import { uiSettings } from "@/lib/uiSettings";
import { trackCta } from "@/lib/ctaTracking";
import Reveal from "@/components/common/Reveal";
import SocialLinks from "@/components/common/SocialLinks";
import ContactForm from "@/components/forms/ContactForm";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const PHOTOS_MSG = "Merhaba Özal Usta. Yapılacak alanın fotoğraflarını göndererek ön bilgi almak istiyorum.";
const AREA_MSG = "Merhaba Özal Usta. Bornova ve İzmir bölgesinde hizmet almak istiyorum. Hizmet uygunluğu hakkında bilgi verebilir misiniz?";

const faqs = [
  { q: "Telefonla doğrudan ulaşabilir miyim?", a: "Evet, 0536 035 88 98 numarasından Özal Usta'ya doğrudan ulaşabilirsiniz." },
  { q: "WhatsApp'tan fotoğraf gönderebilir miyim?", a: "Evet, yapılacak alanın fotoğraflarını WhatsApp üzerinden göndererek ön bilgi alabilirsiniz." },
  { q: "Çalışma saatleri dışında mesaj bırakabilir miyim?", a: "Evet. Çalışma saatleri dışında gönderilen mesajlar müsait olduğunda yanıtlanır; anında dönüş vaadi verilmemekte fakat mesajınız kaydedilmektedir." },
];

// Şu an açık/kapalı — saatler tanımlıysa (Pzt-Cmt 08:00-20:00) Türkiye saatine göre hesaplanır.
function useOpenNow() {
  return useMemo(() => {
    try {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("tr-TR", {
        timeZone: "Europe/Istanbul", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
      }).formatToParts(now);
      const get = (t) => parts.find((p) => p.type === t)?.value || "";
      const day = get("weekday").toLowerCase();
      const hour = parseInt(get("hour"), 10);
      const weekend = ["pa", "sa"]; // paz, saat
      if (day.startsWith("pa") && !day.startsWith("sa")) return { open: false }; // pazar
      const isOpen = hour >= 8 && hour < 20;
      return { open: isOpen };
    } catch {
      return null;
    }
  }, []);
}

function LazyMap() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") { setShow(true); return; }
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted">
      {show ? (
        <iframe
          title="Usta Renovasyon hizmet bölgesi — Bornova, İzmir"
          src="https://www.google.com/maps?q=Bornova%2C%20%C4%B0zmir&output=embed"
          loading="lazy"
          className="h-full w-full"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground"><MapPin className="mr-2 h-5 w-5" /> Harita yükleniyor…</div>
      )}
    </div>
  );
}

// İletişim sayfası — kartlar, form, adres, çalışma saatleri, harita, SSS, CTA.
export default function Iletisim() {
  const openNow = useOpenNow();
  const emailLink = getEmailLink();
  const addressLine = getAddressLine(uiSettings.addressVisibility);

  useEffect(() => {
    document.title = "Usta Renovasyon İletişim | Özal Usta Bornova İzmir";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Boya, alçı, sıva, dış cephe, çatı izolasyonu ve tadilat hizmetleri için Özal Usta'ya ulaşın. Telefon ve WhatsApp: 0536 035 88 98.");
    const ld = {
      "@context": "https://schema.org", "@type": "ContactPage",
      name: "Usta Renovasyon İletişim", url: window.location.href,
      mainEntity: {
        "@type": "LocalBusiness", name: "Usta Renovasyon",
        telephone: "+905360358898", email: siteConfig.email || undefined,
        areaServed: "İzmir", address: { "@type": "PostalAddress", addressLocality: "Bornova", addressRegion: "İzmir", addressCountry: "TR" },
      },
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.iletisimLd = "true";
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => { script.remove(); document.title = "Usta Renovasyon | İzmir Boya, Alçı, Tadilat ve İzolasyon Ustası"; };
  }, []);

  return (
    <article>
      <div className="border-b border-border bg-card">
        <div className="container-grid py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">Ana Sayfa</Link>
          <ChevronRight className="mx-1 inline h-3 w-3" />
          <span className="text-foreground">İletişim</span>
        </div>
      </div>

      {/* Hero */}
      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid py-12 lg:py-16">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-accent">İletişim</span>
            <h1 className="heading-display mt-3 text-3xl sm:text-4xl">Usta Renovasyon İletişim</h1>
            <p className="mt-4 text-white/70">Boya, alçı, sıva, dış cephe, çatı izolasyonu, su yalıtımı veya tadilat ihtiyaçlarınız için telefon, WhatsApp ya da iletişim formu üzerinden ulaşabilirsiniz.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={getPhoneLink()} data-cta="iletisim-hero-call" onClick={() => trackCta("iletisim-hero-call")} className="btn-accent"><Phone className="h-4 w-4" /> Hemen Ara</a>
              <a href={getWhatsAppLink(PHOTOS_MSG)} target="_blank" rel="noopener noreferrer" data-cta="iletisim-hero-whatsapp" onClick={() => trackCta("iletisim-hero-whatsapp")} className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz</a>
              <Link to="/teklif-al" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary">Teklif Al</Link>
              <Link to="/ucretsiz-kesif" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary">Ücretsiz Keşif Talep Et</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container-grid py-12 lg:py-16 space-y-14">
        {/* Hızlı iletişim kartları */}
        <section className="grid gap-6 md:grid-cols-3">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent"><Phone className="h-5 w-5" /></span>
              <h2 className="mt-4 font-heading text-lg font-bold">Telefon</h2>
              <p className="mt-1 text-sm text-muted-foreground">Özal Usta'yı doğrudan arayın.</p>
              <p className="mt-3 text-xl font-semibold text-foreground">{siteConfig.phone.display}</p>
              <a href={getPhoneLink()} data-cta="iletisim-card-call" onClick={() => trackCta("iletisim-card-call")} className="btn-outline mt-4 w-full"><Phone className="h-4 w-4" /> Hemen Ara</a>
            </div>
          </Reveal>
          <Reveal delay={80} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent"><MessageCircle className="h-5 w-5" /></span>
              <h2 className="mt-4 font-heading text-lg font-bold">WhatsApp</h2>
              <p className="mt-1 text-sm text-muted-foreground">Yapılacak alanın fotoğraflarını göndererek ön bilgi alın.</p>
              <a href={getWhatsAppLink(PHOTOS_MSG)} target="_blank" rel="noopener noreferrer" data-cta="iletisim-card-whatsapp" onClick={() => trackCta("iletisim-card-whatsapp")} className="btn-accent mt-4 w-full"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz</a>
            </div>
          </Reveal>
          {hasEmail() && (
            <Reveal delay={160} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent"><Mail className="h-5 w-5" /></span>
                <h2 className="mt-4 font-heading text-lg font-bold">E-posta</h2>
                <p className="mt-1 break-all text-sm text-muted-foreground">{siteConfig.email}</p>
                <a href={emailLink} data-cta="iletisim-card-email" onClick={() => trackCta("iletisim-card-email")} className="btn-outline mt-4 w-full"><Mail className="h-4 w-4" /> E-posta Gönder</a>
              </div>
            </Reveal>
          )}
        </section>

        {/* Adres ve çalışma saatleri */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="heading-display text-2xl">Adres ve Hizmet Bölgesi</h2>
            <p className="mt-3 flex items-start gap-2 text-muted-foreground"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> <span>{addressLine || siteConfig.address.short}</span></p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Usta Renovasyon, başta Bornova olmak üzere işin türü, büyüklüğü ve konumuna göre İzmir'in farklı ilçelerinde hizmet vermektedir.</p>
            <a href={getWhatsAppLink(AREA_MSG)} target="_blank" rel="noopener noreferrer" data-cta="iletisim-area-whatsapp" onClick={() => trackCta("iletisim-area-whatsapp")} className="btn-link mt-3">Bulunduğunuz Bölgeyi WhatsApp'tan Sorun</a>
          </div>
          <div>
            <h2 className="heading-display text-2xl">Çalışma Saatleri</h2>
            <p className="mt-3 flex items-center gap-2 text-muted-foreground"><Clock className="h-5 w-5 text-accent" /> {siteConfig.workingHours}</p>
            {openNow && (
              <p className={`mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium ${openNow.open ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
                <ShieldCheck className="h-4 w-4" /> {openNow.open ? "Şu Anda Açık" : "Şu Anda Kapalı"} — WhatsApp'tan mesaj bırakabilirsiniz.
              </p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">Çalışma saatleri dışında gönderilen mesajlar müsait olduğunda yanıtlanır.</p>
          </div>
        </section>

        {/* Sosyal Medya — iletişim kanallarından ayrı; aktif hesap yoksa tüm blok gizlenir */}
        <SocialLinks
          title="Sosyal Medya"
          description="Çalışmalarımızı ve güncellemeleri sosyal medya hesaplarımızdan takip edebilirsiniz."
          className="rounded-2xl border border-border bg-card p-6"
        />

        {/* Harita */}
        <section>
          <h2 className="heading-display text-2xl">Hizmet Bölgesi Haritası</h2>
          <p className="mt-2 text-sm text-muted-foreground">Bornova ve İzmir genelindeki hizmet bölgesi gösterilmektedir. Tam konum gizlilik nedeniyle paylaşılmamaktadır.</p>
          <div className="mt-4"><LazyMap /></div>
        </section>

        {/* İletişim formu */}
        <section className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
            <h2 className="heading-display text-2xl">İletişim Formu</h2>
            <p className="mt-2 text-sm text-muted-foreground">Kısa bir mesaj bırakın; Özal Usta sizinle iletişime geçsin. Fiyat teklifi için ayrıntılı formu kullanabilirsiniz.</p>
            <div className="mt-6"><ContactForm /></div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-primary p-5 text-white">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">Özal Usta'ya Doğrudan Ulaşın</h3>
              <a href={getPhoneLink()} data-cta="iletisim-side-call" onClick={() => trackCta("iletisim-side-call")} className="btn-accent mt-3 w-full"><Phone className="h-4 w-4" /> Hemen Ara</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" data-cta="iletisim-side-whatsapp" onClick={() => trackCta("iletisim-side-whatsapp")} className="btn-outline mt-2 w-full border-white/20 text-white hover:border-accent hover:text-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz</a>
              <Link to="/ucretsiz-kesif" className="btn-secondary mt-2 w-full border-white/30 text-white hover:bg-white hover:text-primary">Ücretsiz Keşif</Link>
            </div>
          </aside>
        </section>

        {/* SSS */}
        <section className="mx-auto max-w-3xl">
          <h2 className="heading-display text-2xl">Sık Sorulan Sorular</h2>
          <Accordion type="single" collapsible className="mt-4 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="rounded-xl border border-border bg-card px-5">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </article>
  );
}