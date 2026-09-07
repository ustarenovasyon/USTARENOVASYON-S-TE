// ============================================================================
// USTA RENOVASYON — SCHEMA.ORG YAPISAL VERİ ÜRETECİ (Part 10)
// Tüm yapısal veriler buradan üretilir: tek tutarlı işletme kimliği (@id),
// sayfada görünen bilgilerle uyumlu, gerçek veri, sahte fiyat/adres yok.
// ============================================================================

import { siteConfig } from "@/lib/siteConfig";
import { seoConfig } from "@/lib/seoConfig";

const SITE = seoConfig.siteUrl;
export const ORG_ID = `${SITE}/#organization`;

// Tek tutarlı işletme kaydı — HomeAndConstructionBusiness (LocalBusiness alt türü).
// Tam ikamet adresi kamuya açık olduğu için (siteConfig.address.showFull) dahil edilir;
// gizli olsaydı Schema'ya eklenmezdi.
export function localBusinessSchema(socialLinks = []) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORG_ID,
    name: siteConfig.brandName,
    alternateName: siteConfig.principal,
    telephone: siteConfig.phone.intl,
    email: siteConfig.email,
    url: SITE,
    description: seoConfig.defaultDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bornova",
      addressRegion: "İzmir",
      addressCountry: "TR",
    },
    areaServed: [
      { "@type": "City", name: "Bornova" },
      { "@type": "AdministrativeArea", name: "İzmir" },
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "20:00" },
    ],
    contactPoint: [
      { "@type": "ContactPoint", telephone: siteConfig.phone.intl, contactType: "customer service", areaServed: "TR", availableLanguage: "Turkish" },
    ],
  };
  if (siteConfig.address.showFull) {
    schema.address.streetAddress = "Mevlana Mahallesi 1707/11 Sokak No:2";
  }
  // sameAs — yalnızca gerçek ve aktif sosyal profil URL'leri (Part 22).
  // Dinamik liste varsa onu kullan; yoksa statik siteConfig fallback (boşsa eklenmez).
  const sameAs = (socialLinks && socialLinks.length
    ? socialLinks.map((s) => s.url).filter(Boolean)
    : [siteConfig.social.instagram, siteConfig.social.facebook].filter(Boolean));
  if (sameAs.length) schema.sameAs = sameAs;
  if (seoConfig.logoUrl) schema.logo = seoConfig.logoUrl;
  if (seoConfig.defaultOgImage) schema.image = seoConfig.defaultOgImage;
  return schema;
}

// Özal Usta — yalnızca gerçek, kamuya açık bilgiler. Doğum/eğitim/ödül/unvan YOK.
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Özal Usta",
    jobTitle: "Usta",
    url: `${SITE}/hakkimizda`,
    worksFor: { "@id": ORG_ID },
  };
}

// Hizmet sayfası — sahte fiyat YOK.
export function serviceSchema(s) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/hizmetler/${s.slug}`,
    name: s.name,
    serviceType: s.name,
    url: `${SITE}/hizmetler/${s.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Bornova" },
      { "@type": "AdministrativeArea", name: "İzmir" },
    ],
  };
  if (s.description || s.short_description) schema.description = s.description || s.short_description;
  if (s.cover_image) schema.image = s.cover_image;
  return schema;
}

// Blog yazısı — tarih gerçeği yansıtır; yalnızca gerçek bilgilerle.
export function blogPostingSchema(p) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE}/blog/${p.slug}`,
    headline: p.title,
    author: { "@type": "Person", name: p.author || "Özal Usta", url: `${SITE}/hakkimizda` },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${p.slug}` },
  };
  if (p.summary) schema.description = p.summary;
  if (p.published_date) schema.datePublished = p.published_date;
  if (p.updated_date) schema.dateModified = p.updated_date;
  if (p.cover_image) schema.image = p.cover_image;
  else if (seoConfig.defaultOgImage) schema.image = seoConfig.defaultOgImage;
  return schema;
}

// FAQPage — yalnızca sayfada görünen sorular.
export function faqPageSchema(items) {
  if (!items || !items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

// BreadcrumbList — sayfada görünen gezinmeyle aynı sıra.
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.url}`,
    })),
  };
}

// WebPage / AboutPage / ContactPage — işletme kimliğine bağlı.
export function webPageSchema({ type = "WebPage", title, description, path }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE}${path}`,
    name: title,
    url: `${SITE}${path}`,
    publisher: { "@id": ORG_ID },
  };
  if (description) schema.description = description;
  return schema;
}

// ImageObject — kamuya açık görseller için.
export function imageObjectSchema({ url, caption, contentUrl }) {
  const schema = { "@context": "https://schema.org", "@type": "ImageObject" };
  schema.contentUrl = contentUrl || url;
  if (url) schema.url = url;
  if (caption) schema.caption = caption;
  return schema;
}