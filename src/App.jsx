import { useState, useEffect } from "react";
import { font } from "./theme";
import { Nav, Footer, WhatsAppFAB } from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Portfolio from "./pages/Portfolio";
import { About, FAQ, Blog, Contact } from "./pages/OtherPages";

const PAGES = { home: Home, services: Services, shop: Shop, portfolio: Portfolio, about: About, faq: FAQ, blog: Blog, contact: Contact };

export default function App() {
  const [page, setPage] = useState("home");

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const PageComponent = PAGES[page] || Home;

  return (
    <div style={{ fontFamily: font, background: "#0D1F14", minHeight: "100vh", color: "#F0F4F1" }}>
      <Nav currentPage={page} setPage={setPage} />
      <main>
        <PageComponent setPage={setPage} />
      </main>
      <Footer setPage={setPage} />
      <WhatsAppFAB />
    </div>
  );
}
