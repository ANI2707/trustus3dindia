import { useState, useEffect } from "react";
import { C } from "../theme";
import { Btn, Icon } from "./UI";

/* ── Navbar ─────────────────────────────────────────────────────────────────── */
export function Nav({ currentPage, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Home", page: "home" },
    { label: "Services", page: "services" },
    { label: "Shop", page: "shop" },
    { label: "Portfolio", page: "portfolio" },
    { label: "About", page: "about" },
    { label: "Blog", page: "blog" },
    { label: "Contact", page: "contact" },
  ];

  const go = (page) => { setPage(page); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? "rgba(13,31,20,0.96)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "0.5px solid rgba(34,197,94,0.1)" : "none", transition: "all .3s" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {Icon.cube}
            </div>
            <span style={{ color: C.white, fontWeight: 700, fontSize: 16 }}>Trustus<span style={{ color: C.accent }}>3D</span>India</span>
          </button>

          {/* Desktop */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="nav-desktop">
            {links.slice(0, -1).map(l => (
              <button key={l.page} onClick={() => go(l.page)} style={{ color: currentPage === l.page ? C.accent : C.muted, fontSize: 13, background: "none", border: "none", cursor: "pointer", transition: "color .15s", fontWeight: currentPage === l.page ? 500 : 400 }}>
                {l.label}
              </button>
            ))}
            <Btn primary onClick={() => go("contact")} style={{ padding: "9px 18px", fontSize: 13 }}>Get a quote</Btn>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} className="nav-hamburger" style={{ display: "none", background: "none", border: "none", color: C.white, fontSize: 24, cursor: "pointer" }} aria-label="Menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div style={{ background: C.forestBg, padding: "12px 24px 24px", borderTop: "0.5px solid rgba(34,197,94,0.1)" }}>
            {links.map(l => (
              <button key={l.page} onClick={() => go(l.page)} style={{ display: "block", width: "100%", textAlign: "left", color: currentPage === l.page ? C.accent : C.muted, fontSize: 15, padding: "12px 0", background: "none", border: "none", borderBottom: "0.5px solid rgba(255,255,255,0.05)", cursor: "pointer" }}>
                {l.label}
              </button>
            ))}
            <Btn primary onClick={() => go("contact")} style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>Get a quote</Btn>
          </div>
        )}
      </nav>

      <style>{`
        @media(max-width:768px){ .nav-desktop{display:none!important} .nav-hamburger{display:flex!important} }
        @media(max-width:640px){ .footer-grid{grid-template-columns:1fr 1fr!important} }
        @media(max-width:420px){ .footer-grid{grid-template-columns:1fr!important} }
      `}</style>
    </>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────────── */
export function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const cols = [
    { title: "Services", links: [["3D Printing","services"],["Vacuum Casting","services"],["CAD / CAE","services"],["Product Rendering","services"]] },
    { title: "Company", links: [["About Us","about"],["Portfolio","portfolio"],["Blog","blog"],["FAQ","faq"]] },
    { title: "Quick links", links: [["Get a Quote","contact"],["Shop","shop"],["Contact Us","contact"],["Track Order","contact"]] },
  ];

  return (
    <footer style={{ background: C.sectionDark, padding: "60px 24px 28px", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }} className="footer-grid">
          <div>
            <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>{Icon.cube}</div>
              <span style={{ color: C.white, fontWeight: 700, fontSize: 15 }}>Trustus<span style={{ color: C.accent }}>3D</span>India</span>
            </button>
            <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.8, maxWidth: 220, marginBottom: 16 }}>India's trusted partner for advanced 3D printing, rapid prototyping, and end-to-end product development.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[[Icon.mail,"info@trustus3dindia.com"],[Icon.phone,"+91 98XXX XXXXX"],[Icon.map,"Pune, Maharashtra, India"]].map(([ic,txt],i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: C.faint, fontSize: 12 }}><span style={{ color: C.muted }}>{ic}</span>{txt}</span>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <p style={{ color: C.white, fontSize: 13, fontWeight: 500, marginBottom: 14 }}>{col.title}</p>
              {col.links.map(([label, page]) => (
                <button key={label} onClick={() => go(page)} style={{ display: "block", color: C.muted, fontSize: 12, background: "none", border: "none", cursor: "pointer", padding: "0 0 9px", transition: "color .15s", textAlign: "left" }}
                  onMouseEnter={e => e.target.style.color = C.white}
                  onMouseLeave={e => e.target.style.color = C.muted}>
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <p style={{ color: C.faint, fontSize: 11 }}>© 2024 Trustus3DIndia. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy","Terms of Service","Sitemap"].map(t => (
              <span key={t} style={{ color: C.faint, fontSize: 11, cursor: "pointer" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── WhatsApp FAB ────────────────────────────────────────────────────────────── */
export function WhatsAppFAB() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 1500); return () => clearTimeout(t); }, []);
  return (
    <a href="https://wa.me/91XXXXXXXXXX?text=Hi+I+need+a+3D+print+quote" target="_blank" rel="noopener noreferrer"
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 300, width: 52, height: 52, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 18px rgba(37,211,102,0.4)", textDecoration: "none", transition: "transform .2s, opacity .4s", opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.6)" }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      aria-label="Chat on WhatsApp">
      <span style={{ color: "#fff" }}>{Icon.whatsapp}</span>
    </a>
  );
}
