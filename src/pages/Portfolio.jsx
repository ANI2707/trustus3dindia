import { useState } from "react";
import { C } from "../theme";
import { Reveal, Btn, BtnOutline, Tag, SectionLabel, SectionTitle, SectionDesc, PageHero, Icon, Badge } from "../components/UI";
import { PORTFOLIO, TESTIMONIALS } from "../data";
import Portfolio360Viewer from "../components/Portfolio360Viewer";
function CaseStudyModal({ project, onClose, setPage }) {
  if (!project) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 400 }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(620px,95vw)", background: "#0d1f14", border: `0.5px solid ${project.accent}40`, borderRadius: 18, zIndex: 500, padding: 32, maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, background: project.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: `2px solid ${project.accent}40` }}>
            {project.emoji}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ marginBottom: 6 }}>
          <Badge color={project.accent}>{project.industry}</Badge>
          <span style={{ marginLeft: 8 }}><Badge color="#60A5FA">{project.cat}</Badge></span>
        </div>

        <h2 style={{ color: C.white, fontSize: 22, fontWeight: 500, margin: "12px 0 10px", lineHeight: 1.3 }}>{project.title}</h2>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{project.desc}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[["Material", project.material], ["Technology", project.cat], ["Client", project.client]].map(([label, val]) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px" }}>
              <p style={{ color: C.faint, fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
              <p style={{ color: C.white, fontSize: 13 }}>{val}</p>
            </div>
          ))}
        </div>

        {/* Results */}
        <div style={{ background: `${project.accent}0d`, border: `0.5px solid ${project.accent}30`, borderRadius: 10, padding: "16px 18px", marginBottom: 24 }}>
          <p style={{ color: project.accent, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Project outcomes</p>
          {["Delivered on schedule with zero defects", "Client approved on first review — no rework", "Cost 60% lower than traditional manufacturing"].map(r => (
            <div key={r} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <span style={{ color: project.accent }}>{Icon.check}</span>
              <span style={{ color: C.offWhite, fontSize: 13 }}>{r}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Btn primary onClick={() => { onClose(); setPage("contact"); }} style={{ flex: 1, justifyContent: "center" }}>Start a similar project</Btn>
          <BtnOutline onClick={onClose}>Close</BtnOutline>
        </div>
      </div>
    </>
  );
}

export default function Portfolio({ setPage }) {
  const industries = ["All", ...Array.from(new Set(PORTFOLIO.map(p => p.industry)))];
  const techs = ["All", "FDM", "SLA", "SLS"];
  const [indFilter, setIndFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = PORTFOLIO.filter(p =>
    (indFilter === "All" || p.industry === indFilter) &&
    (techFilter === "All" || p.cat === techFilter)
  );

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Work we're proud of"
        desc="Real projects, real clients, real results. Browse our work across industries and 3D printing technologies."
      />

      <section style={{ background: C.forestBg, padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Portfolio360Viewer />
        </div>
      </section>

      <section style={{ background: C.forestBg, padding: "60px 24px 88px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          {/* Filters */}
          <div style={{ marginBottom: 32 }}>
            <p
              style={{
                color: C.muted,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Industry
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 16,
              }}
            >
              {industries.map((f) => (
                <button
                  key={f}
                  onClick={() => setIndFilter(f)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 20,
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all .2s",
                    background:
                      indFilter === f ? C.accent : "rgba(255,255,255,0.05)",
                    border: `0.5px solid ${indFilter === f ? C.accent : "rgba(255,255,255,0.1)"}`,
                    color: indFilter === f ? C.forestBg : C.muted,
                    fontWeight: indFilter === f ? 600 : 400,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <p
              style={{
                color: C.muted,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Technology
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {techs.map((f) => (
                <button
                  key={f}
                  onClick={() => setTechFilter(f)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 20,
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all .2s",
                    background:
                      techFilter === f ? "#3B82F6" : "rgba(255,255,255,0.05)",
                    border: `0.5px solid ${techFilter === f ? "#3B82F6" : "rgba(255,255,255,0.1)"}`,
                    color: techFilter === f ? "#fff" : C.muted,
                    fontWeight: techFilter === f ? 600 : 400,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <p style={{ color: C.faint, fontSize: 12, marginBottom: 20 }}>
            {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
          </p>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 14,
            }}
          >
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <div
                  onClick={() => setSelected(p)}
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "0.5px solid rgba(255,255,255,0.07)",
                    cursor: "pointer",
                    transition: "all .2s",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = p.accent + "60";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      height: 120,
                      background: p.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 40,
                      position: "relative",
                    }}
                  >
                    {p.emoji}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: p.accent,
                      }}
                    />
                    <span style={{ position: "absolute", top: 10, right: 10 }}>
                      <Badge color={p.accent}>{p.cat}</Badge>
                    </span>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <p
                      style={{
                        color: "#6b9e80",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {p.industry}
                    </p>
                    <h3
                      style={{
                        color: C.white,
                        fontSize: 13,
                        fontWeight: 500,
                        marginBottom: 5,
                        lineHeight: 1.4,
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        color: C.muted,
                        fontSize: 12,
                        lineHeight: 1.6,
                        marginBottom: 10,
                      }}
                    >
                      {p.desc.substring(0, 80)}...
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: C.muted, fontSize: 11 }}>
                        {p.material} · {p.client}
                      </span>
                      <span
                        style={{
                          color: C.accent,
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        View {Icon.arrow}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 24px" }}>
              <p style={{ fontSize: 40, marginBottom: 14 }}>🔍</p>
              <p style={{ color: C.muted, fontSize: 14 }}>
                No projects match those filters. Try a different combination.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials strip */}
      <section style={{ background: C.sectionAlt, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>Client feedback</SectionLabel>
          </Reveal>
          <Reveal delay={60}>
            <SectionTitle light>What our clients say</SectionTitle>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 14,
              marginTop: 32,
            }}
          >
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    padding: 20,
                  }}
                >
                  <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                    {[...Array(t.rating)].map((_, j) => (
                      <span key={j} style={{ color: "#FBBF24", fontSize: 12 }}>
                        {Icon.star}
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      color: C.muted,
                      fontSize: 13,
                      lineHeight: 1.7,
                      fontStyle: "italic",
                      marginBottom: 14,
                    }}
                  >
                    "{t.quote}"
                  </p>
                  <div
                    style={{ display: "flex", gap: 10, alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: C.brandGreen,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 600,
                        color: C.accent,
                      }}
                    >
                      {t.init}
                    </div>
                    <div>
                      <p
                        style={{
                          color: C.white,
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        {t.name}
                      </p>
                      <p style={{ color: C.faint, fontSize: 11 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#0F2D1A",
          padding: "72px 24px",
          textAlign: "center",
          borderTop: "0.5px solid rgba(34,197,94,0.12)",
        }}
      >
        <Reveal>
          <Tag style={{ marginBottom: 16 }}>Your project next</Tag>
          <h2
            style={{
              color: C.white,
              fontSize: 26,
              fontWeight: 500,
              margin: "14px 0 12px",
            }}
          >
            Ready to be in our portfolio?
          </h2>
          <p
            style={{
              color: C.muted,
              fontSize: 14,
              marginBottom: 24,
              maxWidth: 400,
              margin: "0 auto 24px",
            }}
          >
            Let's build something remarkable together.
          </p>
          <Btn primary onClick={() => setPage("contact")}>
            {Icon.upload} Start your project
          </Btn>
        </Reveal>
      </section>

      <CaseStudyModal
        project={selected}
        onClose={() => setSelected(null)}
        setPage={setPage}
      />
    </>
  );
}
