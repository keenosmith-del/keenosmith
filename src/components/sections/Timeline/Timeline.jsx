import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { timelineChapters } from "../../../data/timelineChapters.js";
import useScrollFade from "../../../hooks/useScrollFade.js";
import "./Timeline.css";

const stageQuery =
  "(min-width: 1001px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)";
const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => value * value * (3 - 2 * value);

export default function Timeline() {
  const sectionRef = useRef(null);
  const runwayRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const chapterRefs = useRef([]);
  const buttonRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [stageMode, setStageMode] = useState(false);
  useScrollFade(sectionRef);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const runway = runwayRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const media = window.matchMedia(stageQuery);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = null;
    let current = -1;
    let percent = -1;
    const update = () => {
      frame = null;
      if (!media.matches) return;
      const travel = Math.max(1, runway.offsetHeight - stage.offsetHeight);
      const progress = clamp(
        (88 - runway.getBoundingClientRect().top) / travel,
      );
      const position = progress * (timelineChapters.length - 1);
      const nearest = Math.round(position);
      const wholePercent = Math.round(progress * 100);
      stage.style.setProperty("--timeline-progress", progress);
      if (wholePercent !== percent) {
        stage
          .querySelector('[role="progressbar"]')
          .setAttribute("aria-valuenow", wholePercent);
        percent = wholePercent;
      }
      chapterRefs.current.forEach((chapter, index) => {
        const distance = position - index;
        const opacity = 1 - smooth(clamp((Math.abs(distance) - 0.25) / 0.5));
        chapter.style.setProperty("--chapter-opacity", opacity);
        chapter.style.setProperty("--chapter-x", `${-distance * 64}px`);
        chapter.style.setProperty(
          "--chapter-scale",
          1 - Math.min(Math.abs(distance), 1) * 0.025,
        );
        chapter.style.setProperty("--year-y", `${-distance * 100}%`);
        if (nearest !== current) {
          chapter.inert = index !== nearest;
          chapter.setAttribute("aria-hidden", String(index !== nearest));
        }
      });
      const lower = Math.floor(position);
      const first = buttonRefs.current[lower];
      const next =
        buttonRefs.current[Math.min(lower + 1, timelineChapters.length - 1)];
      const point =
        first.offsetLeft +
        (next.offsetLeft - first.offsetLeft) * (position - lower);
      const available = track.parentElement.clientWidth;
      const shift = Math.max(
        0,
        Math.min(track.scrollWidth - available, point - available * 0.2),
      );
      track.style.transform = `translateX(${-shift}px)`;
      if (nearest !== current) {
        current = nearest;
        setActive(nearest); // React updates only when the active chapter changes.
      }
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    const updateMode = () => {
      section.classList.toggle("has-scroll-stage", media.matches);
      setStageMode(media.matches);
      if (!media.matches) {
        chapterRefs.current.forEach((chapter) => {
          chapter.inert = false;
          chapter.removeAttribute("aria-hidden");
        });
        track.style.removeProperty("transform");
        current = -1;
      }
      schedule();
    };
    updateMode();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", updateMode);
    media.addEventListener("change", updateMode);
    reducedMotion.addEventListener("change", updateMode);
    const observer = new ResizeObserver(schedule);
    observer.observe(runway);
    observer.observe(stage);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", updateMode);
      media.removeEventListener("change", updateMode);
      reducedMotion.removeEventListener("change", updateMode);
    };
  }, []);

  const navigateChapter = (index) => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (stageMode) {
      const runway = runwayRef.current;
      const travel = runway.offsetHeight - stageRef.current.offsetHeight;
      window.scrollTo({
        top:
          window.scrollY +
          runway.getBoundingClientRect().top -
          88 +
          (index / (timelineChapters.length - 1)) * travel,
        behavior: reduced ? "instant" : "smooth",
      });
    } else
      chapterRefs.current[index].scrollIntoView({
        block: "start",
        behavior: reduced ? "instant" : "smooth",
      });
  };

  const navigateIndexKey = (event, index) => {
    if (!stageMode) return;
    const next =
      event.key === "ArrowRight"
        ? Math.min(index + 1, timelineChapters.length - 1)
        : event.key === "ArrowLeft"
          ? Math.max(index - 1, 0)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? timelineChapters.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    buttonRefs.current[next].focus({ preventScroll: true });
    navigateChapter(next);
  };

  return (
    <section
      className="timeline"
      id="timeline"
      ref={sectionRef}
      aria-labelledby="timeline-heading"
    >
      <div className="timeline-inner">
        <div className="timeline-intro">
          <h2 id="timeline-heading" data-scroll-fade>
            the work behind the work.
          </h2>
          <p data-scroll-fade>
            A progression through Computer Science, software engineering and
            intelligent systems, shaped by continuous learning, independent
            development and increasingly complex technical work.
          </p>
          <span className="timeline-range" data-scroll-fade>
            2015 to Present
          </span>
          <div className="timeline-discovery" data-scroll-fade>
            <Link
              className="hero-button hero-button-primary"
              to="/recruiter-view"
            >
              Assess My Fit
            </Link>
            <Link className="hero-button hero-button-secondary" to="/cv">
              View CV
            </Link>
          </div>
        </div>
        <div
          className="timeline-runway"
          ref={runwayRef}
          style={{ "--chapter-count": timelineChapters.length }}
        >
          <div className="timeline-stage" ref={stageRef}>
            <div
              className="timeline-progress"
              role="progressbar"
              aria-label="Career chapter progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
            >
              <span />
            </div>
            <nav className="timeline-index" aria-label="Career chapters">
              <div className="timeline-index-track" ref={trackRef}>
                {timelineChapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    ref={(element) => {
                      buttonRefs.current[index] = element;
                    }}
                    type="button"
                    tabIndex={stageMode && index !== active ? -1 : 0}
                    aria-current={
                      stageMode && index === active ? "step" : undefined
                    }
                    onClick={() => navigateChapter(index)}
                    onKeyDown={(event) => navigateIndexKey(event, index)}
                  >
                    <span>{chapter.indexTitle}</span>
                  </button>
                ))}
              </div>
            </nav>
            <div className="timeline-chapters">
              {timelineChapters.map((chapter, index) => (
                <article
                  key={chapter.id}
                  id={`timeline-${chapter.id}`}
                  className={`timeline-chapter${chapter.year === "Ongoing" ? " has-phase-date" : ""}`}
                  ref={(element) => {
                    chapterRefs.current[index] = element;
                  }}
                  aria-labelledby={`timeline-title-${chapter.id}`}
                  data-scroll-fade
                >
                  <div className="timeline-date-window">
                    <div className="timeline-date">
                      <span>{chapter.year}</span>
                      <small>{chapter.range}</small>
                    </div>
                  </div>
                  <div className="timeline-chapter-copy">
                    <h3 id={`timeline-title-${chapter.id}`}>{chapter.title}</h3>
                    <p className="timeline-description">
                      {chapter.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {stageMode && (
              <p className="timeline-sr-only" role="status">
                {timelineChapters[active].year} {timelineChapters[active].range}
                : {timelineChapters[active].title}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
