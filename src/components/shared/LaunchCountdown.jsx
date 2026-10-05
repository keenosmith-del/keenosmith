import { useEffect, useState } from 'react';
import './LaunchCountdown.css';

// Shared launch target: ten days after 5 October, in Johannesburg time.
export const companyLaunchDate = '2026-10-15T00:00:00+02:00';
const launchTime = new Date(companyLaunchDate).getTime();

export default function LaunchCountdown() {
    const [remaining, setRemaining] = useState(() => Math.max(0, launchTime - Date.now()));
    useEffect(() => {
        const tick = () => setRemaining(Math.max(0, launchTime - Date.now()));
        tick();
        const interval = window.setInterval(tick, 1000);
        return () => window.clearInterval(interval);
    }, []);
    const seconds = Math.floor(remaining / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds / 3600) % 24;
    const minutes = Math.floor(seconds / 60) % 60;
    const secs = seconds % 60;
    return <div className="company-launch-countdown" role="timer" aria-label="Time until planned launch on 15 October 2026">
        
        {remaining > 0 && <strong>{days}d {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m {String(secs).padStart(2, '0')}s</strong>}
    </div>;
}
