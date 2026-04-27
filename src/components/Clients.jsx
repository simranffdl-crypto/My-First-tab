import { useState, useEffect, useRef } from "react";

const companies = [
  {
    name: "Google",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    color: "#4285F4",
  },
  {
    name: "Shopify",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <path d="M15.337 23.979l5.763-1.247S18.905 7.57 18.89 7.46c-.016-.111-.112-.183-.207-.183-.096 0-1.72-.032-1.72-.032s-1.15-1.118-1.28-1.245v17.98z" fill="#95BF47"/>
        <path d="M12.41 3.492s-.238.07-.63.19c-.062-.2-.16-.448-.29-.693-.43-.826-1.058-1.264-1.814-1.265-.052 0-.106.005-.16.01-.023-.027-.047-.054-.072-.08C9.08 1.27 8.555 1.08 7.93 1.1 6.72 1.14 5.52 2.02 4.55 3.573c-.695 1.108-1.222 2.5-1.37 3.576L1.4 7.66c-.636.2-.655.218-.738.82L0 19.344l12.41 2.132V3.492z" fill="#95BF47"/>
        <path d="M15.337 23.979V6l-.447-1.46c-.13.127-1.28 1.245-1.28 1.245s-1.624.032-1.72.032c-.095 0-.191.072-.207.183-.015.11-2.2 15.272-2.2 15.272l5.854-1.293z" fill="#5E8E3E"/>
        <path d="M9.897 8.47l-.671 1.993s-.592-.316-1.312-.316c-1.057 0-1.11.664-1.11.832 0 .914 2.385 1.265 2.385 3.41 0 1.686-1.07 2.773-2.513 2.773-1.73 0-2.612-1.078-2.612-1.078l.462-1.528s.91.78 1.675.78c.5 0 .706-.394.706-.682 0-1.193-1.957-1.245-1.957-3.218 0-1.654 1.19-3.258 3.587-3.258.924 0 1.36.264 1.36.264z" fill="#fff"/>
      </svg>
    ),
    color: "#95BF47",
  },
  {
    name: "Amazon",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M13.958 10.09c0 1.232.032 2.257-.59 3.351-.502.891-1.3 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.698-3.182v.685zm3.186 7.705a.661.661 0 01-.75.074c-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.097v-.41c0-.753.058-1.64-.382-2.29-.383-.578-1.124-.817-1.773-.817-1.204 0-2.278.617-2.54 1.894-.054.285-.264.567-.547.58l-3.063-.33c-.258-.057-.545-.266-.472-.66C5.97 2.358 8.763 1.5 11.28 1.5c1.286 0 2.966.342 3.978 1.315 1.286 1.2 1.163 2.802 1.163 4.543v4.117c0 1.237.512 1.78 .995 2.45.17.239.207.526-.01.703l-1.263 1.167z" fill="#FF9900"/>
        <path d="M20.945 18.497c-2.362 1.743-5.784 2.667-8.731 2.667-4.13 0-7.847-1.527-10.658-4.065-.22-.2-.023-.472.242-.317 3.035 1.765 6.79 2.823 10.67 2.823 2.615 0 5.492-.542 8.138-1.665.4-.17.737.261.34.557z" fill="#FF9900"/>
        <path d="M21.886 17.402c-.302-.387-1.998-.183-2.76-.092-.232.028-.267-.174-.058-.32 1.351-.95 3.569-.676 3.826-.357.258.32-.067 2.543-1.337 3.603-.195.163-.38.076-.294-.14.286-.71.925-2.306.623-2.694z" fill="#FF9900"/>
      </svg>
    ),
    color: "#FF9900",
  },
  {
    name: "Meta",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M6.915 4.03c-1.968 2.232-2.948 5.013-3.17 7.988C3.612 14.99 4.49 18.07 6.391 20.686c.714.978 1.583 1.832 2.568 2.535 3.025 2.124 7.172 2.586 10.515.672 1.617-.935 3.095-2.42 3.948-4.054.748-1.455 1.17-3.019 1.17-4.643 0-2.826-.87-5.41-2.537-7.523-1.478-1.887-3.581-3.27-5.94-3.63-2.18-.335-4.439.22-6.2 1.987z" fill="url(#meta_grad)"/>
        <path d="M3.7 12.058c.15-2.804 1.045-5.567 2.93-7.696 1.682-1.904 4.065-2.893 6.46-2.893 4.71 0 8.622 3.695 9.07 8.297.186 1.93-.104 3.87-.834 5.64-.734 1.775-1.882 3.34-3.362 4.52-1.476 1.179-3.274 1.83-5.125 1.83-4.888 0-8.886-3.869-9.14-8.698z" fill="none"/>
        <path d="M8.5 9C7.12 9 6 10.12 6 11.5S7.12 14 8.5 14c.58 0 1.11-.2 1.53-.52L12 16l1.97-2.52c.42.32.95.52 1.53.52C16.88 14 18 12.88 18 11.5S16.88 9 15.5 9c-.77 0-1.45.35-1.91.9L12 12.1 10.41 9.9C9.95 9.35 9.27 9 8.5 9z" fill="white"/>
        <defs>
          <linearGradient id="meta_grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0064E1"/>
            <stop offset="1" stopColor="#0082FB"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    color: "#0082FB",
  },
  {
    name: "HubSpot",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <path d="M18.164 7.93V5.82a1.943 1.943 0 001.12-1.76V4a1.944 1.944 0 00-1.943-1.944h-.058A1.944 1.944 0 0015.34 4v.059a1.943 1.943 0 001.118 1.758v2.114a5.517 5.517 0 00-2.625 1.152L6.987 4.065a2.384 2.384 0 00.065-.543 2.397 2.397 0 10-2.397 2.397c.45 0 .87-.127 1.228-.343l6.731 4.95a5.534 5.534 0 00-.737 2.747c0 1.01.273 1.957.748 2.772l-2.048 2.049a1.867 1.867 0 00-.545-.086 1.892 1.892 0 101.892 1.892 1.87 1.87 0 00-.086-.545l2.022-2.022a5.555 5.555 0 003.375 1.138 5.572 5.572 0 000-11.142zm0 8.386a2.815 2.815 0 110-5.63 2.815 2.815 0 010 5.63z" fill="#FF7A59"/>
      </svg>
    ),
    color: "#FF7A59",
  },
  {
    name: "Stripe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" fill="#635BFF"/>
      </svg>
    ),
    color: "#635BFF",
  },
];

const StarField = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.1,
    delay: Math.random() * 4,
  }));

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
            animation: `twinkle 3s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const LogoCard = ({ company, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "28px 32px",
        borderRadius: "16px",
        border: `1px solid ${hovered ? company.color + "55" : "rgba(255,255,255,0.06)"}`,
        background: hovered
          ? `linear-gradient(135deg, ${company.color}12, rgba(255,255,255,0.03))`
          : "rgba(255,255,255,0.03)",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
        transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 20px 40px ${company.color}22, 0 0 0 1px ${company.color}33` : "none",
        animationDelay: `${index * 0.1}s`,
        animation: "fadeUp 0.6s ease forwards",
        opacity: 0,
        minWidth: "140px",
      }}
    >
      {/* Glow dot top-right */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "14px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: hovered ? company.color : "rgba(255,255,255,0.15)",
          transition: "background 0.3s",
          boxShadow: hovered ? `0 0 8px ${company.color}` : "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56px",
          height: "56px",
          borderRadius: "14px",
          background: hovered ? `${company.color}22` : "rgba(255,255,255,0.06)",
          transition: "all 0.3s",
          filter: hovered ? "none" : "grayscale(40%)",
        }}
      >
        {company.icon}
      </div>

      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
          letterSpacing: "0.04em",
          transition: "color 0.3s",
          textTransform: "uppercase",
        }}
      >
        {company.name}
      </span>
    </div>
  );
};

export default function TrustedBySection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.4); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.6; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .stat-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2.4rem;
          background: linear-gradient(90deg, #C26464, #32596D, #C26464);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid rgba(194, 100, 100, 0.35);
          background: rgba(194, 100, 100, 0.08);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C26464;
          margin-bottom: 24px;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(50, 89, 109, 0.4), rgba(194, 100, 100, 0.4), transparent);
          margin: 48px 0;
        }
      `}</style>

      <section
        ref={ref}
        style={{
          position: "relative",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #0d1b2a 0%, #090c12 40%, #060709 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 24px",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Star field */}
        <StarField />

        {/* Ambient blobs */}
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: "350px", height: "350px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(50,89,109,0.18) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "8%",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(194,100,100,0.15) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "960px", width: "100%", textAlign: "center" }}>

          {/* Badge */}
          {visible && (
            <div style={{ animation: "slideIn 0.5s ease forwards" }}>
              <span className="badge-pill">
                <span style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#C26464",
                  boxShadow: "0 0 8px #C26464",
                  display: "inline-block",
                  position: "relative",
                }}>
                  <span style={{
                    position: "absolute", inset: "-4px",
                    borderRadius: "50%", border: "1px solid rgba(194,100,100,0.4)",
                    animation: "pulseRing 2s ease-out infinite",
                  }} />
                </span>
                Our Clients
              </span>
            </div>
          )}

          {/* Headline */}
          {visible && (
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
              animation: "slideIn 0.6s ease 0.1s forwards",
              opacity: 0,
            }}>
              Trusted by{" "}
              <span style={{
                fontStyle: "italic",
                color: "#C26464",
              }}>
                real brands,
              </span>
              <br />
              <span style={{ color: "#32596D" }}>real results.</span>
            </h2>
          )}

          {/* Subtext */}
          {visible && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto 56px",
              animation: "slideIn 0.6s ease 0.2s forwards",
              opacity: 0,
            }}>
              From early-stage startups to global enterprises — we deliver
              strategies that move the needle.
            </p>
          )}

          {/* Logo Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "16px",
            justifyItems: "center",
            marginBottom: "64px",
          }}>
            {visible && companies.map((company, i) => (
              <LogoCard key={company.name} company={company} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div className="divider-line" />

          {/* Stats Row */}
          {visible && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(32px, 8vw, 80px)",
              flexWrap: "wrap",
              animation: "slideIn 0.6s ease 0.7s forwards",
              opacity: 0,
            }}>
              {[
                { num: "200+", label: "Brands Scaled" },
                { num: "4.9★", label: "Client Rating" },
                { num: "98%", label: "Retention Rate" },
              ].map(({ num, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div className="stat-num">{num}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA note */}
          {visible && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.2)",
              marginTop: "48px",
              letterSpacing: "0.05em",
              animation: "slideIn 0.6s ease 0.9s forwards",
              opacity: 0,
            }}>
              Join 200+ brands growing with us →
            </p>
          )}
        </div>
      </section>
    </>
  );
}