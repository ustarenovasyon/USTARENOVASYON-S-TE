// ============================================================================
// FORM YAPILANDIRMASI — Teklif/keşif formları için seçenekler ve doğrulama.
// ============================================================================

export const izmirDistricts = [
  "Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca",
  "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun",
  "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere",
  "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla",
];

export const formServices = [
  "İç Cephe Boya", "Dış Cephe Boya", "Alçı ve Sıva", "Saten Alçı", "Mineral Sıva",
  "Çatı İzolasyonu", "Su Yalıtımı", "Teras İzolasyonu", "Mantolama", "Alçıpan",
  "Asma Tavan", "Ev Tadilatı", "Banyo Tadilatı", "Mutfak Tadilatı", "Anahtar Teslim Renovasyon",
  "Tamirat ve Onarım", "Diğer",
];

export const areaTypes = [
  "Ev", "Daire", "Villa", "Apartman", "Bina", "Ofis", "Mağaza", "Dükkan", "Depo",
  "Teras", "Balkon", "Çatı", "Banyo", "Mutfak", "Merdiven boşluğu", "Dış cephe", "Diğer",
];

export const areaUsages = [
  "Boş", "Eşyalı", "İçinde oturuluyor", "Yeni taşınılacak", "Kiracı çıkışı sonrası",
  "İnşaat halinde", "Ticari kullanım devam ediyor", "Diğer",
];

export const issueOptions = [
  "Boya dökülmesi", "Boya kabarması", "Duvar çatlağı", "Sıva dökülmesi", "Nem", "Rutubet",
  "Su sızıntısı", "Tavanda su lekesi", "Çatı akıntısı", "Eğri duvar", "Bozuk tavan",
  "Eski boya", "Dış cephe çatlağı", "Isı kaybı", "Alan yenileme", "Dekorasyon değişikliği",
  "Yeni ev boyama", "Tamirat ihtiyacı", "Diğer",
];

export const contactMethods = ["Telefon", "WhatsApp", "E-posta", "Fark etmez"];
export const contactTimes = ["Sabah", "Öğle", "Öğleden sonra", "Akşam", "Fark etmez"];
export const preferredDaysOptions = ["Hafta içi", "Hafta sonu", "Fark etmez"];

export const urgencyOptions = [
  { key: "normal", label: "Normal" },
  { key: "kisa_donues", label: "Kısa sürede dönüş istiyorum" },
  { key: "acil_su", label: "Acil su sızıntısı" },
  { key: "acil_cati", label: "Acil çatı akıntısı" },
  { key: "acil_guvenlik", label: "Acil güvenlik sorunu" },
];

export const formFaqs = [
  { q: "Fotoğraf göndermeden teklif alabilir miyim?", a: "Evet. Fotoğraf eklemek zorunlu değildir. Ancak alanın genel ve yakın çekim fotoğrafları ön değerlendirmeyi kolaylaştırabilir." },
  { q: "Form gönderince fiyat hemen belirlenir mi?", a: "Hayır. Net fiyat için alanın ölçüsü, yüzey durumu, yapılacak işlemler ve malzeme seçenekleri değerlendirilmelidir. Gerekirse keşif yapılabilir." },
  { q: "Keşif randevusu formdan sonra kesinleşir mi?", a: "Form üzerinden tarih tercihiniz alınır. Keşif günü ve saati, sizinle iletişime geçilerek kesinleştirilir." },
  { q: "Yüklediğim fotoğraflar yayınlanır mı?", a: "Hayır. Teklif amacıyla yüklenen görseller otomatik olarak yayınlanmaz. Referans olarak kullanılabilmesi için ayrıca izin alınması gerekir." },
  { q: "Ölçüyü bilmiyorsam formu doldurabilir miyim?", a: "Evet. Ölçüyü bilmiyorum seçeneğini işaretleyebilir ve alanın fotoğraflarını ekleyebilirsiniz." },
  { q: "Hangi ilçelere hizmet veriyorsunuz?", a: "Başta Bornova olmak üzere işin türü ve konumuna göre İzmir'in farklı ilçelerinde hizmet planlanabilir." },
  { q: "Malzemeyi kendim alabilir miyim?", a: "Evet, uygunluk değerlendirildikten sonra malzeme tercihiniz dikkate alınabilir." },
  { q: "Telefonla doğrudan ulaşabilir miyim?", a: "Evet, 0536 035 88 98 numarasından Özal Usta'ya doğrudan ulaşabilirsiniz." },
];

export const inspectionFaqs = [
  { q: "Keşif randevusu hemen kesinleşir mi?", a: "Hayır. Form üzerinden tarih tercihiniz alınır; keşif günü ve saati sizinle iletişime geçilerek netleştirilir." },
  { q: "Keşif ücretli mi?", a: "Keşif koşulları işin türüne ve konuma göre değerlendirilir; net bilgi iletişim sırasında paylaşılır." },
  { q: "Geçmiş tarih seçebilir miyim?", a: "Hayır, yalnızca bugün ve sonrasındaki tarihler seçilebilir." },
];

export function stripPhone(v) {
  return String(v || "").replace(/\s|-|\(|\)/g, "");
}

export function validatePhone(v) {
  const s = stripPhone(v);
  // 05XXXXXXXXX (11) | 5XXXXXXXXX (10) | 905XXXXXXXXX (12)
  return /^(0?5\d{9}|905\d{9})$/.test(s);
}

export function normalizePhone(v) {
  const s = stripPhone(v);
  let digits = s;
  if (digits.startsWith("90")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10 && digits.startsWith("5")) return "0" + digits;
  return s;
}

export function validateEmail(v) {
  if (!v) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}

export function generateRequestNumber() {
  return `UR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`;
}

export function mapContactMethod(m) {
  if (m === "WhatsApp") return "whatsapp";
  if (m === "E-posta") return "eposta";
  if (m === "Fark etmez") return "fark_etmez";
  return "telefon";
}

export function mapPriority(urgency) {
  if (urgency && urgency.startsWith("acil")) return "acil";
  if (urgency === "kisa_donues") return "yuksek";
  return "normal";
}