import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { CallButton } from "@/components/common/ContactActions";
import Reveal from "@/components/common/Reveal";

const ABOUT_IMG =
  "/assets/about-renovation.svg";

// Usta Renovasyon kısa tanıtım — gerçek Özal Usta fotoğrafı eklenene kadar çalışma görseli.
export default function AboutTeaser() {
  return (
    <section id="hakkimizda" className="bg-card">
      <div className="container-grid grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
            <Image
              src={ABOUT_IMG}
              alt="Usta eliyle pürüzsüz alçı sıva uygulaması detayı"
              className="aspect-[4/3] w-full"
              fittingType="fill"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={120}>
          <span className="section-eyebrow">Hakkımızda</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Usta Renovasyon Hakkında</h2>
          <p className="mt-4 text-muted-foreground">
            Usta Renovasyon, Özal Usta yönetiminde başta Bornova olmak üzere İzmir genelinde alçı,
            sıva, iç ve dış cephe boya, izolasyon, mantolama, dekorasyon ve anahtar teslim tadilat
            hizmetleri sunmaktadır. Her işin ihtiyacı değerlendirilerek uygulama süreci, kullanılacak
            malzeme ve yapılacak işlemler hakkında müşteriye açık bilgi verilir.
          </p>
          <p className="mt-3 text-muted-foreground">
            Amacımız yalnızca işi tamamlamak değil; düzenli çalışma, açık iletişim ve temiz teslim
            anlayışıyla müşterilerimize güvenilir bir hizmet sunmaktır.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/hizmetler" className="btn-secondary">Hizmetlerimizi İnceleyin</Link>
            <CallButton className="btn-outline" ctaId="about-call" label="Özal Usta'ya Ulaşın" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}