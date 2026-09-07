import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { siteStore } from "@/api/staticStore";
import { siteConfig } from "@/lib/siteConfig";

// Bulunulan sayfaya göre dinamik WhatsApp mesajı üretir.
// Hizmet/proje detayından isim, diğer sayfalardan uygun genel mesaj döner.
export function useDynamicWhatsApp() {
  const location = useLocation();
  const [message, setMessage] = useState(siteConfig.whatsapp.defaultMessage);

  useEffect(() => {
    const path = location.pathname;
    const slug = path.split("/").filter(Boolean).pop();
    let active = true;

    async function derive() {
      try {
        if (path.startsWith("/hizmetler/") && slug) {
          const items = await siteStore.entities.Service.filter({ slug }, undefined, 1);
          if (active && items[0]?.name) {
            setMessage(`Merhaba Özal Usta. "${items[0].name}" hizmeti hakkında bilgi ve fiyat teklifi almak istiyorum.`);
            return;
          }
        }
        if (path.startsWith("/projeler/") && slug) {
          const items = await siteStore.entities.Project.filter({ slug }, undefined, 1);
          if (active && items[0]?.title) {
            setMessage(`Merhaba Özal Usta. "${items[0].title}" çalışmanızı inceledim. Benzer bir uygulama için bilgi almak istiyorum.`);
            return;
          }
        }
        if (path === "/teklif-al") {
          setMessage("Merhaba Özal Usta. Usta Renovasyon web siteniz üzerinden teklif talebi için ulaşıyorum.");
          return;
        }
        if (path === "/ucretsiz-kesif") {
          setMessage("Merhaba Özal Usta. Yapılacak iş için keşif talep etmek istiyorum.");
          return;
        }
        if (path === "/iletisim") {
          setMessage("Merhaba Özal Usta. Usta Renovasyon web siteniz üzerinden size ulaştım. Bilgi almak istiyorum.");
          return;
        }
        if (path === "/hakkimizda") {
          setMessage("Merhaba Özal Usta. Usta Renovasyon hakkında bilgi aldım. Yapılacak iş için iletişim kurmak istiyorum.");
          return;
        }
      } catch {
        /* sessizce varsayılana dön */
      }
      if (active) setMessage(siteConfig.whatsapp.defaultMessage);
    }

    derive();
    return () => {
      active = false;
    };
  }, [location.pathname]);

  return message;
}