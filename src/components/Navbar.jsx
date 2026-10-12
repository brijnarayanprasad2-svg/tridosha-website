import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Treatments", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Brand logo */}
        <a
          className="logo"
          href="#home"
          aria-label="Tridosha Ayurvedic Massage Center home"
          onClick={closeMenu}
        >
          <img
            className="navbar-logo"
            src="/logo.jpg"
            alt="Tridosha Ayurvedic Massage Center"
            width="52"
            height="52"
          />

          <span className="logo-text">
            <span className="logo-name">TRIDOSHA</span>
            <span className="logo-subtitle">
              AYURVEDIC MASSAGE CENTER
            </span>
          </span>
        </a>

        {/* Mobile menu button */}
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation links */}
        <nav
          id="primary-navigation"
          className={`nav-links ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}

          <a
            className="nav-cta"
            href="#booking"
            onClick={closeMenu}
          >
            Book Appointment
            <span aria-hidden="true"> ↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;