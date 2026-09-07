import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { getPhoneLink, getWhatsAppLink, siteConfig } from '@/lib/siteConfig';
import { trackCta } from '@/lib/ctaTracking';

// Özel 404 sayfası — Türkçe, navigasyon ve hızlı iletişim butonları.
export default function PageNotFound({}) {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="container-grid flex min-h-[70vh] items-center justify-center py-16">
      <div className="max-w-lg text-center">
        <p className="text-7xl font-light text-muted-foreground/40">404</p>
        <h1 className="heading-display mt-4 text-2xl">Aradığınız Sayfa Bulunamadı</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Sayfa kaldırılmış, taşınmış veya bağlantı hatalı olabilir. &ldquo;{pageName || '?'}&rdquo; içeriğine ulaşamadık.
        </p>
        <div className="mt-6 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-navy"><HomeIcon className="h-4 w-4" /> Ana Sayfaya Dön</Link>
          <Link to="/hizmetler" className="btn-outline">Hizmetleri İncele <ArrowUpRight className="h-4 w-4" /></Link>
          <Link to="/iletisim" className="btn-outline">İletişim Sayfası</Link>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" data-cta="404-whatsapp" onClick={() => trackCta("404-whatsapp")} className="btn-accent"><MessageCircle className="h-4 w-4" /> WhatsApp'tan Yardım Al</a>
          <a href={getPhoneLink()} data-cta="404-call" onClick={() => trackCta("404-call")} className="btn-outline"><Phone className="h-4 w-4" /> {siteConfig.phone.display}</a>
        </div>
      </div>
    </div>
  );
}