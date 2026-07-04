import { useState } from "react";
import { C } from "../theme";
import { Reveal, Btn, BtnOutline, Tag, SectionLabel, SectionTitle, SectionDesc, PageHero, Icon, Badge, Card } from "../components/UI";
import { PRODUCTS } from "../data";

/* ── Cart context (simple local state) ───────────────────────────────────── */
function CartIcon({ count, onClick }) {
  return (
    <button onClick={onClick} style={{ position: "fixed", bottom: 90, right: 24, zIndex: 250, width: 52, height: 52, borderRadius: "50%", background: C.accent, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(34,197,94,0.4)" }}>
      <span style={{ color: C.forestBg }}>{Icon.cart}</span>
      {count > 0 && <span style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
    </button>
  );
}

/* ── Product Card ─────────────────────────────────────────────────────────── */
function ProductCard({ p, onAdd, onView }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", transition: "border-color .2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
      {/* Image area */}
      <div onClick={onView} style={{ height: 130, background: C.forestBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, cursor: "pointer", position: "relative" }}>
        {p.emoji}
        {p.tag && <span style={{ position: "absolute", top: 10, left: 10 }}><Badge color={C.accent}>{p.tag}</Badge></span>}
      </div>
      {/* Info */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ color: "#6b9e80", fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{p.category}</p>
        <h3 onClick={onView} style={{ color: C.white, fontSize: 14, fontWeight: 500, marginBottom: 6, cursor: "pointer", lineHeight: 1.4 }}>{p.name}</h3>
        <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.65, marginBottom: 14, flex: 1 }}>{p.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <span style={{ color: C.accent, fontSize: 18, fontWeight: 600 }}>₹{p.price.toLocaleString("en-IN")}</span>
          <button onClick={handleAdd} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", background: added ? "#166534" : C.accent, color: added ? "#4ade80" : C.forestBg, fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all .3s" }}>
            {added ? <><span>{Icon.check}</span> Added</> : <><span>{Icon.cart}</span> Add to cart</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Cart Drawer ──────────────────────────────────────────────────────────── */
function CartDrawer({ cart, onClose, onRemove, onChangeQty, setPage }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 400 }} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 360, background: "#0d1f14", borderLeft: "0.5px solid rgba(34,197,94,0.15)", zIndex: 500, display: "flex", flexDirection: "column", padding: 24, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ color: C.white, fontSize: 18, fontWeight: 500 }}>Your cart ({cart.length})</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ fontSize: 44 }}>🛒</span>
            <p style={{ color: C.muted, fontSize: 14 }}>Your cart is empty</p>
            <BtnOutline onClick={onClose}>Continue shopping</BtnOutline>
          </div>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width: 48, height: 48, background: C.sectionAlt, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: C.white, fontSize: 12, fontWeight: 500, marginBottom: 4, lineHeight: 1.4 }}>{item.name}</p>
                    <p style={{ color: C.accent, fontSize: 13, fontWeight: 600 }}>₹{item.price.toLocaleString("en-IN")}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <button onClick={() => onChangeQty(item.id, item.qty - 1)} style={{ width: 24, height: 24, borderRadius: 4, background: "rgba(255,255,255,0.08)", border: "none", color: C.white, cursor: "pointer", fontSize: 14 }}>−</button>
                      <span style={{ color: C.white, fontSize: 13, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => onChangeQty(item.id, item.qty + 1)} style={{ width: 24, height: 24, borderRadius: 4, background: "rgba(255,255,255,0.08)", border: "none", color: C.white, cursor: "pointer", fontSize: 14 }}>+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: C.faint, cursor: "pointer", fontSize: 16, marginTop: 2 }}>✕</button>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: 20, borderTop: "0.5px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: C.muted, fontSize: 13 }}>Subtotal</span>
                <span style={{ color: C.white, fontSize: 13 }}>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: C.muted, fontSize: 13 }}>Shipping</span>
                <span style={{ color: C.accent, fontSize: 13 }}>Calculated at checkout</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, paddingTop: 10, borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color: C.white, fontSize: 15, fontWeight: 500 }}>Total</span>
                <span style={{ color: C.accent, fontSize: 18, fontWeight: 600 }}>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <Btn primary onClick={() => { onClose(); setPage("checkout"); }} style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 14 }}>
                Proceed to checkout
              </Btn>
              <p style={{ color: C.faint, fontSize: 11, textAlign: "center", marginTop: 10 }}>Secure checkout · Razorpay / UPI / COD</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ── Product Detail Modal ─────────────────────────────────────────────────── */
function ProductModal({ p, onClose, onAdd }) {
  if (!p) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 400 }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(560px,95vw)", background: "#0d1f14", border: "0.5px solid rgba(34,197,94,0.2)", borderRadius: 16, zIndex: 500, padding: 28, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <span style={{ fontSize: 48 }}>{p.emoji}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>
        {p.tag && <Badge color={C.accent} style={{ marginBottom: 10 }}>{p.tag}</Badge>}
        <h2 style={{ color: C.white, fontSize: 20, fontWeight: 500, marginBottom: 8 }}>{p.name}</h2>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>{p.desc}</p>
        <p style={{ color: "#6b9e80", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Category</p>
        <p style={{ color: C.offWhite, fontSize: 13, marginBottom: 20 }}>{p.category}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ color: C.accent, fontSize: 24, fontWeight: 700 }}>₹{p.price.toLocaleString("en-IN")}</span>
          <Btn primary onClick={() => { onAdd(p); onClose(); }} style={{ flex: 1, justifyContent: "center" }}>{Icon.cart} Add to cart</Btn>
        </div>
        <p style={{ color: C.faint, fontSize: 11, marginTop: 14 }}>Free shipping above ₹2,000 · Secure payment · 7-day return policy</p>
      </div>
    </>
  );
}

/* ── Checkout Page ────────────────────────────────────────────────────────── */
export function Checkout({ cart, setPage, onClearCart }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "", payment: "upi" });
  const [submitted, setSubmitted] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: C.offWhite, fontSize: 13, outline: "none", fontFamily: "inherit", marginBottom: 12 };

  if (submitted) return (
    <div style={{ background: C.forestBg, minHeight: "100vh", paddingTop: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
        <h2 style={{ color: C.white, fontSize: 24, fontWeight: 500, marginBottom: 12 }}>Order placed!</h2>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>Thank you, {form.name}! We'll confirm your order via email at <span style={{ color: C.accent }}>{form.email}</span> within 2 hours.</p>
        <Btn primary onClick={() => { setPage("shop"); onClearCart(); }}>Continue shopping</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.forestBg, minHeight: "100vh", paddingTop: 90 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ color: C.white, fontSize: 26, fontWeight: 500, marginBottom: 32 }}>Checkout</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 }} className="checkout-grid">
          {/* Form */}
          <div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 24, marginBottom: 16 }}>
              <h3 style={{ color: C.white, fontSize: 15, fontWeight: 500, marginBottom: 18 }}>Shipping details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input style={inp} placeholder="Full name *" value={form.name} onChange={e => upd("name", e.target.value)} />
                <input style={inp} placeholder="Email address *" value={form.email} onChange={e => upd("email", e.target.value)} />
              </div>
              <input style={inp} placeholder="Phone number *" value={form.phone} onChange={e => upd("phone", e.target.value)} />
              <input style={inp} placeholder="Delivery address *" value={form.address} onChange={e => upd("address", e.target.value)} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input style={inp} placeholder="City" value={form.city} onChange={e => upd("city", e.target.value)} />
                <input style={inp} placeholder="PIN code" value={form.pincode} onChange={e => upd("pincode", e.target.value)} />
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 24 }}>
              <h3 style={{ color: C.white, fontSize: 15, fontWeight: 500, marginBottom: 18 }}>Payment method</h3>
              {[["upi","UPI / Google Pay / PhonePe","⚡"],["card","Credit / Debit Card","💳"],["cod","Cash on Delivery","💵"]].map(([val, label, ic]) => (
                <label key={val} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, border: `0.5px solid ${form.payment === val ? C.accent : "rgba(255,255,255,0.08)"}`, background: form.payment === val ? "rgba(34,197,94,0.06)" : "transparent", cursor: "pointer", marginBottom: 8, transition: "all .2s" }}>
                  <input type="radio" name="payment" value={val} checked={form.payment === val} onChange={() => upd("payment", val)} style={{ accentColor: C.accent }} />
                  <span style={{ fontSize: 16 }}>{ic}</span>
                  <span style={{ color: C.offWhite, fontSize: 13 }}>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 22, position: "sticky", top: 100 }}>
              <h3 style={{ color: C.white, fontSize: 15, fontWeight: 500, marginBottom: 16 }}>Order summary</h3>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 18 }}>{item.emoji}</span>
                    <span style={{ color: C.muted, fontSize: 12, lineHeight: 1.4, maxWidth: 160 }}>{item.name} ×{item.qty}</span>
                  </div>
                  <span style={{ color: C.white, fontSize: 13, flexShrink: 0 }}>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", paddingTop: 14, marginTop: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: C.muted, fontSize: 13 }}>Subtotal</span>
                  <span style={{ color: C.white, fontSize: 13 }}>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ color: C.muted, fontSize: 13 }}>Shipping</span>
                  <span style={{ color: total >= 2000 ? C.accent : C.white, fontSize: 13 }}>{total >= 2000 ? "Free" : "₹149"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "0.5px solid rgba(255,255,255,0.08)", marginBottom: 20 }}>
                  <span style={{ color: C.white, fontSize: 15, fontWeight: 500 }}>Total</span>
                  <span style={{ color: C.accent, fontSize: 20, fontWeight: 700 }}>₹{(total + (total >= 2000 ? 0 : 149)).toLocaleString("en-IN")}</span>
                </div>
                <Btn primary onClick={() => { if (form.name && form.email && form.phone) setSubmitted(true); }} style={{ width: "100%", justifyContent: "center", padding: 13, fontSize: 14 }}>
                  Place order
                </Btn>
                <p style={{ color: C.faint, fontSize: 10, textAlign: "center", marginTop: 10 }}>🔒 Secured by Razorpay · 7-day returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:640px){.checkout-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

/* ── Main Shop Page ───────────────────────────────────────────────────────── */
export default function Shop({ setPage }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [modalProduct, setModalProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  if (showCheckout) return <Checkout cart={cart} setPage={(p) => { setShowCheckout(false); setPage(p); }} onClearCart={clearCart} />;

  return (
    <>
      <PageHero label="Shop" title="Order online, delivered to your door" desc="Sample kits, fixed-price prints, CAD packages, and rendering services. Pay online, track your order, get it delivered PAN India." />

      <section style={{ background: C.forestBg, padding: "60px 24px 88px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          {/* Filter + sort */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, alignItems: "center" }}>
            <span style={{ color: C.muted, fontSize: 13, marginRight: 4 }}>Filter:</span>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 12, cursor: "pointer", transition: "all .2s", background: filter === c ? C.accent : "rgba(255,255,255,0.05)", border: `0.5px solid ${filter === c ? C.accent : "rgba(255,255,255,0.1)"}`, color: filter === c ? C.forestBg : C.muted, fontWeight: filter === c ? 600 : 400 }}>
                {c}
              </button>
            ))}
            <span style={{ color: C.faint, fontSize: 12, marginLeft: "auto" }}>{filtered.length} products</span>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <ProductCard p={p} onAdd={addToCart} onView={() => setModalProduct(p)} />
              </Reveal>
            ))}
          </div>

          {/* Custom order CTA */}
          <Reveal delay={200}>
            <div style={{ marginTop: 56, background: "rgba(34,197,94,0.06)", border: "0.5px solid rgba(34,197,94,0.2)", borderRadius: 16, padding: "32px", textAlign: "center" }}>
              <p style={{ color: C.accent, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Need something custom?</p>
              <h3 style={{ color: C.white, fontSize: 20, fontWeight: 500, marginBottom: 10 }}>Don't see what you need?</h3>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 20, maxWidth: 440, margin: "0 auto 20px" }}>Upload your STL file or describe your project — we'll quote any custom 3D print, CAD job, or vacuum casting run.</p>
              <Btn primary onClick={() => setPage("contact")}>{Icon.upload} Request custom quote</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAB cart icon */}
      <CartIcon count={cartCount} onClick={() => setCartOpen(true)} />

      {/* Cart drawer */}
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onChangeQty={changeQty} setPage={(p) => { if (p === "checkout") { setCartOpen(false); setShowCheckout(true); } else setPage(p); }} />}

      {/* Product modal */}
      {modalProduct && <ProductModal p={modalProduct} onClose={() => setModalProduct(null)} onAdd={addToCart} />}
    </>
  );
}
