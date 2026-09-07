import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Yeniden kullanılabilir Breadcrumb — BreadcrumbList Schema'yı sayfaya bir kez ekler.
// items: [{ name, to }] — son öğe mevcut sayfa (link olmadan).
export default function Breadcrumb({ items = [] }) {
  useEffect(() => {
    const origin = window.location.origin;
    const ld = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: it.to ? origin + it.to : window.location.href,
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.bcLd = "true";
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => script.remove();
  }, [items]);

  return (
    <div className="border-b border-border bg-card">
      <nav className="container-grid py-3 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((it, i) => (
            <li key={i} className="flex items-center gap-1">
              {it.to && i < items.length - 1 ? (
                <Link to={it.to} className="hover:text-accent">{it.name}</Link>
              ) : (
                <span className="text-foreground" aria-current="page">{it.name}</span>
              )}
              {i < items.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}