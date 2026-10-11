import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";

// Referans markanın çatı / USTA / RENOVASYON düzenini koruyan vektör logo.
export default function Logo({ variant = "light", className = "" }) {
  return (
    <Link
      to="/"
      className={`inline-flex shrink-0 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${variant === "light" ? "" : "bg-primary px-2"} ${className}`}
      aria-label={`${siteConfig.brandName} — Ana sayfa`}
    >
      <img
        src="/assets/usta-renovasyon-logo.svg"
        alt={siteConfig.brandName}
        width="580"
        height="310"
        className="block h-14 w-auto max-w-[160px] object-contain lg:h-16"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
