import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Send, Loader2 } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import {
  izmirDistricts, formServices, areaTypes, areaUsages, issueOptions,
  contactMethods, contactTimes, preferredDaysOptions, urgencyOptions,
  validatePhone, normalizePhone, validateEmail, generateRequestNumber, mapContactMethod, mapPriority,
} from "@/lib/formConfig";
import { trackCta } from "@/lib/ctaTracking";
import { sanitizeText, logError } from "@/lib/security";
import PhotoUploader from "@/components/forms/PhotoUploader";
import FormSuccess from "@/components/forms/FormSuccess";

const CONSENT_VERSION = "v1.0";

const inputCls = "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent";
const steps = ["İletişim", "Hizmet", "Konum", "İş Detayı", "Fotoğraf", "İletişim & Zaman", "Kontrol"];

function CheckGroup({ options, value, onChange }) {
  const toggle = (v) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => toggle(o)}
          className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
            value.includes(o) ? "border-accent bg-accent/10 text-accent" : "border-border bg-card hover:border-accent/50"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}{required && <span className="text-accent"> *</span>}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

// Ayrıntılı teklif formu — 7 adım, fotoğraf yükleme, doğrulama, talep numarası.
export default function DetailedQuoteForm() {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const presetService = params.get("hizmet") || "";
  const presetProject = params.get("proje") || "";

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    services: presetService ? [presetService] : [], serviceOther: "",
    district: "", neighborhood: "", address: "",
    areaTypes: [], areaUsage: "", approxSize: "", roomCount: "", floorCount: "", dontKnowSize: false,
    issues: [], description: "",
    photos: [], videoUrl: "",
    contactMethod: "WhatsApp", contactTime: "Fark etmez", preferredDays: "Fark etmez", urgency: "normal",
    kvkk: false, marketing: false, photoConsent: false,
    website: "", // honeypot
  });

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep = (i) => {
    const e = {};
    if (i === 0) {
      if (!form.name.trim() || form.name.trim().length < 2) e.name = "Lütfen adınızı girin.";
      if (!validatePhone(form.phone)) e.phone = "Lütfen geçerli bir telefon numarası girin.";
      if (form.email && !validateEmail(form.email)) e.email = "Geçerli bir e-posta adresi girin.";
    }
    if (i === 1) {
      if (form.services.length === 0 && !form.serviceOther.trim()) e.services = "En az bir hizmet seçin.";
    }
    if (i === 2) {
      if (!form.district) e.district = "Lütfen ilçenizi seçin.";
    }
    if (i === 3) {
      if (!form.description.trim() || form.description.trim().length < 10) e.description = "Yapılacak işi kısaca açıklayın (en az 10 karakter).";
    }
    if (i === 6) {
      if (!form.kvkk) e.kvkk = "KVKK Aydınlatma Metni onayını işaretleyin.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep((s) => Math.min(s + 1, steps.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!validateStep(6)) return;
    if (form.website) return; // honeypot
    const last = Number(localStorage.getItem("lastQuoteTs") || 0);
    if (Date.now() - last < 20000) {
      setErrors({ kvkk: "Kısa süre içinde birden fazla talep gönderdiniz. Lütfen birkaç dakika sonra yeniden deneyin." });
      return;
    }
    setStatus("submitting");
    const request_number = generateRequestNumber();
    const serviceStr = [...form.services, form.serviceOther].filter(Boolean).join(", ");
    const payload = {
      request_number,
      request_type: "ayrintili_teklif",
      status: "yeni",
      name: sanitizeText(form.name.trim()),
      phone: normalizePhone(form.phone),
      email: form.email.trim(),
      service: sanitizeText(serviceStr),
      district: form.district,
      neighborhood: sanitizeText(form.neighborhood.trim()),
      address: sanitizeText(form.address.trim()),
      area_types: form.areaTypes,
      area_usage: form.areaUsage,
      approx_size: form.approxSize,
      room_count: form.roomCount,
      floor_count: form.floorCount,
      dont_know_size: form.dontKnowSize,
      issues: form.issues,
      description: sanitizeText(form.description.trim()),
      photo_urls: form.photos.map((p) => p.url),
      video_url: form.videoUrl.trim(),
      contact_preference: mapContactMethod(form.contactMethod),
      contact_method: form.contactMethod,
      contact_time: form.contactTime,
      preferred_days: form.preferredDays,
      urgency: form.urgency,
      priority: mapPriority(form.urgency),
      kvkk: form.kvkk,
      marketing_consent: form.marketing,
      photo_consent: form.photoConsent,
      source_page: "teklif-al",
      source_service: presetService,
      source_project: presetProject,
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
      referer: typeof document !== "undefined" ? document.referrer : "",
      tags: form.photos.length ? ["Fotoğraf Var"] : [],
    };
    try {
      await siteStore.entities.QuoteRequest.create(payload);
      // İzin kayıtları — sürüm bilgisiyle. Pazarlama ve fotoğraf izni ayrı, isteğe bağlı.
      try {
        const consents = [{ consent_type: "kvkk", version: CONSENT_VERSION, form_source: "teklif-al", granted: true }];
        if (form.marketing) consents.push({ consent_type: "marketing", version: CONSENT_VERSION, form_source: "teklif-al", granted: true });
        if (form.photoConsent) consents.push({ consent_type: "photo_publish", version: CONSENT_VERSION, form_source: "teklif-al", granted: true });
        await siteStore.entities.ConsentRecord.bulkCreate(consents);
      } catch { /* izin kaydı başarısızsa ana talep yine de kayıtlı */ }
      trackCta("detailed-form-submit");
      localStorage.setItem("lastQuoteTs", String(Date.now()));
      setResult({ request_number, service: serviceStr, district: form.district, contact_method: form.contactMethod });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      logError("form", "Ayrıntılı teklif formu gönderim hatası", { module: "teklif-al", severity: "hata" });
      setErrors({ kvkk: "Talebiniz şu anda gönderilemedi. Bilgileriniz korunuyor. Yeniden deneyebilir veya Özal Usta'ya WhatsApp üzerinden ulaşabilirsiniz." });
    }
  };

  if (status === "success" && result) return <FormSuccess request={result} />;

  return (
    <div>
      {/* Honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => upd("website", e.target.value)} className="hidden" aria-hidden="true" />

      {/* Adım göstergesi */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <button key={s} type="button" onClick={() => i < step && setStep(i)} className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${i === step ? "text-accent" : i < step ? "text-primary" : "text-muted-foreground"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${i === step ? "bg-accent text-primary" : i < step ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {step === 0 && (
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
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <Field label="Hizmet Seçimi (birden fazla seçebilirsiniz)" required error={errors.services}>
              <CheckGroup options={formServices} value={form.services.filter((s) => s !== "Diğer")} onChange={(v) => upd("services", v)} />
            </Field>
            {form.services.includes("Diğer") && (
              <Field label="İhtiyacınızı kısaca açıklayın">
                <input value={form.serviceOther} onChange={(e) => upd("serviceOther", e.target.value)} className={inputCls} placeholder="Örn. merdiven trabzan boyama" />
              </Field>
            )}
            {presetProject && <p className="rounded-lg bg-accent/10 px-3 py-2 text-sm text-accent">Benzer bir çalışma talep ediyorum (Kaynak proje: {presetProject})</p>}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="İl" >
              <input value="İzmir" disabled className={`${inputCls} bg-muted text-muted-foreground`} />
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
            <Field label="Açık adres (isteğe bağlı — yalnızca yönetici görür)">
              <input value={form.address} onChange={(e) => upd("address", e.target.value)} className={inputCls} placeholder="Sokak, kapı no (paylaşmak isterseniz)" />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Field label="Alan Türü (birden fazla seçebilirsiniz)">
              <CheckGroup options={areaTypes} value={form.areaTypes} onChange={(v) => upd("areaTypes", v)} />
            </Field>
            <Field label="Alanın Kullanım Durumu">
              <select value={form.areaUsage} onChange={(e) => upd("areaUsage", e.target.value)} className={inputCls}>
                <option value="">Seçiniz…</option>
                {areaUsages.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Yaklaşık m²">
                <input value={form.approxSize} onChange={(e) => upd("approxSize", e.target.value)} className={inputCls} placeholder="Örn. 80" disabled={form.dontKnowSize} />
              </Field>
              <Field label="Oda Sayısı">
                <input value={form.roomCount} onChange={(e) => upd("roomCount", e.target.value)} className={inputCls} placeholder="Örn. 3" disabled={form.dontKnowSize} />
              </Field>
              <Field label="Kat Sayısı">
                <input value={form.floorCount} onChange={(e) => upd("floorCount", e.target.value)} className={inputCls} placeholder="Örn. 2" disabled={form.dontKnowSize} />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" checked={form.dontKnowSize} onChange={(e) => upd("dontKnowSize", e.target.checked)} className="h-4 w-4 rounded border-border accent-accent" /> Ölçüyü bilmiyorum
            </label>
            <Field label="Mevcut Sorunlar (isteğe bağlı)">
              <CheckGroup options={issueOptions} value={form.issues} onChange={(v) => upd("issues", v)} />
            </Field>
            <Field label="Yapılacak işi ve mevcut durumu açıklayın" required error={errors.description}>
              <textarea value={form.description} onChange={(e) => upd("description", e.target.value)} rows={4} maxLength={1500} className={`${inputCls} resize-none`} placeholder="Örnek: Salonda duvarlarda çatlaklar ve eski boya bulunuyor. Alçı tamiri yapıldıktan sonra iç cephe boya yaptırmak istiyorum." />
            </Field>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Field label="Fotoğraf Ekle (isteğe bağlı)">
              <PhotoUploader value={form.photos} onChange={(v) => upd("photos", v)} />
            </Field>
            <Field label="Video bağlantısı (isteğe bağlı)">
              <input value={form.videoUrl} onChange={(e) => upd("videoUrl", e.target.value)} className={inputCls} placeholder="YouTube / Vimeo bağlantısı" />
            </Field>
          </div>
        )}

        {step === 5 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="İletişim Tercihi">
              <select value={form.contactMethod} onChange={(e) => upd("contactMethod", e.target.value)} className={inputCls}>
                {contactMethods.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
            <Field label="Uygun İletişim Zamanı">
              <select value={form.contactTime} onChange={(e) => upd("contactTime", e.target.value)} className={inputCls}>
                {contactTimes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Tercih Edilen Günler">
              <select value={form.preferredDays} onChange={(e) => upd("preferredDays", e.target.value)} className={inputCls}>
                {preferredDaysOptions.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Aciliyet">
              <select value={form.urgency} onChange={(e) => upd("urgency", e.target.value)} className={inputCls}>
                {urgencyOptions.map((u) => <option key={u.key} value={u.key}>{u.label}</option>)}
              </select>
            </Field>
            <p className="text-xs text-muted-foreground sm:col-span-2">Belirttiğiniz zaman aralığı iletişim tercihiniz olarak kaydedilecektir; kesin arama garantisi oluşturmaz.</p>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 text-sm">
              <h3 className="font-heading font-bold">Bilgi Özeti</h3>
              <dl className="mt-2 grid gap-1.5 sm:grid-cols-2">
                <div><span className="text-muted-foreground">Ad Soyad:</span> {form.name}</div>
                <div><span className="text-muted-foreground">Telefon:</span> {form.phone}</div>
                <div><span className="text-muted-foreground">Hizmet:</span> {[...form.services, form.serviceOther].filter(Boolean).join(", ") || "-"}</div>
                <div><span className="text-muted-foreground">İlçe:</span> {form.district || "-"}</div>
                <div><span className="text-muted-foreground">İletişim:</span> {form.contactMethod} · {form.contactTime}</div>
                <div><span className="text-muted-foreground">Fotoğraf:</span> {form.photos.length} görsel</div>
              </dl>
            </div>
            <label className="flex items-start gap-2.5 text-sm text-foreground">
              <input type="checkbox" checked={form.kvkk} onChange={(e) => upd("kvkk", e.target.checked)} className="mt-1 h-4 w-4 rounded border-border accent-accent" />
              <span>İletişim bilgilerimin ve talebim kapsamında paylaştığım verilerin, tarafımla iletişim kurulması ve hizmet talebimin değerlendirilmesi amacıyla işlenmesine ilişkin <a href="/kvkk-aydinlatma-metni" target="_blank" className="text-accent hover:underline">KVKK Aydınlatma Metni</a>'ni okudum, kabul ediyorum. {errors.kvkk && <span className="text-destructive">{errors.kvkk}</span>}</span>
            </label>
            <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <input type="checkbox" checked={form.marketing} onChange={(e) => upd("marketing", e.target.checked)} className="mt-1 h-4 w-4 rounded border-border accent-accent" />
              <span>Kampanya, bilgilendirme ve hizmet duyurlarının tarafıma gönderilmesini kabul ediyorum. (isteğe bağlı)</span>
            </label>
            <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <input type="checkbox" checked={form.photoConsent} onChange={(e) => upd("photoConsent", e.target.checked)} className="mt-1 h-4 w-4 rounded border-border accent-accent" />
              <span>Yüklediğim görsellerin kişisel bilgiler gizlenerek Usta Renovasyon referans çalışmalarında kullanılmasına izin veriyorum. (isteğe bağlı)</span>
            </label>
          </div>
        )}
      </div>

      {/* Navigasyon */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn-outline"><ChevronLeft className="h-4 w-4" /> Geri</button>
        ) : <span />}
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="btn-accent">İleri <ChevronRight className="h-4 w-4" /></button>
        ) : (
          <button type="button" onClick={submit} disabled={status === "submitting"} className="btn-accent">
            {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Talebiniz gönderiliyor…</>) : (<><Send className="h-4 w-4" /> Teklif Talebini Gönder</>)}
          </button>
        )}
      </div>
      {status === "error" && <p className="mt-3 text-sm text-destructive">Talebiniz gönderilemedi. İnternet bağlantınızı kontrol ederek yeniden deneyin.</p>}
    </div>
  );
}