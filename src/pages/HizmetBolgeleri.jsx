import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, MessageCircle, ChevronDown } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import {
  izmirDistricts,
  districtSearch,
} from "@/lib/districtsData";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import Breadcrumb from "@/components/common/Breadcrumb";
import DistrictCard from "@/components/districts/DistrictCard";

const AREA_MSG = "Merhaba Özal Usta. Bulunduğum bölgeye hizmet verip vermediğiniz hakkında bilgi almak istiyorum.";

const FILTERS = [
  { value: "all", label: "Tüm Bölgeler" },
  { value: "merkez", label: "Merkez İlçeler" },
  { value: "yakin", label: "Yakın Bölgeler" },
  { value: "talebe", label: "Talebe Göre" },
  { value: "published", label: "Detay Sayfası Olanlar" },
];

const INITIAL_COUNT = 12;

// Hizmet Bölgeleri ana sayfası — Bornova öncelikli, arama, filtre, grup görünümü.
export default function HizmetBolgeleri() {
  const [areas, setAreas] = useState([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let a = true;
    document.title = "İzmir Boya, Alçı, İzolasyon ve Tadilat Hizmet Bölgeleri | Usta Renovasyon";
    siteStore.entities.ServiceArea.filter({}, "order", 100)
      .then((items) => { if (a) { setAreas(items); setLoading(false); } })
      .catch(() => { if (a) setLoading(false); });
    return () => { a = false; };
  }, []);

  // Entity kayıtlarıyla statik veriyi birleştir
  const merged = useMemo(() => {
    const bySlug = {};
    areas.forEach((x) => { bySlug[x.slug] = x; });
    return izmirDistricts.map((d) => {
      const ent = bySlug[d.slug];
      return ent
        ? {
            ...d,
            ...ent,
            // statikten boş alanları doldur
            neighborhoods: ent.neighborhoods?.length ? ent.neighborhoods : d.neighborhoods,
            nearby: ent.nearby?.length ? ent.nearby : d.nearby,
            priority_group: ent.priority_group || d.priority_group,
            page_status: ent.page_status || d.page_status || "draft",
          }
        : d;
    });
  }, [areas]);

  const filtered = useMemo(() => {
    let list = merged;
    if (filter === "published") {
      list = list.filter((d) => d.page_status === "published");
    } else if (filter !== "all") {
      list = list.filter((d) => d.priority_group === filter);
    }
    return districtSearch(q, list);
  }, [q, filter, merged]);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const bornova = merged.find((d) => d.slug === "bornova") || null;
  const publishedCount = merged.filter((d) => d.page_status === "published").length;

  return (
    <article>
      <Breadcrumb items={[{ name: "Ana Sayfa", to: "/" }, { name: "Hizmet Bölgeleri" }]} />

      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid py-12 lg:py-16">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-accent">Hizmet Bölgeleri</span>
            <h1 className="heading-display mt-3 text-3xl sm:text-4xl">İzmir Boya, Alçı, İzolasyon ve Tadilat Hizmet Bölgeleri</h1>
            <p className="mt-4 text-white/70">
              Usta Renovasyon, Özal Usta yönetiminde başta Bornova olmak üzere İzmir'in farklı ilçelerinde boya, alçı, sıva, çatı izolasyonu, su yalıtımı, mantolama, alçıpan ve tadilat hizmetleri sunmaktadır. Hizmet uygunluğu; yapılacak işin türü, büyüklüğü, konumu ve çalışma planına göre değerlendirilir.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-white/70">
              <span><MapPin className="mr-1 inline h-3.5 w-3.5 text-accent" /> {merged.length} ilçe</span>
              <span>{publishedCount} detay sayfası yayında</span>
              <span>{bornova?.name ? `${bornova.name} ana bölge` : "Bornova ana bölge"}</span>
            </div>
            <a href={getWhatsAppLink(AREA_MSG)} target="_blank" rel="noopener noreferrer" data-cta="areas-hero-whatsapp" onClick={() => trackCta("areas-hero-whatsapp")} className="btn-accent mt-6"><MessageCircle className="h-4 w-4" /> Bölgenizi WhatsApp'tan Sorun</a>
          </div>
        </div>
      </header>

      <div className="container-grid py-12 lg:py-16 space-y-12">
        {/* Bornova öncelikli */}
        {bornova && (
          <section className="rounded-2xl border border-accent/30 bg-accent/5 p-6 lg:p-8">
            <span className="section-eyebrow">Ana Hizmet Bölgesi</span>
            <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="heading-display text-2xl">{bornova.name} Boya, Alçı ve Tadilat Hizmetleri</h2>
                <p className="mt-2 text-sm text-muted-foreground">{bornova.short_description || `${bornova.name} bölgesinde iç ve dış cephe boya, alçı, sıva, izolasyon ve tadilat hizmetleri sunulmaktadır.`}</p>
                <p className="mt-2 text-xs text-muted-foreground">Hizmet uygunluğu işin türü, büyüklüğü, konumu ve çalışma planına göre değerlendirilir.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                {bornova.page_status === "published" && (
                  <Link to={`/hizmet-bolgeleri/${bornova.slug}`} className="btn-accent">{bornova.name} Sayfası</Link>
                )}
                <a href={getWhatsAppLink(`Merhaba Özal Usta. ${bornova.name} bölgesinde yapılacak bir iş için bilgi almak istiyorum.`)} target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </div>
            </div>
          </section>
        )}

        {/* Arama + filtre */}
        <section>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1">
              <h2 className="heading-display text-2xl">İlçenizi Arayın</h2>
              <label htmlFor="district-search" className="sr-only">İlçe veya mahalle arayın</label>
              <div className="mt-4 flex max-w-md items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input id="district-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="İlçe veya mahalle adı yazın..." className="w-full bg-transparent text-sm outline-none" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    filter === f.value ? "border-accent bg-accent text-primary-foreground" : "border-border bg-card text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* İlçe kartları */}
        <section>
          {loading ? (
            <p className="text-sm text-muted-foreground">İlçeler yükleniyor…</p>
          ) : visible.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((d) => <DistrictCard key={d.slug || d.id} district={d} />)}
              </div>
              {filtered.length > INITIAL_COUNT && (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    aria-expanded={showAll}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    {showAll ? "Daha Az Göster" : `Daha Fazla İlçe Göster (${filtered.length - INITIAL_COUNT})`}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">Bulunduğunuz bölge için hizmet uygunluğunu Özal Usta'ya sorabilirsiniz.</p>
              <a href={getWhatsAppLink(AREA_MSG)} target="_blank" rel="noopener noreferrer" className="btn-accent mt-4"><MessageCircle className="h-4 w-4" /> Bölgeyi Sor</a>
            </div>
          )}
          <p className="mt-4 text-xs text-muted-foreground"><MapPin className="mr-1 inline h-3.5 w-3.5 text-accent" /> Hizmet uygunluğu işin türüne ve çalışma planına göre değerlendirilebilir.</p>
        </section>
      </div>
    </article>
  );
}