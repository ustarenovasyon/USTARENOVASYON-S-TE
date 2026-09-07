import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, ChevronRight, Check } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { Image } from "@/components/ui/image";
import { aboutContent } from "@/lib/aboutContent";
import { districts } from "@/lib/homeContent";
import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Reveal from "@/components/common/Reveal";
import SocialLinks from "@/components/common/SocialLinks";
import WhyCards from "@/components/about/WhyCards";
import ProcessSteps from "@/components/about/ProcessSteps";

// Hakkımızda sayfası — AboutContent kaydı varsa varsayılan içeriğin üzerine yazar.
export default function About() {
  const [data, setData] = useState(aboutContent);

  useEffect(() => {
    let a = true;
    siteStore.entities.AboutContent.list(1)
      .then((items) => {
        if (!a || !items.length) return;
        const r = items[0];
        setData((prev) => ({
          ...prev,
          heroTitle: r.hero_title || prev.heroTitle,
          heroSubtitle: r.hero_subtitle || prev.heroSubtitle,
          heroImage: r.hero_image || prev.heroImage,
          introText: r.intro_text || prev.introText,
          ozalText: r.ozal_text || prev.ozalText,
          ozalPhoto: r.ozal_photo || prev.ozalPhoto,
          approachText: r.approach_text || prev.approachText,
          inspectionText: r.inspection_text || prev.inspectionText,
          materialText: r.material_text || prev.materialText,
          contactText: r.contact_text || prev.contactText,
          seoTitle: r.seo_title || prev.seoTitle,
          metaDescription: r.meta_description || prev.metaDescription,
          toggles: {
            ...prev.toggles,
            show_services: r.show_services ?? prev.toggles.show_services,
            show_districts: r.show_districts ?? prev.toggles.show_districts,
            show_faqs: r.show_faqs ?? prev.toggles.show_faqs,
            show_story: r.show_story ?? prev.toggles.show_story,
            show_team: r.show_team ?? prev.toggles.show_team,
            show_documents: r.show_documents ?? prev.toggles.show_documents,
            show_stats: r.show_stats ?? prev.toggles.show_stats,
            show_testimonials: r.show_testimonials ?? prev.toggles.show_testimonials,
          },
        }));
      })
      .catch(() => {});
    return () => {
      a = false;
    };
  }, []);

  // SEO + Schema
  useEffect(() => {
    document.title = data.seoTitle;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", data.metaDescription);
    const faqs = data.toggles.show_faqs ? data.faqs : [];
    const ld = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: data.heroTitle,
      description: data.metaDescription,
      url: window.location.href,
      mainEntity: {
        "@type": "LocalBusiness",
        name: "Usta Renovasyon",
        telephone: "+905360358898",
        areaServed: "İzmir",
        founder: { "@type": "Person", name: "Özal Usta", jobTitle: "Kurucu & Usta" },
      },
    };
    const ldBc = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: window.location.origin + "/" },
        { "@type": "ListItem", position: 2, name: "Hakkımızda", item: window.location.href },
      ],
    };
    const ldFaq = faqs.length
      ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
      : null;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.aboutLd = "true";
    script.textContent = JSON.stringify([ld, ldBc, ldFaq].filter(Boolean));
    document.head.appendChild(script);
    return () => {
      script.remove();
      document.title = "Usta Renovasyon | İzmir Boya, Alçı, Tadilat ve İzolasyon Ustası";
    };
  }, [data]);

  const t = data.toggles;

  return (
    <article>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="container-grid py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">Ana Sayfa</Link>
          <ChevronRight className="mx-1 inline h-3 w-3" />
          <span className="text-foreground">Hakkımızda</span>
        </div>
      </div>

      {/* Hero */}
      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <Reveal>
            <h1 className="heading-display text-3xl sm:text-4xl">{data.heroTitle}</h1>
            <p className="mt-4 text-white/70">{data.heroSubtitle}</p>
            <p className="mt-3 text-sm text-white/60">{data.heroSubtitle2}</p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-white/60"><MapPin className="h-4 w-4" /> Bornova / İzmir merkezli olarak İzmir geneline hizmet</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={getWhatsAppLink(data.whatsappMsg)} target="_blank" rel="noopener noreferrer" data-cta="about-hero-whatsapp" onClick={() => trackCta("about-hero-whatsapp")} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Bilgi Al</a>
              <a href={getPhoneLink()} data-cta="about-hero-call" onClick={() => trackCta("about-hero-call")} className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> Hemen Ara</a>
              <Link to="/hizmetler" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary">Hizmetleri İncele</Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-2xl border border-white/10 shadow-xl">
            <Image src={data.heroImage} alt="Usta Renovasyon iç mekan tadilat ve boya çalışması" className="aspect-[4/3] w-full" fittingType="fill" />
          </Reveal>
        </div>
      </header>

      <div className="container-grid py-14 lg:py-20 space-y-16">
        {/* Tanıtım */}
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image src={data.introImage} alt="Usta Renovasyon alçı ve boya uygulaması çalışma alanı" className="aspect-[4/3] w-full" fittingType="fill" />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="heading-display text-2xl sm:text-3xl">{data.introTitle}</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{data.introText}</p>
          </Reveal>
        </section>

        {/* Özal Usta */}
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="order-2 overflow-hidden rounded-2xl border border-border shadow-lg lg:order-1">
            <Image
              src={data.ozalPhoto || data.introImage}
              alt="Özal Usta ve Usta Renovasyon iletişim bilgileri"
              className="aspect-[4/3] w-full"
              fittingType="fill"
            />
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <h2 className="heading-display text-2xl sm:text-3xl">{data.ozalTitle}</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{data.ozalText}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={getWhatsAppLink(data.whatsappMsg)} target="_blank" rel="noopener noreferrer" data-cta="about-ozal-whatsapp" onClick={() => trackCta("about-ozal-whatsapp")} className="btn-accent"><MessageCircle className="h-4 w-4" /> Özal Usta'ya Yaz</a>
              <a href={getPhoneLink()} data-cta="about-ozal-call" onClick={() => trackCta("about-ozal-call")} className="btn-outline"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
            </div>
          </Reveal>
        </section>

        {/* Çalışma anlayışı */}
        <section>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="heading-display text-2xl sm:text-3xl">{data.approachTitle}</h2>
            <p className="mt-4 text-muted-foreground">{data.approachText}</p>
          </Reveal>
        </section>

        {/* Neden Biz */}
        <section>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="heading-display text-2xl sm:text-3xl">{data.whyTitle}</h2>
            <p className="mt-4 text-muted-foreground">{data.whySubtitle}</p>
          </Reveal>
          <WhyCards cards={data.whyCards} whatsappMsg={data.whatsappMsg} />
        </section>

        {/* Prensipler */}
        <section>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="heading-display text-2xl sm:text-3xl">{data.principlesTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {data.principles.map((p, i) => (
              <Reveal key={i} delay={i * 40} className="h-full">
                <div className="flex h-full items-start gap-2.5 rounded-xl border border-border bg-card p-4 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">{i + 1}</span>
                  <span>{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Nasıl çalışıyoruz */}
        <section>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="heading-display text-2xl sm:text-3xl">{data.processTitle}</h2>
            <p className="mt-4 text-muted-foreground">{data.processSubtitle}</p>
          </Reveal>
          <ProcessSteps steps={data.processSteps} />
        </section>

        {/* Keşif */}
        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="heading-display text-2xl">{data.inspectionTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{data.inspectionText}</p>
        </section>

        {/* Fiyatlandırma */}
        <section>
          <h2 className="heading-display text-2xl">{data.pricingTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{data.pricingText}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {data.pricingFactors.map((f, i) => (
              <li key={i} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm">{f}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">Net fiyat için fotoğraf, ölçü veya keşif gerekebilir.</p>
        </section>

        {/* Malzeme */}
        <section>
          <h2 className="heading-display text-2xl">{data.materialTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{data.materialText}</p>
          <p className="mt-3 text-sm text-muted-foreground">{data.materialNote}</p>
        </section>

        {/* Temiz çalışma */}
        <section>
          <h2 className="heading-display text-2xl">{data.cleanTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{data.cleanText}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {data.cleanItems.map((c, i) => (
              <li key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {c}</li>
            ))}
          </ul>
        </section>

        {/* İletişim */}
        <section>
          <h2 className="heading-display text-2xl">{data.contactTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{data.contactText}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a href={getPhoneLink()} data-cta="about-contact-call" onClick={() => trackCta("about-contact-call")} className="btn-outline"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
            <a href={getWhatsAppLink(data.whatsappMsg)} target="_blank" rel="noopener noreferrer" data-cta="about-contact-whatsapp" onClick={() => trackCta("about-contact-whatsapp")} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz</a>
          </div>
          <SocialLinks title="Bizi Takip Edin" className="mt-6" />
        </section>

        {/* Hizmetler */}
        {t.show_services && (
          <section>
            <h2 className="heading-display text-2xl">Hangi Hizmetleri Sunuyoruz?</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["İç cephe boya", "Dış cephe boya", "Alçı ve sıva", "Mineral sıva", "Çatı izolasyonu", "Su yalıtımı", "Mantolama", "Alçıpan ve asma tavan", "Ev tadilatı", "Anahtar teslim renovasyon"].map((s, i) => (
                <li key={i} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm">{s}</li>
              ))}
            </ul>
            <Link to="/hizmetler" className="btn-secondary mt-5">Tüm Hizmetleri İncele</Link>
          </section>
        )}

        {/* Hizmet bölgeleri */}
        {t.show_districts && (
          <section>
            <h2 className="heading-display text-2xl">Hizmet Verdiğimiz Bölgeler</h2>
            <p className="mt-2 text-muted-foreground">Başta Bornova olmak üzere işin türü ve konumuna göre İzmir'in farklı ilçelerinde hizmet sunuyoruz.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {districts.map((d) => (
                <span key={d} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm"><MapPin className="h-3.5 w-3.5 text-accent" /> {d}</span>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link to="/hizmetler" className="btn-outline">Tüm Hizmet Bölgelerini Gör</Link>
              <a href={getWhatsAppLink("Merhaba Özal Usta. Bulunduğum bölgeye hizmet verip vermediğinizi öğrenmek istiyorum.")} target="_blank" rel="noopener noreferrer" data-cta="about-area-whatsapp" onClick={() => trackCta("about-area-whatsapp")} className="btn-accent">Bulunduğunuz İlçeyi WhatsApp'tan Sor</a>
            </div>
          </section>
        )}

        {/* SSS */}
        {t.show_faqs && (
          <section>
            <h2 className="heading-display text-2xl">Sık Sorulan Sorular</h2>
            <Accordion type="single" collapsible className="mt-5 space-y-3">
              {data.faqs.map((f, i) => (
                <AccordionItem key={i} value={`q${i}`} className="rounded-xl border border-border bg-card px-5">
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
      </div>

      {/* Son CTA */}
      <section className="bg-primary text-white">
        <div className="container-grid flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="heading-display max-w-2xl text-3xl sm:text-4xl">Yapılacak İş Hakkında Özal Usta ile Görüşün</h2>
          <p className="max-w-xl text-white/70">Boya, alçı, sıva, izolasyon veya tadilat ihtiyacınızı telefonla anlatabilir ya da alanın fotoğraflarını WhatsApp üzerinden gönderebilirsiniz.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={getWhatsAppLink(data.photoMsg)} target="_blank" rel="noopener noreferrer" data-cta="about-final-whatsapp" onClick={() => trackCta("about-final-whatsapp")} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Fotoğraf Gönder</a>
            <a href={getPhoneLink()} data-cta="about-final-call" onClick={() => trackCta("about-final-call")} className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
            <Link to="/hizmetler" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary">Hizmetleri İncele</Link>
            <Link to="/#teklif-al" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary">Ücretsiz Keşif Talep Et</Link>
          </div>
        </div>
      </section>
    </article>
  );
}