import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import { formFaqs } from "@/lib/formConfig";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import DetailedQuoteForm from "@/components/forms/DetailedQuoteForm";

const PHOTO_MSG = "Merhaba Özal Usta. Usta Renovasyon web siteniz üzerinden ulaşıyorum. Yapılacak alanın fotoğraflarını göndererek ön bilgi almak istiyorum.";

// Teklif Al sayfası — ayrıntılı teklif formu, WhatsApp fotoğraf, SSS.
export default function TeklifAl() {
  useEffect(() => {
    document.title = "İzmir Tadilat ve Boya Fiyat Teklifi Al | Usta Renovasyon";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Boya, alçı, sıva, çatı izolasyonu, su yalıtımı ve tadilat işleriniz için Usta Renovasyon'dan teklif talebi oluşturun. Fotoğraf ekleyin, Özal Usta size ulaşsın.");
    const ld = {
      "@context": "https://schema.org", "@type": "WebPage",
      name: "Teklif Al", description: "Tadilat ve renovasyon için fiyat teklifi talebi.",
      url: window.location.href,
      isPartOf: { "@type": "WebSite", name: "Usta Renovasyon" },
    };
    const ldBc = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: window.location.origin + "/" },
        { "@type": "ListItem", position: 2, name: "Teklif Al", item: window.location.href },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.teklifLd = "true";
    script.textContent = JSON.stringify([ld, ldBc]);
    document.head.appendChild(script);
    return () => {
      script.remove();
      document.title = "Usta Renovasyon | İzmir Boya, Alçı, Tadilat ve İzolasyon Ustası";
    };
  }, []);

  return (
    <section className="bg-background">
      <div className="border-b border-border bg-primary text-white">
        <div className="container-grid py-12 lg:py-16">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-accent">Teklif Al</span>
            <h1 className="heading-display mt-3 text-3xl sm:text-4xl">Tadilat ve Renovasyon İçin Fiyat Teklifi Alın</h1>
            <p className="mt-4 text-white/70">Yapılacak hizmeti, konumu ve alanın mevcut durumunu bize iletin. Fotoğraf ekleyerek daha açıklayıcı bir ön değerlendirme talebi oluşturabilirsiniz.</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-white/60"><MapPin className="h-4 w-4" /> Bornova ve İzmir geneline hizmet</p>
          </div>
        </div>
      </div>

      <div className="container-grid py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <DetailedQuoteForm />
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">Form doldurmak istemiyor musunuz?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Özal Usta'yı doğrudan arayabilir veya WhatsApp'tan fotoğraf gönderebilirsiniz.</p>
              <a href={getPhoneLink()} data-cta="teklif-aside-call" onClick={() => trackCta("teklif-aside-call")} className="btn-outline mt-3 w-full"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
              <a href={getWhatsAppLink(PHOTO_MSG)} target="_blank" rel="noopener noreferrer" data-cta="teklif-aside-whatsapp" onClick={() => trackCta("teklif-aside-whatsapp")} className="btn-accent mt-2 w-full"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Fotoğraf Gönder</a>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">Süreç</h3>
              <ol className="mt-3 space-y-2">
                <li>1. Talebinizi gönderin</li>
                <li>2. Fotoğraf/keşif ile ön değerlendirme</li>
                <li>3. İş kapsamı ve teklif</li>
                <li>4. Uygulama ve teslim</li>
              </ol>
              <Link to="/ucretsiz-kesif" className="btn-link mt-3">Ücretsiz Keşif Talep Et</Link>
            </div>
            <div className="rounded-xl border border-border bg-accent/5 p-5 text-sm text-muted-foreground">
              Net fiyat; alanın ölçüsü, yüzey durumu, yapılacak işlemler ve malzeme değerlendirildikten sonra belirlenir. Fotoğraf göndererek ön bilgi alabilirsiniz.
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="heading-display text-2xl">Sık Sorulan Sorular</h2>
          <Accordion type="single" collapsible className="mt-4 space-y-3">
            {formFaqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="rounded-xl border border-border bg-card px-5">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}