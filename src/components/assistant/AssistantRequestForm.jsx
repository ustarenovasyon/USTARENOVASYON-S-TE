import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { createRequestFromConversation } from "@/lib/assistantCore";
import { Link } from "react-router-dom";

// Konuşmadan toplanan bilgilerle KVKK onaylı müşteri talebi oluşturma.
// Asistan KVKK kutusunu kullanıcı adına otomatik işaretlemez.
export default function AssistantRequestForm({ sessionId, pageKey, collected, photoUrls, messages, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: collected.name || "",
    phone: collected.phone || "",
    service: collected.service || "",
    district: collected.district || "",
    description: collected.description || "",
    contact_preference: "telefon",
    kvkk: false,
    marketing_consent: false,
    photo_consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const summary = [
    form.service && `Hizmet: ${form.service}`,
    form.district && `İlçe: ${form.district}`,
    form.description && `Açıklama: ${form.description}`,
    `Fotoğraf: ${photoUrls.length} adet`,
    `İletişim: ${form.contact_preference}`,
  ].filter(Boolean).join("\n");

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    if (!form.kvkk) return;
    setSubmitting(true);
    try {
      const req = await createRequestFromConversation({
        ...form,
        photo_urls: photoUrls,
        summary,
        source_page: "Asistan (" + pageKey + ")",
      });
      setDone(true);
      onCreated?.(req?.id);
    } catch (_) {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-2xl bg-card p-6 text-center shadow-2xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-3 font-heading text-lg font-bold">WhatsApp Hazırlandı</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Talebinizin bize ulaşması için açılan WhatsApp ekranındaki mesajı gönderin. Fotoğraf seçtiyseniz fotoğrafları WhatsApp içinde ayrıca ekleyebilirsiniz.
          </p>
          <button onClick={onClose} className="mt-4 rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-primary-foreground">
            Kapat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 sm:items-center">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-card p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold">Talep Oluştur</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>

        {/* Konuşma özeti */}
        <div className="mb-4 rounded-lg bg-muted/40 p-3">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">Paylaştığınız bilgilere göre talep özeti:</p>
          <pre className="whitespace-pre-wrap text-xs text-foreground">{summary || "Henüz bilgi eklenmedi."}</pre>
        </div>

        <div className="space-y-3">
          <Field label="Ad Soyad *">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Adınız Soyadınız" />
          </Field>
          <Field label="Telefon *">
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="05XX XXX XX XX" />
          </Field>
          <Field label="Hizmet">
            <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Örn. İç Cephe Boya" />
          </Field>
          <Field label="İlçe">
            <input value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Örn. Bornova" />
          </Field>
          <Field label="Açıklama">
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Yapılacak iş hakkında kısa açıklama" />
          </Field>
          <Field label="İletişim Tercihi">
            <select value={form.contact_preference} onChange={(e) => setForm({ ...form, contact_preference: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option value="telefon">Telefon</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="eposta">E-posta</option>
              <option value="fark_etmez">Fark Etmez</option>
            </select>
          </Field>

          {/* KVKK — kullanıcı adına otomatik işaretlenmez */}
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={form.kvkk} onChange={(e) => setForm({ ...form, kvkk: e.target.checked })} className="mt-0.5" />
            <span className="text-xs text-muted-foreground">
              İletişim bilgilerimin ve paylaştığım içeriklerin talebimin değerlendirilmesi amacıyla işlenmesini kabul ediyorum.{" "}
              <Link to="/kvkk-aydinlatma-metni" target="_blank" className="font-semibold text-accent">KVKK Aydınlatma Metni</Link>
            </span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={form.marketing_consent} onChange={(e) => setForm({ ...form, marketing_consent: e.target.checked })} className="mt-0.5" />
            <span className="text-xs text-muted-foreground">Pazarlama ve bilgilendirme mesajları almak istiyorum (isteğe bağlı).</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={form.photo_consent} onChange={(e) => setForm({ ...form, photo_consent: e.target.checked })} className="mt-0.5" />
            <span className="text-xs text-muted-foreground">Yüklediğim görsellerin kişisel bilgiler gizlenerek referans çalışmalarında kullanılmasına izin veriyorum (isteğe bağlı).</span>
          </label>
        </div>

        <button
          onClick={submit}
          disabled={submitting || !form.name.trim() || !form.phone.trim() || !form.kvkk}
          className="mt-4 w-full rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {submitting ? "Gönderiliyor..." : "Talebi Gönder"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}