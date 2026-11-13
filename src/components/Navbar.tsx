import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Icon from "./Icon";

type NavLink = { label: string; href?: string; to?: string };

const links: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Menu", to: "/menu" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  // close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !openBtnRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header className="gp-header">
      <nav className="gp-nav" aria-label="Main">
        <a href="#" className="gp-brand">
          <span className="gp-script">Golden Plate</span>
        </a>

        <ul className={`gp-menu ${open ? "active" : ""}`} ref={menuRef}>
          <li className="gp-menu-close">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <Icon icon={faXmark} />
            </button>
          </li>
          {links.map((link) => (
            <li key={link.label}>
              {link.to ? (
                <Link to={link.to} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <button
          className="gp-burger"
          type="button"
          aria-label="Open menu"
          ref={openBtnRef}
          onClick={() => setOpen(true)}
        >
          <Icon icon={faBars} />
        </button>
      </nav>
    </header>
  );
}
