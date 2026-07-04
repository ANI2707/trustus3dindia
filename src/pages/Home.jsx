import { useState } from "react";
import { C } from "../theme";
import { Reveal, Btn, BtnOutline, Tag, SectionLabel, SectionTitle, SectionDesc, Card, Icon, Badge } from "../components/UI";
import { SERVICES, MATERIALS, PORTFOLIO, TESTIMONIALS } from "../data";

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero({ setPage }) {
  return (
    <section style={{ background: C.forestBg, minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: `linear-gradient(${C.accent} 1px,transparent 1px),linear-gradient(90deg,${C.accent} 1px,transparent 1px)`, backgroundSize: "36px 36px" }} />
      <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(34,197,94,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px 100px", width: "100%", position: "relative", textAlign: "center" }}>
        <div style={{ opacity: 0, animation: "fadeUp .7s .1s forwards" }}>
          <Tag style={{ marginBottom: 24 }}>India's precision 3D printing experts</Tag>
        </div>
        <h1 style={{ color: C.white, fontSize: "clamp(32px,5vw,58px)", fontWeight: 500, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-.02em", opacity: 0, animation: "fadeUp .7s .2s forwards" }}>
          From concept to creation —<br /><span style={{ color: C.accent }}>we print your vision</span>
        </h1>
        <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.8, maxWidth: 560, margin: "0 auto 32px", opacity: 0, animation: "fadeUp .7s .3s forwards" }}>
          End-to-end 3D printing, CAD design, and rapid prototyping with build volumes up to 1000 × 1000 × 1000 mm and 6+ industrial-grade materials.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 36, opacity: 0, animation: "fadeUp .7s .4s forwards" }}>
          {["FDM · SLA · SLS", "1000mm build volume", "Multicolor printing", "24-hr quote turnaround"].map(p => <Tag key={p}>{p}</Tag>)}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", opacity: 0, animation: "fadeUp .7s .5s forwards" }}>
          <Btn primary onClick={() => setPage("contact")}>{Icon.upload} Get instant quote</Btn>
          <Btn onClick={() => setPage("portfolio")}>{Icon.eye} View our work</Btn>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 40, flexWrap: "wrap", opacity: 0, animation: "fadeUp .7s .6s forwards" }}>
          {["ISO-grade precision", "500+ projects delivered", "Doorstep delivery PAN India"].map((item, i) => (
            <span key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {i > 0 && <span style={{ color: C.faint, margin: "0 4px" }}>·</span>}
              <span style={{ color: C.accent }}>{Icon.check}</span>
              <span style={{ color: C.faint, fontSize: 12 }}>{item}</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}

/* ── Services overview ───────────────────────────────────────────────────────── */
function ServicesOverview({ setPage }) {
  return (
    <section style={{ background: C.sectionAlt, padding: "88px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionLabel>What we do</SectionLabel></Reveal>
        <Reveal delay={60}><SectionTitle light>End-to-end manufacturing services</SectionTitle></Reveal>
        <Reveal delay={100}><SectionDesc light>From a rough sketch to a finished part — under one roof.</SectionDesc></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <Card onClick={() => setPage("services")} style={{ height: "100%" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ color: C.white, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{s.short}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                  {s.tags.slice(0, 3).map(t => <span key={t} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)", color: "#7a9a86" }}>{t}</span>)}
                </div>
                <span style={{ fontSize: 12, color: C.accent, display: "flex", alignItems: "center", gap: 4 }}>Learn more {Icon.arrow}</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats ───────────────────────────────────────────────────────────────────── */
function Stats() {
  return (
    <section style={{ background: C.forestBg, padding: "60px 24px", borderTop: "0.5px solid rgba(34,197,94,0.1)", borderBottom: "0.5px solid rgba(34,197,94,0.1)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 1, background: "rgba(34,197,94,0.08)", borderRadius: 12, overflow: "hidden" }}>
        {[["500+","Projects delivered"],["1000mm","Max build volume"],["6+","Materials"],["24hr","Quote turnaround"],["PAN India","Shipping"]].map((s, i) => (
          <Reveal key={i} delay={i * 60}>
            <div style={{ background: C.forestBg, padding: "30px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 500, color: C.accent, marginBottom: 6 }}>{s[0]}</div>
              <div style={{ fontSize: 11, color: C.faint, lineHeight: 1.5 }}>{s[1]}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Why us ──────────────────────────────────────────────────────────────────── */
function WhyUs() {
  const items = [
    ["🎯","Expert-led precision","Every project is handled by qualified engineers, not just machine operators."],
    ["🔄","Design to delivery","CAD, print, finish — under one roof. No handoffs, no delays."],
    ["💰","Cost-effective","Competitive pricing with zero compromise on quality."],
    ["🎛️","Full customization","Material, color, finish, size — every parameter tailored."],
    ["🏭","Large-format","One of few services in India offering 1000×1000×1000mm in a single print."],
    ["🚚","PAN India delivery","Safely packed and shipped to your doorstep, anywhere in India."],
  ];
  return (
    <section style={{ background: C.sectionAlt, padding: "88px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionLabel>Why choose us</SectionLabel></Reveal>
        <Reveal delay={60}><SectionTitle light>Built for precision, designed for results</SectionTitle></Reveal>
        <Reveal delay={100}><SectionDesc light>We combine engineering expertise with manufacturing capability.</SectionDesc></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 12 }}>
          {items.map(([ic, t, d], i) => (
            <Reveal key={t} delay={i * 60}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 18px", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{ic}</div>
                <div><p style={{ color: C.offWhite, fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{t}</p><p style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>{d}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Process ─────────────────────────────────────────────────────────────────── */
function Process({ setPage }) {
  const steps = [
    [Icon.upload,"Share your file","Upload STL, STEP, OBJ — or describe your idea."],
    [Icon.mail,"Get a quote","Receive a custom price within 24 hours."],
    ["⚙️","We manufacture","Precision printing and finishing by our engineers."],
    [Icon.cart,"Delivered to you","Safely packed and shipped anywhere in India."],
  ];
  return (
    <section style={{ background: C.brandGreen, padding: "88px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionLabel>How it works</SectionLabel></Reveal>
        <Reveal delay={60}><SectionTitle light>From file to finished part in 4 steps</SectionTitle></Reveal>
        <Reveal delay={100}><SectionDesc light>Fast, transparent, and hassle-free.</SectionDesc></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, position: "relative" }}>
          {steps.map(([ic, t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div style={{ textAlign: "center", padding: "0 12px" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: typeof ic === "string" ? 22 : 16, color: C.forestBg }}>
                  {typeof ic === "string" ? ic : <span style={{ color: C.forestBg }}>{ic}</span>}
                </div>
                <p style={{ color: C.white, fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{t}</p>
                <p style={{ color: "rgba(160,210,180,.75)", fontSize: 12, lineHeight: 1.65 }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Btn primary onClick={() => setPage("contact")}>{Icon.upload} Start your project</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Materials teaser ────────────────────────────────────────────────────────── */
function MaterialsTeaser({ setPage }) {
  const [active, setActive] = useState(0);
  return (
    <section style={{ background: C.forestBg, padding: "88px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionLabel>Materials</SectionLabel></Reveal>
        <Reveal delay={60}><SectionTitle light>6+ industrial-grade materials</SectionTitle></Reveal>
        <Reveal delay={100}><SectionDesc light>From flexible TPU to engineering-grade Nylon and photopolymer Resin.</SectionDesc></Reveal>
        <Reveal delay={140}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 24 }}>
            {MATERIALS.map((m, i) => (
              <button key={m.name} onClick={() => setActive(i)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 8, border: `0.5px solid ${active === i ? m.color : "rgba(255,255,255,0.1)"}`, background: active === i ? `${m.color}18` : "rgba(255,255,255,0.04)", color: active === i ? m.color : C.muted, fontSize: 13, fontWeight: active === i ? 600 : 400, cursor: "pointer", transition: "all .2s" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, display: "inline-block" }} />
                {m.name}
              </button>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: `0.5px solid ${MATERIALS[active].color}30`, borderRadius: 12, padding: "20px 24px", maxWidth: 500, margin: "0 auto 28px", textAlign: "center", transition: "all .3s" }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{MATERIALS[active].tech}</div>
            <div style={{ fontSize: 22, fontWeight: 500, color: MATERIALS[active].color, marginBottom: 8 }}>{MATERIALS[active].name}</div>
            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{MATERIALS[active].desc}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <BtnOutline onClick={() => setPage("services")}>See all materials & specs {Icon.arrow}</BtnOutline>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Portfolio teaser ────────────────────────────────────────────────────────── */
function PortfolioTeaser({ setPage }) {
  return (
    <section style={{ background: C.sectionAlt, padding: "88px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionLabel>Our work</SectionLabel></Reveal>
        <Reveal delay={60}><SectionTitle light>Projects we're proud of</SectionTitle></Reveal>
        <Reveal delay={100}><SectionDesc light>From aerospace to consumer products — across India.</SectionDesc></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          {PORTFOLIO.slice(0, 6).map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "0.5px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "transform .2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                onClick={() => setPage("portfolio")}>
                <div style={{ height: 100, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, position: "relative" }}>
                  {p.emoji}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: p.accent }} />
                </div>
                <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.03)" }}>
                  <p style={{ color: C.white, fontSize: 12, fontWeight: 500, marginBottom: 3 }}>{p.title}</p>
                  <p style={{ color: C.muted, fontSize: 11 }}>{p.cat} · {p.material} · {p.industry}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <BtnOutline onClick={() => setPage("portfolio")}>View all projects {Icon.arrow}</BtnOutline>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section style={{ background: C.forestBg, padding: "88px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionLabel>Client testimonials</SectionLabel></Reveal>
        <Reveal delay={60}><SectionTitle light>What our clients say</SectionTitle></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14, marginTop: 36 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 20, height: "100%" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: "#FBBF24", fontSize: 12 }}>{Icon.star}</span>)}
                </div>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, fontStyle: "italic", marginBottom: 16 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.brandGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: C.accent, flexShrink: 0 }}>{t.init}</div>
                  <div><p style={{ color: C.white, fontSize: 12, fontWeight: 500 }}>{t.name}</p><p style={{ color: C.faint, fontSize: 11 }}>{t.role}, {t.company}</p></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ──────────────────────────────────────────────────────────────── */
function CtaBanner({ setPage }) {
  return (
    <section style={{ background: "#0F2D1A", padding: "88px 24px", borderTop: "0.5px solid rgba(34,197,94,0.15)", textAlign: "center" }}>
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <Reveal>
          <Tag style={{ marginBottom: 18 }}>⚡ Get started today</Tag>
          <h2 style={{ color: C.white, fontSize: "clamp(24px,3.5vw,32px)", fontWeight: 500, margin: "14px 0 12px", lineHeight: 1.25 }}>Ready to bring your idea to life?</h2>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, marginBottom: 30 }}>Upload your 3D file or describe your project. We'll respond with a custom quote within 24 hours.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn primary onClick={() => setPage("contact")} style={{ padding: "13px 26px", fontSize: 14 }}>{Icon.upload} Upload file & get quote</Btn>
            <a href="https://wa.me/91XXXXXXXXXX?text=Hi+I+need+a+3D+print+quote" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 22px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)", color: C.white, fontSize: 14, textDecoration: "none" }}>
              <span style={{ color: "#25D366" }}>{Icon.whatsapp}</span> WhatsApp us
            </a>
          </div>
          <p style={{ color: C.faint, fontSize: 11, marginTop: 18 }}>No commitment · Free consultation · PAN India delivery</p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <ServicesOverview setPage={setPage} />
      <Stats />
      <WhyUs />
      <Process setPage={setPage} />
      <MaterialsTeaser setPage={setPage} />
      <PortfolioTeaser setPage={setPage} />
      <Testimonials />
      <CtaBanner setPage={setPage} />
    </>
  );
}
