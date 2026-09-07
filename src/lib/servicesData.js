// ============================================================================
// HİZMET KATEGORİLERİ — 10 ana kategori (Part 5).
// key: Service entity'deki category alanı (geriye dönük uyumlu).
// slug: /hizmetler/:slug kategori sayfası adresi.
// Alt hizmet detayları Service entity'sinde tutulur.
// ============================================================================

import {
  Brush,
  PaintBucket,
  Building,
  ShieldCheck,
  Building2,
  Layers,
  Hammer,
  Wrench,
  Sparkles,
  Store,
} from "lucide-react";

export const serviceCategories = [
  {
    key: "alci-siva",
    slug: "alci-siva",
    title: "Alçı ve Sıva Hizmetleri",
    short: "Alçı ve Sıva",
    icon: Brush,
    blurb: "Düzgün yüzeylerin temeli: alçı sıva, saten alçı, makine sıvası ve çatlak tamiri ile pürüzsüz duvarlar.",
    description:
      "Duvar ve tavan yüzeylerinde bulunan eğrilik, çatlak, kabarma ve yüzey bozukluklarını gidererek boya ve dekorasyon uygulamalarına uygun düzgün yüzeyler oluşturuyoruz.",
    subServices: [
      "Alçı sıva", "Saten alçı", "Kara sıva", "Makine sıvası", "Perlitli sıva", "İnce sıva",
      "Dekoratif sıva", "Mineral sıva", "Duvar düzeltme", "Tavan düzeltme", "Sıva tamiri",
      "Alçı tamiri", "Çatlak tamiri", "Yüzey hazırlama", "Boya öncesi duvar hazırlığı",
      "Kabaran sıva onarımı", "Bozuk duvar yüzeyi düzeltme",
    ],
    faqs: [
      { q: "Saten alçı ne için uygulanır?", a: "Saten alçı, boya öncesi duvar ve tavan yüzeylerini pürüzsüz hale getirmek için uygulanır." },
      { q: "Çatlak duvar boya yapılmadan tamir edilir mi?", a: "Evet, çatlaklar boya öncesinde açılıp temizlenir ve tamir edilir; ardından yüzey hazırlığı yapılır." },
      { q: "Makine sıvası her alana uygulanır mı?", a: "Uygun yüzey ve alan koşullarında uygulanabilir; mevcut durum değerlendirilerek yöntem belirlenir." },
    ],
  },
  {
    key: "boya",
    slug: "boya",
    title: "Boya Hizmetleri",
    short: "Boya",
    icon: PaintBucket,
    blurb: "İç ve dış cephe boya, tavan boyası, silikonlu boya ve dekoratif uygulamalarla ferah ve taze mekanlar.",
    description:
      "Ev, daire, villa, apartman ve iş yerlerinde yüzey hazırlığından son kat uygulamaya kadar temiz ve düzenli iç ve dış cephe boya hizmetleri sunuyoruz.",
    subServices: [
      "İç cephe boya", "Dış cephe boya", "Ev boyama", "Daire boyama", "Villa boyama", "Ofis boyama",
      "İş yeri boyama", "Mağaza boyama", "Dükkan boyama", "Apartman boyama", "Bina boyama",
      "Merdiven boşluğu boyama", "Tavan boyası", "Silikonlu boya", "Plastik boya", "Yağlı boya",
      "Su bazlı boya", "Dekoratif boya", "Efekt boya", "Desenli boya", "Kapı boyama", "Demir boyama",
      "Korkuluk boyama", "Ahşap boyama", "Fayans boyama", "Boya tamiri", "Lokal boya uygulaması",
      "Su hasarı sonrası boya",
    ],
    faqs: [
      { q: "Ev boyama işlemi kaç gün sürer?", a: "Süre, alan büyüklüğüne, yüzey durumuna ve yapılan işlemlere göre değişir; keşif veya fotoğraf sonrası tahmini paylaşılır." },
      { q: "Boya öncesinde eşyalar nasıl korunur?", a: "Mobilyar ve zemin, uygun örtü ve maskeleme malzemeleriyle korunur." },
      { q: "Malzemeyi siz mi temin ediyorsunuz?", a: "İhtiyaca göre malzemeyi biz temin edebilir veya müşterinin sağladığı malzemeyle çalışabiliriz." },
    ],
  },
  {
    key: "dis-cephe",
    slug: "dis-cephe",
    title: "Dış Cephe Hizmetleri",
    short: "Dış Cephe",
    icon: Building,
    blurb: "Bina dış yüzeyinde boya dökülmesi, sıva çatlağı ve solma için hazırlık, tamir ve boya uygulamaları.",
    description:
      "Bina ve apartmanların dış yüzeylerinde meydana gelen boya dökülmesi, sıva çatlağı, solma ve yüzey bozukluklarına karşı uygun hazırlık, tamir ve boya uygulamaları gerçekleştiriyoruz.",
    subServices: [
      "Dış cephe boya", "Dış cephe sıva", "Mineral sıva", "Dekoratif dış cephe kaplama",
      "Cephe çatlak tamiri", "Cephe sıva tamiri", "Dış cephe yüzey hazırlığı", "Dış cephe astar",
      "Silikonlu dış cephe boya", "Akrilik dış cephe boya", "Apartman dış cephe yenileme",
      "Bina dış cephe yenileme", "Villa dış cephe boya", "Dış cephe su yalıtımı", "Dış cephe bakım ve onarım",
    ],
    faqs: [
      { q: "Dış cephe boyada ısıkefe gerekir mi?", a: "Bina yüksekliğine ve çalışma alanına göre gerek olabilir; durum değerlendirilerek planlanır." },
      { q: "Dış cephe çalışması hangi havalarda yapılır?", a: "Uygun hava koşullarında uygulanır; don ve aşırı yağışlı dönemler uygun değildir." },
    ],
  },
  {
    key: "izolasyon",
    slug: "cati-izolasyon",
    title: "Çatı ve İzolasyon Hizmetleri",
    short: "Çatı ve İzolasyon",
    icon: ShieldCheck,
    blurb: "Çatı, teras, balkon su yalıtımı, membran, rutubet ve sızıntı çözümleriyle kalıcı koruma.",
    description:
      "Çatı, teras, balkon, banyo ve benzeri alanlarda meydana gelen su alma, nem ve sızıntı sorunlarına yapının mevcut durumuna uygun yalıtım çözümleri sunuyoruz.",
    subServices: [
      "Çatı izolasyonu", "Çatı su yalıtımı", "Çatı tamiri", "Çatı akıntısı onarımı", "Membran uygulaması",
      "Bitümlü membran", "Sürme izolasyon", "Akrilik izolasyon", "Poliüretan izolasyon", "Teras izolasyonu",
      "Balkon izolasyonu", "Banyo izolasyonu", "Temel izolasyonu", "Perde beton izolasyonu", "Su yalıtımı",
      "Nem yalıtımı", "Rutubet çözümü", "Su sızıntısı onarımı", "Duvar nemi çözümü", "Islak hacim izolasyonu",
    ],
    faqs: [
      { q: "Çatı neden su alır?", a: "Membran eskimesi, birleşim noktaları veya yüzey hasarı gibi nedenlerle su alabilir; yerinde veya fotoğrafla değerlendirme yapılır." },
      { q: "İzolasyon öncesinde keşif gerekir mi?", a: "Sorunun kaynağı doğru belirlenmek için çoğu durumda keşif veya fotoğrafla ön değerlendirme önerilir." },
      { q: "Yağmurlu havada uygulama yapılabilir mi?", a: "Yalıtım uygulamaları kuru yüzey ister; yağışlı havada uygulama yapılmaz." },
    ],
  },
  {
    key: "mantolama",
    slug: "mantolama",
    title: "Mantolama ve Isı Yalıtımı",
    short: "Mantolama ve Isı Yalıtımı",
    icon: Building2,
    blurb: "EPS, XPS ve taş yünü mantolama ile dış cephe yenileme; ısı konforu ve enerji tasarrufu.",
    description:
      "Binalarda ısı kaybını azaltmaya, dış cepheyi korumaya ve yaşam alanlarının konforunu artırmaya yönelik mantolama ve ısı yalıtımı uygulamaları gerçekleştiriyoruz.",
    subServices: [
      "Mantolama", "EPS mantolama", "XPS mantolama", "Taş yünü mantolama", "Isı yalıtımı",
      "Dış cephe mantolama", "Fileli sıva uygulaması", "Mantolama sıvası", "Mantolama üzeri boya",
      "Mantolama tamiri", "Dış cephe ısı yalıtımı", "Bina enerji verimliliği uygulamaları",
    ],
    faqs: [
      { q: "Mantolama enerji tasarrufu sağlar mı?", a: "Dış cephe ısı yalıtımı ısı kaybını azaltmaya yardımcı olabilir; net etki binaya göre değişir." },
      { q: "Mantolama sonrası dış cephe boyanır mı?", a: "Evet, mantolama üzeri uygun sıva ve boya uygulamasıyla cephe tamamlanır." },
    ],
  },
  {
    key: "alcipan",
    slug: "alcipan-tavan",
    title: "Alçıpan ve Tavan Sistemleri",
    short: "Alçıpan ve Tavan",
    icon: Layers,
    blurb: "Bölme duvar, asma tavan, kartonpiyer ve dekoratif niş uygulamalarıyla mekanına karakter kat.",
    description:
      "Ev, ofis ve iş yerlerinde alan bölme, tavan düzenleme, dekoratif görünüm ve aydınlatma ihtiyaçlarına yönelik alçıpan ve asma tavan çözümleri sunuyoruz.",
    subServices: [
      "Alçıpan bölme duvar", "Alçıpan duvar kaplama", "Alçıpan asma tavan", "Metal asma tavan",
      "Dekoratif asma tavan", "LED tavan", "Gizli ışık tavanı", "Tavan nişi", "Duvar nişi", "TV ünitesi",
      "Alçıpan kitaplık", "Dekoratif duvar", "Ses yalıtımlı bölme duvar", "Kartonpiyer", "Stropiyer",
      "Tavan göbek uygulaması", "Tavan tamiri", "Asma tavan tamiri",
    ],
    faqs: [
      { q: "Alçıpan bölme duvar ne kadar sürede yapılır?", a: "Alan ölçüsüne ve detaylara göre değişir; keşif sonrası tahmini süre paylaşılır." },
      { q: "Asma tavana LED aydınlatma eklenebilir mi?", a: "Evet, gizli ışık veya LED tavan uygulamaları planlanabilir." },
    ],
  },
  {
    key: "tadilat",
    slug: "tadilat-renovasyon",
    title: "Tadilat ve Renovasyon Hizmetleri",
    short: "Tadilat ve Renovasyon",
    icon: Hammer,
    blurb: "Komple ev, daire, villa ve iş yeri yenileme; anahtar teslim tadilat ve su hasarı onarımı.",
    description:
      "Küçük yenileme işlerinden komple daire tadilatına kadar boya, alçı, sıva, alçıpan, izolasyon ve dekorasyon işlerini ihtiyaca göre bir bütün halinde planlıyoruz.",
    subServices: [
      "Ev tadilatı", "Daire tadilatı", "Villa tadilatı", "Komple ev yenileme", "Anahtar teslim tadilat",
      "Anahtar teslim renovasyon", "Banyo tadilatı", "Mutfak tadilatı", "Salon yenileme",
      "Yatak odası yenileme", "Çocuk odası yenileme", "Koridor tadilatı", "Balkon tadilatı", "Ofis tadilatı",
      "Mağaza tadilatı", "Dükkan tadilatı", "Apartman ortak alan tadilatı", "Bina yenileme",
      "Eski ev yenileme", "Kiracı çıkışı sonrası ev yenileme", "Satış öncesi ev yenileme",
    ],
    faqs: [
      { q: "Komple ev tadilatı ne kadar sürer?", a: "İş kapsamına göre değişir; plan oluşturulduktan sonra tahmini süre paylaşılır." },
      { q: "Anahtar teslim tadilat ne demektir?", a: "Boya, alçı, sıva, alçıpan ve dekorasyon işlerinin ihtiyaca göre bir bütün olarak planlanıp teslim edilmesidir." },
    ],
  },
  {
    key: "tamirat-onarim",
    slug: "tamirat-onarim",
    title: "Tamirat ve Onarım Hizmetleri",
    short: "Tamirat ve Onarım",
    icon: Wrench,
    blurb: "Duvar, tavan, boya ve sıva tamiratıyla yaşam alanının görünümünü ve kullanımını düzeltin.",
    description:
      "Büyük bir tadilat gerektirmeyen ancak yaşam alanının görünümünü ve kullanımını etkileyen duvar, tavan, boya ve sıva sorunlarına yönelik tamirat hizmetleri sunuyoruz.",
    subServices: [
      "Duvar tamiri", "Tavan tamiri", "Çatlak tamiri", "Sıva tamiri", "Alçı tamiri", "Boya tamiri",
      "Kabaran boya onarımı", "Dökülen sıva onarımı", "Su hasarı onarımı", "Nem ve rutubet sonrası tamirat",
      "Lokal duvar onarımı", "Tavan lekesi onarımı", "Kapı kenarı tamiri", "Pencere kenarı sıva tamiri",
      "Küçük tadilat işleri", "Kırılan duvar köşesi tamiri", "Alçıpan tamiri", "Asma tavan tamiri",
    ],
    faqs: [
      { q: "Küçük tamirat işleri yapıyor musunuz?", a: "Evet, büyük tadilat gerektirmeyen lokal duvar, tavan ve boya tamiratları da yapılır." },
      { q: "Su hasarı sonrası duvar tamir edilir mi?", a: "Evet, hasarlı bölge değerlendirilip uygun tamirat ve boyama yapılır." },
    ],
  },
  {
    key: "dekoratif",
    slug: "dekoratif-uygulamalar",
    title: "Dekoratif Uygulamalar",
    short: "Dekoratif Uygulamalar",
    icon: Sparkles,
    blurb: "Dekoratif boya, efekt boya, niş, kartonpiyer ve vurgu duvarıyla modern ve estetik mekanlar.",
    description:
      "Yaşam ve çalışma alanlarına daha modern, düzenli ve estetik bir görünüm kazandırmak için dekoratif duvar, tavan, boya ve alçıpan uygulamaları gerçekleştiriyoruz.",
    subServices: [
      "Dekoratif boya", "Efekt boya", "Desenli boya", "Dekoratif sıva", "Mineral sıva", "TV ünitesi",
      "Duvar nişi", "Tavan nişi", "LED aydınlatma alanı", "Kartonpiyer", "Stropiyer", "Dekoratif tavan",
      "Dekoratif duvar paneli uygulaması", "Vurgu duvarı", "Özel renk uygulamaları",
    ],
    faqs: [
      { q: "Vurgu duvarı nedir?", a: "Mekanın bir duvarında farklı renk, efekt boya veya malzeme kullanılarak odak noktası oluşturulmasıdır." },
      { q: "Dekoratif boya her yüzeye uygulanır mı?", a: "Yüzey durumu değerlendirilerek uygun hazırlık ve uygulama planlanır." },
    ],
  },
  {
    key: "isyeri",
    slug: "isyeri-tadilati",
    title: "İş Yeri ve Ticari Alan Hizmetleri",
    short: "İş Yeri ve Ticari Alan",
    icon: Store,
    blurb: "Ofis, mağaza ve dükkanlarda işletmeyi aksatmadan boya, tadilat ve bölme duvar çözümleri.",
    description:
      "Ofis, mağaza, dükkan ve diğer ticari alanlarda işletmenin çalışma düzenini mümkün olduğunca aksatmayacak şekilde boya, tadilat, bölme duvar ve yenileme çözümleri planlıyoruz.",
    subServices: [
      "Ofis tadilatı", "Mağaza tadilatı", "Dükkan tadilatı", "İş yeri boyama", "Ofis boyama",
      "Mağaza boyama", "Alçıpan bölme duvar", "Asma tavan", "Depo boyama",
      "Merdiven ve ortak alan boyama", "Ticari alan yenileme", "Kiralama öncesi iş yeri hazırlığı",
      "Açılış öncesi mağaza yenileme",
    ],
    faqs: [
      { q: "İş yeri çalışırken tadilat yapılır mı?", a: "Çalışma düzenini aksatmamak için planlama yapılabilir; kesin çalışma saatleri için iletişime geçilmelidir." },
    ],
  },
];

export function getCategoryMeta(key) {
  return serviceCategories.find((c) => c.key === key) || null;
}

export function getCategoryBySlug(slug) {
  return serviceCategories.find((c) => c.slug === slug) || null;
}