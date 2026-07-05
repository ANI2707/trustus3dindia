import { useEffect, useRef, useState, useCallback } from "react";
import { C } from "../theme";
import { PORTFOLIO } from "../data";

/* ── 3D math helpers ──────────────────────────────────────────────────────── */
const rotXM = (a) => {
  const c = Math.cos(a), s = Math.sin(a);
  return [1,0,0,0, 0,c,-s,0, 0,s,c,0, 0,0,0,1];
};
const rotYM = (a) => {
  const c = Math.cos(a), s = Math.sin(a);
  return [c,0,s,0, 0,1,0,0, -s,0,c,0, 0,0,0,1];
};
const mat4Mul = (a, b) => {
  const r = new Array(16).fill(0);
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      for (let k = 0; k < 4; k++)
        r[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
  return r;
};
const project = (p, M, W, H, Z, zoom) => {
  const x = M[0]*p[0]+M[1]*p[1]+M[2]*p[2]+M[3];
  const y = M[4]*p[0]+M[5]*p[1]+M[6]*p[2]+M[7];
  const z = M[8]*p[0]+M[9]*p[1]+M[10]*p[2]+M[11];
  const d = Z + z;
  return [W/2 + x/d * W * zoom, H/2 - y/d * H * zoom, z];
};

/* ── Geometry generator ───────────────────────────────────────────────────── */
function makeGeom(shape, explodeFactor = 0) {
  const ef = explodeFactor;

  if (shape === "bracket") {
    const verts = [
      [-1,-0.2,-0.3],[1,-0.2,-0.3],[1,0.2,-0.3],[-1,0.2,-0.3],
      [-1,-0.2,0.3],[1,-0.2,0.3],[1,0.2,0.3],[-1,0.2,0.3],
      [0.6,-0.2,-0.3],[0.6,-1,-0.3],[1,-1,-0.3],[1,-0.2,-0.3],
      [0.6,-0.2,0.3],[0.6,-1,0.3],[1,-1,0.3],[1,-0.2,0.3],
    ];
    if (ef > 0) verts.slice(8).forEach(v => { v[1] -= ef * 0.2; });
    return { verts, faces: [
      [0,1,2,3,"#1a4a2a"],[4,5,6,7,"#22c55e30"],
      [0,1,5,4,"#1a5a2a"],[2,3,7,6,"#1a5a2a"],
      [0,3,7,4,"#0d3a1a"],[1,2,6,5,"#2a6a3a"],
      [8,9,10,11,"#1a4a2a"],[12,13,14,15,"#22c55e20"],
      [9,10,14,13,"#1a5a2a"],[8,11,15,12,"#0d3a1a"],
    ]};
  }

  if (shape === "building") {
    const verts = [
      [-0.7,-1,-0.5],[0.7,-1,-0.5],[0.7,1,-0.5],[-0.7,1,-0.5],
      [-0.7,-1,0.5],[0.7,-1,0.5],[0.7,1,0.5],[-0.7,1,0.5],
      [-0.15,0.3,-0.5],[0.15,0.3,-0.5],[0.15,1.0,-0.5],[-0.15,1.0,-0.5],
      [-0.15,0.3,0.5],[0.15,0.3,0.5],[0.15,1.0,0.5],[-0.15,1.0,0.5],
    ];
    if (ef > 0) verts.slice(8).forEach(v => { v[1] += ef * 0.5; });
    return { verts, faces: [
      [0,1,2,3,"#1a1a40"],[4,5,6,7,"#22244880"],
      [0,1,5,4,"#22244a"],[2,3,7,6,"#1a1a3a"],
      [0,3,7,4,"#12123a"],[1,2,6,5,"#2a2a5a"],
      [8,9,10,11,"#2a2a6a"],[12,13,14,15,"#818cf830"],
      [8,12,13,9,"#2a2a5a"],[10,11,15,14,"#1a1a4a"],
    ]};
  }

  if (shape === "ring") {
    const segs = 12, r1 = 0.8, r2 = 0.5, h = 0.3;
    const verts = []; const faces = [];
    for (let i = 0; i < segs; i++) {
      const a = i / segs * Math.PI * 2, na = (i + 1) / segs * Math.PI * 2;
      const base = verts.length;
      const midA = (a + na) / 2;
      [
        [Math.cos(a)*r1, h/2, Math.sin(a)*r1],
        [Math.cos(na)*r1, h/2, Math.sin(na)*r1],
        [Math.cos(na)*r2, h/2, Math.sin(na)*r2],
        [Math.cos(a)*r2, h/2, Math.sin(a)*r2],
        [Math.cos(a)*r1, -h/2, Math.sin(a)*r1],
        [Math.cos(na)*r1, -h/2, Math.sin(na)*r1],
        [Math.cos(na)*r2, -h/2, Math.sin(na)*r2],
        [Math.cos(a)*r2, -h/2, Math.sin(a)*r2],
      ].forEach(v => {
        verts.push([v[0] + Math.cos(midA)*ef*0.1, v[1], v[2] + Math.sin(midA)*ef*0.1]);
      });
      faces.push(
        [base,base+1,base+2,base+3,"#6a1a8a"],
        [base+4,base+5,base+6,base+7,"#4a0a6a"],
        [base,base+1,base+5,base+4,"#8a3aaa"],
        [base+3,base+2,base+6,base+7,"#8a3aaa"],
      );
    }
    return { verts, faces };
  }

  // Generic box for all other shapes — each gets its own colors
  const colorMap = {
    enclosure: ["#5a1a1a","#8b2a2a40","#6a1a1a","#4a1212","#3a0d0d","#7a2a2a"],
    casing:    ["#0a3a5a","#38bdf830","#0d4a6a","#08303a","#061a2a","#1a5a7a"],
    duct:      ["#5a4a08","#fbbf2430","#6a5a0a","#4a3a06","#3a2a04","#7a6a14"],
    panel:     ["#0a3a40","#67e8f930","#0d4a50","#082830","#051820","#1a5a65"],
    arm:       ["#1a4a2a","#22c55e20","#1a5a2a","#1a5a2a","#0d3a1a","#2a6a3a"],
    fixture:   ["#5a4a08","#fde68a20","#6a5a0a","#4a3a06","#3a2a04","#7a6a14"],
  };
  const colors = colorMap[shape] || colorMap.fixture;
  const verts = [
    [-0.9,-0.5,-0.6],[0.9,-0.5,-0.6],[0.9,0.5,-0.6],[-0.9,0.5,-0.6],
    [-0.9,-0.5,0.6],[0.9,-0.5,0.6],[0.9,0.5,0.6],[-0.9,0.5,0.6],
  ];
  if (ef > 0) verts.slice(4).forEach(v => { v[1] += ef * 0.3; });
  return { verts, faces: [
    [0,1,2,3,colors[0]],[4,5,6,7,colors[1]],
    [0,1,5,4,colors[2]],[2,3,7,6,colors[3]],
    [0,3,7,4,colors[4]],[1,2,6,5,colors[5]],
  ]};
}

/* ── Shape mapping for each portfolio item ────────────────────────────────── */
const SHAPES = [
  "bracket","building","enclosure","casing","duct","ring","panel","arm","fixture"
];
const BG_COLORS = [
  "#0a1a0d","#0e0e1e","#1a0d0d","#0d161a","#1a1206","#1a0d1a","#0d1518","#111a0d","#1a1800"
];

const ANGLES = [
  { label: "Front",     rx: 0,   ry: 0   },
  { label: "Top",       rx: 80,  ry: 0   },
  { label: "Side",      rx: 0,   ry: 90  },
  { label: "Isometric", rx: 30,  ry: 45  },
  { label: "Bottom",    rx: -70, ry: 0   },
  { label: "Rear",      rx: 0,   ry: 180 },
];

/* ── Main component ───────────────────────────────────────────────────────── */
export default function Portfolio360Viewer() {
  const canvasRef   = useRef(null);
  const areaRef     = useRef(null);
  const stateRef    = useRef({ rotX: 25, rotY: 30, zoom: 1, auto: true, wire: false, explode: false, drag: false, lx: 0, ly: 0 });
  const rafRef      = useRef(null);

  const [curIdx,    setCurIdx]    = useState(0);
  const [autoOn,    setAutoOn]    = useState(true);
  const [wireOn,    setWireOn]    = useState(false);
  const [explodeOn, setExplodeOn] = useState(false);
  const [zoomPct,   setZoomPct]   = useState(100);
  const [rotDisplay,setRotDisplay]= useState({ ry: 30, rx: 25 });
  const [activeAngle, setActiveAngle] = useState(null);

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const { rotX, rotY, zoom, wire, explode } = stateRef.current;
    const W = cv.width, H = cv.height;
    const model = PORTFOLIO[curIdx];
    const bgColor = BG_COLORS[curIdx];
    const accent = model.accent;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    const M = mat4Mul(rotYM(rotY * Math.PI / 180), rotXM(rotX * Math.PI / 180));
    const geo = makeGeom(SHAPES[curIdx], explode ? 1 : 0);
    const proj = geo.verts.map(v => project(v, M, W, H, 3.5, zoom));

    const sorted = geo.faces
      .map(f => ({ f, z: f.slice(0,4).reduce((s,i) => s + proj[i][2], 0) / 4 }))
      .sort((a, b) => a.z - b.z);

    sorted.forEach(({ f }) => {
      const pts = f.slice(0, 4).map(i => proj[i]);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      if (wire) {
        ctx.strokeStyle = accent + "aa";
        ctx.lineWidth = devicePixelRatio * 0.8;
        ctx.stroke();
      } else {
        ctx.fillStyle = f[4];
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.lineWidth = devicePixelRatio * 0.5;
        ctx.stroke();
      }
    });

    setZoomPct(Math.round(zoom * 100));
    setRotDisplay({ ry: Math.round(((rotY % 360) + 360) % 360), rx: Math.round(rotX) });
  }, [curIdx]);

  const loop = useCallback(() => {
    const s = stateRef.current;
    if (s.auto && !s.drag) { s.rotY += 0.4; draw(); }
    rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  useEffect(() => {
    const resize = () => {
      const cv = canvasRef.current;
      const area = areaRef.current;
      if (!cv || !area) return;
      const r = area.getBoundingClientRect();
      cv.width  = r.width  * devicePixelRatio;
      cv.height = r.height * devicePixelRatio;
      cv.style.width  = r.width  + "px";
      cv.style.height = r.height + "px";
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loop]);

  useEffect(() => { draw(); }, [curIdx, wireOn, explodeOn, draw]);

  // Mouse handlers
  const onMouseDown = (e) => {
    stateRef.current.drag = true;
    stateRef.current.lx = e.clientX;
    stateRef.current.ly = e.clientY;
    stateRef.current.auto = false;
    setAutoOn(false);
    setActiveAngle(null);
  };
  const onMouseMove = (e) => {
    const s = stateRef.current;
    if (!s.drag) return;
    s.rotY += (e.clientX - s.lx) * 0.4;
    s.rotX += (e.clientY - s.ly) * 0.4;
    s.rotX = Math.max(-85, Math.min(85, s.rotX));
    s.lx = e.clientX; s.ly = e.clientY;
    draw();
  };
  const onMouseUp = () => { stateRef.current.drag = false; };

  const onTouchStart = (e) => {
    stateRef.current.drag = true;
    stateRef.current.lx = e.touches[0].clientX;
    stateRef.current.ly = e.touches[0].clientY;
    stateRef.current.auto = false;
    setAutoOn(false);
  };
  const onTouchMove = (e) => {
    const s = stateRef.current;
    if (!s.drag) return;
    s.rotY += (e.touches[0].clientX - s.lx) * 0.4;
    s.rotX += (e.touches[0].clientY - s.ly) * 0.4;
    s.rotX = Math.max(-85, Math.min(85, s.rotX));
    s.lx = e.touches[0].clientX; s.ly = e.touches[0].clientY;
    draw();
  };
  const onTouchEnd = () => { stateRef.current.drag = false; };

  const onWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    stateRef.current.zoom = Math.max(0.3, Math.min(3, stateRef.current.zoom + delta));
    draw();
  };

  // Control handlers
  const toggleAuto = () => { stateRef.current.auto = !stateRef.current.auto; setAutoOn(a => !a); };
  const toggleWire = () => { stateRef.current.wire = !stateRef.current.wire; setWireOn(w => !w); draw(); };
  const toggleExplode = () => { stateRef.current.explode = !stateRef.current.explode; setExplodeOn(x => !x); draw(); };
  const doZoom = (d) => { stateRef.current.zoom = Math.max(0.3, Math.min(3, stateRef.current.zoom + d)); draw(); };

  const selectModel = (i) => {
    setCurIdx(i);
    stateRef.current.rotX = 25;
    stateRef.current.rotY = 30;
    setActiveAngle(null);
  };

  const snapAngle = (angle, idx) => {
    stateRef.current.rotX = angle.rx;
    stateRef.current.rotY = angle.ry;
    setActiveAngle(idx);
    draw();
  };

  const model = PORTFOLIO[curIdx];

  const btnBase = {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "6px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)", color: C.muted, fontSize: 12,
    cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
  };
  const btnActive = { ...btnBase, background: "rgba(34,197,94,0.15)", borderColor: "rgba(34,197,94,0.4)", color: C.accent };

  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>

      {/* Canvas */}
      <div ref={areaRef} style={{ position: "relative", height: 360, background: BG_COLORS[curIdx], cursor: "grab" }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp} onTouchStart={onTouchStart} onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd} onWheel={onWheel}>
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

        {/* HUD badges */}
        <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(13,31,20,0.85)", border: "0.5px solid rgba(34,197,94,0.3)", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: C.accent, display: "flex", alignItems: "center", gap: 5 }}>
          ↻ 360° view
        </div>
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(13,31,20,0.7)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
          drag to rotate · scroll to zoom
        </div>

        {/* Live stats */}
        <div style={{ position: "absolute", bottom: 12, right: 12, textAlign: "right", fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
          <div>Rot {rotDisplay.ry}°</div>
          <div>Elev {rotDisplay.rx}°</div>
          <div>Zoom {zoomPct}%</div>
        </div>
      </div>

      {/* Control bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderTop: "0.5px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.2)", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button style={autoOn ? btnActive : btnBase} onClick={toggleAuto}>
            {autoOn ? "⏸ auto-rotate" : "▶ auto-rotate"}
          </button>
          <button style={wireOn ? btnActive : btnBase} onClick={toggleWire}>
            ◇ wireframe
          </button>
          <button style={explodeOn ? btnActive : btnBase} onClick={toggleExplode}>
            ⊹ explode view
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={() => doZoom(-0.15)} style={{ width: 28, height: 28, borderRadius: 6, border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: C.muted, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Zoom out">−</button>
          <span style={{ fontSize: 12, color: C.faint, minWidth: 40, textAlign: "center" }}>{zoomPct}%</span>
          <button onClick={() => doZoom(0.15)} style={{ width: 28, height: 28, borderRadius: 6, border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: C.muted, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Zoom in">+</button>
        </div>
      </div>

      {/* Angle presets */}
      <div style={{ display: "flex", gap: 6, padding: "8px 14px", borderTop: "0.5px solid rgba(255,255,255,0.07)", overflowX: "auto" }}>
        {ANGLES.map((angle, i) => (
          <button key={angle.label} onClick={() => snapAngle(angle, i)} style={{
            padding: "4px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer",
            border: `0.5px solid ${activeAngle === i ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)"}`,
            background: activeAngle === i ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.03)",
            color: activeAngle === i ? C.accent : C.muted,
            whiteSpace: "nowrap", flexShrink: 0, fontFamily: "inherit", transition: "all .15s",
          }}>
            {angle.label}
          </button>
        ))}
      </div>

      {/* Model info */}
      <div style={{ padding: "14px 16px", borderTop: "0.5px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: C.white, fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{model.title}</p>
          <p style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>{model.cat} · {model.material} · {model.client}</p>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["Precision engineered", model.material, model.cat].map(t => (
              <span key={t} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(34,197,94,0.1)", border: "0.5px solid rgba(34,197,94,0.2)", color: C.accent }}>{t}</span>
            ))}
          </div>
        </div>
        <button onClick={() => {/* trigger enquiry */}} style={{ ...btnActive, fontSize: 12, flexShrink: 0 }}>
          Request similar →
        </button>
      </div>

      {/* Model thumbnails */}
      <div style={{ display: "flex", gap: 8, padding: "10px 14px", borderTop: "0.5px solid rgba(255,255,255,0.07)", overflowX: "auto" }}>
        {PORTFOLIO.map((p, i) => (
          <button key={p.id} onClick={() => selectModel(i)} title={p.title}
            style={{ width: 54, height: 54, borderRadius: 8, border: `1.5px solid ${i === curIdx ? C.accent : "rgba(255,255,255,0.08)"}`, background: i === curIdx ? BG_COLORS[i] : "rgba(255,255,255,0.03)", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .15s" }}>
            {p.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}