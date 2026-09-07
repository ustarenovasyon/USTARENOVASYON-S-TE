import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MessageCircle, Phone } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { faqCategories } from "@/lib/faqConfig";
import { getWhatsAppLink, getPhoneLink } from "@/lib/siteConfig";
import Breadcrumb from "@/components/common/Breadcrumb";
import FaqAccordion from "@/components/faq/FaqAccordion";

const ASK_MSG = "Merhaba Özal Usta. Web sitenizdeki SSS bölümünden ulaştım, bir sorum var.";

// SSS ana sayfası — arama, kategori filtresi, akordeon, FAQPage Schema.
export default function Sss() {
  const [faqs, setFaqs] = useState([]);
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("Tümü");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let a = true;
    document.title = "Tadilat ve Renovasyon Hakkında Sık Sorulan Sorular | Usta Renovasyon";
    siteStore.entities.Faq.filter({ status: "published", show_on_sss: true }, "order", 200)
      .then((items) => { if (a) { setFaqs(items); setLoading(false); } })
      .catch(() => { if (a) setLoading(false); });
    return () => { a = false; };
  }, []);

  // FAQPage Schema — yalnızca sayfada görünen sorular.
  useEffect(() => {
    if (!faqs.length) return;
    const visible = filter();
    if (!visible.length) return;
    const ld = {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: visible.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.faqLd = "true";
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => script.remove();
     
  }, [faqs, q, activeCat]);

  const filter = () => {
    let list = faqs;
    if (activeCat !== "Tümü") list = list.filter((f) => f.category === activeCat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((f) => [f.question, f.answer, f.category, (f.related_services || []).join(" ")].join(" ").toLowerCase().includes(s));
    }
    return list;
  };

  const visible = filter();
  const cats = ["Tümü", ...faqCategories.filter((c) => faqs.some((f) => f.category === c))];

  return (
    <article>
      <Breadcrumb items={[{ name: "Ana Sayfa", to: "/" }, { name: "Sık Sorulan Sorular" }]} />

      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid py-12 lg:py-16">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-accent">S.S.S.</span>
            <h1 className="heading-display mt-3 text-3xl sm:text-4xl">Tadilat ve Renovasyon Hakkında Sık Sorulan Sorular</h1>
            <p className="mt-4 text-white/70">Boya, alçı, sıva, izolasyon, tadilat, keşif, fiyatlandırma ve hizmet bölgeleri hakkında sık sorulan soruların cevaplarını inceleyin.</p>
          </div>
          <div className="mt-8 max-w-xl">
            <label htmlFor="sss-search" className="sr-only">Sorunuzu arayın</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5">
              <Search className="h-4 w-4 text-white/60" />
              <input id="sss-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Sorunuzu arayın..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40" />
            </div>
          </div>
        </div>
      </header>

      <div className="container-grid py-12 lg:py-16">
        {/* Kategori filtresi */}
        {cats.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} type="button" onClick={() => setActiveCat(c)}
                className={`rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors ${activeCat === c ? "border-accent bg-accent text-primary-foreground" : "border-border bg-card hover:border-accent"}`}>
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-10">
          {loading ? (
            <p className="text-sm text-muted-foreground">Sorular yükleniyor…</p>
          ) : visible.length > 0 ? (
            faqCategories.map((cat) => {
              const items = visible.filter((f) => f.category === cat);
              if (!items.length) return null;
              return (
                <section key={cat}>
                  <h2 className="heading-display text-xl">{cat}</h2>
                  <div className="mt-4"><FaqAccordion items={items.map((f) => ({ q: f.question, a: f.answer }))} /></div>
                </section>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <p className="text-sm text-muted-foreground">Aradığınız sorunun cevabını bulamadınız mı? Özal Usta'ya WhatsApp üzerinden sorabilirsiniz.</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a href={getWhatsAppLink(ASK_MSG)} target="_blank" rel="noopener noreferrer" className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Sor</a>
                <a href={getPhoneLink()} className="btn-outline"><Phone className="h-4 w-4" /> Hemen Ara</a>
                <Link to="/iletisim" className="btn-secondary">İletişim Sayfası</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}