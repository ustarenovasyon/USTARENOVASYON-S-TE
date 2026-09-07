import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { siteStore } from "@/api/staticStore";

const MAX = 10;
const MAX_MB = 10;

// GitHub-only fotoğraf seçici — yalnızca cihaz içi ön izleme; sunucuya yükleme yapılmaz.
export default function PhotoUploader({ value = [], onChange, error }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList);
    setErr("");
    const remaining = MAX - value.length;
    if (remaining <= 0) {
      setErr(`En fazla ${MAX} fotoğraf ekleyebilirsiniz.`);
      return;
    }
    setBusy(true);
    const added = [];
    for (const f of files.slice(0, remaining)) {
      const okType = /^image\//.test(f.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(f.name);
      if (!okType) {
        setErr(`${f.name}: desteklenmeyen format.`);
        continue;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        setErr(`${f.name}: ${MAX_MB}MB sınırını aşıyor.`);
        continue;
      }
      try {
        const res = await siteStore.integrations.Core.UploadFile({ file: f });
        if (res?.file_url) added.push({ url: res.file_url, name: f.name });
      } catch {
        setErr(`${f.name} yüklenemedi. Fotoğrafı WhatsApp'tan da gönderebilirsiniz.`);
      }
    }
    setBusy(false);
    if (added.length) onChange([...value, ...added]);
  };

  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="block">
        <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card px-4 py-8 text-center transition-colors hover:border-accent">
          {busy ? <Loader2 className="h-6 w-6 animate-spin text-accent" /> : <Upload className="h-6 w-6 text-muted-foreground" />}
          <span className="mt-2 text-sm font-medium text-foreground">{busy ? "Hazırlanıyor…" : "Fotoğraf seçmek için tıklayın"}</span>
          <span className="mt-1 text-xs text-muted-foreground">JPG, PNG, WebP, HEIC · En fazla {MAX} görsel · {MAX_MB}MB</span>
        </div>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((p, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
              <img src={p.url} alt={p.name || "Yüklenen fotoğraf"} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="Fotoğrafı kaldır"
                className="absolute right-1 top-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Fotoğraflar yalnızca bu sayfada cihazınızda önizlenir; sunucuya yüklenmez. WhatsApp açıldığında seçtiğiniz fotoğrafları ayrıca mesaja ekleyebilirsiniz.
      </p>
    </div>
  );
}