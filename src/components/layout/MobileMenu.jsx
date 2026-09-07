import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { uiSettings } from "@/lib/uiSettings";
import { CallButton, WhatsAppButton } from "@/components/common/ContactActions";
import SocialLinks from "@/components/common/SocialLinks";

const navLinks = [
  { label: "Ana Sayfa", to: "/" },
  { label: "Hakkımızda", to: "/hakkimizda" },
  { label: "Hizmetler", to: "/hizmetler" },
  { label: "Hizmet Bölgeleri", to: "/hizmet-bolgeleri" },
  { label: "Blog", to: "/blog" },
  { label: "Sık Sorulan Sorular", to: "/sik-sorulan-sorular" },
  { label: "İletişim", to: "/iletisim" },
];

// Sağdan açılan mobil çekmece menü — arka plan karartma, scroll kilidi, ESC ile kapanma.
export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobil menü"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-primary text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="font-heading text-sm font-bold uppercase tracking-wider">Menü</span>
          <button
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {navLinks.map((l) =>
            l.to.startsWith("#") ? (
              <a
                key={l.label}
                href={l.to}
                onClick={onClose}
                className="block rounded-lg px-3 py-4 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-accent"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                onClick={onClose}
                className="block rounded-lg px-3 py-4 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-accent"
              >
                {l.label}
              </Link>
            )
          )}
          <a
            href="#teklif-al"
            onClick={onClose}
            className="mt-2 block rounded-lg bg-accent px-3 py-4 text-center text-base font-bold text-primary"
          >
            {uiSettings.headerCtaLabel}
          </a>
        </nav>

        <div className="border-t border-white/10 px-5 py-4" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}>
          <p className="mb-3 text-sm font-medium text-white/60">{siteConfig.phone.display}</p>
          <div className="flex flex-col gap-2.5">
            <CallButton className="btn-accent w-full" ctaId="mobile-menu-call" />
            <WhatsAppButton
              className="btn-outline w-full border-white/20 text-white hover:border-accent hover:text-accent"
              ctaId="mobile-menu-whatsapp"
              label="WhatsApp'tan Yaz"
            />
          </div>
          {/* Sosyal Medya — yalnızca Instagram/Facebook, iletişim kanallarından ayrı */}
          <SocialLinks title="Sosyal Medya" size="sm" className="mt-4 border-t border-white/10 pt-4" />
        </div>
      </div>
    </div>
  );
}