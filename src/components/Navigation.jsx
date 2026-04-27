import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Stack, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const muiTheme = createTheme({ palette: { mode: "dark" }, typography: { fontFamily: "'DM Sans', sans-serif" } });
const COLORS = { teal: "#32596D", rose: "#C26464", tealLight: "#3e6e87", roseLight: "#d47a7a" };
const DEEP_BLUE = "#32596D";
const MUTED_RED = "#C26464";

/* ─── Global Styles + Keyframes ─── */
function GlobalStyles() {
  useEffect(() => {
    if (document.getElementById("pixonad-global")) return;
    const style = document.createElement("style");
    style.id = "pixonad-global";
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #060910; font-family: 'DM Sans', sans-serif; }
      @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.4)} }
      @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes spin { to{transform:rotate(360deg)} }
      @keyframes pop { from{transform:scale(0)} to{transform:scale(1)} }
      @keyframes fadeIn { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
      @keyframes drift1 { from{transform:translate(0,0)} to{transform:translate(30px,40px)} }
      @keyframes drift2 { from{transform:translate(0,0)} to{transform:translate(-25px,-30px)} }
      @keyframes pulseGreen { 0%,100%{opacity:1} 50%{opacity:.35} }
      @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.3} }
      @keyframes floatCard1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
      @keyframes floatCard2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
      @keyframes floatCard3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
      @keyframes lineGrow { from{stroke-dashoffset:400} to{stroke-dashoffset:0} }
      @keyframes glowPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
      @keyframes robotBlink { 0%,90%,100%{transform:scaleY(1)} 95%{transform:scaleY(0.1)} }
      @keyframes robotEar { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(8deg)} 75%{transform:rotate(-8deg)} }
      @keyframes cursorFloat { 0%,100%{transform:translate(-50%,-50%) rotate(-3deg) scale(1)} 50%{transform:translate(-50%,-50%) rotate(3deg) scale(1.05)} }
      @keyframes cursorClick { 0%{transform:translate(-50%,-50%) scale(1)} 40%{transform:translate(-50%,-50%) scale(0.78)} 100%{transform:translate(-50%,-50%) scale(1)} }
      @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

/* ─── StarField Canvas (for non-home pages) ─── */
function StarFieldCanvas({ count = 120, fixed = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let id;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2, alpha: Math.random(), speed: Math.random() * 0.004 + 0.001,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * 0.7})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={ref} style={{ position: fixed ? "fixed" : "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ─── NAVBAR ─── */
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Home", "About", "Services", "Blog", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(6,9,16,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(50,89,109,0.2)" : "1px solid transparent",
      transition: "all 0.35s ease", padding: "0 40px",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div onClick={() => setPage("Home")} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", cursor: "pointer", letterSpacing: "-0.5px" }}>
          Pix<span style={{ color: COLORS.rose }}>o</span>nad
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {links.map(l => (
            <button key={l} onClick={() => setPage(l)} style={{
              background: page === l ? "rgba(50,89,109,0.18)" : "transparent",
              border: page === l ? "1px solid rgba(50,89,109,0.45)" : "1px solid transparent",
              borderRadius: 8, padding: "8px 18px",
              fontFamily: "'DM Sans',sans-serif", fontSize: 14,
              fontWeight: page === l ? 500 : 400,
              color: page === l ? "#fff" : "rgba(200,215,230,0.65)",
              cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.02em",
            }}
              onMouseEnter={e => { if (page !== l) e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { if (page !== l) e.currentTarget.style.color = "rgba(200,215,230,0.65)"; }}
            >{l}</button>
          ))}
          <button onClick={() => setPage("Contact")} style={{
            marginLeft: 8, background: `linear-gradient(135deg, ${COLORS.rose}, #a84e4e)`,
            border: "none", borderRadius: 8, padding: "9px 22px",
            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13,
            color: "#fff", cursor: "pointer", letterSpacing: "0.04em",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(194,100,100,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >Get Started</button>
        </div>
      </div>
    </nav>
  );
}

/* ─── Robot Face Cursor ─── */
function RobotFace({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect x="30" y="3" width="4" height="7" rx="2" fill={MUTED_RED} />
      <circle cx="32" cy="3" r="3.5" fill={MUTED_RED} style={{ filter: "drop-shadow(0 0 5px #C26464)", animation: "glowPulse 2s ease-in-out infinite" }} />
      <rect x="8" y="22" width="5" height="9" rx="2.5" fill="#1a3a4a" style={{ animation: "robotEar 3s ease-in-out infinite", transformOrigin: "10px 26px" }} />
      <rect x="51" y="22" width="5" height="9" rx="2.5" fill="#1a3a4a" style={{ animation: "robotEar 3s ease-in-out infinite 0.2s", transformOrigin: "53px 26px" }} />
      <rect x="12" y="10" width="40" height="36" rx="10" fill="#0f2a38" />
      <rect x="13" y="11" width="40" height="20" rx="8" fill="#1a3a4a" opacity="0.5" />
      <rect x="17" y="19" width="12" height="12" rx="4" fill={DEEP_BLUE} />
      <rect x="35" y="19" width="12" height="12" rx="4" fill={DEEP_BLUE} />
      <circle cx="23" cy="25" r="4" fill="#4ec4f7" style={{ animation: "robotBlink 4s ease-in-out infinite", filter: "drop-shadow(0 0 4px #4ec4f7)" }} />
      <circle cx="41" cy="25" r="4" fill="#4ec4f7" style={{ animation: "robotBlink 4s ease-in-out infinite 0.1s", filter: "drop-shadow(0 0 4px #4ec4f7)" }} />
      <circle cx="25" cy="23" r="1.2" fill="rgba(255,255,255,0.9)" />
      <circle cx="43" cy="23" r="1.2" fill="rgba(255,255,255,0.9)" />
      <path d="M21 36 Q32 43 43 36" stroke={MUTED_RED} strokeWidth="2.5" fill="none" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 3px #C26464)" }} />
      <circle cx="21" cy="36" r="2" fill={MUTED_RED} />
      <circle cx="43" cy="36" r="2" fill={MUTED_RED} />
      <ellipse cx="16" cy="34" rx="4" ry="2.5" fill="rgba(194,100,100,0.3)" />
      <ellipse cx="48" cy="34" rx="4" ry="2.5" fill="rgba(194,100,100,0.3)" />
      <rect x="27" y="46" width="10" height="6" rx="2" fill="#0f2a38" />
    </svg>
  );
}

/* ─── Marketing Illustration (File 2) ─── */
function MarketingIllustration() {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Box sx={{ position: "absolute", borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none", width: "55%", height: "55%", top: "5%", left: "10%", bgcolor: "rgba(50,89,109,0.55)", zIndex: 0 }} />
      <Box sx={{ position: "absolute", borderRadius: "50%", filter: "blur(55px)", pointerEvents: "none", width: "45%", height: "45%", bottom: "8%", right: "5%", bgcolor: "rgba(194,100,100,0.38)", zIndex: 0 }} />
      <Box sx={{
        position: "absolute", inset: "4% 2%", borderRadius: "20px",
        background: "linear-gradient(145deg, rgba(15,30,42,0.95) 0%, rgba(10,22,34,0.98) 100%)",
        border: "1px solid rgba(50,89,109,0.4)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        overflow: "hidden", zIndex: 1, backdropFilter: "blur(10px)",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.5, borderBottom: "1px solid rgba(50,89,109,0.2)", background: "rgba(50,89,109,0.08)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {["#C26464","#e8c46a","#5bc47a"].map((c,i) => <Box key={i} sx={{ width:9, height:9, borderRadius:"50%", bgcolor:c, opacity:0.8 }} />)}
          </Box>
          <Box sx={{ fontSize:"10px", fontFamily:"monospace", color:"rgba(255,255,255,0.3)", bgcolor:"rgba(255,255,255,0.05)", px:1.5, py:0.4, borderRadius:"4px" }}>pixonad.io/analytics</Box>
          <Box sx={{ display:"flex", gap:0.8 }}>{[0,1,2].map(i => <Box key={i} sx={{ width:20, height:3, borderRadius:"2px", bgcolor:"rgba(255,255,255,0.1)" }} />)}</Box>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display:"flex", gap:1.5, mb:2 }}>
            {[{label:"Total Reach",value:"2.4M",delta:"+28%",color:"#4ec4f7",delay:"0s"},{label:"Conversions",value:"18.6K",delta:"+42%",color:MUTED_RED,delay:"0.15s"},{label:"Avg. ROI",value:"3.8×",delta:"+15%",color:"#7ec87e",delay:"0.3s"}].map(m => (
              <Box key={m.label} sx={{ flex:1, p:1.5, borderRadius:"10px", background:"linear-gradient(145deg, rgba(50,89,109,0.15), rgba(15,30,42,0.5))", border:"1px solid rgba(50,89,109,0.25)", animation:`floatCard1 3.5s ease-in-out infinite`, animationDelay:m.delay }}>
                <Typography sx={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"1px", mb:0.5 }}>{m.label}</Typography>
                <Typography sx={{ fontSize:"18px", fontFamily:"'Syne', sans-serif", fontWeight:700, color:"#fff", lineHeight:1 }}>{m.value}</Typography>
                <Box sx={{ display:"flex", alignItems:"center", gap:0.5, mt:0.5 }}>
                  <Box sx={{ fontSize:"9px", color:m.color, fontWeight:600 }}>▲ {m.delta}</Box>
                  <Typography sx={{ fontSize:"8px", color:"rgba(255,255,255,0.25)" }}>vs last month</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ borderRadius:"12px", background:"rgba(0,0,0,0.25)", border:"1px solid rgba(50,89,109,0.2)", p:1.5, mb:1.5 }}>
            <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:1.5 }}>
              <Typography sx={{ fontSize:"10px", color:"rgba(255,255,255,0.6)", fontWeight:500 }}>Campaign Performance</Typography>
              <Box sx={{ display:"flex", gap:0.8 }}>
                {["1W","1M","3M"].map((t,i) => <Box key={t} sx={{ fontSize:"8px", px:1, py:0.3, borderRadius:"4px", bgcolor: i===1 ? MUTED_RED : "rgba(255,255,255,0.06)", color: i===1 ? "#fff" : "rgba(255,255,255,0.3)" }}>{t}</Box>)}
              </Box>
            </Box>
            <svg width="100%" height="90" viewBox="0 0 320 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C26464" stopOpacity="0.4"/><stop offset="100%" stopColor="#C26464" stopOpacity="0"/></linearGradient>
                <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4ec4f7" stopOpacity="0.25"/><stop offset="100%" stopColor="#4ec4f7" stopOpacity="0"/></linearGradient>
              </defs>
              {[20,40,60,80].map(y => <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>)}
              <path d="M0,75 C30,70 50,60 80,55 C110,50 130,45 160,38 C190,31 210,35 240,28 C270,21 295,18 320,14 L320,90 L0,90 Z" fill="url(#cg2)"/>
              <path d="M0,75 C30,70 50,60 80,55 C110,50 130,45 160,38 C190,31 210,35 240,28 C270,21 295,18 320,14" fill="none" stroke="#4ec4f7" strokeWidth="1.5" strokeDasharray="400" strokeDashoffset="0" style={{ animation:"lineGrow 2s ease-out forwards" }}/>
              <path d="M0,82 C30,78 60,72 90,65 C120,58 140,62 170,52 C200,42 225,38 255,28 C275,22 300,16 320,10 L320,90 L0,90 Z" fill="url(#cg1)"/>
              <path d="M0,82 C30,78 60,72 90,65 C120,58 140,62 170,52 C200,42 225,38 255,28 C275,22 300,16 320,10" fill="none" stroke={MUTED_RED} strokeWidth="2" strokeDasharray="400" strokeDashoffset="0" style={{ animation:"lineGrow 1.8s ease-out forwards" }}/>
              {[[90,65],[170,52],[255,28],[320,10]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="3" fill={MUTED_RED} style={{ filter:"drop-shadow(0 0 4px #C26464)" }}/>)}
            </svg>
            <Box sx={{ display:"flex", gap:2, mt:0.5 }}>
              {[["#C26464","Paid Ads"],["#4ec4f7","Organic"]].map(([c,l]) => <Box key={l} sx={{ display:"flex", alignItems:"center", gap:0.5 }}><Box sx={{ width:12, height:2, bgcolor:c, borderRadius:"2px" }}/><Typography sx={{ fontSize:"8px", color:"rgba(255,255,255,0.35)" }}>{l}</Typography></Box>)}
            </Box>
          </Box>
          <Box sx={{ display:"flex", gap:1.5 }}>
            <Box sx={{ flex:"0 0 auto", borderRadius:"10px", background:"rgba(0,0,0,0.2)", border:"1px solid rgba(50,89,109,0.2)", p:1.5, display:"flex", flexDirection:"column", alignItems:"center", animation:"floatCard2 4s ease-in-out infinite" }}>
              <Typography sx={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", mb:1 }}>Channel Mix</Typography>
              <svg width="70" height="70" viewBox="0 0 70 70">
                <circle cx="35" cy="35" r="28" fill="none" stroke="#1a3a4a" strokeWidth="10"/>
                <circle cx="35" cy="35" r="28" fill="none" stroke={MUTED_RED} strokeWidth="10" strokeDasharray="63 113" strokeDashoffset="-28" strokeLinecap="round"/>
                <circle cx="35" cy="35" r="28" fill="none" stroke="#4ec4f7" strokeWidth="10" strokeDasharray="42 134" strokeDashoffset="-91" strokeLinecap="round"/>
                <circle cx="35" cy="35" r="28" fill="none" stroke="#7ec87e" strokeWidth="10" strokeDasharray="24 152" strokeDashoffset="-133" strokeLinecap="round"/>
                <text x="35" y="38" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Syne">SEO</text>
              </svg>
              <Box sx={{ display:"flex", flexDirection:"column", gap:0.4, mt:0.5 }}>
                {[[MUTED_RED,"Social","35%"],["#4ec4f7","Search","24%"],["#7ec87e","Email","14%"]].map(([c,l,v]) => <Box key={l} sx={{ display:"flex", alignItems:"center", gap:0.6 }}><Box sx={{ width:5, height:5, borderRadius:"50%", bgcolor:c }}/><Typography sx={{ fontSize:"7px", color:"rgba(255,255,255,0.4)" }}>{l}</Typography><Typography sx={{ fontSize:"7px", color:"rgba(255,255,255,0.7)", ml:"auto", pl:1 }}>{v}</Typography></Box>)}
              </Box>
            </Box>
            <Box sx={{ flex:1, borderRadius:"10px", background:"rgba(0,0,0,0.2)", border:"1px solid rgba(50,89,109,0.2)", p:1.5, display:"flex", flexDirection:"column", gap:1.2, animation:"floatCard3 3.5s ease-in-out infinite" }}>
              <Typography sx={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", mb:0.5 }}>Campaign Goals</Typography>
              {[{label:"Brand Awareness",pct:82,color:"#4ec4f7"},{label:"Lead Gen",pct:67,color:MUTED_RED},{label:"Engagement",pct:91,color:"#7ec87e"},{label:"Conversions",pct:54,color:"#e8c46a"}].map(g => (
                <Box key={g.label}>
                  <Box sx={{ display:"flex", justifyContent:"space-between", mb:0.4 }}>
                    <Typography sx={{ fontSize:"8px", color:"rgba(255,255,255,0.5)" }}>{g.label}</Typography>
                    <Typography sx={{ fontSize:"8px", color:g.color, fontWeight:600 }}>{g.pct}%</Typography>
                  </Box>
                  <Box sx={{ height:4, bgcolor:"rgba(255,255,255,0.07)", borderRadius:"2px", overflow:"hidden" }}>
                    <Box sx={{ height:"100%", width:`${g.pct}%`, bgcolor:g.color, borderRadius:"2px", boxShadow:`0 0 6px ${g.color}` }}/>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ position:"absolute", top:"-2%", right:"-2%", zIndex:5, bgcolor:"#0f2a38", border:"1px solid rgba(194,100,100,0.5)", borderRadius:"12px", px:1.5, py:1, boxShadow:"0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(194,100,100,0.15)", animation:"floatCard1 3.2s ease-in-out infinite", minWidth:"110px" }}>
        <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
          <Box sx={{ width:28, height:28, borderRadius:"8px", bgcolor:"rgba(194,100,100,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px" }}>🚀</Box>
          <Box><Typography sx={{ fontSize:"9px", color:"rgba(255,255,255,0.9)", fontWeight:600, lineHeight:1.2 }}>New Campaign</Typography><Typography sx={{ fontSize:"8px", color:MUTED_RED }}>+142% reach ↑</Typography></Box>
        </Box>
      </Box>
      <Box sx={{ position:"absolute", bottom:"0%", left:"-3%", zIndex:5, bgcolor:"#0f2a38", border:"1px solid rgba(50,89,109,0.5)", borderRadius:"12px", px:1.5, py:1, boxShadow:"0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(50,89,109,0.2)", animation:"floatCard2 4s ease-in-out infinite 0.5s" }}>
        <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
          <Box sx={{ width:28, height:28, borderRadius:"8px", bgcolor:"rgba(50,89,109,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px" }}>✦</Box>
          <Box><Typography sx={{ fontSize:"9px", color:"rgba(255,255,255,0.9)", fontWeight:600 }}>AI‑Powered</Typography><Typography sx={{ fontSize:"8px", color:"#4ec4f7" }}>Real‑time insights</Typography></Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ─── HOME PAGE (File 2 Hero) ─── */
function HomePage({ setPage }) {
  const containerRef = useRef(null);
  const starRef = useRef(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [clicked, setClicked] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Animated starfield
  useEffect(() => {
    const canvas = starRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [], rafId;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 180 }, () => ({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*1.2+0.2, a: Math.random(), speed: Math.random()*0.4+0.1 }));
    }
    function draw(t) {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      stars.forEach(s => { s.a = 0.3+0.7*Math.abs(Math.sin(t*s.speed*0.001+s.x)); ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${s.a})`; ctx.fill(); });
      rafId = requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  // Robot cursor
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = e => { setPos({ x: e.clientX, y: e.clientY }); setCursorVisible(true); };
    const onLeave = () => setCursorVisible(false);
    const onEnter = () => setCursorVisible(true);
    const onDown = () => { setClicked(true); setTimeout(() => setClicked(false), 320); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousedown", onDown);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mousedown", onDown); };
  }, []);

  return (
    <Box ref={containerRef} sx={{ position:"relative", bgcolor:"#000", overflow:"hidden", minHeight:"100vh", cursor:"none", "& *": { cursor:"none !important" } }}>
      <Box component="canvas" ref={starRef} sx={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}/>
      <Box sx={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none", background:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)" }}/>
      <Box sx={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none", background:`radial-gradient(ellipse 80% 60% at 70% 50%, rgba(50,89,109,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(194,100,100,0.10) 0%, transparent 60%)` }}/>
      <Box component="section" sx={{ position:"relative", zIndex:2, display:"flex", alignItems:"center", flexWrap:"wrap", width:"100%", minHeight:"100vh", px:{ xs:3, sm:5, md:6 }, py:{ xs:6, md:8 }, gap:{ xs:4, md:5 } }}>
        {/* LEFT */}
        <Box sx={{ flex:"1 1 500px", display:"flex", flexDirection:"column", gap:3.5, animation:"fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both", alignItems:{ xs:"center", md:"flex-start" }, textAlign:{ xs:"center", md:"left" } }}>
          <Box sx={{ display:"inline-flex", alignItems:"center", gap:1, fontSize:"11px", fontWeight:500, letterSpacing:"2.5px", textTransform:"uppercase", color:MUTED_RED, border:`1px solid rgba(194,100,100,0.35)`, borderRadius:"100px", px:2, py:0.75, bgcolor:"rgba(194,100,100,0.07)", width:"fit-content" }}>
            <Box component="span" sx={{ width:6, height:6, borderRadius:"50%", bgcolor:MUTED_RED, boxShadow:`0 0 8px ${MUTED_RED}`, animation:"pulseDot 2s ease-in-out infinite", flexShrink:0 }}/>
            Digital Growth Agency
          </Box>
          <Typography component="h1" sx={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(38px, 5.5vw, 72px)", fontWeight:800, lineHeight:1.08, letterSpacing:"-0.5px", background:"linear-gradient(135deg, #ffffff 0%, #a8cfe0 40%, #32596D 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Grow your<br/>business with<br/>
            <Box component="span" sx={{ background:`linear-gradient(135deg, ${MUTED_RED} 0%, #e89090 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Pixonad</Box>
          </Typography>
          <Typography sx={{ fontFamily:"'DM Sans', sans-serif", fontSize:"clamp(14px, 1.5vw, 17px)", fontWeight:400, color:"rgba(255,255,255,0.55)", lineHeight:1.7, maxWidth:520 }}>
            We help brands grow through SEO, social media marketing, paid advertising, and high‑converting websites — with results you can actually measure.
          </Typography>
          <Box sx={{ display:"flex", gap:2, flexWrap:"wrap", justifyContent:{ xs:"center", md:"flex-start" } }}>
            <Button variant="contained" onClick={() => setPage("Contact")} sx={{ bgcolor:MUTED_RED, color:"#fff", fontFamily:"'DM Sans', sans-serif", fontSize:"15px", fontWeight:500, borderRadius:"6px", px:4.5, py:1.75, textTransform:"none", boxShadow:"0 0 24px rgba(194,100,100,0.45)", position:"relative", overflow:"hidden", "&::before":{ content:'""', position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)" }, "&:hover":{ bgcolor:MUTED_RED, transform:"translateY(-2px)", boxShadow:"0 0 40px rgba(194,100,100,0.65)" }, transition:"transform 0.2s, box-shadow 0.2s" }}>
              Get Started
            </Button>
            <Button variant="outlined" onClick={() => setPage("Services")} sx={{ color:"rgba(255,255,255,0.7)", borderColor:"rgba(255,255,255,0.2)", fontFamily:"'DM Sans', sans-serif", fontSize:"15px", fontWeight:400, borderRadius:"6px", px:4, py:1.75, textTransform:"none", "&:hover":{ borderColor:"rgba(255,255,255,0.5)", color:"#fff", background:"rgba(255,255,255,0.04)" } }}>
              Our Services
            </Button>
          </Box>
          <Stack direction="row" spacing={0} sx={{ mt:1, flexWrap:"wrap", gap:2, justifyContent:{ xs:"center", md:"flex-start" } }}>
            {[{value:"200+",label:"Clients"},{value:"3.8×",label:"Avg ROI"},{value:"98%",label:"Satisfaction"}].map((stat,i) => (
              <Stack key={stat.label} direction="row" alignItems="stretch" spacing={2}>
                {i>0 && <Divider orientation="vertical" flexItem sx={{ borderColor:"rgba(255,255,255,0.1)" }}/>}
                <Box>
                  <Typography sx={{ fontFamily:"'Syne', sans-serif", fontSize:"22px", fontWeight:700, color:"#fff" }}>{stat.value}</Typography>
                  <Typography sx={{ fontSize:"11px", letterSpacing:"1.5px", textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>{stat.label}</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>
        {/* RIGHT */}
        <Box sx={{ flex:"1 1 480px", display:"flex", justifyContent:"center", alignItems:"center", animation:"fadeUp 0.9s 0.2s cubic-bezier(0.22,1,0.36,1) both" }}>
          <Box sx={{ position:"relative", width:{ xs:"min(92vw, 380px)", md:"clamp(340px, 46vw, 580px)" }, aspectRatio:"1 / 1" }}>
            <MarketingIllustration/>
          </Box>
        </Box>
      </Box>
      {/* Robot Cursor */}
      <Box sx={{ position:"fixed", left:pos.x, top:pos.y, zIndex:9999, pointerEvents:"none", opacity:cursorVisible ? 1 : 0, transition:"opacity 0.2s", animation:clicked ? "cursorClick 0.32s ease-out both" : "cursorFloat 3s ease-in-out infinite", transform:"translate(-50%, -50%)", filter:"drop-shadow(0 6px 18px rgba(194,100,100,0.45))", willChange:"transform" }}>
        <RobotFace size={52}/>
      </Box>
    </Box>
  );
}

/* ─── ABOUT PAGE ─── */
const checkpoints = [
  { label: "SEO & Google Ranking" }, { label: "Social Media Growth" },
  { label: "Paid Advertising" }, { label: "Website Development" }, { label: "Branding & Strategy" },
];
const teamMembers = [
  { name: "Aryan Mehta", role: "CEO & Founder", emoji: "👨‍💼", bio: "12 years in digital growth. Grew 3 startups from zero to ₹10Cr+ ARR before founding Pixonad." },
  { name: "Priya Nair", role: "Head of SEO", emoji: "🔍", bio: "Ex-Google. Ranked 400+ clients on page one. Certified in advanced technical SEO & analytics." },
  { name: "Rohan Kapoor", role: "Creative Director", emoji: "🎨", bio: "Award-winning designer with 8 years crafting brand identities for Fortune 500 companies." },
  { name: "Sneha Joshi", role: "Paid Ads Lead", emoji: "📊", bio: "Managed ₹50Cr+ in ad spend. Average ROAS of 4.2× across e-commerce and SaaS verticals." },
];
const milestones = [
  { year: "2018", event: "Pixonad founded with a team of 3 in Bangalore" },
  { year: "2019", event: "Hit 50 clients — first major SEO campaign goes viral" },
  { year: "2021", event: "Expanded to paid media; launched social media division" },
  { year: "2023", event: "Crossed 200 clients across India, UAE, and UK" },
  { year: "2026", event: "AI-powered marketing tools integrated across all campaigns" },
];

function AboutPage({ setPage }) {
  const [visible, setVisible] = useState(false);
  const [teamVis, setTeamVis] = useState(false);
  const ref = useRef(null);
  const teamRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold:0.1 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setTeamVis(true); }, { threshold:0.05 });
    if(teamRef.current) obs.observe(teamRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div style={{ background:"#060910", minHeight:"100vh" }}>
      {/* Hero section */}
      <div ref={ref} style={{ position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", padding:"120px 24px 80px" }}>
        <StarFieldCanvas count={120}/>
        <div style={{ position:"absolute", width:360, height:360, borderRadius:"50%", background:"rgba(50,89,109,0.18)", filter:"blur(80px)", top:-100, left:-80, pointerEvents:"none", animation:"drift1 12s ease-in-out infinite alternate" }}/>
        <div style={{ position:"absolute", width:280, height:280, borderRadius:"50%", background:"rgba(194,100,100,0.18)", filter:"blur(80px)", bottom:-60, right:-40, pointerEvents:"none", animation:"drift2 9s ease-in-out infinite alternate" }}/>
        <div style={{ position:"relative", zIndex:2, maxWidth:1100, width:"100%", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:64, alignItems:"center" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(50,89,109,0.18)", border:"1px solid rgba(50,89,109,0.45)", borderRadius:100, padding:"6px 16px", marginBottom:28, fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:"#7aadca", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease" }}>
              <span style={{ width:6, height:6, background:COLORS.rose, borderRadius:"50%", animation:"pulse 2s ease-in-out infinite" }}/>
              About Pixonad
            </div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(2.2rem, 4vw, 3.5rem)", lineHeight:1.08, letterSpacing:"-0.02em", color:"#fff", marginBottom:12, opacity:visible?1:0, transform:visible?"none":"translateY(30px)", transition:"all 0.7s ease 0.1s" }}>
              Trusted by real brands,<br/><span style={{ color:COLORS.rose }}>real results.</span>
            </h2>
            <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"clamp(1rem, 1.6vw, 1.3rem)", color:"rgba(255,255,255,0.35)", marginBottom:32, opacity:visible?1:0, transition:"all 0.7s ease 0.18s" }}>Your growth is our mission.</p>
            <div style={{ width:60, height:2, background:`linear-gradient(90deg, ${COLORS.teal}, ${COLORS.rose})`, marginBottom:28, opacity:visible?1:0, transform:visible?"scaleX(1)":"scaleX(0)", transition:"all 0.6s ease 0.3s", transformOrigin:"center" }}/>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"1rem", lineHeight:1.8, color:"rgba(200,215,230,0.72)", marginBottom:40, opacity:visible?1:0, transition:"all 0.7s ease 0.35s" }}>
              Pixonad is a full-service digital marketing agency built for ambitious brands. We combine data science with creative storytelling to deliver campaigns that move the needle — not just vanity metrics. From Bangalore startups to global enterprises, we've helped 200+ brands dominate their categories.
            </p>
            <button onClick={() => setPage("Services")} style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"14px 32px", background:`linear-gradient(135deg, ${COLORS.teal}, #1e3d50)`, border:`1px solid rgba(50,89,109,0.6)`, borderRadius:6, color:"#fff", fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:"0.92rem", cursor:"pointer", opacity:visible?1:0, transition:"opacity 0.6s ease 0.5s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(50,89,109,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
            >Explore Our Services <span>→</span></button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14, opacity:visible?1:0, transform:visible?"none":"translateX(30px)", transition:"all 0.8s ease 0.25s" }}>
            <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", letterSpacing:"0.12em", textTransform:"uppercase", color:`rgba(50,89,109,0.9)`, marginBottom:6 }}>What We Offer</p>
            {checkpoints.map((pt,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 20px", background:"rgba(255,255,255,0.025)", border:`1px solid rgba(50,89,109,0.22)`, borderRadius:8, cursor:"default", transition:"all 0.3s", opacity:visible?1:0, animation:visible?`fadeUp 0.5s ease ${0.45+i*0.1}s both`:"none" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(50,89,109,0.1)"; e.currentTarget.style.transform="translateX(4px)"; e.currentTarget.style.borderColor="rgba(50,89,109,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.025)"; e.currentTarget.style.transform=""; e.currentTarget.style.borderColor="rgba(50,89,109,0.22)"; }}
              >
                <div style={{ width:32, height:32, background:"rgba(194,100,100,0.12)", border:`1px solid rgba(194,100,100,0.3)`, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:COLORS.rose, flexShrink:0 }}>✓</div>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.97rem", color:"rgba(220,235,245,0.85)" }}>{pt.label}</span>
                <span style={{ marginLeft:"auto", fontFamily:"'Syne',sans-serif", fontSize:"0.72rem", color:"rgba(50,89,109,0.5)", fontWeight:600 }}>0{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background:"rgba(0,0,0,0.3)", padding:"80px 24px", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", color:"#fff", textAlign:"center", marginBottom:16 }}>Our <span style={{ color:COLORS.rose }}>Journey</span></p>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(200,215,230,0.5)", textAlign:"center", marginBottom:56 }}>From a small team with big dreams to a full-scale marketing powerhouse.</p>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, background:`linear-gradient(${COLORS.teal}, ${COLORS.rose})`, transform:"translateX(-50%)", opacity:0.4 }}/>
            {milestones.map((m,i) => (
              <div key={i} style={{ display:"flex", justifyContent: i%2===0 ? "flex-start" : "flex-end", marginBottom:40, position:"relative" }}>
                <div style={{ width:"45%", padding:"20px 24px", background:"rgba(255,255,255,0.03)", border:`1px solid rgba(50,89,109,0.2)`, borderRadius:12, position:"relative" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(50,89,109,0.5)"; e.currentTarget.style.background="rgba(50,89,109,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(50,89,109,0.2)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
                >
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.3rem", color:COLORS.rose, marginBottom:8 }}>{m.year}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", color:"rgba(200,215,230,0.7)", lineHeight:1.6 }}>{m.event}</div>
                </div>
                <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:12, height:12, borderRadius:"50%", background:COLORS.rose, boxShadow:`0 0 12px ${COLORS.rose}`, zIndex:1 }}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div ref={teamRef} style={{ padding:"80px 24px 100px", maxWidth:1100, margin:"0 auto" }}>
        <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", color:"#fff", textAlign:"center", marginBottom:12 }}>Meet the <span style={{ color:COLORS.teal }}>Team</span></p>
        <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(200,215,230,0.5)", textAlign:"center", marginBottom:56 }}>The people who make brands grow.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:24 }}>
          {teamMembers.map((m,i) => (
            <div key={i} style={{ padding:"32px 24px", background:"rgba(255,255,255,0.025)", border:`1px solid rgba(50,89,109,0.2)`, borderRadius:16, textAlign:"center", opacity:teamVis?1:0, animation:teamVis?`fadeUp 0.6s ease ${i*0.1}s both`:"none", transition:"all 0.3s", cursor:"default" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(50,89,109,0.08)"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor="rgba(50,89,109,0.45)"; e.currentTarget.style.boxShadow=`0 16px 40px rgba(50,89,109,0.15)`; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.025)"; e.currentTarget.style.transform=""; e.currentTarget.style.borderColor="rgba(50,89,109,0.2)"; e.currentTarget.style.boxShadow=""; }}
            >
              <div style={{ fontSize:"3rem", marginBottom:16 }}>{m.emoji}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"#fff", marginBottom:4 }}>{m.name}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.8rem", color:COLORS.rose, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:14 }}>{m.role}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"rgba(200,215,230,0.55)", lineHeight:1.65 }}>{m.bio}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SERVICES PAGE ─── */
const services = [
  { id:"01", title:"SEO Optimization", description:"Dominate search rankings with data-driven strategies. We audit, optimize, and build authority so your brand appears where it matters most.", accent:COLORS.rose, tags:["Technical SEO","Link Building","Analytics"], icon:"◎" },
  { id:"02", title:"Social Media Management", description:"Build communities, drive engagement, and turn followers into loyal customers with content strategies tailored to every platform.", accent:COLORS.teal, tags:["Content Creation","Community","Growth"], icon:"◈" },
  { id:"03", title:"Google Ads", description:"Maximise every rupee of ad spend with precision targeting, compelling copy, and relentless A/B testing that converts clicks to revenue.", accent:COLORS.rose, tags:["PPC","Remarketing","Conversion Tracking"], icon:"◉" },
  { id:"04", title:"Website Design", description:"High-converting websites built for speed, beauty, and performance. Every pixel crafted to guide visitors seamlessly toward action.", accent:COLORS.teal, tags:["UI/UX","Responsive","CRO"], icon:"▣" },
  { id:"05", title:"Content Marketing", description:"Stories that rank, resonate, and convert. From blog posts to video scripts, we craft content that builds trust and drives organic growth.", accent:COLORS.rose, tags:["Blogs","Video","Email Sequences"], icon:"◧" },
  { id:"06", title:"Branding & Strategy", description:"Define your identity, own your niche. From logo to messaging framework, we build brands people remember and competitors envy.", accent:COLORS.teal, tags:["Identity","Positioning","Brand Voice"], icon:"✦" },
];
const processSteps = [
  { num:"01", title:"Discovery Call", desc:"We deep-dive into your business, audience, competitors, and goals. No templates — every strategy starts from scratch.", icon:"🔍" },
  { num:"02", title:"Strategy Design", desc:"Our team crafts a customised growth blueprint with KPIs, channel mix, timelines, and budget allocation.", icon:"📐" },
  { num:"03", title:"Launch & Execute", desc:"Campaigns go live with full creative, copy, targeting, and technical setup handled end-to-end by our specialists.", icon:"🚀" },
  { num:"04", title:"Optimise & Scale", desc:"We test, learn, and iterate weekly. When something works, we double down. When it doesn't, we fix it fast.", icon:"📈" },
];
const pricingPlans = [
  { name:"Starter", price:"₹24,999", period:"/mo", desc:"Perfect for new brands ready to establish their digital presence.", features:["SEO Audit & On-Page","2 Social Platforms","Monthly Report","Email Support"], accent:COLORS.teal },
  { name:"Growth", price:"₹54,999", period:"/mo", desc:"For scaling brands that need full-funnel marketing execution.", features:["Full SEO + Link Building","4 Social Platforms","Google Ads Management","Bi-weekly Strategy Calls","Advanced Analytics"], accent:COLORS.rose, highlighted:true },
  { name:"Enterprise", price:"Custom", period:"", desc:"For established brands requiring end-to-end digital domination.", features:["All Growth features","Dedicated Account Manager","Custom Dashboards","24/7 Priority Support","Brand & Content Studio"], accent:COLORS.teal },
];

function ServiceCard({ s, i }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold:0.1 }); if(ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position:"relative", background:hovered?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)", border:`1px solid ${hovered ? s.accent+"55" : "rgba(255,255,255,0.07)"}`, borderRadius:16, padding:"36px 32px", cursor:"default", transition:"all 0.4s cubic-bezier(0.23,1,0.32,1)", transform:visible?(hovered?"translateY(-6px)":"none"):"translateY(30px)", opacity:visible?1:0, transitionDelay:visible?`${i*80}ms`:"0ms", backdropFilter:"blur(6px)", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, borderRadius:16, background:`radial-gradient(ellipse at 20% 20%, ${s.accent}18 0%, transparent 60%)`, opacity:hovered?1:0, transition:"opacity 0.4s", pointerEvents:"none" }}/>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div style={{ width:52, height:52, borderRadius:12, background:`${s.accent}18`, border:`1px solid ${s.accent}33`, display:"flex", alignItems:"center", justifyContent:"center", color:s.accent, fontSize:22, transition:"transform 0.3s", transform:hovered?"scale(1.1)":"scale(1)" }}>{s.icon}</div>
        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:13, color:"rgba(255,255,255,0.18)", letterSpacing:"0.1em", fontWeight:700 }}>{s.id}</span>
      </div>
      <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:700, color:"#fff", marginBottom:12, letterSpacing:"-0.02em", lineHeight:1.2 }}>{s.title}</h3>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14.5, lineHeight:1.7, color:"rgba(255,255,255,0.5)", marginBottom:24 }}>{s.description}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {s.tags.map(tag => <span key={tag} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11.5, fontWeight:500, color:s.accent, background:`${s.accent}14`, border:`1px solid ${s.accent}28`, borderRadius:20, padding:"4px 12px", letterSpacing:"0.03em" }}>{tag}</span>)}
      </div>
    </div>
  );
}

function ServicesPage({ setPage }) {
  const [hVis, setHVis] = useState(false);
  const [procVis, setProcVis] = useState(false);
  const [priceVis, setPriceVis] = useState(false);
  const hRef = useRef(null);
  const procRef = useRef(null);
  const priceRef = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setHVis(true); }, { threshold:0.1 }); if(hRef.current) obs.observe(hRef.current); return () => obs.disconnect(); }, []);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setProcVis(true); }, { threshold:0.05 }); if(procRef.current) obs.observe(procRef.current); return () => obs.disconnect(); }, []);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setPriceVis(true); }, { threshold:0.05 }); if(priceRef.current) obs.observe(priceRef.current); return () => obs.disconnect(); }, []);
  return (
    <div style={{ position:"relative", background:"#06060d", minHeight:"100vh", overflow:"hidden" }}>
      <StarFieldCanvas count={80}/>
      <div style={{ position:"absolute", top:"10%", left:"5%", width:400, height:400, background:`radial-gradient(circle, rgba(194,100,100,0.06), transparent 70%)`, borderRadius:"50%", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"10%", right:"5%", width:500, height:500, background:`radial-gradient(circle, rgba(50,89,109,0.05), transparent 70%)`, borderRadius:"50%", pointerEvents:"none" }}/>
      <div style={{ position:"relative", zIndex:2, maxWidth:1200, margin:"0 auto", padding:"120px 40px 0" }}>
        <div ref={hRef} style={{ textAlign:"center", marginBottom:72, opacity:hVis?1:0, animation:hVis?"slideUp 0.7s ease forwards":"none" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(255,255,255,0.12)", borderRadius:40, padding:"8px 20px", marginBottom:28 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:COLORS.rose, boxShadow:`0 0 8px ${COLORS.rose}`, display:"inline-block" }}/>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, letterSpacing:"0.12em", color:"rgba(255,255,255,0.55)", textTransform:"uppercase" }}>What We Do</span>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(36px, 6vw, 58px)", fontWeight:900, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.05, marginBottom:20 }}>Services built for{" "}<span style={{ background:`linear-gradient(135deg, ${COLORS.rose}, #d98a8a)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>real growth</span></h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:"rgba(255,255,255,0.45)", maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>Every service is designed to work together — so your brand doesn't just look good, it performs.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:20, marginBottom:80 }}>
          {services.map((s,i) => <ServiceCard key={s.id} s={s} i={i}/>)}
        </div>
      </div>

      {/* Process */}
      <div ref={procRef} style={{ background:"rgba(0,0,0,0.4)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"80px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", color:"#fff", textAlign:"center", marginBottom:12 }}>How We <span style={{ color:COLORS.teal }}>Work</span></p>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(200,215,230,0.5)", textAlign:"center", marginBottom:56 }}>A proven 4-step process refined across 200+ client partnerships.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:24 }}>
            {processSteps.map((step,i) => (
              <div key={i} style={{ padding:"32px 28px", background:"rgba(255,255,255,0.025)", border:"1px solid rgba(50,89,109,0.2)", borderRadius:16, textAlign:"center", opacity:procVis?1:0, animation:procVis?`fadeUp 0.6s ease ${i*0.12}s both`:"none", transition:"all 0.3s", cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(50,89,109,0.5)"; e.currentTarget.style.background="rgba(50,89,109,0.06)"; e.currentTarget.style.transform="translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(50,89,109,0.2)"; e.currentTarget.style.background="rgba(255,255,255,0.025)"; e.currentTarget.style.transform=""; }}
              >
                <div style={{ fontSize:"2.4rem", marginBottom:16 }}>{step.icon}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"0.75rem", color:COLORS.rose, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Step {step.num}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"#fff", marginBottom:12 }}>{step.title}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"rgba(200,215,230,0.55)", lineHeight:1.65 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div ref={priceRef} style={{ padding:"80px 40px 100px", maxWidth:1100, margin:"0 auto" }}>
        <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", color:"#fff", textAlign:"center", marginBottom:12 }}>Simple, <span style={{ color:COLORS.rose }}>Transparent</span> Pricing</p>
        <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(200,215,230,0.5)", textAlign:"center", marginBottom:56 }}>No hidden fees. No long-term lock-ins. Just results.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:24 }}>
          {pricingPlans.map((plan,i) => (
            <div key={i} style={{ padding:"36px 32px", background:plan.highlighted?"rgba(194,100,100,0.06)":"rgba(255,255,255,0.025)", border:`1px solid ${plan.highlighted ? COLORS.rose+"55" : "rgba(50,89,109,0.2)"}`, borderRadius:16, position:"relative", opacity:priceVis?1:0, animation:priceVis?`fadeUp 0.6s ease ${i*0.12}s both`:"none", transition:"all 0.3s", cursor:"default" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 20px 50px rgba(0,0,0,0.3)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
            >
              {plan.highlighted && <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:COLORS.rose, color:"#fff", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.7rem", letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 16px", borderRadius:20 }}>Most Popular</div>}
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.2rem", color:"#fff", marginBottom:8 }}>{plan.name}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"2.2rem", color:plan.highlighted?COLORS.rose:COLORS.tealLight, lineHeight:1, marginBottom:4 }}>{plan.price}<span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.4)" }}>{plan.period}</span></div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", color:"rgba(200,215,230,0.5)", lineHeight:1.6, marginBottom:24, marginTop:12 }}>{plan.desc}</p>
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:20, marginBottom:28 }}>
                {plan.features.map((f,j) => <div key={j} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}><span style={{ color:plan.accent, fontSize:"0.8rem" }}>✓</span><span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"rgba(200,215,230,0.7)" }}>{f}</span></div>)}
              </div>
              <button onClick={() => setPage("Contact")} style={{ width:"100%", padding:"12px", background:plan.highlighted?COLORS.rose:"transparent", border:`1px solid ${plan.highlighted ? COLORS.rose : "rgba(50,89,109,0.4)"}`, borderRadius:8, fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.9rem", color:"#fff", cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background=plan.highlighted?COLORS.roseLight:COLORS.teal; e.currentTarget.style.borderColor=plan.highlighted?COLORS.roseLight:COLORS.teal; }}
                onMouseLeave={e => { e.currentTarget.style.background=plan.highlighted?COLORS.rose:"transparent"; e.currentTarget.style.borderColor=plan.highlighted?COLORS.rose:"rgba(50,89,109,0.4)"; }}
              >Get Started →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── BLOG PAGE ─── */
const blogPosts = [
  { id:1, category:"SEO", date:"Apr 10, 2026", readTime:"5 min read", title:"10 SEO Strategies That Actually Work in 2026", excerpt:"Search algorithms have evolved — cookie-cutter tactics won't cut it anymore. Here's what's driving real rankings right now.", accent:COLORS.rose },
  { id:2, category:"Social Media", date:"Apr 6, 2026", readTime:"4 min read", title:"How to Build a Loyal Instagram Following from Zero", excerpt:"Follower counts are vanity, but a loyal audience is a business asset. We break down the community-first approach that actually compounds.", accent:COLORS.teal },
  { id:3, category:"Paid Ads", date:"Mar 28, 2026", readTime:"6 min read", title:"Why Your Google Ads Aren't Converting (And How to Fix It)", excerpt:"Spending money on clicks that don't convert? Here are the most common campaign mistakes and the exact fixes that flip the switch.", accent:COLORS.rose },
  { id:4, category:"Branding", date:"Mar 20, 2026", readTime:"7 min read", title:"Brand Identity vs. Brand Image: Know the Difference", excerpt:"Most businesses confuse what they project with what their audience perceives. Understanding the gap is where growth begins.", accent:COLORS.teal },
  { id:5, category:"Content", date:"Mar 14, 2026", readTime:"5 min read", title:"The Content Calendar System We Use for Our Clients", excerpt:"Consistency beats creativity every time — but you need both. Here's the exact planning framework we run across all channels.", accent:COLORS.rose },
  { id:6, category:"Web Design", date:"Mar 7, 2026", readTime:"4 min read", title:"Above the Fold: Designing Landing Pages That Convert", excerpt:"Your hero section has 3 seconds to earn a scroll. We unpack the hierarchy, copy, and CTA patterns that make it happen.", accent:COLORS.teal },
  { id:7, category:"SEO", date:"Feb 28, 2026", readTime:"6 min read", title:"Core Web Vitals in 2026: The Complete Developer Guide", excerpt:"Google's page experience signals are now a major ranking factor. Here's how to audit, fix, and maintain a perfect score.", accent:COLORS.rose },
  { id:8, category:"Email", date:"Feb 20, 2026", readTime:"4 min read", title:"The Comeback of Email: Why Inboxes are Gold Again", excerpt:"With social reach declining, smart brands are rebuilding direct channels. Email open rates are up 34% — here's how to capitalise.", accent:COLORS.teal },
  { id:9, category:"Analytics", date:"Feb 12, 2026", readTime:"7 min read", title:"GA4 Deep Dive: Setting Up Reports That Actually Matter", excerpt:"Most teams are drowning in data but starving for insights. We show you the 7 GA4 reports we run for every client, every week.", accent:COLORS.rose },
];

function BlogCard({ post, i }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold:0.1 }); if(ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background:hovered?"rgba(255,255,255,0.045)":"rgba(255,255,255,0.02)", border:`1px solid ${hovered ? post.accent+"44" : "rgba(255,255,255,0.07)"}`, borderRadius:16, padding:"32px 28px", cursor:"pointer", transition:"all 0.35s cubic-bezier(0.23,1,0.32,1)", transform:visible?(hovered?"translateY(-5px)":"none"):"translateY(24px)", opacity:visible?1:0, transitionDelay:`${i*70}ms`, display:"flex", flexDirection:"column", gap:16, overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", top:0, left:0, width:"100%", height:2, background:`linear-gradient(90deg, ${post.accent}, transparent)`, opacity:hovered?1:0, transition:"opacity 0.35s" }}/>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:post.accent, background:`${post.accent}18`, border:`1px solid ${post.accent}28`, borderRadius:20, padding:"4px 12px" }}>{post.category}</span>
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,0.3)", letterSpacing:"0.02em" }}>{post.date} · {post.readTime}</span>
      </div>
      <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:19, fontWeight:700, color:"#fff", lineHeight:1.25, letterSpacing:"-0.02em" }}>{post.title}</h3>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, lineHeight:1.7, color:"rgba(255,255,255,0.45)", flexGrow:1 }}>{post.excerpt}</p>
      <div style={{ display:"flex", alignItems:"center", gap:6, fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:600, color:post.accent, opacity:hovered?1:0.6, transition:"opacity 0.3s" }}>
        Read More <span style={{ transform:hovered?"translateX(3px)":"none", transition:"transform 0.3s", display:"inline-block" }}>→</span>
      </div>
    </div>
  );
}

function BlogPage() {
  const [hVis, setHVis] = useState(false);
  const [newsVis, setNewsVis] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const hRef = useRef(null);
  const newsRef = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setHVis(true); }, { threshold:0.1 }); if(hRef.current) obs.observe(hRef.current); return () => obs.disconnect(); }, []);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setNewsVis(true); }, { threshold:0.1 }); if(newsRef.current) obs.observe(newsRef.current); return () => obs.disconnect(); }, []);
  const handleSubscribe = () => { if(email.includes("@")) { setSubscribed(true); setEmail(""); } };
  return (
    <div style={{ position:"relative", background:"#060910", minHeight:"100vh", overflow:"hidden" }}>
      <StarFieldCanvas count={100}/>
      <div style={{ position:"absolute", top:"5%", right:"5%", width:450, height:450, background:`radial-gradient(circle, rgba(194,100,100,0.07), transparent 70%)`, borderRadius:"50%", pointerEvents:"none" }}/>
      <div style={{ position:"relative", zIndex:2, maxWidth:1200, margin:"0 auto", padding:"120px 40px 0" }}>
        <div ref={hRef} style={{ textAlign:"center", marginBottom:72, opacity:hVis?1:0, animation:hVis?"slideUp 0.7s ease forwards":"none" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(255,255,255,0.12)", borderRadius:40, padding:"8px 20px", marginBottom:28 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:COLORS.rose, boxShadow:`0 0 8px ${COLORS.rose}`, display:"inline-block" }}/>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, letterSpacing:"0.12em", color:"rgba(255,255,255,0.55)", textTransform:"uppercase" }}>The Pixonad Blog</span>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(36px, 6vw, 58px)", fontWeight:900, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.05, marginBottom:20 }}>
            Insights for{" "}<span style={{ background:`linear-gradient(135deg, ${COLORS.teal}, #5a9ab8)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>digital growth</span>
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:"rgba(255,255,255,0.45)", maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>Practical strategies, real case studies, and honest takes on what's working in digital marketing right now.</p>
        </div>

        {/* Category filters */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", marginBottom:48 }}>
          {["All","SEO","Social Media","Paid Ads","Content","Branding","Analytics","Email"].map((cat,i) => (
            <button key={i} style={{ padding:"8px 20px", background: i===0 ? COLORS.teal : "rgba(255,255,255,0.04)", border:`1px solid ${i===0 ? COLORS.teal : "rgba(255,255,255,0.1)"}`, borderRadius:24, fontFamily:"'DM Sans',sans-serif", fontSize:13, color: i===0 ? "#fff" : "rgba(255,255,255,0.5)", cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => { if(i!==0) { e.currentTarget.style.borderColor="rgba(50,89,109,0.5)"; e.currentTarget.style.color="#fff"; }}}
              onMouseLeave={e => { if(i!==0) { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; }}}
            >{cat}</button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:20, marginBottom:60 }}>
          {blogPosts.map((post,i) => <BlogCard key={post.id} post={post} i={i}/>)}
        </div>

        {/* Newsletter */}
        <div ref={newsRef} style={{ margin:"0 auto 100px", maxWidth:680, padding:"56px 48px", background:"rgba(255,255,255,0.025)", border:"1px solid rgba(50,89,109,0.3)", borderRadius:20, textAlign:"center", opacity:newsVis?1:0, animation:newsVis?"fadeIn 0.7s ease forwards":"none", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 0%, rgba(50,89,109,0.15), transparent 70%)`, pointerEvents:"none" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontSize:"2rem", marginBottom:16 }}>📬</div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.8rem", color:"#fff", marginBottom:10 }}>Never Miss an Insight</h3>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.95rem", color:"rgba(200,215,230,0.55)", lineHeight:1.7, marginBottom:28 }}>Join 4,200+ marketers getting weekly tips on SEO, paid ads, and digital growth — straight to their inbox.</p>
            {subscribed ? (
              <div style={{ padding:"16px 24px", background:"rgba(50,89,109,0.2)", border:"1px solid rgba(50,89,109,0.5)", borderRadius:10, fontFamily:"'DM Sans',sans-serif", color:"#7aadca", fontSize:"0.95rem" }}>🎉 You're in! Check your inbox for a welcome gift.</div>
            ) : (
              <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ flex:"1 1 240px", maxWidth:320, padding:"13px 18px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(50,89,109,0.3)", borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#fff", outline:"none" }}
                  onFocus={e => { e.target.style.borderColor=COLORS.teal; }} onBlur={e => { e.target.style.borderColor="rgba(50,89,109,0.3)"; }}
                />
                <button onClick={handleSubscribe} style={{ padding:"13px 28px", background:`linear-gradient(135deg, ${COLORS.teal}, #1e3d50)`, border:"none", borderRadius:8, fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color:"#fff", cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px rgba(50,89,109,0.4)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
                >Subscribe →</button>
              </div>
            )}
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", color:"rgba(255,255,255,0.25)", marginTop:16 }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT PAGE ─── */
const initForm = { name:"", email:"", phone:"", service:"", message:"" };
const faqs = [
  { q:"How long does it take to see SEO results?", a:"SEO is a long-term investment. Most clients start seeing measurable improvements in 3–4 months, with significant gains by month 6." },
  { q:"Do you work with international clients?", a:"Absolutely. We work with clients across India, UAE, UK, and the US. Our team is fully remote-capable." },
  { q:"What's your minimum engagement period?", a:"We recommend a minimum of 3 months to see meaningful data and results. Most clients stay with us for 12+ months." },
  { q:"Do you offer performance-based pricing?", a:"For select campaigns, yes. Book a discovery call and we'll discuss what model works best for your goals." },
];

function ContactPage() {
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (form.phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    else if (form.message.trim().length < 20) e.message = "At least 20 characters please";
    return e;
  };
  const handleChange = e => { const {name,value} = e.target; setForm(f => ({...f,[name]:value})); if(errors[name]) setErrors(er => ({...er,[name]:""})); };
  const handleSubmit = async e => { e.preventDefault(); const errs = validate(); if(Object.keys(errs).length) { setErrors(errs); return; } setLoading(true); await new Promise(r => setTimeout(r, 1600)); setLoading(false); setSuccess(true); };
  const inputStyle = (err) => ({ background:"rgba(255,255,255,0.05)", border:`1px solid ${err ? COLORS.rose : "rgba(255,255,255,0.08)"}`, borderRadius:10, padding:"13px 16px", fontFamily:"'DM Sans',sans-serif", fontWeight:400, fontSize:15, color:"#fff", outline:"none", width:"100%", transition:"all 0.2s" });

  return (
    <div style={{ position:"relative", minHeight:"100vh", background:"#0d0d0f", overflow:"hidden" }}>
      <StarFieldCanvas count={280} fixed/>
      <div style={{ position:"fixed", bottom:-120, right:-120, width:700, height:500, background:`radial-gradient(ellipse at 70% 80%, rgba(120,60,20,0.28) 0%, transparent 65%)`, pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"relative", zIndex:1, maxWidth:1160, margin:"0 auto", padding:"0 36px" }}>
        <div style={{ padding:"120px 0 56px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:"3px", textTransform:"uppercase", color:COLORS.rose, border:`1px solid rgba(194,100,100,0.35)`, borderRadius:100, padding:"7px 18px", marginBottom:28 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:COLORS.rose, boxShadow:`0 0 8px ${COLORS.rose}` }}/>
            Get In Touch
          </div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(52px, 7vw, 88px)", lineHeight:0.93, letterSpacing:"-4px", color:"#fff", marginBottom:28 }}>
            Let's build<br/><span style={{ color:COLORS.tealLight }}>something</span>{" "}<span style={{ color:COLORS.rose }}>great.</span>
          </h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:17, lineHeight:1.75, color:"#888", maxWidth:540, marginBottom:48 }}>We partner with ambitious brands to craft digital experiences that don't just look good — they perform.</p>
          <div style={{ display:"flex", gap:56, justifyContent:"center", flexWrap:"wrap" }}>
            {[["240+","Projects Delivered"],["98%","Client Satisfaction"],["12h","Avg. Response Time"]].map(([num,label]) => (
              <div key={label}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:30, color:"#fff", lineHeight:1 }}>{num.replace("+","").replace("%","").replace("h","")}<span style={{ color:COLORS.rose }}>{num.slice(-1)}</span></div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#888", marginTop:5 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height:1, background:"rgba(255,255,255,0.08)", marginBottom:48 }}/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:28, paddingBottom:80 }}>
          {/* Info cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {[{icon:"✉",label:"Email Us",title:"Drop a Line",value:"hello@pixonad.com\nwork@pixonad.com"},{icon:"📞",label:"Call Us",title:"Talk Directly",value:"+91 98765 43210\n+91 87654 32109"},{icon:"📍",label:"Visit Us",title:"Our Office",value:"201 Koramangala Ring Rd\nBangalore, KA 560034"}].map((card,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:18, padding:"26px 28px", position:"relative", overflow:"hidden", transition:"all 0.3s", cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateX(4px)"; e.currentTarget.style.borderColor="rgba(50,89,109,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}
              >
                <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:COLORS.teal, borderRadius:"0 2px 2px 0" }}/>
                <div style={{ fontSize:17, marginBottom:14 }}>{card.icon}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, letterSpacing:"2.5px", textTransform:"uppercase", color:COLORS.tealLight, marginBottom:6 }}>{card.label}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:"#fff", marginBottom:6 }}>{card.title}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:14, color:"#888", lineHeight:1.65, whiteSpace:"pre-line" }}>{card.value}</div>
              </div>
            ))}
            <div style={{ background:`linear-gradient(135deg, rgba(50,89,109,0.12), rgba(194,100,100,0.06))`, border:`1px solid rgba(50,89,109,0.35)`, borderRadius:18, padding:"26px 28px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <span style={{ width:8, height:8, background:"#4ade80", borderRadius:"50%", boxShadow:"0 0 10px rgba(74,222,128,0.6)", animation:"pulseGreen 2s infinite" }}/>
                <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:14, color:"#fff" }}>Currently Accepting Projects</span>
              </div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:13, color:"#888", lineHeight:1.65 }}>Open to new partnerships for Q3 2026. We respond within one business day.</p>
            </div>
          </div>

          {/* Form */}
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"44px 40px", position:"relative" }}>
            {success && (
              <div style={{ position:"absolute", inset:0, background:"rgba(13,13,15,0.96)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", borderRadius:20, zIndex:10, animation:"fadeIn 0.4s ease", backdropFilter:"blur(8px)" }}>
                <div style={{ width:68, height:68, background:"rgba(50,89,109,0.15)", border:`2px solid ${COLORS.teal}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:22, animation:"pop 0.4s 0.1s both" }}>✓</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:26, letterSpacing:"-1px", color:"#fff", marginBottom:10 }}>Message Sent!</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"#888", textAlign:"center", maxWidth:300, lineHeight:1.65, marginBottom:30 }}>Thanks for reaching out. We'll get back to you within 12 hours.</p>
                <button onClick={() => { setSuccess(false); setForm(initForm); }} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"12px 26px", fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:14, color:"#888", cursor:"pointer" }}>Send Another Message</button>
              </div>
            )}
            <div style={{ marginBottom:32 }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, letterSpacing:"3px", textTransform:"uppercase", color:COLORS.rose, marginBottom:10 }}>Contact Form</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:28, letterSpacing:"-1.5px", color:"#fff", lineHeight:1.1 }}>Tell us about<br/>your project</div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
                {[{name:"name",label:"Full Name",ph:"Alex Johnson",type:"text"},{name:"email",label:"Email Address",ph:"alex@company.com",type:"email"}].map(f => (
                  <div key={f.name} style={{ display:"flex", flexDirection:"column", gap:7 }}>
                    <label style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:"1.5px", textTransform:"uppercase", color:"#888" }}>{f.label} <span style={{ color:COLORS.rose }}>*</span></label>
                    <input style={inputStyle(errors[f.name])} type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.ph}
                      onFocus={e => { e.target.style.borderColor=COLORS.teal; e.target.style.background="rgba(50,89,109,0.1)"; }}
                      onBlur={e => { e.target.style.borderColor=errors[f.name]?COLORS.rose:"rgba(255,255,255,0.08)"; e.target.style.background="rgba(255,255,255,0.05)"; }}
                    />
                    {errors[f.name] && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:COLORS.roseLight }}>{errors[f.name]}</span>}
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  <label style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:"1.5px", textTransform:"uppercase", color:"#888" }}>Phone Number</label>
                  <input style={inputStyle(errors.phone)} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210"
                    onFocus={e => { e.target.style.borderColor=COLORS.teal; e.target.style.background="rgba(50,89,109,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor=errors.phone?COLORS.rose:"rgba(255,255,255,0.08)"; e.target.style.background="rgba(255,255,255,0.05)"; }}
                  />
                  {errors.phone && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:COLORS.roseLight }}>{errors.phone}</span>}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  <label style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:"1.5px", textTransform:"uppercase", color:"#888" }}>Service Needed</label>
                  <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle(false), cursor:"pointer" }}>
                    <option value="" style={{ background:"#0d0d0f" }}>Select a service</option>
                    {["SEO","Social Media","Google Ads","Website Design","Content Marketing","Branding"].map(s => <option key={s} value={s} style={{ background:"#0d0d0f" }}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:18 }}>
                <label style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:11, letterSpacing:"1.5px", textTransform:"uppercase", color:"#888" }}>Your Message <span style={{ color:COLORS.rose }}>*</span></label>
                <textarea style={{ ...inputStyle(errors.message), resize:"vertical", minHeight:128, lineHeight:1.65 }} name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project, goals, timeline, and budget..."
                  onFocus={e => { e.target.style.borderColor=COLORS.teal; e.target.style.background="rgba(50,89,109,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor=errors.message?COLORS.rose:"rgba(255,255,255,0.08)"; e.target.style.background="rgba(255,255,255,0.05)"; }}
                />
                {errors.message && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:COLORS.roseLight }}>{errors.message}</span>}
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, marginTop:28 }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:13, color:"#888" }}>We reply within 12 hours.</span>
                <button type="submit" disabled={loading} style={{ display:"flex", alignItems:"center", gap:10, background:COLORS.teal, border:"none", borderRadius:10, padding:"15px 30px", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:"#fff", cursor:loading?"not-allowed":"pointer", opacity:loading?0.6:1, transition:"all 0.2s" }}
                  onMouseEnter={e => { if(!loading) { e.currentTarget.style.background=COLORS.tealLight; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px rgba(50,89,109,0.35)`; }}}
                  onMouseLeave={e => { e.currentTarget.style.background=COLORS.teal; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
                >
                  {loading ? <><div style={{ width:15, height:15, border:"2px solid rgba(255,255,255,0.25)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/> Sending…</> : <>Send Message →</>}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ paddingBottom:100 }}>
          <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem, 3.5vw, 2.4rem)", color:"#fff", textAlign:"center", marginBottom:12 }}>Frequently Asked <span style={{ color:COLORS.teal }}>Questions</span></p>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(200,215,230,0.5)", textAlign:"center", marginBottom:48 }}>Got questions? We've got answers.</p>
          <div style={{ maxWidth:720, margin:"0 auto", display:"flex", flexDirection:"column", gap:12 }}>
            {faqs.map((faq,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(50,89,109,0.2)", borderRadius:12, overflow:"hidden", transition:"all 0.3s" }}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", background:"transparent", border:"none", fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:"0.95rem", color:"#fff", cursor:"pointer", textAlign:"left" }}>
                  {faq.q}
                  <span style={{ fontSize:"1.2rem", color:COLORS.teal, flexShrink:0, transform:openFaq===i?"rotate(45deg)":"rotate(0deg)", transition:"transform 0.25s", display:"inline-block" }}>+</span>
                </button>
                {openFaq===i && (
                  <div style={{ padding:"0 24px 20px", fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", color:"rgba(200,215,230,0.6)", lineHeight:1.7, animation:"fadeIn 0.3s ease" }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", padding:"26px 0", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:13, color:"#888" }}>© 2026 Pixonad · Creative Digital Studio · Bangalore, India</div>
          <div style={{ display:"flex", gap:14 }}>
            {["𝕏","in","◉","◈"].map((icon,i) => (
              <a key={i} href="#" style={{ width:34, height:34, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:"#888", textDecoration:"none", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=COLORS.teal; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color="#888"; }}
              >{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── APP ROOT ─── */
export default function App() {
  const [page, setPage] = useState("Home");
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [page]);
  return (
    <ThemeProvider theme={muiTheme}>
      <GlobalStyles/>
      <div style={{ minHeight:"100vh", background:"#060910" }}>
        <Navbar page={page} setPage={setPage}/>
        {page === "Home"     && <HomePage     setPage={setPage}/>}
        {page === "About"    && <AboutPage    setPage={setPage}/>}
        {page === "Services" && <ServicesPage setPage={setPage}/>}
        {page === "Blog"     && <BlogPage/>}
        {page === "Contact"  && <ContactPage/>}
      </div>
    </ThemeProvider>
  );
}