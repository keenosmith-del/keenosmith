import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { eventOps } from '../../../../data/eventOps.js';
import './EventOps.css';

const deadline = Date.parse(eventOps.pageLaunchAt);
const remainingSeconds = () => Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
export default function EventOps() {
 const [remaining, setRemaining] = useState(remainingSeconds);
 useEffect(() => {
  const timer = window.setInterval(() => setRemaining(remainingSeconds()), 1000);
  return () => window.clearInterval(timer);
 }, []);
 const hours = Math.floor(remaining / 3600), minutes = Math.floor(remaining % 3600 / 60), seconds = remaining % 60;
 return <main className="eventops-project">
  <Link className="eventops-back" to="/explore?tab=projects"><ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />Back to Explore</Link>
  <section className="eventops-hero">
   <div className="eventops-meta">{['Full-Stack', 'RAG', 'Agent Workflows'].map(label => <span key={label}>{label}</span>)}</div>
   <h1>{eventOps.title}</h1>
   <p className="eventops-description">{eventOps.description}</p>
   <div className="eventops-countdown">
    <p>{remaining ? 'The full project page goes live in' : 'The full project page update is pending'}</p>
    {remaining > 0 && <div role="timer" aria-label={`${hours} hours, ${minutes} minutes, ${seconds} seconds until the scheduled page update`}>
     {[['Hours', hours], ['Minutes', minutes], ['Seconds', seconds]].map(([label, value]) => <span className="eventops-time" key={label}><strong>{String(value).padStart(2, '0')}</strong><small>{label}</small></span>)}
    </div>}
    <small>Scheduled for <time dateTime={eventOps.pageLaunchAt}>11 October 2026, 13:48 SAST</time>.</small>
   </div>
   <div className="eventops-actions">
    <a className="eventops-button eventops-button-primary" href={eventOps.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
    <a className="eventops-button eventops-button-secondary" href={eventOps.summaryUrl} target="_blank" rel="noopener noreferrer">Technical Executive Summary</a>
   </div>
  </section>
 </main>;
}
