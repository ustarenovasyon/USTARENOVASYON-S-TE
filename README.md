# Usta Renovasyon — GitHub Pages

Bu repository Usta Renovasyon'un herhangi bir uygulama oluşturucuya veya uygulama sunucusuna ihtiyaç duymadan çalışan public web sitesidir.

## Mimari

- React + Vite
- GitHub Pages
- Statik içerik: `src/lib/`
- Form teslimi: WhatsApp yönlendirmesi
- Fotoğraflar: yalnızca cihaz içi önizleme; sunucuya yüklenmez
- Yönetim paneli / kullanıcı girişi / veritabanı yoktur
- Ana sayfa hero alanı hareketli video yerine yerel, yüksek çözünürlüklü sabit görsel kullanır.
- Yapay zekâ asistanı ve sağ taraftaki yüzen sohbet balonları kullanıcı isteğiyle devre dışıdır.

## Yerel çalıştırma

```bash
npm ci
npm run dev
```

Üretim kontrolü:

```bash
npm run build
npm run lint
npm run typecheck
```

## Yayınlama

`.github/workflows/deploy.yml` ana dala yapılan push sonrasında siteyi GitHub Pages'e deploy eder.

GitHub repository ayarlarında **Settings → Pages → Source: GitHub Actions** seçilmelidir.

## Özel domain

Repository içinde `public/CNAME` dosyasında domain referansı tutulur; ancak GitHub Actions ile yayınlamada özel domain bu dosyayla otomatik tanımlanmaz. **Settings → Pages → Custom domain** alanında `ustarenovasyon.com` ayrıca tanımlanmalıdır.

DNS tarafında `@` için GitHub Pages A kayıtları `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` için CNAME hedefi `ustarenovasyon.github.io` kullanılmalıdır.

## İçerik güncelleme

Site verileri kaynak kod içinde tutulur. Güncelleme yapıldıktan sonra `main` dalına gönderildiğinde GitHub Actions otomatik yayınlar.
