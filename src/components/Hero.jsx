
import { lazy, Suspense } from "react";
import "./Hero.css";

// Load the Three.js scene separately so the initial page bundle stays smaller.
const HeroScene = lazy(() => import("../components3d/HeroScene"));

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          <span>AUTHENTIC AYURVEDIC WELLNESS</span>
        </div>

        <h1 className="hero-title">
          Restore Your
          <br />
          <span>Natural Balance.</span>
        </h1>

        <p className="hero-description">
          Reconnect with yourself through traditional Ayurvedic
          therapies, calming massage rituals, and a more balanced
          approach to everyday wellness.
        </p>

        <div className="hero-actions">
          <a className="hero-button hero-button-primary" href="#booking">
            Book Your Session
            <span aria-hidden="true"> ↗</span>
          </a>

          <a className="hero-button hero-button-secondary" href="#services">
            Explore Treatments
            <span aria-hidden="true"> ↓</span>
          </a>
        </div>

        <div className="hero-highlights">
          <div className="hero-highlight">
            <span className="hero-highlight-icon" aria-hidden="true">
              ✧
            </span>
            <div>
              <strong>Traditional Care</strong>
              <span>Ayurvedic-inspired therapies</span>
            </div>
          </div>

          <div className="hero-highlight">
            <span className="hero-highlight-icon" aria-hidden="true">
              ◌
            </span>
            <div>
              <strong>Peaceful Experience</strong>
              <span>Time to relax and recharge</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-visual" aria-label="Ayurvedic wellness 3D visual">
        <div className="hero-visual-glow" />

        <div className="hero-scene">
          <Suspense fallback={<div className="hero-scene-fallback" aria-label="Loading 3D wellness visual" />}>
            <HeroScene />
          </Suspense>
        </div>

        <div className="hero-floating-card">
          <span className="hero-floating-icon" aria-hidden="true">
            ✿
          </span>
          <div>
            <strong>Find Your Balance</strong>
            <span>Mind · Body · Well-being</span>
          </div>
        </div>

        <div className="hero-visual-caption">
          <span className="hero-caption-dot" />
          A MOMENT FOR YOURSELF
        </div>
      </div>

      <a
        className="hero-scroll"
        href="#services"
        aria-label="Scroll to explore treatments"
      >
        <span className="hero-scroll-line" />
        <span>SCROLL TO EXPLORE</span>
      </a>
    </section>
  );
}

export default Hero;
