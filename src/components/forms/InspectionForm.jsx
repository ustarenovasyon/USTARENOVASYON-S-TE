import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Send, Loader2 } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import {
  izmirDistricts, formServices, preferredDaysOptions, contactTimes,
  validatePhone, normalizePhone, validateEmail, generateRequestNumber, mapContactMethod, mapPriority,
} from "@/lib/formConfig";
import { trackCta } from "@/lib/ctaTracking";
import PhotoUploader from "@/components/forms/PhotoUploader";
import FormSuccess from "@/components/forms/FormSuccess";

const inputCls = "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent";

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}{required && <span className="text-accent"> *</span>}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

// Ücretsiz keşif talep formu — tarih/saat tercihi, randevu kesinleşmez.
export default function InspectionForm() {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    service: params.get("hizmet") || "", district: "", neighborhood: "", description: "",
    preferred_date_1: "", preferred_date_2: "", preferred_time: "Fark etmez", preferred_days: "Fark etmez",
    contactMethod: "Telefon", contactTime: "Fark etmez", urgency: "normal",
    photos: [], kvkk: false, website: "",
  });

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const today = new Date().toISOString().split("T")[0];

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) return;
    const er = {};
    if (!form.name.trim() || form.name.trim().length < 2) er.name = "Lütfen adınızı girin.";
    if (!validatePhone(form.phone)) er.phone = "Lütfen geçerli bir telefon numarası girin.";
    if (form.email && !validateEmail(form.email)) er.email = "Geçerli bir e-posta adresi girin.";
    if (!form.district) er.district = "Lütfen ilçenizi seçin.";
    if (!form.kvkk) er.kvkk = "KVKK onayını işaretleyin.";
    if (form.preferred_date_1 && form.preferred_date_1 < today) er.preferred_date_1 = "Geçmiş bir tarih seçemezsiniz.";
    setErrors(er);
    if (Object.keys(er).length) return;

    const last = Number(localStorage.getItem("lastQuoteTs") || 0);
    if (Date.now() - last < 20000) {
      setErrors({ kvkk: "Kısa süre içinde birden fazla talep gönderdiniz. Lütfen birkaç dakika sonra yeniden deneyin." });
      return;
    }

    setStatus("submitting");
    const request_number = generateRequestNumber();
    const payload = {
      request_number,
      request_type: "ucretsiz_kesif",
      status: "yeni",
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      email: form.email.trim(),
      service: form.service,
      district: form.district,
      neighborhood: form.neighborhood.trim(),
      description: form.description.trim(),
      preferred_date_1: form.preferred_date_1,
      preferred_date_2: form.preferred_date_2,
      preferred_time: form.preferred_time,
      preferred_days: form.preferred_days,
      contact_preference: mapContactMethod(form.contactMethod),
      contact_method: form.contactMethod,
      contact_time: form.contactTime,
      urgency: form.urgency,
      priority: mapPriority(form.urgency),
      kvkk: form.kvkk,
      photo_urls: form.photos.map((p) => p.url),
      source_page: "ucretsiz-kesif",
      source_service: params.get("hizmet"),
      tags: form.photos.length ? ["Fotoğraf Var"] : [],
    };
    try {
      await siteStore.entities.QuoteRequest.create(payload);
      trackCta("inspection-form-submit");
      localStorage.setItem("lastQuoteTs", String(Date.now()));
      setResult({ request_number, service: form.service, district: form.district, contact_method: form.contactMethod });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrors({ kvkk: "Talebiniz gönderilemedi. İnternet bağlantınızı kontrol ederek yeniden deneyin." });
    }
  };

  if (status === "success" && result) {
    return (
      <>
        <FormSuccess request={result} />
        <p className="mx-auto mt-4 max-w-2xl rounded-lg border border-border bg-card p-4 text-center text-sm text-muted-foreground">
          Keşif talebiniz alınmıştır. Tarih ve saat bilgisi, Özal Usta tarafından sizinle iletişime geçilerek netleştirilecektir; randevu henüz kesinleşmemiştir.
        </p>
      </>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => upd("website", e.target.value)} className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ad Soyad" required error={errors.name}>
          <input value={form.name} onChange={(e) => upd("name", e.target.value)} className={inputCls} placeholder="Adınız Soyadınız" />
        </Field>
        <Field label="Telefon Numarası" required error={errors.phone}>
          <input type="tel" inputMode="tel" value={form.phone} onChange={(e) => upd("phone", e.target.value)} className={inputCls} placeholder="05xx xxx xx xx" />
        </Field>
        <Field label="E-posta (isteğe bağlı)" error={errors.email}>
          <input type="email" inputMode="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className={inputCls} placeholder="ornek@email.com" />
        </Field>
        <Field label="Hizmet">
          <select value={form.service} onChange={(e) => upd("service", e.target.value)} className={inputCls}>
            <option value="">Seçiniz…</option>
            {formServices.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="İlçe" required error={errors.district}>
          <select value={form.district} onChange={(e) => upd("district", e.target.value)} className={inputCls}>
            <option value="">Seçiniz…</option>
            {izmirDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Mahalle (isteğe bağlı)">
          <input value={form.neighborhood} onChange={(e) => upd("neighborhood", e.target.value)} className={inputCls} placeholder="Mahalleniz" />
        </Field>
      </div>

      <Field label="Yapılacak iş hakkında kısa açıklama">
        <textarea value={form.description} onChange={(e) => upd("description", e.target.value)} rows={3} maxLength={1500} className={`${inputCls} resize-none`} placeholder="Yapılacak işi kısaca anlatın…" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tercih edilen 1. gün" error={errors.preferred_date_1}>
          <input type="date" min={today} value={form.preferred_date_1} onChange={(e) => upd("preferred_date_1", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Tercih edilen 2. gün">
          <input type="date" min={today} value={form.preferred_date_2} onChange={(e) => upd("preferred_date_2", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Saat aralığı tercihi">
          <select value={form.preferred_time} onChange={(e) => upd("preferred_time", e.target.value)} className={inputCls}>
            {contactTimes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Gün tercihi">
          <select value={form.preferred_days} onChange={(e) => upd("preferred_days", e.target.value)} className={inputCls}>
            {preferredDaysOptions.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="İletişim tercihi">
          <select value={form.contactMethod} onChange={(e) => upd("contactMethod", e.target.value)} className={inputCls}>
            <option>Telefon</option>
            <option>WhatsApp</option>
            <option>E-posta</option>
            <option>Fark etmez</option>
          </select>
        </Field>
        <Field label="Uygun iletişim zamanı">
          <select value={form.contactTime} onChange={(e) => upd("contactTime", e.target.value)} className={inputCls}>
            {contactTimes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Fotoğraf Ekle (isteğe bağlı)">
        <PhotoUploader value={form.photos} onChange={(v) => upd("photos", v)} />
      </Field>

      <label className="flex items-start gap-2.5 text-sm text-foreground">
        <input type="checkbox" checked={form.kvkk} onChange={(e) => upd("kvkk", e.target.checked)} className="mt-1 h-4 w-4 rounded border-border accent-accent" />
        <span>İletişim bilgilerimin ve keşif talebim kapsamında paylaştığım verilerin işlenmesine ilişkin KVKK Aydınlatma Metni'ni okudum, kabul ediyorum. {errors.kvkk && <span className="text-destructive">{errors.kvkk}</span>}</span>
      </label>

      <button type="submit" disabled={status === "submitting"} className="btn-accent w-full sm:w-auto">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Talebiniz gönderiliyor…</>) : (<><Send className="h-4 w-4" /> Keşif Talebini Gönder</>)}
      </button>
      {status === "error" && <p className="text-sm text-destructive">Talebiniz gönderilemedi. İnternet bağlantınızı kontrol ederek yeniden deneyin.</p>}
    </form>
  );
}