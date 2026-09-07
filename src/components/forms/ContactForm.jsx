import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import {
  validatePhone, normalizePhone, validateEmail, generateRequestNumber, mapContactMethod,
} from "@/lib/formConfig";
import { trackCta } from "@/lib/ctaTracking";
import FormSuccess from "@/components/forms/FormSuccess";

const inputCls = "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent";
const subjects = ["Hizmet Bilgisi", "Fiyat Teklifi", "Ücretsiz Keşif", "Randevu", "Mevcut Talep Hakkında", "Şikâyet veya Görüş", "Diğer"];

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}{required && <span className="text-accent"> *</span>}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

// İletişim sayfası kısa formu — Part 7 talep sistemine (request_type: iletisim) kaydeder.
export default function ContactForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", subject: "Hizmet Bilgisi", message: "", contactMethod: "Telefon", kvkk: false, website: "",
  });
  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) return;
    const er = {};
    if (!form.name.trim() || form.name.trim().length < 2) er.name = "Lütfen adınızı girin.";
    if (!validatePhone(form.phone)) er.phone = "Lütfen geçerli bir telefon numarası girin.";
    if (form.email && !validateEmail(form.email)) er.email = "Geçerli bir e-posta adresi girin.";
    if (!form.message.trim() || form.message.trim().length < 5) er.message = "Lütfen kısa bir mesaj yazın.";
    if (!form.kvkk) er.kvkk = "KVKK onayını işaretleyin.";
    setErrors(er);
    if (Object.keys(er).length) return;

    const last = Number(localStorage.getItem("lastQuoteTs") || 0);
    if (Date.now() - last < 20000) {
      setErrors({ kvkk: "Kısa süre içinde birden fazla talep gönderdiniz. Lütfen birkaç dakika sonra yeniden deneyin." });
      return;
    }

    setStatus("submitting");
    const request_number = generateRequestNumber();
    try {
      await siteStore.entities.QuoteRequest.create({
        request_number,
        request_type: "iletisim",
        status: "yeni",
        name: form.name.trim(),
        phone: normalizePhone(form.phone),
        email: form.email.trim(),
        service: form.subject,
        description: form.message.trim(),
        contact_preference: mapContactMethod(form.contactMethod),
        contact_method: form.contactMethod,
        kvkk: form.kvkk,
        source_page: "iletisim",
        priority: "normal",
      });
      trackCta("contact-form-submit");
      localStorage.setItem("lastQuoteTs", String(Date.now()));
      setResult({ request_number, service: form.subject, contact_method: form.contactMethod });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrors({ kvkk: "Mesajınız gönderilemedi. İnternet bağlantınızı kontrol ederek yeniden deneyin." });
    }
  };

  if (status === "success" && result) return <FormSuccess request={result} />;

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => upd("website", e.target.value)} className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ad Soyad" required error={errors.name}>
          <input value={form.name} onChange={(e) => upd("name", e.target.value)} className={inputCls} placeholder="Adınız Soyadınız" />
        </Field>
        <Field label="Telefon" required error={errors.phone}>
          <input type="tel" inputMode="tel" value={form.phone} onChange={(e) => upd("phone", e.target.value)} className={inputCls} placeholder="05xx xxx xx xx" />
        </Field>
        <Field label="E-posta (isteğe bağlı)" error={errors.email}>
          <input type="email" inputMode="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className={inputCls} placeholder="ornek@email.com" />
        </Field>
        <Field label="Konu">
          <select value={form.subject} onChange={(e) => upd("subject", e.target.value)} className={inputCls}>
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Mesajınız" required error={errors.message}>
        <textarea value={form.message} onChange={(e) => upd("message", e.target.value)} rows={4} maxLength={1500} className={`${inputCls} resize-none`} placeholder="Mesajınızı buraya yazın…" />
      </Field>
      <Field label="İletişim tercihi">
        <select value={form.contactMethod} onChange={(e) => upd("contactMethod", e.target.value)} className={inputCls}>
          <option>Telefon</option>
          <option>WhatsApp</option>
          <option>E-posta</option>
          <option>Fark etmez</option>
        </select>
      </Field>
      <label className="flex items-start gap-2.5 text-sm text-foreground">
        <input type="checkbox" checked={form.kvkk} onChange={(e) => upd("kvkk", e.target.checked)} className="mt-1 h-4 w-4 rounded border-border accent-accent" />
        <span>İletişim bilgilerimin işlenmesine ilişkin KVKK Aydınlatma Metni'ni okudum, kabul ediyorum. {errors.kvkk && <span className="text-destructive">{errors.kvkk}</span>}</span>
      </label>
      <button type="submit" disabled={status === "submitting"} className="btn-accent w-full sm:w-auto">
        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Gönderiliyor…</>) : (<><Send className="h-4 w-4" /> Mesajı Gönder</>)}
      </button>
      {status === "error" && <p className="text-sm text-destructive">Mesajınız gönderilemedi. İnternet bağlantınızı kontrol ederek yeniden deneyin.</p>}
      <p className="text-xs text-muted-foreground">Fiyat teklifi için <a href="/teklif-al" className="text-accent hover:underline">ayrıntılı teklif formunu</a> doldurabilirsiniz.</p>
    </form>
  );
}