import React from "react";
import { Link } from "react-router-dom";
import { Info, AlertTriangle, Lightbulb, MessageCircle, Phone, MapPin } from "lucide-react";
import { getWhatsAppLink, getPhoneLink } from "@/lib/siteConfig";

// Blog içerik blokları — yazı içinde tekrar kullanılabilir ortak bloklar.

export function InfoBox({ title = "Faydalı Bilgi", children }) {
  return (
    <div className="my-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <p className="flex items-center gap-2 font-heading text-sm font-bold text-blue-800"><Info className="h-4 w-4" /> {title}</p>
      <div className="mt-2 text-sm leading-relaxed text-blue-900/80">{children}</div>
    </div>
  );
}

export function WarningBox({ title = "Dikkat", children }) {
  return (
    <div className="my-6 rounded-xl border border-amber-300 bg-amber-50 p-4">
      <p className="flex items-center gap-2 font-heading text-sm font-bold text-amber-800"><AlertTriangle className="h-4 w-4" /> {title}</p>
      <div className="mt-2 text-sm leading-relaxed text-amber-900/80">{children}</div>
    </div>
  );
}

export function OzalNote({ children }) {
  return (
    <div className="my-6 rounded-xl border-l-4 border-accent bg-primary p-5 text-white">
      <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-accent"><Lightbulb className="h-4 w-4" /> Özal Usta'nın Notu</p>
      <div className="mt-2 text-sm leading-relaxed text-white/85">{children}</div>
    </div>
  );
}

export function CtaBlock({ title = "Bu Konuyla İlgili Hizmet mi Arıyorsunuz?", message }) {
  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-6">
      <h3 className="font-heading text-lg font-bold">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-3">
        <a href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz</a>
        <a href={getPhoneLink()} className="btn-outline"><Phone className="h-4 w-4" /> Hemen Ara</a>
        <Link to="/teklif-al" className="btn-secondary">Teklif Al</Link>
      </div>
    </div>
  );
}

export function ServiceLinkBlock({ services = [] }) {
  if (!services.length) return null;
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <p className="font-heading text-sm font-bold uppercase tracking-wider text-accent">İlgili Hizmetler</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link to={`/hizmetler/${s.slug}`} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-accent hover:text-accent">
              <span className="font-medium">{s.name}</span><MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}