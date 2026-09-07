import React from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight, Star } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatDate, readingTime } from "@/lib/blogUtils";

// Öne çıkan Blog yazısı — büyük, iki sütun (masaüstü), alt-alta (mobil).
export default function FeaturedPost({ post }) {
  if (!post) return null;
  const href = `/blog/${post.slug}`;
  const minutes = readingTime(post.content || post.summary);
  const date = formatDate(post.published_date || post.created_date);
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl">
      <div className={`grid ${post.cover_image ? "lg:grid-cols-2" : ""}`}>
        {post.cover_image && (
          <Link to={href} className="block overflow-hidden bg-muted" aria-label={post.title}>
            <div className="aspect-[16/9] w-full lg:h-full">
              <Image src={post.cover_image} alt={post.title} className="h-full w-full transition-transform duration-500 hover:scale-105" />
            </div>
          </Link>
        )}
        <div className={`flex flex-col justify-center p-6 lg:p-8 ${post.cover_image ? "" : "w-full"}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2.5 py-0.5 text-xs font-bold text-primary-foreground"><Star className="h-3 w-3" /> Öne Çıkan</span>
            {post.category_name && <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{post.category_name}</span>}
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold leading-tight sm:text-3xl">
            <Link to={href} className="transition-colors hover:text-accent">{post.title}</Link>
          </h2>
          {post.summary && <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{post.summary}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {minutes} dk okuma</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {date}</span>
          </div>
          <div className="mt-6">
            <Link to={href} className="btn-accent">Yazıyı Oku <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </article>
  );
}