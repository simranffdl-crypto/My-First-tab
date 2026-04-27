import { useState, useEffect, useRef } from "react";

const stars = Array.from({ length: 160 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.7 + 0.2,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const packages = [
  {
    name: "Starter",
    price: "₹10,000",
    tagline: "Launch your brand into orbit",
    features: [
      "3 Custom Brand Assets",
      "Basic Social Kit",
      "1 Revision Round",
      "Email Support",
      "7-Day Delivery",
    ],
    accent: "#32596D",
    glowColor: "rgba(50, 89, 109, 0.4)",
    badge: null,
  },
  {
    name: "Growth",
    price: "₹25,000",
    tagline: "Accelerate beyond the atmosphere",
    features: [
      "10 Custom Brand Assets",
      "Full Social Media Kit",
      "3 Revision Rounds",
      "Priority Support",
      "Landing Page Design",
      "5-Day Delivery",
    ],
    accent: "#C26464",
    glowColor: "rgba(194, 100, 100, 0.4)",
    badge: "MOST POPULAR",
  },
  {
    name: "Premium",
    price: "₹50,000",
    tagline: "Dominate the entire galaxy",
    features: [
      "Unlimited Brand Assets",
      "Full Brand Identity System",
      "Unlimited Revisions",
      "24/7 Dedicated Support",
      "Full Website Design",
      "Motion & Video Assets",
      "3-Day Delivery",
    ],
    accent: "#32596D",
    glowColor: "rgba(50, 89, 109, 0.4)",
    badge: null,
  },
];

function StarField() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: "white",
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function NebulaBg() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 0%, #0d1f2d 0%, #06111a 40%, #020a0f 100%)",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "-5%",
        width: "55%", height: "60%",
        background: "radial-gradient(ellipse, rgba(150,60,40,0.18) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute", top: "-5%", left: "-5%",
        width: "50%", height: "55%",
        background: "radial-gradient(ellipse, rgba(30,80,110,0.22) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute", top: "40%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "60%", height: "40%",
        background: "radial-gradient(ellipse, rgba(20,55,80,0.15) 0%, transparent 70%)",
        filter: "blur(80px)",
      }} />
    </div>
  );
}

function PricingCard({ pkg, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const isPopular = pkg.badge === "MOST POPULAR";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        flex: "1 1 0",
        minWidth: "280px",
        maxWidth: "360px",
        display: "flex",
        flexDirection: "column",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.95)",
        transition: `opacity 0.7s ${index * 0.15}s ease, transform 0.7s ${index * 0.15}s ease`,
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <div style={{
          position: "absolute",
          top: "-14px",
          left: "50%",
          transform: "translateX(-50%)",
          background: `linear-gradient(135deg, ${pkg.accent}, #a84040)`,
          color: "white",
          fontSize: "10px",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          letterSpacing: "3px",
          padding: "4px 18px",
          borderRadius: "20px",
          whiteSpace: "nowrap",
          zIndex: 10,
          boxShadow: `0 4px 20px ${pkg.glowColor}`,
        }}>
          {pkg.badge}
        </div>
      )}

      {/* Card */}
      <div style={{
        position: "relative",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: hovered
          ? "rgba(255,255,255,0.055)"
          : "rgba(255,255,255,0.03)",
        border: isPopular
          ? `1px solid ${pkg.accent}88`
          : "1px solid rgba(255,255,255,0.09)",
        borderRadius: "20px",
        padding: "36px 32px 40px",
        backdropFilter: "blur(20px)",
        overflow: "hidden",
        transition: "background 0.3s ease, border 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 30px 80px ${pkg.glowColor}, 0 0 0 1px ${pkg.accent}44`
          : isPopular
          ? `0 20px 60px ${pkg.glowColor}`
          : "0 8px 32px rgba(0,0,0,0.4)",
        cursor: "pointer",
      }}>
        {/* Inner glow top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, ${pkg.accent}88, transparent)`,
        }} />

        {/* Package name */}
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "13px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: pkg.accent,
          marginBottom: "20px",
        }}>
          {pkg.name}
        </div>

        {/* Price block */}
        <div style={{
          background: `linear-gradient(135deg, ${pkg.accent}22, ${pkg.accent}08)`,
          border: `1px solid ${pkg.accent}44`,
          borderRadius: "14px",
          padding: "20px 22px 16px",
          marginBottom: "10px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "80%", height: "80%",
            background: `radial-gradient(ellipse, ${pkg.accent}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
          <div style={{ display: "flex", alignItems: "flex-start", gap: "4px", position: "relative" }}>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              color: pkg.accent,
              lineHeight: 1.2,
              marginTop: "8px",
            }}>₹</span>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "72px",
              lineHeight: 1,
              color: "white",
              letterSpacing: "-3px",
              textShadow: `0 0 40px ${pkg.accent}88, 0 2px 20px rgba(0,0,0,0.6)`,
            }}>
              {pkg.price.replace("₹", "").replace(",000", "")}
            </span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "18px",
              color: "rgba(255,255,255,0.5)",
              alignSelf: "flex-end",
              marginBottom: "10px",
              marginLeft: "2px",
            }}>,000</span>
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "11px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: `${pkg.accent}cc`,
            marginTop: "2px",
          }}>
            per project
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "13px",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "26px",
          lineHeight: 1.5,
          paddingLeft: "2px",
        }}>
          {pkg.tagline}
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: `linear-gradient(90deg, ${pkg.accent}55, transparent)`,
          marginBottom: "26px",
        }} />

        {/* Features — flex: 1 pushes CTA to bottom */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", flex: 1 }}>
          {pkg.features.map((f, i) => (
            <li key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "rgba(255,255,255,0.72)",
              marginBottom: "13px",
            }}>
              <span style={{
                width: "6px", height: "6px",
                borderRadius: "50%",
                background: pkg.accent,
                flexShrink: 0,
                boxShadow: `0 0 8px ${pkg.accent}`,
              }} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA Button — always at bottom */}
        <button style={{
          width: "100%",
          padding: "14px 24px",
          borderRadius: "10px",
          border: isPopular ? "none" : `1px solid ${pkg.accent}66`,
          background: isPopular
            ? `linear-gradient(135deg, ${pkg.accent}, ${pkg.accent}cc)`
            : "transparent",
          color: "white",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: isPopular ? `0 8px 30px ${pkg.glowColor}` : "none",
          backdropFilter: "blur(10px)",
          marginTop: "auto",
        }}
          onMouseEnter={(e) => {
            e.target.style.background = `linear-gradient(135deg, ${pkg.accent}, ${pkg.accent}cc)`;
            e.target.style.boxShadow = `0 8px 30px ${pkg.glowColor}`;
            e.target.style.border = "none";
          }}
          onMouseLeave={(e) => {
            if (!isPopular) {
              e.target.style.background = "transparent";
              e.target.style.boxShadow = "none";
              e.target.style.border = `1px solid ${pkg.accent}66`;
            }
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes twinkle {
          0%, 100% { opacity: var(--op, 0.4); transform: scale(1); }
          50% { opacity: 0.1; transform: scale(0.6); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #06111a; }
        ::-webkit-scrollbar-thumb { background: #32596D; border-radius: 3px; }
      `}</style>

      <div
        ref={ref}
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          background: "#060d14",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "80px 24px 100px",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <NebulaBg />
        <StarField />

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1100px" }}>

          {/* Section label */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "28px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#C26464",
              boxShadow: "0 0 12px #C26464",
              animation: "twinkle 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}>
              Our Packages
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 6vw, 72px)",
            lineHeight: 1.05,
            textAlign: "center",
            color: "white",
            marginBottom: "16px",
            letterSpacing: "-1.5px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease",
          }}>
            Transparent Pricing.<br />
            <span style={{
              background: `linear-gradient(135deg, #32596D, #C26464)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Zero Surprises.
            </span>
          </h2>

          {/* Subheadline */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "16px",
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
            marginBottom: "64px",
            lineHeight: 1.7,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease",
          }}>
            Transparent pricing built for ambitious brands. Scale up anytime<br />
            — no hidden fees, no lock-ins.
          </p>

          {/* Cards — align-items: stretch makes all wrappers equal height */}
          <div style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "wrap",
          }}>
            {packages.map((pkg, i) => (
              <PricingCard key={pkg.name} pkg={pkg} index={i} visible={visible} />
            ))}
          </div>

          {/* Footer note */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: "rgba(255,255,255,0.28)",
            textAlign: "center",
            marginTop: "48px",
            letterSpacing: "0.5px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s 0.6s ease",
          }}>
            All packages include source files • Custom invoicing available • GST applicable
          </p>
        </div>
      </div>
    </>
  );
}