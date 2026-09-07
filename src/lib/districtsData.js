// ============================================================================
// İZMİR İLÇE VE MAHALLE VERİ TABANI — Merkezi kaynak (Part 19)
// ----------------------------------------------------------------------------
// Bu liste İzmir'in 30 ilçesinin öncelik grupları, hizmet durumu, doğrulanmış
// mahalle listeleri ve yakın bölge ilişkilerini içerir. ServiceArea entity'si
// bu verilerin yönetilebilir kopyasıdır; bu liste yedek ve yardımcıdır.
//
// Mahalle listeleri İzmir ilçe belediyelerinin resmî kaynaklarına göre
// doğrulanmıştır. Yönetici onayı olmadan yeni mahalle eklenmemelidir.
// ============================================================================

export const PRIORITY_GROUPS = {
  merkez: {
    label: "Birinci Öncelikli Merkez Bölgeler",
    short: "Merkez İlçeler",
  },
  yakin: {
    label: "İkinci Öncelikli Yakın Bölgeler",
    short: "Yakın Bölgeler",
  },
  talebe: {
    label: "Talebe ve İşin Kapsamına Göre Değerlendirilecek Bölgeler",
    short: "Talebe Göre",
  },
  uzak: {
    label: "Uzak Bölgeler",
    short: "Uzak Bölgeler",
  },
};

export const SERVICE_STATUS_LABELS = {
  featured: "Ana Hizmet Bölgesi",
  active: "Düzenli Hizmet Veriliyor",
  on_request: "İşin Kapsamına Göre Değerlendiriliyor",
  inactive: "Şu Anda Hizmet Verilmiyor",
};

export const SERVICE_STATUS_SHORT = {
  featured: "Ana Hizmet Bölgesi",
  active: "Hizmet Veriliyor",
  on_request: "Talebe Göre",
  inactive: "Pasif",
};

// Ortak yapı türleri — ilçeye özel değil, genel kullanım.
export const COMMON_BUILDING_TYPES = [
  "Daire",
  "Müstakil ev",
  "Villa",
  "Apartman",
  "Ofis",
  "Mağaza",
  "Dükkan",
  "Bina ortak alanı",
  "Merdiven",
  "Teras",
  "Balkon",
  "Çatı",
];

// --- 30 İZMİR İLÇESİ KAYITLARI ---------------------------------------------

export const izmirDistricts = [
  // === Birinci Öncelikli Merkez Bölgeler ===
  {
    name: "Bornova",
    slug: "bornova",
    service_status: "featured",
    priority_group: "merkez",
    featured: true,
    order: 1,
    page_status: "published",
    neighborhoods: [
      "Mevlana Mahallesi", "Kazım Dirik Mahallesi", "Çamkule Mahallesi",
      "Evka 3 Mahallesi", "Mustafa Kemal Atatürk Mahallesi", "İnönü Mahallesi",
      "Turgut Özal Mahallesi", "Yeşilova Mahallesi", "Yenimahalle Mahallesi",
      "Kızılay Mahallesi", "Yıldız Mahallesi", "Umurbey Mahallesi",
      "Rivnak Mahallesi", "Çiçekli Mahallesi", "Nafiz Gürkan Mahallesi",
      "Hatana Mahallesi", "Karaçay Mahallesi", "Meriç Mahallesi",
      "Işıkkent Mahallesi", "Birlik Mahallesi", "Zafer Mahallesi",
    ],
    nearby: ["bayrakli", "kemalpasa", "konak", "buca", "karsiyaka"],
  },
  {
    name: "Bayraklı",
    slug: "bayrakli",
    service_status: "active",
    priority_group: "merkez",
    order: 2,
    neighborhoods: [
      "75. Yıl Mahallesi", "Doğanlar Mahallesi", "Cevatpaşa Mahallesi",
      "Fatih Mahallesi", "İmrahor Mahallesi", "Mansuroğlu Mahallesi",
      "Otlukbayır Mahallesi", "Postallı Mahallesi", "Soğukkuyu Mahallesi",
      "Tepecik Mahallesi", "Yamanlar Mahallesi", "Çiçekli Mahallesi",
      "Ergene Mahallesi", "İnkaya Mahallesi", "Adalet Mahallesi",
      "İstiklal Mahallesi", "Yeşilbağlar Mahallesi",
    ],
    nearby: ["bornova", "karsiyaka", "konak", "cigli"],
  },
  {
    name: "Karşıyaka",
    slug: "karsiyaka",
    service_status: "active",
    priority_group: "merkez",
    order: 3,
    neighborhoods: [
      "Bostanlı Mahallesi", "Mavişehir Mahallesi", "Yalı Mahallesi",
      "Atakent Mahallesi", "Cumhuriyet Mahallesi", "Soğukkuyu Mahallesi",
      "Tınaztepe Mahallesi", "Aksoy Mahallesi", "Ali Çetinkaya Mahallesi",
      "Bahçeler Mahallesi", "Cevizlik Mahallesi", "Demirköprü Mahallesi",
      "Donatçılar Mahallesi", "Goncalar Mahallesi", "Halkapınar Mahallesi",
      "Mehmet Ali Kâhya Mahallesi", "Ömür Mahallesi",
      "Şehit Cengiz Topel Mahallesi", "Yamanlar Mahallesi",
      "Zübeyde Hanım Mahallesi",
    ],
    nearby: ["bayrakli", "cigli", "konak", "bornova"],
  },
  {
    name: "Konak",
    slug: "konak",
    service_status: "active",
    priority_group: "merkez",
    order: 4,
    neighborhoods: [
      "Alsancak Mahallesi", "Göztepe Mahallesi", "Güzelyalı Mahallesi",
      "Hatay Mahallesi", "Basmane Mahallesi", "Çankaya Mahallesi",
      "Konak Merkez Mahallesi", "Akıncılar Mahallesi", "Alaybey Mahallesi",
      "Eşrefpaşa Mahallesi", "Gazi Osman Paşa Mahallesi",
      "Halkapınar Mahallesi", "Halit Ziya Mahallesi", "İsmet Kaya Mahallesi",
      "Kemer Mahallesi", "Liman Mahallesi", "Mersinli Mahallesi",
      "Meydan Mahallesi", "Namazgah Mahallesi", "Varyant Mahallesi",
      "Yeniköy Mahallesi", "Yıldız Mahallesi", "İkiçeşmelik Mahallesi",
      "Soğukkuyu Mahallesi", "Tanal Mahallesi", "Topaltı Mahallesi",
    ],
    nearby: ["bornova", "buca", "karsiyaka", "karabaglar", "bayrakli"],
  },
  {
    name: "Buca",
    slug: "buca",
    service_status: "active",
    priority_group: "merkez",
    order: 5,
    neighborhoods: [
      "Şirinyer Mahallesi", "Doğançay Mahallesi", "Fikri Altay Mahallesi",
      "Kozağaç Mahallesi", "Vali Rahmi Bey Mahallesi", "İnkaya Mahallesi",
      "Sarnıçpınar Mahallesi", "Günyurdu Mahallesi", "Akınlar Mahallesi",
      "Belcik Mahallesi", "Çamlık Mahallesi", "Düzce Mahallesi",
      "Esertepe Mahallesi", "Göksu Mahallesi", "Karacaağaç Mahallesi",
      "Kırıklar Mahallesi", "Sarnıç Mahallesi", "Şirinler Mahallesi",
      "Ufuk Mahallesi", "Yıldızlar Mahallesi", "Buca Merkez Mahallesi",
    ],
    nearby: ["konak", "bornova", "karabaglar", "gaziemir"],
  },
  {
    name: "Çiğli",
    slug: "cigli",
    service_status: "active",
    priority_group: "merkez",
    order: 6,
    neighborhoods: [
      "Atatürk Mahallesi", "Balatçık Mahallesi", "Çakmaklı Mahallesi",
      "Esnaf Mahallesi", "Egekent Mahallesi", "Evka 2 Mahallesi",
      "Güzeltepe Mahallesi", "Kaklıç Mahallesi", "Karaağaçlı Mahallesi",
      "Küçük Çiğli Mahallesi", "Merkez Mahallesi", "Mustafa Kemal Mahallesi",
      "Sakarya Mahallesi", "Sanayi Mahallesi", "Sunturlu Mahallesi",
      "Tuzla Mahallesi", "Yenimahalle Mahallesi",
    ],
    nearby: ["karsiyaka", "bayrakli", "bornova", "menemen"],
  },
  {
    name: "Karabağlar",
    slug: "karabaglar",
    service_status: "active",
    priority_group: "merkez",
    order: 7,
    neighborhoods: [
      "Abdi İpekçi Mahallesi", "Adalet Mahallesi", "Bahar Mahallesi",
      "Berrin Mahallesi", "Cengizhan Mahallesi", "Dağkızılhan Mahallesi",
      "Ersu Mahallesi", "Esenyalı Mahallesi", "Fatih Mahallesi",
      "Gaziler Mahallesi", "General Asım Gündüz Mahallesi",
      "İsmet Kaya Mahallesi", "Kamberli Mahallesi", "Kayısıcı Mahallesi",
      "Korutürk Mahallesi", "Menderes Mahallesi", "Özgür Mahallesi",
      "Polisgücü Mahallesi", "Refet Bele Mahallesi",
      "Salih Omurtak Mahallesi", "Tınaztepe Mahallesi",
      "Uzundere Mahallesi", "Vatan Mahallesi", "Yalı Mahallesi",
      "Yenimahalle Mahallesi", "Yeşilköy Mahallesi",
    ],
    nearby: ["konak", "buca", "gaziemir", "balcova"],
  },
  {
    name: "Gaziemir",
    slug: "gaziemir",
    service_status: "active",
    priority_group: "merkez",
    order: 8,
    neighborhoods: [
      "Atıf Bey Mahallesi", "Bahriyeli Mahallesi", "Cengiz Topel Mahallesi",
      "Emrez Mahallesi", "Fatih Mahallesi", "Gazi Mahallesi",
      "Girne Mahallesi", "İsmet İnönü Mahallesi", "İsmet Kaya Mahallesi",
      "Menderes Mahallesi", "Sarnıç Mahallesi", "Yenimahalle Mahallesi",
      "Kültür Mahallesi", "Dokuz Eylül Mahallesi",
    ],
    nearby: ["karabaglar", "buca", "balcova", "guzelbahce", "narlidere"],
  },
  {
    name: "Balçova",
    slug: "balcova",
    service_status: "active",
    priority_group: "merkez",
    order: 9,
    neighborhoods: [
      "Balçova Mahallesi", "Çağdaş Mahallesi", "Korutürk Mahallesi",
      "Onur Mahallesi", "Turan Mahallesi", "Bahçelievler Mahallesi",
      "Yeni Mahallesi",
    ],
    nearby: ["karabaglar", "narlidere", "gaziemir", "konak"],
  },
  {
    name: "Narlıdere",
    slug: "narlidere",
    service_status: "on_request",
    priority_group: "merkez",
    order: 10,
    neighborhoods: [
      "Narlıdere Mahallesi", "İbn-i Sina Mahallesi", "Çamönü Mahallesi",
      "Limantepe Mahallesi", "Sahilevleri Mahallesi", "Ovakent Mahallesi",
    ],
    nearby: ["balcova", "guzelbahce", "karabaglar", "gaziemir"],
  },
  {
    name: "Güzelbahçe",
    slug: "guzelbahce",
    service_status: "on_request",
    priority_group: "merkez",
    order: 11,
    neighborhoods: [
      "Güzelbahçe Mahallesi", "Bahyeli Mahallesi", "Çamlı Mahallesi",
      "İçmeler Mahallesi", "Kaklıç Mahallesi", "Kuruçay Mahallesi",
      "Maltepe Mahallesi", "Payamlı Mahallesi", "Siteler Mahallesi",
      "Yaka Mahallesi",
    ],
    nearby: ["narlidere", "balcova", "urla", "gaziemir"],
  },
  // === İkinci Öncelikli Yakın Bölgeler ===
  {
    name: "Kemalpaşa",
    slug: "kemalpasa",
    service_status: "on_request",
    priority_group: "yakin",
    order: 12,
    neighborhoods: [
      "Kemalpaşa Merkez Mahallesi", "Armutlu Mahallesi", "Akpınar Mahallesi",
      "Damlacık Mahallesi", "Nazarköy Mahallesi", "Ören Mahallesi",
      "Çambel Mahallesi",
    ],
    nearby: ["bornova", "torbali", "menemen", "bayindir"],
  },
  {
    name: "Menemen",
    slug: "menemen",
    service_status: "on_request",
    priority_group: "yakin",
    order: 13,
    neighborhoods: [
      "Menemen Merkez Mahallesi", "Asmalı Mahallesi", "Boz Mahallesi",
      "Çavuşköy Mahallesi", "Hacıömerli Mahallesi", "Hüseyinli Mahallesi",
      "İstiklal Mahallesi", "Karaağaçlı Mahallesi", "Karakız Mahallesi",
      "Koyundere Mahallesi", "Mursallı Mahallesi", "Süleymanlı Mahallesi",
      "Turgutlar Mahallesi", "Türkmen Mahallesi",
    ],
    nearby: ["cigli", "kemalpasa", "aliaga", "foça"],
  },
  {
    name: "Menderes",
    slug: "menderes",
    service_status: "on_request",
    priority_group: "yakin",
    order: 14,
    neighborhoods: [
      "Menderes Merkez Mahallesi", "Akça Mahallesi", "Atatürk Mahallesi",
      "Cumhuriyet Mahallesi", "Çamönü Mahallesi", "Develi Mahallesi",
      "Göçbeyli Mahallesi", "Oğlananası Mahallesi", "Özdere Mahallesi",
      "Söğütlü Mahallesi",
    ],
    nearby: ["guzelbahce", "seferihisar", "torbali", "urla"],
  },
  {
    name: "Torbalı",
    slug: "torbali",
    service_status: "on_request",
    priority_group: "yakin",
    order: 15,
    neighborhoods: [
      "Torbalı Merkez Mahallesi", "Aypınar Mahallesi", "Cumhuriyet Mahallesi",
      "Çayırlı Mahallesi", "Dağtekke Mahallesi", "Pancar Mahallesi",
      "Çakıllar Mahallesi", "Çaylı Mahallesi", "Subaşı Mahallesi",
      "Kalpaklı Mahallesi", "Fevzipaşa Mahallesi", "Turgutlar Mahallesi",
      "Varna Mahallesi", "Yeniköy Mahallesi", "Özbey Mahallesi",
    ],
    nearby: ["kemalpasa", "bornova", "bayindir", "menderes"],
  },
  {
    name: "Urla",
    slug: "urla",
    service_status: "on_request",
    priority_group: "yakin",
    order: 16,
    neighborhoods: [
      "Urla Merkez Mahallesi", "Altınkum Mahallesi", "Birgi Mahallesi",
      "Çakabey Mahallesi", "Demircili Mahallesi", "Güvendik Mahallesi",
      "Iskele Mahallesi", "Kaklıç Mahallesi", "Kalabak Mahallesi",
      "Karantina Mahallesi", "Kuscular Mahallesi", "Malgasaca Mahallesi",
      "Nohutalan Mahallesi", "Ovacık Mahallesi", "Zeytinler Mahallesi",
    ],
    nearby: ["guzelbahce", "narlidere", "seferihisar", "cesme"],
  },
  {
    name: "Aliağa",
    slug: "aliaga",
    service_status: "on_request",
    priority_group: "yakin",
    order: 17,
    neighborhoods: [
      "Aliağa Merkez Mahallesi", "Altıntaş Mahallesi", "Atatürk Mahallesi",
      "Çaltıdere Mahallesi", "Horozgediği Mahallesi", "Kurtuluş Mahallesi",
      "Menderes Mahallesi", "Mıhlı Mahallesi", "Pelitköy Mahallesi",
      "Sarıhamza Mahallesi", "Şehitkemal Mahallesi", "Yeni Mahalle Mahallesi",
      "Yüksekköy Mahallesi",
    ],
    nearby: ["menemen", "foça", "cigli"],
  },
  {
    name: "Foça",
    slug: "foca",
    service_status: "on_request",
    priority_group: "yakin",
    order: 18,
    neighborhoods: [
      "Foça Merkez Mahallesi", "Bağarası Mahallesi", "Deniz Mahallesi",
      "Ilıpınar Mahallesi", "Kozbeyli Mahallesi", "Yenifoça Mahallesi",
    ],
    nearby: ["menemen", "aliaga", "karaburun"],
  },
  // === Talebe ve İşin Kapsamına Göre Değerlendirilecek Bölgeler ===
  {
    name: "Bayındır",
    slug: "bayindir",
    service_status: "on_request",
    priority_group: "talebe",
    order: 19,
    neighborhoods: [
      "Bayındır Merkez Mahallesi", "Cumaova Mahallesi", "Dereköy Mahallesi",
      "Hasköy Mahallesi", "İstiklal Mahallesi", "Kızılcaağaç Mahallesi",
      "Pınarlı Mahallesi", "Toparlar Mahallesi",
    ],
    nearby: ["torbali", "kemalpasa", "tire", "odemis"],
  },
  {
    name: "Bergama",
    slug: "bergama",
    service_status: "on_request",
    priority_group: "talebe",
    order: 20,
    neighborhoods: [
      "Bergama Merkez Mahallesi", "Atatürk Mahallesi", "Cuma Mahallesi",
      "Fatih Mahallesi", "İstiklal Mahallesi", "Kayıköy Mahallesi",
      "Mahmutlu Mahallesi", "Muradiye Mahallesi", "Pınarbaşı Mahallesi",
      "Göçbeyli Mahallesi", "Yeniköy Mahallesi",
    ],
    nearby: ["kinik", "aliaga", "dikili"],
  },
  {
    name: "Beydağ",
    slug: "beydag",
    service_status: "on_request",
    priority_group: "talebe",
    order: 21,
    neighborhoods: [
      "Beydağ Merkez Mahallesi", "Çamlı Mahallesi", "Deredere Mahallesi",
      "Karaköy Mahallesi", "Mahmudlar Mahallesi", "Uzundere Mahallesi",
      "Yeniköy Mahallesi",
    ],
    nearby: ["kiraz", "odemis", "tire"],
  },
  {
    name: "Çeşme",
    slug: "cesme",
    service_status: "on_request",
    priority_group: "talebe",
    order: 22,
    neighborhoods: [
      "Çeşme Merkez Mahallesi", "Alaçatı Mahallesi", "Dalama Mahallesi",
      "Ildırı Mahallesi", "Ovacık Mahallesi", "Çakabey Mahallesi",
      "Germiyan Mahallesi",
    ],
    nearby: ["urla", "karaburun", "seferihisar"],
  },
  {
    name: "Dikili",
    slug: "dikili",
    service_status: "on_request",
    priority_group: "talebe",
    order: 23,
    neighborhoods: [
      "Dikili Merkez Mahallesi", "Çandarlı Mahallesi", "Denizköy Mahallesi",
      "Gökçeağıl Mahallesi", "Kavaklı Mahallesi", "Kızılçukur Mahallesi",
      "Merdivenlidere Mahallesi", "Salihler Mahallesi", "Sağırlar Mahallesi",
    ],
    nearby: ["bergama", "aliaga", "foça"],
  },
  {
    name: "Karaburun",
    slug: "karaburun",
    service_status: "on_request",
    priority_group: "talebe",
    order: 24,
    neighborhoods: [
      "Karaburun Merkez Mahallesi", "Mordoğan Mahallesi", "Yenice Mahallesi",
      "Eğriliman Mahallesi", "Küçükbahçe Mahallesi", "Sarpıncık Mahallesi",
      "Tepeboz Mahallesi",
    ],
    nearby: ["cesme", "urla", "foça"],
  },
  {
    name: "Kınık",
    slug: "kinik",
    service_status: "on_request",
    priority_group: "talebe",
    order: 25,
    neighborhoods: [
      "Kınık Merkez Mahallesi", "Arpaseki Mahallesi", "Çaltıkoru Mahallesi",
      "Harmantarı Mahallesi", "İnönü Mahallesi", "Taşköprü Mahallesi",
      "Yenice Mahallesi", "Yeşilyurt Mahallesi",
    ],
    nearby: ["bergama", "aliaga", "dikili"],
  },
  {
    name: "Kiraz",
    slug: "kiraz",
    service_status: "on_request",
    priority_group: "talebe",
    order: 26,
    neighborhoods: [
      "Kiraz Merkez Mahallesi", "Aydınlar Mahallesi", "Başköy Mahallesi",
      "Beylerler Mahallesi", "Değirmendere Mahallesi", "İseodasi Mahallesi",
      "Kaşıkçı Mahallesi", "Ovacık Mahallesi", "Pireli Mahallesi",
      "Yeni Mahallesi",
    ],
    nearby: ["beydag", "odemis", "bayindir"],
  },
  {
    name: "Ödemiş",
    slug: "odemis",
    service_status: "on_request",
    priority_group: "talebe",
    order: 27,
    neighborhoods: [
      "Ödemiş Merkez Mahallesi", "Birgi Mahallesi", "Bozdağ Mahallesi",
      "Çayır Mahallesi", "Gölcük Mahallesi", "Horzum Mahallesi",
      "Kaymaköy Mahallesi", "Kırıklar Mahallesi", "Küçüköztürk Mahallesi",
      "Ovakent Mahallesi", "Pirinççi Mahallesi", "Türkönü Mahallesi",
      "Yeniköy Mahallesi", "Çamlı Mahallesi",
    ],
    nearby: ["beydag", "kiraz", "bayindir", "tire"],
  },
  {
    name: "Seferihisar",
    slug: "seferihisar",
    service_status: "on_request",
    priority_group: "talebe",
    order: 28,
    neighborhoods: [
      "Seferihisar Merkez Mahallesi", "Doğanbey Mahallesi", "Düzce Mahallesi",
      "Gödence Mahallesi", "Sığacık Mahallesi", "Ulamış Mahallesi",
      "Teos Mahallesi",
    ],
    nearby: ["urla", "menderes", "guzelbahce", "cesme"],
  },
  {
    name: "Selçuk",
    slug: "selcuk",
    service_status: "on_request",
    priority_group: "talebe",
    order: 29,
    neighborhoods: [
      "Selçuk Merkez Mahallesi", "Ayasoluk Mahallesi", "Çamlık Mahallesi",
      "Havuçlu Mahallesi", "Orhaniye Mahallesi", "Sultaniye Mahallesi",
      "Viranşehir Mahallesi", "Yeniköy Mahallesi",
    ],
    nearby: ["torbali", "menderes", "tire", "bayindir"],
  },
  {
    name: "Tire",
    slug: "tire",
    service_status: "on_request",
    priority_group: "talebe",
    order: 30,
    neighborhoods: [
      "Tire Merkez Mahallesi", "Akköy Mahallesi", "Boynuyoğun Mahallesi",
      "Büyükmenderes Mahallesi", "Çay Mahallesi", "Çobanköy Mahallesi",
      "Dibekli Mahallesi", "Doyuran Mahallesi", "Gökçen Mahallesi",
      "İçmeler Mahallesi", "Kızılca Mahallesi", "Tekeli Mahallesi",
    ],
    nearby: ["bayindir", "odemis", "torbali", "selcuk"],
  },
];

// --- Yardımcı fonksiyonlar -------------------------------------------------

export const districtBySlug = (slug) =>
  izmirDistricts.find((d) => d.slug === slug) || null;

export const districtsByGroup = (group) =>
  izmirDistricts.filter((d) => d.priority_group === group);

export const districtSearch = (query, districts = izmirDistricts) => {
  if (!query || !query.trim()) return districts;
  const q = normalize(query).toLowerCase();
  return districts.filter((d) => {
    const name = normalize(d.name).toLowerCase();
    const inName = name.includes(q);
    const inNeighborhood = (d.neighborhoods || []).some((n) =>
      normalize(n).toLowerCase().includes(q)
    );
    return inName || inNeighborhood;
  });
};

// Türkçe karakter duyarsız normalleştirme (arama için)
export function normalize(str = "") {
  return String(str)
    .replace(/İ/g, "i")
    .replace(/I/g, "ı")
    .replace(/Ş/g, "s")
    .replace(/Ğ/g, "g")
    .replace(/Ü/g, "u")
    .replace(/Ö/g, "o")
    .replace(/Ç/g, "c")
    .toLocaleLowerCase("tr");
}

// Alsancak gibi semt/mahalle adlarını ilçeye eşle
export const SEMT_TO_DISTRICT = {
  alsancak: "konak",
  göztepe: "konak",
  güzelyalı: "konak",
  bostanlı: "karsiyaka",
  mavişehir: "karsiyaka",
  şirinyer: "buca",
  mansuroğlu: "bayrakli",
  mevlana: "bornova",
  evka3: "bornova",
  "evka 3": "bornova",
  kazımdirik: "bornova",
};

export function semtToDistrict(semt) {
  if (!semt) return null;
  const key = normalize(semt).replace(/mahallesi$|mh$/g, "").trim();
  const direct = SEMT_TO_DISTRICT[key];
  if (direct) return direct;
  // Mahalle adıyla ilçe eşle
  for (const d of izmirDistricts) {
    const base = normalize(d.name).replace(/mahallesi$/g, "");
    if (key === base) return d.slug;
  }
  return null;
}