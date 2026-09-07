import React, { useRef } from "react";

// Yatay kaydırılabilir kategori filtre butonları.
// selected: aktif kategori slug (null = Tüm Yazılar).
// onChange: (slug|null) => void
export default function CategoryFilter({ categories = [], selected, onChange }) {
  const scrollRef = useRef(null);

  const items = [{ name: "Tüm Yazılar", slug: null }, ...categories];

  return (
    <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Blog kategorileri"
      >
        {items.map((c) => {
          const active = (c.slug || null) === selected;
          return (
            <button
              key={c.slug || "all"}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(c.slug || null)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                active
                  ? "border-accent bg-accent text-primary-foreground shadow-sm"
                  : "border-border bg-card text-primary hover:border-accent hover:text-accent"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}