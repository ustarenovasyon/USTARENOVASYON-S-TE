import React, { useEffect, useState, useCallback } from "react";
import { MessageCircle, X } from "lucide-react";
import AssistantChat from "@/components/assistant/AssistantChat";
import {
  newSessionId,
  pageKeyFromPath,
  detectDevice,
  logAssistantEvent,
} from "@/lib/assistantCore";
import { DEFAULT_GREETING, PAGE_GREETINGS } from "@/lib/assistantConfig";

const STORAGE_KEY = "ur_assistant_state_v1";

// Ziyaretçi oturumunu localStorage'da saklar (kapalı kalma + mesaj geçmişi).
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}
function saveState(s) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch (_) {}
}

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [pageKey, setPageKey] = useState("home");
  const [bubble, setBubble] = useState(false);

  // İlk yükleme: oturumu hazırla.
  useEffect(() => {
    const saved = loadState();
    const sid = saved?.sessionId || newSessionId();
    setSessionId(sid);
    setPageKey(pageKeyFromPath(window.location.pathname));
    if (saved?.messages?.length) {
      setMessages(saved.messages);
    } else {
      const greeting = PAGE_GREETINGS[pageKey] || DEFAULT_GREETING;
      setMessages([{ role: "assistant", content: greeting, greeting: true }]);
    }
    // dismissed kalıcı saklanmaz — yeni ziyarette asistan yeniden görünür.
    // Birkaç saniye sonra kısa karşılama balonu.
    const t = setTimeout(() => setBubble(true), 3500);
    return () => clearTimeout(t);
     
  }, []);

  // Mesajları kaydet.
  useEffect(() => {
    saveState({ sessionId, messages: messages.slice(-30) });
  }, [messages, sessionId]);

  const handleOpen = useCallback(() => {
    if (dismissed) return;
    setOpen(true);
    setBubble(false);
    logAssistantEvent(sessionId, "panel_acildi", { page_key: pageKey });
  }, [dismissed, sessionId, pageKey]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setDismissed(true);
  }, []);

  return (
    <>
      {/* Karşılama balonu */}
      {bubble && !open && !dismissed && (
        <div className="fixed bottom-48 right-4 z-30 max-w-[240px] rounded-2xl bg-card p-3 shadow-xl ring-1 ring-border md:bottom-40 md:right-20 md:max-w-xs">
          <button
            onClick={() => setBubble(false)}
            className="absolute -right-2 -top-2 rounded-full bg-slate-200 p-1"
            aria-label="Balonu kapat"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="text-xs text-foreground">
            Merhaba! İhtiyacınızı birlikte belirleyelim. Yardım ister misiniz?
          </p>
          <button
            onClick={handleOpen}
            className="mt-2 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            Evet, yardımcı ol
          </button>
        </div>
      )}

      {/* Asistan butonu — sabit alt çubuğun üstünde, kart butonlarını kapatmaz */}
      {!open && !dismissed && (
        <button
          onClick={handleOpen}
          aria-label="Usta Renovasyon Dijital Asistanını Aç"
          className="fixed bottom-32 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-2 ring-accent transition-transform hover:scale-105 md:bottom-24 md:right-20 md:h-14 md:w-14"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
            Yardım
          </span>
        </button>
      )}

      {/* Sohbet paneli */}
      {open && (
        <AssistantChat
          sessionId={sessionId}
          pageKey={pageKey}
          messages={messages}
          setMessages={setMessages}
          onClose={handleClose}
          device={detectDevice()}
        />
      )}
    </>
  );
}