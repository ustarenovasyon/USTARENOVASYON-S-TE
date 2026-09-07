import React from "react";
import LegalLayout from "@/components/common/LegalLayout";
import { siteConfig } from "@/lib/siteConfig";

export default function Kvkk() {
  return (
    <LegalLayout title="KVKK Aydınlatma Metni" seoTitle="KVKK Aydınlatma Metni | Usta Renovasyon">
      <p>İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Usta Renovasyon tarafından kişisel verilerinizin işlenmesine ilişkin olarak hazırlanmıştır.</p>
      <h2 className="font-heading text-base font-bold text-foreground">Veri Sorumlusu</h2>
      <p>Verileriniz, Usta Renovasyon adına {siteConfig.founderName} ({siteConfig.principal}) tarafından işlenmektedir.</p>
      <h2 className="font-heading text-base font-bold text-foreground">İşlenen Kişisel Veriler</h2>
      <p>Ad-soyad, telefon numarası, e-posta adresi, iletişim tercihi, konum bilgisi, yapılacak işe ilişkin açıklama ve yüklediğiniz görsel/video kayıtları.</p>
      <h2 className="font-heading text-base font-bold text-foreground">İşleme Amaçları</h2>
      <p>İletişim, teklif ve keşif taleplerinizin değerlendirilmesi, hizmetin sunulması ve gerekli bilgilendirmenin yapılması.</p>
      <h2 className="font-heading text-base font-bold text-foreground">Aktarım</h2>
      <p>Kişisel verileriniz, açık rızanız bulunmadıkça üçüncü kişilere aktarılmaz; yalnızca hizmetin sunulması için zorunlu hallerde sınırlı şekilde paylaşılabilir.</p>
      <h2 className="font-heading text-base font-bold text-foreground">Saklama</h2>
      <p>Verileriniz, ilgili mevzuata ve ilişki süresine uygun olarak saklanır ve süre dolununda silinir veya anonimleştirilir.</p>
      <h2 className="font-heading text-base font-bold text-foreground">Haklarınız</h2>
      <p>KVKK m.11 kapsamında verilerinize erişme, düzeltme, silme ve işlemeye itiraz etme haklarına sahipsiniz. Talepleriniz için iletişime geçebilirsiniz: {siteConfig.phone.display}{siteConfig.email && `, ${siteConfig.email}`}.</p>
    </LegalLayout>
  );
}