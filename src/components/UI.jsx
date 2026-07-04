import { useEffect, useRef, useState } from "react";
import { C } from "../theme";

/* ── Scroll reveal ─────────────────────────────────────────────────────────── */
export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

export function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ── Buttons ───────────────────────────────────────────────────────────────── */
export function Btn({ children, primary, onClick, href, style = {}, type = "button" }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: primary ? "12px 26px" : "12px 22px",
    borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer",
    border: primary ? "none" : "0.5px solid rgba(255,255,255,0.25)",
    background: primary ? C.accent : "rgba(255,255,255,0.07)",
    color: primary ? C.forestBg : C.white, textDecoration: "none",
    transition: "opacity .15s, transform .15s", letterSpacing: ".01em",
    ...style,
  };
  const hover = e => { e.currentTarget.style.opacity = ".82"; e.currentTarget.style.transform = "translateY(-1px)"; };
  const leave = e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; };
  if (href) return <a href={href} style={base} onMouseEnter={hover} onMouseLeave={leave}>{children}</a>;
  return <button type={type} onClick={onClick} style={base} onMouseEnter={hover} onMouseLeave={leave}>{children}</button>;
}

export function BtnOutline({ children, onClick, href, style = {} }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", border: `0.5px solid rgba(255,255,255,0.2)`, background: "transparent", color: C.offWhite, textDecoration: "none", transition: "all .15s", ...style };
  if (href) return <a href={href} style={base}>{children}</a>;
  return <button onClick={onClick} style={base}>{children}</button>;
}

/* ── Tags / Chips ──────────────────────────────────────────────────────────── */
export function Tag({ children, style = {} }) {
  return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, background: "rgba(34,197,94,0.12)", border: "0.5px solid rgba(34,197,94,0.3)", color: C.accentDim, ...style }}>{children}</span>;
}

export function Chip({ children, color, active, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 12, cursor: "pointer", transition: "all .2s", background: active ? C.accent : "rgba(255,255,255,0.05)", border: `0.5px solid ${active ? C.accent : "rgba(255,255,255,0.1)"}`, color: active ? C.forestBg : C.muted, fontWeight: active ? 600 : 400 }}>
      {children}
    </button>
  );
}

/* ── Section typography ────────────────────────────────────────────────────── */
export function SectionLabel({ children }) {
  return <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: C.faint, marginBottom: 8, textAlign: "center" }}>{children}</p>;
}
export function SectionTitle({ children, light, align = "center" }) {
  return <h2 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 500, color: light ? C.white : C.offWhite, textAlign: align, margin: "0 0 10px", lineHeight: 1.25 }}>{children}</h2>;
}
export function SectionDesc({ children, light, align = "center" }) {
  return <p style={{ fontSize: 14, color: light ? C.muted : "#6b9e80", textAlign: align, maxWidth: 520, margin: align === "center" ? "0 auto 36px" : "0 0 36px", lineHeight: 1.8 }}>{children}</p>;
}

/* ── Card ──────────────────────────────────────────────────────────────────── */
export function Card({ children, style = {}, onClick, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? C.cardBg : "rgba(255,255,255,0.03)", border: `0.5px solid ${hov ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.08)"}`, borderRadius: 14, padding: 22, transition: "all .25s", cursor: onClick ? "pointer" : "default", ...style }}>
      {children}
    </div>
  );
}

/* ── Input / Textarea / Select ─────────────────────────────────────────────── */
const inputBase = { width: "100%", padding: "11px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: C.offWhite, fontSize: 13, outline: "none", transition: "border-color .2s", fontFamily: "'Inter','Segoe UI',sans-serif" };

export function Input({ label, ...props }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 5 }}>{label}</label>}
      <input {...props} style={{ ...inputBase, borderColor: focus ? C.accent : "rgba(255,255,255,0.12)" }} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
    </div>
  );
}

export function Textarea({ label, rows = 4, ...props }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 5 }}>{label}</label>}
      <textarea rows={rows} {...props} style={{ ...inputBase, borderColor: focus ? C.accent : "rgba(255,255,255,0.12)", resize: "vertical" }} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
    </div>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 5 }}>{label}</label>}
      <select {...props} style={{ ...inputBase, cursor: "pointer" }}>{children}</select>
    </div>
  );
}

/* ── Badge ─────────────────────────────────────────────────────────────────── */
export function Badge({ children, color = C.accent }) {
  return <span style={{ display: "inline-block", padding: "2px 9px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: `${color}20`, border: `0.5px solid ${color}50`, color }}>{children}</span>;
}

/* ── Divider ───────────────────────────────────────────────────────────────── */
export function Divider() {
  return <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0" }} />;
}

/* ── Page wrapper ──────────────────────────────────────────────────────────── */
export function PageHero({ label, title, desc, children }) {
  return (
    <section style={{ background: C.forestBg, padding: "120px 24px 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: `linear-gradient(${C.accent} 1px,transparent 1px),linear-gradient(90deg,${C.accent} 1px,transparent 1px)`, backgroundSize: "36px 36px" }} />
      <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
        {label && <Tag style={{ marginBottom: 18 }}>{label}</Tag>}
        <h1 style={{ color: C.white, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500, lineHeight: 1.2, margin: "12px 0 14px", letterSpacing: "-.02em" }}>{title}</h1>
        {desc && <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8 }}>{desc}</p>}
        {children}
      </div>
    </section>
  );
}

/* ── SVG Icons ─────────────────────────────────────────────────────────────── */
export const Icon = {
  cube: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  upload: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  phone: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  map: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  cart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  whatsapp: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
};
