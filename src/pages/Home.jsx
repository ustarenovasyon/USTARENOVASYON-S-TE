import React from "react";
import HeroVideo from "@/components/home/HeroVideo";
import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import ServicesPreview from "@/components/home/ServicesPreview";
import AboutTeaser from "@/components/home/AboutTeaser";
import WhyUs from "@/components/home/WhyUs";
import HowItWorks from "@/components/home/HowItWorks";
import ServiceAreas from "@/components/home/ServiceAreas";
import QuoteSection from "@/components/home/QuoteSection";
import FaqPreview from "@/components/home/FaqPreview";
import BlogPreview from "@/components/home/BlogPreview";
import ContactSummary from "@/components/home/ContactSummary";
import MapArea from "@/components/home/MapArea";
import FinalCta from "@/components/home/FinalCta";

// Ana sayfa — bölüm sıralaması Part 3 talimatına göre.
export default function Home() {
  return (
    <>
      <HeroVideo />
      <Hero />
      <TrustBadges />
      <ServicesPreview />
      <AboutTeaser />
      <WhyUs />
      <HowItWorks />
      <ServiceAreas />
      <QuoteSection />
      <FaqPreview />
      <BlogPreview />
      <ContactSummary />
      <MapArea />
      <FinalCta />
    </>
  );
}