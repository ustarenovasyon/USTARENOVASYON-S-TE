import React, { useState } from "react";
import { List, ChevronDown } from "lucide-react";

// Otomatik içindekiler menüsü — H2 başlıklarından oluşturulur.
// sections: [{ id, label }]
// Sticky header yüksekliğini hesaba katar (scroll-margin via CSS scroll-mt-24).
export default function TableOfContents({ sections = [] }) {
  const [open, setOpen] = useState(false);
  if (sections.length < 2) return null;

  const handleClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="İçindekiler" className="rounded-xl border border-border bg-card p-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left lg:cursor-default"
      >
        <span className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-accent">
          <List className="h-4 w-4" /> Bu Yazıda
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform lg:hidden ${open ? "rotate-180" : ""}`} />
      </button>
      <ul className={`mt-3 space-y-1.5 text-sm ${open ? "block" : "hidden"} lg:block`}>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} onClick={(e) => handleClick(e, s.id)} className="block rounded px-2 py-1 text-muted-foreground hover:bg-accent/10 hover:text-accent">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}