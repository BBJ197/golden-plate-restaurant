import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useGoldenScroll } from "../lib/useGoldenScroll";

export default function LandingPage() {
  useGoldenScroll();
  return (
    <div className="gp">
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Menu />
        <div data-reveal>
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
