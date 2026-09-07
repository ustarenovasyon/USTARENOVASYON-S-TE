import { useEffect, useState } from "react";

// "Bu Sayfada" menüsü için aktif bölüm takibi — IntersectionObserver ile verimli çalışır.
// ids: izlenecek bölüm kimlikleri dizisi
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!ids || ids.length === 0) return;
    const key = ids.join(",");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-130px 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids.join(",")]);

  return activeId;
}