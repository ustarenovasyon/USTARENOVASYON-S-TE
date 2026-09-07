// Merkezi güvenlik yardımcıları — girdi temizleme, doğrulama, dosya güvenliği, parola kontrolü, honeypot.
// Sunucu tarafı (backend) doğrulaması platform tarafından yapılır; bu yardımcılar tarayıcı katmanıdır.

// --- Girdi temizleme ---
// Script etiketleri, tehlikeli HTML ve olay işleyicilerini kaldırır. Normal Türkçe metni korur.
export function sanitizeText(input) {
  if (typeof input !== "string") return "";
  return input
    .replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/<\s*iframe[\s\S]*?<\s*\/\s*iframe\s*>/gi, "")
    .replace(/on\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/on\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/data:text\/html/gi, "")
    .replace(/\u0000/g, "");
}

// Tehlikeli URL şemalarını engeller.
export function sanitizeUrl(url) {
  if (typeof url !== "string") return "";
  const trimmed = url.trim();
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(trimmed)) return trimmed;
  return "";
}

// --- Telefon doğrulama ---
export function normalizePhone(phone) {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}
export function isValidPhone(phone) {
  const n = normalizePhone(phone).replace(/^\+/, "");
  return /^(\d{10,15})$/.test(n);
}

// --- E-posta doğrulama ---
export function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// --- Zayıf parola kontrolü ---
const COMMON_WEAK = ["123456", "password", "sifre", "admin", "ustarenovasyon", "usta", "ozal", "renovasyon", "12345678", "123456789", "qwerty", "abc123"];
export function passwordStrength(pw, context = {}) {
  const issues = [];
  if (!pw) return { score: 0, label: "Boş", issues: ["Parola boş"] };
  if (pw.length < 8) issues.push("En az 8 karakter olmalı");
  if (!/[A-ZÇĞİÖŞÜ]/.test(pw)) issues.push("Büyük harf içermeli");
  if (!/[a-zçğıöşü]/.test(pw)) issues.push("Küçük harf içermeli");
  if (!/\d/.test(pw)) issues.push("Rakam içermeli");
  if (!/[^A-Za-z0-9ÇĞİÖŞÜçğıöşü]/.test(pw)) issues.push("Özel karakter içermeli");
  if (COMMON_WEAK.includes(pw.toLowerCase())) issues.push("Çok yaygın parola");
  if (/\d{4,}/.test(pw)) issues.push("Ardışık rakam içeriyor");
  if (context.phone && pw.includes(context.phone.replace(/\D/g, "").slice(-6))) issues.push("Telefon numarası içeriyor");
  if (context.email && pw.toLowerCase().includes(context.email.split("@")[0].toLowerCase())) issues.push("E-posta adresi içeriyor");
  if (context.name) {
    const parts = context.name.toLowerCase().split(/\s+/).filter((p) => p.length > 2);
    if (parts.some((p) => pw.toLowerCase().includes(p))) issues.push("Adınızı içeriyor");
  }
  const score = Math.max(0, 5 - Math.min(5, issues.length));
  const label = score >= 4 ? "Güçlü" : score >= 3 ? "Orta" : score >= 2 ? "Zayıf" : "Çok Zayıf";
  return { score, label, issues };
}

// --- Dosya yükleme güvenliği ---
const ALLOWED_IMG = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const ALLOWED_VIDEO = ["video/mp4", "video/webm", "video/quicktime"];
const BLOCKED_EXT = ["exe", "apk", "bat", "cmd", "sh", "js", "jar", "msi", "com", "scr", "vbs", "ps1", "html", "htm", "php", "svg", "zip", "rar", "7z"];

export function validateFile(file, opts = {}) {
  const { kind = "image", maxSizeMB = 10 } = opts;
  if (!file) return { ok: false, reason: "Dosya seçilmedi." };
  const name = (file.name || "").toLowerCase();
  const ext = name.split(".").pop();
  if (BLOCKED_EXT.includes(ext)) return { ok: false, reason: "Bu dosya türüne izin verilmiyor." };
  const allowed = kind === "video" ? ALLOWED_VIDEO : ALLOWED_IMG;
  if (!allowed.includes(file.type)) {
    // Tür tespit edilemezse uzantıya bak (HEIC bazen type döndürmüyor)
    const extOk = kind === "video" ? ["mp4", "webm", "mov"].includes(ext) : ["jpg", "jpeg", "png", "webp", "heic", "heif"].includes(ext);
    if (!extOk) return { ok: false, reason: "Desteklenmeyen dosya türü." };
  }
  if (file.size > maxSizeMB * 1024 * 1024) return { ok: false, reason: `Dosya ${maxSizeMB}MB sınırını aşıyor.` };
  return { ok: true };
}

// --- Honeypot ---
// Forma gizli alan ekler; botlar doldurursa gönderim engellenir. Kullanıcıya görünmez.
export const HONEYPOT_FIELD = "website_extra";
export function isHoneypotTriggered(form) {
  return Boolean(form && form[HONEYPOT_FIELD]);
}

// --- Tekrarlı talep tespiti (tarayıcı tarafı yardımcı) ---
export function isDuplicateRequest(phone, service) {
  try {
    const key = `last_req_${normalizePhone(phone)}`;
    const data = JSON.parse(localStorage.getItem(key) || "null");
    const now = Date.now();
    if (data && data.service === service && now - data.ts < 2 * 60 * 1000) return true;
    localStorage.setItem(key, JSON.stringify({ service, ts: now }));
    return false;
  } catch { return false; }
}

// --- Form hız sınırı (tarayıcı tarafı, danışma niteliğinde) ---
export function canSubmitForm(formKey, windowMs = 60 * 1000, max = 5) {
  try {
    const key = `rate_${formKey}`;
    const arr = JSON.parse(localStorage.getItem(key) || "[]").filter((t) => Date.now() - t < windowMs);
    if (arr.length >= max) return { ok: false, retryIn: windowMs - (Date.now() - arr[0]) };
    arr.push(Date.now());
    localStorage.setItem(key, JSON.stringify(arr));
    return { ok: true };
  } catch { return { ok: true }; }
}

// --- Hata kaydetme (yerel) ---
export async function logError(type, message, extra = {}) {
  try {
    const key = "ur_local_errors_v1";
    const rows = JSON.parse(sessionStorage.getItem(key) || "[]");
    rows.push({
      type,
      severity: extra.severity || "hata",
      module: extra.module || "",
      page: typeof window !== "undefined" ? window.location.pathname : "",
      message: String(message || "").slice(0, 500),
      ts: new Date().toISOString(),
    });
    sessionStorage.setItem(key, JSON.stringify(rows.slice(-50)));
  } catch {
    // Hata günlüğü best-effort.
  }
}
