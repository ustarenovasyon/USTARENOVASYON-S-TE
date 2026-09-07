// ============================================================================
// USTA RENOVASYON — MERKEZİ FIRMA BİLGİLERİ (Command Center)
// Tek kaynak: tüm iletişim ve marka verisi buradan okunur.
// Sonraki partlarda bu veriyi yönetim paneli (SiteSetting) ile senkron tut.
// ============================================================================

export const siteConfig = {
  brandName: "Usta Renovasyon",
  principal: "Özal Usta",
  tagline: "Bornova ve İzmir geneline tadilat, boya ve renovasyon hizmeti",

  phone: {
    display: "0536 035 88 98",
    intl: "+90 536 035 88 98",
    tel: "+905360358898",
  },

  whatsapp: {
    number: "905360358898",
    display: "0536 035 88 98",
    defaultMessage:
      "Merhaba Özal Usta. Usta Renovasyon web siteniz üzerinden size ulaştım. Yapılacak iş hakkında bilgi ve fiyat teklifi almak istiyorum.",
  },

  address: {
    full: "Mevlana Mahallesi 1707/11 Sokak No:2 Daire:7 Bornova / İzmir",
    short: "Bornova / İzmir",
    showFull: true,
  },

  serviceArea: "Başta Bornova olmak üzere İzmir'in tüm ilçeleri",
  workingHours: "Pazartesi – Cumartesi: 08:00 – 20:00",

  // E-posta — merkezi iletişim ayarından yönetilir.
  email: "ustarenovasyon@gmail.com",

  // Gerçek kişi (KVKK veri sorumlusu / firma yetkilisi).
  founderName: "Özal Şahin",

  // Sosyal medya — dinamik yönetim SocialLink entity'sinden okunur (Part 22).
  // Buradaki statik değerler yalnızca fallback/şema amaçlıdır; boş bırakıldığında
  // canlı sitede ikon gösterilmez. Yönetim panelinden gerçek URL girilir.
  social: {
    instagram: null,
    facebook: null,
  },

  seo: {
    title: "Usta Renovasyon – Özal Usta | Bornova & İzmir Tadilat, Boya, Renovasyon",
    description:
      "Bornova merkezli, İzmir geneline hizmet veren Usta Renovasyon. Alçı sıva, boya, mantolama, izolasyon, alçıpan ve anahtar teslim tadilat. Ücretsiz keşif ve teklif için Özal Usta'ya ulaşın.",
    keywords: [
      "Bornova tadilat",
      "İzmir boya ustası",
      "Özal Usta",
      "İzmir renovasyon",
      "Bornova boya",
      "mantolama İzmir",
      "anahtar teslim tadilat",
    ],
    ogImage: null,
  },
};

// --- Türetilmiş yardımcı bağlantılar -------------------------------------

export function getWhatsAppLink(message) {
  const text = encodeURIComponent(
    message && message.trim() ? message : siteConfig.whatsapp.defaultMessage
  );
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`;
}

export function getPhoneLink() {
  return `tel:${siteConfig.phone.tel}`;
}

export function getEmailLink() {
  return siteConfig.email ? `mailto:${siteConfig.email}` : null;
}

export function hasEmail() {
  return Boolean(siteConfig.email);
}

// Adres görünürlüğüne göre gösterilecek adres satırını döndürür.
export function getAddressLine(visibility = "short") {
  if (visibility === "full") return siteConfig.address.full;
  if (visibility === "hidden") return null;
  if (visibility === "region") return "İzmir Geneline Hizmet";
  return siteConfig.address.short;
}