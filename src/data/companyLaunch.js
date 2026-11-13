// Shared kailor and kailor insider app-launch target: 4 May 2027.
// Midnight in Africa/Johannesburg; the public company website is already live.
export const companyLaunchDate = "2027-05-04";
export const companyLaunchLabel = new Intl.DateTimeFormat("en-ZA", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Johannesburg",
}).format(new Date(`${companyLaunchDate}T00:00:00+02:00`));
const launchTime = new Date(`${companyLaunchDate}T00:00:00+02:00`).getTime();
export const getLaunchRemaining = (now = Date.now()) =>
  Math.max(0, launchTime - now);
