import "./App.css";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import CallToAction from "./components/CallToAction";
import Clients from "./components/Clients";
import ContactUs from "./components/ContactUs";
import Navigation from "./components/Navigation";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";

function App() {
  return (
    <div className="app-wrapper">
      <Navigation />
      <main className="main-content">
        <AboutUs />
        <Services />
        <WhyChooseUs />
        <Process />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <Clients />
        <CallToAction />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;