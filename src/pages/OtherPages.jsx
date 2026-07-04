import { useState } from "react";
import { C } from "../theme";
import { Reveal, Btn, BtnOutline, Tag, SectionLabel, SectionTitle, SectionDesc, PageHero, Icon, Badge, Input, Textarea, Select } from "../components/UI";
import { TESTIMONIALS, BLOG_POSTS, FAQS, TEAM } from "../data";

/* ════════════════════════════════════════════════════════════════════════════
   ABOUT PAGE
════════════════════════════════════════════════════════════════════════════ */
export function About({ setPage }) {
  const values = [
    ["🎯", "Precision", "We hold ourselves to engineering tolerances, not approximations."],
    ["🤝", "Partnership", "We treat every client's project as if it were our own product."],
    ["💡", "Innovation", "We stay ahead of materials, processes, and design techniques."],
    ["⚡", "Speed", "Fast without cutting corners. Efficient by design."],
  ];
  const milestones = [
    ["2018", "Founded in Pune by a team of Tata Technologies engineers."],
    ["2019", "Installed first large-format FDM printer (500×500×600mm)."],
    ["2021", "Expanded to SLA and SLS. Added CAD and rendering services."],
    ["2022", "Crossed 200 client projects. Added vacuum casting capability."],
    ["2023", "Upgraded to 1000×1000×1000mm build volume — largest in Pune."],
    ["2024", "500+ projects delivered. Serving clients across 18 Indian states."],
  ];

  return (
    <>
      <PageHero label="About us" title="India's trusted 3D printing partner" desc="Founded by engineers passionate about precision manufacturing — we bridge the gap between imagination and reality." />

      {/* Story */}
      <section style={{ background: C.forestBg, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="two-col-grid">
          <Reveal>
            <Tag style={{ marginBottom: 16 }}>Our story</Tag>
            <h2 style={{ color: C.white, fontSize: "clamp(22px,3vw,30px)", fontWeight: 500, marginBottom: 16, lineHeight: 1.3 }}>From a workshop to India's precision 3D printing hub</h2>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.85, marginBottom: 14 }}>
              Trustus3DIndia was born out of frustration. Our founders — mechanical engineers with over a decade at leading automotive and aerospace firms — kept hitting the same wall: lead times of 6–8 weeks for simple prototypes, sky-high costs from overseas vendors, and local services that couldn't meet engineering-grade tolerances.
            </p>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.85, marginBottom: 24 }}>
              So in 2018, we built our own facility in Pune. Today, we run one of India's most advanced additive manufacturing operations — with the largest FDM build volume in the region, in-house CAD capability, and a team that treats every project as a precision engineering challenge.
            </p>
            <Btn primary onClick={() => setPage("contact")}>{Icon.mail} Work with us</Btn>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <p style={{ color: C.muted, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Our journey</p>
              {milestones.map(([year, text], i) => (
                <div key={year} style={{ display: "flex", gap: 14, marginBottom: i < milestones.length - 1 ? 16 : 0, position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "0.5px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: C.accent, fontSize: 10, fontWeight: 700 }}>{year.slice(2)}</span>
                    </div>
                    {i < milestones.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.07)", margin: "4px 0" }} />}
                  </div>
                  <div style={{ paddingTop: 6 }}>
                    <span style={{ color: C.accent, fontSize: 11, fontWeight: 600 }}>{year}</span>
                    <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.65, marginTop: 2 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: C.sectionAlt, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal><SectionLabel>What drives us</SectionLabel></Reveal>
          <Reveal delay={60}><SectionTitle light>Our core values</SectionTitle></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 32 }}>
            {values.map(([ic, t, d], i) => (
              <Reveal key={t} delay={i * 70}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 22, textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{ic}</div>
                  <h3 style={{ color: C.white, fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{t}</h3>
                  <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.65 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: C.forestBg, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal><SectionLabel>The team</SectionLabel></Reveal>
          <Reveal delay={60}><SectionTitle light>Meet the people behind the prints</SectionTitle></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 32 }}>
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 22, textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.brandGreen, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 24 }}>{t.emoji}</div>
                  <h3 style={{ color: C.white, fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{t.name}</h3>
                  <p style={{ color: C.accent, fontSize: 11, marginBottom: 10 }}>{t.role}</p>
                  <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.65 }}>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: C.brandGreen, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 24, textAlign: "center" }}>
          {[["500+","Projects"],["6+","Years"],["18","States served"],["100%","On-time rate"]].map(([n, l]) => (
            <Reveal key={l}>
              <div><div style={{ fontSize: 32, fontWeight: 500, color: C.white, marginBottom: 4 }}>{n}</div><div style={{ fontSize: 12, color: "rgba(200,230,210,.7)" }}>{l}</div></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ background: "#0F2D1A", padding: "72px 24px", textAlign: "center", borderTop: "0.5px solid rgba(34,197,94,0.12)" }}>
        <Reveal>
          <h2 style={{ color: C.white, fontSize: 26, fontWeight: 500, marginBottom: 12 }}>Want to work with us?</h2>
          <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>Let's build something remarkable together.</p>
          <Btn primary onClick={() => setPage("contact")}>Get in touch</Btn>
        </Reveal>
      </section>

      <style>{`@media(max-width:640px){.two-col-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   FAQ PAGE
════════════════════════════════════════════════════════════════════════════ */
export function FAQ({ setPage }) {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = FAQS.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PageHero label="FAQ" title="Frequently asked questions" desc="Everything you need to know about our 3D printing services, materials, pricing, and delivery." />

      <section style={{ background: C.forestBg, padding: "60px 24px 88px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Search */}
          <Reveal>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions…" style={{ width: "100%", padding: "13px 18px", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", color: C.offWhite, fontSize: 14, outline: "none", marginBottom: 32, fontFamily: "inherit" }} />
          </Reveal>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ fontSize: 36, marginBottom: 12 }}>🤔</p>
              <p style={{ color: C.muted, fontSize: 14 }}>No results for "{search}". Try a different keyword.</p>
            </div>
          )}

          {filtered.map((faq, i) => (
            <Reveal key={i} delay={i * 40}>
              <div style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, background: "none", border: "none", cursor: "pointer" }}>
                  <span style={{ color: C.white, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>{faq.q}</span>
                  <span style={{ color: C.accent, fontSize: 22, fontWeight: 300, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform .25s", marginTop: -2 }}>+</span>
                </button>
                {open === i && (
                  <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, paddingBottom: 18, animation: "fadeIn .2s ease" }}>{faq.a}</p>
                )}
              </div>
            </Reveal>
          ))}

          {/* Still have questions */}
          <Reveal delay={200}>
            <div style={{ background: "rgba(34,197,94,0.06)", border: "0.5px solid rgba(34,197,94,0.2)", borderRadius: 14, padding: 28, textAlign: "center", marginTop: 48 }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>💬</p>
              <h3 style={{ color: C.white, fontSize: 18, fontWeight: 500, marginBottom: 8 }}>Still have questions?</h3>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>Our team responds within 2 hours on business days.</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <Btn primary onClick={() => setPage("contact")}>{Icon.mail} Send us a message</Btn>
                <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.2)", color: C.white, textDecoration: "none", fontSize: 14 }}>
                  <span style={{ color: "#25D366" }}>{Icon.whatsapp}</span> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   BLOG PAGE
════════════════════════════════════════════════════════════════════════════ */
export function Blog({ setPage }) {
  const [activePost, setActivePost] = useState(null);
  const [catFilter, setCatFilter] = useState("All");
  const cats = ["All", ...Array.from(new Set(BLOG_POSTS.map(p => p.cat)))];
  const filtered = catFilter === "All" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.cat === catFilter);

  if (activePost) return <BlogPost post={activePost} onBack={() => setActivePost(null)} setPage={setPage} />;

  return (
    <>
      <PageHero label="Blog" title="3D printing insights & guides" desc="Practical guides, material comparisons, industry tips, and engineering deep-dives — from our team to yours." />

      <section style={{ background: C.forestBg, padding: "60px 24px 88px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          {/* Category filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCatFilter(c)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 12, cursor: "pointer", transition: "all .2s", background: catFilter === c ? C.accent : "rgba(255,255,255,0.05)", border: `0.5px solid ${catFilter === c ? C.accent : "rgba(255,255,255,0.1)"}`, color: catFilter === c ? C.forestBg : C.muted, fontWeight: catFilter === c ? 600 : 400 }}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <Reveal>
            <div onClick={() => setActivePost(filtered[0])} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden", cursor: "pointer", marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1.5fr" }} className="featured-post-grid"
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
              <div style={{ height: "100%", minHeight: 200, background: C.sectionAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>{filtered[0]?.emoji}</div>
              <div style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                  <Badge color={C.accent}>{filtered[0]?.cat}</Badge>
                  <span style={{ color: C.faint, fontSize: 11 }}>{filtered[0]?.date} · {filtered[0]?.read} read</span>
                  <span style={{ background: C.accent, color: C.forestBg, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, marginLeft: 4 }}>Featured</span>
                </div>
                <h2 style={{ color: C.white, fontSize: 18, fontWeight: 500, lineHeight: 1.35, marginBottom: 10 }}>{filtered[0]?.title}</h2>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{filtered[0]?.desc}</p>
                <span style={{ color: C.accent, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>Read article {Icon.arrow}</span>
              </div>
            </div>
          </Reveal>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
            {filtered.slice(1).map((post, i) => (
              <Reveal key={post.id} delay={i * 60}>
                <div onClick={() => setActivePost(post)} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ height: 90, background: C.sectionAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{post.emoji}</div>
                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                      <Badge color={C.accent}>{post.cat}</Badge>
                      <span style={{ color: C.faint, fontSize: 10 }}>{post.read} read</span>
                    </div>
                    <h3 style={{ color: C.white, fontSize: 13, fontWeight: 500, lineHeight: 1.45, marginBottom: 8 }}>{post.title}</h3>
                    <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.65, marginBottom: 10 }}>{post.desc.substring(0, 90)}…</p>
                    <span style={{ color: C.accent, fontSize: 12, display: "flex", alignItems: "center", gap: 3 }}>Read {Icon.arrow}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <style>{`.featured-post-grid{grid-template-columns:1fr 1.5fr!important} @media(max-width:640px){.featured-post-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  );
}

function BlogPost({ post, onBack, setPage }) {
  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.cat === post.cat).slice(0, 2);
  return (
    <div style={{ background: C.forestBg, minHeight: "100vh", paddingTop: 90 }}>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "40px 24px" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", marginBottom: 28 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to blog
        </button>

        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <Badge color={C.accent}>{post.cat}</Badge>
          <span style={{ color: C.faint, fontSize: 12 }}>{post.date} · {post.read} read</span>
        </div>

        <h1 style={{ color: C.white, fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 500, lineHeight: 1.3, marginBottom: 20 }}>{post.title}</h1>

        <div style={{ height: 200, background: C.sectionAlt, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, marginBottom: 32 }}>{post.emoji}</div>

        <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>{post.desc}</p>

        {/* Simulated article content */}
        {[
          "3D printing has transformed how engineers, designers, and manufacturers approach product development. With access to industrial-grade additive manufacturing no longer limited to large corporations, startups and SMEs across India are now prototyping faster and cheaper than ever before.",
          "Understanding which technology — FDM, SLA, or SLS — to use for a given project is the foundational decision that affects material options, surface finish, dimensional accuracy, and cost.",
          "FDM (Fused Deposition Modelling) remains the most widely used technology. It extrudes thermoplastic filament layer by layer, offering the widest range of materials from basic PLA to engineering-grade Nylon and flexible TPU. For most structural prototypes and functional parts, FDM is the right starting point.",
          "SLA (Stereolithography) uses a UV laser to cure liquid resin. It produces the finest surface finish and highest dimensional accuracy — ideal for jewellery casting patterns, medical devices, and display-quality models. The trade-off is cost and a smaller material selection.",
        ].map((para, i) => <p key={i} style={{ color: C.muted, fontSize: 14, lineHeight: 1.85, marginBottom: 18 }}>{para}</p>)}

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "28px 0" }}>
          {post.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>

        {/* Author */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", padding: "18px 20px", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, marginBottom: 36 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.brandGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👷</div>
          <div>
            <p style={{ color: C.white, fontSize: 13, fontWeight: 500 }}>Trustus3DIndia Engineering Team</p>
            <p style={{ color: C.muted, fontSize: 12 }}>Written by our in-house engineers and manufacturing specialists.</p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "rgba(34,197,94,0.07)", border: "0.5px solid rgba(34,197,94,0.2)", borderRadius: 14, padding: 24, textAlign: "center", marginBottom: 40 }}>
          <h3 style={{ color: C.white, fontSize: 17, fontWeight: 500, marginBottom: 8 }}>Ready to start your project?</h3>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 18 }}>Get a custom quote in 24 hours.</p>
          <Btn primary onClick={() => setPage("contact")}>{Icon.upload} Get a quote</Btn>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <>
            <h3 style={{ color: C.white, fontSize: 16, fontWeight: 500, marginBottom: 16 }}>Related articles</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {related.map(r => (
                <div key={r.id} onClick={() => { window.scrollTo(0, 0); }} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 14, cursor: "pointer" }}>
                  <p style={{ fontSize: 24, marginBottom: 8 }}>{r.emoji}</p>
                  <p style={{ color: C.white, fontSize: 12, fontWeight: 500, lineHeight: 1.4 }}>{r.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   CONTACT PAGE
════════════════════════════════════════════════════════════════════════════ */
export function Contact({ setPage }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", desc: "", qty: "", file: null, budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.desc) setSubmitted(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upd("file", file);
  };

  if (submitted) return (
    <div style={{ background: C.forestBg, minHeight: "100vh", paddingTop: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 440, padding: 24 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 32 }}>✅</div>
        <h2 style={{ color: C.white, fontSize: 26, fontWeight: 500, marginBottom: 12 }}>Quote request received!</h2>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>Thank you, <span style={{ color: C.accent }}>{form.name}</span>! We've received your request and will send a detailed quote to <span style={{ color: C.accent }}>{form.email}</span> within <strong style={{ color: C.white }}>24 hours</strong>.</p>
        <p style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>Need something urgent? WhatsApp us directly for a faster response.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn primary onClick={() => setPage("home")}>Back to home</Btn>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.2)", color: C.white, textDecoration: "none", fontSize: 14 }}>
            <span style={{ color: "#25D366" }}>{Icon.whatsapp}</span> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PageHero label="Contact us" title="Get your free quote" desc="Upload your file or describe your project. We'll respond with a detailed quote within 24 hours — no commitment required." />

      <section style={{ background: C.forestBg, padding: "60px 24px 88px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: 28, alignItems: "start" }} className="contact-grid">

          {/* Form */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32 }}>
            <h2 style={{ color: C.white, fontSize: 20, fontWeight: 500, marginBottom: 6 }}>Request a quote</h2>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>Fill in the form and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-two-col">
                <Input label="Full name *" placeholder="Your name" value={form.name} onChange={e => upd("name", e.target.value)} required />
                <Input label="Email address *" type="email" placeholder="you@company.com" value={form.email} onChange={e => upd("email", e.target.value)} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-two-col">
                <Input label="Phone number" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => upd("phone", e.target.value)} />
                <Select label="Service needed" value={form.service} onChange={e => upd("service", e.target.value)}>
                  <option value="">Select a service…</option>
                  <option>3D Printing (FDM)</option>
                  <option>3D Printing (SLA)</option>
                  <option>3D Printing (SLS)</option>
                  <option>Vacuum Casting</option>
                  <option>CAD / CAE Services</option>
                  <option>Product Rendering</option>
                  <option>Not sure — advise me</option>
                </Select>
              </div>
              <Textarea label="Project description *" rows={4} placeholder="Describe your project, material preferences, tolerances, finish requirements, or any other details…" value={form.desc} onChange={e => upd("desc", e.target.value)} required />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-two-col">
                <Input label="Quantity needed" type="number" placeholder="e.g. 10" value={form.qty} onChange={e => upd("qty", e.target.value)} />
                <Select label="Budget range" value={form.budget} onChange={e => upd("budget", e.target.value)}>
                  <option value="">Select range…</option>
                  <option>Under ₹5,000</option>
                  <option>₹5,000 – ₹20,000</option>
                  <option>₹20,000 – ₹1,00,000</option>
                  <option>Above ₹1,00,000</option>
                </Select>
              </div>

              {/* File upload */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 6 }}>Upload 3D file (optional)</label>
                <div
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-input").click()}
                  style={{ border: `1.5px dashed ${dragging ? C.accent : "rgba(255,255,255,0.15)"}`, borderRadius: 10, padding: "28px 20px", textAlign: "center", cursor: "pointer", background: dragging ? "rgba(34,197,94,0.05)" : "transparent", transition: "all .2s" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{Icon.upload}</div>
                  {form.file ? (
                    <div>
                      <p style={{ color: C.accent, fontSize: 13, fontWeight: 500 }}>✅ {form.file.name}</p>
                      <p style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>({(form.file.size / 1024 / 1024).toFixed(2)} MB)</p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ color: C.muted, fontSize: 13 }}>Drag & drop your file here, or <span style={{ color: C.accent }}>click to browse</span></p>
                      <p style={{ color: C.faint, fontSize: 11, marginTop: 4 }}>STL · STEP · OBJ · 3MF · IGES · PDF — Max 50MB</p>
                    </div>
                  )}
                  <input id="file-input" type="file" accept=".stl,.step,.obj,.3mf,.iges,.pdf" style={{ display: "none" }} onChange={e => upd("file", e.target.files[0])} />
                </div>
              </div>

              <Btn primary type="submit" style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 14 }}>
                {Icon.mail} Submit quote request
              </Btn>
              <p style={{ color: C.faint, fontSize: 11, textAlign: "center", marginTop: 10 }}>We respond within 24 hours · Your files are kept strictly confidential · NDA available on request</p>
            </form>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Contact info */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ color: C.white, fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Contact information</h3>
              {[
                [Icon.phone, "+91 98XXX XXXXX", "Call or WhatsApp"],
                [Icon.mail, "info@trustus3dindia.com", "Email us"],
                [Icon.map, "Pune, Maharashtra, India", "Visit us"],
              ].map(([ic, val, sub], i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < 2 ? 14 : 0, alignItems: "flex-start" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: C.accent, flexShrink: 0 }}>{ic}</div>
                  <div><p style={{ color: C.white, fontSize: 13, fontWeight: 500 }}>{val}</p><p style={{ color: C.muted, fontSize: 11 }}>{sub}</p></div>
                </div>
              ))}
            </div>

            {/* WhatsApp quick */}
            <a href="https://wa.me/91XXXXXXXXXX?text=Hi+I+need+a+3D+print+quote" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "rgba(37,211,102,0.08)", border: "0.5px solid rgba(37,211,102,0.25)", borderRadius: 14, textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(37,211,102,0.14)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(37,211,102,0.08)"}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff" }}>{Icon.whatsapp}</span>
              </div>
              <div>
                <p style={{ color: C.white, fontSize: 13, fontWeight: 500 }}>WhatsApp us</p>
                <p style={{ color: "#4ade80", fontSize: 11 }}>Usually replies in under 1 hour</p>
              </div>
            </a>

            {/* Business hours */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ color: C.white, fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Business hours</h3>
              {[["Monday – Friday", "9:00 AM – 7:00 PM"], ["Saturday", "10:00 AM – 4:00 PM"], ["Sunday", "Closed"]].map(([d, h]) => (
                <div key={d} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: C.muted, fontSize: 12 }}>{d}</span>
                  <span style={{ color: h === "Closed" ? "#ef4444" : C.accent, fontSize: 12 }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Why us quick */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 22 }}>
              <h3 style={{ color: C.white, fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Why request a quote?</h3>
              {["Free, no-obligation estimate", "Response within 24 hours", "NDA signing available", "Expert material recommendation", "PAN India delivery included"].map(r => (
                <div key={r} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  <span style={{ color: C.accent, flexShrink: 0 }}>{Icon.check}</span>
                  <span style={{ color: C.muted, fontSize: 12 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}
        @media(max-width:480px){.form-two-col{grid-template-columns:1fr!important}}
      `}</style>
    </>
  );
}
