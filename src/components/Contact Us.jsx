import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --teal: #32596D;
    --rose: #C26464;
    --teal-light: #3e6e87;
    --rose-light: #d47a7a;
    --bg: #0d0d0f;
    --surface: rgba(255,255,255,0.04);
    --surface2: rgba(255,255,255,0.06);
    --text: #f0f0f0;
    --text-muted: #888;
    --border: rgba(255,255,255,0.08);
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  .starfield-canvas {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .bg-glow {
    position: fixed;
    bottom: -120px; right: -120px;
    width: 700px; height: 500px;
    background: radial-gradient(ellipse at 70% 80%, rgba(120,60,20,0.28) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
  }

  .contact-root {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  .container {
    position: relative;
    z-index: 1;
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 36px;
  }

  /* NAV */
  .nav {
    padding: 30px 0 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 26px;
    color: #fff;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  .nav-logo .pix-o { color: var(--rose); }
  .nav-links {
    display: flex; gap: 36px; list-style: none;
  }
  .nav-links a {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400; font-size: 14px;
    color: var(--text-muted); text-decoration: none;
    transition: color 0.2s; letter-spacing: 0.3px;
  }
  .nav-links a:hover, .nav-links a.active { color: #fff; }

  /* HERO centred */
  .hero {
    padding: 80px 0 56px;
    display: flex; flex-direction: column;
    align-items: center; text-align: center;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500; font-size: 11px;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--rose); margin-bottom: 28px;
    border: 1px solid rgba(194,100,100,0.35);
    border-radius: 100px; padding: 7px 18px;
  }
  .hero-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--rose); box-shadow: 0 0 8px var(--rose);
  }
  .hero-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(52px, 7vw, 88px);
    line-height: 0.93; letter-spacing: -4px;
    color: #fff; margin-bottom: 28px;
  }
  .hero-title .accent-teal { color: var(--teal-light); }
  .hero-title .accent-rose { color: var(--rose); }
  .hero-desc {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300; font-size: 17px; line-height: 1.75;
    color: var(--text-muted); max-width: 540px; margin-bottom: 48px;
  }
  .hero-stats { display: flex; gap: 56px; justify-content: center; }
  .stat-num {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 30px; color: #fff; line-height: 1;
  }
  .stat-num span { color: var(--rose); }
  .stat-label {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400; font-size: 12px; color: var(--text-muted); margin-top: 5px;
  }

  .divider { height: 1px; background: var(--border); margin-bottom: 48px; }

  /* MAIN GRID */
  .main-grid {
    display: grid; grid-template-columns: 1fr 1.55fr;
    gap: 28px; padding-bottom: 100px;
  }

  /* INFO PANEL */
  .info-panel { display: flex; flex-direction: column; gap: 20px; }
  .info-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 18px; padding: 26px 28px;
    position: relative; overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
    backdrop-filter: blur(10px);
  }
  .info-card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 3px; height: 100%; background: var(--teal);
    border-radius: 3px; transition: width 0.3s;
  }
  .info-card:hover { border-color: rgba(50,89,109,0.5); transform: translateX(4px); }
  .info-card:hover::before { width: 5px; }
  .info-card-icon {
    width: 42px; height: 42px;
    background: rgba(50,89,109,0.15); border: 1px solid rgba(50,89,109,0.3);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-size: 17px; margin-bottom: 14px;
  }
  .info-card-label {
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 10px;
    letter-spacing: 2.5px; text-transform: uppercase; color: var(--teal-light); margin-bottom: 6px;
  }
  .info-card-title {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px;
    color: #fff; margin-bottom: 6px;
  }
  .info-card-value {
    font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 14px;
    color: var(--text-muted); line-height: 1.65;
  }
  .info-card-value a { color: var(--rose-light); text-decoration: none; transition: color 0.2s; }
  .info-card-value a:hover { color: var(--rose); }

  .availability-card {
    background: linear-gradient(135deg, rgba(50,89,109,0.12), rgba(194,100,100,0.06));
    border: 1px solid rgba(50,89,109,0.35); border-radius: 18px;
    padding: 26px 28px; backdrop-filter: blur(10px);
  }
  .avail-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .avail-dot {
    width: 8px; height: 8px; background: #4ade80; border-radius: 50%;
    box-shadow: 0 0 10px rgba(74,222,128,0.6);
    animation: pulse-green 2s infinite;
  }
  @keyframes pulse-green { 0%,100%{opacity:1} 50%{opacity:0.35} }
  .avail-title { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 14px; color: #fff; }
  .avail-desc { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 13px; color: var(--text-muted); line-height: 1.65; }

  /* FORM PANEL */
  .form-panel {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 20px; padding: 44px 48px;
    position: relative; overflow: hidden;
    backdrop-filter: blur(12px);
  }
  .form-panel::after {
    content: ''; position: absolute; top: -80px; right: -80px;
    width: 240px; height: 240px;
    background: radial-gradient(circle, rgba(194,100,100,0.07), transparent 70%);
    pointer-events: none;
  }
  .form-header { margin-bottom: 32px; }
  .form-eyebrow {
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 11px;
    letter-spacing: 3px; text-transform: uppercase; color: var(--rose); margin-bottom: 10px;
  }
  .form-title {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 30px;
    letter-spacing: -1.5px; color: #fff; line-height: 1.1;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
  .field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 18px; }
  .field:last-child { margin-bottom: 0; }
  .field-label {
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 11px;
    letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted);
  }
  .field-label .req { color: var(--rose); margin-left: 3px; }
  .field-input {
    background: rgba(255,255,255,0.05); border: 1px solid var(--border);
    border-radius: 10px; padding: 13px 16px;
    font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 15px; color: #fff;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; width: 100%;
  }
  .field-input::placeholder { color: rgba(136,136,136,0.5); font-weight: 300; }
  .field-input:focus {
    border-color: var(--teal); background: rgba(50,89,109,0.1);
    box-shadow: 0 0 0 3px rgba(50,89,109,0.18);
  }
  .field-input.error { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(194,100,100,0.12); }
  .field-error { font-family: 'DM Sans', sans-serif; font-size: 12px; color: var(--rose-light); }
  textarea.field-input { resize: vertical; min-height: 128px; line-height: 1.65; }

  .submit-row {
    display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 28px;
  }
  .submit-note { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 13px; color: var(--text-muted); }
  .btn-submit {
    display: flex; align-items: center; gap: 10px;
    background: var(--teal); border: none; border-radius: 10px;
    padding: 15px 30px; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 14px; letter-spacing: 0.3px; color: #fff; cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative; overflow: hidden;
  }
  .btn-submit::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .btn-submit:hover { background: var(--teal-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(50,89,109,0.35); }
  .btn-submit:hover::before { opacity: 1; }
  .btn-submit:active { transform: translateY(0); }
  .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
  .btn-arrow { transition: transform 0.2s; }
  .btn-submit:hover .btn-arrow { transform: translateX(4px); }

  .success-overlay {
    position: absolute; inset: 0; background: rgba(13,13,15,0.96);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    border-radius: 20px; z-index: 10; animation: fadeIn 0.4s ease; backdrop-filter: blur(8px);
  }
  @keyframes fadeIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
  .success-icon {
    width: 68px; height: 68px; background: rgba(50,89,109,0.15);
    border: 2px solid var(--teal); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; margin-bottom: 22px; animation: pop 0.4s 0.1s both;
  }
  @keyframes pop { from{transform:scale(0)} to{transform:scale(1)} }
  .success-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px; letter-spacing: -1px; color: #fff; margin-bottom: 10px; }
  .success-desc { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 15px; color: var(--text-muted); text-align: center; max-width: 300px; line-height: 1.65; margin-bottom: 30px; }
  .btn-reset {
    background: transparent; border: 1px solid var(--border); border-radius: 10px; padding: 12px 26px;
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 14px;
    color: var(--text-muted); cursor: pointer; transition: border-color 0.2s, color 0.2s;
  }
  .btn-reset:hover { border-color: var(--teal); color: #fff; }

  .spinner {
    width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.25);
    border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to{transform:rotate(360deg)} }

  .footer-strip {
    border-top: 1px solid var(--border); padding: 26px 0;
    display: flex; align-items: center; justify-content: space-between;
  }
  .footer-left { font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 13px; color: var(--text-muted); }
  .footer-right { display: flex; gap: 14px; }
  .social-link {
    width: 34px; height: 34px; background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    font-size: 13px; cursor: pointer; transition: border-color 0.2s, background 0.2s;
    text-decoration: none; color: var(--text-muted); backdrop-filter: blur(6px);
  }
  .social-link:hover { border-color: var(--teal); background: rgba(50,89,109,0.15); color: #fff; }

  @media (max-width: 900px) {
    .main-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .hero-stats { gap: 28px; }
    .submit-row { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 600px) {
    .form-panel { padding: 28px 20px; }
    .nav-links { display: none; }
    .footer-strip { flex-direction: column; gap: 14px; }
    .hero-title { letter-spacing: -2.5px; }
  }
`;

const initialForm = { name: "", email: "", phone: "", message: "" };

function PixonadLogo() {
  return (
    <div className="nav-logo">
      Pix<span className="pix-o">o</span>nad
    </div>
  );
}

function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const stars = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 280; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.15,
        twinkleSpeed: Math.random() * 0.008 + 0.003,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha >= 0.85 || s.alpha <= 0.08) s.twinkleDir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="starfield-canvas" />;
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (form.phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    else if (form.message.trim().length < 20) e.message = "At least 20 characters please";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="contact-root">
        <Starfield />
        <div className="bg-glow" />
        <div className="container">
          <nav className="nav">
            <PixonadLogo />
            <ul className="nav-links">
              <li><a href="#">Work</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#" className="active">Contact</a></li>
            </ul>
          </nav>

          <div className="hero">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Get In Touch
            </div>
            <h1 className="hero-title">
              Let's build<br />
              <span className="accent-teal">something</span>{" "}
              <span className="accent-rose">great.</span>
            </h1>
            <p className="hero-desc">
              We partner with ambitious brands to craft digital experiences that don't just look good — they perform. Tell us about your vision.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">240<span>+</span></div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">98<span>%</span></div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">12<span>h</span></div>
                <div className="stat-label">Avg. Response Time</div>
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="main-grid">
            <div className="info-panel">
              <div className="info-card">
                <div className="info-card-icon">✉</div>
                <div className="info-card-label">Email Us</div>
                <div className="info-card-title">Drop a Line</div>
                <div className="info-card-value">
                  <a href="mailto:hello@pixonad.com">hello@pixonad.com</a><br />
                  <a href="mailto:work@pixonad.com">work@pixonad.com</a>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-icon">📞</div>
                <div className="info-card-label">Call Us</div>
                <div className="info-card-title">Talk Directly</div>
                <div className="info-card-value">
                  <a href="tel:+11234567890">+1 (123) 456-7890</a><br />
                  <a href="tel:+11234567891">+1 (123) 456-7891</a>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-icon">📍</div>
                <div className="info-card-label">Visit Us</div>
                <div className="info-card-title">Our Office</div>
                <div className="info-card-value">
                  340 Creative District, Suite 12<br />
                  New York, NY 10001<br />
                  United States
                </div>
              </div>
              <div className="availability-card">
                <div className="avail-header">
                  <div className="avail-dot" />
                  <div className="avail-title">Currently Accepting Projects</div>
                </div>
                <div className="avail-desc">Open to new partnerships for Q3 2026. We respond within one business day.</div>
              </div>
            </div>

            <div className="form-panel">
              {success && (
                <div className="success-overlay">
                  <div className="success-icon">✓</div>
                  <div className="success-title">Message Sent!</div>
                  <p className="success-desc">Thanks for reaching out. We'll get back to you within 12 hours.</p>
                  <button className="btn-reset" onClick={() => { setSuccess(false); setForm(initialForm); }}>Send Another Message</button>
                </div>
              )}
              <div className="form-header">
                <div className="form-eyebrow">Contact Form</div>
                <div className="form-title">Tell us about<br />your project</div>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="field">
                    <label className="field-label">Full Name <span className="req">*</span></label>
                    <input className={`field-input${errors.name ? " error" : ""}`} name="name" value={form.name} onChange={handleChange} placeholder="Alex Johnson" autoComplete="name" />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  <div className="field">
                    <label className="field-label">Email Address <span className="req">*</span></label>
                    <input className={`field-input${errors.email ? " error" : ""}`} type="email" name="email" value={form.email} onChange={handleChange} placeholder="alex@company.com" autoComplete="email" />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="field">
                  <label className="field-label">Phone Number</label>
                  <input className={`field-input${errors.phone ? " error" : ""}`} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" autoComplete="tel" />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
                <div className="field">
                  <label className="field-label">Your Message <span className="req">*</span></label>
                  <textarea className={`field-input${errors.message ? " error" : ""}`} name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project, goals, timeline, and budget..." />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>
                <div className="submit-row">
                  <span className="submit-note">We reply within 12 hours.</span>
                  <button className="btn-submit" type="submit" disabled={loading}>
                    {loading ? <><div className="spinner" /> Sending…</> : <>Send Message <span className="btn-arrow">→</span></>}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="footer-strip">
            <div className="footer-left">© 2026 Pixonad · Creative Digital Studio</div>
            <div className="footer-right">
              <a className="social-link" href="#" title="X">𝕏</a>
              <a className="social-link" href="#" title="LinkedIn">in</a>
              <a className="social-link" href="#" title="Dribbble">◉</a>
              <a className="social-link" href="#" title="Instagram">◈</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}