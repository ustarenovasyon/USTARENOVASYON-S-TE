// ============================================================================
// ANA SAYFA İÇERİK VERİSİ — Statik metinler burada toplanır.
// İleride yönetim paneli bu içerikleri düzenleyebilir; bileşenler bu kaynağı okur.
// ============================================================================

import {
  Search,
  Package,
  Sparkles,
  CalendarClock,
  User,
  MapPin,
  ClipboardList,
  Receipt,
  CheckCircle,
  Phone,
  Send,
  Wrench,
} from "lucide-react";

export const heroContent = {
  h1Lead: "İzmir'in Güvenilir",
  h1Highlight: "Tadilat, Boya ve Renovasyon Ustası",
  subtitle:
    "Başta Bornova olmak üzere İzmir genelinde boya, alçı, sıva, dış cephe, izolasyon ve anahtar teslim tadilat çözümleri sunuyoruz.",
  areaNote: "Başta Bornova olmak üzere İzmir Geneline Hizmet",
  trustTags: [
    "Ücretsiz Keşif",
    "Kaliteli Malzeme",
    "Temiz İşçilik",
    "Planlı Çalışma",
    "İzmir Geneline Hizmet",
    "Doğrudan Usta ile İletişim",
  ],
};

export const advantages = [
  {
    icon: Search,
    title: "Ücretsiz Keşif",
    desc: "Yapılacak işin durumuna göre keşif ve ön değerlendirme imkânı sunulur.",
  },
  {
    icon: Package,
    title: "Kaliteli Malzeme",
    desc: "Uygulama alanına uygun, güvenilir ve uzun ömürlü ürünler tercih edilir.",
  },
  {
    icon: Sparkles,
    title: "Temiz İşçilik",
    desc: "Çalışma alanının korunmasına, düzenli çalışmaya ve temiz teslimata önem verilir.",
  },
  {
    icon: CalendarClock,
    title: "Planlı Uygulama",
    desc: "İşin kapsamı, uygulama aşamaları ve tahmini süreç hakkında bilgi verilir.",
  },
  {
    icon: User,
    title: "Doğrudan İletişim",
    desc: "Müşteri, işi yapacak Özal Usta ile doğrudan iletişim kurabilir.",
  },
  {
    icon: MapPin,
    title: "İzmir Geneline Hizmet",
    desc: "Başta Bornova olmak üzere İzmir'in birçok ilçesine hizmet verilir.",
  },
];

export const whyUs = [
  {
    icon: User,
    title: "Doğrudan Usta ile İletişim",
    desc: "Talebinizi aracı olmadan doğrudan Özal Usta'ya iletebilirsiniz.",
  },
  {
    icon: ClipboardList,
    title: "İhtiyaca Uygun Çözüm",
    desc: "Her işin mevcut durumu değerlendirilerek uygun uygulama yöntemi belirlenir.",
  },
  {
    icon: Receipt,
    title: "Açık Fiyatlandırma",
    desc: "Yapılacak işlemler ve kullanılacak malzemeler hakkında müşteriye bilgi verilir.",
  },
  {
    icon: Package,
    title: "Kaliteli Malzeme",
    desc: "Uygulama alanına uygun ve güvenilir ürünlerin kullanılmasına dikkat edilir.",
  },
  {
    icon: Sparkles,
    title: "Temiz ve Düzenli Çalışma",
    desc: "Çalışma alanının korunmasına ve iş sonunda düzenli teslim edilmesine önem verilir.",
  },
  {
    icon: CalendarClock,
    title: "Planlı İş Süreci",
    desc: "Uygulama aşamaları ve tahmini çalışma süreci müşteriye açıklanır.",
  },
  {
    icon: MapPin,
    title: "İzmir Geneline Hizmet",
    desc: "Başta Bornova olmak üzere İzmir'in birçok ilçesine hizmet verilir.",
  },
  {
    icon: CheckCircle,
    title: "İş Sonrası İletişim",
    desc: "İş tamamlandıktan sonra gerekli bilgilendirme ve iletişim sürdürülür.",
  },
];

export const steps = [
  {
    icon: Phone,
    title: "İletişim Kurun",
    desc: "Telefon, WhatsApp veya teklif formu üzerinden yapılacak iş hakkında bilgi verin.",
  },
  {
    icon: Send,
    title: "Fotoğraf ve Bilgi Gönderin",
    desc: "Mümkünse yapılacak alanın fotoğraflarını, konumunu ve yaklaşık ölçülerini WhatsApp üzerinden paylaşın.",
  },
  {
    icon: Search,
    title: "Keşif ve Değerlendirme",
    desc: "İşin durumuna göre yerinde keşif yapılır veya gönderilen bilgiler üzerinden ön değerlendirme gerçekleştirilir.",
  },
  {
    icon: ClipboardList,
    title: "Uygulama Planı",
    desc: "Yapılacak işlemler, kullanılacak malzemeler ve çalışma planı belirlenir.",
  },
  {
    icon: Wrench,
    title: "Uygulama",
    desc: "Belirlenen çalışma programına göre tadilat, boya, sıva veya izolasyon işlemleri gerçekleştirilir.",
  },
  {
    icon: CheckCircle,
    title: "Kontrol ve Teslim",
    desc: "İş tamamlandıktan sonra gerekli kontroller yapılır ve çalışma alanı teslim edilir.",
  },
];

export const districts = [
  "Bornova",
  "Bayraklı",
  "Karşıyaka",
  "Konak",
  "Buca",
  "Çiğli",
  "Gaziemir",
  "Kemalpaşa",
  "Menemen",
  "Torbalı",
  "Balçova",
  "Narlıdere",
];

export const faqs = [
  {
    q: "Ücretsiz keşif yapıyor musunuz?",
    a: "Evet, yapılacak işin durumuna göre yerinde keşif veya gönderilen bilgiler üzerinden ön değerlendirme yapıyoruz.",
  },
  {
    q: "İzmir'in hangi ilçelerine hizmet veriyorsunuz?",
    a: "Başta Bornova olmak üzere İzmir'in birçok ilçesinde hizmet veriyoruz. Bulunduğunuz bölge için WhatsApp'tan sorabilirsiniz.",
  },
  {
    q: "Fiyatlandırma nasıl belirleniyor?",
    a: "Fiyat; yapılacak işin kapsamı, alan büyüklüğü ve kullanılacak malzemeye göre belirlenir. Net bilgi için keşif önerilir.",
  },
  {
    q: "Kullanılacak malzemeyi kim temin ediyor?",
    a: "İhtiyaca göre malzemeyi biz temin edebileceğimiz gibi, müşterinin sağladığı malzemeyle de çalışabiliriz.",
  },
  {
    q: "WhatsApp üzerinden fotoğraf gönderebilir miyim?",
    a: "Evet, yapılacak alanın fotoğraflarını WhatsApp'tan göndererek ön değerlendirme ve teklif alabilirsiniz.",
  },
  {
    q: "Küçük tamirat işleri yapıyor musunuz?",
    a: "Evet, küçük tamirat ve yenileme işleri de yapıyoruz.",
  },
  {
    q: "İşin tamamlanma süresi nasıl belirleniyor?",
    a: "İşin kapsamına göre tahmini süre keşif sonrası paylaşılır.",
  },
  {
    q: "Hafta sonu çalışıyor musunuz?",
    a: "Çalışma saatleri ve günleri için Özal Usta ile doğrudan iletişime geçebilirsiniz.",
  },
];