import { Link } from "react-router-dom";
import pan from "../assets/images/central.png";
import fruit from "../assets/images/sause.png";
import cup from "../assets/images/salt.png";

export default function Hero() {
  return (
    <section className="gp-hero" data-scene="sticky" data-tilt>
      <div className="gp-hero-stage">
        <div className="gp-hero-inner">
          <div className="gp-hero-copy">
            <p className="gp-script gp-kicker">Golden Plate Restaurant</p>
            <h1 className="gp-title gp-serif">
              <span className="gp-line">
                <span>A Premium</span>
              </span>{" "}
              <span className="gp-line">
                <span>And Authentic</span>
              </span>{" "}
              <span className="gp-line">
                <span>Ethiopian Table</span>
              </span>
            </h1>
            <div className="gp-actions">
              <Link to="/menu" className="gp-btn">
                View Menu
              </Link>
              <a href="#contact" className="gp-btn">
                Contact Us
              </a>
            </div>
          </div>
          <div className="gp-scene">
            <img
              className="gp-pan"
              src={pan}
              alt="A cast-iron pan of freshly roasted coffee beans"
              width="820"
              height="960"
              fetchPriority="high"
              decoding="async"
            />
            <img
              className="gp-fx gp-fx-fruit"
              src={fruit}
              alt=""
              width="311"
              height="276"
            />
            <div className="gp-sprinkle" aria-hidden="true">
              <img
                className="gp-sprinkle-shaker"
                src={cup}
                alt=""
                width="511"
                height="382"
              />
              <span className="gp-grains">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
            <img
              className="gp-salt gp-salt-b"
              src="/golden/salt.svg"
              alt=""
              width="400"
              height="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
