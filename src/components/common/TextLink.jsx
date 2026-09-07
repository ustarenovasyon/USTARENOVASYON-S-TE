import React from "react";
import { ArrowRight } from "lucide-react";

// Metin bağlantısı — "Detayları Gör", "Tümünü İncele" gibi akışlar için.
export default function TextLink({ href = "#", children, className = "" }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}