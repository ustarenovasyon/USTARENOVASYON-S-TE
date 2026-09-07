import React, { useState } from "react";
import { MessageCircle, Facebook, Linkedin, Link as LinkIcon, Check } from "lucide-react";

// Sosyal paylaşım — WhatsApp, Facebook, X, LinkedIn, Bağlantıyı Kopyala.
export default function SocialShare({ title, url }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* yoksay */
    }
  };

  const btn = "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`}
        target="_blank" rel="noopener noreferrer"
        className={`${btn} text-[#25D366] hover:border-[#25D366]`} aria-label="WhatsApp'ta paylaş"
      ><MessageCircle className="h-4 w-4" /></a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer" className={btn} aria-label="Facebook'ta paylaş"
      ><Facebook className="h-4 w-4" /></a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer" className={btn} aria-label="X'te paylaş"
      ><span className="text-xs font-bold">X</span></a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer" className={btn} aria-label="LinkedIn'de paylaş"
      ><Linkedin className="h-4 w-4" /></a>
      <button type="button" onClick={copy} className={btn} aria-label="Bağlantıyı kopyala">
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}