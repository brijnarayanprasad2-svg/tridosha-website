import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <a href="#home" className="brand">
        <span className="brand-name">TRIDOSHA</span>
        <span className="brand-subtitle">
          AYURVEDIC WELLNESS
        </span>
      </a>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <a href="#booking" className="nav-book">
        Book Appointment
      </a>

    </header>
  );
}

export default Navbar;