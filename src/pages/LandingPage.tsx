import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useGoldenScroll } from "../lib/useGoldenScroll";

const words =
  "Fasting \u2726 Non-fasting \u2726 Hot \u2726 Cold \u2726 Desserts \u2726 Tej & Tela \u2726 Jebena Coffee \u2726 ";

export default function LandingPage() {
  useGoldenScroll();
  return (
    <div className="gp">
      <Navbar />
      <main id="main">
        <Hero />
        <div className="gp-marquee" aria-hidden="true">
          <div>
            {[0, 1, 2, 3].map((k) => (
              <span className="gp-serif" key={k}>
                {words}
              </span>
            ))}
          </div>
        </div>
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
