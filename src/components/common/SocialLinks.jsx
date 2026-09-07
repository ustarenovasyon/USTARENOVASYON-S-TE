import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Youtube, Twitter, Linkedin, Share2 } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { fetchActiveSocialLinks, PLATFORM_META } from "@/lib/socialLinks";

// Platform → lucide ikon eşlemesi. Lucide'de olmayan platformlar Share2 fallback.
const ICON_MAP = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  x: Twitter,
  linkedin: Linkedin,
};

// Merkezi sosyal medya ikonları — yalnızca gerçek URL'ye sahip aktif hesapları gösterir.
// Hiç aktif hesap yoksa (veya yüklenirken) hiçbir şey render edilmez: boş ikon/boş başlık bırakmaz.
//
// Props:
//  - title: opsiyonel başlık (varsa aktif hesaplarla birlikte gösterilir)
//  - description: opsiyonel açıklama metni
//  - variant: "light" (koyu zemin, beyaz ikon) | "solid" (marka rengi arka plan)
//  - size: "sm" | "md" ikon boyutu
//  - className: dış sarmalayıcı sınıf
export default function SocialLinks({ title, description, variant = "light", className = "", size = "md" }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = () => fetchActiveSocialLinks().then((items) => active && setLinks(items)).catch(() => active && setLinks([])).finally(() => active && setLoading(false));
    load();
    // Yönetim panelinden eklenen/düzenlenen/silen hesaplar anında yansısın.
    const unsubscribe = siteStore.entities.SocialLink.subscribe(() => { load(); });
    return () => { active = false; if (typeof unsubscribe === "function") unsubscribe(); };
  }, []);

  if (loading || links.length === 0) return null;

  const sizeCls = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className={className}>
      {title && <p className="font-heading text-xs font-bold uppercase tracking-wider text-accent">{title}</p>}
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      <ul className={`flex flex-wrap items-center gap-3 ${title || description ? "mt-3" : ""}`}>
        {links.map((l) => {
          const meta = PLATFORM_META[l.platform] || { label: l.platform, ariaLabel: `${l.platform} hesabını aç` };
          const Icon = ICON_MAP[l.platform] || Share2;
          const baseCls =
            variant === "solid"
              ? "text-white hover:brightness-110"
              : "text-white/80 hover:text-white";
          return (
            <li key={l.id}>
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={meta.ariaLabel}
                title={meta.label}
                className={`inline-flex ${sizeCls} items-center justify-center rounded-lg border border-white/15 bg-white/5 transition-colors hover:border-accent hover:bg-white/10 ${baseCls}`}
              >
                <Icon className={iconSize} aria-hidden="true" />
                <span className="sr-only">{meta.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}