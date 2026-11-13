import Icon from "./Icon";
import { socialLinks } from "../data";
const currentYear = new Date().getFullYear();

export default function Footer() {
  const links = socialLinks.filter((s) => s.href);

  return (
    <footer className="gp-footer">
      <div className="gp-wrap gp-footer-row">
        <p>
          &copy; {currentYear} Golden Plate Restaurant. All rights reserved.
        </p>
        <div className="gp-social">
          {links.map((s) => (
            <a href={s.href} aria-label={s.label} key={s.id}>
              <Icon icon={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
