import React from "react";
import LegalLayout from "@/components/common/LegalLayout";
import { siteConfig, getPhoneLink, getEmailLink } from "@/lib/siteConfig";

export default function Gizlilik() {
  return (
    <LegalLayout title="Gizlilik Politikası" seoTitle="Gizlilik Politikası | Usta Renovasyon">
      <p>Usta Renovasyon, web sitesi üzerinden paylaştığınız kişisel verilerin gizliliğini önemser. Bu politika, sitemiz üzerinden ilettiğiniz bilgilerin nasıl işlendiğini açıklar.</p>
      <h2 className="font-heading text-base font-bold text-foreground">İşlenen Veriler</h2>
      <p>İletişim, teklif ve keşif formları üzerinden ad, soyad, telefon, e-posta, konum ve yapılacak işe ilişkin açıklamalarınız ilettiğiniz fotoğraf ve video kayıtları işlenir.</p>
      <h2 className="font-heading text-base font-bold text-foreground">İşleme Amacı</h2>
      <p>Verileriniz yalnızca sizinle iletişim kurulması, hizmet talebinizin değerlendirilmesi ve teklif/keşif süreçlerinin yürütülmesi amacıyla işlenir.</p>
      <h2 className="font-heading text-base font-bold text-foreground">Üçüncü Kişilerle Paylaşım</h2>
      <p>İlgili veriler, hizmetin sunulması için zorunlu olmadıkça üçüncü kişilerle paylaşılmaz. Yüklediğiniz görseller izniniz olmadan referans amaçlı yayınlanmaz.</p>
      <h2 className="font-heading text-base font-bold text-foreground">İletişim</h2>
      <p>Verilerinizle ilgili talepleriniz için Özal Usta ile iletişime geçebilirsiniz. Telefon: <a href={getPhoneLink()} className="text-accent hover:underline">{siteConfig.phone.display}</a>{siteConfig.email && <> · E-posta: <a href={getEmailLink()} className="text-accent hover:underline">{siteConfig.email}</a></>}.</p>
    </LegalLayout>
  );
}