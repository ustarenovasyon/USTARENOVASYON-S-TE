import React from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatDate, readingTime } from "@/lib/blogUtils";

// Blog kartı — kapak, kategori, başlık, özet, tarih, okuma süresi.
export default function BlogCard({ post, className = "" }) {
  const href = `/blog/${post.slug}`;
  const date = formatDate(post.published_date || post.created_date);
  const minutes = readingTime(post.content || post.summary);
  return (
    <article className={`group flex flex-col rounded-xl border border-border bg-card transition-all hover:border-accent/40 hover:shadow-md ${className}`}>
      {post.cover_image && (
        <Link to={href} className="block overflow-hidden" aria-label={post.title}>
          <div className="aspect-[16/9] w-full bg-muted">
            <Image src={post.cover_image} alt={post.title} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
          </div>
        </Link>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs">
          {post.category_name && <span className="rounded-md bg-accent/10 px-2 py-0.5 font-semibold text-accent">{post.category_name}</span>}
          <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {minutes} dk</span>
        </div>
        <h3 className="mt-2 font-heading text-base font-bold leading-snug">
          <Link to={href} className="transition-colors hover:text-accent">{post.title}</Link>
        </h3>
        {post.summary && <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{post.summary}</p>}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {date || "Taslak"}</span>
          <Link to={href} className="inline-flex items-center gap-1 font-semibold text-primary hover:text-accent">Yazıyı Oku <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
    </article>
  );
}