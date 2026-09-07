import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/siteConfig";

// Marka logosu — lacivert kare + turuncu vurgu
export default function Logo({ variant = "light", className = "" }) {
  const isLight = variant === "light";
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={siteConfig.brandName}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-accent shadow-sm">
        <span className="font-heading text-lg font-extrabold leading-none text-primary">U</span>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-accent" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-base font-extrabold tracking-tight ${isLight ? "text-white" : "text-foreground"}`}>
          USTA <span className="text-accent">RENOVASYON</span>
        </span>
        <span className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] ${isLight ? "text-white/60" : "text-muted-foreground"}`}>
          Özal Usta · Bornova / İzmir
        </span>
      </span>
    </Link>
  );
}