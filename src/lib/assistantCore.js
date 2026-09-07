// ============================================================================
// USTA RENOVASYON — GITHUB-ONLY DİJİTAL YARDIMCI
// Sunucu veya harici yapay zekâ servisi kullanmaz. Yalnızca sitede yayınlanan
// statik hizmet, SSS, bölge ve fiyat içeriklerinden güvenli yönlendirme üretir.
// ============================================================================

import { siteStore } from "@/api/staticStore";
import { siteConfig } from "@/lib/siteConfig";
import {
  SERVICE_KEYWORD_MAP,
  HUMAN_HANDOFF_TRIGGERS,
  EMERGENCY_KEYWORDS,
  SENSITIVE_DATA_PATTERNS,
} from "@/lib/assistantConfig";
import { detectPaintingPlan } from "@/lib/paintingPrices";

export function detectDevice() {
  if (typeof navigator === "undefined") return "masaustu";
  const ua = navigator.userAgent || "";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  if (/mobi|android|iphone/i.test(ua)) return "mobil";
  return "masaustu";
}

export function newSessionId() {
  return "as-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

export function pageKeyFromPath(pathname) {
  if (!pathname || pathname === "/") return "home";
  if (pathname.startsWith("/hizmetler/")) return "service";
  if (pathname.startsWith("/hizmet-bolgeleri/")) return "district";
  if (pathname.startsWith("/blog/")) return "blog";
  if (pathname === "/teklif-al") return "teklif";
  if (pathname === "/ucretsiz-kesif") return "kesif";
  if (pathname === "/sik-sorulan-sorular") return "sss";
  return "home";
}

export function suggestServices(text) {
  if (!text) return [];
  const t = text.toLocaleLowerCase("tr-TR");
  const found = new Set();
  for (const entry of SERVICE_KEYWORD_MAP) {
    if (entry.keywords.some((k) => t.includes(k))) entry.services.forEach((s) => found.add(s));
  }
  return Array.from(found).slice(0, 3);
}

export function needsHumanHandoff(text) {
  if (!text) return false;
  const t = text.toLocaleLowerCase("tr-TR");
  return HUMAN_HANDOFF_TRIGGERS.some((k) => t.includes(k));
}

export function isEmergency(text) {
  if (!text) return false;
  const t = text.toLocaleLowerCase("tr-TR");
  return EMERGENCY_KEYWORDS.some((k) => t.includes(k));
}

export function hasSensitiveData(text) {
  if (!text) return false;
  return SENSITIVE_DATA_PATTERNS.some((p) => p.test(text));
}

export function logAssistantEvent(sessionId, eventType, extra = {}) {
  try {
    siteStore.entities.AiEvent.create({
      session_id: sessionId,
      event_type: eventType,
      device: detectDevice(),
      ...extra,
    });
  } catch (_) {}
}

function words(text = "") {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/[^a-z0-9çğıöşü+\s]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3);
}

function bestFaq(text, faqs = []) {
  const query = new Set(words(text));
  let best = null;
  let score = 0;
  for (const faq of faqs) {
    const hay = new Set(words(`${faq.question || ""} ${faq.answer || ""}`));
    const current = [...query].filter((w) => hay.has(w)).length;
    if (current > score) {
      score = current;
      best = faq;
    }
  }
  return score >= 2 ? best : null;
}

export async function callAssistant({ userText, services = [], faqs = [], districts = [] }) {
  const text = (userText || "").trim();
  const lower = text.toLocaleLowerCase("tr-TR");
  const detected = suggestServices(text);
  const plan = detectPaintingPlan(text);
  const asksPrice = /fiyat|kaç para|kaça|ne kadar|ücret/.test(lower);
  const asksPainting = /boya|boyama|badana/.test(lower);

  if (plan && (asksPrice || asksPainting)) {
    return {
      reply: `${plan.type} (${plan.m2}) daire boyama için sitede görünen işçilik fiyatı ${plan.price}. Küçük çatlak, çivi/vida deliği ve temel yüzey düzeltmeleri kapsama dahildir; büyük alçı, sıva veya yoğun tamirat ayrıca değerlendirilir. Net kapsam için fotoğrafı WhatsApp'tan gönderebilir veya ücretsiz keşif isteyebilirsiniz.`,
      suggested_services: ["İç Cephe Boya"],
      suggested_actions: ["whatsapp", "kesif"],
      needs_human: false,
    };
  }

  if (asksPrice && asksPainting && !plan) {
    return {
      reply: "Daire boyama fiyatını doğru eşleştirebilmem için dairenin 1+1, 2+1, 3+1 veya 4+1 olduğunu yazabilirsiniz. Büyük yüzey tamiratları ayrıca değerlendirilir.",
      suggested_services: ["İç Cephe Boya"],
      suggested_actions: ["whatsapp", "kesif"],
      needs_human: false,
      next_question: "Daireniz kaç odalı?",
    };
  }

  if (/telefon|numara|ara|whatsapp|iletişim|iletisim/.test(lower)) {
    return {
      reply: `Özal Usta'ya ${siteConfig.phone.display} numarasından ulaşabilirsiniz. Telefon ve WhatsApp bağlantılarını aşağıdan doğrudan kullanabilirsiniz.`,
      suggested_actions: ["telefon", "whatsapp"],
      needs_human: true,
    };
  }

  const district = districts.find((d) => lower.includes(String(d.name || "").toLocaleLowerCase("tr-TR")));
  if (district && /hizmet|geliyor|gelir|çalışıyor|calisiyor|bölge|bolge/.test(lower)) {
    return {
      reply: `${district.name} Usta Renovasyon'un İzmir hizmet bölgeleri arasındadır. İşin kapsamını ve mahalleyi WhatsApp üzerinden iletirseniz uygunluk Özal Usta tarafından netleştirilir.`,
      suggested_actions: ["whatsapp", "kesif"],
      needs_human: false,
    };
  }

  const faq = bestFaq(text, faqs);
  if (faq) {
    return {
      reply: faq.answer,
      suggested_services: detected,
      suggested_actions: detected.length ? ["hizmetler", "whatsapp"] : ["sss", "whatsapp"],
      needs_human: false,
    };
  }

  if (detected.length) {
    return {
      reply: `Anlattığınız konu için ${detected.join(", ")} hizmetleri ilgili olabilir. Kesin uygulama, yüzey ve alan yerinde görülmeden belirlenmez; fotoğrafı WhatsApp'tan göndermeniz veya ücretsiz keşif istemeniz en sağlıklısıdır.`,
      suggested_services: detected,
      suggested_actions: ["hizmetler", "whatsapp", "kesif"],
      needs_human: false,
    };
  }

  const serviceNames = services.slice(0, 5).map((s) => s.name).filter(Boolean);
  return {
    reply: `Yapmak istediğiniz işi biraz daha tarif edebilirsiniz. ${serviceNames.length ? `Örneğin ${serviceNames.join(", ")} gibi hizmetler hakkında yönlendirme yapabilirim.` : "Boya, alçı-sıva, izolasyon ve tadilat konularında yönlendirme yapabilirim."}`,
    suggested_actions: ["hizmetler", "whatsapp"],
    needs_human: false,
  };
}

export async function createRequestFromConversation(data) {
  const payload = {
    name: data.name,
    phone: data.phone,
    service: data.service || undefined,
    district: data.district || undefined,
    description: data.description || data.summary || undefined,
    contact_preference: data.contact_preference || "telefon",
    request_type: "asistan",
    source_page: data.source_page || "Asistan",
    photo_urls: data.photo_urls || [],
    notes: data.summary || undefined,
  };
  return siteStore.entities.QuoteRequest.create(payload);
}
