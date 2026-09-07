import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { serviceCategories } from "@/lib/servicesData";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import ServiceCard from "@/components/common/ServiceCard";
import Reveal from "@/components/common/Reveal";

const NEED_MSG =
  "Merhaba Özal Usta. Hangi hizmete ihtiyacım olduğunu söylemek ve teklif almak istiyorum.";

// Öne çıkan hizmet kategorileri — veritabanındaki alt hizmetlerle birlikte.
export default function ServicesPreview() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    siteStore.entities.Service
      .filter({ active: true }, "order", 100)
      .then((items) => active && setServices(items))
      .catch(() => active && setServices([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const grouped = serviceCategories.map((c) => ({
    categoryKey: c.key,
    services: services.filter((s) => s.category === c.key),
  }));

  return (
    <section id="hizmetler" className="bg-background">
      <div className="container-grid py-16 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Sunulan Hizmetler</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Hizmetlerimiz</h2>
          <p className="mt-4 text-muted-foreground">
            Boya, alçı, sıva, dış cephe, izolasyon ve komple tadilat ihtiyaçlarınız için profesyonel
            çözümler sunuyoruz.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map((g, i) => (
            <Reveal key={g.categoryKey} delay={i * 70} className="h-full">
              <ServiceCard categoryKey={g.categoryKey} services={g.services} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/hizmetler" className="btn-accent">Tüm Hizmetleri İncele</Link>
          <a
            href={getWhatsAppLink(NEED_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="services-whatsapp-need"
            onClick={() => trackCta("services-whatsapp-need")}
            className="btn-outline"
          >
            <MessageCircle className="h-4 w-4" /> Hangi Hizmete İhtiyacınız Var?
          </a>
        </div>

        {loading && (
          <p className="mt-8 text-center text-sm text-muted-foreground">Hizmetler yükleniyor…</p>
        )}
      </div>
    </section>
  );
}