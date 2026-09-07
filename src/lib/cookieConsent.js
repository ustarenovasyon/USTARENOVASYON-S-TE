// Çerez izni yönetimi — localStorage tabanlı, sürümlü.
// Kategoriler: zorunlu (her zaman), islevsel, analitik, pazarlama.
// Analytics yalnızca analitik izni verilince çalışır.

export const COOKIE_VERSION = "1.0.0";
export const COOKIE_KEY = "ur_cookie_consent";

export const COOKIE_CATEGORIES = [
  { id: "zorunlu", label: "Zorunlu Çerezler", desc: "Site temel işlevleri için gereklidir. Kapatılamaz.", required: true },
  { id: "islevsel", label: "İşlevsel Çerezler", desc: "Tercihlerin hatırlanması için. İsteğe bağlı.", required: false },
  { id: "analitik", label: "Analitik Çerezler", desc: "Ziyaretçi davranışını anonim ölçer (Google Analytics).", required: false },
  { id: "pazarlama", label: "Pazarlama Çerezleri", desc: "Reklam ve yeniden pazarlama sistemleri için.", required: false },
];

export function getConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.version !== COOKIE_VERSION) return { ...data, stale: true };
    return data;
  } catch { return null; }
}

export function setConsent(choices) {
  const data = {
    version: COOKIE_VERSION,
    choices: { zorunlu: true, islevsel: false, analitik: false, pazarlama: false, ...choices },
    date: new Date().toISOString(),
    anonId: Math.random().toString(36).slice(2, 10),
  };
  try { localStorage.setItem(COOKIE_KEY, JSON.stringify(data)); } catch {}
  window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: data }));
  return data;
}

export function hasConsent(category) {
  const c = getConsent();
  if (!c) return false;
  return Boolean(c.choices?.[category]);
}

export function needsConsent() {
  const c = getConsent();
  return !c || c.stale;
}

export function acceptAll() { return setConsent({ zorunlu: true, islevsel: true, analitik: true, pazarlama: true }); }
export function acceptRequired() { return setConsent({ zorunlu: true }); }