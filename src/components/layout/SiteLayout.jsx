import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import TopInfoBar from "@/components/layout/TopInfoBar";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileCommandBar from "@/components/layout/MobileCommandBar";
import DesktopContactBar from "@/components/layout/DesktopContactBar";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import CookieConsentBanner from "@/components/common/CookieConsentBanner";
import MaintenanceGate from "@/components/common/MaintenanceGate";
import AssistantWidget from "@/components/assistant/AssistantWidget";
import { SiteSeoDefaults } from "@/components/common/SeoHead";

// Tüm site sayfalarını saran yerleşim: üst başlık + içerik + alt bilgi + sabit çubuklar.
// SiteSeoDefaults: canonical, robots, OG/Twitter varsayılanları, global LocalBusiness.
export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteSeoDefaults />
      <TopInfoBar />
      <SiteHeader />
      <main className="flex-1">
        <MaintenanceGate>
          <Outlet />
        </MaintenanceGate>
      </main>
      <SiteFooter />
      <MobileCommandBar />
      <DesktopContactBar />
      <WhatsAppFloat />
      <AssistantWidget />
      <CookieConsentBanner />
    </div>
  );
}