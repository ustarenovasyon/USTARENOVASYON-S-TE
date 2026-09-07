import React from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

// Hizmet sayfaları için "Bu Sayfada" içindekiler menüsü.
// Mobilde yatay kaydırılan bölüm bağlantıları, masaüstünde sticky yan menü.
// Yalnızca gerçek bölüm kimliklerine bağlanır — boş bağlantı bırakmaz.
export default function PageToc({ items }) {
  const ids = items.map((i) => i.id);
  const activeId = useActiveSection(ids);

  if (!items.length) return null;

  const linkCls = (id) =>
    `block rounded-md px-3 py-1.5 text-sm transition-colors ${
      activeId === id
        ? "bg-accent/10 font-semibold text-accent"
        : "text-muted-foreground hover:bg-accent/5 hover:text-accent"
    }`;

  return (
    <nav aria-label="Bu sayfadaki bölümler">
      {/* Masaüstü: dikey yan menü */}
      <div className="hidden lg:block">
        <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-accent">Bu Sayfada</h3>
        <ul className="mt-3 space-y-0.5 border-l border-border">
          {items.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className={`${linkCls(t.id)} -ml-px border-l-2 ${activeId === t.id ? "border-accent" : "border-transparent"}`} aria-current={activeId === t.id ? "location" : undefined}>
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobil: yatay kaydırılan bölüm bağlantıları */}
      <div className="lg:hidden">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Bu Sayfada</p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors ${
                activeId === t.id
                  ? "border-accent bg-accent font-semibold text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-accent hover:text-accent"
              }`}
              aria-current={activeId === t.id ? "location" : undefined}
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}