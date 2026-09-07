import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MessageCircle, Phone } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { serviceCategories } from "@/lib/servicesData";
import { getPhoneLink, getWhatsAppLink, siteConfig } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import ServiceCategoryCard from "@/components/services/ServiceCategoryCard";
import { CallButton } from "@/components/common/ContactActions";
import Reveal from "@/components/common/Reveal";

const PHOTO_MSG =
  "Merhaba Özal Usta. Yapılacak alanın fotoğraflarını göndererek hangi hizmete ihtiyacım olduğunu danışmak istiyorum.";

// Hizmetler ana sayfası — hero, arama, 10 kategori kartı, son CTA.
export default function Services() {
  const [q, setQ] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    let a = true;
    siteStore.entities.Service
      .filter({ status: "published" }, "order", 200)
      .then((i) => a && setServices(i))
      .catch(() => a && setServices([]));
    return () => {
      a = false;
    };
  }, []);

  const filteredCats = useMemo(() => {
    if (!q.trim()) return serviceCategories;
    const s = q.toLowerCase();
    return serviceCategories.filter((c) =>
      [c.title, c.blurb, c.description, ...c.subServices].join(" ").toLowerCase().includes(s)
    );
  }, [q]);

  const matchedServices = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return services.filter((svc) =>
      [svc.name, svc.short_description, svc.description].join(" ").toLowerCase().includes(s)
    );
  }, [q, services]);

  const empty = q.trim() && filteredCats.length === 0 && matchedServices.length === 0;

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-grid py-14 lg:py-20">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-accent">Hizmetlerimiz</span>
            <h1 className="heading-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
              Tadilat, Boya, Sıva ve İzolasyon Hizmetlerimiz
            </h1>
            <p className="mt-4 text-white/70">
              Usta Renovasyon olarak alçı, sıva, iç ve dış cephe boya, mineral sıva, çatı izolasyonu, su yalıtımı,
              mantolama, alçıpan, dekorasyon ve anahtar teslim tadilat alanlarında profesyonel çözümler sunuyoruz.
              Başta Bornova olmak üzere İzmir geneline hizmet veriyoruz.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" data-cta="services-hero-whatsapp" onClick={() => trackCta("services-hero-whatsapp")} className="btn-accent">
                <MessageCircle className="h-4 w-4" /> WhatsApp'tan Teklif Al
              </a>
              <a href={getPhoneLink()} data-cta="services-hero-call" onClick={() => trackCta("services-hero-call")} className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent">
                <Phone className="h-4 w-4" /> Hemen Ara
              </a>
              <Link to="/#teklif-al" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary">
                Ücretsiz Keşif
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-grid py-10">
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Hizmet ara: boya, alçı, çatı, tadilat..."
                className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background pb-16 lg:pb-24">
        <div className="container-grid">
          {empty ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <h2 className="font-heading text-lg font-bold">Aramanızla eşleşen hizmet bulunamadı</h2>
              <p className="mt-2 text-sm text-muted-foreground">Yapılacak işi WhatsApp üzerinden Özal Usta'ya danışabilirsiniz.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a href={getWhatsAppLink(PHOTO_MSG)} target="_blank" rel="noopener noreferrer" className="btn-accent">
                  <MessageCircle className="h-4 w-4" /> WhatsApp'tan Sor
                </a>
                <CallButton className="btn-outline" ctaId="services-empty-call" label="Hemen Ara" />
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCats.map((c, i) => (
                <Reveal key={c.key} delay={i * 50} className="h-full">
                  <ServiceCategoryCard category={c} />
                </Reveal>
              ))}
            </div>
          )}

          {matchedServices.length > 0 && (
            <div className="mt-12">
              <h2 className="heading-display mb-4 text-xl">Hizmet Sonuçları</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {matchedServices.map((s) => (
                  <Link key={s.id} to={`/hizmetler/${s.slug}`} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-xs text-muted-foreground">Detay →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="container-grid py-16 text-center lg:py-20">
          <h2 className="heading-display mx-auto max-w-2xl text-3xl sm:text-4xl">
            Hangi Hizmete İhtiyacınız Olduğundan Emin Değil misiniz?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Yapılacak alanın fotoğraflarını WhatsApp üzerinden gönderin. Özal Usta, ihtiyaç duyulan uygulama hakkında ön bilgi versin.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={getWhatsAppLink(PHOTO_MSG)} target="_blank" rel="noopener noreferrer" data-cta="services-final-whatsapp" onClick={() => trackCta("services-final-whatsapp")} className="btn-accent">
              <MessageCircle className="h-4 w-4" /> WhatsApp'tan Fotoğraf Gönder
            </a>
            <a href={getPhoneLink()} data-cta="services-final-call" onClick={() => trackCta("services-final-call")} className="btn-outline">
              <Phone className="h-4 w-4" /> {siteConfig.phone.display}
            </a>
            <Link to="/#teklif-al" className="btn-secondary">Ücretsiz Keşif Talep Et</Link>
          </div>
        </div>
      </section>
    </div>
  );
}