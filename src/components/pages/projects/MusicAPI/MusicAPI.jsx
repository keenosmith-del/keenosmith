import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./MusicAPI.css";

const sourceRepository = "https://github.com/keenosmith-del/music-api";
const technicalBrief = "/documents/music-api-technical-brief.pdf";

const heroTechnologies = ["React", "Node.js", "Express", "Deezer", "MongoDB"];

const sourceViews = [
  {
    id: "music",
    label: "Music",
    title: "Deezer provides the track and album catalogue.",
    description:
      "The Express service requests tracks, artists, albums and related music through Deezer. Responses are mapped into a consistent shape before React uses them for browsing, queues and playback.",
    detail:
      "The audio URL is a provider-supplied preview. This is not a licensed full-track streaming service.",
    tags: ["Tracks", "Artists", "Albums", "Preview audio"],
  },
  {
    id: "podcasts",
    label: "Podcasts",
    title: "iTunes search leads to the publisher's RSS feed.",
    description:
      "The application searches podcast metadata through iTunes, then reads the selected show's RSS feed to retrieve episode titles, artwork and enclosure audio URLs.",
    detail:
      "Episode playback depends on external feed availability and the permissions and behaviour of the publisher's media URL.",
    tags: ["iTunes Search", "RSS", "Episodes", "Enclosures"],
  },
  {
    id: "radio",
    label: "Radio",
    title: "Radio discovery is separate from the music catalogue.",
    description:
      "A Radio Browser provider adapter retrieves station metadata and stream URLs. The current Radio page also presents artist-led selections assembled from music catalogue searches.",
    detail:
      "Streams and station availability remain dependent on third-party hosts.",
    tags: ["Radio Browser", "Station metadata", "External streams"],
  },
];

const technologyGroups = [
  {
    heading: "Frontend",
    skills: [
      "React",
      "JavaScript",
      "Vite",
      "React Router",
      "React Context",
      "Framer Motion",
      "Lucide React",
    ],
  },
  {
    heading: "API and services",
    skills: [
      "Node.js",
      "Express",
      "REST APIs",
      "Axios",
      "Provider adapters",
      "In-memory TTL cache",
    ],
  },
  {
    heading: "Media integrations",
    skills: ["Deezer API", "iTunes Search API", "Podcast RSS", "Radio Browser"],
  },
  {
    heading: "Application data",
    skills: [
      "MongoDB",
      "Mongoose",
      "User library",
      "Favourite tracks",
      "Playlists",
    ],
  },
  {
    heading: "Additional code",
    note: "Present in the repository, but not called by the primary music service.",
    skills: ["Spotify client-credentials adapter"],
  },
];

function TechnologyModal({ onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const focusedBefore = document.activeElement;
    const overflowBefore = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowBefore;
      focusedBefore?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="music-api-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="music-api-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Music API technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="music-api-modal-close"
          aria-label="Close technology stack"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="music-api-modal-groups">
          {technologyGroups.map((group) => (
            <div className="music-api-modal-group" key={group.heading}>
              <h3>{group.heading}</h3>
              {group.note && <p>{group.note}</p>}
              <div className="music-api-modal-tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MusicAPI() {
  const [view, setView] = useState("music");
  const [modalOpen, setModalOpen] = useState(false);
  const [showFloatingTop, setShowFloatingTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const selected =
    sourceViews.find((item) => item.id === view) || sourceViews[0];

  useEffect(() => {
    const onScroll = () => setShowFloatingTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!footerRef.current || typeof IntersectionObserver === "undefined")
      return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="music-api-page">
      <Link className="music-api-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="music-api-hero">
          <div className="music-api-hero-inner">
            <div className="music-api-hero-topline">
              <div
                className="music-api-hero-pills"
                aria-label="Main technologies"
              >
                {heroTechnologies.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
              <span className="music-api-hero-type">
                Full-stack engineering
              </span>
            </div>
            <h1>Music API</h1>
            <div className="music-api-hero-bottom">
              <div>
                <p className="music-api-hero-description">
                  I built a music browsing and playback application with a React
                  interface and an Express API. It brings together music,
                  podcast and radio sources, while keeping audio state and queue
                  behaviour consistent across the interface.
                </p>
                <p className="music-api-hero-note">
                  Local full-stack project. External media and catalogue APIs
                  require connectivity.
                </p>
              </div>
              <div className="music-api-hero-side">
                <div className="music-api-actions">
                  <a
                    className="music-api-button music-api-source-button"
                    href={sourceRepository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={githubSvg} alt="" aria-hidden="true" />
                    Source
                  </a>
                  <button className="music-api-button" disabled type="button">
                    Visit platform
                  </button>
                </div>
                <p className="music-api-walkthrough-note">
                  Keeping every portfolio app deployed would be a project in
                  itself. The source is available, or{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a
                  walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section
          className="music-api-section"
          aria-labelledby="music-summary-heading"
        >
          <div className="music-api-section-label">Project summary</div>
          <div className="music-api-section-content">
            <h2 id="music-summary-heading">
              One interface, several kinds of audio.
            </h2>
            <div className="music-api-columns">
              <p>
                The React application includes Home, Search, New, Radio,
                Podcasts, artist and album pages, and user library views. A
                shared application layout keeps the player accessible while
                navigating between pages.
              </p>
              <p>
                The backend keeps external integrations behind its own routes.
                Music metadata is normalised before reaching the frontend, while
                MongoDB stores library and favourite-track references. Provider
                audio URLs are used rather than hosting the media files.
              </p>
            </div>
            <div className="music-api-brief-action">
              <a
                className="music-api-button music-api-brief-button"
                href={technicalBrief}
                target="_blank"
                rel="noopener noreferrer"
              >
                Technical brief
              </a>
            </div>
          </div>
        </section>

        <section
          className="music-api-section"
          aria-labelledby="music-providers-heading"
        >
          <div className="music-api-section-label">External APIs</div>
          <div className="music-api-section-content">
            <h2 id="music-providers-heading">
              Different sources, different responsibilities.
            </h2>
            <p className="music-api-intro">
              I kept each provider behind a separate service so the application
              can work with the information that source actually supplies.
            </p>
            <div
              className="music-api-switcher"
              role="group"
              aria-label="Explore media sources"
            >
              {sourceViews.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setView(item.id)}
                  className={
                    view === item.id
                      ? "music-api-source-tab is-active"
                      : "music-api-source-tab"
                  }
                  aria-pressed={view === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="music-api-source-detail" aria-live="polite">
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <p className="music-api-source-note">{selected.detail}</p>
              <div className="music-api-inline-tags">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="music-api-section"
          aria-labelledby="music-architecture-heading"
        >
          <div className="music-api-section-label">Architecture</div>
          <div className="music-api-section-content">
            <h2 id="music-architecture-heading">
              The API sits between the interface and each provider.
            </h2>
            <p className="music-api-intro">
              The frontend requests application-specific responses rather than
              reproducing every upstream provider format. Short-lived server
              caching reduces repeated catalogue work for selected endpoints.
            </p>
            <div className="music-api-flow">
              <div>
                <span>React interface</span>
                <strong>Pages and shared player</strong>
                <p>
                  Navigation, playback queue, controls and visible loading
                  states.
                </p>
              </div>
              <div>
                <span>Express API</span>
                <strong>Routes and services</strong>
                <p>
                  Response mapping, provider calls and a ten-minute in-memory
                  TTL cache.
                </p>
              </div>
              <div>
                <span>Data sources</span>
                <strong>Providers and MongoDB</strong>
                <p>
                  External metadata and audio URLs; persisted local library
                  records.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="music-api-section"
          aria-labelledby="music-player-heading"
        >
          <div className="music-api-section-label">Playback engineering</div>
          <div className="music-api-section-content">
            <h2 id="music-player-heading">
              The player keeps its state while pages change.
            </h2>
            <div className="music-api-decisions">
              <div>
                <h3>Shared playback state</h3>
                <p>
                  AppLayout holds the current track, audio element reference,
                  playback time, volume and play state. The floating and
                  expanded player use the same values.
                </p>
              </div>
              <div>
                <h3>Queue behaviour</h3>
                <p>
                  Queue state supports next and previous navigation, reordering,
                  shuffle, repeat and autoplay extension. Provider metadata is
                  kept with queued items.
                </p>
              </div>
              <div>
                <h3>Library data</h3>
                <p>
                  Express and Mongoose store track references, favourites and
                  the user library. The present API uses a shared user record,
                  not authenticated per-user accounts.
                </p>
              </div>
              <div>
                <h3>External availability</h3>
                <p>
                  Deezer's preview URLs are not complete track licensing.
                  Podcasts use RSS media enclosures; music previews and live
                  streams may stop working when providers change.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="music-api-section"
          aria-labelledby="music-scope-heading"
        >
          <div className="music-api-section-label">Verification and limits</div>
          <div className="music-api-section-content">
            <h2 id="music-scope-heading">
              Source inspected; deployment and runtime checks remain separate.
            </h2>
            <div className="music-api-columns">
              <p>
                The repository contains the React screens, Express routes,
                provider adapters, Mongoose models and local player logic. I did
                not find a committed automated test suite or CI workflow
                establishing passing end-to-end behaviour.
              </p>
              <p>
                The Spotify client-credentials adapter is present but is not
                called by the primary music service. The current user routes
                have no authentication middleware; account separation,
                credentials handling and provider dependency checks need work
                before a public deployment.
              </p>
            </div>
          </div>
        </section>

        <section
          className="music-api-section music-api-technology"
          aria-labelledby="music-stack-heading"
        >
          <div className="music-api-section-label">Technology</div>
          <div className="music-api-section-content">
            <h2 id="music-stack-heading">
              A React frontend and a Node.js API.
            </h2>
            <div className="music-api-decisions music-api-technology-grid">
              <div>
                <h3>Frontend</h3>
                <p>
                  React, Vite, Router and Context manage the navigation, page
                  state and media controls.
                </p>
                <div className="music-api-inline-tags">
                  <span>React</span>
                  <span>Vite</span>
                  <span>Context</span>
                  <span>Framer Motion</span>
                </div>
              </div>
              <div>
                <h3>Backend and persistence</h3>
                <p>
                  Express routes call source-specific adapters. MongoDB stores
                  application records through Mongoose.
                </p>
                <div className="music-api-inline-tags">
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>MongoDB</span>
                  <span>Mongoose</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="music-api-button music-api-stack-button"
              onClick={() => setModalOpen(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>

        <section
          className="music-api-closing"
          aria-labelledby="music-closing-heading"
        >
          <div>
            <p className="music-api-closing-label">
              Architecture and implementation
            </p>
            <h2 id="music-closing-heading">
              Music browsing, a shared player and a service-based API.
            </h2>
            <p>
              The application separates provider requests from the React
              interface and keeps playback state in one shared layout. Its
              current local implementation uses Deezer, iTunes/RSS and MongoDB,
              with clear limits around external audio, authentication and
              runtime verification.
            </p>
          </div>
        </section>
      </article>

      <footer className="music-api-footer" ref={footerRef}>
        <Link className="music-api-footer-back" to="/">
          Back to portfolio
        </Link>
        <button
          type="button"
          className="music-api-footer-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>
      {showFloatingTop && !footerVisible && (
        <button
          className="music-api-floating-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {modalOpen && <TechnologyModal onClose={closeModal} />}
    </main>
  );
}
