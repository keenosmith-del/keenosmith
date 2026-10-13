import { useEffect, useState } from "react";
import "./LaunchCountdown.css";

import {
  companyLaunchDate,
  companyLaunchLabel,
  getLaunchRemaining,
} from "../../data/companyLaunch.js";

export default function LaunchCountdown({ variant = "compact" }) {
  const [remaining, setRemaining] = useState(() => getLaunchRemaining());
  useEffect(() => {
    const tick = () => setRemaining(getLaunchRemaining());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);
  const seconds = Math.floor(remaining / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds / 3600) % 24;
  const minutes = Math.floor(seconds / 60) % 60;
  const secs = seconds % 60;
  return (
    <div
      className={`company-launch-countdown${variant === "editorial" ? " is-editorial" : ""}`}
      role="timer"
      aria-live="off"
      aria-label={`Time until site launch on ${companyLaunchLabel}`}
      data-launch-date={companyLaunchDate}
    >
      <div className="company-launch-time">
        <strong>
          {days}
          <span>d</span>
        </strong>
        <span>
          {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m{" "}
          {String(secs).padStart(2, "0")}s
        </span>
      </div>
      {variant === "editorial" && (
        <span className="company-launch-label">Until site launch</span>
      )}
    </div>
  );
}
