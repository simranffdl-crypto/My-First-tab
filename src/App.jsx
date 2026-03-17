// App.jsx
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Header from "./Header";
import Slideshow from "./Slideshow";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Slideshow />
    </ThemeProvider>
  );
}