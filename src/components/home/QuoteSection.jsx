import React, { useState } from "react";
import { Phone, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { getPhoneLink, getWhatsAppLink } from "@/lib/siteConfig";
import { serviceCategories } from "@/lib/servicesData";
import { trackCta } from "@/lib/ctaTracking";
import Reveal from "@/components/common/Reveal";

const PHOTO_MSG =
  "Merhaba Özal Usta. Usta Renovasyon web siteniz üzerinden ulaşıyorum. Yapılacak alanın fotoğraflarını göndererek bilgi ve fiyat teklifi almak istiyorum.";

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}

// Ücretsiz keşif ve teklif çağrısı + kısa talep formu.
export default function QuoteSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
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
    if (!form.name.trim()) errs.name = "Lütfen adınızı girin.";
    if (!form.phone.trim()) errs.phone = "Lütfen telefon numaranızı girin.";
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
      trackCta("form-submit");
      setStatus("success");
    } catch (_) {
      setStatus("error");
    }
  };

  return (
    <section id="teklif-al" className="bg-primary text-white">
      <div className="container-grid py-16 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow text-accent">Ücretsiz Keşif & Teklif</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
            Yapılacak İş İçin Bilgi ve Fiyat Teklifi Alın
          </h2>
          <p className="mt-4 text-white/70">
            Yapılacak alanın fotoğraflarını WhatsApp üzerinden gönderebilir, hizmet hakkında bilgi
            alabilir veya ücretsiz keşif talebi oluşturabilirsiniz.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={getWhatsAppLink(PHOTO_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="quote-whatsapp-photo"
              onClick={() => trackCta("quote-whatsapp-photo")}
              className="btn-accent"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp'tan Fotoğraf Gönder
            </a>
            <a
              href={getPhoneLink()}
              data-cta="quote-call"
              onClick={() => trackCta("quote-call")}
              className="btn-outline border-white/20 text-white hover:border-accent hover:text-accent"
            >
              <Phone className="h-4 w-4" /> Hemen Ara
            </a>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl">
          {status === "success" ? (
            <div className="rounded-xl border border-green-400/30 bg-green-500/10 p-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-green-400" />
              <h3 className="mt-3 font-heading text-lg font-bold text-white">
                WhatsApp mesajınız hazırlandı
              </h3>
              <p className="mt-1 text-sm text-white/70">
                Açılan WhatsApp ekranındaki mesajı gönderdiğinizde talebiniz doğrudan Özal Usta’ya ulaşır.
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent mt-5"
              >
                İsterseniz WhatsApp'tan da yazın
              </a>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ad Soyad" required error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="form-input"
                    placeholder="Adınız Soyadınız"
                  />
                </Field>
                <Field label="Telefon Numarası" required error={errors.phone}>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="form-input"
                    placeholder="05xx xxx xx xx"
                  />
                </Field>
                <Field label="Hizmet Seçimi">
                  <select
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className="form-input"
                  >
                    <option value="">Seçiniz…</option>
                    {serviceCategories.map((c) => (
                      <option key={c.key} value={c.short}>{c.short}</option>
                    ))}
                  </select>
                </Field>
                <Field label="İlçe">
                  <input
                    value={form.district}
                    onChange={(e) => update("district", e.target.value)}
                    className="form-input"
                    placeholder="Örn. Bornova"
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Kısa Açıklama">
                  <textarea
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={3}
                    className="form-input resize-none"
                    placeholder="Yapılacak işi kısaca anlatın…"
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="İletişim Tercihi">
                  <select
                    value={form.contact}
                    onChange={(e) => update("contact", e.target.value)}
                    className="form-input"
                  >
                    <option value="telefon">Telefon ile arayın</option>
                    <option value="whatsapp">WhatsApp'tan yazın</option>
                  </select>
                </Field>
              </div>

              <label className="mt-4 flex items-start gap-2.5 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={form.kvkk}
                  onChange={(e) => update("kvkk", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent accent-accent"
                />
                <span>
                  KVKK aydınlatma metnini okudum, bilgilerimin iletişim amacıyla işlenmesini onaylıyorum.
                  {errors.kvkk && <span className="block text-red-300">{errors.kvkk}</span>}
                </span>
              </label>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-accent mt-6 w-full sm:w-auto"
                data-cta="form-submit"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Gönderiliyor…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Teklif Talebini Gönder
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="mt-3 text-sm text-red-300">
                  Talebiniz gönderilemedi. Lütfen telefon numaranızı kontrol edip yeniden deneyin veya
                  WhatsApp'tan yazın.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}