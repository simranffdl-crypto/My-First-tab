// Header.jsx
import { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const NAV_LINKS = [
  {
    label: "Collections",
    sub: ["New Arrivals", "Capsule", "Heritage", "Archive"],
  },
  { label: "Maison", sub: ["Our Story", "Artisans", "Sustainability"] },
  { label: "World", sub: ["Events", "Press", "Lookbook"] },
  { label: "Contact", sub: [] },
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({ threshold: 80 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const goldGradient =
    "linear-gradient(135deg, #C9A84C 0%, #E8CC82 50%, #9A7A2A 100%)";

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: scrolled
              ? "rgba(10,10,10,0.92)"
              : "rgba(10,10,10,0.6)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid",
            borderColor: scrolled
              ? "rgba(201,168,76,0.25)"
              : "rgba(201,168,76,0.1)",
            transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {/* Top ticker */}
          <Box
            sx={{
              background: goldGradient,
              py: 0.6,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 8,
                animation: "ticker 25s linear infinite",
                whiteSpace: "nowrap",
                "@keyframes ticker": {
                  "0%": { transform: "translateX(0)" },
                  "100%": { transform: "translateX(-50%)" },
                },
              }}
            >
              {[...Array(8)].map((_, i) => (
                <Typography
                  key={i}
                  variant="overline"
                  sx={{
                    color: "#0A0A0A",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                  }}
                >
                  Complimentary shipping on orders over $500 &nbsp;·&nbsp; New
                  Collection Now Available &nbsp;·&nbsp; Crafted with Legacy
                </Typography>
              ))}
            </Box>
          </Box>

          <Toolbar
            sx={{
              px: { xs: 2, md: 5 },
              minHeight: { xs: "64px", md: "76px" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Left nav (desktop) */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                {NAV_LINKS.slice(0, 2).map((link) => (
                  <Box
                    key={link.label}
                    onMouseEnter={() => setActiveMenu(link.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                    sx={{ position: "relative" }}
                  >
                    <Button
                      sx={{
                        color:
                          activeMenu === link.label ? "#C9A84C" : "#F0EAD6",
                        px: 2,
                        py: 1,
                        fontSize: "0.7rem",
                        letterSpacing: "0.18em",
                        fontFamily: '"Raleway", sans-serif',
                        fontWeight: 500,
                        textTransform: "uppercase",
                        borderRadius: 0,
                        transition: "color 0.3s ease",
                        "&::after": { display: "none" },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          bottom: 6,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: activeMenu === link.label ? "20px" : 0,
                          height: "1px",
                          background: goldGradient,
                          transition: "width 0.3s ease",
                        },
                      }}
                    >
                      {link.label}
                    </Button>

                    {/* Dropdown */}
                    {link.sub.length > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          minWidth: 200,
                          background: "rgba(13,13,13,0.97)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(201,168,76,0.2)",
                          py: 1,
                          opacity: activeMenu === link.label ? 1 : 0,
                          transform:
                            activeMenu === link.label
                              ? "translateY(0)"
                              : "translateY(-8px)",
                          pointerEvents:
                            activeMenu === link.label ? "auto" : "none",
                          transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
                          zIndex: 10,
                        }}
                      >
                        {link.sub.map((s) => (
                          <Box
                            key={s}
                            sx={{
                              px: 3,
                              py: 1.2,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              "&:hover .dot": { opacity: 1, width: 12 },
                              "&:hover p": { color: "#C9A84C" },
                            }}
                          >
                            <Box
                              className="dot"
                              sx={{
                                height: 1,
                                width: 0,
                                background: goldGradient,
                                opacity: 0,
                                transition: "all 0.3s ease",
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#9A9080",
                                fontSize: "0.75rem",
                                letterSpacing: "0.1em",
                                fontFamily: '"Raleway", sans-serif',
                                transition: "color 0.3s ease",
                              }}
                            >
                              {s}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}

            {/* Center Logo */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: isMobile ? 1 : "0 0 auto",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  mb: 0.3,
                }}
              >
                <Box
                  sx={{
                    width: 18,
                    height: 1,
                    background: goldGradient,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                    letterSpacing: "0.18em",
                    background: goldGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                  }}
                >
                  MAISON
                </Typography>
                <Box
                  sx={{
                    width: 18,
                    height: 1,
                    background: goldGradient,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Raleway", sans-serif',
                  fontWeight: 300,
                  fontSize: "0.5rem",
                  letterSpacing: "0.45em",
                  color: "rgba(201,168,76,0.6)",
                  textTransform: "uppercase",
                }}
              >
                Paris · Est. 1924
              </Typography>
            </Box>

            {/* Right nav + icons */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              {!isMobile && (
                <Box sx={{ display: "flex", mr: 1 }}>
                  {NAV_LINKS.slice(2).map((link) => (
                    <Box
                      key={link.label}
                      onMouseEnter={() => setActiveMenu(link.label)}
                      onMouseLeave={() => setActiveMenu(null)}
                      sx={{ position: "relative" }}
                    >
                      <Button
                        sx={{
                          color:
                            activeMenu === link.label ? "#C9A84C" : "#F0EAD6",
                          px: 2,
                          py: 1,
                          fontSize: "0.7rem",
                          letterSpacing: "0.18em",
                          fontFamily: '"Raleway", sans-serif',
                          fontWeight: 500,
                          textTransform: "uppercase",
                          borderRadius: 0,
                          transition: "color 0.3s ease",
                          "&::after": { display: "none" },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            bottom: 6,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: activeMenu === link.label ? "20px" : 0,
                            height: "1px",
                            background: goldGradient,
                            transition: "width 0.3s ease",
                          },
                        }}
                      >
                        {link.label}
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}

              {[
                { icon: <SearchIcon fontSize="small" />, label: "Search" },
                {
                  icon: <AccountCircleOutlinedIcon fontSize="small" />,
                  label: "Account",
                },
                {
                  icon: <FavoriteBorderIcon fontSize="small" />,
                  label: "Wishlist",
                },
                {
                  icon: <ShoppingBagOutlinedIcon fontSize="small" />,
                  label: "Bag",
                },
              ].map(({ icon, label }) => (
                <IconButton
                  key={label}
                  aria-label={label}
                  size="small"
                  sx={{
                    color: "#9A9080",
                    p: 1.2,
                    "&:hover": {
                      color: "#C9A84C",
                      backgroundColor: "rgba(201,168,76,0.06)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {icon}
                </IconButton>
              ))}

              {isMobile && (
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{
                    color: "#F0EAD6",
                    ml: 0.5,
                    "&:hover": { color: "#C9A84C" },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "min(85vw, 360px)",
            backgroundColor: "#0D0D0D",
            borderLeft: "1px solid rgba(201,168,76,0.2)",
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Drawer Header */}
          <Box
            sx={{
              px: 3,
              py: 2.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "1.2rem",
                letterSpacing: "0.15em",
                background: goldGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              MAISON
            </Typography>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              sx={{ color: "#9A9080", "&:hover": { color: "#C9A84C" } }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Drawer Nav */}
          <List sx={{ flex: 1, py: 2, px: 1 }}>
            {NAV_LINKS.map((link, idx) => (
              <Box key={link.label}>
                <ListItem
                  onClick={() =>
                    setExpandedMobile(
                      expandedMobile === link.label ? null : link.label
                    )
                  }
                  sx={{
                    py: 1.8,
                    px: 2,
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(201,168,76,0.08)",
                    "&:hover": { backgroundColor: "rgba(201,168,76,0.04)" },
                    transition: "background 0.2s",
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: '"Raleway", sans-serif',
                        fontWeight: expandedMobile === link.label ? 600 : 400,
                        fontSize: "0.8rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color:
                          expandedMobile === link.label ? "#C9A84C" : "#F0EAD6",
                        transition: "color 0.3s ease",
                      },
                    }}
                  />
                  {link.sub.length > 0 && (
                    <Typography
                      sx={{
                        color: "#5A5248",
                        fontSize: "0.7rem",
                        transform:
                          expandedMobile === link.label
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      ›
                    </Typography>
                  )}
                </ListItem>

                {link.sub.length > 0 && (
                  <Collapse in={expandedMobile === link.label}>
                    {link.sub.map((s) => (
                      <ListItem
                        key={s}
                        sx={{
                          py: 1.2,
                          pl: 5,
                          cursor: "pointer",
                          "&:hover p": { color: "#C9A84C" },
                        }}
                      >
                        <ListItemText
                          primary={s}
                          primaryTypographyProps={{
                            sx: {
                              fontFamily: '"Raleway", sans-serif',
                              fontWeight: 300,
                              fontSize: "0.75rem",
                              letterSpacing: "0.12em",
                              color: "#6A6258",
                              transition: "color 0.2s",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </Collapse>
                )}
              </Box>
            ))}
          </List>

          {/* Drawer Footer */}
          <Box sx={{ p: 3, borderTop: "1px solid rgba(201,168,76,0.15)" }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: "rgba(201,168,76,0.4)",
                color: "#C9A84C",
                py: 1.5,
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                "&:hover": { borderColor: "#C9A84C", backgroundColor: "rgba(201,168,76,0.05)" },
              }}
            >
              Enter the Maison
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}