import { hasConsent } from "@/lib/cookieConsent";

const KEY = "ur_local_cta_events_v1";

// GitHub-only sürüm: üçüncü taraf/backend olmadan, yalnızca izin verilmişse
// tarayıcıda son CTA olaylarını kısa süreli saklar. Hiçbir veri sunucuya gönderilmez.
export function trackCta(ctaId, extra = {}) {
  try {
    if (!hasConsent("analitik")) return;
    const current = JSON.parse(localStorage.getItem(KEY) || "[]");
    current.push({ cta: ctaId, ...extra, ts: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(current.slice(-100)));
  } catch {
    // Takip best-effort; kullanıcı deneyimini etkilemez.
  }
}
