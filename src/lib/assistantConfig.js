// ============================================================================
// USTA RENOVASYON — DİJİTAL ASİSTAN YAPISI
// Asistanın kimliği, karşılama mesajları, hızlı seçenekleri, hizmet eşleştirme
// kuralları ve güvenlik sınırları. Asistan hiçbir koşulda Özal Usta yerine
// kesin fiyat/teşhis/garanti/kesin randevu vermez.
// ============================================================================

import { siteConfig, getWhatsAppLink, getPhoneLink, getEmailLink } from "@/lib/siteConfig";

// Asistanın sistem kimliği (Prompt'un değişmez bölümü).
export const ASSISTANT_IDENTITY = {
  name: "Usta Renovasyon Asistanı",
  shortName: "Asistan",
  isHuman: false,
  description:
    "Site içeriğiyle çalışan dijital yardımcı. Usta Renovasyon adına ziyaretçiyi karşılar, ihtiyacını anlamaya yardımcı olur ve doğru hizmet veya iletişim kanalına yönlendirir. Özal Usta değildir.",
};

// Varsayılan karşılama mesajı.
export const DEFAULT_GREETING =
  "Merhaba, Usta Renovasyon'a hoş geldiniz. Ben site içeriğiyle çalışan dijital yardımcıyım. Boya, alçı, sıva, çatı izolasyonu, su yalıtımı, mantolama veya tadilat ihtiyacınız için doğru bölümü bulmanıza yardımcı olabilirim.";

// Hızlı başlangıç seçenekleri.
export const QUICK_START_OPTIONS = [
  { label: "Hizmet Seçmek İstiyorum", value: "hizmet_sec" },
  { label: "Fiyat Teklifi Almak İstiyorum", value: "teklif" },
  { label: "Fotoğraf Göndermek İstiyorum", value: "fotograf" },
  { label: "Ücretsiz Keşif Talep Etmek İstiyorum", value: "kesif" },
  { label: "Özal Usta ile Görüşmek İstiyorum", value: "insan" },
  { label: "Hizmetleri İncelemek İstiyorum", value: "hizmetler" },
];

// Hizmet konusu hızlı seçenekleri (ilk etkileşim).
export const QUICK_SERVICE_OPTIONS = [
  "Boya",
  "Alçı ve Sıva",
  "Çatı İzolasyonu",
  "Su Yalıtımı",
  "Mantolama",
  "Alçıpan ve Asma Tavan",
  "Ev Tadilatı",
  "Banyo veya Mutfak",
  "Emin Değilim",
];

// Sayfa bazlı karşılama mesajları.
export const PAGE_GREETINGS = {
  home: "Hangi hizmete ihtiyacınız olduğunu birlikte belirleyebiliriz.",
  "ic-cephe-boya": "İç cephe boya, duvar tamiri veya saten alçı konusunda yardımcı olabilirim.",
  "cati-izolasyonu": "Çatı veya teras bölgesindeki su sızıntısı hakkında birkaç kısa bilgi paylaşabilirsiniz.",
  projects: "Bu projeye benzer bir çalışma mı yaptırmak istiyorsunuz?",
  teklif: "Teklif formunu doldururken size uygun alanları belirlemenize yardımcı olabilirim.",
  kesif: "Ücretsiz keşif talebi için alan ve uygun zaman bilgisini birlikte toplayabiliriz.",
  district: "Bulunduğunuz ilçede hizmet uygunluğunu kontrol etmenize yardımcı olabilirim.",
  blog: "Blog yazılarımız hakkında bilgi veya ilgili hizmet yönlendirmesi yapabilirim.",
  sss: "Sık sorulan sorulara ek olarak yardımcı olabileceğim bir konu var mı?",
};

// Hizmet eşleştirme — anahtar kelimelerden hizmet kategorisine.
// Asistan tek kelime üzerinden kesin karar vermez; bu yalnızca öneri amaçlıdır.
export const SERVICE_KEYWORD_MAP = [
  {
    services: ["İç Cephe Boya", "Alçı ve Sıva", "Çatlak Tamiri"],
    keywords: ["duvar çatlak", "duvarda çatlak", "boya dökül", "duvar boya", "iç boya", "saten alçı", "duvar tamiri"],
  },
  {
    services: ["Çatı İzolasyonu", "Çatı Tamiri", "Su Yalıtımı"],
    keywords: ["çatı", "teras su", "yağmur su", "çatı su", "çatı akınt", "su geliyor tavandan", "tavan su"],
  },
  {
    services: ["Su Yalıtımı", "Banyo ve Mutfak"],
    keywords: ["su sızıntı", "banyo su", "mutfak su", "rutubet", "nem", "su yalıtım", "gider su"],
  },
  {
    services: ["Dış Cephe Boya", "Dış Cephe Sıva", "Mantolama"],
    keywords: ["dış cephe", "dış boya", "cephe çatlak", "mantolama", "cephe eski", "bina dış"],
  },
  {
    services: ["Alçıpan", "Asma Tavan", "LED Tavan"],
    keywords: ["alçıpan", "asma tavan", "led tavan", "gizli ışık", "tavan uygulama"],
  },
  {
    services: ["Komple Ev Tadilatı", "Anahtar Teslim Renovasyon"],
    keywords: ["komple tadilat", "ev komple", "anahtar teslim", "ev yenile", "komple yenile", "tüm ev"],
  },
  {
    services: ["Banyo ve Mutfak", "Su Yalıtımı"],
    keywords: ["banyo yenile", "mutfak yenile", "banyo tadilat", "mutfak tadilat", "fayans"],
  },
];

// İnsan desteğine otomatik geçiş tetikleyicileri.
// Not: Daire boyama fiyat soruları asistan tarafından cevaplanır (merkezi fiyat
// tablosu), bu yüzden "ne kadar/kaça/ücret" gibi ifadeler burada yer almaz.
export const HUMAN_HANDOFF_TRIGGERS = [
  "şikayet", "memnun değil", "sorun yaşadım",
  "randevu kesin", "randevuyu yaz", "yarın saat",
  "sözleşme", "ödeme", "fatura", "kapora",
  "mevcut talebim", "talep numaram",
];

// Acil/güvenlik anahtar kelimeleri — normal akışa devam etmez.
export const EMERGENCY_KEYWORDS = [
  "elektrik", "kıvılcım", "yangın", "gaz kokusu", "gaz kaçağı",
  "şiddetli su", "su bastı", "çökme", "göçük", "yaralanma", "acı acil",
];

// Yasak konular (asistan yetkili cevap vermez).
export const OUT_OF_SCOPE_TOPICS = [
  "hukuki", "avukat", "tazminat",
  "tıbbi", "sağlık", "doktor",
  "vergi", "fatura hukuku", "mühendislik raporu",
];

// Hassas veri tespiti — kullanıcı uyarılır, kaydedilmez.
export const SENSITIVE_DATA_PATTERNS = [
  /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/, // kart
  /\b\d{16}\b/,
  /parola|şifre|sifre/i,
  /iban/i,
  /tc\s?no|tc kimlik/i,
];

// Ziyaretçiye gösterilen iletişim hızlı bağlantıları.
export const ASSISTANT_CONTACT = {
  phoneDisplay: siteConfig.phone.display,
  phoneLink: getPhoneLink(),
  whatsappLink: getWhatsAppLink(),
  whatsappDisplay: siteConfig.whatsapp.display,
  emailLink: getEmailLink(),
};

// Gizlilik kısa bilgilendirme metni.
export const PRIVACY_NOTE =
  "Güvenliğiniz için kimlik, banka kartı, parola veya gereksiz özel bilgilerinizi paylaşmayın. Sohbet yalnızca talebinizi değerlendirmek amacıyla kullanılır.";

// Fotoğraf gizlilik bilgisi.
export const PHOTO_PRIVACY_NOTE =
  "Yüklediğiniz fotoğraflar talebinizin değerlendirilmesi amacıyla kullanılacaktır. Açık izin vermediğiniz sürece proje, galeri veya sosyal medya alanlarında yayınlanmayacaktır.";