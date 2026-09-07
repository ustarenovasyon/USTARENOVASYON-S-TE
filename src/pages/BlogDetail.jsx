import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, ChevronRight, MessageCircle, Phone, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { siteStore } from "@/api/staticStore";
import { getWhatsAppLink, getPhoneLink, siteConfig } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import { slugifyTr, readingTime, formatDate } from "@/lib/blogUtils";
import { blogCategoryBySlug } from "@/lib/blogConfig";
import { Image } from "@/components/ui/image";
import Breadcrumb from "@/components/common/Breadcrumb";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogCard from "@/components/blog/BlogCard";
import SocialShare from "@/components/blog/SocialShare";
import { OzalNote, CtaBlock } from "@/components/blog/BlogBlocks";

const textOf = (children) => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  if (children?.props?.children) return textOf(children.props.children);
  return String(children || "");
};

// Blog detay sayfası — tek H1, içindekiler, markdown içerik, ilişkiler, Schema.
export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    let a = true;
    let scriptEl = null;
    setLoading(true);
    siteStore.entities.BlogPost.filter({ slug, status: "published" }, undefined, 1)
      .then(async (items) => {
        if (!a) return;
        const p = items[0] || null;
        setPost(p);
        if (!p) return;
        document.title = p.seo_title || `${p.title} | Usta Renovasyon`;
        const m = document.querySelector('meta[name="description"]');
        if (m && p.meta_description) m.setAttribute("content", p.meta_description);
        if (p.canonical) {
          let c = document.querySelector('link[rel="canonical"]');
          if (!c) { c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); }
          c.href = p.canonical;
        }
        // İlişkiler
        if (p.related_services?.length) {
          try { const s = await siteStore.entities.Service.filter({ status: "published" }, "order", 100); if (a) setServices(s.filter((x) => p.related_services.includes(x.slug))); } catch {}
        }
        if (p.related_posts?.length) {
          try { const rp = await siteStore.entities.BlogPost.filter({ status: "published" }, "-published_date", 50); if (a) setRelated(rp.filter((x) => p.related_posts.includes(x.slug) && x.id !== p.id).slice(0, 3)); } catch {}
        }
        // Schema: BlogPosting + FAQPage
        const minutes = readingTime(p.content);
        const ld = {
          "@context": "https://schema.org", "@type": "BlogPosting",
          headline: p.title, description: p.meta_description || p.summary,
          datePublished: p.published_date || p.created_date, dateModified: p.updated_date || p.published_date,
          author: { "@type": "Person", name: p.author || "Özal Usta" },
          publisher: { "@type": "Organization", name: "Usta Renovasyon", telephone: "+905360358898" },
          image: p.cover_image || undefined, mainEntityOfPage: window.location.href,
        };
        const ldFaq = p.faqs?.length ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) } : null;
        scriptEl = document.createElement("script");
        scriptEl.type = "application/ld+json";
        scriptEl.dataset.blogLd = "true";
        scriptEl.textContent = JSON.stringify([ld, ldFaq].filter(Boolean));
        document.head.appendChild(scriptEl);
      })
      .catch(() => a && setPost(null))
      .finally(() => a && setLoading(false));
    return () => { a = false; if (scriptEl) scriptEl.remove(); };
  }, [slug]);

  const tocSections = useMemo(() => {
    if (!post?.content) return [];
    return post.content.split("\n")
      .filter((l) => /^##\s+/.test(l))
      .map((l) => {
        const label = l.replace(/^##\s+/, "").replace(/[*_`]/g, "").trim();
        return { id: slugifyTr(label), label };
      });
  }, [post]);

  if (loading) return <div className="container-grid py-24 text-center text-sm text-muted-foreground">Yazı yükleniyor…</div>;

  if (!post) {
    return (
      <div className="container-grid py-24 text-center">
        <h1 className="heading-display text-3xl">Yazı bulunamadı</h1>
        <p className="mt-3 text-muted-foreground">Aradığınız yazı kaldırılmış veya henüz yayınlanmamış olabilir.</p>
        <Link to="/blog" className="btn-accent mt-6">Blog'a Dön</Link>
      </div>
    );
  }

  const minutes = readingTime(post.content);
  const catName = post.category_name || blogCategoryBySlug(post.category)?.name || "Blog";
  const msg = `Merhaba Özal Usta. Usta Renovasyon web sitenizdeki "${post.title}" yazısını okudum${services[0] ? ` ve ${services[0].name} hizmeti` : ""} hakkında bilgi almak istiyorum.`;

  return (
    <article>
      <Breadcrumb items={[{ name: "Ana Sayfa", to: "/" }, { name: "Blog", to: "/blog" }, { name: catName, to: `/blog/kategori/${post.category}` }, { name: post.title }]} />

      <header className="border-b border-border bg-primary text-white">
        <div className="container-grid py-10 lg:py-14">
          <Link to={`/blog/kategori/${post.category}`} className="inline-flex rounded-md bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">{catName}</Link>
          <h1 className="heading-display mt-4 max-w-3xl text-3xl sm:text-4xl">{post.title}</h1>
          {post.summary && <p className="mt-4 max-w-2xl text-white/70">{post.summary}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {post.author || "Özal Usta"}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {formatDate(post.published_date)}</span>
            {post.updated_date && <span className="flex items-center gap-1.5">Son güncelleme: {formatDate(post.updated_date)}</span>}
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {minutes} dakikalık okuma</span>
          </div>
        </div>
      </header>

      <div className="container-grid py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0">
            {post.cover_image && (
              <div className="overflow-hidden rounded-2xl border border-border">
                <Image src={post.cover_image} alt={post.title} className="aspect-[16/9] w-full" />
              </div>
            )}

            {/* Mobilde içindekiler */}
            <div className="mt-6 lg:hidden"><TableOfContents sections={tocSections} /></div>

            <div className="prose-custom mt-8 max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => <h2 id={slugifyTr(textOf(children))} className="heading-display scroll-mt-24 mt-10 text-2xl">{children}</h2>,
                  h3: ({ children }) => <h3 className="font-heading mt-6 text-lg font-bold">{children}</h3>,
                  p: ({ children }) => <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{children}</p>,
                  ul: ({ children }) => <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground sm:text-base">{children}</ul>,
                  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground sm:text-base">{children}</ol>,
                  a: ({ href, children }) => href?.startsWith("/") ? <Link to={href} className="text-accent hover:underline">{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{children}</a>,
                  blockquote: ({ children }) => <blockquote className="mt-6 border-l-4 border-accent bg-card p-4 text-sm">{children}</blockquote>,
                  img: ({ src, alt }) => <span className="my-6 block"><Image src={src} alt={alt || ""} className="rounded-xl" fittingType="fit" /></span>,
                }}
              >
                {post.content || ""}
              </ReactMarkdown>
            </div>

            <OzalNote>Uygun uygulama yöntemi yüzeyin ve yapının mevcut durumu incelendikten sonra belirlenmelidir. Net bilgi ve fiyat için yapılacak alanın fotoğraflarını WhatsApp üzerinden gönderebilirsiniz.</OzalNote>

            <CtaBlock message={msg} />

            {services.length > 0 && (
              <section className="mt-10">
                <h2 className="heading-display text-2xl">İlgili Hizmetler</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <Link key={s.id} to={`/hizmetler/${s.slug}`} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent">
                      <span className="font-medium">{s.name}</span><ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {post.faqs?.length > 0 && (
              <section className="mt-10">
                <h2 className="heading-display text-2xl">Sık Sorulan Sorular</h2>
                <div className="mt-4 space-y-3">
                  {post.faqs.map((f, i) => (
                    <details key={i} className="rounded-xl border border-border bg-card px-5">
                      <summary className="cursor-pointer py-4 text-base font-semibold">{f.q}</summary>
                      <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="heading-display text-2xl">İlgili Yazılar</h2>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <BlogCard key={p.id} post={p} />)}</div>
              </section>
            )}

            {/* Yazar kutusu */}
            <section className="mt-12 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white"><User className="h-5 w-5" /></div>
                <div>
                  <p className="font-heading font-bold">{post.author || "Özal Usta"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Usta Renovasyon — Bornova / İzmir. Boya, alçı, sıva, izolasyon ve tadilat hizmetleri. İletişim: {siteConfig.phone.display}.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" data-cta="blog-author-whatsapp" onClick={() => trackCta("blog-author-whatsapp")} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                    <a href={getPhoneLink()} className="btn-outline"><Phone className="h-4 w-4" /> Ara</a>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Paylaş:</span>
              <SocialShare title={post.title} />
            </div>
          </div>

          {/* Masaüstü içindekiler + CTA */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <TableOfContents sections={tocSections} />
              <div className="rounded-xl border border-border bg-primary p-5 text-white">
                <p className="text-sm font-semibold">Bu konu hakkında teklif alın.</p>
                <a href={getWhatsAppLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-accent mt-3 w-full"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                <a href={getPhoneLink()} className="btn-outline mt-2 w-full border-white/20 text-white hover:border-accent hover:text-accent"><Phone className="h-4 w-4" /> Ara</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}