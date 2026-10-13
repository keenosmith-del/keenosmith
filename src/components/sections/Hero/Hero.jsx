import { useEffect, useRef, useState } from "react";
import "./Hero.css";

import avatar from "../../../assets/images/avatar/hero-full-body.png";
import laughingAvatar from "../../../assets/images/avatar/hero-full-body-laughing.png";
import githubIcon from "../../../assets/svgs/header/github.svg";

function Hero() {
  const [laughingReady, setLaughingReady] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = null;

    const updateFade = () => {
      frame = null;
      if (reducedMotion.matches) {
        hero.style.setProperty("--hero-scroll-opacity", "1");
        return;
      }

      const { top, bottom, height } = hero.getBoundingClientRect();
      const visibleHeight = Math.min(height, window.innerHeight);
      const entering = (window.innerHeight - top) / (visibleHeight * 0.25);
      const leaving = bottom / (visibleHeight * 0.65);
      hero.style.setProperty(
        "--hero-scroll-opacity",
        String(Math.max(0, Math.min(1, entering, leaving))),
      );
    };

    const scheduleFade = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateFade);
    };

    updateFade();
    window.addEventListener("scroll", scheduleFade, { passive: true });
    window.addEventListener("resize", scheduleFade);
    reducedMotion.addEventListener("change", scheduleFade);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleFade);
      window.removeEventListener("resize", scheduleFade);
      reducedMotion.removeEventListener("change", scheduleFade);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
      id="top"
      aria-labelledby="hero-name"
    >
      <div className="hero-content">
        <div className="hero-visual">
          <div className={`hero-avatar${laughingReady ? " is-ready" : ""}`}>
            <img
              className="hero-avatar-default"
              src={avatar}
              alt="keeno smith"
              width="941"
              height="1672"
              loading="eager"
              fetchPriority="high"
            />
            <img
              className="hero-avatar-laughing"
              src={laughingAvatar}
              alt=""
              aria-hidden="true"
              width="941"
              height="1672"
              loading="eager"
              onLoad={() => setLaughingReady(true)}
            />
          </div>
        </div>

        <div className="hero-copy">
          <h1 id="hero-name">
            keeno <span>smith</span>
          </h1>
          <div className="hero-copy-details">
            <p className="hero-description">
              I build full-stack applications, engineer AI-powered systems, and
              develop cloud solutions that bring software from concept to
              production.
            </p>
            <div className="hero-actions">
              <a className="hero-button hero-button-primary" href="#projects">
                View My Work
              </a>
              <a
                className="hero-button hero-button-secondary"
                href="https://github.com/keenosmith-del"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={githubIcon}
                  alt=""
                  aria-hidden="true"
                  width="18"
                  height="18"
                />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
