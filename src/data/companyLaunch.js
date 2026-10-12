// Fifteen South African calendar days after 12 October 2026. This is a fixed
// date, never a rolling target. Midnight is the date boundary, not a launch hour.
export const companyLaunchDate = '2026-10-27';
export const companyLaunchLabel = new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Johannesburg',
}).format(new Date(`${companyLaunchDate}T00:00:00+02:00`));
const launchTime = new Date(`${companyLaunchDate}T00:00:00+02:00`).getTime();
export const getLaunchRemaining = (now = Date.now()) => Math.max(0, launchTime - now);
