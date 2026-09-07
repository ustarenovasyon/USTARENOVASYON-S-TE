import React from "react";
import LegalLayout from "@/components/common/LegalLayout";
import { siteConfig, getPhoneLink, getEmailLink } from "@/lib/siteConfig";

// Gizlilik Politikası — gerçek sistemlerle uyumlu, sürümlü.
export default function GizlilikPolitikasi() {
  return (
    <LegalLayout title="Gizlilik Politikası" seoTitle="Gizlilik Politikası | Usta Renovasyon">
      <p className="text-sm text-muted-foreground">Son güncelleme: 2 Ağustos 2026</p>

      <p>Usta Renovasyon, web sitesi üzerinden paylaştığınız kişisel verilerin gizliliğini önemser. Bu politika, sitemiz üzerinden ilettiğiniz bilgilerin nasıl işlendiğini açıklar. KVKK Aydınlatma Metni için <a href="/kvkk-aydinlatma-metni" className="text-accent hover:underline">buraya</a> bakabilirsiniz.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Toplanan Bilgiler</h2>
      <p>İletişim, teklif ve keşif formları üzerinden ad, soyad, telefon, e-posta, konum ve yapılacak işe ilişkin açıklamalarınız işlenir. Yüklediğiniz fotoğraf ve video kayıtları da talebinizle ilişkilendirilir.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Form Verileri</h2>
      <p>Form aracılığıyla ilettiğiniz bilgiler yalnızca hizmet talebinizin değerlendirilmesi ve sizinle iletişim kurulması amacıyla kullanılır. Zorunlu olmayan alanları doldurmayarak bilgi vermemeyi seçebilirsiniz.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Müşteri Fotoğraf ve Videoları</h2>
      <p>Talebinizle ilgili yüklediğiniz görseller, teklif ve keşif amacıyla işlenir. Bu görseller <strong>izniniz olmadan</strong> proje veya referans galerisinde yayınlanmaz. Fotoğraf yayın izni ayrı ve isteğe bağlıdır.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Çerezler</h2>
      <p>Site, temel işlevsellik için zorunlu çerezler kullanır. Analitik ve pazarlama çerezleri yalnızca açık tercihinizle etkinleşir. Ayrıntılı bilgi için <a href="/cerez-politikasi" className="text-accent hover:underline">Çerez Politikası</a> sayfasına bakabilirsiniz.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Analiz Araçları</h2>
      <p>Site, ziyaretçi davranışını anonim ölçmek amacıyla analitik araçlar (ör. Google Analytics) kullanabilir; ancak bu araçlar yalnızca analitik çerez izni verildiğinde çalışır. İzin verilmeden analitik veri toplanmaz.</p>

      <h2 className="font-heading text-base font-bold text-foreground">İletişim Kanalları</h2>
      <p>Sizinle telefon, WhatsApp ve e-posta yoluyla iletişim kurulur. İletişim tercihinizi form üzerinde belirtebilirsiniz.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Verilerin Korunması</h2>
      <p>Verileriniz yetkisiz erişime karşı korunmak üzere güvenli platform altyapısında saklanır. Yönetim paneline erişim rol tabanlıdır ve yalnızca yetkili kullanıcılarla sınırlıdır.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Veri Paylaşımı</h2>
      <p>Verileriniz, hizmetin sunulması için zorunlu olmadıkça üçüncü kişilerle paylaşılmaz. Pazarlama amacıyla liste veya veri satışı yapılmaz.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Saklama Süreleri</h2>
      <p>Verileriniz ticari ve hukuki gereklilikler ölçüsünde saklanır. Yasal saklama süresi dolan veriler silinir veya anonimleştirilir.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Kullanıcı Hakları</h2>
      <p>Verilerinize erişme, düzeltme, silme ve işlenmesine itiraz etme haklarına sahipsiniz. Talepleriniz için Özal Usta ile iletişime geçebilirsiniz.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Politika Güncellemeleri</h2>
      <p>Bu politika, site özelliklerindeki değişikliklere uygun olarak güncellenebilir. Önemli değişikliklerde çerez tercihiniz yeniden istenebilir.</p>

      <h2 className="font-heading text-base font-bold text-foreground">İletişim</h2>
      <p>Verilerinizle ilgili talepleriniz için Özal Usta ile iletişime geçebilirsiniz. Telefon: <a href={getPhoneLink()} className="text-accent hover:underline">{siteConfig.phone.display}</a>{siteConfig.email && <> · E-posta: <a href={getEmailLink()} className="text-accent hover:underline">{siteConfig.email}</a></>}.</p>

      <p className="text-xs text-muted-foreground">Politika sürümü: v1.0 — 02.08.2026</p>
    </LegalLayout>
  );
}