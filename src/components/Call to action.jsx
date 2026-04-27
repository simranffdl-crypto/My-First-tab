import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --deep: #0a1015;
    --teal: #32596D;
    --rose: #C26464;
    --teal-glow: rgba(50, 89, 109, 0.35);
    --rose-glow: rgba(194, 100, 100, 0.35);
    --text-dim: rgba(255,255,255,0.45);
    --text-mid: rgba(255,255,255,0.72);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cta-wrapper {
    min-height: 100vh;
    background: var(--deep);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Noise overlay ── */
  .cta-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* ── Ambient blobs ── */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(110px);
    pointer-events: none;
    z-index: 0;
  }
  .blob-teal {
    width: 520px; height: 520px;
    background: var(--teal);
    opacity: 0.18;
    top: -120px; left: -160px;
    animation: drift 14s ease-in-out infinite alternate;
  }
  .blob-rose {
    width: 400px; height: 400px;
    background: var(--rose);
    opacity: 0.14;
    bottom: -80px; right: -120px;
    animation: drift 18s ease-in-out infinite alternate-reverse;
  }
  @keyframes drift {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(40px, 30px) scale(1.08); }
  }

  /* ── Grid lines ── */
  .grid-lines {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(50,89,109,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(50,89,109,0.07) 1px, transparent 1px);
    background-size: 60px 60px;
    z-index: 0;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%);
  }

  /* ── Card ── */
  .cta-card {
    position: relative;
    z-index: 1;
    max-width: 820px;
    width: 90%;
    padding: 72px 64px 68px;
    border: 1px solid rgba(50, 89, 109, 0.28);
    border-radius: 20px;
    background: rgba(10, 16, 21, 0.72);
    backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.04) inset,
      0 40px 100px rgba(0,0,0,0.55);
    text-align: center;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .cta-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Corner accents ── */
  .corner {
    position: absolute;
    width: 18px; height: 18px;
    border-color: var(--rose);
    border-style: solid;
    opacity: 0.6;
  }
  .corner-tl { top: 16px; left: 16px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
  .corner-tr { top: 16px; right: 16px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
  .corner-bl { bottom: 16px; left: 16px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
  .corner-br { bottom: 16px; right: 16px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

  /* ── Eyebrow ── */
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--rose);
    margin-bottom: 28px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s;
  }
  .cta-card.visible .eyebrow { opacity: 1; transform: translateY(0); }
  .eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--rose);
    box-shadow: 0 0 8px var(--rose-glow);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.5); opacity: 0.6; }
  }

  /* ── Headline ── */
  .headline {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 6vw, 62px);
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: #fff;
    margin-bottom: 8px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
  }
  .cta-card.visible .headline { opacity: 1; transform: translateY(0); }
  .headline-accent {
    background: linear-gradient(100deg, #c26464 0%, #e8958a 55%, #c26464 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Sub-headline ── */
  .subhead {
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: clamp(20px, 3.2vw, 30px);
    color: rgba(255,255,255,0.62);
    letter-spacing: -0.01em;
    margin-bottom: 24px;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s;
  }
  .cta-card.visible .subhead { opacity: 1; transform: translateY(0); }

  /* ── Divider ── */
  .divider {
    width: 56px; height: 2px;
    margin: 0 auto 28px;
    background: linear-gradient(90deg, var(--teal), var(--rose));
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.6s ease 0.55s;
  }
  .cta-card.visible .divider { opacity: 1; }

  /* ── Body copy ── */
  .body-copy {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.75;
    color: var(--text-dim);
    max-width: 520px;
    margin: 0 auto 48px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.6s ease 0.62s, transform 0.6s ease 0.62s;
  }
  .cta-card.visible .body-copy { opacity: 1; transform: translateY(0); }

  /* ── Button group ── */
  .btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s ease 0.72s, transform 0.6s ease 0.72s;
  }
  .cta-card.visible .btn-group { opacity: 1; transform: translateY(0); }

  /* ── Primary button ── */
  .btn-primary {
    position: relative;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 15px;
    letter-spacing: 0.02em;
    color: #fff;
    background: linear-gradient(135deg, var(--teal) 0%, #1e3d4f 100%);
    border: 1px solid rgba(50,89,109,0.7);
    border-radius: 10px;
    padding: 16px 36px;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    box-shadow: 0 4px 24px rgba(50,89,109,0.35);
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 36px rgba(50,89,109,0.55), 0 0 0 1px var(--teal);
    border-color: var(--teal);
  }
  .btn-primary:hover::before { opacity: 1; }
  .btn-primary:active { transform: translateY(0); }

  .btn-primary .btn-icon {
    display: inline-block;
    margin-left: 8px;
    transition: transform 0.2s ease;
  }
  .btn-primary:hover .btn-icon { transform: translateX(4px); }

  /* ── Ghost button ── */
  .btn-ghost {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: var(--text-mid);
    background: transparent;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 15px 28px;
    cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }
  .btn-ghost:hover {
    color: #fff;
    border-color: rgba(194,100,100,0.45);
    background: rgba(194,100,100,0.06);
  }

  /* ── Trust strip ── */
  .trust-strip {
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 28px;
    flex-wrap: wrap;
    opacity: 0;
    transition: opacity 0.6s ease 0.88s;
  }
  .cta-card.visible .trust-strip { opacity: 1; }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 12.5px;
    color: var(--text-dim);
    letter-spacing: 0.01em;
  }
  .trust-icon {
    width: 18px; height: 18px;
    color: var(--teal);
    flex-shrink: 0;
  }
  .trust-sep {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: rgba(255,255,255,0.18);
  }

  @media (max-width: 600px) {
    .cta-card { padding: 52px 28px 48px; }
    .btn-group { flex-direction: column; width: 100%; }
    .btn-primary, .btn-ghost { width: 100%; }
  }
`;

const CheckIcon = () => (
  <svg className="trust-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="10" cy="10" r="8" />
    <path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <span className="btn-icon">→</span>
);

export default function PixonadCTA() {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ripple, setRipple] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y, id: Date.now() });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cta-wrapper">
        <div className="blob blob-teal" />
        <div className="blob blob-rose" />
        <div className="grid-lines" />

        <div ref={cardRef} className={`cta-card ${visible ? "visible" : ""}`}>
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Digital Growth Agency
          </div>

          <h1 className="headline">
            Ready to grow your<br />
            <span className="headline-accent">business?</span>
          </h1>

          <p className="subhead">
            Let Pixonad handle your digital marketing.
          </p>

          <div className="divider" />

          <p className="body-copy">
            From strategy to execution — SEO, paid media, social, and beyond.
            We build campaigns that convert and brands that last.
          </p>

          <div className="btn-group">
            <button
              className="btn-primary"
              onClick={handleRipple}
              style={{ position: "relative", overflow: "hidden" }}
            >
              {ripple && (
                <span style={{
                  position: "absolute",
                  left: ripple.x,
                  top: ripple.y,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.3)",
                  transform: "translate(-50%,-50%) scale(0)",
                  animation: "ripple-anim 0.6s ease-out forwards",
                  pointerEvents: "none",
                }} />
              )}
              Get Free Consultation <ArrowRight />
            </button>

            <button className="btn-ghost">
              See our work
            </button>
          </div>

          <div className="trust-strip">
            <div className="trust-item"><CheckIcon /> No commitment required</div>
            <div className="trust-sep" />
            <div className="trust-item"><CheckIcon /> 48-hour response</div>
            <div className="trust-sep" />
            <div className="trust-item"><CheckIcon /> 100+ brands scaled</div>
          </div>
        </div>

        <style>{`
          @keyframes ripple-anim {
            to { transform: translate(-50%,-50%) scale(28); opacity: 0; }
          }
        `}</style>
      </div>
    </>
  );
}