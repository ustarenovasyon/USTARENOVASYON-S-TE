import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Yasal sayfalar için ortak düzen — breadcrumb + başlık + içerik.
export default function LegalLayout({ title, seoTitle, children }) {
  React.useEffect(() => {
    document.title = seoTitle || `${title} | Usta Renovasyon`;
    return () => { document.title = "Usta Renovasyon | İzmir Boya, Alçı, Tadilat ve İzolasyon Ustası"; };
  }, [title, seoTitle]);

  return (
    <article>
      <div className="border-b border-border bg-card">
        <div className="container-grid py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">Ana Sayfa</Link>
          <ChevronRight className="mx-1 inline h-3 w-3" />
          <span className="text-foreground">{title}</span>
        </div>
      </div>
      <div className="container-grid py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-display text-3xl">{title}</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
          <p className="mt-8 text-xs text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>
        </div>
      </div>
    </article>
  );
}