import React from "react";
import { Phone, ClipboardList, MessageSquare, Package, ShieldCheck, CalendarClock, MessageCircle, MapPin, CheckCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/siteConfig";
import { trackCta } from "@/lib/ctaTracking";
import Reveal from "@/components/common/Reveal";

const iconMap = {
  Phone, ClipboardList, MessageSquare, Package, ShieldCheck, CalendarClock, MessageCircle, MapPin, CheckCircle,
};

// Neden Usta Renovasyon — güven kartları.
export default function WhyCards({ cards, whatsappMsg }) {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => {
        const Icon = iconMap[c.icon] || CheckCircle;
        return (
          <Reveal key={c.title} delay={i * 50} className="h-full">
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading text-base font-bold">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              {c.whatsapp && (
                <a
                  href={getWhatsAppLink(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="about-why-whatsapp"
                  onClick={() => trackCta("about-why-whatsapp")}
                  className="btn-accent mt-4 self-start"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz
                </a>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}