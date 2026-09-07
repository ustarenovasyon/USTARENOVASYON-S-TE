import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import Logo from "@/components/common/Logo";
import { siteConfig, getPhoneLink } from "@/lib/siteConfig";
import { uiSettings } from "@/lib/uiSettings";
import { serviceCategories } from "@/lib/servicesData";
import { trackCta } from "@/lib/ctaTracking";
import MobileMenu from "@/components/layout/MobileMenu";

const navLinks = [
  { label: "Ana Sayfa", to: "/" },
  { label: "Hakkımızda", to: "/hakkimizda" },
  { label: "Hizmetler", to: "/hizmetler", dropdown: true },
  { label: "Hizmet Bölgeleri", to: "/hizmet-bolgeleri" },
  { label: "Blog", to: "/blog" },
  { label: "S.S.S.", to: "/sik-sorulan-sorular" },
  { label: "İletişim", to: "/iletisim" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all ${
          scrolled
            ? "border-white/10 bg-primary shadow-lg"
            : "border-transparent bg-primary/85 backdrop-blur"
        }`}
      >
        <div className="container-grid flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo variant="light" />

          <nav className="hidden items-center gap-5 lg:flex">
            {navLinks.map((l) =>
              l.dropdown ? (
                <div key={l.label} className="group relative">
                  <Link
                    to={l.to}
                    className="flex items-center gap-1 text-[13px] font-medium text-white/80 transition-colors hover:text-accent"
                  >
                    {l.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-64 rounded-xl border border-border bg-card p-2 shadow-xl">
                      {serviceCategories.map((c) => (
                        <Link
                          key={c.key}
                          to={`/hizmetler/${c.slug}`}
                          className="block rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                        >
                          {c.short}
                        </Link>
                      ))}
                      <Link
                        to="/hizmetler"
                        className="mt-1 block border-t border-border px-3 pt-2.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                      >
                        Tüm Hizmetler
                      </Link>
                    </div>
                  </div>
                </div>
              ) : l.to.startsWith("#") ? (
                <a
                  key={l.label}
                  href={l.to}
                  className="text-[13px] font-medium text-white/80 transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              ) : (
                <NavLink
                  key={l.label}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-[13px] font-medium transition-colors ${
                      isActive ? "text-accent" : "text-white/80 hover:text-accent"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={getPhoneLink()}
              data-cta="header-phone"
              onClick={() => trackCta("header-phone")}
              className="text-[13px] font-medium text-white/70 transition-colors hover:text-white"
            >
              {siteConfig.phone.display}
            </a>
            <a
              href={uiSettings.headerCtaHref}
              data-cta="header-quote"
              onClick={() => trackCta("header-quote")}
              className="btn-accent"
            >
              {uiSettings.headerCtaLabel}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menüyü aç"
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}