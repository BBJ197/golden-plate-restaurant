import fasting from "../assets/images/fasting-foods.webp";
import nonFasting from "../assets/images/non-fasting-foods.webp";
import dessert from "../assets/images/dessert.webp";
import hot from "../assets/images/hot-beveragrs.webp";
import cold from "../assets/images/cold-beveragrs.webp";
import fresh from "../assets/images/refreshment.webp";

const photos = [
  { src: fasting, alt: "Ethiopian fasting dishes" },
  { src: nonFasting, alt: "Ethiopian non-fasting dishes" },
  { src: dessert, alt: "A plated dessert" },
  { src: hot, alt: "A hot drink" },
  { src: cold, alt: "A cold drink" },
  { src: fresh, alt: "A fresh fruit refreshment" },
];

export default function Gallery() {
  return (
    <section
      className="gp-gallery"
      id="gallery"
      aria-labelledby="gallery-title"
    >
      <div className="gp-wrap" data-reveal>
        <p className="gp-script gp-kicker">A taste of</p>
        <h2 id="gallery-title" className="gp-h2 gp-serif">
          Our Gallery
        </h2>
        <div className="gp-gallery-grid">
          {photos.map((p) => (
            <figure key={p.alt} className="gp-gallery-item">
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
