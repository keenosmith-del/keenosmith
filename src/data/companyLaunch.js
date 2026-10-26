// Fixed app-launch target: 10 South African calendar days after 27 October 2026.
// Midnight in Africa/Johannesburg; the public company website is already live.
export const companyLaunchDate = "2026-11-06";
export const companyLaunchLabel = new Intl.DateTimeFormat("en-ZA", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Johannesburg",
}).format(new Date(`${companyLaunchDate}T00:00:00+02:00`));
const launchTime = new Date(`${companyLaunchDate}T00:00:00+02:00`).getTime();
export const getLaunchRemaining = (now = Date.now()) =>
  Math.max(0, launchTime - now);
