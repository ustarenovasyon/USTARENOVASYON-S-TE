import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceResolver from "./pages/ServiceResolver";
import About from "./pages/About";
import TeklifAl from "./pages/TeklifAl";
import UcretsizKesif from "./pages/UcretsizKesif";
import Iletisim from "./pages/Iletisim";
import Gizlilik from "./pages/Gizlilik";
import Kvkk from "./pages/Kvkk";
import CerezPolitikasi from "./pages/CerezPolitikasi";
import KullanimSartlari from "./pages/KullanimSartlari";
import Blog from "./pages/Blog";
import BlogCategory from "./pages/BlogCategory";
import BlogDetail from "./pages/BlogDetail";
import Sss from "./pages/Sss";
import HizmetBolgeleri from "./pages/HizmetBolgeleri";
import DistrictDetail from "./pages/DistrictDetail";
import KvkkAydinlatma from "./pages/KvkkAydinlatma";
import GizlilikPolitikasi from "./pages/GizlilikPolitikasi";
import SiteLayout from "@/components/layout/SiteLayout";

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/hizmetler" element={<Services />} />
            <Route path="/hizmetler/:slug" element={<ServiceResolver />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/teklif-al" element={<TeklifAl />} />
            <Route path="/ucretsiz-kesif" element={<UcretsizKesif />} />
            <Route path="/iletisim" element={<Iletisim />} />
            <Route path="/gizlilik" element={<Gizlilik />} />
            <Route path="/kvkk" element={<Kvkk />} />
            <Route path="/cerez-politikasi" element={<CerezPolitikasi />} />
            <Route path="/kullanim-sartlari" element={<KullanimSartlari />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/kategori/:slug" element={<BlogCategory />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/sik-sorulan-sorular" element={<Sss />} />
            <Route path="/hizmet-bolgeleri" element={<HizmetBolgeleri />} />
            <Route path="/hizmet-bolgeleri/:slug" element={<DistrictDetail />} />
            <Route path="/kvkk-aydinlatma-metni" element={<KvkkAydinlatma />} />
            <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}
