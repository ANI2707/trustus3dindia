export const SERVICES = [
  {
    id: "3d-printing",
    icon: "🖨️",
    title: "3D Printing",
    short: "Industrial-grade FDM, SLA, and SLS printing with large-format capability up to 1000mm.",
    desc: "Our state-of-the-art 3D printing facility offers FDM, SLA, and SLS technologies with one of India's largest build volumes — up to 1000 × 1000 × 1000 mm in a single print. Whether you need a detailed prototype or a structural part, we deliver precision, speed, and quality.",
    tags: ["FDM","SLA","SLS","Multicolor","1000mm"],
    features: [
      "Build volume up to 1000 × 1000 × 1000 mm",
      "6+ material options: PLA, ABS, PETG, Nylon, TPU, Resin",
      "Layer resolution down to 50 microns (SLA)",
      "Multicolor and multi-material printing",
      "Post-processing: sanding, painting, priming",
      "48-hour express turnaround available",
    ],
    price: "Starting ₹299/print",
    turnaround: "2–5 business days",
    color: "#22C55E",
  },
  {
    id: "vacuum-casting",
    icon: "🔩",
    title: "Vacuum Casting",
    short: "Low-volume production runs with production-grade surface finish and excellent material fidelity.",
    desc: "Vacuum casting is ideal when you need 10–50 high-quality copies from a single master model. Using platinum-cure silicone molds, we achieve exceptional detail reproduction and surface quality that rivals injection molding — at a fraction of the tooling cost.",
    tags: ["10–50 copies","PU resins","Silicone molds","High finish"],
    features: [
      "Copies from 10 to 50 units per mold",
      "Shore hardness range: 20A to 80D",
      "Mold life: 20–25 shots per silicone mold",
      "Color matching and pigment blending",
      "Overmolding and insert molding",
      "Tolerances: ±0.3% (min. ±0.3 mm)",
    ],
    price: "Starting ₹1,499/part",
    turnaround: "5–10 business days",
    color: "#60A5FA",
  },
  {
    id: "cad-cae",
    icon: "📐",
    title: "CAD / CAE Services",
    short: "Precision 3D modeling, engineering drawings, GD&T annotations, and simulation.",
    desc: "Our engineering team transforms your ideas — whether a napkin sketch, a reference image, or a verbal brief — into precise, manufacturable 3D models. We work in SolidWorks, CATIA, Fusion 360, and more, delivering production-ready drawings with full GD&T annotation.",
    tags: ["SolidWorks","CATIA","Fusion 360","GD&T","FEA"],
    features: [
      "3D modeling from scratch or reference",
      "Reverse engineering from physical parts",
      "Engineering drawings with GD&T",
      "FEA structural simulation (Ansys)",
      "CFD flow analysis",
      "Design for Manufacturability (DFM) reviews",
    ],
    price: "Starting ₹999/model",
    turnaround: "3–7 business days",
    color: "#A78BFA",
  },
  {
    id: "rendering",
    icon: "🎨",
    title: "Product Rendering",
    short: "Photorealistic 3D renders for marketing, investor decks, and product validation.",
    desc: "High-quality photorealistic renders let you visualize, market, and pitch your product before a single prototype is printed. We create studio-quality visuals in any angle, lighting, and environment — ideal for crowdfunding campaigns, investor presentations, and e-commerce listings.",
    tags: ["Photorealistic","360° views","Animation","Keyshot"],
    features: [
      "4K+ resolution output",
      "Multiple lighting environments",
      "Turntable animations (360°)",
      "Exploded view renders",
      "Lifestyle / contextual scenes",
      "Unlimited revision rounds",
    ],
    price: "Starting ₹1,999/render",
    turnaround: "2–4 business days",
    color: "#F59E0B",
  },
];

export const MATERIALS = [
  { name: "PLA", color: "#4ADE80", tech: "FDM", desc: "Eco-friendly, rigid, easy to post-process. Ideal for prototypes, display models, and low-stress parts.", props: { strength: 65, flex: 20, heat: 40, detail: 80 } },
  { name: "ABS", color: "#60A5FA", tech: "FDM", desc: "Strong, impact-resistant, and machinable. Great for functional parts, enclosures, and automotive components.", props: { strength: 78, flex: 50, heat: 70, detail: 70 } },
  { name: "PETG", color: "#FBBF24", tech: "FDM", desc: "Food-safe, excellent layer adhesion, slightly flexible. Perfect for containers, medical, and food-contact applications.", props: { strength: 72, flex: 60, heat: 60, detail: 72 } },
  { name: "Nylon", color: "#A78BFA", tech: "FDM/SLS", desc: "Engineering-grade, high-strength, wear-resistant. Perfect for gears, brackets, and mechanical assemblies.", props: { strength: 90, flex: 70, heat: 80, detail: 75 } },
  { name: "TPU", color: "#F87171", tech: "FDM", desc: "Flexible rubber-like material. Excellent for gaskets, grips, phone cases, and wearable components.", props: { strength: 55, flex: 95, heat: 50, detail: 60 } },
  { name: "Resin", color: "#34D399", tech: "SLA", desc: "Ultra-fine detail via SLA. Ideal for jewellery, dental, miniatures, and high-detail visual prototypes.", props: { strength: 60, flex: 15, heat: 45, detail: 98 } },
];

export const PORTFOLIO = [
  { id: 1, emoji: "⚙️", bg: "#0D1F14", accent: "#22C55E", title: "Automotive brake bracket", cat: "FDM", material: "Nylon", client: "OEM supplier", industry: "Automotive", desc: "Structural brake bracket prototype tested to 800N load. Replaced 6-week lead time with 3-day delivery." },
  { id: 2, emoji: "🏛️", bg: "#1A1A2E", accent: "#818CF8", title: "Architectural scale model", cat: "SLA", material: "Resin", client: "Studio Forma", industry: "Architecture", desc: "1:50 scale residential complex model with 0.3mm column detail for client presentation." },
  { id: 3, emoji: "🫀", bg: "#1C0D0D", accent: "#F87171", title: "Medical device housing", cat: "SLS", material: "PA12", client: "MedTech startup", industry: "Medical", desc: "Biocompatible enclosure for portable diagnostic device. FDA-grade PA12 material." },
  { id: 4, emoji: "🎮", bg: "#0D1A20", accent: "#38BDF8", title: "Consumer product casing", cat: "FDM", material: "ABS", client: "Electronics startup", industry: "Consumer", desc: "Snap-fit electronics enclosure with EMI shielding. 30-unit production run in 5 days." },
  { id: 5, emoji: "✈️", bg: "#1A140D", accent: "#FBBF24", title: "Aerospace duct component", cat: "SLS", material: "Nylon", client: "R&D division", industry: "Aerospace", desc: "Complex internal channel geometry impossible with traditional machining. 0.1mm tolerance." },
  { id: 6, emoji: "💍", bg: "#1C0D1A", accent: "#E879F9", title: "Jewellery wax prototype", cat: "SLA", material: "Resin", client: "Jewellery brand", industry: "Jewellery", desc: "Castable resin master for gold casting. 50-micron layer resolution for intricate filigree." },
  { id: 7, emoji: "🏠", bg: "#0D1518", accent: "#67E8F9", title: "Interior design element", cat: "FDM", material: "PLA", client: "Design studio", industry: "Architecture", desc: "Custom decorative panel with Voronoi pattern. 1.2×0.8m printed in 4 segments." },
  { id: 8, emoji: "🤖", bg: "#141C0D", accent: "#86EFAC", title: "Robotic arm prototype", cat: "FDM", material: "PETG", client: "EdTech startup", industry: "Robotics", desc: "5-DOF robotic arm for educational kit. Complete assembly with integrated joints." },
  { id: 9, emoji: "🔬", bg: "#1A1800", accent: "#FDE68A", title: "Lab equipment fixture", cat: "SLA", material: "Resin", client: "Research lab", industry: "Medical", desc: "Custom sample holder for electron microscopy with 20-micron positioning accuracy." },
];

export const TESTIMONIALS = [
  { quote: "Trustus3DIndia delivered our aerospace prototype in 5 days with zero tolerance deviation. Surface finish exceeded expectations.", name: "Rahul Mehta", role: "R&D Lead", company: "Aerospace Components Ltd", init: "RM", rating: 5 },
  { quote: "As an architect, I need detailed scale models fast. They turned my CAD file into a stunning 1:50 model in 48 hours. Exceptional.", name: "Shreya Patel", role: "Principal Architect", company: "Studio Forma", init: "SP", rating: 5 },
  { quote: "We needed 30 prototypes for investor demo day. Same quality across the entire production run. Highly recommend.", name: "Arjun Kumar", role: "Founder", company: "NovaTech Devices", init: "AK", rating: 5 },
  { quote: "Their CAD team redesigned our product for printability and the result was far better. Rare to find both expertise and manufacturing.", name: "Divya Nair", role: "Product Manager", company: "ConsumerPlus", init: "DN", rating: 5 },
  { quote: "Best 3D printing service in Pune. Delivered exactly what I needed — perfect surface quality for my jewellery casting.", name: "Meera Shah", role: "Jewellery Designer", company: "MeeraGold Studio", init: "MS", rating: 5 },
  { quote: "Quick quote, professional team, and delivery before the deadline. Will definitely use again for our next product launch.", name: "Vikram Rao", role: "CTO", company: "IotSense Labs", init: "VR", rating: 5 },
];

export const BLOG_POSTS = [
  { id: 1, title: "FDM vs SLA vs SLS — which 3D printing technology is right for your project?", cat: "Guide", date: "Dec 10, 2024", read: "8 min", emoji: "🖨️", desc: "A practical breakdown of the three most common 3D printing technologies — when to use each, material differences, cost comparison, and real use cases from our workshop.", tags: ["FDM","SLA","SLS","Technology"] },
  { id: 2, title: "How to design parts for 3D printing: 10 DFM rules every engineer must know", cat: "Engineering", date: "Nov 28, 2024", read: "11 min", emoji: "📐", desc: "Common design mistakes that increase print failures and cost — and how to fix them before you send your file. Includes wall thickness, overhang rules, and support strategy.", tags: ["DFM","CAD","Design"] },
  { id: 3, title: "Nylon vs ABS vs PETG — choosing the right engineering plastic for functional parts", cat: "Materials", date: "Nov 15, 2024", read: "7 min", emoji: "🧪", desc: "A side-by-side comparison of the most popular engineering filaments. We tested tensile strength, heat resistance, and chemical compatibility so you don't have to.", tags: ["Materials","Nylon","ABS","PETG"] },
  { id: 4, title: "Rapid prototyping for startups: how to go from idea to investor prototype in 7 days", cat: "Startup", date: "Oct 30, 2024", read: "6 min", emoji: "🚀", desc: "A step-by-step playbook used by our startup clients to create investor-ready prototypes fast. Covers brief writing, file prep, material selection, and presentation tips.", tags: ["Startups","Prototyping","Business"] },
  { id: 5, title: "Vacuum casting vs injection molding: when does each make sense?", cat: "Manufacturing", date: "Oct 12, 2024", read: "9 min", emoji: "🔩", desc: "If you need 10–500 production-quality copies, two options dominate: vacuum casting and injection molding. Here's how to choose based on volume, cost, and timeline.", tags: ["Vacuum Casting","Manufacturing"] },
  { id: 6, title: "What file format should I send for 3D printing? STL vs STEP vs OBJ explained", cat: "Guide", date: "Sep 25, 2024", read: "5 min", emoji: "📁", desc: "A quick guide to the most common 3D file formats — their strengths, limitations, and when to use each. Plus our recommended settings for export.", tags: ["Files","STL","STEP","Guide"] },
];

export const PRODUCTS = [
  { id: 1, name: "Sample Material Kit — PLA", price: 299, tag: "Bestseller", emoji: "🟢", desc: "10 material samples in different colors. Perfect for testing before your production run.", category: "Samples" },
  { id: 2, name: "Sample Material Kit — Engineering", price: 499, tag: "Popular", emoji: "🔵", desc: "ABS, PETG, Nylon, TPU samples. Compare engineering filaments before your project.", category: "Samples" },
  { id: 3, name: "Resin Sample Kit — SLA", price: 649, tag: null, emoji: "🟣", desc: "Standard, tough, and castable resin samples. See SLA quality up close.", category: "Samples" },
  { id: 4, name: "Custom 3D Print — Small (FDM)", price: 499, tag: null, emoji: "🖨️", desc: "Up to 100×100×100mm. Upload your STL file. PLA or ABS. Standard finish.", category: "3D Prints" },
  { id: 5, name: "Custom 3D Print — Medium (FDM)", price: 1299, tag: null, emoji: "📦", desc: "Up to 250×250×250mm. Upload your STL file. Multiple material options.", category: "3D Prints" },
  { id: 6, name: "Custom 3D Print — Large (FDM)", price: 2999, tag: "Large Format", emoji: "🏭", desc: "Up to 500×500×500mm. Our specialty. Complex geometries welcome.", category: "3D Prints" },
  { id: 7, name: "CAD Modeling — Basic", price: 999, tag: null, emoji: "📐", desc: "Simple 3D model from your sketch or reference. Delivered in STEP + STL.", category: "CAD" },
  { id: 8, name: "Product Render — 3 Views", price: 1999, tag: null, emoji: "🎨", desc: "3 photorealistic renders of your product. Front, side, and perspective.", category: "Rendering" },
  { id: 9, name: "Rapid Prototyping Bundle", price: 4999, tag: "Bundle", emoji: "⚡", desc: "CAD modeling + 3D print (medium) + 2 renders. Best value for startups.", category: "Bundles" },
];

export const FAQS = [
  { q: "What file formats do you accept?", a: "We accept STL, STEP, OBJ, 3MF, IGES, and F3D files. For CAD services, we also accept PDF drawings, photos, and sketches. If you don't have a file, describe your project and we'll help." },
  { q: "What is your maximum build size?", a: "Our FDM printers support up to 1000 × 1000 × 1000 mm in a single build — one of the largest in India. For SLA and SLS, maximum build volume is 300 × 300 × 400 mm. Larger parts can be printed in segments and assembled." },
  { q: "How do I get a quote?", a: "Upload your file via our Get a Quote form, or WhatsApp us directly. We'll send a detailed quote within 24 hours, including material options, finish choices, and pricing." },
  { q: "What is your typical turnaround time?", a: "Standard turnaround is 2–5 business days for 3D printing, 3–7 days for CAD services, and 5–10 days for vacuum casting. Express 48-hour service is available for most prints at an additional charge." },
  { q: "Do you offer shipping across India?", a: "Yes, we ship PAN India via insured courier. Parts are carefully packaged with foam inserts to prevent damage. Typical delivery time is 1–3 days after dispatch." },
  { q: "Can you help if I don't have a 3D file?", a: "Absolutely. Share your idea via sketch, photo, or description. Our CAD team will create the 3D model and then print it for you. This is a popular option for startups and product designers." },
  { q: "What materials are available?", a: "We print in PLA, ABS, PETG, Nylon, TPU, and various Resins (standard, tough, castable, flexible). For vacuum casting, we use a range of PU resins. Ask us for a material recommendation based on your use case." },
  { q: "Do you sign NDAs?", a: "Yes. We take IP confidentiality seriously and are happy to sign a mutual NDA before you share your files. Contact us before submitting your design." },
  { q: "What post-processing options are available?", a: "We offer sanding, priming, painting (RAL/Pantone colour matching), acetone vapour smoothing for ABS, UV coating, and metal plating for prototypes." },
  { q: "Is there a minimum order quantity?", a: "No minimum order. We print single units as happily as we print 100. For vacuum casting, minimum is 5 copies per mold setup." },
];

export const TEAM = [
  { name: "Aditya Sharma", role: "Founder & CEO", init: "AS", desc: "Mechanical engineer with 12+ years in product development. Previously at Tata Technologies.", emoji: "👷" },
  { name: "Priya Kulkarni", role: "Lead CAD Engineer", init: "PK", desc: "CATIA and SolidWorks certified. Specialises in reverse engineering and GD&T.", emoji: "📐" },
  { name: "Rohan Desai", role: "Production Head", init: "RD", desc: "Manages all printing operations. 8+ years in additive manufacturing and materials.", emoji: "🏭" },
  { name: "Neha Joshi", role: "Client Relations", init: "NJ", desc: "Your primary point of contact. Ensures every project runs on time and exceeds expectations.", emoji: "🤝" },
];
