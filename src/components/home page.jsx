import { useState, useEffect } from "react";
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  Chip, Avatar, Stack, IconButton, Divider, useTheme
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/Shield";
import InsightsIcon from "@mui/icons-material/Insights";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#E8FF47" },
    secondary: { main: "#FF6B35" },
    background: { default: "#060608", paper: "#0E0F14" },
    text: { primary: "#F0EDE8", secondary: "#888890" },
  },
  typography: {
    fontFamily: "'Syne', sans-serif",
    h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    body1: { fontFamily: "'DM Sans', sans-serif" },
    body2: { fontFamily: "'DM Sans', sans-serif" },
    button: { fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: "0.05em" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: "uppercase",
          padding: "14px 32px",
          fontSize: "0.8rem",
          letterSpacing: "0.1em",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: "#0E0F14",
          border: "1px solid #1E1F26",
        },
      },
    },
  },
});

const GOOGLE_FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
`;

const features = [
  {
    icon: <BoltIcon fontSize="large" />,
    title: "Blazing Fast",
    desc: "Engineered from the ground up for sub-100ms responses. No compromises, no shortcuts.",
  },
  {
    icon: <ShieldIcon fontSize="large" />,
    title: "Zero-Trust Security",
    desc: "End-to-end encrypted pipelines with enterprise-grade compliance baked in by default.",
  },
  {
    icon: <InsightsIcon fontSize="large" />,
    title: "Deep Analytics",
    desc: "Real-time telemetry that surfaces actionable insights before problems escalate.",
  },
  {
    icon: <AutoAwesomeIcon fontSize="large" />,
    title: "AI-Native",
    desc: "Intelligent automation that learns your workflows and amplifies your team's output.",
  },
];

const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "12M+", label: "API calls daily" },
  { value: "340ms", label: "Avg. response" },
  { value: "4,200+", label: "Teams onboard" },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    highlight: false,
    perks: ["Up to 5 projects", "10k API calls/mo", "Community support", "Basic analytics"],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    highlight: true,
    perks: ["Unlimited projects", "1M API calls/mo", "Priority support", "Advanced analytics", "Custom integrations"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    highlight: false,
    perks: ["White-glove onboarding", "Dedicated infra", "24/7 SLA", "SSO & audit logs", "Custom contracts"],
  },
];

const testimonials = [
  {
    name: "Priya Natarajan",
    role: "CTO, Fieldline",
    quote: "We cut our infra costs by 60% and doubled throughput in under a week. Nothing else comes close.",
    avatar: "P",
  },
  {
    name: "Marcus Webb",
    role: "Head of Eng, Stratum",
    quote: "The developer experience is exceptional. From zero to prod in hours, not weeks.",
    avatar: "M",
  },
  {
    name: "Lena Osei",
    role: "Founder, Archform",
    quote: "This is what modern infrastructure should feel like — invisible, reliable, intelligent.",
    avatar: "L",
  },
];

function GlowDot({ top, left, color = "#E8FF47" }) {
  return (
    <Box
      sx={{
        position: "absolute", top, left,
        width: 320, height: 320, borderRadius: "50%",
        background: alpha(color, 0.08),
        filter: "blur(80px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <style>{GOOGLE_FONTS}</style>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", color: "text.primary", overflowX: "hidden" }}>

        {/* NAV */}
        <Box
          sx={{
            position: "sticky", top: 0, zIndex: 100,
            borderBottom: scrolled ? "1px solid #1E1F26" : "1px solid transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            bgcolor: scrolled ? alpha("#060608", 0.85) : "transparent",
            transition: "all 0.3s ease",
            px: { xs: 3, md: 6 }, py: 2,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Syne', sans-serif" }}>
            NEXUS<Box component="span" sx={{ color: "primary.main" }}>.</Box>
          </Typography>
          <Stack direction="row" spacing={4} sx={{ display: { xs: "none", md: "flex" } }}>
            {["Product", "Docs", "Pricing", "Blog"].map((item) => (
              <Typography key={item} variant="body2" sx={{ cursor: "pointer", opacity: 0.6, "&:hover": { opacity: 1 }, transition: "opacity 0.2s", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.75rem" }}>
                {item}
              </Typography>
            ))}
          </Stack>
          <Button variant="contained" color="primary" sx={{ color: "#060608", py: 1, px: 3, fontSize: "0.7rem" }}>
            Get Started
          </Button>
        </Box>

        {/* HERO */}
        <Box sx={{ position: "relative", pt: { xs: 10, md: 16 }, pb: { xs: 10, md: 14 }, overflow: "hidden" }}>
          <GlowDot top="-80px" left="50%" color="#E8FF47" />
          <GlowDot top="200px" left="-100px" color="#FF6B35" />
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Chip
              label="✦  Now in Public Beta"
              size="small"
              sx={{
                mb: 4, bgcolor: alpha("#E8FF47", 0.1), color: "primary.main",
                border: "1px solid", borderColor: alpha("#E8FF47", 0.3),
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.75rem",
                borderRadius: "2px",
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem" },
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                mb: 3,
                "& span": { color: "primary.main" },
              }}
            >
              Build faster.<br /><span>Ship</span> fearlessly.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "text.secondary", maxWidth: 520, mx: "auto", mb: 5, lineHeight: 1.7 }}
            >
              The infrastructure platform that scales with your ambition — from weekend hack to production-grade systems.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} sx={{ color: "#060608", fontSize: "0.8rem" }}>
                Start for free
              </Button>
              <Button variant="outlined" sx={{ borderColor: "#1E1F26", color: "text.primary", "&:hover": { borderColor: "#E8FF47", color: "primary.main" }, fontSize: "0.8rem" }}>
                View the docs
              </Button>
            </Stack>
          </Container>

          {/* Stats bar */}
          <Container maxWidth="lg" sx={{ mt: 14, position: "relative", zIndex: 1 }}>
            <Box sx={{ border: "1px solid #1E1F26", display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" } }}>
              {stats.map((s, i) => (
                <Box key={i} sx={{
                  p: 4, textAlign: "center",
                  borderRight: i < stats.length - 1 ? "1px solid #1E1F26" : "none",
                  borderBottom: { xs: i < 2 ? "1px solid #1E1F26" : "none", md: "none" },
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "-0.03em" }}>{s.value}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.1em" }}>{s.label}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* FEATURES */}
        <Box sx={{ py: { xs: 10, md: 14 }, position: "relative", overflow: "hidden" }}>
          <GlowDot top="100px" left="80%" color="#FF6B35" />
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ mb: 8 }}>
              <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem" }}>
                CAPABILITIES
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.5rem" }, letterSpacing: "-0.03em", mt: 1, maxWidth: 560 }}>
                Everything you need, nothing you don't.
              </Typography>
            </Box>
            <Grid container spacing={0}>
              {features.map((f, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Box
                    sx={{
                      p: 5,
                      border: "1px solid #1E1F26",
                      ml: i % 2 === 1 ? "-1px" : 0,
                      mt: i >= 2 ? "-1px" : 0,
                      position: "relative",
                      overflow: "hidden",
                      transition: "background 0.3s",
                      "&:hover": { background: alpha("#E8FF47", 0.03) },
                      "&:hover .feature-icon": { color: "primary.main" },
                    }}
                  >
                    <Box className="feature-icon" sx={{ color: "#888890", mb: 2, transition: "color 0.3s" }}>{f.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>{f.title}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8 }}>{f.desc}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* TESTIMONIALS */}
        <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "#0A0A0C" }}>
          <Container maxWidth="lg">
            <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem" }}>
              TESTIMONIALS
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, letterSpacing: "-0.03em", mt: 1, mb: 8, maxWidth: 480 }}>
              Loved by teams worldwide.
            </Typography>
            <Grid container spacing={0}>
              {testimonials.map((t, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box sx={{
                    p: 5, border: "1px solid #1E1F26",
                    ml: i > 0 ? "-1px" : 0, height: "100%",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    transition: "background 0.3s",
                    "&:hover": { background: alpha("#E8FF47", 0.02) },
                  }}>
                    <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9, fontStyle: "italic", fontFamily: "'DM Sans', sans-serif", mb: 4 }}>
                      "{t.quote}"
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: alpha("#E8FF47", 0.15), color: "primary.main", fontFamily: "'Syne', sans-serif", fontWeight: 700, width: 40, height: 40, borderRadius: "4px" }}>
                        {t.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>{t.name}</Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>{t.role}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* PRICING */}
        <Box sx={{ py: { xs: 10, md: 14 }, position: "relative", overflow: "hidden" }}>
          <GlowDot top="0px" left="30%" color="#E8FF47" />
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ mb: 8, textAlign: "center" }}>
              <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem" }}>
                PRICING
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.5rem" }, letterSpacing: "-0.03em", mt: 1 }}>
                Transparent. Predictable. Fair.
              </Typography>
            </Box>
            <Grid container spacing={0} justifyContent="center">
              {plans.map((plan, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Box
                    sx={{
                      p: 5,
                      border: "1px solid",
                      borderColor: plan.highlight ? "primary.main" : "#1E1F26",
                      ml: i > 0 ? "-1px" : 0,
                      height: "100%",
                      position: "relative",
                      background: plan.highlight ? alpha("#E8FF47", 0.04) : "transparent",
                    }}
                  >
                    {plan.highlight && (
                      <Chip label="Most Popular" size="small" sx={{
                        position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                        bgcolor: "primary.main", color: "#060608",
                        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.65rem",
                        borderRadius: "2px", letterSpacing: "0.05em",
                      }} />
                    )}
                    <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: "0.15em", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem" }}>
                      {plan.name}
                    </Typography>
                    <Box sx={{ mt: 2, mb: 4, display: "flex", alignItems: "baseline", gap: 0.5 }}>
                      <Typography variant="h2" sx={{ fontWeight: 800, letterSpacing: "-0.04em" }}>{plan.price}</Typography>
                      {plan.period && <Typography variant="body2" sx={{ color: "text.secondary" }}>{plan.period}</Typography>}
                    </Box>
                    <Stack spacing={1.5} sx={{ mb: 5 }}>
                      {plan.perks.map((perk, j) => (
                        <Stack key={j} direction="row" spacing={1.5} alignItems="center">
                          <CheckCircleOutlineIcon sx={{ fontSize: 16, color: plan.highlight ? "primary.main" : "text.secondary" }} />
                          <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "'DM Sans', sans-serif" }}>{perk}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      variant={plan.highlight ? "contained" : "outlined"}
                      color="primary"
                      sx={{
                        color: plan.highlight ? "#060608" : "text.primary",
                        borderColor: plan.highlight ? "primary.main" : "#1E1F26",
                        "&:hover": { borderColor: "primary.main" },
                        fontSize: "0.75rem",
                      }}
                    >
                      {plan.name === "Enterprise" ? "Contact us" : "Get started"}
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA BANNER */}
        <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "#0A0A0C" }}>
          <Container maxWidth="md" sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, letterSpacing: "-0.04em", mb: 3 }}>
              Ready to build something{" "}
              <Box component="span" sx={{ color: "primary.main" }}>remarkable?</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 5, lineHeight: 1.8, maxWidth: 440, mx: "auto" }}>
              Join thousands of engineering teams who've moved beyond legacy constraints.
            </Typography>
            <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} sx={{ color: "#060608" }}>
              Start building today
            </Button>
          </Container>
        </Box>

        {/* FOOTER */}
        <Box sx={{ borderTop: "1px solid #1E1F26", py: 5, px: { xs: 3, md: 6 } }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Syne', sans-serif" }}>
              NEXUS<Box component="span" sx={{ color: "primary.main" }}>.</Box>
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: "'DM Sans', sans-serif" }}>
              © 2025 Nexus Technologies, Inc. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[<GitHubIcon />, <TwitterIcon />, <LinkedInIcon />].map((icon, i) => (
                <IconButton key={i} size="small" sx={{ color: "text.secondary", "&:hover": { color: "primary.main" }, borderRadius: 0 }}>
                  {icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Box>

      </Box>
    </ThemeProvider>
  );
}