// ============================================================================
// USTA RENOVASYON — DAİRE BOYAMA FİYAT MERKEZİ KAYNAĞI
// Ana sayfa fiyat kartları ve yapay zekâ asistanı ortak bu kaynaktan okur.
// Kartlar güncellendiğinde asistan otomatik olarak aynı fiyatları kullanır.
// ============================================================================

export const PAINTING_PLANS = [
  {
    type: "1+1",
    title: "1+1 Daire Boyama",
    m2: "40–75 m²",
    m2Min: 40,
    m2Max: 75,
    price: "15.000 TL",
    priceMin: 15000,
    priceMax: 15000,
    alt: "",
    wa: "Merhaba Özal Usta. 1+1 (40–75 m²) daire boyama fiyatını gördüm, net fiyat için ücretsiz keşif talep ediyorum.",
  },
  {
    type: "2+1",
    title: "2+1 Daire Boyama",
    m2: "65–110 m²",
    m2Min: 65,
    m2Max: 110,
    price: "18.000 TL",
    priceMin: 18000,
    priceMax: 18000,
    alt: "",
    wa: "Merhaba Özal Usta. 2+1 (65–110 m²) daire boyama fiyatını gördüm, net fiyat için ücretsiz keşif talep ediyorum.",
  },
  {
    type: "3+1",
    title: "3+1 Daire Boyama",
    m2: "90–140 m²",
    m2Min: 90,
    m2Max: 140,
    price: "21.000 TL",
    priceMin: 21000,
    priceMax: 21000,
    alt: "",
    wa: "Merhaba Özal Usta. 3+1 (90–140 m²) daire boyama fiyatını gördüm, net fiyat için ücretsiz keşif talep ediyorum.",
  },
  {
    type: "4+1",
    title: "4+1 Daire Boyama",
    m2: "120–170 m²",
    m2Min: 120,
    m2Max: 170,
    price: "24.000 TL",
    priceMin: 24000,
    priceMax: 24000,
    alt: "",
    wa: "Merhaba Özal Usta. 4+1 (120–170 m²) daire boyama fiyatını gördüm, net fiyat için ücretsiz keşif talep ediyorum.",
  },
];

// Fiyata dahil olabilecekler (asistan ve kart detay paneli ortak).
export const PAINTING_INCLUDED = [
  "Duvar boyama",
  "Tavan boyama",
  "Küçük çatlakların kapatılması",
  "Çivi ve vida deliklerinin giderilmesi",
  "Küçük yüzey kusurlarının düzeltilmesi",
  "Boya öncesi temel koruma işlemleri",
];

// Kullanıcı metninden daire tipi eşleştir.
export function detectPaintingPlan(text) {
  if (!text) return null;
  const t = text.toLowerCase().replace(/\s+/g, "").replace(/ı/g, "i");
  // Önce düz "1+1", "2+1" gibi ifadeler
  const m = t.match(/([1-4])\+1/);
  if (m) {
    const found = PAINTING_PLANS.find((p) => p.type === m[1] + "+1");
    if (found) return found;
  }
  // Metrekare eşleştirme (örn. "140 metrekare")
  const m2 = t.match(/(\d{2,3})\s*(m2|metrekare|m²|metre)/);
  if (m2) {
    const val = parseInt(m2[1], 10);
    const found = PAINTING_PLANS.find((p) => val >= p.m2Min && val <= p.m2Max);
    if (found) return found;
  }
  return null;
}

// Asistan sistem promptu için fiyat bilgi metni.
export function paintingPriceKnowledgeText() {
  const rows = PAINTING_PLANS.map(
    (p) =>
      `- ${p.type} Daire (${p.m2}): ${p.price} — ${p.alt}`
  ).join("\n");
  const included = PAINTING_INCLUDED.map((i) => `  • ${i}`).join("\n");
  return `DAİRE BOYAMA FİYAT BİLGİSİ (işçilik fiyatı, daire boyama):
${rows}

Fiyata dahil olan hizmetler:
${included}

KURALLAR:
- Kullanıcı daire boyama fiyatı (1+1, 2+1, 3+1, 4+1, "kaça boyanır", "ne kadar", metrekare) sorduğunda:
  1) İlgili fiyatı AÇIKÇA ver (saklama). Fiyat tek bir rakamdır; "aralık", "aralığında", "arasında" GİBİ ARALIK İFADELERİ KULLANMA.
  2) Fiyatın işçilik fiyatı olduğunu belirt.
  3) Büyük alçı, sıva, yoğun tamirat ve tadilatların ayrıca değerlendirildiğini belirt.
  4) Net fiyatın keşif sonrası belirleneceğini söyle ve ücretsiz keşife / WhatsApp fotoğrafına yönlendir.
- "Aralık", "aralığında", "arasında", "fiyat aralığı" GİBİ İFADELERİ ASLA KULLANMA — tek fiyat var, aralık yok.
- "Kesin fiyat", "sabit fiyat", "her daire bu fiyata boyanır" GİBİ ifadeler KULLANMA.
- "Standart işçilik" ifadesini ASLA kullanma.
- Küçük çatlak ve çivi deliklerini büyük tamirat gibi gösterme; bunların fiyata dahil olduğunu belirt.
- Daire tipi belli değilse kısa soru sor (kaç odalı).`;
}