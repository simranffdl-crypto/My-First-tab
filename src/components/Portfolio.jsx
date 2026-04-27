import { useState } from "react";

const projects = [
  {
    id: "01",
    category: "SEO",
    title: "E-Commerce SEO Growth",
    client: "FashionHub India",
    description:
      "Full-funnel SEO overhaul — technical audit, content restructure, and aggressive link building that pushed a mid-size fashion brand to the top 3 results for 140+ keywords.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80",
    tags: ["Technical SEO", "Link Building", "Analytics"],
    results: [
      { label: "Organic Traffic", value: "+312%", sub: "in 6 months" },
      { label: "Keywords Ranked", value: "140+", sub: "top 3 positions" },
      { label: "Revenue Impact", value: "₹48L", sub: "attributed" },
    ],
    accentColor: "#C26464",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    id: "02",
    category: "Social Media",
    title: "Instagram Growth Campaign",
    client: "Bloom Skincare",
    description:
      "Strategic content overhaul with UGC-led reels, influencer micro-campaigns, and daily engagement loops that transformed a dormant brand into a community-first powerhouse.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80",
    tags: ["Content Creation", "Influencer", "Community"],
    results: [
      { label: "Followers Gained", value: "82K", sub: "in 90 days" },
      { label: "Avg Engagement", value: "9.4%", sub: "industry avg 1.2%" },
      { label: "Story Reach", value: "3.1M", sub: "monthly impressions" },
    ],
    accentColor: "#32596D",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    id: "03",
    category: "Web Design",
    title: "Website Redesign",
    client: "Apex Consulting",
    description:
      "End-to-end redesign of a B2B consulting firm's digital presence — new brand identity, conversion-optimised layout, and a CMS that their team can actually manage.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&q=80",
    tags: ["UI/UX", "Conversion", "CMS"],
    results: [
      { label: "Bounce Rate", value: "-54%", sub: "vs old site" },
      { label: "Lead Form Fills", value: "+218%", sub: "monthly avg" },
      { label: "Page Speed", value: "98", sub: "Lighthouse score" },
    ],
    accentColor: "#C26464",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: "04",
    category: "Google Ads",
    title: "Google Ads Campaign",
    client: "SwiftMove Logistics",
    description:
      "Performance Max + Search campaign rebuild with hyper-targeted ad groups, negative keyword sculpting, and landing page CRO that cut wasted spend and tripled conversions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
    tags: ["PPC", "Remarketing", "Conversion Tracking"],
    results: [
      { label: "ROAS", value: "7.2×", sub: "return on ad spend" },
      { label: "CPC Reduction", value: "-41%", sub: "vs previous agency" },
      { label: "Conversions", value: "+3×", sub: "same budget" },
    ],
    accentColor: "#32596D",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

const StarField = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: Math.random() > 0.7 ? "2px" : "1px",
          height: Math.random() > 0.7 ? "2px" : "1px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.6)",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 4}s`,
        }}
      />
    ))}
  </div>
);

export default function PortfolioSection() {
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredResult, setHoveredResult] = useState(null);

  return (
    <section style={styles.section}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(194,100,100,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(194,100,100,0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .card-hover {
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
        }
        .result-pill:hover {
          background: rgba(255,255,255,0.08) !important;
        }
        .tag-pill {
          transition: all 0.2s ease;
        }
        .tag-pill:hover {
          background: rgba(255,255,255,0.12) !important;
          color: #fff !important;
        }
        .cta-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .cta-btn:hover::before { transform: translateX(100%); }
        .cta-btn:hover { transform: scale(1.04); box-shadow: 0 8px 32px rgba(194,100,100,0.4); }
        .img-overlay {
          transition: opacity 0.4s ease;
        }
        .card-hover:hover .img-overlay {
          opacity: 0.6 !important;
        }
      `}</style>

      <StarField />

      {/* Section Header */}
      <div style={styles.header}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          <span style={styles.badgeText}>CASE STUDIES</span>
        </div>

        <h2 style={styles.heading}>
          Work that{" "}
          <span style={styles.headingAccent}>speaks</span>
          <br />
          for itself
        </h2>

        <p style={styles.subheading}>
          Real campaigns. Real brands. Real numbers — not vanity metrics.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={styles.grid}>
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="card-hover"
            onClick={() => setActiveCard(activeCard === project.id ? null : project.id)}
            style={{
              ...styles.card,
              animationDelay: `${idx * 0.12}s`,
              borderColor:
                activeCard === project.id
                  ? `${project.accentColor}55`
                  : "rgba(255,255,255,0.07)",
              cursor: "pointer",
            }}
          >
            {/* Image */}
            <div style={styles.imageWrap}>
              <img
                src={project.image}
                alt={project.title}
                style={styles.image}
              />
              <div
                className="img-overlay"
                style={{
                  ...styles.imageOverlay,
                  background: `linear-gradient(180deg, transparent 20%, ${project.accentColor}22 60%, #0a0f1a 100%)`,
                  opacity: 0.85,
                }}
              />
              {/* Number badge */}
              <span style={styles.numberBadge}>{project.id}</span>
              {/* Category chip */}
              <span style={{ ...styles.categoryChip, background: `${project.accentColor}22`, borderColor: `${project.accentColor}55`, color: project.accentColor }}>
                <span style={{ marginRight: 6, opacity: 0.9 }}>{project.icon}</span>
                {project.category}
              </span>
            </div>

            {/* Body */}
            <div style={styles.cardBody}>
              <div style={styles.clientRow}>
                <span style={styles.clientLabel}>CLIENT</span>
                <span style={styles.clientName}>{project.client}</span>
              </div>

              <h3 style={styles.cardTitle}>{project.title}</h3>
              <p style={styles.cardDesc}>{project.description}</p>

              {/* Tags */}
              <div style={styles.tagRow}>
                {project.tags.map((t) => (
                  <span key={t} className="tag-pill" style={styles.tag}>{t}</span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ ...styles.divider, background: `linear-gradient(90deg, ${project.accentColor}66, transparent)` }} />

              {/* Results */}
              <div style={styles.resultsGrid}>
                {project.results.map((r) => (
                  <div
                    key={r.label}
                    className="result-pill"
                    style={styles.resultPill}
                    onMouseEnter={() => setHoveredResult(`${project.id}-${r.label}`)}
                    onMouseLeave={() => setHoveredResult(null)}
                  >
                    <span style={{ ...styles.resultValue, color: project.accentColor }}>
                      {r.value}
                    </span>
                    <span style={styles.resultLabel}>{r.label}</span>
                    <span style={styles.resultSub}>{r.sub}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className="cta-btn"
                style={{ ...styles.cardCta, borderColor: `${project.accentColor}44` }}
                onClick={(e) => e.stopPropagation()}
              >
                View Full Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 8 }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={styles.bottomCta}>
        <p style={styles.bottomCtaText}>Ready to be our next success story?</p>
        <button className="cta-btn" style={styles.mainCta}>
          Start Your Campaign
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 10 }}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    background: "#080d14",
    fontFamily: "'DM Sans', sans-serif",
    padding: "100px 40px 80px",
    overflow: "hidden",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: 72,
    animation: "fadeUp 0.7s ease both",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 100,
    padding: "6px 18px",
    marginBottom: 28,
    background: "rgba(255,255,255,0.03)",
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#C26464",
    boxShadow: "0 0 8px #C26464",
    animation: "pulse 2s ease infinite",
    display: "inline-block",
  },
  badgeText: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 11,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.55)",
    fontWeight: 600,
  },
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(42px, 6vw, 76px)",
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.05,
    margin: "0 0 20px",
    letterSpacing: "-0.02em",
  },
  headingAccent: {
    color: "#C26464",
    fontStyle: "italic",
  },
  subheading: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 17,
    color: "rgba(255,255,255,0.45)",
    fontWeight: 300,
    margin: 0,
    letterSpacing: "0.01em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    maxWidth: 1280,
    margin: "0 auto",
  },
  card: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 20,
    overflow: "hidden",
    animation: "fadeUp 0.7s ease both",
    backdropFilter: "blur(6px)",
    transition: "border-color 0.3s ease",
  },
  imageWrap: {
    position: "relative",
    height: 200,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
  },
  numberBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    fontFamily: "'Syne', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.1em",
  },
  categoryChip: {
    position: "absolute",
    bottom: 16,
    left: 16,
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'Syne', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    padding: "5px 12px",
    borderRadius: 100,
    border: "1px solid",
    backdropFilter: "blur(12px)",
    textTransform: "uppercase",
  },
  cardBody: {
    padding: "24px 24px 20px",
  },
  clientRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  clientLabel: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 9,
    letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.3)",
    fontWeight: 700,
  },
  clientName: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    fontWeight: 400,
  },
  cardTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 10px",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  cardDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13.5,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.65,
    margin: "0 0 16px",
    fontWeight: 300,
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 20,
  },
  tag: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: "rgba(255,255,255,0.45)",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 100,
    padding: "4px 12px",
    cursor: "default",
    transition: "all 0.2s ease",
  },
  divider: {
    height: 1,
    marginBottom: 20,
    borderRadius: 1,
  },
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    marginBottom: 20,
  },
  resultPill: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    padding: "10px 6px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    cursor: "default",
    transition: "background 0.2s ease",
  },
  resultValue: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 20,
    fontWeight: 800,
    lineHeight: 1,
  },
  resultLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 9.5,
    color: "rgba(255,255,255,0.45)",
    textAlign: "center",
    letterSpacing: "0.04em",
  },
  resultSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 9,
    color: "rgba(255,255,255,0.25)",
    textAlign: "center",
  },
  cardCta: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    fontFamily: "'Syne', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.6)",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid",
    borderRadius: 10,
    padding: "11px 20px",
    cursor: "pointer",
    textTransform: "uppercase",
  },
  bottomCta: {
    textAlign: "center",
    marginTop: 72,
    animation: "fadeUp 0.8s ease both",
    animationDelay: "0.5s",
  },
  bottomCtaText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 20,
    fontWeight: 300,
  },
  mainCta: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'Syne', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "#fff",
    background: "linear-gradient(135deg, #C26464, #a04848)",
    border: "none",
    borderRadius: 12,
    padding: "16px 36px",
    cursor: "pointer",
    textTransform: "uppercase",
  },
};