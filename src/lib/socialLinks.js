// ============================================================================
// USTA RENOVASYON — MERKEZİ SOSYAL MEDYA YÖNETİMİ (Part 22)
// Tek veri kaynağı: SocialLink entity. Yalnızca aktif ve gerçek URL'ye sahip
// hesaplar canlı sitede gösterilir. Şimdilik Instagram + Facebook öne çıkar;
// diğer platformlar pasif kayıt olarak tutulabilir, aktif edilene kadar görünmez.
// ============================================================================

import { siteStore } from "@/api/staticStore";

// Platform meta verileri — etiket, erişilebilirlik açıklaması, marka rengi.
// Lucide'de olmayan platformlar için genel Share2 ikonu kullanılır.
export const PLATFORM_META = {
  instagram: { label: "Instagram", ariaLabel: "Usta Renovasyon Instagram hesabını aç", color: "#E1306C" },
  facebook: { label: "Facebook", ariaLabel: "Usta Renovasyon Facebook sayfasını aç", color: "#1877F2" },
  youtube: { label: "YouTube", ariaLabel: "Usta Renovasyon YouTube kanalını aç", color: "#FF0000" },
  tiktok: { label: "TikTok", ariaLabel: "Usta Renovasyon TikTok hesabını aç", color: "#000000" },
  x: { label: "X", ariaLabel: "Usta Renovasyon X hesabını aç", color: "#000000" },
  linkedin: { label: "LinkedIn", ariaLabel: "Usta Renovasyon LinkedIn sayfasını aç", color: "#0A66C2" },
  threads: { label: "Threads", ariaLabel: "Usta Renovasyon Threads hesabını aç", color: "#000000" },
  pinterest: { label: "Pinterest", ariaLabel: "Usta Renovasyon Pinterest hesabını aç", color: "#BD081C" },
  telegram: { label: "Telegram", ariaLabel: "Usta Renovasyon Telegram kanalını aç", color: "#26A5E4" },
};

// Şu anda canlı sitede önerilen (öne çıkan) iki platform.
export const PRIMARY_PLATFORMS = ["instagram", "facebook"];

// Aktif sosyal medya bağlantılarını getirir — yalnızca active=true ve url dolu olanlar.
export async function fetchActiveSocialLinks() {
  try {
    const items = await siteStore.entities.SocialLink.filter({}, "order", 50);
    return items
      .filter((s) => s.active && s.url && isValidSocialUrl(s.platform, s.url))
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch {
    return [];
  }
}

// Basit URL doğrulama — platformun beklenen alan adına gittiğini kontrol eder.
export function isValidSocialUrl(platform, url) {
  if (!url || typeof url !== "string") return false;
  let u;
  try { u = new URL(url); } catch { return false; }
  if (!u.protocol.startsWith("http")) return false;
  const host = u.hostname.toLowerCase().replace(/^www\./, "");
  const expected = {
    instagram: ["instagram.com"],
    facebook: ["facebook.com", "fb.com", "fb.me"],
    youtube: ["youtube.com", "youtu.be", "youtube"],
    tiktok: ["tiktok.com"],
    x: ["x.com", "twitter.com"],
    linkedin: ["linkedin.com"],
    threads: ["threads.net"],
    pinterest: ["pinterest.com", "pin.it"],
    telegram: ["t.me", "telegram.org"],
  };
  const list = expected[platform];
  if (!list) return true; // bilinmeyen platform — yine de http olmasına izin ver
  return list.some((d) => host === d || host.endsWith("." + d));
}

// Tüm kayıtları getirir (yönetim paneli için).
export async function fetchAllSocialLinks() {
  try {
    return await siteStore.entities.SocialLink.filter({}, "order", 100);
  } catch {
    return [];
  }
}