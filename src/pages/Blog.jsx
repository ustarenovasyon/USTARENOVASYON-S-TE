import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, BookOpen, MessageCircle, AlertCircle, X } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { blogCategories } from "@/lib/blogConfig";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogCard from "@/components/blog/BlogCard";
import FeaturedPost from "@/components/blog/FeaturedPost";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Reveal from "@/components/common/Reveal";

const AREA_MSG = "Merhaba Özal Usta. Usta Renovasyon Blog sayfasından ulaştım, bir konu hakkında bilgi almak istiyorum.";
const PAGE_SIZE = 9;

// Blog ana sayfası — hero, arama, kategori filtreleri, öne çıkan yazı, kart ızgarası.
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [cats, setCats] = useState([]);
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const catParam = params.get("kategori");
    if (catParam) setActiveCat(catParam);
    const qParam = params.get("q");
    if (qParam) setQ(qParam);
  }, []);

  useEffect(() => {
    let a = true;
    document.title = "Tadilat, Boya ve İzolasyon Rehberi | Usta Renovasyon İzmir";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "İzmir ve Bornova'da boya, tadilat, çatı izolasyonu, su yalıtımı, mantolama, alçı, sıva ve dekorasyon hakkında faydalı bilgileri Usta Renovasyon rehberinde inceleyin.");
    Promise.all([
      siteStore.entities.BlogPost.filter({ status: "published", show_on_blog: true }, "-published_date", 200).catch(() => { if (a) setError(true); return []; }),
      siteStore.entities.BlogCategory.filter({ status: "published" }, "order", 100).catch(() => []),
    ]).then(([p, c]) => {
      if (!a) return;
      setPosts(p);
      setCats(c.length ? c : blogCategories);
      setLoading(false);
    });
    return () => { a = false; };
  }, []);

  const categories = cats.length ? cats : blogCategories;
  const featured = posts.find((p) => p.featured) || posts[0] || null;

  const searchResults = useMemo(() => {
    if (!q.trim()) return null;
    const norm = (s) => String(s || "").toLowerCase()
      .replace(/i̇/g, "i").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u");
    const s = norm(q);
    return posts.filter((p) =>
      norm([p.title, p.summary, p.content, p.category_name, (p.tags || []).join(" ")].join(" ")).includes(s)
    );
  }, [q, posts]);

  const filtered = useMemo(() => {
    let list = posts;
    if (activeCat) list = list.filter((p) => p.category === activeCat);
    return list.filter((p) => p !== featured);
  }, [posts, activeCat, featured]);

  const list = searchResults !== null ? searchResults : filtered;
  const showFeatured = !q.trim() && !activeCat && featured;
  const shown = list.slice(0, visible);

  const updateCat = (slug) => {
    setActiveCat(slug);
    setVisible(PAGE_SIZE);
    const next = new URLSearchParams(params);
    if (slug) next.set("kategori", slug); else next.delete("kategori");
    setParams(next, { replace: true });
  };

  const clearSearch = () => {
    setQ("");
    const next = new URLSearchParams(params);
    next.delete("q");
    setParams(next, { replace: true });
  };

  return (
    <article>
      <Breadcrumb items={[{ name: "Ana Sayfa", to: "/" }, { name: "Blog" }]} />

      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid py-12 lg:py-16">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-accent">Rehber</span>
            <h1 className="heading-display mt-3 text-3xl sm:text-4xl">Tadilat ve Dekorasyon Rehberi</h1>
            <p className="mt-4 text-white/70">
              Boya, tadilat, izolasyon, çatı, alçı, sıva, dekorasyon ve ev yenileme hakkında merak ettiğiniz faydalı bilgileri Usta Renovasyon rehberinde bulabilirsiniz.
            </p>
            <p className="mt-2 text-sm text-white/50">
              İşleme başlamadan önce dikkat edilmesi gerekenleri öğrenin, doğru hizmeti inceleyin ve ihtiyaç duyduğunuzda Özal Usta'ya ulaşın.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/hizmetler" className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent">Hizmetleri İncele</Link>
              <a href={getWhatsAppLink(AREA_MSG)} target="_blank" rel="noopener noreferrer" data-cta="blog-hero-whatsapp" onClick={() => trackCta("blog-hero-whatsapp")} className="btn-accent"><MessageCircle className="h-4 w-4" /> Özal Usta'ya Sor</a>
            </div>
          </div>

          {/* Arama */}
          <div className="mt-8 max-w-xl">
            <label htmlFor="blog-search" className="sr-only">Rehberde ara</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 focus-within:border-accent">
              <Search className="h-4 w-4 text-white/60" />
              <input
                id="blog-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rehberde ara…"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
              {q && <button onClick={clearSearch} aria-label="Aramayı temizle" className="text-white/60 hover:text-white"><X className="h-4 w-4" /></button>}
            </div>
          </div>
        </div>
      </header>

      <div className="container-grid py-12 lg:py-16 space-y-10">
        {/* Kategori filtreleri */}
        {!q.trim() && (
          <CategoryFilter categories={categories} selected={activeCat} onChange={updateCat} />
        )}

        {/* Öne çıkan yazı */}
        {showFeatured && (
          <Reveal>
            <FeaturedPost post={featured} />
          </Reveal>
        )}

        {/* Arama / liste sonuçları */}
        <section>
          {q.trim() && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="heading-display text-2xl">Arama Sonuçları: "{q}"</h2>
              <span className="text-sm text-muted-foreground">{searchResults.length} yazı bulundu</span>
            </div>
          )}
          {activeCat && !q.trim() && (
            <h2 className="heading-display text-2xl">{categories.find((c) => c.slug === activeCat)?.name} Yazıları</h2>
          )}
          {!q.trim() && !activeCat && <h2 className="heading-display text-2xl">Tüm Yazılar</h2>}

          {error ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
              <AlertCircle className="mx-auto h-10 w-10 text-rose-400" />
              <p className="mt-3 text-sm font-semibold text-rose-700">Rehber yazıları şu anda yüklenemedi.</p>
              <p className="mt-1 text-xs text-rose-600">Lütfen yeniden deneyin.</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button onClick={() => window.location.reload()} className="btn-accent">Yeniden Dene</button>
                <Link to="/hizmetler" className="btn-outline">Hizmetleri İncele</Link>
              </div>
            </div>
          ) : list.length > 0 ? (
            <>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 60} className="h-full">
                    <BlogCard post={p} className="h-full" />
                  </Reveal>
                ))}
              </div>
              {list.length > visible && (
                <div className="mt-8 text-center">
                  <button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline">Daha Fazla Yazı Göster</button>
                </div>
              )}
            </>
          ) : !loading ? (
            q.trim() ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/60" />
                <h3 className="mt-4 font-heading text-lg font-bold">Sonuç bulunamadı</h3>
                <p className="mt-2 text-sm text-muted-foreground">Aramanızla eşleşen bir rehber yazısı bulunamadı. Farklı bir kelime deneyebilir veya hizmetlerimizi inceleyebilirsiniz.</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button onClick={clearSearch} className="btn-outline">Tüm Yazıları Gör</button>
                  <Link to="/hizmetler" className="btn-secondary">Hizmetleri İncele</Link>
                  <a href={getWhatsAppLink(AREA_MSG)} target="_blank" rel="noopener noreferrer" className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Sor</a>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <p className="text-sm text-muted-foreground">Bu kategoride henüz yayınlanmış bir rehber yazısı bulunmuyor.</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button onClick={() => updateCat(null)} className="btn-outline">Tüm Yazıları Gör</button>
                  <Link to="/hizmetler" className="btn-secondary">Hizmetleri İncele</Link>
                  <a href={getWhatsAppLink(AREA_MSG)} target="_blank" rel="noopener noreferrer" className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Sor</a>
                </div>
              </div>
            )
          ) : null}
        </section>
      </div>

      <section className="bg-primary text-white">
        <div className="container-grid flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="heading-display max-w-2xl text-3xl sm:text-4xl">Bir Konuda mı Takıldınız?</h2>
          <p className="max-w-xl text-white/70">Yapılacak iş hakkında bilgi ve fiyat teklifi için Özal Usta'ya ulaşın. Fotoğraf göndererek ön bilgi alabilirsiniz.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={getWhatsAppLink(AREA_MSG)} target="_blank" rel="noopener noreferrer" data-cta="blog-final-whatsapp" onClick={() => trackCta("blog-final-whatsapp")} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Fotoğraf Gönder</a>
            <Link to="/teklif-al" className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent">Teklif Al</Link>
          </div>
        </div>
      </section>
    </article>
  );
}