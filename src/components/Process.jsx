import { useState, useEffect, useRef } from "react";

const steps = [
  { number: "01", title: "Research", description: "We dive deep into your market, audience, and competitors — uncovering insights that shape every decision moving forward.", accent: "#C26464" },
  { number: "02", title: "Strategy", description: "Data meets vision. We craft a precise roadmap tailored to your goals, backed by evidence and built for execution.", accent: "#32596D" },
  { number: "03", title: "Execution", description: "Ideas become reality. Our team moves fast and deliberate, shipping work that's polished, purposeful, and on time.", accent: "#C26464" },
  { number: "04", title: "Optimization", description: "We measure everything that matters. Continuous refinement ensures performance keeps climbing after launch.", accent: "#32596D" },
  { number: "05", title: "Growth", description: "Momentum compounds. We scale what works, double down on wins, and set you up for sustainable long-term expansion.", accent: "#C26464" },
];

const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 100),
  y: ((i * 97.3) % 100),
  size: i % 5 === 0 ? 2.2 : i % 3 === 0 ? 1.5 : 1,
  opacity: 0.12 + (i % 8) * 0.07,
  delay: (i % 30) * 0.2,
  duration: 3 + (i % 6),
}));

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(null);
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes twinkle {
          0%,100% { opacity: var(--star-op); transform: scale(1); }
          50% { opacity: calc(var(--star-op) * 3); transform: scale(1.6); }
        }
        @keyframes floatOrb {
          0%,100% { transform: translate(0,0); }
          33% { transform: translate(14px,-20px); }
          66% { transform: translate(-10px,12px); }
        }
        @keyframes shimmerIn {
          0% { opacity:0; transform:translateY(44px) scale(0.96); filter:blur(6px); }
          100% { opacity:1; transform:translateY(0) scale(1); filter:blur(0); }
        }
        @keyframes fadeUp {
          0% { opacity:0; transform:translateY(24px); }
          100% { opacity:1; transform:translateY(0); }
        }
        @keyframes badgePop {
          0% { opacity:0; transform:scale(0.85) translateY(-8px); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes pulseRing {
          0%,100% { box-shadow: 0 0 0 0 rgba(194,100,100,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(194,100,100,0); }
        }
        @keyframes stepIn {
          0% { opacity:0; transform:translateX(-28px); }
          100% { opacity:1; transform:translateX(0); }
        }
        @keyframes barScale {
          0% { transform:scaleY(0); }
          100% { transform:scaleY(1); }
        }

        .ps-root {
          background: #070A0F;
          min-height: 100vh;
          padding: 110px 0 140px;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Space base gradient — matches screenshot's dark blue-black */
        .ps-bg-space {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 90% 55% at 50% -5%, rgba(12,30,58,0.9) 0%, transparent 65%),
            radial-gradient(ellipse 55% 45% at 15% 105%, rgba(8,22,42,0.75) 0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 88% 95%, rgba(15,20,38,0.6) 0%, transparent 55%),
            #070A0F;
        }

        /* Glowing nebula orbs */
        .ps-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; }
        .ps-orb-top {
          width: 900px; height: 600px;
          top: -200px; left: 50%; transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(18,55,100,0.28) 0%, rgba(8,28,60,0.12) 45%, transparent 70%);
          filter: blur(70px);
          animation: floatOrb 14s ease-in-out infinite;
        }
        .ps-orb-left {
          width: 480px; height: 480px;
          bottom: -60px; left: -120px;
          background: radial-gradient(circle, rgba(32,75,105,0.22) 0%, transparent 65%);
          filter: blur(100px);
          animation: floatOrb 18s ease-in-out infinite 3s reverse;
        }
        .ps-orb-right {
          width: 380px; height: 380px;
          top: 35%; right: -60px;
          background: radial-gradient(circle, rgba(194,100,100,0.07) 0%, transparent 65%);
          filter: blur(80px);
          animation: floatOrb 20s ease-in-out infinite 7s;
        }

        /* Stars */
        .ps-stars { position:absolute; inset:0; z-index:0; pointer-events:none; }
        .ps-star {
          position:absolute; border-radius:50%; background:#fff;
          animation: twinkle var(--dur) ease-in-out infinite var(--del);
        }

        /* Edge vignette */
        .ps-vignette {
          position:absolute; inset:0; z-index:0; pointer-events:none;
          background: radial-gradient(ellipse 110% 110% at 50% 50%, transparent 38%, rgba(7,10,15,0.75) 100%);
        }

        .ps-container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        /* ── HEADER centered ── */
        .ps-header {
          text-align: center;
          margin-bottom: 88px;
        }

        .ps-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(8px);
          padding: 8px 20px;
          border-radius: 100px;
          margin-bottom: 34px;
          opacity: 0;
        }
        .ps-badge.vis { animation: badgePop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s forwards; }
        .ps-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #C26464;
          animation: pulseRing 2.2s ease-in-out infinite;
        }

        .ps-headline {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(46px, 6.8vw, 82px);
          line-height: 1.0;
          letter-spacing: -0.025em;
          color: #fff;
          opacity: 0;
        }
        .ps-headline.vis { animation: shimmerIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.28s forwards; }
        .ps-hl-rose { color: #C26464; }
        .ps-hl-ghost {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(50,89,109,0.65);
        }

        .ps-sub {
          margin: 22px auto 0;
          max-width: 450px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.78;
          color: rgba(255,255,255,0.38);
          opacity: 0;
        }
        .ps-sub.vis { animation: fadeUp 0.7s ease 0.5s forwards; }

        .ps-ornament {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; margin-top: 38px;
          opacity: 0;
        }
        .ps-ornament.vis { animation: fadeUp 0.6s ease 0.68s forwards; }
        .ps-orn-line {
          height: 1px; width: 56px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1));
        }
        .ps-orn-line:last-child { background: linear-gradient(270deg, transparent, rgba(255,255,255,0.1)); }
        .ps-orn-dots { color: rgba(255,255,255,0.18); font-size: 9px; letter-spacing: 0.4em; }

        /* ── STEPS ── */
        .ps-steps { display: flex; flex-direction: column; }

        .ps-step {
          display: grid;
          grid-template-columns: 68px 1fr 48px;
          gap: 0 24px;
          align-items: center;
          cursor: pointer;
          padding: 30px 8px;
          border-top: 1px solid rgba(255,255,255,0.05);
          position: relative;
          opacity: 0;
        }
        .ps-step:last-child { border-bottom: 1px solid rgba(255,255,255,0.05); }
        .ps-step.vis { animation: stepIn 0.55s cubic-bezier(0.22,1,0.36,1) var(--step-delay) forwards; }

        /* Hover fill */
        .ps-step::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(90deg, rgba(255,255,255,0.02), transparent);
          opacity:0; transition:opacity 0.3s; border-radius:6px;
        }
        .ps-step:hover::before { opacity:1; }

        /* Active left bar */
        .ps-step-bar {
          position:absolute; left:0; top:0; bottom:0;
          width:2px; border-radius:2px;
          background: var(--step-accent);
          transform:scaleY(0); transform-origin:bottom;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ps-step.active .ps-step-bar { transform:scaleY(1); }

        .ps-num-col {
          display:flex; flex-direction:column; align-items:flex-end; gap:8px;
        }
        .ps-num {
          font-family:'Syne',sans-serif; font-weight:600;
          font-size:11px; letter-spacing:0.14em;
          color: var(--step-accent); opacity:0.45;
          transition:opacity 0.3s;
        }
        .ps-step:hover .ps-num, .ps-step.active .ps-num { opacity:1; }
        .ps-dot {
          width:7px; height:7px; border-radius:50%;
          background:rgba(255,255,255,0.1);
          transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .ps-step:hover .ps-dot, .ps-step.active .ps-dot {
          background: var(--step-accent);
          transform:scale(1.6);
          box-shadow: 0 0 9px var(--step-accent);
        }

        .ps-body { min-width:0; }
        .ps-title {
          font-family:'Syne',sans-serif; font-weight:700;
          font-size: clamp(24px, 3.2vw, 40px);
          letter-spacing:-0.02em; line-height:1.1;
          color:rgba(255,255,255,0.42);
          transition: color 0.35s ease;
        }
        .ps-step:hover .ps-title, .ps-step.active .ps-title { color:#fff; }

        .ps-desc-wrap {
          overflow:hidden; max-height:0; opacity:0;
          transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
        }
        .ps-step.active .ps-desc-wrap { max-height:110px; opacity:1; }
        .ps-desc {
          font-family:'DM Sans',sans-serif; font-weight:300;
          font-size:15px; line-height:1.78;
          color:rgba(255,255,255,0.38);
          padding-top:12px; max-width:580px;
        }

        .ps-arrow {
          width:42px; height:42px; border-radius:50%;
          border:1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0;
          transition: border-color 0.3s, background 0.3s, transform 0.38s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ps-step:hover .ps-arrow, .ps-step.active .ps-arrow {
          border-color: var(--step-accent);
          background: rgba(255,255,255,0.03);
          transform: rotate(45deg) scale(1.08);
        }
        .ps-arrow svg { transition:stroke 0.3s; stroke:rgba(255,255,255,0.22); }
        .ps-step:hover .ps-arrow svg, .ps-step.active .ps-arrow svg { stroke:var(--step-accent); }

        /* Progress */
        .ps-progress {
          display:flex; gap:6px; margin-top:60px;
        }
        .ps-prog-seg {
          height:2px; flex:1; border-radius:2px;
          background:rgba(255,255,255,0.07); overflow:hidden;
          transition:background 0.3s;
        }
        .ps-prog-seg.done { background:rgba(255,255,255,0.14); }
        .ps-prog-fill { height:100%; width:0%; border-radius:2px; transition:width 0.4s ease; }
        .ps-prog-seg.active .ps-prog-fill { width:100%; }

        @media (max-width:640px) {
          .ps-container { padding:0 20px; }
          .ps-step { grid-template-columns:48px 1fr 40px; gap:0 14px; }
        }
      `}</style>

      <section className="ps-root">
        <div className="ps-bg-space" />
        <div className="ps-orb ps-orb-top" />
        <div className="ps-orb ps-orb-left" />
        <div className="ps-orb ps-orb-right" />

        <div className="ps-stars">
          {STARS.map(s => (
            <div key={s.id} className="ps-star" style={{
              left:`${s.x}%`, top:`${s.y}%`,
              width:s.size, height:s.size,
              "--star-op":s.opacity, "--dur":`${s.duration}s`, "--del":`${s.delay}s`,
            }} />
          ))}
        </div>
        <div className="ps-vignette" />

        <div className="ps-container">
          {/* Centered header */}
          <div ref={headerRef} className="ps-header">
            <div className={`ps-badge${headerInView ? " vis" : ""}`}>
              <span className="ps-badge-dot" />
              Our Process
            </div>
            <h2 className={`ps-headline${headerInView ? " vis" : ""}`}>
              How we turn{" "}<span className="ps-hl-rose">ideas</span>
              <br />into{" "}<span className="ps-hl-ghost">real</span>{" "}results
            </h2>
            <p className={`ps-sub${headerInView ? " vis" : ""}`}>
              A five-phase framework designed to take your brand from raw insight to measurable impact — methodically, boldly, and at scale.
            </p>
            <div className={`ps-ornament${headerInView ? " vis" : ""}`}>
              <div className="ps-orn-line" />
              <span className="ps-orn-dots">✦ ✦ ✦</span>
              <div className="ps-orn-line" />
            </div>
          </div>

          {/* Steps */}
          <div className="ps-steps">
            {steps.map((step, i) => (
              <StepRow
                key={step.number}
                step={step}
                index={i}
                isActive={activeStep === i}
                onToggle={() => setActiveStep(activeStep === i ? null : i)}
                parentInView={headerInView}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="ps-progress">
            {steps.map((step, i) => (
              <div key={i} className={`ps-prog-seg${activeStep === i ? " active" : ""}${activeStep !== null && i < activeStep ? " done" : ""}`}>
                <div className="ps-prog-fill" style={{ background: step.accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StepRow({ step, index, isActive, onToggle, parentInView }) {
  const [ref, inView] = useInView(0.05);
  const show = parentInView || inView;

  return (
    <div
      ref={ref}
      className={`ps-step${show ? " vis" : ""}${isActive ? " active" : ""}`}
      style={{ "--step-accent": step.accent, "--step-delay": `${0.78 + index * 0.1}s` }}
      onClick={onToggle}
    >
      <div className="ps-step-bar" />
      <div className="ps-num-col">
        <span className="ps-num">{step.number}</span>
        <div className="ps-dot" />
      </div>
      <div className="ps-body">
        <div className="ps-title">{step.title}</div>
        <div className="ps-desc-wrap">
          <p className="ps-desc">{step.description}</p>
        </div>
      </div>
      <div className="ps-arrow">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="1.5">
          <path d="M2 7h10M7 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}