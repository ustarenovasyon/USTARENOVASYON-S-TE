// ============================================================================
// USTA RENOVASYON — MAHALLE SEO İÇERİK MOTORU
// ----------------------------------------------------------------------------
// Anahtar kelime listesinden çıkarılan arama niyeti kalıplarını + Türkçe ek
// motorunu kullanarak her mahalle için DOĞAL, VARYASYONLU, lokasyon bazlı
// SEO içeriği üretir.
//
// İLKELER:
// - Kopyala-yapıştır DEĞİL: indeks bazlı rotasyonla her mahallede farklı
//   cümle kalıpları, farklı arama niyeti vurguları kullanılır.
// - Türkçe ek motoru (locative/ablative/genitive) doğru dilbilgisi sağlar.
// - Sahte yerel iddialar YOKTUR ("en çok şu tercih edilir" vb. üretilmez).
// - Anahtar kelime yığını YOKTUR — doğal Türkçe paragraflar.
// - Hizmet kısıtlaması YOKTUR — tüm aktif hizmetler tüm mahallelerde değerlendirilir.
// ============================================================================

import {
  locativeSuffix,
  ablativeSuffix,
  genitiveSuffix,
  inDistrict,
  inDistrictKi,
  fromDistrict,
  districtGenitive,
} from "@/lib/districtContent";

// --- Arama niyeti kalıpları (anahtar kelime listesinden çıkarıldı) ---------
// Her kalıp [LOKASYON] değişkeni ile mahalle/ilçe adına uyarlanır.
// "Mahalle" → mahalle adının "Mahallesi" eki çıkarılmış hali (örn. "Mevlana").
// Rotalama: indeks % N ile varyasyon seçilir — aynı metin tekrar etmez.

const NEIGHBORHOOD_BASE = "Mahallesi"; // "Mevlana Mahallesi" → "Mevlana"

// Mahalle adından "Mahallesi" ekini temizle: "Mevlana Mahallesi" → "Mevlana"
export function shortNeighborhood(name) {
  if (!name) return "";
  return String(name).replace(/\s*Mahallesi\s*$/, "").trim();
}

// --- GİRİŞ PARAGRAFI VARYASYONLARI -----------------------------------------
// Her mahallede farklı bir giriş kalıbı kullanılır; Türkçe ek motoruyla
// dilbilgisi korunur. "Mevlana Mahallesi'nde", "Kazım Dirik Mahallesi'nde" vb.
const INTRO_TEMPLATES = [
  (n, d) =>
    `${n}${locativeSuffix(n)} ${d.gen} sunduğumuz boya badana ve tadilat hizmetleri kapsamında; iç cephe duvar boyama, tavan boyama, boya öncesi alçı ve çatlak tamiri, malzemeli veya işçilik seçenekleriyle daire ve ev boyama hizmetleri değerlendirilmektedir. ${n}, ${d.name} sınırlarında yer alan bir mahalledir; bu bölgedeki talepler işin türü, alanın büyüklüğü ve çalışma planına göre değerlendirilir.`,
  (n, d) =>
    `${d.name} ilçesine bağlı ${n}${locativeSuffix(n)} daire, müstakil ev, ofis ve apartman ortak alanlarında boya badana, iç cephe boyama, duvar ve tavan boyama, saten alçı ve çatlak tamiri hizmetleri sunulabilmektedir. Hizmet kapsamı mahalle adına göre değil, yapılacak işin teknik ihtiyaçlarına göre belirlenir; net fiyat keşif veya fotoğraf değerlendirmesi sonrasında oluşur.`,
  (n, d) =>
    `${n}${locativeSuffix(n)} ev ve daire boyama taleplerinde iç cephe boya, tavan boyama, duvar boyama, boya öncesi alçı tamiri ve malzemeli boya seçenekleri değerlendirilmektedir. ${d.gen} tüm mahallelerinde olduğu gibi ${n}${locativeSuffix(n)} da hizmet uygunluğu işin kapsamına göre belirlenir; kesin fiyat yerinde inceleme veya fotoğraf sonrası netleşir.`,
  (n, d) =>
    `${n} Mahallesi${locativeSuffix("Mahallesi")} ${d.name}${locativeSuffix(d.name)} boya badana ustası, iç cephe boyama, daire ve ev boyama hizmetlerinin değerlendirildiği bölgelerden biridir. Eşyalı veya boş daire boyama, 1+1'den 4+1'e kadar farklı oda düzenlerinde iç cephe duvar ve tavan boyama, alçı tamiri ve malzemeli boya seçenekleri işin türüne göre planlanır.`,
  (n, d) =>
    `${d.name} ${n} bölgesinde iç ve dış cephe boya, alçı sıva, saten alçı, çatlak tamiri, su yalıtımı ve komple ev tadilatı hizmetleri işin kapsamına göre değerlendirilmektedir. ${n}${locativeSuffix(n)} yapılacak işin türü, alan büyüklüğü ve yüzey durumu bilinmeden net fiyat verilemez; fotoğraf paylaşarak ön bilgi alınabilir, gerekirse keşif planlanır.`,
];

// --- HİZMET BÖLÜMÜ VARYASYONLARI (H2 + paragraf) ---------------------------
const SERVICE_SECTION_TEMPLATES = [
  (n, d) => ({
    h2: `${n} Ev ve Daire Boyama`,
    p: `${n}${locativeSuffix(n)} daire ve ev boyama hizmetlerinde iç cephe duvar boyama, tavan boyama, boya öncesi saten alçı ve çatlak tamiri birlikte planlanabilir. Eşyalı dairelerde mobilya ve zemin koruma altına alınır; boş dairelerde çalışma daha hızlı planlanır. 1+1, 2+1, 3+1 ve 4+1 düzenlerinde oda sayısına göre süre ve iş kapsamı değerlendirilir.`,
  }),
  (n, d) => ({
    h2: `${n} Boya Badana Hizmeti`,
    p: `Boya badana kapsamında duvar ve tavan boyama, astar uygulaması, yüzey hazırlığı ve son kat boya işlemleri ${n}${locativeSuffix(n)} daire, ofis ve apartman ortak alanlarında işin türüne göre yapılır. Malzemeli boya badana seçeneğinde boya ve yardımcı malzemeler tarafımızca temin edilebilir; bu durum teklif aşamasında netleşir.`,
  }),
  (n, d) => ({
    h2: `${n}${locativeSuffix(n)} İç Cephe ve Duvar Boyama`,
    p: `İç cephe boya hizmeti; duvar yüzeyinin hazırlanması, gerekli alçı ve çatlak tamirlerinin yapılması, astar ve son kat boya uygulamasını kapsar. ${n} bölgesinde eski yapı stoğu olan dairelerde kabaran alçı sökülüp yenilenir, çatlaklar açılıp tamir harcıyla düzeltilir ve saten alçı çekildikten sonra boya uygulanır.`,
  }),
  (n, d) => ({
    h2: `${n} Boya Öncesi Alçı ve Duvar Tamirleri`,
    p: `Boya öncesi duvar hazırlığı, kalıcı sonuç için önemlidir. ${n}${locativeSuffix(n)} yapılacak boyada çatlak tamiri, kabaran alçı sökümü, saten alçı uygulaması ve yüzey düzeltme işlemleri ihtiyaca göre planlanır. Alçı ve boya işlemlerinin aynı ekip tarafından sırayla yapılması süre ve maliyet açısından avantaj sağlar.`,
  }),
];

// --- FİYAT BÖLÜMÜ VARYASYONLARI --------------------------------------------
const PRICING_TEMPLATES = [
  (n, d) =>
    `${n}${locativeSuffix(n)} boya badana ve daire boyama fiyatları; yapılacak işin kapsamı, alanın büyüklüğü, mevcut yüzey durumu, tamirat ihtiyacı, kullanılacak boya ve malzeme ile işin içeriğine göre değişir. Metrekare veya sabit fiyat; alan ve yüzey durumu bilinmeden verilemez. Malzemeli ve malzemesiz seçenekler arasındaki fark, temin edilecek boya markası ve miktarına göre teklif aşamasında netleşir. Fotoğraf paylaşarak ön değerlendirme alabilir, gerekirse ücretsiz keşif planlanabilir.`,
  (n, d) =>
    `${n} bölgesinde ev boyama fiyatları oda sayısı, duvar durumu, eşya durumu (boş/eşyalı) ve yapılacak hazırlık işlemlerine göre belirlenir. İşçilik fiyatı ile malzemeli boya fiyatı farklıdır; net teklif için alanın görülmesi veya fotoğraflanması gerekir. ${d.gen} diğer mahallelerinde olduğu gibi ${n}${locativeSuffix(n)} da ücretsiz keşif uygunluğu işin büyüklüğüne göre değerlendirilir.`,
];

// --- SATIN ALMA / İLETİŞİM NİYETİ PARAGRAFI --------------------------------
const CONTACT_TEMPLATES = [
  (n, d) =>
    `${n}${locativeSuffix(n)} boya ustası veya boyacı arıyorsanız, yapılacak işin detayını ve mümkünse alanın fotoğraflarını WhatsApp üzerinden paylaşarak hizmet uygunluğu ve teklif süreci hakkında bilgi alabilirsiniz. Telefonla ulaşarak da keşif talebi oluşturabilirsiniz. Kesin randevu ve varış süresi vaat edilmez; çalışma planı işin yoğunluğuna göre paylaşılır.`,
  (n, d) =>
    `${n} bölgesinde boyacı lazım olduğunda önce yapılacak işin türü ve büyüklüğü değerlendirilir. Fotoğraf paylaşarak ön bilgi alabilir, ücretsiz keşif uygunluğunu sorabilirsiniz. Teklif almak için ${d.name} hizmet bölgesi sayfasındaki WhatsApp veya telefon bağlantılarını kullanabilirsiniz.`,
];

// --- SSS VARYASYON HAVUZU -------------------------------------------------
// Her mahallede 3-4 soru seçilir; indeks rotasyonuyla farklı kombinasyonlar.
const FAQ_POOL = [
  (n, d) => ({
    q: `${n}${locativeSuffix(n)} malzemeli ev boyama hizmeti veriyor musunuz?`,
    a: `Evet. ${n}${locativeSuffix(n)} malzemeli ev boyama seçeneğinde boya ve yardımcı malzemeler tarafımızca temin edilebilir. Malzeme markası ve miktarı teklif aşamasında netleşir; malzemesiz seçenekte işçilik tarafımızca, malzeme sizin tarafınızdan sağlanır.`,
  }),
  (n, d) => ({
    q: `${n}${locativeSuffix(n)} eşyalı daire boyanırken eşyalar nasıl korunur?`,
    a: `Eşyalı dairelerde taşınabilir eşyalar toplanır, mobilya ve zemin uygun örtü ve maskeleme malzemeleriyle korunur. Sabit eşyalar örtülür, çalışma planı ve koruma detayları önceden paylaşılır. Eşyalı çalışmada süre, boş daireye göre daha uzun planlanır.`,
  }),
  (n, d) => ({
    q: `${n}${locativeSuffix(n)} 3+1 daire boyama ne kadar sürer?`,
    a: `3+1 daire boyama süresi; duvar durumu, yapılacak alçı ve çatlak tamiri, eşya durumu ve iş kapsamına göre değişir. Net süre Özal Usta iş planını oluşturduğunda paylaşılır; önceden kesin süre verilemez.`,
  }),
  (n, d) => ({
    q: `${n}${locativeSuffix(n)} boya öncesi çatlak ve alçı tamiri yapılıyor mu?`,
    a: `Evet. Boya öncesi çatlaklar açılıp temizlenir, tamir harcı uygulanır, kabaran alçı sökülür ve saten alçı ile yüzey düzeltilir. Bu hazırlık aşaması kalıcı boya sonucu için önemlidir; kapsam keşif veya fotoğraf değerlendirmesi sonrası belirlenir.`,
  }),
  (n, d) => ({
    q: `${n} bölgesinde ücretsiz keşif yapıyor musunuz?`,
    a: `Keşif uygunluğu işin türü ve büyüklüğüne göre değerlendirilir. Küçük işlerde fotoğraf yeterli olabilir; büyük işlerde keşif planlanır. ${n}${locativeSuffix(n)} keşif koşulları teklif aşamasında netleşir.`,
  }),
  (n, d) => ({
    q: `${n}${locativeSuffix(n)} dış cephe boya yapıyor musunuz?`,
    a: `Dış cephe boya ve mantolama iş kapsamına göre değerlendirilir. Bina ölçüsü, cephe durumu ve kat sayısı netleştiğinde çalışma planı paylaşılır. Apartman yönetimleri için ortak teklif hazırlanabilir.`,
  }),
  (n, d) => ({
    q: `${n}${locativeSuffix(n)} fiyat almak için ne yapmalıyım?`,
    a: `Yapılacak alanın genel görünümünü ve sorunlu bölgenin yakın çekimini WhatsApp üzerinden göndererek ön bilgi alabilirsiniz. Net fiyat; yüzey durumu, ölçü ve iş kapsamı netleştikten sonra, gerekirse keşifle belirlenir.`,
  }),
  (n, d) => ({
    q: `${n}${locativeSuffix(n)} ofis veya iş yeri boyama yapıyor musunuz?`,
    a: `Ofis, dükkan ve iş yeri boyama iş kapsamına göre değerlendirilir. İşletmenin çalışma düzenini aksatmamak için mesai dışı veya hafta sonu çalışma koşulları önceden netleşir.`,
  }),
];

// --- Rotalama yardımcıları ------------------------------------------------
// Deterministik seçim: aynı mahalle her zaman aynı varyasyonu alır (sayfa
// yenilenince değişmemesi için), ama mahalleler arası çeşitlilik sağlar.
function pickByIndex(arr, idx) {
  return arr[idx % arr.length];
}

// İndeks bazlı N elemanlı benzersiz alt küme seçimi (SSS için)
function pickN(arr, idx, n) {
  const out = [];
  const len = arr.length;
  for (let i = 0; i < n && i < len; i++) {
    out.push(arr[(idx + i) % len]);
  }
  return out;
}

// --- ANA ÜRETİCİ -----------------------------------------------------------
// { districtName, neighborhoodName, index } alır; zenginleştirilmiş içerik döner.
export function buildNeighborhoodContent(districtName, neighborhoodName, index = 0) {
  const short = shortNeighborhood(neighborhoodName);
  const d = {
    name: districtName,
    gen: districtGenitive(districtName), // "Bornova'nın"
    in: inDistrict(districtName), // "Bornova'da"
    from: fromDistrict(districtName), // "Bornova'dan"
  };

  const intro = pickByIndex(INTRO_TEMPLATES, index)(short, d);
  const service = pickByIndex(SERVICE_SECTION_TEMPLATES, index)(short, d);
  const pricing = pickByIndex(PRICING_TEMPLATES, index)(short, d);
  const contact = pickByIndex(CONTACT_TEMPLATES, index)(short, d);
  const faqs = pickN(FAQ_POOL, index, 3).map((fn) => fn(short, d));

  const seo_title = `${short} Mahallesi Boya Badana ve Tadilat | ${districtName} | Usta Renovasyon`;
  const meta_description = `${short} Mahallesi${locativeSuffix(short)} ${districtName} boya badana, iç cephe duvar boyama, daire ve ev boyama, alçı tamiri ve malzemeli boya seçenekleri. Ücretsiz keşif ve teklif.`;

  return {
    short,
    full: neighborhoodName,
    district: districtName,
    intro,
    serviceSection: service,
    pricing,
    contact,
    faqs,
    seo_title,
    meta_description,
    inLocative: `${short}${locativeSuffix(short)}`,
  };
}

// --- BULK ÜRETİCİ ---------------------------------------------------------
// Bir ilçenin tüm mahalleleri için içerik üret.
export function buildAllNeighborhoods(districtName, neighborhoods = []) {
  return neighborhoods.map((n, i) => ({
    name: n,
    short: shortNeighborhood(n),
    content: buildNeighborhoodContent(districtName, n, i),
  }));
}

// --- İLÇE SAYFASI META ZENGİNLEŞTİRMESİ -----------------------------------
// İlçe için arama niyeti kapsayan genişletilmiş SEO başlığı ve meta açıklaması.
// Varsayılan içerik varsa korunur; yalnızca boşsa veya zayıfsa üretilir.
export function enrichDistrictMeta(districtName, existing = {}) {
  const d = districtName;
  const inD = inDistrict(d);
  // Mevcut seo_title korunur; boşsa niyet kapsayan başlık üretilir.
  const seo_title =
    existing.seo_title ||
    `${d} Boya Badana Ustası, Ev ve Daire Boyama | Usta Renovasyon`;
  const meta_description =
    existing.meta_description ||
    `${inD} boya badana ustası, iç cephe duvar ve tavan boyama, daire ve ev boyama, alçı tamiri, malzemeli boya ve ücretsiz keşif. ${d} tüm mahallelerinde hizmet değerlendirmesi.`;
  return { seo_title, meta_description };
}

// --- MAHALLE İÇİN JSON-LD FAQ SCHEMA -------------------------------------
// Google'ın mahalle SSS'lerini rich snippet olarak gösterebilmesi için.
export function neighborhoodFaqSchema(nbContent) {
  if (!nbContent.faqs || !nbContent.faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: nbContent.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}