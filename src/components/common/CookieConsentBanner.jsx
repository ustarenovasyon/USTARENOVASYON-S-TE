import React, { useEffect, useState } from "react";
import { Cookie, Settings, Check, X } from "lucide-react";
import { needsConsent, acceptAll, acceptRequired, setConsent, COOKIE_CATEGORIES } from "@/lib/cookieConsent";

// Çerez bildirimi — ilk ziyarette görünür. Üç seçenek: Tümünü Kabul / Zorunlu / Tercihleri Yönet.
export default function CookieConsentBanner() {
  const [show, setShow] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [choices, setChoices] = useState({ zorunlu: true, islevsel: false, analitik: false, pazarlama: false });

  useEffect(() => {
    if (needsConsent()) setShow(true);
    const onNav = (e) => { if (e.detail) { setShow(true); setPrefs(true); } };
    window.addEventListener("open-cookie-preferences", onNav);
    return () => window.removeEventListener("open-cookie-preferences", onNav);
  }, []);

  const close = () => { setShow(false); setPrefs(false); };
  const onAcceptAll = () => { acceptAll(); close(); };
  const onRequired = () => { acceptRequired(); close(); };
  const onPrefs = () => setPrefs(true);
  const savePrefs = () => { setConsent(choices); close(); };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-2xl">
        {!prefs ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-start gap-3">
              <Cookie className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
              <div>
                <h2 className="font-heading text-sm font-bold text-foreground">Çerez Tercihi</h2>
                <p className="mt-1 text-sm text-muted-foreground">Site deneyimini iyileştirmek için çerez kullanıyoruz. Zorunlu çerezler site için gereklidir; analitik ve pazarlama çerezleri yalnızca izninizle çalışır.</p>
                <p className="mt-1 text-xs text-muted-foreground">Detaylı bilgi: <a href="/cerez-politikasi" className="text-accent hover:underline">Çerez Politikası</a></p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button onClick={onPrefs} className="btn-outline justify-center text-xs"><Settings className="h-3.5 w-3.5" /> Tercihleri Yönet</button>
              <button onClick={onRequired} className="btn-outline justify-center text-xs">Zorunlu Olanlarla Devam Et</button>
              <button onClick={onAcceptAll} className="btn-accent justify-center text-xs"><Check className="h-3.5 w-3.5" /> Tümünü Kabul Et</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-sm font-bold text-foreground">Çerez Tercihleri</h2>
              <button onClick={close} className="rounded-lg p-1.5 hover:bg-slate-100"><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-2">
              {COOKIE_CATEGORIES.map((c) => (
                <label key={c.id} className={`flex items-start gap-3 rounded-lg border border-border p-3 ${c.required ? "bg-slate-50" : ""}`}>
                  <input
                    type="checkbox"
                    checked={choices[c.id]}
                    disabled={c.required}
                    onChange={(e) => setChoices((p) => ({ ...p, [c.id]: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 accent-accent"
                  />
                  <div>
                    <p className="text-sm font-semibold">{c.label} {c.required && <span className="text-xs text-muted-foreground">(her zaman aktif)</span>}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={savePrefs} className="btn-navy justify-center text-xs">Seçimlerimi Kaydet</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Footer'daki "Çerez Tercihleri" bağlantısından açmak için yardımcı.
export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent("open-cookie-preferences", { detail: true }));
}