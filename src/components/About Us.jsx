import { useEffect, useRef, useState } from "react";

const checkpoints = [
  { icon: "◈", label: "SEO & Google Ranking" },
  { icon: "◈", label: "Social Media Growth" },
  { icon: "◈", label: "Paid Advertising" },
  { icon: "◈", label: "Website Development" },
  { icon: "◈", label: "Branding & Strategy" },
];

function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.003 + 0.001,
    }));
    function draw() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * 0.7})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function AboutPixonad() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .about-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

        .about-wrap {
          position: relative;
          min-height: 100vh;
          background: #060910;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
        }

        /* deep space radial blobs */
        .about-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 45% at 18% 25%, rgba(50,89,109,0.28) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 82% 70%, rgba(194,100,100,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 50% 50%, rgba(10,18,30,0.9) 0%, transparent 80%);
          pointer-events: none;
        }



        .about-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* LEFT COLUMN */
        .about-left {
          display: flex;
          flex-direction: column;
          gap: 0;
          align-items: center;
          text-align: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(50,89,109,0.18);
          border: 1px solid rgba(50,89,109,0.45);
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7aadca;
          width: fit-content;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .badge .dot {
          width: 6px; height: 6px;
          background: #C26464;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(1.4); }
        }

        .headline {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .headline span {
          color: #C26464;
        }

        .sub-headline {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(1.1rem, 1.8vw, 1.5rem);
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.01em;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s;
        }

        .divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #32596D, #C26464);
          margin-bottom: 28px;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: center;
          transition: opacity 0.5s ease 0.3s, transform 0.6s ease 0.3s;
        }

        .body-text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(200,215,230,0.72);
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #32596D 0%, #1e3d50 100%);
          border: 1px solid rgba(50,89,109,0.6);
          border-radius: 6px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.92rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          width: fit-content;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s, background 0.3s, box-shadow 0.3s;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transition: left 0.5s ease;
        }
        .cta-btn:hover::before { left: 100%; }
        .cta-btn:hover {
          background: linear-gradient(135deg, #3d6e87 0%, #2a4f66 100%);
          box-shadow: 0 0 24px rgba(50,89,109,0.45);
        }
        .cta-arrow {
          font-size: 1rem;
          transition: transform 0.3s;
        }
        .cta-btn:hover .cta-arrow { transform: translateX(4px); }

        /* RIGHT COLUMN */
        .about-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s;
        }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(50,89,109,0.9);
          margin-bottom: 6px;
        }

        .point-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.026);
          border: 1px solid rgba(50,89,109,0.22);
          border-radius: 8px;
          cursor: default;
          position: relative;
          overflow: hidden;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .point-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #32596D, #C26464);
          transform: scaleY(0);
          transition: transform 0.3s ease;
          border-radius: 0 2px 2px 0;
        }
        .point-item:hover {
          background: rgba(50,89,109,0.1);
          border-color: rgba(50,89,109,0.5);
          transform: translateX(4px);
        }
        .point-item:hover::before { transform: scaleY(1); }

        .point-check {
          width: 32px; height: 32px;
          background: rgba(194,100,100,0.12);
          border: 1px solid rgba(194,100,100,0.3);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 14px;
          color: #C26464;
          transition: background 0.3s, border-color 0.3s;
        }
        .point-item:hover .point-check {
          background: rgba(194,100,100,0.2);
          border-color: rgba(194,100,100,0.6);
        }

        .point-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.97rem;
          color: rgba(220,235,245,0.85);
          letter-spacing: 0.01em;
        }

        .point-num {
          margin-left: auto;
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          color: rgba(50,89,109,0.5);
          font-weight: 600;
        }

        /* VISIBLE STATE */
        .about-wrap.is-visible .badge,
        .about-wrap.is-visible .headline,
        .about-wrap.is-visible .sub-headline,
        .about-wrap.is-visible .body-text,
        .about-wrap.is-visible .cta-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .about-wrap.is-visible .divider {
          opacity: 1;
          transform: scaleX(1);
        }
        .about-wrap.is-visible .about-right {
          opacity: 1;
          transform: translateX(0);
        }

        /* stagger point items */
        .about-wrap.is-visible .point-item {
          animation: fadeUp 0.5s ease forwards;
        }
        .point-item { opacity: 0; }
        .point-item:nth-child(2) { animation-delay: 0.45s; }
        .point-item:nth-child(3) { animation-delay: 0.55s; }
        .point-item:nth-child(4) { animation-delay: 0.65s; }
        .point-item:nth-child(5) { animation-delay: 0.75s; }
        .point-item:nth-child(6) { animation-delay: 0.85s; }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(16px); }
          to   { opacity:1; transform: translateY(0); }
        }

        /* floating orb accent */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.18;
        }
        .orb-1 {
          width: 360px; height: 360px;
          background: #32596D;
          top: -100px; left: -80px;
          animation: drift1 12s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 280px; height: 280px;
          background: #C26464;
          bottom: -60px; right: -40px;
          animation: drift2 9s ease-in-out infinite alternate;
        }
        @keyframes drift1 {
          from { transform: translate(0,0); }
          to   { transform: translate(30px, 40px); }
        }
        @keyframes drift2 {
          from { transform: translate(0,0); }
          to   { transform: translate(-25px, -30px); }
        }

        @media (max-width: 768px) {
          .about-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about-right {
            transform: translateY(20px) !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`about-wrap${visible ? " is-visible" : ""}`}
      >
        <StarField />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="about-inner">
          {/* LEFT */}
          <div className="about-left">
            <div className="badge">
              <span className="dot" />
              About Pixonad
            </div>

            <h2 className="headline">
              Trusted by real brands,<br />
              <span>real results.</span>
            </h2>

            <p className="sub-headline">Your growth is our mission.</p>

            <div className="divider" />

            <p className="body-text">
              Pixonad is a digital marketing agency that helps businesses grow
              online through SEO, social media marketing, paid advertising, and
              high-converting websites. Our goal is to help brands increase
              traffic, leads, and sales using data-driven marketing strategies.
            </p>

            <button className="cta-btn">
              Explore Our Work
              <span className="cta-arrow">→</span>
            </button>
          </div>

          {/* RIGHT */}
          <div className="about-right">
            <p className="card-title">What We Offer</p>
            {checkpoints.map((pt, i) => (
              <div className="point-item" key={i}>
                <div className="point-check">✓</div>
                <span className="point-label">{pt.label}</span>
                <span className="point-num">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}