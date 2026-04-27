import { useEffect } from "react";

const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .pf-footer {
    background: #0d1b22;
    padding: 60px 48px 0;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
  }
  .pf-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
    gap: 40px;
    padding-bottom: 48px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  @media (max-width: 768px) {
    .pf-grid {
      grid-template-columns: 1fr 1fr;
    }
    .pf-footer {
      padding: 40px 24px 0;
    }
  }
  @media (max-width: 480px) {
    .pf-grid {
      grid-template-columns: 1fr;
    }
  }
  .pf-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 26px;
    letter-spacing: -0.5px;
    color: #fff;
    margin: 0 0 14px;
  }
  .pf-logo span {
    color: #C26464;
  }
  .pf-about {
    font-weight: 300;
    font-size: 14px;
    line-height: 1.75;
    color: rgba(255,255,255,0.5);
    max-width: 220px;
    margin: 0;
  }
  .pf-col-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #32596D;
    margin: 0 0 18px;
  }
  .pf-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .pf-list li {
    font-weight: 400;
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
  }
  .pf-list li:hover {
    color: #C26464;
  }
  .pf-list li::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #32596D;
    flex-shrink: 0;
  }
  .pf-contact-label {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.5px;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    margin: 0 0 3px;
  }
  .pf-contact-val {
    font-weight: 400;
    font-size: 14px;
    color: rgba(255,255,255,0.65);
    margin: 0;
    cursor: pointer;
    transition: color 0.2s;
  }
  .pf-contact-val:hover {
    color: #C26464;
  }
  .pf-contact-item {
    margin-bottom: 14px;
  }
  .pf-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 0;
    flex-wrap: wrap;
    gap: 8px;
  }
  .pf-copy {
    font-weight: 300;
    font-size: 13px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.2px;
    margin: 0;
  }
  .pf-copy strong {
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
  }
  .pf-tagline {
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #32596D;
    margin: 0;
  }
  .pf-accent-bar {
    height: 3px;
    background: linear-gradient(90deg, #32596D 0%, #C26464 100%);
  }
`;

const services = ["SEO Optimization", "Social Media", "Brand Strategy", "Performance Ads"];
const links = ["Home", "About", "Work", "Blog"];

export default function PixonadFooter() {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = footerStyles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  return (
    <footer className="pf-footer">
      <div className="pf-grid">

        {/* Logo + About */}
        <div>
          <p className="pf-logo">
            Pixo<span>nad</span>
          </p>
          <p className="pf-about">
            We craft bold digital experiences for brands that dare to stand out —
            strategy, design, and performance in one place.
          </p>
        </div>

        {/* Services */}
        <div>
          <p className="pf-col-title">Services</p>
          <ul className="pf-list">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <p className="pf-col-title">Links</p>
          <ul className="pf-list">
            {links.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="pf-col-title">Contact</p>
          <div className="pf-contact-item">
            <p className="pf-contact-label">Email</p>
            <p className="pf-contact-val">hello@pixonad.com</p>
          </div>
          <div className="pf-contact-item">
            <p className="pf-contact-label">Phone</p>
            <p className="pf-contact-val">+1 (800) 746-9663</p>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="pf-bottom">
        <p className="pf-copy">
          © 2026 <strong>Pixonad.</strong> All rights reserved.
        </p>
        <p className="pf-tagline">Real brands. Real results.</p>
      </div>

      <div className="pf-accent-bar" />
    </footer>
  );
}