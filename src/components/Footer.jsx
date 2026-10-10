
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="footer-logo" href="#top">
            TRIDOSHA
          </a>
          <p>
            A moment of calm. A return to balance.
            <br />
            Your wellness journey starts here.
          </p>
        </div>

        <div className="footer-contact">
          <h3>Contact & Appointments</h3>
          <a href="tel:+918126995944">+91 81269 95944</a>
          <a href="mailto:ayurvedatridosha@gmail.com">
            ayurvedatridosha@gmail.com
          </a>
          <a
            href="https://wa.me/918126995944"
            target="_blank"
            rel="noreferrer"
          >
            Chat with us on WhatsApp ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Tridosha Ayurvedic Wellness
        </span>
        <a href="#services">Explore treatments ↑</a>
      </div>
    </footer>
  );
}

export default Footer;
