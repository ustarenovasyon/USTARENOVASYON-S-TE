import { serviceCategories } from "@/lib/servicesData";
import { izmirDistricts } from "@/lib/districtsData";
import { getDistrictContent } from "@/lib/districtContent";
import { faqs as homeFaqs } from "@/lib/homeContent";
import { aboutContent } from "@/lib/aboutContent";
import { blogCategories } from "@/lib/blogConfig";
import { siteConfig } from "@/lib/siteConfig";

function slugifyTr(value = "") {
  return String(value)
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const genericAdvantages = [
  "Mevcut yüzeye ve işin kapsamına göre uygulama planı",
  "Çalışma alanında gerekli koruma ve yüzey hazırlığı",
  "Uygulamaya uygun malzeme ve yöntem değerlendirmesi",
  "İş sonunda kontrol ve düzenli teslim",
];

const genericProcess = [
  "Telefon veya WhatsApp üzerinden ihtiyaç ve konum bilgisi alınır.",
  "Mümkünse alanın fotoğrafları ve yaklaşık ölçüsü değerlendirilir.",
  "Gerekli durumlarda yerinde keşif planlanır.",
  "İş kapsamı, malzeme ve uygulama sırası netleştirilir.",
  "Uygulama tamamlanır ve son kontrol yapılır.",
];

export const staticServices = serviceCategories.flatMap((category, categoryIndex) =>
  category.subServices.map((name, serviceIndex) => ({
    id: `${category.key}-${serviceIndex + 1}`,
    name,
    slug: slugifyTr(name),
    category: category.key,
    active: true,
    status: "published",
    order: categoryIndex * 100 + serviceIndex + 1,
    short_description: `${name} için Bornova ve İzmir genelinde mevcut yüzey ve iş kapsamına göre profesyonel uygulama hizmeti.`,
    description: `${name} uygulamasında alanın mevcut durumu, yüzey hazırlığı, kullanılacak malzeme ve yapılacak işlemler birlikte değerlendirilir. Uygulama yöntemi işin teknik ihtiyacına göre belirlenir. Net kapsam ve fiyat için fotoğraf üzerinden ön değerlendirme veya gerektiğinde keşif yapılabilir.`,
    when_needed: [
      "Yüzeyde yenileme, bakım veya onarım gerektiğinde",
      "Mevcut uygulama kullanım veya görünüm ihtiyacını karşılamadığında",
      "Tadilat veya dekorasyon çalışmasının bir parçası olarak ihtiyaç duyulduğunda",
    ],
    use_areas: ["Daire", "Ev", "Villa", "Ofis", "Mağaza / dükkan", "Apartman ortak alanı"],
    advantages: genericAdvantages,
    process_steps: genericProcess,
    materials: [],
    faqs: category.faqs || [],
    related_services: [],
    has_free_inspection: "foto",
    seo_title: `${name} İzmir | Usta Renovasyon`,
    meta_description: `${name} için Bornova ve İzmir genelinde uygulama, ön değerlendirme ve keşif. Özal Usta ile telefon veya WhatsApp üzerinden iletişime geçin.`,
    whatsapp_message: `Merhaba Özal Usta. Usta Renovasyon web sitenizdeki ${name} hizmeti hakkında bilgi ve fiyat teklifi almak istiyorum.`,
  }))
);

export const staticServiceAreas = izmirDistricts.map((district, index) => {
  const content = getDistrictContent(district.slug, district);
  return {
    ...district,
    id: `district-${index + 1}`,
    order: district.order || index + 1,
    page_status: "published",
    status: "published",
    hero_title: content.hero_title,
    short_description: content.short_description,
    long_description: content.intro,
    featured_services: content.featured_services,
    building_types: content.building_types,
    process_text: content.process_text,
    pricing_text: content.pricing_text,
    faqs: content.faqs,
    whatsapp_message: content.whatsapp_message,
    seo_title: content.seo_title,
    meta_description: content.meta_description,
  };
});

const categoryByQuestion = (q = "") => {
  const s = q.toLocaleLowerCase("tr-TR");
  if (s.includes("fiyat")) return "Fiyatlandırma";
  if (s.includes("keşif")) return "Ücretsiz Keşif";
  if (s.includes("whatsapp") || s.includes("fotoğraf")) return "Fotoğraf ve Dosya Gönderimi";
  if (s.includes("ilçe") || s.includes("bölge")) return "Hizmet Bölgeleri";
  if (s.includes("malzeme")) return "Malzeme";
  if (s.includes("süre") || s.includes("tamamlan")) return "Uygulama Süresi";
  return "Genel Sorular";
};

const allFaqPairs = [
  ...homeFaqs,
  ...(aboutContent.faqs || []),
  ...serviceCategories.flatMap((c) => c.faqs || []),
];

const seenFaq = new Set();
export const staticFaqs = allFaqPairs
  .filter((f) => {
    const key = f.q.trim().toLocaleLowerCase("tr-TR");
    if (seenFaq.has(key)) return false;
    seenFaq.add(key);
    return true;
  })
  .map((f, i) => ({
    id: `faq-${i + 1}`,
    question: f.q,
    answer: f.a,
    category: categoryByQuestion(f.q),
    status: "published",
    show_on_home: i < 8,
    show_on_sss: true,
    order: i + 1,
    related_services: [],
  }));

const blogPost = ({ id, title, slug, category, summary, intro, sections, faqs = [], related = [], featured = false }) => {
  const categoryMeta = blogCategories.find((c) => c.slug === category);
  const content = [
    intro,
    ...sections.flatMap((s) => [`## ${s.title}`, s.body]),
    "## Uygulama Öncesi Son Kontrol",
    "Yapılacak işin kapsamı yalnızca fotoğrafa veya metrekareye bakılarak kesinleştirilmemelidir. Yüzey durumu, gerekli tamiratlar, malzeme seçimi ve çalışma koşulları birlikte değerlendirilmelidir. Fotoğraflar üzerinden ön bilgi alınabilir; gerekli durumlarda yerinde keşif planlanır.",
  ].join("\n\n");
  return {
    id,
    title,
    slug,
    category,
    category_name: categoryMeta?.name || "Rehber",
    summary,
    content,
    author: "Özal Usta",
    status: "published",
    show_on_blog: true,
    show_on_homepage: true,
    featured,
    published_date: "2026-09-07",
    updated_date: "2026-09-07",
    cover_image: "",
    tags: [categoryMeta?.name || category, "İzmir", "Usta Renovasyon"],
    faqs,
    related_services: related,
    related_posts: [],
    seo_title: `${title} | Usta Renovasyon`,
    meta_description: summary,
  };
};

export const staticBlogPosts = [
  blogPost({
    id: "blog-1",
    title: "Ev Boyama Öncesi Hazırlık: Duvar, Eşya ve Yüzey Kontrolü",
    slug: "ev-boyama-oncesi-hazirlik",
    category: "boya",
    featured: true,
    summary: "Ev boyama öncesinde yüzey hazırlığı, çatlakların kontrolü, eşyaların korunması ve boya seçimi için pratik bir rehber.",
    intro: "İyi bir boya sonucu yalnızca son kat boyaya bağlı değildir. Duvarın mevcut durumu, çatlak ve kabarmaların giderilmesi, doğru astar kullanımı ve çalışma alanının korunması sonucu doğrudan etkiler.",
    sections: [
      { title: "Yüzey Neden Önce Kontrol Edilir?", body: "Duvarlarda kabarma, nem izi, gevşek sıva veya çatlak varsa doğrudan boya uygulamak sorunu gizleyebilir. Önce problemli alanlar belirlenmeli, gerekli tamirat tamamlanmalı ve yüzey boya için uygun hale getirilmelidir." },
      { title: "Eşyalar ve Zemin Nasıl Korunur?", body: "Taşınabilir eşyaların çalışma alanından çıkarılması, büyük mobilyaların ortada toplanıp örtülmesi ve zeminin uygun koruyucu malzemeyle kapatılması çalışma düzenini ve temizliği kolaylaştırır." },
      { title: "Boya Seçiminde Nelere Bakılır?", body: "İç veya dış ortam, yüzey tipi, silinebilirlik ihtiyacı, nem koşulları ve istenen görünüm birlikte değerlendirilmelidir. Renk seçimi kadar ürünün kullanım alanına uygunluğu da önemlidir." },
    ],
    faqs: serviceCategories.find((c) => c.key === "boya")?.faqs || [],
    related: ["ic-cephe-boya", "ev-boyama", "daire-boyama"],
  }),
  blogPost({
    id: "blog-2",
    title: "Alçı ve Sıva Arasındaki Fark Nedir? Hangi Yüzeyde Hangisi Kullanılır?",
    slug: "alci-ve-siva-arasindaki-fark",
    category: "alci-ve-siva",
    summary: "Alçı, saten alçı ve sıvanın görevleri; boya öncesi yüzey düzeltme ve çatlak onarımında hangi aşamanın ne işe yaradığı.",
    intro: "Alçı ve sıva aynı amaçla kullanılan malzemeler değildir. Uygulama seçimi duvarın mevcut durumuna, bozukluk seviyesine ve son kaplamaya göre yapılır.",
    sections: [
      { title: "Sıvanın Görevi", body: "Sıva daha bozuk veya ham yüzeylerin düzeltilmesinde, yüzeye kalınlık ve düzgünlük kazandırılmasında kullanılır. Uygulama türü iç veya dış mekâna göre değişebilir." },
      { title: "Alçı ve Saten Alçı Ne Sağlar?", body: "Alçı uygulamaları özellikle iç mekânda yüzey düzeltme ve ince işçilik için kullanılır. Saten alçı boya öncesinde daha pürüzsüz bir yüzey elde etmeye yardımcı olur." },
      { title: "Çatlaklarda Sadece Boya Yeterli mi?", body: "Çatlağın nedeni ve derinliği değerlendirilmeden yalnızca boya yapmak çoğu zaman kalıcı çözüm sağlamaz. Çatlak açılıp uygun şekilde onarılmalı, ardından yüzey hazırlığı ve boya yapılmalıdır." },
    ],
    faqs: serviceCategories.find((c) => c.key === "alci-siva")?.faqs || [],
    related: ["alci-siva", "saten-alci", "catlak-tamiri"],
  }),
  blogPost({
    id: "blog-3",
    title: "Çatı Su Alıyorsa İlk Olarak Neye Bakılmalı?",
    slug: "cati-su-aliyorsa-ne-yapilmali",
    category: "cati",
    summary: "Çatı ve teras sızıntılarında kaynağın bulunması, membran ve birleşim noktalarının kontrolü ile doğru onarım yaklaşımı.",
    intro: "Çatıdan gelen suyun iç mekânda görüldüğü nokta ile gerçek sızıntı noktası aynı yer olmayabilir. Bu nedenle onarım öncesinde kaynağın doğru belirlenmesi önemlidir.",
    sections: [
      { title: "Sızıntı Kaynağı Nasıl Araştırılır?", body: "Membran birleşimleri, gider çevreleri, parapet dipleri, baca ve tesisat geçişleri, kırık kaplama veya açık derzler kontrol edilir. Yağış sonrası izlerin yönü de değerlendirmeye yardımcı olabilir." },
      { title: "Yüzey Hazırlığı Neden Önemli?", body: "Yalıtım malzemesi sağlam, temiz ve uygun yüzeye uygulanmalıdır. Gevşek parçalar, toz, kabarma veya su birikmesine neden olan bozukluklar giderilmeden yapılan uygulama beklenen sonucu vermeyebilir." },
      { title: "Ne Zaman Keşif Gerekir?", body: "Sızıntının kaynağı fotoğraftan anlaşılamıyorsa, birden fazla birleşim noktası varsa veya çatı erişimi özel koşullar gerektiriyorsa yerinde inceleme yapılması daha doğru olur." },
    ],
    faqs: serviceCategories.find((c) => c.key === "izolasyon")?.faqs || [],
    related: ["cati-izolasyonu", "cati-su-yalitimi", "cati-tamiri"],
  }),
  blogPost({
    id: "blog-4",
    title: "Komple Ev Tadilatında İş Sıralaması Nasıl Olmalı?",
    slug: "komple-ev-tadilati-is-siralamasi",
    category: "tadilat",
    summary: "Ev tadilatında kırma ve tamirat işlerinden alçı, boya, tavan ve son kontrollere kadar doğru çalışma sıralaması.",
    intro: "Komple tadilatta işlerin doğru sırayla ilerlemesi hem tekrar iş yapılmasını hem de bitmiş yüzeylerin zarar görmesini azaltır. Plan, evin mevcut durumuna göre değişse de temel mantık kaba işlerden ince işlere ilerlemektir.",
    sections: [
      { title: "Önce Kapsam Belirlenir", body: "Boya, alçı, banyo, mutfak, alçıpan, izolasyon veya diğer yenilemeler ayrı ayrı listelenir. Hangi işin diğerini etkilediği belirlenerek çalışma sırası oluşturulur." },
      { title: "Kaba İşlerden İnce İşlere", body: "Gerekli söküm ve tamiratlar tamamlandıktan sonra tesisatla ilişkili işler, sıva ve alçı düzeltmeleri, tavan uygulamaları ve boya gibi son yüzey işleri planlanır." },
      { title: "Teslim Öncesi Kontrol", body: "Boyanan ve tamir edilen yüzeyler, birleşimler, temizlik ve son rötuşlar kontrol edilir. Kullanım veya bakım gerektiren uygulamalar hakkında bilgi verilir." },
    ],
    faqs: serviceCategories.find((c) => c.key === "tadilat")?.faqs || [],
    related: ["ev-tadilati", "daire-tadilati", "anahtar-teslim-tadilat"],
  }),
  blogPost({
    id: "blog-5",
    title: "Mantolama Yapılmadan Önce Dış Cephede Hangi Kontroller Yapılır?",
    slug: "mantolama-oncesi-dis-cephe-kontrolu",
    category: "mantolama",
    summary: "Mantolama öncesinde dış cephe yüzeyi, çatlaklar, gevşek sıvalar, malzeme seçimi ve uygulama detaylarının kontrolü.",
    intro: "Mantolama yalnızca levhaların cepheye yapıştırılmasından ibaret değildir. Mevcut cephenin sağlamlığı, yüzey bozuklukları ve uygulama detayları sistemin bütününü etkiler.",
    sections: [
      { title: "Mevcut Cephe Sağlam mı?", body: "Gevşek sıva, dökülen boya, nemli alanlar ve yüzey çatlakları kontrol edilmelidir. Sağlam olmayan tabaka üzerine yapılan uygulama ileride ayrılma riski oluşturabilir." },
      { title: "EPS, XPS veya Taş Yünü Seçimi", body: "Malzeme seçimi proje ihtiyacı, cephe özellikleri ve uygulanacak sistemle birlikte değerlendirilmelidir. Tek başına ürün kalınlığı bütün performansı belirlemez; detay ve işçilik de önemlidir." },
      { title: "Fileli Sıva ve Son Kat", body: "Levha montajından sonra köşe, dübel, file ve sıva detaylarının doğru uygulanması gerekir. Son kat dekoratif kaplama veya dış cephe boyası sistemin koruyucu katmanını tamamlar." },
    ],
    faqs: serviceCategories.find((c) => c.key === "mantolama")?.faqs || [],
    related: ["mantolama", "eps-mantolama", "tas-yunu-mantolama"],
  }),
  blogPost({
    id: "blog-6",
    title: "Alçıpan Asma Tavan ve Bölme Duvar Planlarken Nelere Dikkat Edilir?",
    slug: "alcipan-asma-tavan-planlama",
    category: "alcipan-tavan",
    summary: "Alçıpan asma tavan, bölme duvar, LED aydınlatma ve dekoratif niş uygulamalarında ölçü, taşıyıcı sistem ve detay planlaması.",
    intro: "Alçıpan sistemlerde doğru ölçü, taşıyıcı karkas ve kullanım amacı birlikte düşünülmelidir. Aydınlatma, tesisat veya yalıtım ihtiyacı varsa uygulamadan önce planlanması gerekir.",
    sections: [
      { title: "Kullanım Amacı Belirlenir", body: "Bölme duvar, dekoratif tavan, tesisat gizleme veya LED aydınlatma gibi amaçlar profil düzenini ve kaplama detayını etkileyebilir." },
      { title: "Tavan Yüksekliği ve Aydınlatma", body: "Asma tavan yapılırken mevcut tavan yüksekliği, armatür konumları ve gizli ışık detayları ölçülmelidir. Elektrik hazırlıkları kapatma işleminden önce tamamlanmalıdır." },
      { title: "Birleşim ve Yüzey İşçiliği", body: "Levha birleşimlerinin uygun şekilde bantlanması, alçı ve zımpara işlemlerinin düzgün yapılması son boya görünümünü doğrudan etkiler." },
    ],
    faqs: serviceCategories.find((c) => c.key === "alcipan")?.faqs || [],
    related: ["alcipan-asma-tavan", "alcipan-bolme-duvar", "led-tavan"],
  }),
];

export const staticBlogCategories = blogCategories.map((c, i) => ({
  id: `blog-category-${i + 1}`,
  ...c,
  status: "published",
  order: i + 1,
}));

export const staticAboutContents = [{ id: "about-main", ...aboutContent, active: true }];

export const staticSocialLinks = [
  siteConfig.social.instagram ? { id: "social-instagram", platform: "instagram", url: siteConfig.social.instagram, active: true, order: 1 } : null,
  siteConfig.social.facebook ? { id: "social-facebook", platform: "facebook", url: siteConfig.social.facebook, active: true, order: 2 } : null,
].filter(Boolean);

export const staticPaintingVisibility = [{ id: "painting-prices", active: true, enabled: true }];
export const staticMaintenanceMode = [{ id: "maintenance", enabled: false, message: "" }];
export const staticProjects = [];
export const staticLandingPages = [];
export const staticCampaigns = [];
