import { useState, useEffect, useRef, useCallback } from "react";

const reasons = [
  {
    id: "01",
    title: "Data-Driven Marketing",
    description:
      "Every decision backed by real analytics. We track, measure, and optimize every campaign using live data — so your budget always goes where it performs best.",
    tags: ["Analytics", "A/B Testing", "Insights"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: "#32596D",
  },
  {
    id: "02",
    title: "Experienced Team",
    description:
      "Our team brings 10+ years of hands-on experience across SEO, paid media, content, and web. We've built strategies for 200+ brands — from startups to enterprise.",
    tags: ["10+ Years", "200+ Brands", "Certified"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "#C26464",
  },
  {
    id: "03",
    title: "ROI-Focused Strategy",
    description:
      "We don't chase vanity metrics. Every strategy is engineered to deliver measurable returns — our clients average 3.8× ROI across paid and organic channels.",
    tags: ["3.8× Avg ROI", "Performance", "Revenue"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    color: "#32596D",
  },
  {
    id: "04",
    title: "Transparent Reporting",
    description:
      "No black boxes. You get live dashboards, weekly reports, and monthly strategy calls. You always know what's happening with your campaigns — and why.",
    tags: ["Live Dashboard", "Weekly Reports", "Full Access"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    color: "#C26464",
  },
];

// Seeded random so stars are stable across re-renders
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const StarField = ({ mouseX, mouseY }) => {
  const rand = seededRandom(42);
  const stars = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 2.5 + 0.5,
    opacity: rand() * 0.55 + 0.1,
    delay: rand() * 5,
    depth: rand() * 0.8 + 0.2,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((s) => {
        const px = (mouseX - 0.5) * -18 * s.depth;
        const py = (mouseY - 0.5) * -18 * s.depth;
        return (
          <div
            key={s.id}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "white",
              opacity: s.opacity,
              animation: `twinkle ${2 + s.delay}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
              transform: `translate(${px}px, ${py}px)`,
              transition: "transform 0.4s ease-out",
            }}
          />
        );
      })}
    </div>
  );
};

const Particles = () => {
  const rand = seededRandom(99);
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100 + 20,
    size: rand() * 3 + 1,
    color: rand() > 0.5 ? "rgba(50,89,109,0.5)" : "rgba(194,100,100,0.4)",
    duration: rand() * 8 + 6,
    delay: rand() * 8,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            animation: `particleDrift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const MetricCard = ({ value, label, color, delay }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "16px 20px",
      textAlign: "center",
      backdropFilter: "blur(8px)",
      transition: "transform 0.25s ease, border-color 0.25s ease, background 0.25s ease",
      animation: `countUp 0.5s ease ${delay} backwards`,
      cursor: "default",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
    }}
  >
    <div style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
  </div>
);

const MiniChart = () => {
  const points = [20, 35, 28, 50, 45, 65, 60, 80, 75, 95];
  const w = 220, h = 80;
  const ptsArr = points.map((v, i) => [
    (i / (points.length - 1)) * w,
    h - (v / 100) * h,
  ]);
  const pathD = ptsArr.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = ptsArr[i - 1];
    const cx1 = px + (x - px) * 0.5;
    const cy1 = py;
    const cx2 = px + (x - px) * 0.5;
    const cy2 = y;
    return `${acc} C ${cx1} ${cy1} ${cx2} ${cy2} ${x} ${y}`;
  }, "");
  const fillD = `${pathD} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C26464" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#C26464" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#chartGrad)" />
      <path
        d={pathD}
        fill="none"
        stroke="#C26464"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={600}
        strokeDashoffset={600}
        style={{ animation: "chartDraw 2s ease 0.8s forwards" }}
      />
      <circle
        cx={ptsArr[ptsArr.length - 1][0]}
        cy={ptsArr[ptsArr.length - 1][1]}
        r="4"
        fill="#C26464"
        style={{ opacity: 0, animation: "countUp 0.4s ease 2.5s forwards" }}
      />
    </svg>
  );
};

const VisualPanel = () => (
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: 480,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      opacity: 0,
      animation: "slideIn 0.8s ease 0.4s forwards",
    }}
  >
    {/* Main performance card */}
    <div
      style={{
        background: "linear-gradient(135deg, rgba(50,89,109,0.25) 0%, rgba(18,22,35,0.9) 100%)",
        border: "1px solid rgba(50,89,109,0.4)",
        borderRadius: 20,
        padding: 28,
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(50,89,109,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Glow blob */}
      <div style={{
        position: "absolute", top: -40, right: -40, width: 160, height: 160,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(194,100,100,0.15) 0%, transparent 70%)",
      }} />

      {/* Scanline sweep */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20, overflow: "hidden", pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(transparent, rgba(194,100,100,0.15), transparent)",
          animation: "scanline 5s linear infinite",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>Campaign Performance</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>+142%</div>
          <div style={{ fontSize: 12, color: "#C26464", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>↑ avg growth this quarter</div>
        </div>
        {/* Live badge with pulsing dot */}
        <div style={{
          background: "rgba(194,100,100,0.15)",
          border: "1px solid rgba(194,100,100,0.3)",
          borderRadius: 8,
          padding: "6px 12px",
          fontSize: 11,
          color: "#C26464",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.06em",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%", background: "#C26464",
            boxShadow: "0 0 6px #C26464",
            animation: "twinkle 1.5s ease-in-out infinite",
          }} />
          LIVE
        </div>
      </div>

      <MiniChart />

      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: "#C26464" }} /> Paid Ads
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: "#32596D" }} /> Organic
        </div>
      </div>
    </div>

    {/* Metrics row */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
      <MetricCard value="200+" label="Clients"      color="#fff"     delay="0.6s" />
      <MetricCard value="3.8×" label="Avg ROI"     color="#C26464"  delay="0.75s" />
      <MetricCard value="98%"  label="Satisfaction" color="#32596D" delay="0.9s" />
    </div>

    {/* Floating trust badge */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(50,89,109,0.2)",
        border: "1px solid rgba(50,89,109,0.5)",
        borderRadius: 12,
        padding: "12px 18px",
        backdropFilter: "blur(8px)",
        animation: "floatY 6s ease-in-out infinite",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(50,89,109,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: "linear-gradient(135deg, #32596D, #1a3a4a)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Syne', sans-serif" }}>Trusted by 200+ brands globally</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>HubSpot · Google · Meta · Salesforce</div>
      </div>
    </div>
  </div>
);

export default function WhyChoosePixonad() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });

  const aurora1Ref = useRef(null);
  const aurora2Ref = useRef(null);
  const aurora3Ref = useRef(null);
  const sectionRef = useRef(null);

  // Auto-rotate active card
  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((i) => (i + 1) % reasons.length), 3000);
    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for parallax + aurora movement
  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setMouse({ x: nx, y: ny });
    setCursorPos({ x: e.clientX, y: e.clientY });

    if (aurora1Ref.current) {
      const dx = (nx - 0.5) * 80;
      const dy = (ny - 0.5) * 60;
      aurora1Ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
    if (aurora2Ref.current) {
      const dx = (nx - 0.5) * -60;
      const dy = (ny - 0.5) * -40;
      aurora2Ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
    if (aurora3Ref.current) {
      const dx = (nx - 0.5) * 40;
      const dy = (ny - 0.5) * 50;
      aurora3Ref.current.style.transform = `translate(${dx}px, ${dy}px) rotate(${nx * 60}deg)`;
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-12px); }
        }
        @keyframes rotateBlob {
          0%   { transform: rotate(0deg)   scale(1);    }
          50%  { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1);    }
        }
        @keyframes aurora {
          0%   { transform: translateX(0%)  translateY(0%)  scale(1);    opacity: 0.6; }
          33%  { transform: translateX(8%)  translateY(-6%) scale(1.1);  opacity: 0.4; }
          66%  { transform: translateX(-5%) translateY(8%)  scale(0.95); opacity: 0.7; }
          100% { transform: translateX(0%)  translateY(0%)  scale(1);    opacity: 0.6; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes chartDraw {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0;   }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%);  }
        }
        @keyframes particleDrift {
          0%   { transform: translateY(0)     translateX(0)    scale(1);   opacity: 0.6; }
          50%  {                                                             opacity: 1;   }
          100% { transform: translateY(-120px) translateX(30px) scale(0.3); opacity: 0;   }
        }

        .reason-card {
          border-radius: 16px;
          padding: 20px 22px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .reason-card:hover {
          transform: translateX(8px) !important;
        }
        .reason-card:hover .icon-wrap {
          transform: rotate(-8deg) scale(1.1);
        }
        .icon-wrap {
          transition: transform 0.3s ease;
        }
        .tag-pill {
          transition: all 0.2s ease;
        }
        .tag-pill:hover {
          opacity: 1 !important;
          transform: scale(1.05);
        }
      `}</style>

      {/* Cursor glow — follows mouse globally */}
      <div
        style={{
          position: "fixed",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,100,100,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          left: cursorPos.x,
          top: cursorPos.y,
          transition: "left 0.08s ease-out, top 0.08s ease-out",
          zIndex: 9999,
          mixBlendMode: "screen",
        }}
      />

      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        style={{
          background: "#080c14",
          position: "relative",
          padding: "100px 0",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── Aurora blobs (mouse-driven) ── */}
        <div
          ref={aurora1Ref}
          style={{
            position: "absolute", left: "5%", top: "10%",
            width: 700, height: 700, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(50,89,109,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
            transition: "transform 0.15s ease-out",
            animation: "aurora 10s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <div
          ref={aurora2Ref}
          style={{
            position: "absolute", right: "8%", bottom: "15%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(194,100,100,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
            transition: "transform 0.2s ease-out",
            animation: "aurora 14s ease-in-out infinite reverse",
            willChange: "transform",
          }}
        />
        <div
          ref={aurora3Ref}
          style={{
            position: "absolute", left: "35%", top: "50%",
            width: 400, height: 400,
            borderRadius: "40% 60% 55% 45% / 50% 40% 60% 50%",
            background: "radial-gradient(circle, rgba(100,150,194,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            transition: "transform 0.28s ease-out",
            animation: "rotateBlob 20s linear infinite",
            willChange: "transform",
          }}
        />

        {/* ── Subtle grid overlay ── */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(50,89,109,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(50,89,109,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* ── Parallax starfield ── */}
        <StarField mouseX={mouse.x} mouseY={mouse.y} />

        {/* ── Drifting particles ── */}
        <Particles />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

          {/* ── Section header ── */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 72,
              opacity: 0,
              animation: "fadeUp 0.7s ease 0.2s forwards",
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999,
              padding: "6px 18px",
              marginBottom: 20,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#C26464",
                boxShadow: "0 0 8px #C26464, 0 0 16px rgba(194,100,100,0.4)",
              }} />
              <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", fontWeight: 500 }}>
                Why Choose Us
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(38px, 5vw, 62px)",
              fontWeight: 800,
              color: "#fff",
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}>
              The agency that{" "}
              <span style={{
                background: "linear-gradient(135deg, #C26464 0%, #e08080 50%, #ff9999 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}>
                actually delivers
              </span>
            </h2>

            <p style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "16px auto 0",
              fontWeight: 400,
            }}>
              We combine strategy, creativity, and technology to build marketing engines that compound over time.
            </p>
          </div>

          {/* ── Main 2-column layout ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}>

            {/* LEFT: Visual panel */}
            <VisualPanel />

            {/* RIGHT: Reason cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {reasons.map((r, i) => {
                const isActive = activeIndex === i;
                const rgb = r.color === "#32596D" ? "50,89,109" : "194,100,100";

                return (
                  <div
                    key={r.id}
                    className="reason-card"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      background: isActive
                        ? `rgba(${rgb},0.12)`
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isActive ? r.color + "55" : "rgba(255,255,255,0.07)"}`,
                      opacity: 0,
                      animation: `fadeUp 0.6s ease ${0.5 + i * 0.12}s forwards`,
                      transform: isActive ? "translateX(4px)" : undefined,
                    }}
                  >
                    {/* Active left border accent */}
                    {isActive && (
                      <div style={{
                        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                        background: `linear-gradient(to bottom, ${r.color}, transparent)`,
                        borderRadius: "16px 0 0 16px",
                      }} />
                    )}

                    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      {/* Icon */}
                      <div
                        className="icon-wrap"
                        style={{
                          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                          background: `${r.color}22`,
                          border: `1px solid ${r.color}44`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: r.color,
                          position: "relative",
                        }}
                      >
                        {r.icon}
                        {isActive && (
                          <div style={{
                            position: "absolute", inset: 0, borderRadius: 12,
                            border: `1px solid ${r.color}`,
                            animation: "pulse-ring 1.8s ease-out infinite",
                          }} />
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <h3 style={{
                            margin: 0, fontSize: 16, fontWeight: 700, color: "#fff",
                            fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em",
                          }}>{r.title}</h3>
                          <span style={{
                            fontSize: 11, color: r.color,
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, opacity: 0.7,
                          }}>{r.id}</span>
                        </div>

                        <p style={{
                          margin: 0, fontSize: 13.5, color: "rgba(255,255,255,0.5)",
                          lineHeight: 1.65, fontWeight: 400,
                        }}>{r.description}</p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
                          {r.tags.map((tag) => (
                            <span
                              key={tag}
                              className="tag-pill"
                              style={{
                                fontSize: 11,
                                padding: "4px 10px",
                                borderRadius: 999,
                                background: `${r.color}18`,
                                border: `1px solid ${r.color}40`,
                                color: r.color,
                                fontWeight: 600,
                                letterSpacing: "0.04em",
                                opacity: isActive ? 1 : 0.6,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}