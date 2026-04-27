import { useState, useEffect, useRef } from "react";

const services = [
  {
    id: "01",
    title: "SEO Optimization",
    description:
      "Dominate search rankings with data-driven strategies. We audit, optimize, and build authority so your brand appears where it matters most.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M18 18L24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    accent: "#e8614a",
    tags: ["Technical SEO", "Link Building", "Analytics"],
  },
  {
    id: "02",
    title: "Social Media Management",
    description:
      "Build communities, drive engagement, and turn followers into loyal customers with content strategies tailored to every platform.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="6" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="22" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="22" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8.5 13L19.5 7.5M8.5 15L19.5 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    accent: "#4fc3f7",
    tags: ["Content Creation", "Community", "Growth"],
  },
  {
    id: "03",
    title: "Google Ads",
    description:
      "Maximise every rupee of ad spend with precision targeting, compelling copy, and relentless A/B testing that converts clicks to revenue.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 10l5 7 4-5 5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 6h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    accent: "#e8614a",
    tags: ["PPC", "Remarketing", "Conversion Tracking"],
  },
  {
    id: "04",
    title: "Website Design",
    description:
      "High-converting websites built for speed, beauty, and performance. Every pixel crafted to guide visitors seamlessly toward action.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 10h22" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7" cy="7.5" r="1" fill="currentColor" />
        <circle cx="10.5" cy="7.5" r="1" fill="currentColor" />
        <circle cx="14" cy="7.5" r="1" fill="currentColor" />
        <path d="M10 23v-2M18 23v-2M7 23h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    accent: "#4fc3f7",
    tags: ["UI/UX", "Responsive", "CRO"],
  },
  {
    id: "05",
    title: "Content Marketing",
    description:
      "Stories that rank, resonate, and convert. From blog posts to video scripts, we craft content that builds trust and drives organic growth.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 6h16M6 10h12M6 14h16M6 18h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="21" cy="20" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M24 23l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    accent: "#e8614a",
    tags: ["Blogs", "Video", "Email Sequences"],
  },
  {
    id: "06",
    title: "Branding & Strategy",
    description:
      "Define your identity, own your niche. From logo to messaging framework, we build brands people remember and competitors envy.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polygon points="14,3 17,10 25,10 19,15 21,23 14,18 7,23 9,15 3,10 11,10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    accent: "#4fc3f7",
    tags: ["Identity", "Positioning", "Brand Voice"],
  },
];

function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? service.accent + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        padding: "36px 32px",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 80}ms` : "0ms",
        overflow: "hidden",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          background: `radial-gradient(ellipse at ${isEven ? "20% 20%" : "80% 20%"}, ${service.accent}18 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            background: `${service.accent}18`,
            border: `1px solid ${service.accent}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: service.accent,
            transition: "transform 0.3s ease, background 0.3s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          {service.icon}
        </div>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.1em",
            fontWeight: 700,
          }}
        >
          {service.id}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 12,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14.5,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.5)",
          marginBottom: 24,
        }}
      >
        {service.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11.5,
              fontWeight: 500,
              color: service.accent,
              background: `${service.accent}14`,
              border: `1px solid ${service.accent}28`,
              borderRadius: 20,
              padding: "4px 12px",
              letterSpacing: "0.03em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom arrow */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 28,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: `1px solid ${service.accent}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: service.accent,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.7)",
          transition: "all 0.3s ease",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.6; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #06060d; }
      `}</style>

      <section
        style={{
          position: "relative",
          background: "#06060d",
          padding: "120px 0 100px",
          overflow: "hidden",
        }}
      >
        <StarField />

        {/* Ambient blobs */}
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(232,97,74,0.06) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "5%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(79,195,247,0.05) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* Header */}
          <div
            ref={headerRef}
            style={{
              textAlign: "center",
              marginBottom: 72,
              animation: headerVisible ? "slideUp 0.7s ease forwards" : "none",
              opacity: headerVisible ? 1 : 0,
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 40, padding: "8px 20px",
              marginBottom: 28,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#e8614a",
                boxShadow: "0 0 8px #e8614a",
                display: "inline-block",
              }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.55)", textTransform: "uppercase",
              }}>
                What We Do
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              Services built for{" "}
              <span style={{
                background: "linear-gradient(135deg, #e8614a, #ff9a7c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                real growth
              </span>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}>
              Every service is designed to work together — so your brand doesn't just look good, it performs.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 20,
          }}>
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>

          {/* CTA row */}
          <div style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}>
            <button
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#fff",
                background: "#e8614a",
                border: "none",
                borderRadius: 10,
                padding: "16px 36px",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 36px rgba(232,97,74,0.4)";
              }}
              onMouseLeave={e => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Start a Project
            </button>
            <button
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(255,255,255,0.65)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                padding: "16px 36px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = "rgba(255,255,255,0.35)";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = "rgba(255,255,255,0.15)";
                e.target.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
    </>
  );
}