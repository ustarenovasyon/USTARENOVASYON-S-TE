// ============================================================================
// İLÇELERE ÖZGÜN İÇERİK — Part 19
// ----------------------------------------------------------------------------
// Her ilçe için özgün hero başlığı, giriş metni, SSS, SEO başlığı, meta
// açıklaması ve WhatsApp mesajı. Hiçbir ilçe başka ilçeden kopyalanmadı;
// her biri kendi hizmet önceliğine ve konumuna göre yazıldı.
//
// Bu içerik ServiceArea entity kaydının varsayılan değeridir; yönetici
// panelden override edebilir.
// ============================================================================

// Hizmet slugs — ilçe kartlarında öne çıkan hizmetler için ortak referans
const SVC = {
  icBoya: "ic-cephe-boya",
  disBoya: "dis-cephe-boya",
  alci: "alci-siva",
  cati: "cati-izolasyonu",
  su: "su-yalitimi",
  manto: "mantolama",
  alcipan: "alcipan",
  tadilat: "komple-ev-tadilati",
  banyo: "banyo-tadilati",
  mutfak: "mutfak-tadilati",
};

export const districtContent = {
  // ===== BORNOVA (Ana hizmet bölgesi) =====
  bornova: {
    hero_title: "Bornova Boya, Alçı, İzolasyon ve Tadilat Hizmetleri",
    short_description:
      "Usta Renovasyon'un ana hizmet bölgesi Bornova'da iç ve dış cephe boya, alçı, sıva, çatı izolasyonu, su yalıtımı, mantolama, alçıpan ve komple ev tadilatı hizmetleri.",
    intro:
      "Usta Renovasyon'un ana hizmet bölgesi Bornova'dır. Özal Usta yönetiminde Bornova'nın Mevlana, Kazım Dirik, Evka 3, Yeşilova, Işıkkent ve diğer mahallelerinde daire, müstakil ev, ofis ve apartman ortak alanlarında iç ve dış cephe boya, saten alçı, çatlak tamiri, çatı ve teras izolasyonu, su yalıtımı, mantolama, alçıpan ve asma tavan, banyo-mutfak tadilatı ve komple ev yenileme hizmetleri sunuyoruz. İşin türü, alanın büyüklüğü, mevcut yüzey durumu ve çalışma planına göre hizmet uygunluğu değerlendirilir. Net fiyat; yapılacak işin kapsamına göre keşif veya fotoğraf değerlendirmesi sonrasında belirlenir. Yapılacak alanın fotoğraflarını WhatsApp üzerinden göndererek ön bilgi alabilir, ücretsiz keşif uygunluğunu sorabilirsiniz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.cati, SVC.tadilat, SVC.disBoya, SVC.su],
    building_types: ["Daire", "Müstakil ev", "Villa", "Apartman", "Ofis", "Bina ortak alanı", "Merdiven", "Teras", "Çatı"],
    process_text:
      "Bornova'da bir talep geldiğinde önce yapılacak işin türü ve konumu değerlendirilir. Müşteri tarafından gönderilen fotoğraf ve ölçü bilgileri incelenir, hizmet uygunluğu kontrol edilir. Gerekli durumlarda keşif planlanır; iş kapsamı ve uygulanacak işlemler netleştirilir. Teklif ve çalışma planı hazırlandıktan sonra Özal Usta onayıyla uygulama süreci başlar. Kesin dönüş veya varış süresi vaat edilmez; çalışma planı işin yoğunluğuna göre paylaşılır.",
    pricing_text:
      "Bornova'da fiyat; yapılacak hizmetin türüne, alanın büyüklüğüne, mevcut yüzey durumuna, tamirat ihtiyacına, kullanılacak malzemeye ve işin kapsamına göre değişir. Boya, alçı ve izolasyon işlerinde metrekare veya birim fiyatı alan ve yüzey durumu bilinmeden verilemez. Fotoğraf ve temel bilgiler gönderilerek ön değerlendirme alınabilir; gerekli durumlarda keşif talebi oluşturulur.",
    faqs: [
      { q: "Bornova'nın hangi mahallelerinde hizmet veriyorsunuz?", a: "Bornova'nın Mevlana, Kazım Dirik, Çamkule, Evka 3, Yeşilova, Işıkkent, Turgut Özal ve diğer doğrulanmış mahallelerinde hizmet uygunluğu işin türü ve çalışma planına göre değerlendirilir. Bulunduğunuz mahalleyi belirterek bilgi alabilirsiniz." },
      { q: "Bornova'da fotoğraf göndererek fiyat alabilir miyim?", a: "Evet. Yapılacak alanın genel görünümünü ve sorunlu bölgenin yakın çekimini WhatsApp üzerinden göndererek ön bilgi alabilirsiniz. Net fiyat; yüzey durumu, ölçü ve iş kapsamı netleştikten sonra, gerekirse keşifle belirlenir." },
      { q: "Eşyalı dairede boya yapılır mı?", a: "Eşyalı dairelerde boya yapılabilir. Mobilya ve zemin koruma altına alınır; taşınabilir eşyalar toplanır, sabit eşyalar örtülür. Çalışma planı ve koruma detayları önceden paylaşılır." },
      { q: "Bornova'da çatı veya teras su sızıntısı için keşif gerekli mi?", a: "Çatı ve teras sızıntılarında yerinde inceleme önemlidir. Sızıntının kaynağı ve uygulama yöntemi ancak keşifle netleşir. Fotoğraf paylaşarak ön değerlendirme yapılabilir; kesin çözüm keşif sonrası önerilir." },
      { q: "Alçı ve boya işlemleri birlikte yapılabilir mi?", a: "Evet. Çatlak tamiri, saten alçı ve son kat boya genellikle birlikte planlanır. Aynı ekip sırayla uygular; bu hem süre hem maliyet açısından avantajlıdır. Kapsam Özal Usta ile netleştirilir." },
      { q: "Bornova'da keşif ücretli mi?", a: "Keşif uygunluğu işin türü ve büyüklüğüne göre değerlendirilir. Küçük işlerde fotoğraf yeterli olabilir; büyük işlerde keşif planlanır. Keşif koşulları teklif aşamasında netleşir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Bornova'da yapılacak boya, alçı, izolasyon veya tadilat işi hakkında bilgi almak için Usta Renovasyon web siteniz üzerinden ulaşıyorum. Yapılacak alanın detaylarını ve fotoğraflarını paylaşmak istiyorum.",
    seo_title: "Bornova Boya, Alçı ve Tadilat Ustası | Usta Renovasyon",
    meta_description: "Bornova'da iç ve dış cephe boya, saten alçı, çatı izolasyonu, su yalıtımı, mantolama, alçıpan ve komple ev tadilatı. Özal Usta yönetiminde ücretsiz keşif ve teklif.",
  },

  // ===== BAYRAKLI =====
  bayrakli: {
    hero_title: "Bayraklı Boya, Alçı, Mantolama ve Tadilat Hizmetleri",
    short_description:
      "Bayraklı'da iç ve dış cephe boya, alçı, sıva, mantolama, su yalıtımı ve ev-ofis tadilatı hizmetleri.",
    intro:
      "Bayraklı, Bornova ve Karşıyaka'ya komşu büyüyen bir ilçedir. Mansuroğlu, Doğanlar, Tepecik ve 75. Yıl civarında yeni yapılaşmanın yoğun olduğu bölgelerde boya, alçı, mantolama ve dış cephe işleri; Fatih ve İmrahor gibi yerleşim yerlerinde iç mekan tadilatı talep görür. Usta Renovasyon olarak işin türü ve büyüklüğüne göre Bayraklı'da hizmet uygunluğu değerlendiririz. Fotoğraf paylaşarak ön bilgi alabilir, keşif ihtiyacını birlikte belirleyebilirsiniz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.manto, SVC.disBoya, SVC.tadilat, SVC.su],
    building_types: ["Daire", "Apartman", "Ofis", "Bina ortak alanı", "Teras", "Çatı"],
    process_text:
      "Bayraklı'ya gelen taleplerde önce konum ve iş kapsamı değerlendirilir. Fotoğraflar incelenir, hizmet uygunluğu kontrol edilir, gerekirse keşif planlanır. Teklif ve çalışma planı netleştikten sonra Özal Usta onayıyla uygulama başlar.",
    pricing_text:
      "Bayraklı'da fiyat; hizmet türü, alan büyüklüğü, yüzey durumu ve iş kapsamına göre değişir. Mantolama ve dış cephe işlerinde bina ölçüsü, iç cephe boya işlerinde oda sayısı ve duvar durumu etkendir. Net bilgi için fotoğraf veya keşif önerilir.",
    faqs: [
      { q: "Bayraklı'da dış cephe ve mantolama yapıyor musunuz?", a: "Dış cephe boya ve mantolama iş kapsamına göre değerlendirilir. Bina ölçüsü, cephe durumu ve kat sayısı netleştiğinde çalışma planı paylaşılır. Apartman yönetimleri için ortak teklif hazırlanabilir." },
      { q: "Bayraklı'nın hangi bölgeleri değerlendiriliyor?", a: "Mansuroğlu, Doğanlar, Tepecik, Fatih ve 75. Yıl civarı başta olmak üzere Bayraklı'nın doğrulanmış mahallelerinde işin türüne göre hizmet değerlendirilir." },
      { q: "Yeni dairede boya ne kadar sürer?", a: "Süre; oda sayısı, duvar durumu ve yapılacak işin kapsamına göre değişir. Net süre Özal Usta iş planını oluşturduğunda paylaşılır." },
      { q: "Ofis tadilatında çalışma saati planlanabilir mi?", a: "Ofislerde çalışma saatleri iş sahibinin iş planına göre ayarlanabilir. Mesai dışı veya hafta sonu çalışma koşulları önceden netleşir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Bayraklı'da yapılacak boya, alçı, mantolama veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet uygunluğu ve fiyat teklifi hakkında bilgi almak istiyorum.",
    seo_title: "Bayraklı Alçı, Boya ve İzolasyon Hizmetleri | Usta Renovasyon",
    meta_description: "Bayraklı'da iç ve dış cephe boya, alçı, mantolama, su yalıtımı ve ev-ofis tadilatı için Usta Renovasyon. Özal Usta yönetiminde fotoğrafla ön bilgi ve keşif.",
  },

  // ===== KARŞIYAKA =====
  karsiyaka: {
    hero_title: "Karşıyaka Boya Ustası, İzolasyon ve Tadilat Hizmetleri",
    short_description:
      "Karşıyaka'da iç ve dış cephe boya, alçı, sıva, su yalıtımı, çatı izolasyonu, mantolama, alçıpan ve ev tadilatı.",
    intro:
      "Karşıyaka, Bornova Körfezi'nin kuzey kıyısında yer alan köklü bir ilçedir. Bostanlı ve Mavişehir'de yeni yapılaşma, Soğukkuyu ve Cevizlik civarında eski yapı stoğu bulunur. Bu çeşitlilik, hem iç mekan yenileme hem dış cephe ve çatı işlerinde farklı yaklaşımlar gerektirir. Usta Renovasyon olarak Karşıyaka'da boya, saten alçı, çatlak tamiri, su yalıtımı, çatı izolasyonu, mantolama, alçıpan ve komple ev tadilatı hizmetlerini işin türüne göre değerlendiririz. Fotoğraf göndererek ön bilgi alabilir, keşif ihtiyacını birlikte belirleyebilirsiniz.",
    featured_services: [SVC.icBoya, SVC.disBoya, SVC.alci, SVC.cati, SVC.su, SVC.alcipan, SVC.tadilat, SVC.banyo],
    building_types: ["Daire", "Müstakil ev", "Apartman", "Ofis", "Bina ortak alanı", "Teras", "Çatı"],
    process_text:
      "Karşıyaka'da talep alındığında konum (mahalle), yapı türü ve iş kapsamı değerlendirilir. Fotoğraflar incelenir, eski yapılarda alçı ve boya durumu özellikle dikkate alınır. Hizmet uygunluğu netleşince gerekirse keşif planlanır, teklif hazırlanır ve Özal Usta onayıyla çalışma başlar.",
    pricing_text:
      "Karşıyaka'da fiyat; işin türü, alan büyüklüğü, mevcut yüzey durumu (eski alçı, nem hasarı, çatlak), kullanılacak malzeme ve iş kapsamına göre değişir. Eski yapılarda hazırlık aşaması uzun sürebilir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Karşıyaka'da hangi bölgelerde hizmet veriyorsunuz?", a: "Bostanlı, Mavişehir, Yalı, Cumhuriyet, Cevizlik ve Karşıyaka'nın doğrulanmış mahallelerinde işin türü ve çalışma planına göre hizmet değerlendirilir. Bulunduğunuz mahalleyi paylaşarak bilgi alabilirsiniz." },
      { q: "Eski binada alçı ve boya yenileme nasıl yapılır?", a: "Eski yapılarda kabaran alçı sökülür, çatlaklar açılıp tamir edilir, saten alçı çekilir ve son kat boya uygulanır. Hazırlık aşaması bina durumuna göre değişir; net kapsam keşifle belirlenir." },
      { q: "Karşıyaka'da çatı veya teras izolasyonu yapıyor musunuz?", a: "Çatı ve teras izolasyonu iş kapsamına göre değerlendirilir. Sızıntının kaynağı yerinde incelenir; uygulama yöntemi ve malzeme keşif sonrası önerilir." },
      { q: "Mavişehir'de yeni dairede boya ne kadar sürer?", a: "Yeni dairelerde süre; oda sayısı, duvar durumu ve yapılacak iş kapsamına göre değişir. Net süre Özal Usta iş planını oluşturduğunda paylaşılır." },
      { q: "Komple ev tadilatı kapsamında neler yapılır?", a: "Komple tadilatta boya, alçı, gerekirse mutfak-banyo yenileme, kapı-pencere bakımı ve elektrik/su tesisat kontrolleri birlikte planlanabilir. Kapsam Özal Usta ile netleştirilir." },
      { q: "Su yalıtımı hangi durumlarda gerekir?", a: "Banyo, mutfak, teras ve çatı gibi suyla temas eden alanlarda yalıtım önemlidir. Mevcut yalıtımın durumu ve yenileme ihtiyacı keşifle belirlenir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Karşıyaka'da yapılacak boya, alçı veya tadilat işi hakkında bilgi almak için Usta Renovasyon web siteniz üzerinden ulaşıyorum. Yapılacak alanın detaylarını ve fotoğraflarını paylaşmak istiyorum.",
    seo_title: "Karşıyaka Boya Ustası ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Karşıyaka'da iç ve dış cephe boya, alçı, sıva, su yalıtımı, çatı izolasyonu, mantolama, alçıpan ve ev tadilatı için Usta Renovasyon. Özal Usta yönetiminde keşif ve teklif.",
  },

  // ===== KONAK =====
  konak: {
    hero_title: "Konak Boya, Dekorasyon ve Tadilat Hizmetleri",
    short_description:
      "Konak'ta iç ve dış cephe boya, alçı, dekoratif uygulamalar, izolasyon ve tadilat hizmetleri.",
    intro:
      "Konak, İzmir'in merkezi ve tarihi ilçesidir. Alsancak ve Göztepe gibi hem konut hem ticaretin yoğun olduğu bölgelerde daire, ofis ve dükkan tadilatı talep görür; Basmane, Eşrefpaşa ve Hatay civarında eski yapı stoku sebebiyle alçı yenileme ve çatlak tamiri öne çıkar. Usta Renovasyon olarak Konak'ta boya, dekoratif uygulama, alçı, su yalıtımı, mantolama ve komple tadilat hizmetlerini işin türüne göre değerlendiririz. Fotoğraf paylaşarak ön bilgi alabilirsiniz.",
    featured_services: [SVC.icBoya, SVC.disBoya, SVC.alci, SVC.manto, SVC.alcipan, SVC.tadilat, SVC.mutfak],
    building_types: ["Daire", "Ofis", "Dükkan", "Apartman", "Bina ortak alanı", "Merdiven"],
    process_text:
      "Konak'ta talep alındığında bölge (Alsancak, Göztepe, Hatay vb.), yapı türü ve iş kapsamı değerlendirilir. Ticaret bölgesinde ofis tadilatlarında çalışma saati planlaması yapılabilir. Fotoğraflar incelenir, hizmet uygunluğu netleşince keşif planlanır ve teklif hazırlanır.",
    pricing_text:
      "Konak'ta fiyat; işin türü, alan büyüklüğü, yapı yaşı ve yüzey durumu ile değişir. Eski yapılarda hazırlık süreci daha uzun olabilir. Ofis ve dükkan tadilatlarında çalışma saati de fiyata etkendir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Alsancak'taki ofisimde çalışma saati ayarlanabilir mi?", a: "Alsancak ve çevresindeki ofis-dükkan tadilatlarında çalışma saatleri iş sahibinin planına göre ayarlanabilir. Mesai dışı veya hafta sonu çalışma koşulları önceden netleşir." },
      { q: "Eski binada çatlak tamiri nasıl yapılır?", a: "Çatlaklar açılır, file veya tamir harcı uygulanır, saten alçı ile düzeltme yapılır ve boya ile bitirilir. Eski yapılarda çatlak nedeni (oturma, nem) değerlendirilir." },
      { q: "Konak'ta dış cephe boya ve mantolama yapıyor musunuz?", a: "Dış cephe boya ve mantolama iş kapsamına göre değerlendirilir. Bina ölçüsü, cephe durumu ve kat sayısı netleştiğinde çalışma planı paylaşılır." },
      { q: "Dükkan tadilatında ne kadar sürede açılır?", a: "Dükkan tadilat süresi; yapılacak işin kapsamına göre değişir. Boya, alçı ve dekoratif uygulamalar planlanır, çalışma takvimi Özal Usta ile paylaşılır." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Konak'taki bir tadilat işi için web siteniz üzerinden size ulaştım. Hizmet uygunluğu ve fiyat teklifi hakkında bilgi almak istiyorum.",
    seo_title: "Konak Boya, Dekorasyon ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Konak'ta iç ve dış cephe boya, dekoratif uygulama, alçı, su yalıtımı, mantolama ve ofis-dükkan tadilatı. Özal Usta yönetiminde keşif ve teklif.",
  },

  // ===== BUCA =====
  buca: {
    hero_title: "Buca Boya ve Ev Tadilatı Hizmetleri",
    short_description:
      "Buca'da daire boyama, alçı tamiri, çatı ve teras sorunları, banyo-mutfak tadilatı ve alçıpan hizmetleri.",
    intro:
      "Buca, hem eski yerleşim hem de yeni yapılaşmanın birlikte bulunduğu bir ilçedir. Şirinyer ve Doğançay'da yoğun apartman stoğu, Fikri Altay ve Vali Rahmi Bey civarında iç mekan yenileme talebi görülür. Usta Renovasyon olarak Buca'da boya, badana, alçı tamiri, çatı ve teras izolasyonu, banyo-mutfak tadilatı ve alçıpan hizmetlerini işin türüne göre değerlendiririz. Fotoğraf göndererek ön bilgi alabilir, keşif ihtiyacını birlikte belirleyebilirsiniz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.cati, SVC.banyo, SVC.mutfak, SVC.alcipan, SVC.tadilat],
    building_types: ["Daire", "Apartman", "Müstakil ev", "Ofis", "Teras", "Çatı"],
    process_text:
      "Buca'dan gelen hizmet taleplerinde yapılacak işin türü, alanın mevcut durumu, yaklaşık ölçüsü, fotoğraflar ve işin kapsamı birlikte değerlendirilir. Usta Renovasyon, Buca'nın tüm mahallelerinde iç ve dış cephe boya, alçı, sıva, çatı izolasyonu, su yalıtımı, mantolama, alçıpan, asma tavan, banyo ve mutfak tadilatı, komple ev yenileme, tamirat ve diğer aktif hizmetlerini sunmaktadır. Hizmetler mahalleye göre ayrılmaz veya sınırlandırılmaz. Her talep kendi teknik ihtiyaçlarına, büyüklüğüne ve çalışma planına göre değerlendirilir. Gerekli durumlarda keşif planlanır; yapılacak işlemler netleştirildikten sonra teklif ve çalışma planı hazırlanır.",
    pricing_text:
      "Buca'da fiyat; hizmet türü, alan büyüklüğü, yüzey durumu ve iş kapsamına göre değişir. Çatı ve teras işlerinde sızıntı kaynağı, iç mekan işlerinde duvar durumu etkendir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Buca'nın hangi mahallelerinde hizmet veriyorsunuz?", a: "Şirinyer, Doğançay, Fikri Altay, Vali Rahmi Bey ve Buca'nın doğrulanmış mahallelerinde işin türüne göre hizmet değerlendirilir. Bulunduğunuz mahalleyi paylaşarak bilgi alabilirsiniz." },
      { q: "Daire boyama ne kadar sürer?", a: "Süre; oda sayısı, duvar durumu ve yapılacak iş kapsamına göre değişir. Eşyalı dairelerde koruma aşaması eklenir. Net süre Özal Usta iş planını oluşturduğunda paylaşılır." },
      { q: "Teras su sızıntısı için keşif gerekli mi?", a: "Teras sızıntılarında yerinde inceleme önemlidir. Sızıntı kaynağı ve uygulama yöntemi keşifle netleşir. Fotoğraf paylaşarak ön değerlendirme yapılabilir." },
      { q: "Banyo tadilatı kapsamında neler yapılır?", a: "Banyo tadilatında su yalıtımı yenilenir, fayans-saten işleri, tavan ve banyo dolabı işleri birlikte planlanabilir. Kapsam Özal Usta ile netleştirilir." },
      { q: "Alçıpan ve asma tavan yapıyor musunuz?", a: "Alçıpan bölme duvar, asma tavan ve dekoratif tavan uygulamaları iş kapsamına göre yapılır. Ölçü ve tasarım netleşince çalışma planı paylaşılır." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Buca'daki bir tadilat işi için web siteniz üzerinden size ulaştım. Hizmet uygunluğu ve fiyat teklifi hakkında bilgi almak istiyorum.",
    seo_title: "Buca Boya ve Ev Tadilatı Hizmetleri | Usta Renovasyon",
    meta_description: "Buca'da daire boyama, alçı tamiri, çatı ve teras izolasyonu, banyo-mutfak tadilatı ve alçıpan için fotoğraf gönderin; hizmet ve keşif uygunluğunu öğrenin.",
  },

  // ===== ÇİĞLİ =====
  cigli: {
    hero_title: "Çiğli Boya, Çatı İzolasyonu ve Ev Yenileme Hizmetleri",
    short_description:
      "Çiğli'de iç ve dış cephe boya, alçı, çatı izolasyonu, su yalıtımı ve ev yenileme hizmetleri.",
    intro:
      "Çiğli, sanayi ve konut alanlarının birlikte bulunduğu bir ilçedir. Atatürk ve Egekent civarında daire tadilatı, Evka 2 ve Güzeltepe'de iç mekan yenileme, sanayi bölgesinde ise ofis-dükkan bakım işleri talep görür. Usta Renovasyon olarak Çiğli'de boya, alçı, çatı izolasyonu, su yalıtımı ve komple ev tadilatı hizmetlerini işin türüne göre değerlendiririz. Fotoğraf paylaşarak ön bilgi alabilirsiniz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.cati, SVC.su, SVC.tadilat],
    building_types: ["Daire", "Ofis", "Dükkan", "Apartman", "Teras", "Çatı"],
    process_text:
      "Çiğli'ye gelen taleplerde bölge (sanayi/konut), yapı türü ve iş kapsamı değerlendirilir. Fotoğraflar incelenir, hizmet uygunluğu kontrol edilir, gerekirse keşif planlanır. Teklif ve çalışma planı netleşince Özal Usta onayıyla uygulama başlar.",
    pricing_text:
      "Çiğli'de fiyat; hizmet türü, alan büyüklüğü, yüzey durumu ve iş kapsamına göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Çiğli'nin hangi bölgelerinde hizmet veriyorsunuz?", a: "Atatürk, Egekent, Evka 2, Güzeltepe ve Çiğli'nin doğrulanmış mahallelerinde işin türüne göre hizmet değerlendirilir." },
      { q: "Çatı izolasyonu için keşif gerekli mi?", a: "Çatı sızıntılarında yerinde inceleme önemlidir. Sızıntı kaynağı ve uygulama yöntemi keşifle netleşir." },
      { q: "Sanayi bölgesindeki dükkan tadilatı yapıyor musunuz?", a: "Dükkan ve ofis tadilatı iş kapsamına göre değerlendirilir. Çalışma saati planlaması yapılabilir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Çiğli'de yapılacak boya, izolasyon veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Çiğli Boya, Çatı İzolasyonu ve Ev Yenileme | Usta Renovasyon",
    meta_description: "Çiğli'de iç ve dış cephe boya, alçı, çatı izolasyonu, su yalıtımı ve ev yenileme hizmetleri. Özal Usta yönetiminde keşif ve teklif.",
  },

  // ===== KARABAĞLAR =====
  karabaglar: {
    hero_title: "Karabağlar Boya, Alçı ve Tadilat Hizmetleri",
    short_description:
      "Karabağlar'da iç cephe boya, alçı, su yalıtımı, mantolama ve ev tadilatı hizmetleri.",
    intro:
      "Karabağlar, İzmir'in nüfus yoğunluğu en yüksek ilçelerinden biridir. Abdi İpekçi, Adalet, Bahar ve Fatih civarında apartman iç tadilatı, Korutürk ve Menderes bölgesinde dış cephe-mantolama talebi görülür. Usta Renovasyon olarak Karabağlar'da boya, alçı, su yalıtımı, mantolama ve komple ev tadilatı hizmetlerini işin türüne göre değerlendiririz. Fotoğraf göndererek ön bilgi alabilirsiniz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.manto, SVC.su, SVC.tadilat],
    building_types: ["Daire", "Apartman", "Ofis", "Bina ortak alanı", "Teras"],
    process_text:
      "Karabağlar'da talep alındığında mahalle, yapı türü ve iş kapsamı değerlendirilir. Apartman yönetimleri için ortak dış cephe teklifi hazırlanabilir. Fotoğraflar incelenir, hizmet uygunluğu netleşince keşif planlanır.",
    pricing_text:
      "Karabağlar'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Karabağlar'da dış cephe ve mantolama yapıyor musunuz?", a: "Dış cephe boya ve mantolama iş kapsamına göre değerlendirilir. Apartman yönetimleri için ortak teklif hazırlanabilir." },
      { q: "Hangi mahallelerde hizmet veriyorsunuz?", a: "Abdi İpekçi, Adalet, Bahar, Fatih, Korutürk ve Karabağlar'ın doğrulanmış mahallelerinde işin türüne göre hizmet değerlendirilir." },
      { q: "Apartman ortak alanı boya yapıyor musunuz?", a: "Merdiven ve ortak alan boyası iş kapsamına göre yapılır. Bina yönetimiyle çalışma planı paylaşılır." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Karabağlar'da yapılacak boya, alçı veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Karabağlar Boya, Alçı ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Karabağlar'da iç cephe boya, alçı, su yalıtımı, mantolama ve ev tadilatı için Usta Renovasyon. Özal Usta yönetiminde keşif ve teklif.",
  },

  // ===== GAZİEMİR =====
  gaziemir: {
    hero_title: "Gaziemir Boya, Alçı ve Tadilat Hizmetleri",
    short_description:
      "Gaziemir'de iç ve dış cephe boya, alçı, izolasyon ve ev tadilatı hizmetleri.",
    intro:
      "Gaziemir, İzmir Adnan Menderes Havalimanı'na yakınlığıyla bilinen bir ilçedir. Atıf Bey, Bahriyeli ve Fatih civarında iç mekan tadilatı, Sarnıç bölgesinde ise daha çok çatı-terras işleri talep görür. Usta Renovasyon olarak Gaziemir'de boya, alçı, su yalıtımı, mantolama ve komple ev tadilatı hizmetlerini işin türüne göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.su, SVC.tadilat, SVC.alcipan],
    building_types: ["Daire", "Apartman", "Ofis", "Villa", "Teras"],
    process_text:
      "Gaziemir'de talep alındığında bölge ve iş kapsamı değerlendirilir. Fotoğraflar incelenir, hizmet uygunluğu netleşince keşif planlanır ve teklif hazırlanır.",
    pricing_text:
      "Gaziemir'de fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Gaziemir'in hangi mahallelerinde hizmet veriyorsunuz?", a: "Atıf Bey, Bahriyeli, Fatih, Girne ve Gaziemir'in doğrulanmış mahallelerinde işin türüne göre hizmet değerlendirilir." },
      { q: "Sarnıç bölgesinde çatı işleri yapıyor musunuz?", a: "Sarnıç ve çevresinde çatı-terras izolasyonu iş kapsamına göre değerlendirilir. Keşif ile sızıntı kaynağı belirlenir." },
      { q: "Villa tadilatı kapsamında neler yapılır?", a: "Villa tadilatında boya, alçı, gerekirse banyo-mutfak ve dış cephe işleri birlikte planlanabilir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Gaziemir'de yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Gaziemir Boya, Alçı ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Gaziemir'de iç ve dış cephe boya, alçı, su yalıtımı, mantolama ve ev tadilatı. Özal Usta yönetiminde keşif ve teklif.",
  },

  // ===== BALÇOVA =====
  balcova: {
    hero_title: "Balçova Boya ve Tadilat Hizmetleri",
    short_description:
      "Balçova'da iç cephe boya, alçı, su yalıtımı ve ev tadilatı hizmetleri.",
    intro:
      "Balçova, termal tesisleri ve üniversiteye yakınlığıyla bilinen küçük bir ilçedir. Korutürk ve Çağdaş civarında daire tadilatı, Onur ve Turan bölgesinde iç mekan yenileme talep görür. Usta Renovasyon olarak Balçova'da boya, alçı, su yalıtımı ve komple tadilat hizmetlerini işin türüne göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.su, SVC.tadilat],
    building_types: ["Daire", "Apartman", "Villa", "Ofis"],
    process_text:
      "Balçova'da talep alındığında bölge ve iş kapsamı değerlendirilir. Fotoğraflar incelenir, hizmet uygunluğu netleşince keşif planlanır.",
    pricing_text: "Balçova'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Balçova'da hangi mahallelerde hizmet veriyorsunuz?", a: "Korutürk, Çağdaş, Onur, Turan ve Balçova'nın doğrulanmış mahallelerinde işin türüne göre hizmet değerlendirilir." },
      { q: "Daire boyama için eşyaları taşımam gerekir mi?", a: "Taşınabilir eşyalar toplanır, sabit eşyalar koruma altına alınır. Detaylar çalışma öncesi paylaşılır." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Balçova'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Balçova Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Balçova'da iç cephe boya, alçı, su yalıtımı ve ev tadilatı. Özal Usta yönetiminde keşif ve teklif.",
  },

  // ===== NARLIDERE =====
  narlidere: {
    hero_title: "Narlıdere Boya ve Tadilat Hizmetleri",
    short_description:
      "Narlıdere'de iç cephe boya, alçı, izolasyon ve ev tadilatı hizmetleri.",
    intro:
      "Narlıdere, sahil şeridinde küçük bir ilçedir. Sahilevleri ve Limantepe civarında daire tadilatı, Çamönü bölgesinde iç mekan yenileme talep görür. Usta Renovasyon olarak Narlıdere'de boya, alçı, su yalıtımı ve tadilat hizmetlerini işin türüne göre değerlendiririz. Hizmet uygunluğu işin büyüklüğü ve çalışma planına göre belirlenir.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.su, SVC.tadilat],
    building_types: ["Daire", "Apartman", "Villa"],
    process_text: "Narlıdere'de talep alındığında bölge ve iş kapsamı değerlendirilir. Fotoğraflar incelenir, hizmet uygunluğu netleşince keşif planlanır.",
    pricing_text: "Narlıdere'de fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Narlıdere'de hangi mahallelerde hizmet veriyorsunuz?", a: "Sahilevleri, Limantepe, Çamönü ve Narlıdere'nin doğrulanmış mahallelerinde işin türüne göre hizmet değerlendirilir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Narlıdere'de yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Narlıdere Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Narlıdere'de iç cephe boya, alçı, su yalıtımı ve ev tadilatı. Özal Usta yönetiminde keşif ve teklif.",
  },

  // ===== GÜZELBAHÇE =====
  guzelbahce: {
    hero_title: "Güzelbahçe Boya ve Tadilat Hizmetleri",
    short_description:
      "Güzelbahçe'de iç cephe boya, alçı, izolasyon ve villa tadilatı hizmetleri.",
    intro:
      "Güzelbahçe, siteleri ve villa bölgeleriyle bilinen bir ilçedir. Siteler ve Maltepe civarında villa ve daire tadilatı, Kuruçay bölgesinde iç mekan yenileme talep görür. Usta Renovasyon olarak Güzelbahçe'de boya, alçı, su yalıtımı ve villa tadilatı hizmetlerini işin türüne göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.su, SVC.tadilat],
    building_types: ["Daire", "Villa", "Müstakil ev"],
    process_text: "Güzelbahçe'de talep alındığında bölge ve iş kapsamı değerlendirilir. Villa tadilatlarında dış cephe de planlanabilir. Fotoğraflar incelenir, hizmet uygunluğu netleşince keşif planlanır.",
    pricing_text: "Güzelbahçe'de fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Güzelbahçe'de villa tadilatı yapıyor musunuz?", a: "Villa tadilatı iş kapsamına göre değerlendirilir. Boya, alçı, banyo-mutfak ve dış cephe birlikte planlanabilir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Güzelbahçe'de yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Güzelbahçe Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Güzelbahçe'de iç cephe boya, alçı, su yalıtımı ve villa tadilatı. Özal Usta yönetiminde keşif ve teklif.",
  },

  // ===== YAKIN BÖLGELER =====
  kemalpasa: {
    hero_title: "Kemalpaşa Boya ve Tadilat Hizmetleri",
    short_description: "Kemalpaşa'da iç cephe boya, alçı, izolasyon ve tadilat hizmetleri.",
    intro: "Kemalpaşa, İzmir'in doğusunda, Bornova'ya komşu bir ilçedir. Merkez ve Armutlu civarında daire-müstakil ev tadilatı talep görür. Usta Renovasyon olarak Kemalpaşa'da boya, alçı ve izolasyon hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz. Hizmet uygunluğu talep ve çalışma planına göre belirlenir.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev", "Villa"],
    process_text: "Kemalpaşa'da talep alındığında konum ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Kemalpaşa'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Ulaşım mesafesi çalışma planında değerlendirilir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Kemalpaşa'ya gelip hizmet veriyor musunuz?", a: "Kemalpaşa'da hizmet uygunluğu işin türü, büyüklüğü ve çalışma planına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Kemalpaşa'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Kemalpaşa Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Kemalpaşa'da iç cephe boya, alçı ve izolasyon hizmetleri. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  menemen: {
    hero_title: "Menemen Boya ve Tadilat Hizmetleri",
    short_description: "Menemen'de iç cephe boya, alçı, izolasyon ve tadilat hizmetleri.",
    intro: "Menemen, İzmir'in kuzeyinde tarım ve sanayinin birlikte bulunduğu bir ilçedir. Merkez ve çevresinde daire-müstakil ev tadilatı talep görür. Usta Renovasyon olarak Menemen'de boya, alçı ve izolasyon hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev", "Apartman"],
    process_text: "Menemen'de talep alındığında konum ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Menemen'de fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Menemen'de hizmet veriyor musunuz?", a: "Menemen'de hizmet uygunluğu işin türü, büyüklüğü ve çalışma planına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Menemen'de yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Menemen Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Menemen'de iç cephe boya, alçı ve izolasyon hizmetleri. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  menderes: {
    hero_title: "Menderes Boya ve Tadilat Hizmetleri",
    short_description: "Menderes'te iç cephe boya, alçı, izolasyon ve tadilat hizmetleri.",
    intro: "Menderes, İzmir'in güneyinde sahil ve iç bölgelerin birlikte bulunduğu bir ilçedir. Özdere ve Söğütlü gibi sahil bölgelerinde yazlık ve daire tadilatı, merkezde iç mekan yenileme talep görür. Usta Renovasyon olarak Menderes'te boya, alçı ve izolasyon hizmetlerini işin türü ve çalışma planına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat, SVC.su],
    building_types: ["Daire", "Müstakil ev", "Villa", "Yazlık"],
    process_text: "Menderes'te talep alındığında bölge (sahil/iç), yapı türü ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Menderes'te fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Menderes'te hizmet veriyor musunuz?", a: "Menderes'te hizmet uygunluğu işin türü, büyüklüğü ve çalışma planına göre değerlendirilir. Özdere ve Söğütlü gibi sahil bölgeleri de değerlendirilebilir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Menderes'te yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Menderes Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Menderes'te iç cephe boya, alçı ve izolasyon hizmetleri. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  torbali: {
    hero_title: "Torbalı Boya ve Tadilat Hizmetleri",
    short_description: "Torbalı'da iç cephe boya, alçı, izolasyon ve tadilat hizmetleri.",
    intro: "Torbalı, İzmir'in doğusunda sanayi ve tarımın birlikte bulunduğu bir ilçedir. Merkez ve Fevzipaşa civarında daire-işyeri tadilatı talep görür. Usta Renovasyon olarak Torbalı'da boya, alçı ve izolasyon hizmetlerini işin türü, büyüklüğü ve çalışma planına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev", "İşyeri"],
    process_text: "Torbalı'da talep alındığında konum ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Torbalı'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Torbalı'ya gelip hizmet veriyor musunuz?", a: "Torbalı'da hizmet uygunluğu işin türü, büyüklüğü ve çalışma planına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Torbalı'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Torbalı Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Torbalı'da iç cephe boya, alçı ve izolasyon hizmetleri. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  urla: {
    hero_title: "Urla Boya ve Tadilat Hizmetleri",
    short_description: "Urla'da iç cephe boya, alçı, izolasyon ve villa tadilatı hizmetleri.",
    intro: "Urla, İzmir'in batısında sahili ve bağlarıyla bilinen bir ilçedir. Iskele ve Karantina civarında daire tadilatı, iç bölgelerde villa ve müstakil ev yenileme talep görür. Usta Renovasyon olarak Urla'da boya, alçı, su yalıtımı ve villa tadilatı hizmetlerini işin türü ve çalışma planına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.su, SVC.tadilat],
    building_types: ["Daire", "Villa", "Müstakil ev", "Yazlık"],
    process_text: "Urla'da talep alındığında bölge (sahil/iç), yapı türü ve iş kapsamı değerlendirilir. Villa tadilatlarında dış cephe de planlanabilir.",
    pricing_text: "Urla'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Urla'da villa tadilatı yapıyor musunuz?", a: "Urla'da villa ve müstakil ev tadilatı iş kapsamına göre değerlendirilir. Boya, alçı, banyo-mutfak ve dış cephe birlikte planlanabilir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Urla'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Urla Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Urla'da iç cephe boya, alçı, su yalıtımı ve villa tadilatı. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  aliaga: {
    hero_title: "Aliağa Boya ve Tadilat Hizmetleri",
    short_description: "Aliağa'da iç cephe boya, alçı, izolasyon ve tadilat hizmetleri.",
    intro: "Aliağa, İzmir'in kuzeyinde sanayi ve limanıyla bilinen bir ilçedir. Merkez ve Atatürk civarında daire-işyeri tadilatı talep görür. Usta Renovasyon olarak Aliağa'da boya, alçı ve izolasyon hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "İşyeri", "Müstakil ev"],
    process_text: "Aliağa'da talep alındığında konum ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Aliağa'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Aliağa'da hizmet veriyor musunuz?", a: "Aliağa'da hizmet uygunluğu işin türü, büyüklüğü ve çalışma planına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Aliağa'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Aliağa Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Aliağa'da iç cephe boya, alçı ve izolasyon hizmetleri. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  foca: {
    hero_title: "Foça Boya ve Tadilat Hizmetleri",
    short_description: "Foça'da iç cephe boya, alçı, izolasyon ve yazlık tadilatı hizmetleri.",
    intro: "Foça, İzmir'in kuzeyinde tarihi sahil kasabasıdır. Eski Foça ve Yenifoça'da yazlık ve daire tadilatı talep görür. Usta Renovasyon olarak Foça'da boya, alçı ve izolasyon hizmetlerini işin türü, büyüklüğü ve çalışma planına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat, SVC.su],
    building_types: ["Daire", "Yazlık", "Müstakil ev"],
    process_text: "Foça'da talep alındığında bölge (eski/yeni Foça) ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Foça'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [
      { q: "Foça'da yazlık tadilatı yapıyor musunuz?", a: "Foça'da yazlık ve daire tadilatı iş kapsamına göre değerlendirilir. Sezon dışı çalışma planlanabilir." },
    ],
    whatsapp_message: "Merhaba Özal Usta. Foça'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Foça Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Foça'da iç cephe boya, alçı, izolasyon ve yazlık tadilatı. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  // ===== TALEBE GÖRE BÖLGELER (özet içerik) =====
  bayindir: {
    hero_title: "Bayındır Boya ve Tadilat Hizmetleri",
    short_description: "Bayındır'da iç cephe boya, alçı ve tadilat hizmetleri.",
    intro: "Bayındır, İzmir'in doğusunda tarım ve iç bölgelerin bulunduğu bir ilçedir. Merkez ve Cumaova civarında daire-müstakil ev tadilatı talep görür. Usta Renovasyon olarak Bayındır'da boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz. Hizmet uygunluğu talep ve çalışma planına göre belirlenir.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev"],
    process_text: "Bayındır'da talep alındığında konum ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Bayındır'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [{ q: "Bayındır'a gelip hizmet veriyor musunuz?", a: "Bayındır'da hizmet uygunluğu işin türü, büyüklüğü ve çalışma planına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Bayındır'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Bayındır Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Bayındır'da iç cephe boya, alçı ve tadilat. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  bergama: {
    hero_title: "Bergama Boya ve Tadilat Hizmetleri",
    short_description: "Bergama'da iç cephe boya, alçı ve tadilat hizmetleri.",
    intro: "Bergama, İzmir'in kuzeyinde tarihi bir ilçedir. Merkez ve çevresinde daire-müstakil ev tadilatı talep görür. Usta Renovasyon olarak Bergama'da boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz. Mesafe sebebiyle hizmet uygunluğu her talepte ayrıca değerlendirilir.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev"],
    process_text: "Bergama'da talep alındığında konum ve iş kapsamı değerlendirilir. Mesafe ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Bergama'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Mesafe çalışma planında değerlendirilir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [{ q: "Bergama'ya gelip hizmet veriyor musunuz?", a: "Bergama'da hizmet uygunluğu işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Bergama'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Bergama Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Bergama'da iç cephe boya, alçı ve tadilat. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  beydag: {
    hero_title: "Beydağ Boya ve Tadilat Hizmetleri",
    short_description: "Beydağ'da iç cephe boya, alçı ve tadilat hizmetleri.",
    intro: "Beydağ, İzmir'in doğusunda küçük bir ilçedir. Merkez ve çevresinde daire-müstakil ev tadilatı talep görür. Usta Renovasyon olarak Beydağ'da boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz. Mesafe sebebiyle hizmet uygunluğu her talepte ayrıca değerlendirilir.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev"],
    process_text: "Beydağ'da talep alındığında konum ve iş kapsamı değerlendirilir. Mesafe ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Beydağ'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Mesafe çalışma planında değerlendirilir.",
    faqs: [{ q: "Beydağ'a gelip hizmet veriyor musunuz?", a: "Beydağ'da hizmet uygunluğu işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Beydağ'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Beydağ Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Beydağ'da iç cephe boya, alçı ve tadilat. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  cesme: {
    hero_title: "Çeşme Boya ve Tadilat Hizmetleri",
    short_description: "Çeşme'de iç cephe boya, alçı, izolasyon ve yazlık-villa tadilatı.",
    intro: "Çeşme, İzmir'in batısında turistik bir yarımada ilçesidir. Alaçatı ve merkezde yazlık, villa ve daire tadilatı talep görür. Usta Renovasyon olarak Çeşme'de boya, alçı, su yalıtımı ve villa tadilatı hizmetlerini işin türü ve çalışma planına göre değerlendiririz. Sezon dışı çalışma planlanabilir.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.su, SVC.tadilat],
    building_types: ["Villa", "Yazlık", "Daire"],
    process_text: "Çeşme'de talep alındığında bölge (Alaçatı/merkez), yapı türü ve iş kapsamı değerlendirilir. Sezon dışı çalışma planlanabilir, ulaşım ve plan netleştirilir.",
    pricing_text: "Çeşme'de fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [{ q: "Çeşme ve Alaçatı'da villa tadilatı yapıyor musunuz?", a: "Çeşme ve Alaçatı'da villa ve yazlık tadilatı iş kapsamına göre değerlendirilir. Sezon dışı çalışma planlanabilir." }],
    whatsapp_message: "Merhaba Özal Usta. Çeşme'de yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Çeşme Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Çeşme ve Alaçatı'da iç cephe boya, alçı, su yalıtımı ve villa-yazlık tadilatı. Özal Usta yönetiminde keşif ve teklif.",
  },

  dikili: {
    hero_title: "Dikili Boya ve Tadilat Hizmetleri",
    short_description: "Dikili'de iç cephe boya, alçı ve tadilat hizmetleri.",
    intro: "Dikili, İzmir'in kuzeyinde sahiliyle bilinen bir ilçedir. Çandarlı ve merkezde daire-yazlık tadilatı talep görür. Usta Renovasyon olarak Dikili'de boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Yazlık", "Müstakil ev"],
    process_text: "Dikili'de talep alındığında bölge ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Dikili'de fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [{ q: "Dikili'de hizmet veriyor musunuz?", a: "Dikili'de hizmet uygunluğu işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Dikili'de yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Dikili Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Dikili'de iç cephe boya, alçı ve tadilat. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  karaburun: {
    hero_title: "Karaburun Boya ve Tadilat Hizmetleri",
    short_description: "Karaburun'da iç cephe boya, alçı ve yazlık tadilatı.",
    intro: "Karaburun, İzmir'in batısında dağlık bir yarımada ilçesidir. Merkez ve Mordoğan'da yazlık ve daire tadilatı talep görür. Usta Renovasyon olarak Karaburun'da boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Yazlık", "Daire", "Müstakil ev"],
    process_text: "Karaburun'da talep alındığında bölge ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Karaburun'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Mesafe çalışma planında değerlendirilir.",
    faqs: [{ q: "Karaburun'da hizmet veriyor musunuz?", a: "Karaburun'da hizmet uygunluğu işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Karaburun'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Karaburun Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Karaburun'da iç cephe boya, alçı ve yazlık tadilatı. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  kinik: {
    hero_title: "Kınık Boya ve Tadilat Hizmetleri",
    short_description: "Kınık'ta iç cephe boya, alçı ve tadilat hizmetleri.",
    intro: "Kınık, İzmir'in kuzeyinde küçük bir ilçedir. Merkez ve çevresinde daire-müstakil ev tadilatı talep görür. Usta Renovasyon olarak Kınık'ta boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz. Mesafe sebebiyle hizmet uygunluğu her talepte ayrıca değerlendirilir.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev"],
    process_text: "Kınık'ta talep alındığında konum ve iş kapsamı değerlendirilir. Mesafe ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Kınık'ta fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Mesafe çalışma planında değerlendirilir.",
    faqs: [{ q: "Kınık'a gelip hizmet veriyor musunuz?", a: "Kınık'ta hizmet uygunluğu işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Kınık'ta yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Kınık Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Kınık'ta iç cephe boya, alçı ve tadilat. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  kiraz: {
    hero_title: "Kiraz Boya ve Tadilat Hizmetleri",
    short_description: "Kiraz'da iç cephe boya, alçı ve tadilat hizmetleri.",
    intro: "Kiraz, İzmir'in doğusunda küçük bir ilçedir. Merkez ve çevresinde daire-müstakil ev tadilatı talep görür. Usta Renovasyon olarak Kiraz'da boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz. Mesafe sebebiyle hizmet uygunluğu her talepte ayrıca değerlendirilir.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev"],
    process_text: "Kiraz'da talep alındığında konum ve iş kapsamı değerlendirilir. Mesafe ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Kiraz'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Mesafe çalışma planında değerlendirilir.",
    faqs: [{ q: "Kiraz'a gelip hizmet veriyor musunuz?", a: "Kiraz'da hizmet uygunluğu işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Kiraz'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Kiraz Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Kiraz'da iç cephe boya, alçı ve tadilat. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  odemis: {
    hero_title: "Ödemiş Boya ve Tadilat Hizmetleri",
    short_description: "Ödemiş'te iç cephe boya, alçı ve tadilat hizmetleri.",
    intro: "Ödemiş, İzmir'in doğusunda tarihi bir ilçedir. Merkez ve Birgi'de daire-müstakil ev tadilatı, Bozdağ'da yazlık yenileme talep görür. Usta Renovasyon olarak Ödemiş'te boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev", "Yazlık"],
    process_text: "Ödemiş'te talep alındığında bölge ve iş kapsamı değerlendirilir. Mesafe ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Ödemiş'te fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Mesafe çalışma planında değerlendirilir.",
    faqs: [{ q: "Ödemiş'e gelip hizmet veriyor musunuz?", a: "Ödemiş'te hizmet uygunluğu işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Ödemiş'te yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Ödemiş Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Ödemiş'te iç cephe boya, alçı ve tadilat. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  seferihisar: {
    hero_title: "Seferihisar Boya ve Tadilat Hizmetleri",
    short_description: "Seferihisar'da iç cephe boya, alçı, izolasyon ve yazlık tadilatı.",
    intro: "Seferihisar, İzmir'in batısında Türkiye'nin ilk sakin şehridir. Sığacık ve merkezde yazlık-daire tadilatı, Doğanbey'de müstakil ev yenileme talep görür. Usta Renovasyon olarak Seferihisar'da boya, alçı, su yalıtımı ve tadilat hizmetlerini işin türü ve çalışma planına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.su, SVC.tadilat],
    building_types: ["Daire", "Yazlık", "Müstakil ev"],
    process_text: "Seferihisar'da talep alındığında bölge (Sığacık/merkez) ve iş kapsamı değerlendirilir. Çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Seferihisar'da fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [{ q: "Seferihisar ve Sığacık'ta hizmet veriyor musunuz?", a: "Seferihisar ve Sığacık'ta hizmet uygunluğu işin türü ve çalışma planına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Seferihisar'da yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Seferihisar Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Seferihisar ve Sığacık'ta iç cephe boya, alçı, su yalıtımı ve tadilat. Özal Usta yönetiminde keşif ve teklif.",
  },

  selcuk: {
    hero_title: "Selçuk Boya ve Tadilat Hizmetleri",
    short_description: "Selçuk'ta iç cephe boya, alçı ve tadilat hizmetleri.",
    intro: "Selçuk, İzmir'in güneyinde tarihi ve turistik bir ilçedir. Merkez ve Ayasoluk'ta daire-pansiyon tadilatı talep görür. Usta Renovasyon olarak Selçuk'ta boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Pansiyon", "Müstakil ev"],
    process_text: "Selçuk'ta talep alındığında bölge ve iş kapsamı değerlendirilir. Ulaşım ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Selçuk'ta fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Net bilgi için fotoğraf ve keşif önerilir.",
    faqs: [{ q: "Selçuk'ta hizmet veriyor musunuz?", a: "Selçuk'ta hizmet uygunluğu işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Selçuk'ta yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Selçuk Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Selçuk'ta iç cephe boya, alçı ve tadilat. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },

  tire: {
    hero_title: "Tire Boya ve Tadilat Hizmetleri",
    short_description: "Tire'de iç cephe boya, alçı ve tadilat hizmetleri.",
    intro: "Tire, İzmir'in doğusunda tarihi bir ilçedir. Merkez ve çevresinde daire-müstakil ev tadilatı talep görür. Usta Renovasyon olarak Tire'de boya, alçı ve tadilat hizmetlerini işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendiririz. Mesafe sebebiyle hizmet uygunluğu her talepte ayrıca değerlendirilir.",
    featured_services: [SVC.icBoya, SVC.alci, SVC.tadilat],
    building_types: ["Daire", "Müstakil ev"],
    process_text: "Tire'de talep alındığında konum ve iş kapsamı değerlendirilir. Mesafe ve çalışma planı netleştirilir, gerekirse keşif planlanır.",
    pricing_text: "Tire'de fiyat; işin türü, alan büyüklüğü ve yüzey durumuna göre değişir. Mesafe çalışma planında değerlendirilir.",
    faqs: [{ q: "Tire'ye gelip hizmet veriyor musunuz?", a: "Tire'de hizmet uygunluğu işin türü, büyüklüğü ve ulaşım koşullarına göre değerlendirilir. Talebinizi paylaşarak bilgi alabilirsiniz." }],
    whatsapp_message: "Merhaba Özal Usta. Tire'de yapılacak boya veya tadilat işi için web siteniz üzerinden ulaşıyorum. Hizmet ve fiyat bilgisi almak istiyorum.",
    seo_title: "Tire Boya ve Tadilat Hizmetleri | Usta Renovasyon",
    meta_description: "Tire'de iç cephe boya, alçı ve tadilat. Özal Usta yönetiminde işin kapsamına göre keşif ve teklif.",
  },
};

// Türkçe yerel durumu (bulunma) eki — büyük ünlü uyumu ve sertleşmeye göre.
// "Bayraklı" + "'da" → "Bayraklı'da", "Konak" + "'ta" → "Konak'ta", "Çeşme" + "'de" → "Çeşme'de"
export function locativeSuffix(name) {
  if (!name) return "'da";
  const n = String(name).trim();
  const last = n[n.length - 1].toLocaleLowerCase("tr");
  const vowels = "aeıioöuü";
  const lastVowel = [...n.toLocaleLowerCase("tr")].reverse().find((c) => vowels.includes(c)) || "a";
  const back = "aıou".includes(lastVowel);
  const E = back ? "a" : "e";
  const hard = "çfhkpsşt".includes(last);
  return `'${hard ? "t" : "d"}${E}`;
}
// "Bayraklı'da", "Bayraklı'daki" gibi tam eklemeler.
export const inDistrict = (name) => `${name}${locativeSuffix(name)}`;
export const inDistrictKi = (name) => `${name}${locativeSuffix(name)}ki`;

// Türkçe ayrılma (ablative) eki: "Buca'dan", "Konak'tan", "Ödemiş'ten", "Çeşme'den"
export function ablativeSuffix(name) {
  if (!name) return "'dan";
  const n = String(name).trim();
  const last = n[n.length - 1].toLocaleLowerCase("tr");
  const vowels = "aeıioöuü";
  const lastVowel = [...n.toLocaleLowerCase("tr")].reverse().find((c) => vowels.includes(c)) || "a";
  const back = "aıou".includes(lastVowel);
  const E = back ? "a" : "e";
  const hard = "çfhkpsşt".includes(last);
  return `'${hard ? "t" : "d"}${E}n`;
}
// Türkçe ilgi (genitive) eki: "Buca'nın", "Konak'ın", "Çiğli'nin", "Ödemiş'in", "Karaburun'un"
export function genitiveSuffix(name) {
  if (!name) return "'nın";
  const n = String(name).trim();
  const last = n[n.length - 1].toLocaleLowerCase("tr");
  const vowels = "aeıioöuü";
  const lastVowel = [...n.toLocaleLowerCase("tr")].reverse().find((c) => vowels.includes(c)) || "a";
  const I = { a: "ı", ı: "ı", o: "u", u: "u", e: "i", i: "i", ö: "ü", ü: "ü" }[lastVowel] || "ı";
  const isVowelEnd = vowels.includes(last);
  return isVowelEnd ? `'n${I}n` : `'${I}n`;
}
export const fromDistrict = (name) => `${name}${ablativeSuffix(name)}`;
export const districtGenitive = (name) => `${name}${genitiveSuffix(name)}`;

// Merkezi "Çalışma ve Değerlendirme Süreci" metni — bütün ilçelerde ortak anlam.
// Hiçbir mahalleyi belirli hizmetle sınırlandırmaz; bütün aktif hizmetlerin
// sunulduğunu açıkça belirtir. İlçe adına göre otomatik Türkçe eklerle üretilir.
export function evaluationProcessText(name) {
  return `${fromDistrict(name)} gelen hizmet taleplerinde yapılacak işin türü, alanın mevcut durumu, yaklaşık ölçüsü, fotoğraflar ve işin kapsamı birlikte değerlendirilir. Usta Renovasyon, ${districtGenitive(name)} tüm mahallelerinde iç ve dış cephe boya, alçı, sıva, çatı izolasyonu, su yalıtımı, mantolama, alçıpan, asma tavan, banyo ve mutfak tadilatı, komple ev yenileme, tamirat ve diğer aktif hizmetlerini sunmaktadır. Hizmetler mahalleye göre ayrılmaz veya sınırlandırılmaz. Her talep kendi teknik ihtiyaçlarına, büyüklüğüne ve çalışma planına göre değerlendirilir. Gerekli durumlarda keşif planlanır; yapılacak işlemler netleştirildikten sonra teklif ve çalışma planı hazırlanır.`;
}

// "Bu Bölgede Sunulan Hizmetler" bilgi kutusu metni — hizmet kısıtlaması algısını engeller.
export function servicePolicyText(name) {
  return `Usta Renovasyon'un yayında bulunan bütün boya, alçı, sıva, izolasyon, mantolama, alçıpan, tavan ve tadilat hizmetleri ${districtGenitive(name)} tüm mahallelerinde değerlendirilebilmektedir. Hizmet kapsamı mahalle adına göre değil, yapılacak işin teknik ihtiyaçlarına göre belirlenir.`;
}

// İlçe için içerik getir — entity alanları boşsa varsayılan içerikle birleştir.
export function getDistrictContent(slug, entity = {}) {
  const base = districtContent[slug] || {};
  const name = entity.name || base.hero_title?.split(" ")[0] || slug;
  return {
    hero_title: entity.hero_title || base.hero_title || `${name} Boya ve Tadilat Hizmetleri`,
    short_description: entity.short_description || base.short_description || "",
    intro: entity.long_description || base.intro || base.short_description || "",
    featured_services: entity.featured_services?.length ? entity.featured_services : base.featured_services || [],
    building_types: entity.building_types?.length ? entity.building_types : base.building_types || ["Daire", "Apartman", "Ofis"],
    // Çalışma süreci: merkezi politika metni — mahalle bazlı hizmet ayrımı içermez.
    // Yönetici entity.process_text override ederse onu kullanır.
    process_text: entity.process_text || evaluationProcessText(name),
    pricing_text: entity.pricing_text || base.pricing_text || "",
    faqs: entity.faqs?.length ? entity.faqs : base.faqs || [],
    whatsapp_message: entity.whatsapp_message || base.whatsapp_message || "",
    seo_title: entity.seo_title || base.seo_title || `${name} Boya ve Tadilat | Usta Renovasyon`,
    meta_description: entity.meta_description || base.meta_description || "",
    // Bilgi kutusu: bütün aktif hizmetlerin tüm mahallelerde sunulduğunu belirtir.
    service_policy: servicePolicyText(name),
  };
}