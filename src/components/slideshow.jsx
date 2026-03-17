// Slideshow.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const SLIDES = [
  {
    id: 0,
    tag: "New Collection",
    headline: "The Nocturne",
    subheadline: "Silk & Shadow",
    body: "An ode to evening. Seven silhouettes born from dusk, each piece a study in restraint and desire.",
    cta: "Discover the Collection",
    accent: "#C9A84C",
    bg: "linear-gradient(135deg, #0D0B07 0%, #1A1408 40%, #0A0C0F 100%)",
    overlay:
      "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.12) 0%, transparent 60%)",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=80",
    imgPos: "center 20%",
    stat: { value: "VII", label: "Silhouettes" },
  },
  {
    id: 1,
    tag: "Heritage",
    headline: "Atelier",
    subheadline: "Stories in Thread",
    body: "One hundred years of craft. Each stitch placed by hands that understand the language of cloth.",
    cta: "The Atelier Story",
    accent: "#E8D5B0",
    bg: "linear-gradient(135deg, #0A0807 0%, #141210 50%, #0D0B09 100%)",
    overlay:
      "radial-gradient(ellipse at 30% 60%, rgba(232,213,176,0.1) 0%, transparent 60%)",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80",
    imgPos: "center 35%",
    stat: { value: "100", label: "Years" },
  },
  {
    id: 2,
    tag: "Exclusive",
    headline: "Le Blanc",
    subheadline: "Ivory Ceremony",
    body: "Sculpted in pure white. A ceremony of minimal forms for those who speak in absence.",
    cta: "Explore Le Blanc",
    accent: "#F5F0E8",
    bg: "linear-gradient(135deg, #090909 0%, #111111 50%, #0C0C0C 100%)",
    overlay:
      "radial-gradient(ellipse at 60% 40%, rgba(245,240,232,0.08) 0%, transparent 55%)",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
    imgPos: "center 25%",
    stat: { value: "12", label: "Pieces" },
  },
];

const DURATION = 6000;

export default function Slideshow() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState(1);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const elapsedRef = useRef(0);

  const goTo = useCallback(
    (idx, direction = 1) => {
      if (transitioning || idx === current) return;
      setTransitioning(true);
      setPrev(current);
      setDir(direction);
      setCurrent(idx);
      setProgress(0);
      elapsedRef.current = 0;
      startTimeRef.current = Date.now();
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 900);
    },
    [current, transitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length, 1);
  }, [current, goTo]);

  const back = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, -1);
  }, [current, goTo]);

  // Auto-advance with smooth progress
  useEffect(() => {
    if (paused) return;

    const tick = () => {
      const now = Date.now();
      const elapsed = elapsedRef.current + (now - startTimeRef.current);
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        next();
      }
    };

    progressRef.current = setInterval(tick, 50);
    return () => clearInterval(progressRef.current);
  }, [paused, next]);

  useEffect(() => {
    if (paused) {
      elapsedRef.current += Date.now() - startTimeRef.current;
      clearInterval(progressRef.current);
    } else {
      startTimeRef.current = Date.now();
    }
  }, [paused]);

  const slide = SLIDES[current];
  const prevSlide = prev !== null ? SLIDES[prev] : null;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "100svh", md: "100vh" },
        overflow: "hidden",
        background: "#0A0A0A",
        cursor: "default",
      }}
    >
      {/* Background layers */}
      {SLIDES.map((s, i) => (
        <Box
          key={s.id}
          sx={{
            position: "absolute",
            inset: 0,
            background: s.bg,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            zIndex: 0,
          }}
        />
      ))}

      {/* Image panel */}
      {SLIDES.map((s, i) => (
        <Box
          key={s.id}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: { xs: "100%", md: "58%" },
            height: "100%",
            overflow: "hidden",
            zIndex: 1,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${s.img})`,
              backgroundSize: "cover",
              backgroundPosition: s.imgPos,
              transform:
                i === current ? "scale(1.0)" : "scale(1.06)",
              transition:
                "transform 7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease",
            }}
          />
          {/* Image overlays */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: {
                xs: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.2) 100%)",
                md: "linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.5) 30%, rgba(10,10,10,0.1) 70%, transparent 100%)",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: s.overlay,
            }}
          />
        </Box>
      ))}

      {/* Content */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: { xs: "flex-end", md: "center" },
          px: { xs: 3, sm: 5, md: 8, lg: 12 },
          pb: { xs: 12, md: 0 },
        }}
      >
        <Box sx={{ maxWidth: { xs: "100%", md: "48%", lg: "42%" } }}>
          {/* Tag */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "translateY(8px)" : "translateY(0)",
              transition: "all 0.6s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: "1px",
                background: `linear-gradient(to right, ${slide.accent}, transparent)`,
              }}
            />
            <Typography
              variant="overline"
              sx={{
                color: slide.accent,
                opacity: 0.8,
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
              }}
            >
              {slide.tag}
            </Typography>
          </Box>

          {/* Headline */}
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5rem", lg: "6.5rem" },
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#F0EAD6",
              mb: 0.5,
              opacity: transitioning ? 0 : 1,
              transform: transitioning
                ? `translateY(${dir * 20}px)`
                : "translateY(0)",
              transition: "all 0.8s 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {slide.headline}
          </Typography>

          {/* Subheadline */}
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              color: slide.accent,
              opacity: transitioning ? 0 : 0.85,
              transform: transitioning
                ? `translateY(${dir * 15}px)`
                : "translateY(0)",
              transition: "all 0.8s 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              mb: 3,
            }}
          >
            {slide.subheadline}
          </Typography>

          {/* Divider */}
          <Box
            sx={{
              width: transitioning ? 0 : 60,
              height: "1px",
              background: `linear-gradient(to right, ${slide.accent}, transparent)`,
              transition: "width 0.8s 0.4s ease, background 0.5s ease",
              mb: 3,
            }}
          />

          {/* Body */}
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.15rem" },
              lineHeight: 1.9,
              color: "rgba(240,234,214,0.65)",
              maxWidth: 360,
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "translateY(12px)" : "translateY(0)",
              transition: "all 0.8s 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              mb: 4,
            }}
          >
            {slide.body}
          </Typography>

          {/* CTA */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "translateY(10px)" : "translateY(0)",
              transition: "all 0.8s 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <Button
              endIcon={<ArrowForwardIcon sx={{ fontSize: "0.8rem !important" }} />}
              sx={{
                background: `linear-gradient(135deg, ${slide.accent} 0%, rgba(201,168,76,0.7) 100%)`,
                color: "#0A0A0A",
                px: 3.5,
                py: 1.4,
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                fontWeight: 600,
                fontFamily: '"Raleway", sans-serif',
                textTransform: "uppercase",
                borderRadius: 0,
                boxShadow: `0 8px 32px rgba(201,168,76,0.2)`,
                transition: "all 0.4s ease",
                "&:hover": {
                  boxShadow: `0 12px 40px rgba(201,168,76,0.35)`,
                  transform: "translateY(-2px)",
                },
                "&::after": { display: "none" },
              }}
            >
              {slide.cta}
            </Button>

            {/* Stat */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: slide.accent,
                  lineHeight: 1,
                }}
              >
                {slide.stat.value}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Raleway", sans-serif',
                  fontWeight: 300,
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  color: "rgba(240,234,214,0.4)",
                  textTransform: "uppercase",
                }}
              >
                {slide.stat.label}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Bottom Controls */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          px: { xs: 3, sm: 5, md: 8, lg: 12 },
          pb: { xs: 3, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Progress bar + slide count */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1, maxWidth: 400 }}>
          <Typography
            sx={{
              fontFamily: '"Raleway", sans-serif',
              fontWeight: 300,
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "rgba(240,234,214,0.3)",
              flexShrink: 0,
            }}
          >
            0{current + 1} / 0{SLIDES.length}
          </Typography>

          <Box sx={{ flex: 1, position: "relative" }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: "1px",
                backgroundColor: "rgba(240,234,214,0.1)",
                "& .MuiLinearProgress-bar": {
                  background: `linear-gradient(to right, ${slide.accent}, rgba(201,168,76,0.6))`,
                  transition: "none",
                },
              }}
            />
          </Box>
        </Box>

        {/* Navigation buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton
            onClick={() => setPaused((p) => !p)}
            size="small"
            sx={{
              color: "rgba(240,234,214,0.3)",
              p: 1,
              "&:hover": { color: slide.accent },
              transition: "color 0.3s",
            }}
          >
            {paused ? (
              <PlayArrowIcon sx={{ fontSize: "0.9rem" }} />
            ) : (
              <PauseIcon sx={{ fontSize: "0.9rem" }} />
            )}
          </IconButton>

          <IconButton
            onClick={back}
            size="small"
            disabled={transitioning}
            sx={{
              color: "rgba(240,234,214,0.4)",
              border: "1px solid rgba(240,234,214,0.1)",
              borderRadius: 0,
              p: 1,
              ml: 1,
              transition: "all 0.3s",
              "&:hover": {
                color: slide.accent,
                borderColor: slide.accent,
                backgroundColor: "rgba(201,168,76,0.05)",
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: "0.9rem" }} />
          </IconButton>

          <IconButton
            onClick={next}
            size="small"
            disabled={transitioning}
            sx={{
              color: "rgba(240,234,214,0.4)",
              border: "1px solid rgba(240,234,240,0.1)",
              borderRadius: 0,
              p: 1,
              transition: "all 0.3s",
              "&:hover": {
                color: slide.accent,
                borderColor: slide.accent,
                backgroundColor: "rgba(201,168,76,0.05)",
              },
            }}
          >
            <ArrowForwardIcon sx={{ fontSize: "0.9rem" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Slide indicators */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: 16, md: 32 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {SLIDES.map((s, i) => (
          <Box
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            sx={{
              width: i === current ? 1 : 1,
              height: i === current ? 24 : 8,
              background:
                i === current
                  ? `linear-gradient(to bottom, ${slide.accent}, rgba(201,168,76,0.4))`
                  : "rgba(240,234,214,0.2)",
              cursor: "pointer",
              transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              "&:hover": {
                background: `rgba(201,168,76,0.5)`,
                height: 16,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}