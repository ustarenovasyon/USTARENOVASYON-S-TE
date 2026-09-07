// ============================================================================
// UI GÖRSEL AYARLARI — Yönetim paneli tarafından açılıp kapatılabilir.
// Part 1'deki siteConfig'e dokunmaz; yalnızca görünürlük ve etiketleri kontrol eder.
// ============================================================================

export const uiSettings = {
  stickyHeader: true,          // Üst menü sabit kalsın mı
  mobileCommandBar: true,     // Mobil alt sabit iletişim çubuğu
  desktopContactBar: true,    // Masaüstü yüzen iletişim çubuğu
  whatsappFloatButton: false,  // Yuvarlak WhatsApp butonu kapalı — alt iletişim çubuğunda zaten mevcut
  emailButton: true,          // E-posta adresi eklendi, orta buton aktif

  headerCtaLabel: "Teklif Al",
  headerCtaHref: "/teklif-al",

  phoneLabel: "Hemen Ara",
  whatsappLabel: "WhatsApp",
  emailLabel: "E-Posta",

  addressVisibility: "short",   // full | short | region | hidden
  mapVisibility: "approximate"  // full | approximate | hidden
};