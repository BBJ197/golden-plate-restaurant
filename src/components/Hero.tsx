import { Link } from "react-router-dom";
import plate from "../assets/images/non-fasting-foods.webp";
import dessert from "../assets/images/dessert.webp";
import fasting from "../assets/images/fasting-foods.webp";
import drinks from "../assets/images/refreshment.webp";

export default function Hero() {
  return (
    <section className="gp-hero" data-scene="sticky" data-tilt>
      <div className="gp-hero-stage">
        <div className="gp-hero-inner">
          <div className="gp-hero-copy">
            <p className="gp-eyebrow">
              Fine Ethiopian dining &middot; Addis Ababa
            </p>
            <h1 className="gp-title gp-serif">
              <span className="gp-line">
                <span>Golden</span>
              </span>{" "}
              <span className="gp-line">
                <span>Plate</span>
              </span>
            </h1>
            <p className="gp-sub">Restaurant</p>
            <p className="gp-lead">
              A modern table for Ethiopia&rsquo;s most celebrated flavours, from
              slow-brewed coffee to festive feasts, served with warmth.
            </p>
            <div className="gp-actions">
              <Link to="/menu" className="gp-btn gp-btn-gold">
                View Menu
              </Link>
              <a href="#contact" className="gp-btn gp-btn-ghost">
                Visit Us
              </a>
            </div>
          </div>
          <div className="gp-scene">
            <span className="gp-ring gp-ring-2" aria-hidden="true" />
            <span className="gp-ring gp-ring-1" aria-hidden="true" />
            <div className="gp-plate">
              <img
                src={plate}
                alt="Ethiopian meat dishes in a black clay pot while spiced butter is poured over them"
                width="520"
                height="546"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <span className="gp-sat gp-sat-1">
              <img src={dessert} alt="" width="418" height="280" />
            </span>
            <span className="gp-sat gp-sat-2">
              <img src={fasting} alt="" width="370" height="328" />
            </span>
            <span className="gp-sat gp-sat-3">
              <img src={drinks} alt="" width="311" height="276" />
            </span>
          </div>
        </div>
        <span className="gp-cue" aria-hidden="true" />
      </div>
    </section>
  );
}
