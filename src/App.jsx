// App.jsx
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Header from "./components/Header";
import Slideshow from "./components/slideshow";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Slideshow />
    </ThemeProvider>
  );
}