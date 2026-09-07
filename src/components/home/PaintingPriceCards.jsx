import React, { useEffect, useState } from "react";
import { Home, MessageCircle, ClipboardCheck, Phone, Check, ChevronDown } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { getPhoneLink, getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import { PAINTING_PLANS, PAINTING_INCLUDED } from "@/lib/paintingPrices";

// Ana sayfa hero üstü — kompakt daire boyama fiyat kutuları.
// Fiyat verisi merkezi kaynaktan (paintingPrices.js) gelir; asistanla senkron.
// Kart görünürlüğü PaintingPlanVisibility entity'sinden dinamik okunur.
// Kapalı kartlar render edilmez; grid otomatik kalan kartları yayarak boşluk kapatır.
const INCLUDED = PAINTING_INCLUDED;

export default function PaintingPriceCards() {
  const [active, setActive] = useState(null);
  const [hidden, setHidden] = useState({});

  useEffect(() => {
    let a = true;
    siteStore.entities.PaintingPlanVisibility.filter({}, "order", 10)
      .then((rows) => {
        if (!a) return;
        const map = {};
        rows.forEach((r) => {
          if (r.visible === false) map[r.plan_type] = true;
        });
        setHidden(map);
      })
      .catch(() => {});
    return () => { a = false; };
  }, []);

  const visiblePlans = PAINTING_PLANS.filter((p) => !hidden[p.type]);
  const colCount = visiblePlans.length;

  const open = (i) => setActive((cur) => (cur === i ? null : i));

  // Grid sütun sayısını görünür kart sayısına göre ayarla —
  // kapalı kart kalırsa grid daralıp boşluk kapanır.
  const colsClass =
    colCount <= 1 ? "grid-cols-1" :
    colCount === 2 ? "grid-cols-2" :
    colCount === 3 ? "grid-cols-3" :
    "grid-cols-4";

  return (
    <div className="w-full">
      {visiblePlans.length > 0 ? (
        <div className={`grid ${colsClass} gap-1 sm:gap-1.5`}>
          {visiblePlans.map((p, i) => {
            const isOpen = active === i;
            return (
              <button
                key={p.type}
                type="button"
                onClick={() => open(i)}
                data-cta={`painting-price-${p.type}`}
                className={`group relative flex flex-col rounded-lg border bg-card p-1.5 text-left shadow-sm transition-all sm:p-2 ${
                  isOpen
                    ? "border-accent ring-2 ring-accent/30"
                    : "border-border hover:border-accent/50 hover:shadow-md"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded bg-primary text-white sm:h-6 sm:w-6">
                  <Home className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </span>
                <span className="mt-1 font-heading text-[11px] font-extrabold leading-tight text-red-600 sm:text-sm">
                  {p.title}
                </span>
                <span className="mt-1.5 font-heading text-base font-extrabold leading-none text-green-600 sm:text-lg">
                  {p.price}
                </span>
                <span className="mt-1.5 flex items-center gap-0.5 text-[8px] font-semibold text-primary sm:text-[10px]">
                  Detay
                  <ChevronDown className={`h-2.5 w-2.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Detay paneli */}
      {active !== null && visiblePlans[active] && (
        <div className="mt-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
          {(() => {
            const p = visiblePlans[active];
            return (
              <div>
                <h3 className="font-heading text-base font-bold text-foreground sm:text-lg">
                  {p.title} Fiyatına Neler Dahil?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Belirtilen fiyat <strong className="text-foreground">yaklaşık boyama fiyatıdır</strong>.
                  Fiyata dahil olan hizmetler:
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {INCLUDED.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> {it}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 space-y-2">
                  <p className="rounded-lg bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">Büyük tamiratlar:</strong> Büyük alçı, sıva ve kapsamlı
                    tadilat işlemleri fiyata dahil değildir, ayrıca değerlendirilir.
                  </p>
                </div>

                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  Belirtilen fiyat işçilik fiyatıdır.
                </p>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  Net fiyat için ücretsiz keşif talep edin.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <a
                    href="#teklif-al"
                    data-cta={`price-detail-quote-${p.type}`}
                    onClick={() => trackCta(`price-detail-quote-${p.type}`)}
                    className="btn-accent w-full sm:w-auto"
                  >
                    <ClipboardCheck className="h-4 w-4" /> Ücretsiz Keşif
                  </a>
                  <a
                    href={getWhatsAppLink(p.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={`price-detail-whatsapp-${p.type}`}
                    onClick={() => trackCta(`price-detail-whatsapp-${p.type}`)}
                    className="btn-navy w-full sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp'tan Sor
                  </a>
                  <a
                    href={getPhoneLink()}
                    data-cta={`price-detail-call-${p.type}`}
                    onClick={() => trackCta(`price-detail-call-${p.type}`)}
                    className="btn-outline w-full sm:w-auto"
                  >
                    <Phone className="h-4 w-4" /> Hemen Ara
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}