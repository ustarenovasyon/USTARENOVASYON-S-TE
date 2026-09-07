// ============================================================================
// HAKKIMIZDA İÇERİĞİ — Varsayılan içerik ve bölüm görünürlük ayarları.
// AboutContent entity kaydı varsa bu değerlerin üzerine yazılır.
// Sahte deneyim/sertifika/istatistik içermez; gerçek veri girilene kadar gizli kalır.
// ============================================================================

export const aboutContent = {
  seoTitle: "Usta Renovasyon Hakkında | Özal Usta – Bornova İzmir",
  metaDescription:
    "Usta Renovasyon ve Özal Usta hakkında bilgi alın. Bornova ve İzmir genelinde boya, alçı, sıva, izolasyon, mantolama ve tadilat hizmetleri için doğrudan iletişime geçin.",

  heroTitle: "Bornova ve İzmir Geneli Tadilat Hizmetlerinde Özal Usta",
  heroSubtitle:
    "Usta Renovasyon, Özal Usta yönetiminde başta Bornova olmak üzere İzmir genelinde alçı, sıva, iç ve dış cephe boya, mineral sıva, izolasyon, mantolama, alçıpan, dekorasyon ve tadilat hizmetleri sunmaktadır.",
  heroSubtitle2:
    "Her işin mevcut durumu değerlendirilerek ihtiyaç duyulan uygulamalar belirlenir; müşteri yapılacak işlemler, malzeme seçenekleri ve çalışma süreci hakkında bilgilendirilir.",
  heroImage: "/assets/hero-renovation.svg",

  introTitle: "Usta Renovasyon Kimdir?",
  introText:
    "Usta Renovasyon; boya, alçı, sıva, dış cephe, izolasyon, mantolama, alçıpan ve tadilat ihtiyaçlarında doğrudan usta ile iletişim kurulmasını sağlayan yerel bir hizmet markasıdır.\n\nBaşta Bornova olmak üzere İzmir'in farklı ilçelerinde ev, daire, villa, apartman, ofis, mağaza ve iş yerlerinin yenileme ihtiyaçlarına yönelik çözümler sunulmaktadır.\n\nHer proje kendi mevcut durumuna göre değerlendirilir. Yapılacak işin kapsamı, yüzeyin durumu, kullanılacak malzeme ve uygulama aşamaları müşterinin ihtiyacına göre belirlenir.",
  introImage: "/assets/about-renovation.svg",

  ozalTitle: "Özal Usta ile Doğrudan İletişim",
  ozalText:
    "Usta Renovasyon'un kurucusu ve hizmet yetkilisi Özal Usta'dır. Müşteriler yapılacak iş hakkında aracı olmadan doğrudan Özal Usta ile iletişim kurabilir.\n\nTalep alınırken işin türü, konumu, alanın mevcut durumu ve müşterinin beklentileri dinlenir. Mümkünse fotoğraflar üzerinden ön değerlendirme yapılır; gerekli durumlarda keşif planlanır.\n\nAmaç, ihtiyaç duyulmayan işlemleri eklemek yerine mevcut sorunu doğru değerlendirmek ve uygulanabilecek çözüm seçenekleri hakkında müşteriye açık bilgi vermektir.",
  ozalPhoto: "", // Gerçek fotoğraf eklenene kadar boş; çalışma görseli kullanılır, Özal Usta olarak etiketlenmez.

  approachTitle: "Çalışma Anlayışımız",
  approachText:
    "Her işi aynı yöntemle değerlendirmek yerine alanın mevcut durumuna, yapılacak uygulamaya ve müşterinin ihtiyacına göre planlama yapıyoruz. Önce ihtiyacı dinler, alanın mevcut durumunu anlar, gerekli işlemleri belirler ve uygulama seçeneklerini açık şekilde anlatırız. Malzeme seçenekleri hakkında bilgi verir, iş sıralamasını planlar, çalışma alanını korur ve uygulama sonrasında kontrol ederek alanı düzenli şekilde teslim ederiz.",

  whyTitle: "Neden Usta Renovasyon?",
  whySubtitle:
    "Tadilat ve yenileme işlerinde doğru iletişim, uygun uygulama ve düzenli çalışma sürecin en önemli parçalarıdır.",
  whyCards: [
    { icon: "Phone", title: "Doğrudan Özal Usta ile İletişim", desc: "Talebinizi aracı olmadan doğrudan işi değerlendirecek ustaya iletebilirsiniz. Yapılacak iş hakkındaki sorularınızı telefon veya WhatsApp üzerinden sorabilirsiniz." },
    { icon: "ClipboardList", title: "İhtiyaca Uygun Uygulama", desc: "Her alanın yüzey durumu, nem etkisi, kullanım amacı ve yapılacak işlem farklı olabilir. Uygulama yöntemi mevcut durum değerlendirilerek belirlenir." },
    { icon: "MessageSquare", title: "Açık ve Anlaşılır Bilgilendirme", desc: "Yapılması planlanan işlemler, kullanılabilecek malzemeler ve çalışma aşamaları hakkında müşteriye anlaşılır bilgi verilmesine önem verilir." },
    { icon: "Package", title: "Uygulamaya Uygun Malzeme Seçimi", desc: "Malzeme seçimi yalnızca fiyatına göre değil; yüzey türü, iç veya dış ortam, su ve nem etkisi, dayanıklılık ihtiyacı ve uygulama biçimine göre değerlendirilir." },
    { icon: "ShieldCheck", title: "Çalışma Alanının Korunması", desc: "Uygulama öncesinde gerekli alanların örtülmesine, eşyaların korunmasına ve çalışma sürecinin mümkün olduğunca düzenli yürütülmesine dikkat edilir." },
    { icon: "CalendarClock", title: "Planlı Uygulama Süreci", desc: "İşin büyüklüğüne göre yapılacak işlemler sıralanır, gerekli hazırlıklar belirlenir ve uygulama aşamaları planlanır." },
    { icon: "MessageCircle", title: "WhatsApp Üzerinden Ön Bilgi", desc: "Yapılacak alanın fotoğraf ve videoları WhatsApp üzerinden gönderilebilir. Gönderilen görüntüler üzerinden ön bilgi verilebilir; kesin değerlendirme için keşif gerekebilir.", whatsapp: true },
    { icon: "MapPin", title: "Başta Bornova Olmak Üzere İzmir Geneline Hizmet", desc: "Hizmet türü, işin büyüklüğü ve konuma göre İzmir'in farklı ilçelerinde çalışma planlanabilir." },
    { icon: "CheckCircle", title: "İş Sonrası Bilgilendirme", desc: "Uygulama tamamlandıktan sonra yapılan işlemler ve gerekli kullanım veya bakım bilgileri müşteriye aktarılabilir." },
  ],

  principlesTitle: "Temel Çalışma Prensiplerimiz",
  principles: [
    "Müşteriyi dinlemek",
    "Mevcut durumu doğru değerlendirmek",
    "Gereksiz işlem önermemek",
    "Uygun malzeme ve yöntemi belirlemek",
    "İş sürecini açıklamak",
    "Alanı korumaya önem vermek",
    "Düzenli ve planlı çalışmak",
    "Uygulama sonunda kontrol yapmak",
    "Açık iletişim kurmak",
    "Gerçekçi bilgi vermek",
  ],

  processTitle: "Nasıl Çalışıyoruz?",
  processSubtitle: "İlk iletişimden uygulamanın tamamlanmasına kadar süreci açık ve planlı şekilde yürütmeyi hedefliyoruz.",
  processSteps: [
    { title: "Talebinizi İletin", desc: "Telefon, WhatsApp veya teklif formu üzerinden yapılacak işin türünü, bulunduğunuz ilçeyi ve temel ihtiyaçlarınızı iletin." },
    { title: "Fotoğraf ve Detay Gönderin", desc: "Mümkünse yapılacak alanın genel ve yakın çekim fotoğraflarını, yaklaşık ölçüsünü ve mevcut sorunu WhatsApp üzerinden paylaşın." },
    { title: "İhtiyaçları Değerlendirelim", desc: "Gönderilen bilgi ve görseller üzerinden ön değerlendirme yapılır. İşin net anlaşılması için ek fotoğraf, ölçü veya keşif istenebilir." },
    { title: "Gerekirse Yerinde Keşif", desc: "Yüzeyin mevcut durumunun, alan ölçüsünün veya uygulama detaylarının yerinde görülmesi gerektiğinde keşif planlanır." },
    { title: "Yapılacak İşleri Netleştirelim", desc: "Uygulama aşamaları, kullanılabilecek malzemeler, iş kapsamı ve fiyatlandırmayı etkileyen unsurlar belirlenir." },
    { title: "Çalışma Alanını Hazırlayalım", desc: "Uygulama öncesinde eşyaların, zeminlerin, kapı ve pencere çevrelerinin korunması için gerekli hazırlıklar yapılır." },
    { title: "Planlanan Uygulamayı Gerçekleştirelim", desc: "Belirlenen iş sıralamasına göre boya, alçı, sıva, izolasyon, alçıpan veya tadilat uygulamaları gerçekleştirilir." },
    { title: "Kontrol ve Teslim", desc: "Uygulama tamamlandıktan sonra yapılan alanlar kontrol edilir, gerekli son düzenlemeler yapılır ve çalışma alanı müşteriye teslim edilir." },
  ],

  inspectionTitle: "Keşif Neden Önemlidir?",
  inspectionText:
    "Bazı işler fotoğraf ve ölçü bilgileriyle ön değerlendirmeye uygun olabilir. Ancak yüzeyin sağlamlığı, nem kaynağı, çatı birleşim noktaları, sıva durumu veya uygulama alanının ulaşım şartları gibi ayrıntılar yerinde inceleme gerektirebilir. Keşif, yapılacak işlemlerin daha doğru belirlenmesine ve teklif kapsamının daha açık hazırlanmasına yardımcı olur. Keşif her zaman zorunlu değildir; işin türüne göre değerlendirilir.",

  pricingTitle: "Fiyatlandırma Nasıl Belirlenir?",
  pricingText:
    "Tadilat ve uygulama fiyatları yalnızca metrekareye göre belirlenmeyebilir. Mevcut yüzey durumu, yapılacak tamiratlar, malzeme seçimi, işin yüksekliği, ulaşım şartları, kat sayısı, uygulama yöntemi ve işin kapsamı fiyatı etkileyebilir.",
  pricingFactors: [
    "Alanın ölçüsü", "Yüzeyin mevcut durumu", "Tamirat ihtiyacı", "Kullanılacak malzeme",
    "Uygulama katı", "İç veya dış alan", "İskele ihtiyacı", "Ulaşım şartları",
    "Eşya durumu", "İşin teslim süresi", "Hizmet konumu",
  ],

  materialTitle: "Malzeme Seçimini Nasıl Yapıyoruz?",
  materialText:
    "Kullanılacak ürünler yüzeyin türü, uygulamanın iç veya dış alanda olması, su ve neme maruz kalma durumu, dayanıklılık ihtiyacı ve müşterinin tercihleri dikkate alınarak belirlenir. Marka ve ürün bilgileri proje netleşmeden kesin gösterilmez; projeye göre farklı güvenilir ürün seçenekleri değerlendirilebilir.",
  materialNote:
    "İşin türüne göre malzeme Usta Renovasyon tarafından temin edilebilir veya müşteri kendi malzemesini sağlayabilir. Kullanılacak ürünlerin uygulamaya uygunluğu iş başlamadan önce değerlendirilir.",

  cleanTitle: "Çalışma Alanının Korunması",
  cleanText:
    "Boya, sıva ve tadilat uygulamalarında çalışma alanının mümkün olduğunca korunması önemlidir. İşin türüne göre zemin, kapı, pencere, mobilya ve diğer alanlarda uygun örtüleme ve maskeleme yapılabilir.",
  cleanItems: [
    "Zemin koruma", "Mobilya örtme", "Kapı ve pencere bantlama",
    "Çalışma alanını düzenli tutma", "Atıkları uygun şekilde toplama", "İş sonunda genel kontrol",
  ],

  contactTitle: "Açık ve Kolay İletişim",
  contactText:
    "Müşteri, talebini telefon veya WhatsApp üzerinden doğrudan Özal Usta'ya iletebilir. İş başlamadan önce soruların cevaplanmasına, yapılacak işlemlerin açıklanmasına ve süreç içinde gerekli bilgilendirmenin yapılmasına önem verilir. WhatsApp mesajları müsait olunduğunda cevaplanabilir.",

  faqs: [
    { q: "Özal Usta ile doğrudan iletişim kurabilir miyim?", a: "Evet. Telefon veya WhatsApp üzerinden talebinizi doğrudan Özal Usta'ya iletebilirsiniz." },
    { q: "Keşif nasıl yapılıyor?", a: "Bazı işler fotoğrafla ön değerlendirilebilir; yüzeyin sağlamlığı, nem kaynağı veya uygulama detayları için yerinde keşif planlanabilir." },
    { q: "WhatsApp üzerinden fotoğraf gönderebilir miyim?", a: "Evet. Yapılacak alanın genel ve yakın çekim fotoğraflarını göndererek ön bilgi alabilirsiniz. Kesin değerlendirme için keşif gerekebilir." },
    { q: "Fiyat nasıl belirleniyor?", a: "Fiyat; alanın ölçüsü, yüzey durumu, yapılacak işlemler, kullanılacak malzeme ve uygulama şartları değerlendirilerek belirlenir." },
    { q: "Malzemeyi kim temin ediyor?", a: "İşin türüne göre malzeme Usta Renovasyon tarafından temin edilebilir veya müşteri kendi malzemesini sağlayabilir. Uygunluk iş öncesinde değerlendirilir." },
    { q: "İzmir'in hangi ilçelerine hizmet veriyorsunuz?", a: "Başta Bornova olmak üzere işin türü ve konumuna göre İzmir'in farklı ilçelerinde hizmet planlanabilir." },
    { q: "Küçük tamirat işleri yapıyor musunuz?", a: "Evet, büyük tadilat gerektirmeyen lokal duvar, tavan ve boya tamiratları da yapılır." },
    { q: "İş süresi nasıl belirleniyor?", a: "İşin kapsamına göre belirlenir; alan görülmeden kesin teslim süresi verilmez." },
    { q: "Kullanılacak malzemeyi seçebilir miyim?", a: "Evet, uygunluk değerlendirildikten sonra malzeme tercihiniz dikkate alınabilir." },
    { q: "Yapılan işlerin fotoğraflarını nereden görebilirim?", a: "Tamamlanan projeler ve öncesi-sonrası çalışmalar Projeler ve Galeri sayfalarında yayınlanır." },
    { q: "Garanti koşulları nasıl belirleniyor?", a: "Garanti ve iş sonrası destek koşulları, uygulamanın türüne ve kullanılan malzeme göre iş başlamadan önce netleştirilebilir." },
    { q: "Çalışma öncesinde eşyalar nasıl korunuyor?", a: "İşin türüne göre zemin, kapı, pencere ve mobilya uygun örtüleme ve maskeleme ile korunur." },
  ],

  whatsappMsg: "Merhaba Özal Usta. Usta Renovasyon hakkındaki bilgileri inceledim. Yapılacak iş için sizinle görüşmek ve fiyat teklifi almak istiyorum.",
  photoMsg: "Merhaba Özal Usta. Usta Renovasyon web siteniz üzerinden ulaşıyorum. Yapılacak alanın fotoğraflarını göndererek ön bilgi almak istiyorum.",

  // Bölüm görünürlükleri (varsayılan). Gerçek veri olmayan bölümler kapalıdır.
  toggles: {
    show_projects: true,
    show_beforeafter: true,
    show_services: true,
    show_districts: true,
    show_faqs: true,
    show_story: false,
    show_team: false,
    show_documents: false,
    show_stats: false,
    show_testimonials: false,
  },
};