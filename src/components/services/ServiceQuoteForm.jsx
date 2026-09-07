import React, { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { serviceCategories } from "@/lib/servicesData";
import { trackCta } from "@/lib/ctaTracking";

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

// Hizmete özel kısa teklif formu — hizmet adı önceden seçili.
export default function ServiceQuoteForm({ serviceName }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: serviceName || "",
    district: "",
    notes: "",
    contact: "telefon",
    kvkk: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Adınızı girin.";
    if (!form.phone.trim()) errs.phone = "Telefon numaranızı girin.";
    if (!form.kvkk) errs.kvkk = "KVKK onayı gerekli.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("submitting");
    try {
      await siteStore.entities.QuoteRequest.create({
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service,
        district: form.district.trim(),
        notes: form.notes.trim(),
        contact_preference: form.contact,
      });
      trackCta("service-form-submit");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
        <h3 className="mt-3 font-heading text-lg font-bold">WhatsApp mesajınız hazırlandı</h3>
        <p className="mt-1 text-sm text-muted-foreground">Açılan WhatsApp ekranındaki mesajı gönderdiğinizde talebiniz Özal Usta’ya ulaşır.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Ad Soyad <span className="text-accent">*</span></label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="Adınız Soyadınız" />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Telefon <span className="text-accent">*</span></label>
          <input type="tel" inputMode="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="05xx xxx xx xx" />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Hizmet</label>
          <select value={form.service} onChange={(e) => update("service", e.target.value)} className={inputCls}>
            <option value="">Seçiniz…</option>
            {serviceCategories.map((c) => (
              <option key={c.key} value={c.short}>{c.short}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">İlçe</label>
          <input value={form.district} onChange={(e) => update("district", e.target.value)} className={inputCls} placeholder="Örn. Bornova" />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-foreground">Yapılacak İş</label>
        <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className={`${inputCls} resize-none`} placeholder="Yapılacak işi kısaca anlatın…" />
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-foreground">İletişim Tercihi</label>
        <select value={form.contact} onChange={(e) => update("contact", e.target.value)} className={inputCls}>
          <option value="telefon">Telefon ile arayın</option>
          <option value="whatsapp">WhatsApp'tan yazın</option>
        </select>
      </div>
      <label className="mt-4 flex items-start gap-2.5 text-sm text-muted-foreground">
        <input type="checkbox" checked={form.kvkk} onChange={(e) => update("kvkk", e.target.checked)} className="mt-1 h-4 w-4 rounded border-border accent-accent" />
        <span>KVKK aydınlatma metnini okudum, bilgilerimin iletişim amacıyla işlenmesini onaylıyorum. {errors.kvkk && <span className="text-destructive">{errors.kvkk}</span>}</span>
      </label>
      <button type="submit" disabled={status === "submitting"} className="btn-accent mt-5 w-full sm:w-auto">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Gönderiliyor…</>) : (<><Send className="h-4 w-4" /> Teklif Talebini Gönder</>)}
      </button>
      {status === "error" && <p className="mt-3 text-sm text-destructive">Talebiniz gönderilemedi. Lütfen tekrar deneyin veya WhatsApp'tan yazın.</p>}
    </form>
  );
}