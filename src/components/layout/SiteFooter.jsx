import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, MessageCircle, Mail } from "lucide-react";
import Logo from "@/components/common/Logo";
import SocialLinks from "@/components/common/SocialLinks";
import { siteStore } from "@/api/staticStore";
import { siteConfig, getPhoneLink, getWhatsAppLink, getEmailLink, hasEmail, getAddressLine } from "@/lib/siteConfig";
import { uiSettings } from "@/lib/uiSettings";

const quickLinks = [
  { label: "Ana Sayfa", to: "/" },
  { label: "Hakkımızda", to: "/hakkimizda" },
  { label: "İletişim", to: "/iletisim" },
];

const legalLinks = [
  { label: "Gizlilik Politikası", to: "/gizlilik-politikasi" },
  { label: "KVKK Aydınlatma Metni", to: "/kvkk-aydinlatma-metni" },
  { label: "Çerez Politikası", to: "/cerez-politikasi" },
  { label: "Kullanım Şartları", to: "/kullanim-sartlari" },
];

function openCookiePrefs() { window.dispatchEvent(new CustomEvent("open-cookie-preferences", { detail: true })); }

// Ortak Footer — firma, hızlı bağlantılar, dinamik hizmetler, iletişim, yasal.
export default function SiteFooter() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let a = true;
    siteStore.entities.Service
      .filter({ status: "published", show_in_menu: true }, "order", 8)
      .then((items) => a && setServices(items))
      .catch(() => a && setServices([]));
    return () => { a = false; };
  }, []);

  const emailLink = getEmailLink();
  const addressLine = getAddressLine(uiSettings.addressVisibility);

  return (
    <footer id="iletisim" className="bg-primary text-white">
      <div className="container-grid grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Firma */}
        <div className="lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Usta Renovasyon, {siteConfig.principal} yönetiminde başta Bornova olmak üzere İzmir genelinde boya, alçı, sıva, dış cephe, izolasyon, mantolama, alçıpan ve tadilat hizmetleri sunmaktadır.
          </p>
        </div>

        {/* Hızlı Bağlantılar */}
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">Hızlı Bağlantılar</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {quickLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="transition-colors hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Hizmetler (dinamik) */}
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">Öne Çıkan Hizmetler</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {services.length > 0 ? services.map((s) => (
              <li key={s.id}><Link to={`/hizmetler/${s.slug}`} className="transition-colors hover:text-white">{s.name}</Link></li>
            )) : (
              <>
                <li><Link to="/hizmetler" className="transition-colors hover:text-white">İç Cephe Boya</Link></li>
                <li><Link to="/hizmetler" className="transition-colors hover:text-white">Alçı ve Sıva</Link></li>
                <li><Link to="/hizmetler" className="transition-colors hover:text-white">Çatı İzolasyonu</Link></li>
                <li><Link to="/hizmetler" className="transition-colors hover:text-white">Mantolama</Link></li>
              </>
            )}
            <li><Link to="/hizmetler" className="text-accent transition-colors hover:text-white">Tüm Hizmetler</Link></li>
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">İletişim</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={getPhoneLink()} className="hover:text-white">{siteConfig.phone.display}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={getWhatsAppLink("Merhaba Özal Usta. WhatsApp üzerinden teklif almak istiyorum.")} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp'tan Teklif Al</a>
            </li>
            {hasEmail() && (
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={emailLink} className="break-all hover:text-white">{siteConfig.email}</a>
              </li>
            )}
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{addressLine || siteConfig.address.short}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{siteConfig.workingHours}</span>
            </li>
            <li className="flex flex-wrap gap-2 pt-1">
              <Link to="/teklif-al" className="rounded-lg border border-white/20 px-3 py-1.5 text-xs transition-colors hover:bg-white/10">Teklif Al</Link>
              <Link to="/ucretsiz-kesif" className="rounded-lg border border-white/20 px-3 py-1.5 text-xs transition-colors hover:bg-white/10">Ücretsiz Keşif</Link>
            </li>
          </ul>
          {/* Bizi Takip Edin — yalnızca gerçek URL girilmiş Instagram/Facebook */}
          <SocialLinks title="Bizi Takip Edin" className="mt-5" />
        </div>
      </div>

      {/* Yasal + telif */}
      <div className="border-t border-white/10">
        <div className="container-grid flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row md:pb-20">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. Tüm hakları saklıdır.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {legalLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="transition-colors hover:text-white">{l.label}</Link></li>
            ))}
            <li><button onClick={openCookiePrefs} className="transition-colors hover:text-white">Çerez Tercihleri</button></li>
            <li><Link to="/iletisim" className="transition-colors hover:text-white">İletişim</Link></li>
          </ul>
          <p>Bornova / İzmir · {siteConfig.principal}</p>
        </div>
      </div>
    </footer>
  );
}