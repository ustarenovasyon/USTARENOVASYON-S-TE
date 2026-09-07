import React from "react";
import LegalLayout from "@/components/common/LegalLayout";

// Çerez Politikası — gerçek kullanılan kategorilerle, sürümümlü.
const COOKIE_VERSION = "v1.0 — 02.08.2026";

export default function CerezPolitikasi() {
  return (
    <LegalLayout title="Çerez Politikası" seoTitle="Çerez Politikası | Usta Renovasyon">
      <p className="text-sm text-muted-foreground">Son güncelleme: 2 Ağustos 2026</p>

      <p>Usta Renovasyon web sitesi, daha iyi bir kullanıcı deneyimi sunmak amacıyla çerezler (cookie) kullanır. Bu politika, hangi çerezlerin kullanıldığını ve bunları nasıl yönetebileceğinizi açıklar.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Çerez Kategorileri</h2>

      <div className="space-y-4">
        <CookieCat name="Zorunlu Çerezler" provider="Birinci taraf (Usta Renovasyon)" duration="Oturum süresince" canDisable={false}>
          Sitenin temel işlevleri için gereklidir. Form gönderimi, sayfa gezintisi ve güvenlik kontrolleri bu çerezlerle çalışır. Kapatılamaz.
        </CookieCat>

        <CookieCat name="İşlevsel Çerezler" provider="Birinci taraf" duration="30 gün" canDisable>
          Tercihlerinizi (ör. çerez seçimleri) hatırlamak için kullanılır. İsteğe bağlıdır; kapatırsanız site yine çalışır ancak tercihleriniz sonraki ziyarette yeniden sorulur.
        </CookieCat>

        <CookieCat name="Analitik Çerezler" provider="Üçüncü taraf (Google Analytics — etkinleştirilirse)" duration="14 ay" canDisable>
          Ziyaretçi davranışını anonim olarak ölçmek için kullanılır. Site performansını ve içerik kalitesini iyileştirmek amacıyla işlenir. Yalnızca açık izninizle çalışır.
        </CookieCat>

        <CookieCat name="Pazarlama Çerezleri" provider="Üçüncü taraf (etkinleştirilirse)" duration="180 gün" canDisable>
          Reklam ve yeniden pazarlama sistemleri için kullanılır. Bu site şu anda aktif bir pazarlama çerezi kullanmamaktadır; etkinleştirilirse burada belirtilecektir. Yalnızca açık izninizle çalışır.
        </CookieCat>
      </div>

      <h2 className="font-heading text-base font-bold text-foreground">Çerez Tercihlerinizi Yönetin</h2>
      <p>İlk ziyaretinizde bir çerez bildirimi gösterilir. "Tümünü Kabul Et", "Zorunlu Olanlarla Devam Et" veya "Tercihleri Yönet" seçeneklerinden birini seçebilirsiniz. Tercihlerinizi daha sonra Footer'daki <strong>Çerez Tercihleri</strong> bağlantısından değiştirebilirsiniz.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Tarayıcı Ayarları</h2>
      <p>Tarayıcınızın ayarlarından çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz. Zorunlu olmayan çerezleri devre dışı bırakmak bazı işlevleri etkileyebilir ancak site temel kullanımını bozmaz.</p>

      <h2 className="font-heading text-base font-bold text-foreground">Üçüncü Taraflar</h2>
      <p>Analitik veya pazarlama çerezleri etkinleştirilirse, ilgili sağlayıcıların (Google gibi) kendi gizlilik politikaları geçerli olur. Bu sağlayıcılara aktarılan veriler anonim ölçüm amaçlıdır.</p>

      <p className="text-xs text-muted-foreground">Politika sürümü: {COOKIE_VERSION}</p>
    </LegalLayout>
  );
}

function CookieCat({ name, provider, duration, canDisable, children }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-foreground">{name}</h3>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${canDisable ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`}>
          {canDisable ? "Kapatılabilir" : "Her zaman aktif"}
        </span>
      </div>
      <p className="mt-2 text-sm">{children}</p>
      <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground sm:grid-cols-3">
        <div><dt className="font-semibold text-foreground">Sağlayıcı</dt><dd>{provider}</dd></div>
        <div><dt className="font-semibold text-foreground">Süre</dt><dd>{duration}</dd></div>
      </dl>
    </div>
  );
}