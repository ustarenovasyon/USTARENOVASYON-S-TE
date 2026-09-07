import React from "react";
import { useParams } from "react-router-dom";
import { getCategoryBySlug } from "@/lib/servicesData";
import ServiceCategory from "@/pages/ServiceCategory";
import ServiceDetail from "@/pages/ServiceDetail";

// /hizmetler/:slug — kategori sayfası mı yoksa hizmet detayı mı olduğuna karar verir.
export default function ServiceResolver() {
  const { slug } = useParams();
  if (getCategoryBySlug(slug)) return <ServiceCategory slug={slug} />;
  return <ServiceDetail slug={slug} />;
}