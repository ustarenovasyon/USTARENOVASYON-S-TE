import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { getWhatsAppLink } from "@/lib/siteConfig";
import Reveal from "@/components/common/Reveal";
import BlogCard from "@/components/blog/BlogCard";

const AREA_MSG = "Merhaba Özal Usta. Blog üzerinden ulaştım, bir konu hakkında bilgi almak istiyorum.";

// Ana sayfa blog ön izlemesi — merkezi BlogPost sisteminden dinamik.
// Boş durumda "Hazırlanıyor" kartı yerine yalnızca geçiş bağlantısı gösterilir.
export default function BlogPreview() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let a = true;
    siteStore.entities.BlogPost.filter({ status: "published", show_on_homepage: true }, "-published_date", 3)
      .then((items) => { if (a) { setPosts(items); setLoading(false); } })
      .catch(() => { if (a) setLoading(false); });
    return () => { a = false; };
  }, []);

  return (
    <section id="blog" className="bg-card">
      <div className="container-grid py-10 lg:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Rehber</span>
          <h2 className="heading-display mt-2 text-2xl sm:text-3xl">Tadilat ve Dekorasyon Rehberi</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Boya, tadilat, izolasyon ve dekorasyon hakkında faydalı bilgiler ve uygulama önerileri.
          </p>
        </Reveal>

        {posts.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => <Reveal key={p.id} delay={i * 60} className="h-full"><BlogCard post={p} className="h-full" /></Reveal>)}
          </div>
        )}

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/blog" className="btn-navy">Tüm Yazıları Gör <ArrowRight className="h-4 w-4" /></Link>
          <a href={getWhatsAppLink(AREA_MSG)} target="_blank" rel="noopener noreferrer" className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Sor</a>
        </div>
      </div>
    </section>
  );
}