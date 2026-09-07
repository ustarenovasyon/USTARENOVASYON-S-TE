import { getWhatsAppLink } from "@/lib/siteConfig";

const LABELS = {
  request_number: "Talep No",
  request_type: "Talep Türü",
  name: "Ad Soyad",
  phone: "Telefon",
  email: "E-posta",
  service: "Hizmet",
  district: "İlçe",
  neighborhood: "Mahalle",
  address: "Adres",
  description: "Açıklama",
  notes: "Not",
  contact_method: "İletişim Tercihi",
  contact_preference: "İletişim Tercihi",
  contact_time: "Uygun İletişim Zamanı",
  preferred_days: "Tercih Edilen Günler",
  preferred_date_1: "1. Tarih Tercihi",
  preferred_date_2: "2. Tarih Tercihi",
  preferred_time: "Saat Tercihi",
  urgency: "Aciliyet",
  area_types: "Alan Türleri",
  area_usage: "Alan Kullanımı",
  approx_size: "Yaklaşık Ölçü",
  room_count: "Oda Sayısı",
  floor_count: "Kat Sayısı",
  issues: "Mevcut Sorunlar",
  video_url: "Video Bağlantısı",
};

const HIDDEN = new Set([
  "status", "priority", "kvkk", "marketing_consent", "photo_consent",
  "source_page", "source_service", "source_project", "referer", "tags",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "admin_notes", "website", "dont_know_size",
]);

function cleanValue(key, value) {
  if (value == null || value === "" || value === false) return "";
  if (key === "photo_urls") {
    const count = Array.isArray(value) ? value.length : 0;
    return count ? `${count} fotoğraf seçildi (WhatsApp açıldıktan sonra fotoğrafları ayrıca ekleyiniz)` : "";
  }
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  if (typeof value === "object") return "";
  return String(value).trim();
}

export function buildRequestMessage(payload = {}) {
  const lines = ["Merhaba Özal Usta. Usta Renovasyon web sitesindeki formu doldurdum.", ""];
  Object.entries(payload).forEach(([key, raw]) => {
    if (HIDDEN.has(key)) return;
    const value = cleanValue(key, raw);
    if (!value) return;
    lines.push(`${LABELS[key] || key}: ${value}`);
  });
  lines.push("", "Bu bilgilerle ilgili benimle iletişime geçebilir misiniz?");
  return lines.join("\n");
}

export function deliverRequestToWhatsApp(payload = {}) {
  const url = getWhatsAppLink(buildRequestMessage(payload));
  if (typeof window !== "undefined") {
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  }
  return {
    id: payload.request_number || `wa-${Date.now()}`,
    request_number: payload.request_number || "",
    delivery: "whatsapp",
    url,
  };
}
