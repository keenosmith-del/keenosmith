import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUp, Search, SlidersHorizontal } from 'lucide-react';
import { taxonomy } from '../../../assistant/taxonomy.js';
import { projectIndex, skillIndex, credentialIndex, createQueryMatcher, categoryName } from './utils/exploreIndex.js';
import { ProjectMosaic, TileGallery } from './components/ExploreCards.jsx';
import SkillDetailPanel from './components/SkillDetailPanel.jsx';
import mascot from '../../../assets/images/mascot/mascot.png';
import './Explore.css';

const tabs = ['projects', 'skills', 'credentials'];
const indexes = { projects: projectIndex, skills: skillIndex, credentials: credentialIndex };
const projectCategories = [['', 'All'], ['ai', 'AI'], ['backend', 'Full-Stack'], ['cloud', 'Cloud'], ['infrastructure', 'Infrastructure'], ['frontend', 'UX/UI']];
const credentialCategories = ['', ...['Certifications', 'Applied Skills', 'Badges', 'Education', 'Bootcamps', 'Courses', 'Training', 'In Progress'].filter(type => credentialIndex.some(c => type === 'Badges' ? c.badges?.length : type === 'In Progress' ? /in.progress|booked|pending/i.test(c.status) : c.type === type))];
export default function Explore() {
 const [params, setParams] = useSearchParams();
 const tab = tabs.includes(params.get('tab')) ? params.get('tab') : 'projects';
 const query = params.get('q') || '', category = params.get('category') || '', technology = params.get('technology') || '', status = params.get('status') || '', ecosystem = params.get('ecosystem') || '';
 const [advanced, setAdvanced] = useState(false), [showTop, setShowTop] = useState(false);
 const update = (values, replace = false) => setParams(previous => { const next = new URLSearchParams(previous); Object.entries(values).forEach(([key, value]) => value ? next.set(key, value) : next.delete(key)); return next; }, { replace, preventScrollReset: true });
 const switchTab = next => { setAdvanced(false); update({ tab: next, q: '', category: '', technology: '', status: '', ecosystem: '', skill: '' }); };
 const selected = tab === 'skills' ? skillIndex.find(s => s.id === params.get('skill')) : null;
 const matcher = useMemo(() => createQueryMatcher(query), [query]);
 const gridRef = useRef(null), positions = useRef(new Map());
 const results = useMemo(() => indexes[tab].filter(item => matcher(item) && (!category || (tab === 'credentials' ? category === 'Badges' ? item.badges?.length : category === 'In Progress' ? /in.progress|booked|pending/i.test(item.status) : item.type === category : item.categories.includes(category) && (tab !== 'projects' || category !== 'backend' || item.categories.includes('frontend')))) && (!technology || item.technologies?.includes(technology)) && (!status || item.buildStatus === status) && (!ecosystem || item.ecosystems?.includes(ecosystem))), [tab, matcher, category, technology, status, ecosystem]);
 const filters = tab === 'projects' ? projectCategories : tab === 'skills' ? [['', 'All'], ...taxonomy.filter(t => !['google', 'microsoft', 'aws'].includes(t.id)).map(t => [t.id, t.label])] : credentialCategories.map(c => [c, c || 'All']);
 const technologyOptions = useMemo(() => [...new Set(projectIndex.flatMap(p => p.technologies))].sort(), []);
 useEffect(() => { const scroll = () => setShowTop(window.scrollY > 300); window.addEventListener('scroll', scroll, { passive: true }); scroll(); return () => window.removeEventListener('scroll', scroll); }, []);
 useLayoutEffect(() => {
  const next = new Map();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gridRef.current?.querySelectorAll('[data-explore-id]').forEach(element => {
   const rect = element.getBoundingClientRect();
   const key = `${tab}:${element.dataset.exploreId}`;
   const before = positions.current.get(key);
   next.set(key, { left: rect.left, top: rect.top });
   if (before && !reduced && element.animate) {
    const x = before.left - rect.left, y = before.top - rect.top;
    if (x || y) element.animate([{ transform: `translate(${x}px, ${y}px)` }, { transform: 'translate(0, 0)' }], { duration: 240, easing: 'ease-out' });
   }
  });
  positions.current = next;
 }, [results, tab]);
 const clear = () => update({ q: '', category: '', technology: '', status: '', ecosystem: '' });
 return <main className="explore-page">
  <Link className="explore-back" to="/"><ArrowLeft size={12} aria-hidden="true" />Back to portfolio</Link>
  <section className="explore-hero explore-width"><div className="explore-pills explore-meta"><span>Portfolio intelligence</span><span>Manual discovery</span></div><h1>Explore</h1><p>Search my projects, technical skills and credentials in one place.</p><small>{projectIndex.length} projects · {skillIndex.length} skills · {credentialIndex.length} credentials & education records</small></section>
  <div className="explore-width explore-workspace">
   <div className="explore-tabs" role="tablist" aria-label="Explore portfolio">{tabs.map((name, i) => <button key={name} id={`tab-${name}`} role="tab" aria-selected={tab === name} aria-controls={`panel-${name}`} tabIndex={tab === name ? 0 : -1} onClick={() => switchTab(name)} onKeyDown={e => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; switchTab(tabs[next]); document.getElementById(`tab-${tabs[next]}`)?.focus(); } }}>{name}</button>)}</div>
   <section role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0}>
    <div className="explore-search-row"><label className="explore-search"><Search size={14} aria-hidden="true" /><span className="explore-sr">Search {tab}</span><input type="search" value={query} onChange={e => update({ q: e.target.value }, true)} placeholder={`Search ${tab}, technologies or domains…`} /></label>{tab === 'projects' && <button className="explore-filter-toggle" aria-expanded={advanced} aria-controls="explore-advanced" onClick={() => setAdvanced(v => !v)}><SlidersHorizontal size={14} aria-hidden="true" />Filters{(technology || status || ecosystem) && ' · Active'}</button>}</div>
    <div className="explore-pills explore-categories" aria-label={`Filter ${tab}`}>{filters.map(([id, label]) => <button key={id} aria-pressed={category === id} onClick={() => update({ category: id })}>{label}</button>)}</div>
    {advanced && tab === 'projects' && <div id="explore-advanced" className="explore-advanced"><label>Technology<select value={technology} onChange={e => update({ technology: e.target.value })}><option value="">All technologies</option>{technologyOptions.map(t => <option key={t}>{t}</option>)}</select></label><label>Cloud ecosystem<select value={ecosystem} onChange={e => update({ ecosystem: e.target.value })}><option value="">All ecosystems</option>{['google', 'microsoft', 'aws'].map(t => <option value={t} key={t}>{categoryName(t)}</option>)}</select></label></div>}
    <div className="explore-result-meta"><span role="status" aria-live="polite">{results.length} {tab === 'credentials' ? 'credential & education records' : tab}{query && ' matching your search'}</span>{(query || category || technology || status || ecosystem) && <button onClick={clear}>Clear search & filters</button>}</div>
    {results.length ? <div ref={gridRef} key={tab} className={`explore-grid explore-grid-${tab} ${tab === 'credentials' && category === 'Education' ? 'explore-education-gallery' : ''}`}>{tab === 'projects' ? <ProjectMosaic projects={results} /> : <TileGallery items={results} type={tab} onSelect={skill => update({ skill })} badgeMode={category === 'Badges'} />}</div> : <div className="explore-empty"><img src={mascot} alt="" /><h2>No matches found</h2><p>Try a different search or remove a filter.</p><button onClick={clear}>Reset filters</button></div>}
   </section>
  </div>

  {selected && <SkillDetailPanel skill={selected} onSelect={skill => update({ skill })} onClose={() => update({ skill: '' })} onCredentials={q => update({ tab: 'credentials', skill: '', category: '', q })} />}
  {showTop && <button className="explore-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ArrowUp size={15} /></button>}
 </main>;
}
