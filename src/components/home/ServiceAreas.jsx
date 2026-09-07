import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { izmirDistricts } from "@/lib/districtsData";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import Reveal from "@/components/common/Reveal";

const AREA_MSG = "Merhaba Özal Usta. Bulunduğum bölgeye hizmet verip vermediğiniz hakkında bilgi almak istiyorum.";

// Ana sayfa hizmet bölgeleri — merkezi ServiceArea sisteminden dinamik (öne çıkanlar).
export default function ServiceAreas() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    let a = true;
    siteStore.entities.ServiceArea.filter({}, "order", 100)
      .then((items) => {
        if (!a) return;
        const list = items.filter((d) => d.service_status === "active" || d.service_status === "featured");
        setAreas(list.length ? list : izmirDistricts.filter((d) => d.service_status === "active" || d.service_status === "featured"));
      })
      .catch(() => a && setAreas(izmirDistricts.filter((d) => d.service_status === "active" || d.service_status === "featured")));
    return () => { a = false; };
  }, []);

  return (
    <section className="bg-background">
      <div className="container-grid py-16 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Hizmet Bölgelerimiz</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Bornova'dan İzmir Geneline Hizmet</h2>
          <p className="mt-4 text-muted-foreground">
            Usta Renovasyon olarak başta Bornova olmak üzere İzmir'in birçok ilçesinde boya, alçı, sıva, tadilat, dış cephe ve izolasyon hizmetleri sunuyoruz.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {areas.map((d, i) => (
            <Reveal key={d.slug || d.id || i} delay={i * 40} className="h-full">
              <Link to={d.page_status === "published" ? `/hizmet-bolgeleri/${d.slug}` : "/hizmet-bolgeleri"} className="flex h-full items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent">
                <MapPin className="h-4 w-4 text-accent" /> {d.name}
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/hizmet-bolgeleri" className="btn-secondary">Tüm Hizmet Bölgelerini İncele</Link>
          <a href={getWhatsAppLink(AREA_MSG)} target="_blank" rel="noopener noreferrer" data-cta="area-whatsapp" onClick={() => trackCta("area-whatsapp")} className="btn-outline">
            Bulunduğunuz Bölgeyi WhatsApp'tan Sorun
          </a>
        </div>
      </div>
    </section>
  );
}