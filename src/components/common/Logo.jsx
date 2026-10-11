import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";

// Referans markanın çatı ve USTA yanında RENOVASYON düzenini koruyan vektör logo.
export default function Logo({ variant = "light", className = "" }) {
  return (
    <Link
      to="/"
      className={`inline-flex min-w-0 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${variant === "light" ? "" : "bg-primary px-2"} ${className}`}
      aria-label={`${siteConfig.brandName} — Ana sayfa`}
    >
      <img
        src="/assets/usta-renovasyon-logo.svg?v=horizontal-1"
        alt={siteConfig.brandName}
        width="1688"
        height="245"
        className="block h-auto w-full max-w-[280px] object-contain lg:max-w-[210px] xl:max-w-[260px]"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
