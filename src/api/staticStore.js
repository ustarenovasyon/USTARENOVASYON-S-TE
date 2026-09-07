import {
  staticServices,
  staticServiceAreas,
  staticFaqs,
  staticBlogPosts,
  staticBlogCategories,
  staticAboutContents,
  staticSocialLinks,
  staticPaintingVisibility,
  staticMaintenanceMode,
  staticProjects,
  staticLandingPages,
  staticCampaigns,
} from "@/lib/staticContent";
import { deliverRequestToWhatsApp } from "@/lib/whatsappRequest";

const datasets = {
  Service: staticServices,
  ServiceArea: staticServiceAreas,
  Faq: staticFaqs,
  BlogPost: staticBlogPosts,
  BlogCategory: staticBlogCategories,
  AboutContent: staticAboutContents,
  SocialLink: staticSocialLinks,
  PaintingPlanVisibility: staticPaintingVisibility,
  MaintenanceMode: staticMaintenanceMode,
  Project: staticProjects,
  LandingPage: staticLandingPages,
  Campaign: staticCampaigns,
  AiApprovedAnswer: [],
};

const clone = (value) => JSON.parse(JSON.stringify(value));

function matches(item, criteria = {}) {
  return Object.entries(criteria || {}).every(([key, expected]) => {
    if (expected === undefined) return true;
    const actual = item?.[key];
    if (Array.isArray(expected)) return expected.includes(actual);
    return actual === expected;
  });
}

function sortRows(rows, sortKey) {
  if (!sortKey || typeof sortKey !== "string") return rows;
  const descending = sortKey.startsWith("-");
  const key = descending ? sortKey.slice(1) : sortKey;
  return [...rows].sort((a, b) => {
    const av = a?.[key] ?? "";
    const bv = b?.[key] ?? "";
    if (av === bv) return 0;
    const result = av > bv ? 1 : -1;
    return descending ? -result : result;
  });
}

function entity(name) {
  const source = datasets[name] || [];
  return {
    async list(sortKey, limit) {
      if (typeof sortKey === "number") {
        limit = sortKey;
        sortKey = undefined;
      }
      const rows = sortRows(source, sortKey);
      return clone(limit ? rows.slice(0, limit) : rows);
    },
    async filter(criteria = {}, sortKey, limit) {
      const rows = sortRows(source.filter((row) => matches(row, criteria)), sortKey);
      return clone(limit ? rows.slice(0, limit) : rows);
    },
    async get(id) {
      const row = source.find((x) => String(x.id) === String(id));
      if (!row) throw new Error(`${name} kaydı bulunamadı`);
      return clone(row);
    },
    subscribe() {
      return () => {};
    },
  };
}

function recordLocalEvent(namespace, payload) {
  try {
    if (typeof sessionStorage === "undefined") return;
    const key = `ur_${namespace}`;
    const rows = JSON.parse(sessionStorage.getItem(key) || "[]");
    rows.push({ ...payload, created_at: new Date().toISOString() });
    sessionStorage.setItem(key, JSON.stringify(rows.slice(-100)));
  } catch (_) {}
}

const readOnlyNames = [
  "Service", "ServiceArea", "Faq", "BlogPost", "BlogCategory", "AboutContent",
  "SocialLink", "PaintingPlanVisibility", "MaintenanceMode", "Project", "LandingPage",
  "Campaign", "AiApprovedAnswer",
];

export const siteStore = {
  entities: {
    ...Object.fromEntries(readOnlyNames.map((name) => [name, entity(name)])),
    QuoteRequest: {
      async create(payload) {
        return deliverRequestToWhatsApp(payload);
      },
    },
    ConsentRecord: {
      async bulkCreate() {
        return [];
      },
    },
    AiEvent: {
      async create(payload) {
        recordLocalEvent("assistant_events", payload);
        return { local: true };
      },
    },
    UnansweredQuestion: {
      async create(payload) {
        recordLocalEvent("assistant_unanswered", payload);
        return { local: true };
      },
    },
  },
  integrations: {
    Core: {
      async UploadFile({ file }) {
        if (!file || typeof URL === "undefined") throw new Error("Dosya seçilmedi");
        return { file_url: URL.createObjectURL(file), local_only: true };
      },
    },
  },
};
