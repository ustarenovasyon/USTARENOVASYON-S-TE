import React, { useEffect, useState } from "react";
import { siteStore } from "@/api/staticStore";
import MaintenancePage from "@/pages/MaintenancePage";

// Bakım modu kapısı — MaintenanceMode kaydını kontrol eder.
// Yöneticiler bakım modunda bile paneli görebilir; ziyaretçilere bakım sayfası gösterilir.
export default function MaintenanceGate({ children, isAdmin = false }) {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    let a = true;
    siteStore.entities.MaintenanceMode.filter({}, "-updated_date", 1)
      .then((r) => { if (a) setMode(r[0] || null); })
      .catch(() => { if (a) setMode(null); });
    return () => { a = false; };
  }, []);

  // Yüklenirken veya yönetici ise her zaman içeriği göster
  if (mode === null || isAdmin) return <>{children}</>;
  if (mode.enabled) return <MaintenancePage message={mode.message} />;
  return <>{children}</>;
}