import React from "react";
import LegalLayout from "@/components/common/LegalLayout";
import { siteConfig, getPhoneLink, getEmailLink } from "@/lib/siteConfig";

// KVKK Aydınlatma Metni — gerçek iş modeline uygun, sürümlü, düzenlenebilir altyapı.
export default function KvkkAydinlatma() {
  return (
    <LegalLayout title="KVKK Aydınlatma Metni" seoTitle="KVKK Aydınlatma Metni | Usta Renovasyon">
      <p className="text-sm text-muted-foreground">Son güncelleme: 2 Ağustos 2026</p>

      <h2 className="font-heading text-base font-bold text-foreground">1. Veri Sorumlusu</h2>
      <p>Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla <strong>Usta Renovasyon</strong> (Yetkili: Özal Şahin) tarafından hazırlanmıştır.</p>

      <h2 className="font-heading text-base font-bold text-foreground">2. İşlenen Kişisel Veriler</h2>
      <p>Hizmet talebi, teklif ve keşif süreçlerinin yürütülmesi amacıyla aşağıdaki kişisel verileriniz işlenmektedir:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Ad, soyad</li>
        <li>Telefon numarası</li>
        <li>E-posta adresi (sunduğunuz takdirde)</li>
        <li>İlçe ve mahalle bilgisi (açık adres yalnızca gerekli olduğunda ve sizin paylaştığınız ölçüde)</li>
        <li>Hizmet talebinize ilişkin açıklamalar</li>
        <li>Talebinizle ilgili yüklediğiniz fotoğraf ve video kayıtları</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-foreground">3. İşleme Amaçları</h2>
      <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Hizmet talebinizin alınması ve değerlendirilmesi</li>
        <li>İletişim kurulması (telefon, WhatsApp, e-posta)</li>
        <li>Ücretsiz keşif organizasyonu</li>
        <li>Fiyat teklifinin hazırlanması ve sunulması</li>
        <li>İş süreçlerinin takibi ve kayıt altına alınması</li>
        <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-foreground">4. Verilerin Toplanma Yöntemi</h2>
      <p>Veriler, web sitesi üzerinden doldurduğunuz formlar (hızlı teklif, ayrıntılı teklif, ücretsiz keşif, iletişim), telefon ve WhatsApp üzerinden yaptığınız görüşmeler ve keşif sırasındaki tespitler aracılığıyla elde edilmektedir.</p>

      <h2 className="font-heading text-base font-bold text-foreground">5. Hukuki İşleme Sebepleri</h2>
      <p>Verileriniz; KVKK 5/2 maddesi kapsamında <em>sözleşmenin kurulması ve ifası</em>, <em>meşru menfaat</em> ve <em>açık rızanız</em> hukuki sebeplerine dayanılarak işlenmektedir.</p>

      <h2 className="font-heading text-base font-bold text-foreground">6. Verilerin Paylaşımı</h2>
      <p>Kişisel verileriniz, hizmetin sunulması için zorunlu olduğunda ve yalnızca bu amaçla, ilgili iş birlikçilerle (ör. keşif sırasında yardımcı personel) paylaşılabilir. Verileriniz hiçbir şekilde pazarlama amaçlı üçüncü taraflara satılmaz veya devredilmez.</p>

      <h2 className="font-heading text-base font-bold text-foreground">7. Saklama Süreleri</h2>
      <p>Verileriniz, ticari ve hukuki gereklilikler ölçüsünde saklanır. Tamamlanan işlere ilişkin kayıtlar yasal saklama yükümlülükleri doğrultusunda belirli süre tutulur; bu süre dolduğunda silinir veya anonimleştirilir.</p>

      <h2 className="font-heading text-base font-bold text-foreground">8. İlgili Kişinin Hakları</h2>
      <p>KVKK 11. madde kapsamında aşağıdaki haklara sahipsiniz:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
        <li>Silinmesini veya yok edilmesini isteme</li>
        <li>Aktarıldığı üçüncü kişilerin bilgilendirilmesini isteme</li>
        <li>İşlenmesine itiraz etme</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-foreground">9. Veri Taleplerinin İletimi</h2>
      <p>Haklarınızı kullanmak için taleplerinizi telefon, WhatsApp veya e-posta yoluyla iletebilirsiniz. Talebiniz güvenli kimlik doğrulama sürecinden sonra işleme alınacaktır.</p>

      <h2 className="font-heading text-base font-bold text-foreground">10. İletişim</h2>
      <p>Veri sorumlusu: Usta Renovasyon — Özal Şahin. Telefon: <a href={getPhoneLink()} className="text-accent hover:underline">{siteConfig.phone.display}</a>{siteConfig.email && <> · E-posta: <a href={getEmailLink()} className="text-accent hover:underline">{siteConfig.email}</a></>} · Bölge: Bornova / İzmir.</p>

      <p className="text-xs text-muted-foreground">Metin sürümü: v1.0 — 02.08.2026. Bu metin yetkili bir hukuk uzmanı tarafından kontrol edilebilir.</p>
    </LegalLayout>
  );
}