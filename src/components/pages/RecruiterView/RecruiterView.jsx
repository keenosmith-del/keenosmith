import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import mascot from '../../../assets/images/mascot/mascot.png';
import mascot2 from '../../../assets/images/mascot/mascot-2.png';
import { assessRole } from './utils/recruiterScoring.js';
import RecruiterAssessment from './components/RecruiterAssessment.jsx';
import RecruiterMetadata from './components/RecruiterMetadata.jsx';
import './RecruiterView.css';

const starters = {
 'Full-Stack Engineer': 'Build full-stack applications with React, Node.js, REST APIs and SQL databases. Integrate cloud services and maintain authentication workflows.',
 'AI Engineer': 'Develop Python applications using RAG, LLMs, agents and vector search. Integrate cloud AI services and evaluate AI workflows.',
 'Cloud Engineer': 'Build Google Cloud systems using GCP, Vertex AI, BigQuery, Cloud Run and Pub/Sub. Maintain infrastructure as code and observability.',
 'Software Engineer': 'Develop software using JavaScript, REST APIs, SQL and testing. Design backend services and maintain technical documentation.',
};
export default function RecruiterView() {
 const location = useLocation();
 const [input, setInput] = useState({ title: '', company: '', description: location.state?.description || '' });
 const [result, setResult] = useState(null), [busy, setBusy] = useState(false), [error, setError] = useState('');
 const [stage, setStage] = useState(0), [showTop, setShowTop] = useState(false);
 const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const stages = ['Reviewing role requirements', 'Matching skills and technical evidence', 'Comparing projects and credentials', 'Calculating evidence alignment'];
 const timer = useRef(null), generation = useRef(0), resultRef = useRef(null), lock = useRef(false);
 useEffect(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => setReduced(media.matches);
  const scroll = () => setShowTop(window.scrollY > 300);
  media.addEventListener('change', update); window.addEventListener('scroll', scroll, { passive: true }); scroll();
  return () => { media.removeEventListener('change', update); window.removeEventListener('scroll', scroll); };
 }, []);
 useEffect(() => () => { clearTimeout(timer.current); generation.current++; }, []);
 const clear = () => { generation.current++; clearTimeout(timer.current); lock.current = false; setInput({ title: '', company: '', description: '' }); setResult(null); setBusy(false); setError(''); };
 const submit = e => {
  e.preventDefault();
  if (lock.current) return;
  lock.current = true; setBusy(true); setError(''); setResult(null);
  const current = ++generation.current;
  setStage(0);
  timer.current = setTimeout(() => {
   let next;
   try { next = assessRole(input); }
   catch (err) { if (current === generation.current) { setError(err.message); lock.current = false; setBusy(false); } return; }
   const finish = () => {
    if (current !== generation.current) return;
    setResult(next); lock.current = false; setBusy(false);
    requestAnimationFrame(() => resultRef.current?.focus({ preventScroll: true }));
   };
   if (reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return; }
   // Short presentation sequence; scoring has already completed. Clear/unmount cancels each step.
   const progress = step => {
    if (current !== generation.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || step === stages.length) { finish(); return; }
    setStage(step); timer.current = setTimeout(() => progress(step + 1), 350);
   };
   timer.current = setTimeout(() => progress(1), 350);
  }, 0);
 };
 const change = e => setInput(v => ({ ...v, [e.target.name]: e.target.value }));
 return <main className="recruiter-page" id="top">
  <Link to="/" className="recruiter-back"><ArrowLeft size={12} aria-hidden="true" />Back to portfolio</Link>
  <section className="recruiter-hero"><div className="recruiter-width">
   <div className="recruiter-meta"><span>Portfolio intelligence</span><span>Evidence-led assessment</span></div>
   <h1>Recruiter View</h1>
   <p>Assess how my demonstrated skills, projects, credentials and technical experience align with a specific role.</p>
  </div></section>
  <div className="recruiter-workspace recruiter-width">
   <section className="recruiter-panel recruiter-input" aria-labelledby="role-input-title">
    <span className="recruiter-eyebrow">Role input</span><h2 id="role-input-title">Start with the role.</h2>
    <p>Paste the requirements to compare them with the same evidence used by Ask my Assistant. Assessment runs locally.</p>
    <form onSubmit={submit}>
     <label htmlFor="recruiter-title">Role title</label><input id="recruiter-title" name="title" value={input.title} maxLength={240} onChange={change} placeholder="Senior Full-Stack AI Engineer" />
     <label htmlFor="recruiter-company">Company <span>(optional)</span></label><input id="recruiter-company" name="company" value={input.company} maxLength={240} onChange={change} placeholder="Company name (optional)" />
     <label htmlFor="recruiter-description">Job description</label><textarea id="recruiter-description" name="description" value={input.description} onChange={change} maxLength={16000} rows={10} placeholder="Paste the full role description here..." aria-describedby="recruiter-input-note recruiter-error" aria-invalid={!!error} />
     <small id="recruiter-input-note">Up to 16,000 characters. Specific requirements give a more useful assessment.</small>
     <p id="recruiter-error" className="recruiter-error" role="alert">{error}</p>
     <div className="recruiter-actions"><button className="recruiter-button" disabled={busy} type="submit">{busy ? 'Assessing…' : 'Assess fit'}<ArrowRight size={15} aria-hidden="true" /></button><button className="recruiter-reset" onClick={clear} type="button">Clear</button></div>
    </form>
    <div className="recruiter-starters"><span>Try a role starter</span><div>{Object.entries(starters).map(([title, description]) => <button type="button" aria-pressed={input.title === title && input.description === description} disabled={busy} key={title} onClick={() => { setInput(v => ({ ...v, title, description })); setResult(null); setError(''); }}>{title}</button>)}</div></div>
   </section>
   <section className="recruiter-panel recruiter-output" ref={resultRef} tabIndex={-1} aria-labelledby="assessment-title" aria-busy={busy}>
    <header className="recruiter-identity"><img src={mascot2} alt="" /><div><span className="recruiter-eyebrow">Portfolio intelligence</span><h2 id="assessment-title">Role Fit Assessment</h2></div></header>
    <RecruiterMetadata />
    <div className="recruiter-sr" role="status" aria-live="polite">{busy ? 'Reviewing role requirements and matching portfolio evidence.' : result ? 'Assessment complete.' : ''}</div>
    {busy ? <div className="recruiter-empty recruiter-processing"><img src={mascot} alt="" /><div className="recruiter-activity" aria-hidden="true"><i /><i /><i /></div><h3>{stages[stage]}</h3><p>Comparing projects, credentials and documented evidence.</p></div> : result ? <RecruiterAssessment result={result} /> : <div className="recruiter-empty"><img src={mascot} alt="Keeno’s Assistant mascot" /><h3>A role. Its requirements.<br />The evidence behind them.</h3><p>Paste a role to compare its requirements against Keeno's documented project, skill and credential evidence.</p><small>Direct implementation · Related capabilities · Evidence gaps</small></div>}
   </section>
  </div>
  <aside className="recruiter-future recruiter-width"><div><h2>Looking for something specific?</h2><p>A unified search for projects, technical skills and credentials is planned.</p></div><button className="recruiter-button" type="button" disabled>Open Explore · Coming later</button></aside>
  <footer className="recruiter-footer recruiter-width"><RecruiterMetadata /></footer>
  {showTop && <button className="recruiter-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })}><ArrowUp size={15} aria-hidden="true" /></button>}
 </main>;
}
