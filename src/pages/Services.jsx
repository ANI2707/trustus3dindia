import { useState } from "react";
import { C } from "../theme";
import { Reveal, Btn, BtnOutline, Tag, SectionLabel, SectionTitle, SectionDesc, PageHero, Icon, Badge } from "../components/UI";
import { SERVICES, MATERIALS } from "../data";

function ServiceDetail({ s, setPage }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="service-detail-grid">
        <div style={{ padding: "36px 32px", borderRight: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16 }}>{s.icon}</div>
          <h3 style={{ color: C.white, fontSize: 20, fontWeight: 500, marginBottom: 10 }}>{s.title}</h3>
          <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.8, marginBottom: 18 }}>{s.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {s.tags.map(t => <span key={t} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: `${s.color}15`, border: `0.5px solid ${s.color}40`, color: s.color }}>{t}</span>)}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ color: C.accent, fontSize: 14, fontWeight: 500 }}>{s.price}</span>
            <span style={{ color: C.faint, fontSize: 12 }}>· {s.turnaround}</span>
          </div>
          <div style={{ marginTop: 20 }}>
            <Btn primary onClick={() => setPage("contact")} style={{ padding: "10px 20px", fontSize: 13 }}>{Icon.upload} Get quote for this service</Btn>
          </div>
        </div>
        <div style={{ padding: "36px 32px" }}>
          <p style={{ color: C.muted, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>What's included</p>
          {s.features.map(f => (
            <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ color: C.accent, marginTop: 2, flexShrink: 0 }}>{Icon.check}</span>
              <span style={{ color: C.offWhite, fontSize: 13, lineHeight: 1.6 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaterialComparison() {
  const [active, setActive] = useState(null);

  return (
    <section style={{ background: C.sectionAlt, padding: "88px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionLabel>Materials</SectionLabel></Reveal>
        <Reveal delay={60}><SectionTitle light>Choose the right material</SectionTitle></Reveal>
        <Reveal delay={100}><SectionDesc light>Hover a material to see detailed properties.</SectionDesc></Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
          {MATERIALS.map((m, i) => (
            <Reveal key={m.name} delay={i * 50}>
              <div onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                style={{ background: active === i ? `${m.color}10` : "rgba(255,255,255,0.03)", border: `0.5px solid ${active === i ? m.color + "60" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: 20, transition: "all .25s", cursor: "default" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: m.color, display: "inline-block", flexShrink: 0 }} />
                  <span style={{ color: C.white, fontSize: 15, fontWeight: 500 }}>{m.name}</span>
                  <span style={{ marginLeft: "auto" }}><Badge color={m.color}>{m.tech}</Badge></span>
                </div>
                <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.65, marginBottom: 14 }}>{m.desc}</p>
                {/* Property bars */}
                {[["Strength", m.props.strength], ["Flexibility", m.props.flex], ["Heat resistance", m.props.heat], ["Detail quality", m.props.detail]].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: C.muted }}>{label}</span>
                      <span style={{ fontSize: 10, color: C.muted }}>{val}%</span>
                    </div>
                    <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: active === i ? `${val}%` : "0%", height: "100%", background: m.color, transition: "width .5s ease", borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    ["What's the minimum wall thickness?", "FDM: 0.8mm minimum. SLA: 0.5mm. SLS: 0.7mm. We recommend 1.2mm+ for structural parts."],
    ["Can you print parts over 500mm?", "Yes — our flagship printer supports up to 1000×1000×1000mm in a single run. Larger than that, we print in segments and bond them."],
    ["Do you accept rush orders?", "Yes. 48-hour express service is available for most FDM prints at an additional 50% surcharge."],
  ];
  const [open, setOpen] = useState(null);
  return (
    <section style={{ background: C.forestBg, padding: "60px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Reveal><SectionTitle light align="center">Common service questions</SectionTitle></Reveal>
        <div style={{ marginTop: 28 }}>
          {faqs.map(([q, a], i) => (
            <Reveal key={q} delay={i * 60}>
              <div style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", color: C.white, fontSize: 14, cursor: "pointer", fontWeight: 500 }}>
                  {q}
                  <span style={{ color: C.accent, fontSize: 20, transform: open === i ? "rotate(45deg)" : "none", transition: "transform .2s", flexShrink: 0, marginLeft: 12 }}>+</span>
                </button>
                {open === i && <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, paddingBottom: 16 }}>{a}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Services({ setPage }) {
  return (
    <>
      <PageHero label="Our services" title="Precision manufacturing, end to end" desc="Every service we offer is built around one goal — delivering exactly what you need, faster and better than you expected." />

      <section style={{ background: C.forestBg, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal><SectionLabel>Services</SectionLabel></Reveal>
          <Reveal delay={60}><SectionTitle light>What we offer</SectionTitle></Reveal>
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <ServiceDetail s={s} setPage={setPage} />
            </Reveal>
          ))}
        </div>
      </section>

      <MaterialComparison />
      <Faq />

      {/* CTA */}
      <section style={{ background: "#0F2D1A", padding: "72px 24px", textAlign: "center", borderTop: "0.5px solid rgba(34,197,94,0.15)" }}>
        <Reveal>
          <Tag style={{ marginBottom: 16 }}>Start your project</Tag>
          <h2 style={{ color: C.white, fontSize: 26, fontWeight: 500, margin: "14px 0 12px" }}>Not sure which service you need?</h2>
          <p style={{ color: C.muted, fontSize: 14, marginBottom: 24, maxWidth: 420, margin: "0 auto 24px" }}>Tell us about your project and we'll recommend the best approach — free of charge.</p>
          <Btn primary onClick={() => setPage("contact")}>{Icon.mail} Talk to our engineers</Btn>
        </Reveal>
      </section>

      <style>{`.service-detail-grid{grid-template-columns:1fr 1fr!important} @media(max-width:640px){.service-detail-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  );
}
