import React from "react";
import { Phone, MessageCircle, MapPin, Clock, User } from "lucide-react";
import { siteConfig, getPhoneLink, getWhatsAppLink, getAddressLine } from "@/lib/siteConfig";
import { uiSettings } from "@/lib/uiSettings";
import { CallButton, WhatsAppButton } from "@/components/common/ContactActions";
import Reveal from "@/components/common/Reveal";

// İletişim özeti — tıklanabilir telefon/WhatsApp + adres (görünürlük ayarına göre).
export default function ContactSummary() {
  const addr = getAddressLine(uiSettings.addressVisibility) || siteConfig.address.short;

  const rows = [
    { icon: User, label: "Yetkili", value: siteConfig.principal },
    { icon: Phone, label: "Telefon", value: siteConfig.phone.display, href: getPhoneLink() },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteConfig.whatsapp.display,
      href: getWhatsAppLink(),
      external: true,
    },
    { icon: MapPin, label: "Adres", value: addr },
    { icon: Clock, label: "Çalışma Saatleri", value: siteConfig.workingHours },
  ];

  return (
    <section id="iletisim" className="bg-background">
      <div className="container-grid py-16 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">İletişim</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Özal Usta'ya Ulaşın</h2>
          <p className="mt-4 text-muted-foreground">
            Tadilat, boya veya izolasyon ihtiyacınız için doğrudan iletişime geçin.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8">
          <dl className="grid gap-5 sm:grid-cols-2">
            {rows.map((r) => {
              const Icon = r.icon;
              const content = (
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">{r.label}</dt>
                    <dd className="mt-0.5 font-semibold text-foreground">{r.value}</dd>
                  </div>
                </div>
              );
              return r.href ? (
                <a
                  key={r.label}
                  href={r.href}
                  target={r.external ? "_blank" : undefined}
                  rel={r.external ? "noopener noreferrer" : undefined}
                  className="rounded-lg transition-colors hover:text-accent"
                >
                  {content}
                </a>
              ) : (
                <div key={r.label}>{content}</div>
              );
            })}
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CallButton className="btn-accent sm:flex-1" ctaId="contact-call" label="Hemen Ara" />
            <WhatsAppButton className="btn-secondary sm:flex-1" ctaId="contact-whatsapp" label="WhatsApp'tan Yaz" />
          </div>
        </div>
      </div>
    </section>
  );
}