import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { blogCategories, blogCategoryBySlug } from "@/lib/blogConfig";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogCard from "@/components/blog/BlogCard";

// Blog kategori sayfası — kategori, yazılar, ilgili hizmetler, diğer kategoriler.
export default function BlogCategory() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let a = true;
    const fallback = blogCategoryBySlug(slug);
    Promise.all([
      siteStore.entities.BlogCategory.filter({ slug, status: "published" }, "order", 1).catch(() => []),
      siteStore.entities.BlogPost.filter({ status: "published", category: slug }, "-published_date", 100).catch(() => []),
    ]).then(([c, p]) => {
      if (!a) return;
      setCat(c[0] || fallback);
      setPosts(p);
      setLoading(false);
      if (c[0] || fallback) {
        document.title = (c[0]?.seo_title || fallback?.seo_title || `${(c[0]?.name || fallback?.name)} | Usta Renovasyon`);
        const m = document.querySelector('meta[name="description"]');
        if (m) m.setAttribute("content", c[0]?.meta_description || fallback?.meta_description || "");
      }
    });
    return () => { a = false; };
  }, [slug]);

  if (!cat) {
    return (
      <div className="container-grid py-24 text-center">
        <h1 className="heading-display text-3xl">Kategori bulunamadı</h1>
        <Link to="/blog" className="btn-accent mt-6">Blog'a Dön</Link>
      </div>
    );
  }

  const msg = `Merhaba Özal Usta. Usta Renovasyon blogundaki ${cat.name} kategorisi hakkında bilgi almak istiyorum.`;
  const others = blogCategories.filter((c) => c.slug !== slug).slice(0, 8);

  return (
    <article>
      <Breadcrumb items={[{ name: "Ana Sayfa", to: "/" }, { name: "Blog", to: "/blog" }, { name: cat.name }]} />

      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid py-12 lg:py-16">
          <div className="max-w-2xl">
            <span className="section-eyebrow text-accent">Blog Kategorisi</span>
            <h1 className="heading-display mt-3 text-3xl sm:text-4xl">{cat.name}</h1>
            <p className="mt-4 text-white/70">{cat.description}</p>
            <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" data-cta="blogcat-whatsapp" onClick={() => trackCta("blogcat-whatsapp")} className="btn-accent mt-6"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Sor</a>
          </div>
        </div>
      </header>

      <div className="container-grid py-12 lg:py-16 space-y-14">
        <section>
          <h2 className="heading-display text-2xl">{cat.name} Yazıları</h2>
          {loading ? (
            <p className="mt-4 text-sm text-muted-foreground">Yazılar yükleniyor…</p>
          ) : posts.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">Bu kategoride henüz yayınlanmış yazı bulunmuyor. İçerikler hazırlanırken Özal Usta'ya danışabilirsiniz.</p>
              <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-accent mt-4"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Danış</a>
            </div>
          )}
        </section>

        <section>
          <h2 className="heading-display text-2xl">Diğer Blog Kategorileri</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((c) => (
              <Link key={c.slug} to={`/blog/kategori/${c.slug}`} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}