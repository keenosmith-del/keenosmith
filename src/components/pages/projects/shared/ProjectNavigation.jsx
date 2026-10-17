import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ProjectNavigation({ className }) {
  const { state } = useLocation();
  const origin = state?.projectOrigin;
  // A refreshed history entry must not pretend it was entered from Explore.
  const fromExplore = origin?.createdAt >= performance.timeOrigin &&
    /^\/explore(?:\/projects\/[^/]+)?$/.test(origin?.pathname || "");
  return (
    <Link className={className} data-project-back to={fromExplore ? `${origin.pathname}${origin.search || ""}${origin.hash || ""}` : "/"} state={fromExplore ? origin.state : undefined}>
      <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
      <span>{fromExplore ? "Back" : "Back to portfolio"}</span>
    </Link>
  );
}
