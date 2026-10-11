import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const indexPath = path.join(dist, "index.html");
const routesPath = path.resolve("public/routes.txt");

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html bulunamadı; önce Vite build tamamlanmalı.");
}

const html = fs.readFileSync(indexPath, "utf8");
// Ana görsel yalnızca ana sayfada kullanılır; diğer yollar gereksiz indirmesin.
const routeHtml = html.replace(/\s*<link\b[^>]*\bdata-home-hero\b[^>]*>/g, "");
const routes = fs
  .readFileSync(routesPath, "utf8")
  .split(/\r?\n/)
  .map((x) => x.trim())
  .filter(Boolean);

for (const route of routes) {
  if (route === "/") continue;
  const dir = path.join(dist, route.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), routeHtml);
}

// Bilinmeyen SPA yollarında da React yönlendirmesinin açılabilmesi için fallback.
fs.writeFileSync(path.join(dist, "404.html"), routeHtml);
console.log(`Static route copies generated: ${routes.length}`);
