// Blog yardımcıları — okuma süresi, tarih biçimlendirme, başlık slugify.

// Türkçe karakterleri destekleyen slug üretici.
export function slugifyTr(text = "") {
  const map = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", Ö: "o", Ş: "s", Ü: "u" };
  return String(text)
    .trim()
    .replace(/[çğıİöşüÇĞÖŞÜ]/g, (m) => map[m] || m)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// İçeriğe göre tahmini okuma süresi (dakika). Çok kısa içerikte 1 döner.
export function readingTime(content = "") {
  const words = String(content).trim().split(/\s+/).filter(Boolean).length;
  if (!words) return 1;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}