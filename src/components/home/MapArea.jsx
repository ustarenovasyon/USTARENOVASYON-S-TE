import React, { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { uiSettings } from "@/lib/uiSettings";
import { getAddressLine, siteConfig } from "@/lib/siteConfig";

// Google Harita alanı — görünür olduğunda geç yüklenir (lazy).
export default function MapArea() {
  const ref = useRef(null);
  const [load, setLoad] = useState(false);
  const visibility = uiSettings.mapVisibility;
  const query = visibility === "full" ? siteConfig.address.full : "Bornova, İzmir";

  useEffect(() => {
    if (visibility === "hidden") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visibility]);

  if (visibility === "hidden") return null;
  const addr = getAddressLine(uiSettings.addressVisibility) || siteConfig.address.short;

  return (
    <section className="bg-card">
      <div className="container-grid py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Konum</span>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Bornova / İzmir</h2>
          <p className="mt-3 flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" /> {addr}
          </p>
        </div>
        <div
          ref={ref}
          className="mx-auto mt-8 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-muted"
        >
          {load ? (
            <iframe
              title="Bornova İzmir harita"
              src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Harita yükleniyor…
            </div>
          )}
        </div>
      </div>
    </section>
  );
}