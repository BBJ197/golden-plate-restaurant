import { Link } from "react-router-dom";
import { menuItems } from "../data";

// Item 5 has a flat white photo background, so it is left out of the floating-plate layout.
const dishes = menuItems.filter((item) => item.id !== 5);

export default function Menu() {
  return (
    <section className="gp-dishes" id="menu">
      <div className="gp-dishes-head" data-reveal>
        <p className="gp-script gp-kicker">Our Menu</p>
        <h2 className="gp-serif gp-h2">Signature Dishes</h2>
      </div>
      <ul>
        {dishes.map((item) => (
          <li className="gp-dish" key={item.id} data-scene="" data-reveal>
            <div className="gp-dish-art">
              <img
                src={item.image}
                alt=""
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="gp-dish-text">
              <h3 className="gp-script">{item.name}</h3>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="gp-dishes-cta">
        <Link to="/menu" className="gp-btn">
          See the full menu
        </Link>
      </div>
    </section>
  );
}
