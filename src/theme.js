// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#C9A84C",
      light: "#E8CC82",
      dark: "#9A7A2A",
      contrastText: "#0A0A0A",
    },
    secondary: {
      main: "#E8E0D0",
      light: "#F5F2EC",
      dark: "#B8AE98",
      contrastText: "#0A0A0A",
    },
    background: {
      default: "#0A0A0A",
      paper: "#111111",
      elevated: "#1A1A1A",
    },
    text: {
      primary: "#F0EAD6",
      secondary: "#9A9080",
      muted: "#5A5248",
    },
    divider: "rgba(201, 168, 76, 0.2)",
    error: { main: "#CF4444" },
    success: { main: "#4CAF7A" },
    warning: { main: "#E8A030" },
    info: { main: "#5090CF" },
  },

  typography: {
    fontFamily: '"Cormorant Garamond", "Georgia", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: "clamp(2.5rem, 6vw, 5rem)",
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "clamp(2rem, 4vw, 3.5rem)",
      letterSpacing: "-0.015em",
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
      letterSpacing: "0.02em",
    },
    h5: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 500,
      fontSize: "1.25rem",
      letterSpacing: "0.03em",
    },
    h6: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 500,
      fontSize: "1rem",
      letterSpacing: "0.05em",
    },
    subtitle1: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 300,
      fontSize: "1rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
    },
    subtitle2: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 400,
      fontSize: "0.875rem",
      letterSpacing: "0.1em",
    },
    body1: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 400,
      fontSize: "1.1rem",
      lineHeight: 1.8,
    },
    body2: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 300,
      fontSize: "0.9rem",
      lineHeight: 1.7,
      letterSpacing: "0.03em",
    },
    button: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 500,
      fontSize: "0.75rem",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
    },
    caption: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 300,
      fontSize: "0.75rem",
      letterSpacing: "0.1em",
    },
    overline: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 500,
      fontSize: "0.7rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
    },
  },

  shape: {
    borderRadius: 2,
  },

  spacing: 8,

  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1600,
      xxl: 1920,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Raleway:wght@200;300;400;500;600&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; }
        
        html { scroll-behavior: smooth; }
        
        body {
          background-color: #0A0A0A;
          color: #F0EAD6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::selection {
          background: rgba(201, 168, 76, 0.3);
          color: #F0EAD6;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { 
          background: rgba(201, 168, 76, 0.4); 
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(201, 168, 76, 0.7); }
      `,
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201, 168, 76, 0.15)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "12px 32px",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 0,
            height: "1px",
            backgroundColor: "currentColor",
            transition: "width 0.4s ease",
          },
          "&:hover::after": {
            width: "100%",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: "0 8px 32px rgba(201, 168, 76, 0.25)" },
        },
        outlined: {
          borderColor: "rgba(201, 168, 76, 0.5)",
          "&:hover": {
            borderColor: "#C9A84C",
            backgroundColor: "rgba(201, 168, 76, 0.05)",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(201, 168, 76, 0.08)",
            color: "#C9A84C",
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(201, 168, 76, 0.2)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0D0D0D",
          borderRight: "1px solid rgba(201, 168, 76, 0.15)",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1A1A1A",
          border: "1px solid rgba(201, 168, 76, 0.2)",
          color: "#F0EAD6",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          borderRadius: 0,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: '"Raleway", sans-serif',
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          fontWeight: 500,
          textTransform: "uppercase",
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: "rgba(201, 168, 76, 0.1)",
        },
        bar: {
          borderRadius: 0,
          backgroundColor: "#C9A84C",
        },
      },
    },
  },

  shadows: [
    "none",
    "0 1px 4px rgba(0,0,0,0.4)",
    "0 2px 8px rgba(0,0,0,0.5)",
    "0 4px 16px rgba(0,0,0,0.5)",
    "0 6px 24px rgba(0,0,0,0.6)",
    "0 8px 32px rgba(0,0,0,0.6)",
    "0 10px 40px rgba(0,0,0,0.7)",
    "0 12px 48px rgba(0,0,0,0.7)",
    "0 16px 56px rgba(0,0,0,0.8)",
    "0 20px 64px rgba(0,0,0,0.8)",
    ...Array(15).fill("0 24px 80px rgba(0,0,0,0.9)"),
  ],

  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 300,
      standard: 400,
      complex: 600,
      enteringScreen: 400,
      leavingScreen: 300,
    },
  },
});

export default theme;