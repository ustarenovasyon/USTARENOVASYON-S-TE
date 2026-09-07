import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { seoConfig, cleanPath } from "@/lib/seoConfig";
import { localBusinessSchema } from "@/lib/schemaBuilder";
import { fetchActiveSocialLinks } from "@/lib/socialLinks";

const OWNER = "usta-seo";

// Head öğesi güncelle/oluştur — var olanı günceller, yoksa oluşturup sahiplenir.
function upsertMeta(attr, key, content) {
  if (!content && content !== "") return null;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute("data-seo-owner", OWNER);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}
function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute("data-seo-owner", OWNER);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// JSON-LD enjekte bileşeni — id'ye göre temizlenir, çoğaltma olmaz.
export function SchemaJsonLd({ id, data }) {
  const serialized = JSON.stringify(data);
  useEffect(() => {
    document.head
      .querySelectorAll(`script[data-jsonld-id="${id}"]`)
      .forEach((s) => s.remove());
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-owner", OWNER);
    script.setAttribute("data-jsonld-id", id);
    script.text = serialized;
    document.head.appendChild(script);
    return () => script.remove();
  }, [id, serialized]);
  return null;
}

// Layout düzeyi global SEO: canonical, robots, OG/Twitter varsayılanları,
// sayfa başlığı/açıklamasından türetilen OG etiketleri ve global LocalBusiness.
// Sayfa başlığı/description sayfalar tarafından atanır; burada yalnızca
// canonical, robots, OG site bilgileri ve türetme yapılır (çakışma yok).
export function SiteSeoDefaults() {
  const location = useLocation();
  const [socialLinks, setSocialLinks] = useState([]);

  // Aktif sosyal medya bağlantıları — şema sameAs alanı için bir kez çekilir.
  useEffect(() => {
    let active = true;
    fetchActiveSocialLinks().then((items) => active && setSocialLinks(items)).catch(() => active && setSocialLinks([]));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const pathname = cleanPath(location.pathname);
    const canonical = seoConfig.siteUrl + (pathname === "/" ? "/" : pathname);

    upsertLink("canonical", canonical);
    upsertMeta("property", "og:url", canonical);

    // Filtre/arama/UTM parametreli ve admin yolları noindex.
    const hasQuery = Boolean(location.search);
    const noindex = pathname.startsWith("/seo-yonetimi") || pathname.startsWith("/yonetim") || hasQuery;
    upsertMeta("name", "robots", noindex ? "noindex, follow" : seoConfig.robotsDefault);

    // Site düzeyi OG/Twitter sabitleri.
    upsertMeta("property", "og:site_name", seoConfig.siteName);
    upsertMeta("property", "og:locale", seoConfig.locale);
    upsertMeta("name", "twitter:card", seoConfig.twitterCard);
    if (seoConfig.twitterSite) upsertMeta("name", "twitter:site", seoConfig.twitterSite);

    // Sayfa başlığı + açıklamasından OG/Twitter başlık/açıklaması türet.
    const title = document.title || seoConfig.defaultTitle;
    let descEl = document.head.querySelector('meta[name="description"]');
    let desc = descEl ? descEl.getAttribute("content") : "";
    if (!desc) {
      upsertMeta("name", "description", seoConfig.defaultDescription);
      desc = seoConfig.defaultDescription;
    }
    upsertMeta("property", "og:title", title);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("property", "og:description", desc);
    upsertMeta("name", "twitter:description", desc);

    // Varsayılan paylaşım görseli — yalnızca tanımlıysa ve sayfa kendi görselini atmamışsa.
    if (seoConfig.defaultOgImage) {
      if (!document.head.querySelector('meta[property="og:image"]')) upsertMeta("property", "og:image", seoConfig.defaultOgImage);
      if (!document.head.querySelector('meta[name="twitter:image"]')) upsertMeta("name", "twitter:image", seoConfig.defaultOgImage);
    }

    // Doğrulama kodları — yalnızca girilmişse.
    if (seoConfig.googleVerification) upsertMeta("name", "google-site-verification", seoConfig.googleVerification);
    if (seoConfig.bingVerification) upsertMeta("name", "msvalidate.01", seoConfig.bingVerification);
  }, [location.pathname, location.search]);

  // Global LocalBusiness — tek tutarlı işletme kimliği tüm sayfalarda.
  return <SchemaJsonLd id="global-business" data={localBusinessSchema(socialLinks)} />;
}