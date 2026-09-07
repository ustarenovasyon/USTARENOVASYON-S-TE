import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import { inspectionFaqs } from "@/lib/formConfig";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import InspectionForm from "@/components/forms/InspectionForm";

// Ücretsiz keşif sayfası — randevu talebi, kesin randevu vaadi vermez.
export default function UcretsizKesif() {
  useEffect(() => {
    document.title = "Ücretsiz Keşif Talebi | Usta Renovasyon İzmir";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Bornova ve İzmir genelindeki tadilat, boya ve izolasyon ihtiyaçlarınız için keşif talebi oluşturun. Tarih tercihinizi iletin, Özal Usta sizinle iletişime geçsin.");
    const ld = {
      "@context": "https://schema.org", "@type": "WebPage",
      name: "Ücretsiz Keşif Talebi", url: window.location.href,
      isPartOf: { "@type": "WebSite", name: "Usta Renovasyon" },
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.kesifLd = "true";
    script.textContent = JSON.stringify(ld);
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
            <span className="section-eyebrow text-accent">Ücretsiz Keşif</span>
            <h1 className="heading-display mt-3 text-3xl sm:text-4xl">Ücretsiz Keşif Talebi Oluşturun</h1>
            <p className="mt-4 text-white/70">Yapılacak işin konumunu, hizmet türünü ve uygun olduğunuz zamanları belirtin. Talebiniz incelendikten sonra keşif planlaması için sizinle iletişime geçilecektir.</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white/80"><ShieldCheck className="h-4 w-4 text-accent" /> Talep gönderildiğinde randevu kesinleşmiş sayılmaz; tarih ve saat iletişim sonrası netleştirilir.</p>
          </div>
        </div>
      </div>

      <div className="container-grid py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <InspectionForm />
          </div>
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">Hızlı iletişim</h2>
              <a href={getPhoneLink()} data-cta="kesif-aside-call" onClick={() => trackCta("kesif-aside-call")} className="btn-outline mt-3 w-full"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
              <a href={getWhatsAppLink("Merhaba Özal Usta. Yapılacak iş için keşif talep etmek istiyorum.")} target="_blank" rel="noopener noreferrer" data-cta="kesif-aside-whatsapp" onClick={() => trackCta("kesif-aside-whatsapp")} className="btn-accent mt-2 w-full"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz</a>
              <Link to="/teklif-al" className="btn-link mt-3">Teklif Formuna Git</Link>
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="heading-display text-2xl">Sık Sorulan Sorular</h2>
          <Accordion type="single" collapsible className="mt-4 space-y-3">
            {inspectionFaqs.map((f, i) => (
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