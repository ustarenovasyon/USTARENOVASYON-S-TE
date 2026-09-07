import React from "react";
import LegalLayout from "@/components/common/LegalLayout";

export default function KullanimSartlari() {
  return (
    <LegalLayout title="Kullanım Şartları" seoTitle="Kullanım Şartları | Usta Renovasyon">
      <p>Bu web sitesine erişim ve kullanım, aşağıdaki şartları kabul ettiğiniz anlamına gelir.</p>
      <h2 className="font-heading text-base font-bold text-foreground">İçerik</h2>
      <p>Site içeriği bilgilendirme amaçlıdır. Hizmet bedeli, kapsamı ve koşulları işin değerlendirilmesi sonrası belirlenir; site içindeki ifadeler kesin fiyat veya garanti niteliği taşımaz.</p>
      <h2 className="font-heading text-base font-bold text-foreground">Kullanıcı Sorumluluğu</h2>
      <p>Formlar aracılığıyla ilettiğiniz bilgilerin doğruluğundan siz sorumlusunuz. Siteyi yasalara aykırı amaçlarla kullanmamayı kabul edersiniz.</p>
      <h2 className="font-heading text-base font-bold text-foreground">Telif Hakkı</h2>
      <p>Site içeriği ve görselleri Usta Renovasyon'a aittir; izinsiz kullanılamaz. Müşteri onayı alınmış görseller referans amaçlı yayınlanır.</p>
      <h2 className="font-heading text-base font-bold text-foreground">Değişiklikler</h2>
      <p>Şartlar gerekli durumlarda güncellenebilir. Güncel sürüm bu sayfada yayınlanır.</p>
    </LegalLayout>
  );
}