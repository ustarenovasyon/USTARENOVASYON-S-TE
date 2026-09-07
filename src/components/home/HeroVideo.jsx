import React from "react";

const VIDEO_SRC = "/assets/hero-site-video.mp4";
const POSTER = "/assets/hero-renovation.svg";

// GitHub Pages sürümü: yerel video kesintisiz döngüde oynar ve harici servis gerektirmez.
export default function HeroVideo() {
  return (
    <section aria-hidden="true" className="relative w-full bg-primary">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/45" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
