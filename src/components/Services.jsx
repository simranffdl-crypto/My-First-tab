import { useState } from "react";

const services = [
  {
    id: 1,
    number: "01",
    title: "Brand Strategy",
    description:
      "We craft narratives that position your brand at the intersection of culture and commerce. Deep research. Bold positioning.",
    tags: ["Identity", "Positioning", "Research"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 20 L20 12 L28 20 L20 28 Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 2,
    number: "02",
    title: "Digital Design",
    description:
      "Interfaces that feel inevitable. We design systems where every pixel earns its place — from wireframes to high-fidelity production.",
    tags: ["UI/UX", "Systems", "Prototyping"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <rect x="6" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 32 L26 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 28 L20 32" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 16 L18 20 L12 24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M22 22 L28 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 3,
    number: "03",
    title: "Motion & Film",
    description:
      "From title sequences to full campaigns. We direct, animate, and produce visual stories that move people — literally.",
    tags: ["Animation", "Direction", "Production"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 15 L28 20 L16 25 Z" fill="currentColor" />
        <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 4,
    number: "04",
    title: "Technology",
    description:
      "Custom platforms, interactive experiences, and infrastructure. We build what doesn't exist yet and scale what does.",
    tags: ["Engineering", "Platforms", "Interaction"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <path d="M8 14 L16 20 L8 26" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M18 26 L32 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="28" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M28 11 L28 17 M25 14 L31 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 5,
    number: "05",
    title: "Content & Copy",
    description:
      "Words that work. Manifestos, campaigns, editorial content — language shaped to persuade, provoke, and endure.",
    tags: ["Copywriting", "Editorial", "Voice"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <path d="M10 10 L30 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 16 L26 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 22 L30 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 28 L20 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="32" cy="30" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 6,
    number: "06",
    title: "Strategy & Growth",
    description:
      "Data-informed, instinct-led. We map pathways to sustainable growth through channels, audiences, and moments that matter.",
    tags: ["Growth", "Analytics", "Planning"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <path d="M8 30 L14 20 L20 24 L28 12 L34 16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="34" cy="10" r="4" fill="currentColor" />
        <path d="M8 30 L34 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        <path d="M8 8 L8 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
];

export default function ServicesComponent() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --ink: #0a0a08;
          --cream: #f5f2ec;
          --gold: #b8974a;
          --gold-light: #d4b87a;
          --muted: #9a9287;
          --border: rgba(10,10,8,0.12);
          --border-hover: rgba(184,151,74,0.4);
          --card-bg: #faf8f4;
        }

        .services-wrapper {
          min-height: 100vh;
          background-color: var(--cream);
          font-family: 'DM Mono', monospace;
          padding: 80px 40px;
          position: relative;
          overflow: hidden;
        }

        .bg-grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          z-index: 0;
        }

        .services-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .services-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 72px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border);
        }

        .header-left {}

        .header-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--gold);
        }

        .header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 300;
          color: var(--ink);
          line-height: 0.95;
          letter-spacing: -0.02em;
        }

        .header-title em {
          font-style: italic;
          color: var(--gold);
        }

        .header-count {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.1em;
          padding-bottom: 8px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background-color: var(--border);
          border: 1px solid var(--border);
        }

        .service-card {
          background: var(--card-bg);
          padding: 40px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(184,151,74,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-card:hover::before,
        .service-card.active::before {
          opacity: 1;
        }

        .service-card:hover,
        .service-card.active {
          background: #fff;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }

        .card-number {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: var(--gold);
          letter-spacing: 0.15em;
          font-weight: 400;
          padding-top: 2px;
        }

        .card-icon {
          color: var(--ink);
          opacity: 0.6;
          transition: opacity 0.3s ease, color 0.3s ease, transform 0.4s ease;
        }

        .service-card:hover .card-icon,
        .service-card.active .card-icon {
          opacity: 1;
          color: var(--gold);
          transform: rotate(8deg) scale(1.05);
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: var(--ink);
          letter-spacing: -0.01em;
          margin-bottom: 14px;
          transition: color 0.3s ease;
          line-height: 1.1;
        }

        .service-card:hover .card-title,
        .service-card.active .card-title {
          color: var(--ink);
        }

        .card-description {
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          line-height: 1.7;
          color: var(--muted);
          font-weight: 300;
          margin-bottom: 28px;
          flex: 1;
          transition: color 0.3s ease;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease;
        }

        .service-card:hover .card-description,
        .service-card.active .card-description {
          max-height: 120px;
          opacity: 1;
        }

        .card-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: auto;
        }

        .card-tag {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          border: 1px solid var(--border);
          padding: 4px 10px;
          font-family: 'DM Mono', monospace;
          font-weight: 400;
          transition: all 0.3s ease;
        }

        .service-card:hover .card-tag,
        .service-card.active .card-tag {
          border-color: var(--border-hover);
          color: var(--gold);
        }

        .card-arrow {
          position: absolute;
          bottom: 32px;
          right: 32px;
          width: 28px;
          height: 28px;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          color: var(--gold);
        }

        .service-card:hover .card-arrow,
        .service-card.active .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .services-footer {
          margin-top: 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }

        .footer-note {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
        }

        .cta-button {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: 1px solid var(--ink);
          padding: 14px 28px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--ink);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 0;
        }

        .cta-button:hover::before {
          transform: translateX(0);
        }

        .cta-button:hover {
          color: var(--cream);
        }

        .cta-button span {
          position: relative;
          z-index: 1;
        }

        .cta-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .cta-button:hover .cta-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 700px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .services-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .services-wrapper {
            padding: 48px 24px;
          }
          .service-card {
            padding: 28px 24px;
          }
        }
      `}</style>

      <div className="services-wrapper">
        <div className="bg-grain" />
        <div className="services-inner">

          {/* Header */}
          <header className="services-header">
            <div className="header-left">
              <div className="header-eyebrow">What we do</div>
              <h1 className="header-title">
                Our <em>Services</em>
              </h1>
            </div>
            <div className="header-count">06 disciplines</div>
          </header>

          {/* Grid */}
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-card ${activeId === service.id ? "active" : ""}`}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  setActiveId(activeId === service.id ? null : service.id)
                }
              >
                <div className="card-top">
                  <span className="card-number">{service.number}</span>
                  <div className="card-icon">{service.icon}</div>
                </div>

                <h2 className="card-title">{service.title}</h2>

                <p className="card-description">{service.description}</p>

                <div className="card-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="card-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <svg
                  className="card-arrow"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 14 L22 14 M15 7 L22 14 L15 21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="services-footer">
            <span className="footer-note">Hover to explore — click to expand</span>
            <button className="cta-button">
              <span>Start a project</span>
              <svg
                className="cta-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2 8 L14 8 M9 3 L14 8 L9 13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}