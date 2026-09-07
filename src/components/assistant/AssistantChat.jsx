import React, { useEffect, useRef, useState, useCallback } from "react";
import { X, Send, Sparkles, Phone, MessageSquare, Mail, Camera, ShieldCheck } from "lucide-react";
import { siteStore } from "@/api/staticStore";
import {
  callAssistant,
  suggestServices,
  needsHumanHandoff,
  isEmergency,
  hasSensitiveData,
  logAssistantEvent,
} from "@/lib/assistantCore";
import {
  QUICK_START_OPTIONS,
  ASSISTANT_CONTACT,
  PRIVACY_NOTE,
} from "@/lib/assistantConfig";
import AssistantRequestForm from "@/components/assistant/AssistantRequestForm";

export default function AssistantChat({ sessionId, pageKey, messages, setMessages, onClose, device }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState({ services: [], faqs: [], districts: [], approved: [], blogPosts: [] });
  const [collected, setCollected] = useState({ service: "", district: "", phone: "" });
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const scrollRef = useRef(null);

  // Onaylı bilgi kaynaklarını yükle (yalnızca yayındaki içerik).
  useEffect(() => {
    (async () => {
      try {
        const [services, faqs, districts, approved, blogPosts] = await Promise.all([
          siteStore.entities.Service.list().catch(() => []),
          siteStore.entities.Faq.filter({ status: "published" }).catch(() => []),
          siteStore.entities.ServiceArea.list().catch(() => []),
          siteStore.entities.AiApprovedAnswer.filter({ status: "yayinda" }).catch(() => []),
          siteStore.entities.BlogPost.filter({ status: "published" }, "-published_date", 12).catch(() => []),
        ]);
        setContext({ services, faqs, districts, approved, blogPosts });
      } catch (_) {}
    })();
  }, []);

  // Yeni mesajda en alta kay.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const push = useCallback(
    (m) => setMessages((prev) => [...prev, m]),
    [setMessages]
  );

  const send = useCallback(
    async (text) => {
      const trimmed = (text || "").trim();
      if (!trimmed || loading) return;

      // Hassas veri uyarısı.
      if (hasSensitiveData(trimmed)) {
        push({
          role: "assistant",
          content:
            "Güvenliğiniz için kart, parola, IBAN veya kimlik bilgilerinizi paylaşmayın. Bu bilgileri talebimizde kullanmıyoruz. Yalnızca ad, telefon, ilçe ve yapılacak iş bilgisine ihtiyacımız var.",
        });
        return;
      }

      // Acil güvenlik durumu.
      if (isEmergency(trimmed)) {
        push({ role: "user", content: trimmed });
        push({
          role: "assistant",
          content:
            "Bu durum güvenlik riski oluşturabilir. Tehlikeli alandan uzak durun ve uygun acil yardım veya yetkili teknik hizmetle iletişime geçin. Usta Renovasyon'a yapılacak onarım için daha sonra bilgi iletebilirsiniz.",
          suggested_actions: ["telefon", "whatsapp"],
          needs_human: true,
        });
        logAssistantEvent(sessionId, "insana_gecis", { page_key: pageKey });
        return;
      }

      push({ role: "user", content: trimmed });
      setInput("");
      setLoading(true);
      logAssistantEvent(sessionId, "ilk_mesaj", { page_key: pageKey });

      const detected = suggestServices(trimmed);
      const handoff = needsHumanHandoff(trimmed);

      try {
        const res = await callAssistant({
          userText: trimmed,
          history: messages,
          services: context.services,
          faqs: context.faqs,
          districts: context.districts,
          approvedAnswers: context.approved,
          blogPosts: context.blogPosts,
        });

        const reply = res.reply || "Bu konuda kesin bilgi verebilmem için sizi Özal Usta'ya yönlendirebilirim.";
        push({
          role: "assistant",
          content: reply,
          suggested_services: res.suggested_services || detected,
          suggested_actions: res.suggested_actions || [],
          needs_human: res.needs_human || handoff,
          next_question: res.next_question || "",
        });

        if (detected.length) setCollected((c) => ({ ...c, service: detected[0] }));

        // İnsana geçiş veya cevaplanamayan soru kaydı.
        if (res.needs_human || handoff || res._error) {
          logAssistantEvent(sessionId, "insana_gecis", { page_key: pageKey, service: detected[0] });
          try {
            siteStore.entities.UnansweredQuestion.create({
              session_id: sessionId,
              question: trimmed,
              page_key: pageKey,
              suggested_topic: detected[0] || "",
              handed_to_human: true,
            });
          } catch (_) {}
        }
      } catch (e) {
        push({
          role: "assistant",
          content:
            "Dijital asistan şu anda yanıt veremiyor. Özal Usta'ya telefon, e-posta veya WhatsApp üzerinden ulaşabilirsiniz.",
          suggested_actions: ["telefon", "whatsapp"],
          needs_human: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, context, sessionId, pageKey, push]
  );

  const handleQuick = useCallback(
    (opt) => {
      const map = {
        hizmet_sec: "Hangi hizmete ihtiyacınız olduğunu tam emin değil misiniz? Sorunu veya yapmak istediğiniz yenilemeyi kısaca yazabilirsiniz.",
        teklif: "Teklif için alan, ilçe ve yapılacak iş bilgisini paylaşabilirsiniz. İsterseniz formu sizin için hazırlayabilirim.",
        fotograf: "Daha doğru ön değerlendirme için alanın genel görünümünü ve sorunlu bölgenin yakın çekimini ekleyebilirsiniz. Fotoğraf zorunlu değildir.",
        kesif: "Ücretsiz keşif için ilçe ve uygun gün/saat tercihinizi alabilirim. Kesin randevuyu Özal Usta onaylar.",
        insan: "Sizi Özal Usta'ya yönlendirebilirim. Telefon, WhatsApp veya e-posta seçeneklerinden birini kullanabilirsiniz.",
        hizmetler: "Yayındaki hizmetlerimizi /hizmetler sayfasından inceleyebilirsiniz. Hangi konuda yardım istediğinizi de yazabilirsiniz.",
      };
      if (opt === "fotograf") {
        document.getElementById("as-photo-input")?.click();
        return;
      }
      if (opt === "teklif" || opt === "kesif") {
        setShowRequestForm(true);
      }
      send(map[opt.value || opt] || map[opt]);
    },
    [send]
  );

  const handlePhoto = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const { file_url } = await siteStore.integrations.Core.UploadFile({ file });
        setPhotoUrls((p) => [...p, file_url]);
        setCollected((c) => ({ ...c, photoCount: (c.photoCount || 0) + 1 }));
        push({
          role: "user",
          content: "📷 Fotoğraf eklendi",
          photo_urls: [file_url],
        });
        push({
          role: "assistant",
          content:
            "Fotoğraf cihazınızda önizleme olarak eklendi. GitHub-only sitede fotoğraf sunucuya yüklenmez; talep sırasında WhatsApp açıldığında fotoğrafı oradan ayrıca gönderebilirsiniz. Güvenliğiniz için çatıya veya yüksek bir bölgeye çıkmayın.",
          suggested_actions: ["teklif", "whatsapp"],
        });
        logAssistantEvent(sessionId, "fotograf_eklendi", { page_key: pageKey });
      } catch (_) {
        push({ role: "assistant", content: "Fotoğraf cihazda hazırlanamadı. Fotoğrafı doğrudan WhatsApp üzerinden gönderebilirsiniz." });
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    },
    [push, sessionId, pageKey]
  );

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 sm:items-end sm:p-4 md:inset-auto md:right-4 md:top-20 md:bottom-auto md:h-[600px] md:w-[400px]">
        <div className="flex h-full w-full flex-col rounded-t-2xl bg-card shadow-2xl ring-1 ring-border md:rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold">Usta Renovasyon Asistanı</p>
                <p className="text-[11px] text-white/70">Site içeriğiyle çalışan dijital yardımcı</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Sohbeti kapat" className="rounded-lg p-1.5 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mesajlar */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
            {messages.map((m, i) => (
              <MessageBubble key={i} m={m} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-card px-4 py-2.5 text-sm text-muted-foreground ring-1 ring-border">
                  <span className="inline-flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Hızlı seçenekler */}
          {messages.length <= 1 && !loading && (
            <div className="flex flex-wrap gap-2 border-t border-border p-3">
              {QUICK_START_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => handleQuick(o.value)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-accent hover:text-accent"
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {/* İletişim hızlı bağlantıları */}
          <div className="flex items-center justify-around border-t border-border bg-card px-3 py-2">
            <a href={ASSISTANT_CONTACT.phoneLink} onClick={() => logAssistantEvent(sessionId, "telefon_tiklandi")} className="flex flex-col items-center gap-0.5 text-xs text-foreground hover:text-accent">
              <Phone className="h-4 w-4" /> Ara
            </a>
            <a href={ASSISTANT_CONTACT.whatsappLink} target="_blank" rel="noreferrer" onClick={() => logAssistantEvent(sessionId, "whatsapp_tiklandi")} className="flex flex-col items-center gap-0.5 text-xs text-foreground hover:text-accent">
              <MessageSquare className="h-4 w-4" /> WhatsApp
            </a>
            <a href={ASSISTANT_CONTACT.emailLink} className="flex flex-col items-center gap-0.5 text-xs text-foreground hover:text-accent">
              <Mail className="h-4 w-4" /> E-posta
            </a>
            <button onClick={() => setShowRequestForm(true)} className="flex flex-col items-center gap-0.5 text-xs text-foreground hover:text-accent">
              <ShieldCheck className="h-4 w-4" /> Talep
            </button>
          </div>

          {/* Girdi */}
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2"
            >
              <label className="cursor-pointer rounded-lg p-2 text-muted-foreground hover:text-accent">
                <Camera className="h-5 w-5" />
                <input id="as-photo-input" type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhoto} />
              </label>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                disabled={loading}
              />
              <button type="submit" disabled={loading || !input.trim()} className="rounded-lg bg-accent p-2.5 text-primary-foreground disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-1.5 text-[10px] leading-tight text-muted-foreground">{PRIVACY_NOTE}</p>
          </div>
        </div>
      </div>

      {/* Talep oluşturma formu */}
      {showRequestForm && (
        <AssistantRequestForm
          sessionId={sessionId}
          pageKey={pageKey}
          collected={collected}
          photoUrls={photoUrls}
          messages={messages}
          onClose={() => setShowRequestForm(false)}
          onCreated={(reqId) => {
            push({
              role: "assistant",
              content:
                "WhatsApp hazırlandı. Talebinizin bize ulaşması için açılan WhatsApp ekranındaki mesajı gönderin; fotoğraf seçtiyseniz fotoğrafları da oradan ekleyebilirsiniz.",
              suggested_actions: ["telefon", "whatsapp"],
            });
            logAssistantEvent(sessionId, "talep_gonderildi", { page_key: pageKey });
          }}
        />
      )}
    </>
  );
}

function MessageBubble({ m }) {
  const isUser = m.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
          isUser
            ? "rounded-br-sm bg-accent text-primary-foreground"
            : "rounded-bl-sm bg-card text-foreground ring-1 ring-border"
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
        {m.photo_urls?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {m.photo_urls.map((u, i) => (
              <img key={i} src={u} alt="Yüklenen" className="h-16 w-16 rounded-lg object-cover" />
            ))}
          </div>
        )}
        {!isUser && m.suggested_actions?.length > 0 && (
          <ActionChips actions={m.suggested_actions} />
        )}
      </div>
    </div>
  );
}

function ActionChips({ actions }) {
  const map = {
    teklif: { label: "Teklif Al", action: "form" },
    kesif: { label: "Keşif Talebi", action: "form" },
    fotograf: { label: "Fotoğraf Ekle", action: "photo" },
    whatsapp: { label: "WhatsApp", link: ASSISTANT_CONTACT.whatsappLink },
    telefon: { label: "Telefon", link: ASSISTANT_CONTACT.phoneLink },
    eposta: { label: "E-posta", link: ASSISTANT_CONTACT.emailLink },
    projeler: { label: "Projeleri Gör", to: "/projeler" },
    hizmetler: { label: "Hizmetler", to: "/hizmetler" },
    blog: { label: "Blog'u Gör", to: "/blog" },
    sss: { label: "Sık Sorulan Sorular", to: "/sik-sorulan-sorular" },
  };
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {actions.map((a, i) => {
        const item = map[a];
        if (!item) return null;
        if (item.link)
          return (
            <a key={i} href={item.link} target="_blank" rel="noreferrer" className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent hover:bg-accent/20">
              {item.label}
            </a>
          );
        if (item.to)
          return (
            <a key={i} href={item.to} className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent hover:bg-accent/20">
              {item.label}
            </a>
          );
        return null;
      })}
    </div>
  );
}