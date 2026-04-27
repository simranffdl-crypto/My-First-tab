
import Footer from "./components/Footer";
import AboutUs from "./components/About Us";
import CallToAction from "./components/Call to action";
import Clients from "./components/Clients";
import ContactUs from "./components/Contact Us";
import Navigation from "./components/Navigation";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/Whychoose us";

function App() {
  return (
    <>
      <Navigation />
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
      <Footer />
    </>
  );
}

export default App;