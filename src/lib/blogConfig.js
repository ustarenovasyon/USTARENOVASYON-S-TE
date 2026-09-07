// Blog kategorileri — merkezi liste (Part 16 spec).
// "Tüm Yazılar" gerçek bir kategori değildir; Blog ana sayfasında filtre olarak kullanılır.
// Entity (BlogCategory) kaynaklıdır; veri yoksa bu liste varsayılan olarak kullanılır.
export const blogCategories = [
  { name: "Boya", slug: "boya", description: "İç ve dış cephe boya seçimi, yüzey hazırlığı ve uygulama rehberi.", seo_title: "Boya Rehberi | Usta Renovasyon İzmir", meta_description: "İç ve dış cephe boya türleri, renk seçimi, hazırlık ve uygulama hakkında faydalı bilgiler." },
  { name: "Tadilat", slug: "tadilat", description: "Komple ev tadilatı, iş sıralaması ve planlama rehberi.", seo_title: "Ev Tadilatı Rehberi | Usta Renovasyon", meta_description: "Ev tadilatında iş sıralaması, planlama ve anahtar teslim süreçleri hakkında bilgiler." },
  { name: "İzolasyon", slug: "izolasyon", description: "Rutubet, nem ve ısı yalıtımı uygulamaları.", seo_title: "İzolasyon Rehberi | Usta Renovasyon İzmir", meta_description: "Rutubet, nem ve ısı yalıtımı uygulamaları hakkında dikkat edilmesi gerekenler." },
  { name: "Çatı", slug: "cati", description: "Çatı akması, izolasyon ve bakım rehberi.", seo_title: "Çatı İzolasyonu Rehberi | İzmir Usta Renovasyon", meta_description: "Çatı su alımı, izolasyon ve bakım hakkında dikkat edilmesi gerekenler." },
  { name: "Su Yalıtımı", slug: "su-yalitimi", description: "Teras, banyo ve balkon su yalıtımı bilgileri.", seo_title: "Su Yalıtımı Rehberi | Usta Renovasyon", meta_description: "Teras, banyo ve balkon su yalıtımı, sızıntı ve nem problemleri için bilgiler." },
  { name: "Alçı ve Sıva", slug: "alci-ve-siva", description: "Saten alçı, mineral sıva ve yüzey hazırlığı bilgileri.", seo_title: "Alçı ve Sıva Rehberi | Usta Renovasyon", meta_description: "Alçı, sıva ve yüzey düzleştirme uygulamaları hakkında bilgiler." },
  { name: "Dış Cephe", slug: "dis-cephe", description: "Dış cephe boya, yenileme ve bakım rehberi.", seo_title: "Dış Cephe Rehberi | Usta Renovasyon İzmir", meta_description: "Dış cephe boya, yenileme ve bakım hakkında bilgiler." },
  { name: "Dekorasyon", slug: "dekorasyon", description: "Renk, dekoratif sıva ve mekan yenileme önerileri.", seo_title: "Dekorasyon Önerileri | Usta Renovasyon", meta_description: "Dekoratif sıva, renk ve mekan yenileme için öneriler." },
  { name: "Mantolama", slug: "mantolama", description: "Dış cephe mantolama ve ısı yalıtımı rehberi.", seo_title: "Mantolama Rehberi | İzmir Usta Renovasyon", meta_description: "Dış cephe mantolama, ısı yalıtımı ve avantajları hakkında bilgiler." },
  { name: "Banyo ve Mutfak", slug: "banyo-mutfak", description: "Banyo ve mutfak tadilatı, su yalıtımı ve yenileme.", seo_title: "Banyo ve Mutfak Tadilatı | Usta Renovasyon", meta_description: "Banyo ve mutfak tadilatında dikkat edilmesi gerekenler." },
  { name: "Alçıpan ve Tavan", slug: "alcipan-tavan", description: "Alçıpan asma tavan ve bölme duvar uygulamaları.", seo_title: "Alçıpan ve Asma Tavan | Usta Renovasyon", meta_description: "Alçıpan asma tavan ve bölme duvar hakkında uygulama bilgileri." },
  { name: "Tamirat ve Bakım", slug: "tamirat-bakim", description: "Duvar çatlağı, su lekesi ve küçük onarım rehberi.", seo_title: "Tamirat ve Bakım | Usta Renovasyon", meta_description: "Duvar çatlağı, su lekesi ve küçük onarımlar için pratik bilgiler." },
  { name: "Ev Yenileme", slug: "ev-yenileme", description: "Evi yenileme süreci, planlama ve öneriler.", seo_title: "Ev Yenileme Rehberi | Usta Renovasyon", meta_description: "Evi yenilerken dikkat edilmesi gerekenler ve planlama önerileri." },
  { name: "Malzeme Rehberi", slug: "malzeme-rehberi", description: "Boya, alçı ve yalıtım malzemeleri hakkında bilgiler.", seo_title: "Malzeme Rehberi | Usta Renovasyon", meta_description: "Boya, alçı ve yalıtım malzemeleri hakkında seçim bilgileri." },
];

export const blogCategoryBySlug = (slug) => blogCategories.find((c) => c.slug === slug);