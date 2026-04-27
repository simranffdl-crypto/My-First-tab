import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: "01",
    quote:
      "Pixonad helped us increase our website traffic by 200% in just 3 months. Their SEO strategies are unlike anything we've tried before.",
    author: "Sarah Mitchell",
    role: "CEO, NovaBrand",
    metric: "+200%",
    metricLabel: "Website Traffic",
    tags: ["SEO", "Link Building"],
  },
  {
    id: "02",
    quote:
      "Their Google Ads campaigns delivered a 3.8x ROI within weeks. The precision targeting and A/B testing approach is genuinely world-class.",
    author: "Arjun Mehta",
    role: "Founder, ScaleOps",
    metric: "3.8x",
    metricLabel: "Avg. ROI",
    tags: ["PPC", "Remarketing"],
  },
  {
    id: "03",
    quote:
      "Social media went from a chore to our biggest lead source. Pixonad's content strategy turned our followers into a real, engaged community.",
    author: "Lena Kovács",
    role: "CMO, Driftly",
    metric: "91%",
    metricLabel: "Engagement Rate",
    tags: ["Social Media", "Growth"],
  },
  {
    id: "04",
    quote:
      "We finally have a website that converts. Within 60 days of the redesign, our conversion rate jumped from 1.2% to over 4.7%.",
    author: "Marcus Osei",
    role: "Head of Growth, Finfolk",
    metric: "+4.7%",
    metricLabel: "Conversion Rate",
    tags: ["Web Design", "Analytics"],
  },
  {
    id: "05",
    quote:
      "Working with Pixonad felt like having a full in-house team. They understood our brand in the first week and delivered beyond expectations.",
    author: "Priya Nair",
    role: "Director, Luminary Co.",
    metric: "98%",
    metricLabel: "Satisfaction",
    tags: ["Strategy", "Content"],
  },
  {
    id: "06",
    quote:
      "Our email campaigns used to get ignored. After Pixonad rebuilt our funnel, open rates went up 67% and we closed 3x more deals per quarter.",
    author: "Daniel Reyes",
    role: "VP Sales, Orbitly",
    metric: "+67%",
    metricLabel: "Email Open Rate",
    tags: ["Email Marketing", "Funnel"],
  },
  {
    id: "07",
    quote:
      "We scaled from 500 to 18,000 monthly organic visitors in under six months. Pixonad's technical SEO audit alone was worth every rupee.",
    author: "Tanvi Sharma",
    role: "Growth Lead, Vaultbase",
    metric: "36x",
    metricLabel: "Organic Traffic",
    tags: ["Technical SEO", "Analytics"],
  },
  {
    id: "08",
    quote:
      "The remarketing strategy they built cut our cost-per-acquisition by nearly half. We were spending more and getting less before Pixonad stepped in.",
    author: "James Whitfield",
    role: "Marketing Director, Stackr",
    metric: "−48%",
    metricLabel: "Cost Per Acquisition",
    tags: ["Remarketing", "PPC"],
  },
  {
    id: "09",
    quote:
      "Pixonad doesn't just run campaigns — they become obsessed with your growth. Our brand awareness score doubled in Q2 and we didn't lift a finger.",
    author: "Amara Diallo",
    role: "Co-Founder, Helio Labs",
    metric: "2x",
    metricLabel: "Brand Awareness",
    tags: ["Brand Strategy", "Community"],
  },
];

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1L9.854 5.757L15 6.36L11.25 9.892L12.292 15L8 12.481L3.708 15L4.75 9.892L1 6.36L6.146 5.757L8 1Z"
      fill="#C26464"
    />
  </svg>
);

const QuoteIcon = () => (
  <svg width="26" height="20" viewBox="0 0 32 24" fill="none">
    <path
      d="M0 24V14.4C0 10.56 0.96 7.28 2.88 4.56C4.88 1.84 7.76 0.16 11.52 0L12.48 2.16C10.24 2.72 8.52 3.84 7.32 5.52C6.2 7.12 5.68 8.96 5.76 11.04H11.52V24H0ZM19.52 24V14.4C19.52 10.56 20.48 7.28 22.4 4.56C24.4 1.84 27.28 0.16 31.04 0L32 2.16C29.76 2.72 28.04 3.84 26.84 5.52C25.72 7.12 25.2 8.96 25.28 11.04H31.04V24H19.52Z"
      fill="#32596D"
      opacity="0.55"
    />
  </svg>
);

const Tag = ({ label }) => (
  <span style={{
    border: "1px solid rgba(50,89,109,0.5)",
    color: "rgba(170,195,210,0.75)",
    fontSize: "10px",
    letterSpacing: "0.07em",
    padding: "3px 9px",
    borderRadius: "20px",
    fontFamily: "'Syne', sans-serif",
    textTransform: "uppercase",
    fontWeight: 600,
  }}>
    {label}
  </span>
);

function TestimonialCard({ t, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive
          ? "linear-gradient(145deg, rgba(50,89,109,0.22) 0%, rgba(194,100,100,0.12) 100%)"
          : "rgba(255,255,255,0.028)",
        border: isActive
          ? "1px solid rgba(194,100,100,0.42)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "18px",
        padding: "30px 26px",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
        transform: isActive ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        boxShadow: isActive
          ? "0 24px 64px rgba(194,100,100,0.13), 0 4px 24px rgba(0,0,0,0.35)"
          : "0 4px 20px rgba(0,0,0,0.2)",
        flex: "0 0 316px",
        minHeight: "315px",
        display: "flex",
        flexDirection: "column",
        gap: "17px",
      }}
    >
      <span style={{
        position: "absolute", top: "18px", right: "22px",
        fontFamily: "'Syne', sans-serif",
        fontSize: "11px", fontWeight: 700,
        color: isActive ? "#C26464" : "rgba(255,255,255,0.16)",
        letterSpacing: "0.1em",
        transition: "color 0.4s",
      }}>{t.id}</span>

      <QuoteIcon />

      <p style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "13.5px",
        lineHeight: "1.78",
        color: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.48)",
        margin: 0,
        fontWeight: 400,
        transition: "color 0.4s",
        flex: 1,
      }}>
        "{t.quote}"
      </p>

      <div style={{
        display: "inline-flex", alignItems: "center", gap: "10px",
        background: "rgba(194,100,100,0.08)",
        border: "1px solid rgba(194,100,100,0.2)",
        borderRadius: "10px",
        padding: "7px 13px",
        alignSelf: "flex-start",
      }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "20px", fontWeight: 800,
          color: "#C26464", letterSpacing: "-0.03em",
        }}>{t.metric}</span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "10px",
          color: "rgba(255,255,255,0.42)",
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          fontWeight: 600,
        }}>{t.metricLabel}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
        <div style={{
          width: "37px", height: "37px", borderRadius: "50%",
          background: "linear-gradient(135deg, #32596D, #C26464)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: "14px", color: "#fff",
          flexShrink: 0,
        }}>{t.author[0]}</div>
        <div style={{ flex: 1 }}>
          <p style={{
            margin: 0, fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: "13px", color: "#fff",
          }}>{t.author}</p>
          <p style={{
            margin: 0, fontFamily: "'Syne', sans-serif",
            fontSize: "11px", color: "rgba(255,255,255,0.36)",
            fontWeight: 500,
          }}>{t.role}</p>
        </div>
        <div style={{ display: "flex", gap: "2px" }}>
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
      </div>

      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {t.tags.map((tag) => <Tag key={tag} label={tag} />)}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll(".t-card-wrap");
    if (cards[active]) {
      cards[active].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(testimonials.length - 1, a + 1));

  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.2 + 0.5,
    dur: Math.random() * 7 + 4,
    delay: Math.random() * 5,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(26px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes twinkle {
          0%,100% { opacity:0.12; transform:scale(1); }
          50% { opacity:0.85; transform:scale(1.55); }
        }
        @keyframes pulse-ring {
          0%   { transform:scale(1); opacity:0.7; }
          100% { transform:scale(2); opacity:0; }
        }
        .tcard-track::-webkit-scrollbar { display:none; }
        .nav-btn:hover:not(:disabled) {
          background:rgba(194,100,100,0.18) !important;
          border-color:rgba(194,100,100,0.5) !important;
          transform:scale(1.1) !important;
        }
        .nav-btn { transition:all 0.22s ease !important; }
        .dot-btn:hover { background:rgba(194,100,100,0.45) !important; }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: "#060810",
          minHeight: "100vh",
          padding: "96px 40px 80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Syne', sans-serif",
        }}
      >
        {/* Starfield */}
        {particles.map((p) => (
          <div key={p.id} style={{
            position: "absolute",
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: "50%", background: "#fff",
            animation: `twinkle ${p.dur}s ${p.delay}s ease-in-out infinite`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Ambient blobs */}
        <div style={{
          position: "absolute", top: "5%", left: "2%",
          width: "520px", height: "520px",
          background: "radial-gradient(circle, rgba(50,89,109,0.17) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "8%", right: "2%",
          width: "440px", height: "440px",
          background: "radial-gradient(circle, rgba(194,100,100,0.11) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Badge */}
          <div style={{
            display: "flex", justifyContent: "center", marginBottom: "26px",
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeUp 0.6s ease forwards" : "none",
          }}>
            <span style={{
              border: "1px solid rgba(194,100,100,0.38)",
              borderRadius: "40px", padding: "6px 18px",
              display: "flex", alignItems: "center", gap: "8px",
              fontFamily: "'Syne', sans-serif",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.13em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#C26464", display: "inline-block",
                boxShadow: "0 0 8px #C26464", position: "relative",
              }}>
                <span style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "#C26464",
                  animation: "pulse-ring 1.6s ease-out infinite",
                }} />
              </span>
              What Our Clients Say
            </span>
          </div>

          {/* Heading — Syne 800, matching "Services built for real growth" */}
          <div style={{
            textAlign: "center", marginBottom: "68px",
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeUp 0.7s 0.1s ease forwards" : "none",
          }}>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(40px, 7vw, 88px)",
              fontWeight: 800,
              lineHeight: 1.0,
              margin: "0 0 18px",
              letterSpacing: "-0.03em",
            }}>
              <span style={{ color: "#fff" }}>Trusted by </span>
              <span style={{ color: "#C26464" }}>real</span>
              <br />
              <span style={{ color: "#fff" }}>brands, </span>
              <span style={{
                WebkitTextStroke: "2px #32596D",
                color: "transparent",
              }}>real results</span>
            </h2>
            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              maxWidth: "450px",
              marginInline: "auto",
              lineHeight: 1.65,
              fontWeight: 400,
            }}>
              Over 200 brands have grown with Pixonad. Here's what some of them had to say.
            </p>
          </div>

          {/* Card scroll track */}
          <div style={{
            position: "relative",
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeUp 0.8s 0.22s ease forwards" : "none",
          }}>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 12,
              width: "56px", zIndex: 2, pointerEvents: "none",
              background: "linear-gradient(to right, #060810, transparent)",
            }} />
            <div style={{
              position: "absolute", right: 0, top: 0, bottom: 12,
              width: "56px", zIndex: 2, pointerEvents: "none",
              background: "linear-gradient(to left, #060810, transparent)",
            }} />

            <div
              ref={trackRef}
              className="tcard-track"
              style={{
                display: "flex", gap: "18px",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                paddingBottom: "10px",
                paddingInline: "8px",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {testimonials.map((t, i) => (
                <div key={t.id} className="t-card-wrap"
                  style={{ scrollSnapAlign: "center", flexShrink: 0 }}>
                  <TestimonialCard
                    t={t}
                    isActive={active === i}
                    onClick={() => setActive(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: "18px", marginTop: "36px",
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeUp 0.8s 0.32s ease forwards" : "none",
          }}>
            <button className="nav-btn" onClick={prev} disabled={active === 0}
              style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: active === 0 ? "rgba(255,255,255,0.16)" : "#fff",
                cursor: active === 0 ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "17px",
              }}>←</button>

            <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
              {testimonials.map((_, i) => (
                <button key={i} className="dot-btn" onClick={() => setActive(i)}
                  style={{
                    width: active === i ? "26px" : "7px",
                    height: "7px", borderRadius: "4px",
                    background: active === i ? "#C26464" : "rgba(255,255,255,0.17)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "all 0.32s cubic-bezier(0.23,1,0.32,1)",
                  }} />
              ))}
            </div>

            <button className="nav-btn" onClick={next} disabled={active === testimonials.length - 1}
              style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: active === testimonials.length - 1 ? "rgba(255,255,255,0.16)" : "#fff",
                cursor: active === testimonials.length - 1 ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "17px",
              }}>→</button>
          </div>

          {/* Counter */}
          <p style={{
            textAlign: "center", marginTop: "12px",
            fontFamily: "'Syne', sans-serif",
            fontSize: "11px", fontWeight: 700,
            color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em",
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeUp 0.8s 0.38s ease forwards" : "none",
          }}>
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </p>

          {/* Stats bar */}
          <div style={{
            display: "flex", justifyContent: "center",
            marginTop: "68px", paddingTop: "44px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeUp 0.9s 0.44s ease forwards" : "none",
          }}>
            {[
              { val: "200+", label: "Clients Served" },
              { val: "3.8x",  label: "Average ROI" },
              { val: "98%",  label: "Satisfaction" },
              { val: "36x",  label: "Best Traffic Growth" },
            ].map((s, i, arr) => (
              <div key={s.label} style={{
                textAlign: "center", padding: "0 44px",
                borderRight: i < arr.length - 1
                  ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <p style={{
                  margin: "0 0 5px",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "40px", fontWeight: 800,
                  color: "#C26464", letterSpacing: "-0.03em", lineHeight: 1,
                }}>{s.val}</p>
                <p style={{
                  margin: 0,
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "10px", fontWeight: 700,
                  color: "rgba(255,255,255,0.28)",
                  letterSpacing: "0.13em", textTransform: "uppercase",
                }}>{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}