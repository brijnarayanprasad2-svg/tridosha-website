import "./Hero.css";
import HeroScene from "../components3d/HeroScene";

function Hero() {

  return (

    <main className="hero" id="home">

      <div className="hero-content">

        <div className="eyebrow">
          AYURVEDIC WELLNESS • MASSAGE • BALANCE
        </div>

        <h1>
          Restore
          <span>Your Natural Balance</span>
        </h1>

        <p>
          Discover a peaceful Ayurvedic experience
          designed to relax your body, calm your mind,
          and reconnect you with natural wellness.
        </p>

        <div className="hero-actions">

          <a
            href="#services"
            className="primary-button"
          >
            Explore Services
            <span>↗</span>
          </a>

          <a
            href="#booking"
            className="secondary-button"
          >
            Book Appointment
          </a>

        </div>

        <div className="hero-info">

          <div>
            <strong>01</strong>
            <span>Traditional<br />Ayurveda</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Personalized<br />Therapies</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Peaceful<br />Experience</span>
          </div>

        </div>

      </div>


      <div className="hero-visual">

        <HeroScene />

        <div className="visual-label">
          <span></span>
          NATURAL WELLNESS
        </div>

      </div>


      <div className="scroll-indicator">

        <span>SCROLL TO EXPLORE</span>

        <div className="scroll-line"></div>

      </div>

    </main>

  );
}

export default Hero;