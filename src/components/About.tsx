import aboutImg from "../assets/images/About-us.webp";

export default function About() {
  return (
    <section className="gp-story" id="about" data-scene="">
      <div className="gp-story-tilt">
        <img
          className="gp-salt gp-salt-story"
          src="/golden/salt.svg"
          alt=""
          width="400"
          height="400"
          loading="lazy"
        />
        <div className="gp-story-card" data-reveal>
          <figure className="gp-story-img">
            <img
              src={aboutImg}
              alt="A woman in traditional white Ethiopian dress with red embroidery roasting coffee over a charcoal stove during a coffee ceremony"
              width="900"
              height="606"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="gp-story-text">
            <p className="gp-script gp-kicker">Discover</p>
            <h2 className="gp-serif">Our Story</h2>
            <p>
              Golden Plate Restaurant is in the heart of Addis Ababa, at the
              Jambo Building in Addisu Gebeya. Whether you are joining us for a
              dinner, a coffee ceremony with friends or just a drink and
              dessert, we serve Ethiopian coffee, fasting and non-fasting dishes
              and refreshments in a warm space made for unhurried meals.
            </p>
          </div>
        </div>
        <img
          className="gp-fx-story"
          src="/golden/sprig.svg"
          alt=""
          width="120"
          height="190"
          loading="lazy"
        />
      </div>
    </section>
  );
}
