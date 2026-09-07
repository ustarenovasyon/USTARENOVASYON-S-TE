import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import { izmirDistricts } from "@/lib/districtsData";

// Hizmetin verildiği aktif bölgeler — yayında ilçe sayfalarına bağlantı verir.
export default function ServiceDistricts({ service }) {
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    let a = true;
    siteStore.entities.ServiceArea.filter({}, "order", 100)
      .then((items) => {
        if (!a) return;
        let list = items.filter((d) => d.service_status === "active" || d.service_status === "featured");
        if (service?.districts?.length) list = list.filter((d) => service.districts.includes(d.name) || service.districts.includes(d.slug));
        setAreas(list);
      })
      .catch(() => a && setAreas([]));
    return () => { a = false; };
  }, [service]);

  const show = areas.length ? areas : izmirDistricts.filter((d) => d.service_status === "active" || d.service_status === "featured");
  if (!show.length) return null;

  return (
    <section className="mt-16">
      <h2 className="heading-display text-2xl">Bu Hizmeti Verdiğimiz Bölgeler</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {show.map((d) => (
          <Link
            key={d.slug || d.id}
            to={d.page_status === "published" ? `/hizmet-bolgeleri/${d.slug}` : "/hizmet-bolgeleri"}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            <MapPin className="h-3.5 w-3.5 text-accent" /> {d.name}
          </Link>
        ))}
      </div>
    </section>
  );
}