// ============================================================================
// USTA RENOVASYON — MERKEZİ TEKNİK SEO AYARLARI (Part 10)
// Tek SEO kaynağı: başlık ayırıcı, varsayılan başlık/açıklama, alan adı,
// doğrulama/analytics kimlikleri (boşsa hiç eklenmez), sosyal ayarlar.
// Yönetim paneli (Part 11) bu değerleri okuyup düzenleyebilir.
// Sahte doğrulama kodu veya analytics kimliği YOKTUR — boş bırakılır.
// ============================================================================

export const seoConfig = {
  siteName: "Usta Renovasyon",
  // Ana alan adı — tek HTTPS alan adı. Farklıysa yönetim panelinden değiştirilir.
  siteUrl: "https://ustarenovasyon.com",
  separator: "|",
  language: "tr",
  locale: "tr_TR",

  defaultTitle: "Usta Renovasyon | İzmir Boya, Alçı ve Tadilat Ustası",
  defaultDescription:
    "Bornova ve İzmir genelinde iç-dış cephe boya, alçı, sıva, çatı izolasyonu, su yalıtımı, mantolama ve anahtar teslim tadilat hizmetleri. Özal Usta: 0536 035 88 98.",

  // Marka/paylaşım görseli — yönetici tanımlayana kadar boş (etiket eklenmez).
  defaultOgImage: "",
  logoUrl: "",

  // Sosyal — yalnızca gerçek hesap varsa doldurulur.
  twitterCard: "summary_large_image",
  twitterSite: "", // @kullanici yoksa boş

  // Arama motoru doğrulama kodları — boşsa etiket eklenmez.
  googleVerification: "",
  bingVerification: "",
  yandexVerification: "",

  // Analitik — kimlik girilmeden script ÇALIŞMAZ.
  ga4MeasurementId: "",
  gtmContainerId: "",

  // Tarama/indeks varsayılanları.
  robotsDefault: "index, follow",
  sitemapEnabled: true,
  schemaEnabled: true,
  defaultIndex: true,
};

// Sayfa başlığı üretici: "Sayfa Adı | Usta Renovasyon"
export function buildTitle(pageTitle) {
  if (!pageTitle) return seoConfig.defaultTitle;
  return `${pageTitle} ${seoConfig.separator} ${seoConfig.siteName}`;
}

// Slug üretici — Türkçe karakterleri güvenli karakterlere çevirir.
export function slugifyTr(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Yol temizleme: sorgu/UTM/filtre parametrelerini canonical için atar.
export function cleanPath(pathname) {
  if (!pathname) return "/";
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}