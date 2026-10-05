import { memo, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

function Description({ text }) {
    // Keep the full description available, including scope caveats. A long
    // architecture description can expand in place without bloating every card.
    const sentences = text.match(/.*?[.!?](?:\s|$)|.+$/g) || [text];
    const first = sentences[0];
    if (text.length < 260 || sentences.length < 2) return <p>{text}</p>;
    return <><p>{first}</p><details className="assistant-card-details"><summary>Engineering details <ChevronDown size={12} aria-hidden="true" /></summary><p>{sentences.slice(1).join('')}</p></details></>;
}
export const Evidence = memo(function Evidence({ response, onNavigate }) {
    const [expanded, setExpanded] = useState(false);
    const id = useId();
    const list = response.projects || [], credentials = response.credentials || [];
    const entities = response.interpretation?.entities || [];
    const expandable = list.length > 3 || credentials.length > 3;
    return <div className="assistant-evidence">
        {response.indicators?.length > 0 && <section className="assistant-capabilities" aria-label="Documented capability evidence">
            <h3 className="assistant-section-label">Capability evidence</h3>
            {response.indicators.map(i => <div className="assistant-indicator" key={i.skill}>
                <div className="assistant-indicator-heading"><strong>{i.skill}</strong><span>{i.label}</span></div>
                <div className="assistant-bar" aria-hidden="true"><i style={{ width: `${i.band * 25}%` }} /></div>
                <small>{i.detail}</small>
            </div>)}
            <p className="assistant-evidence-note">Evidence shown, rather than a personal ability rating.</p>
        </section>}
        <div id={id}>
            {list.length > 0 && <section className="assistant-evidence-section" aria-label="Supporting projects">
                <h3 className="assistant-section-label">Supporting projects <span>{list.length}</span></h3>
                {(expanded ? list : list.slice(0, 3)).map(p => {
                    const technologies = [...p.technologies].sort((a, b) => Number(entities.includes(b)) - Number(entities.includes(a))).slice(0, 3);
                    return <article className="assistant-card" key={p.id}>
                        <span className="assistant-card-category">{p.domain || (p.technologies.some(t => ['RAG', 'Agentic AI'].includes(t)) ? 'AI application engineering' : p.technologies.includes('React') && p.technologies.includes('Node.js') ? 'Full-stack engineering' : 'Portfolio project')}</span>
                        <h4>{p.title}</h4><small className="assistant-card-status">{p.status}</small>
                        <Description text={p.description} />
                        {technologies.length > 0 && <div className="assistant-tags">{technologies.map(t => <span key={t}>{t}</span>)}</div>}
                        <div className="assistant-card-actions"><Link to={p.path} onClick={onNavigate}>{p.portfolioPublicationStatus === 'not-yet-published' ? 'View portfolio placeholder' : 'View project'} <ArrowRight size={13} aria-hidden="true" /></Link>
                            {p.repository && <a href={p.repository} target="_blank" rel="noreferrer">Repository<span className="assistant-sr"> (opens a new tab)</span></a>}</div>
                    </article>;
                })}
            </section>}
            {credentials.length > 0 && <section className="assistant-evidence-section" aria-label="Supporting credentials">
                <h3 className="assistant-section-label">Credentials <span>{credentials.length}</span></h3>
                {(expanded ? credentials : credentials.slice(0, 3)).map(c => <article className="assistant-card assistant-credential" key={c.id}>
                    <span className="assistant-card-category">{c.credentialTypes?.join(' · ') || c.category}</span><h4>{c.name}</h4>
                    <small className="assistant-card-issuer">{c.issuer} · {c.date}</small>
                    <small className="assistant-card-status">{c.status}</small><Description text={c.description} />
                    <div className="assistant-card-actions"><Link to={c.path} onClick={onNavigate}>View credential record <ArrowRight size={13} aria-hidden="true" /></Link>
                        {c.verification && <a href={c.verification} target="_blank" rel="noreferrer">View issuer profile<span className="assistant-sr"> (opens a new tab)</span></a>}</div>
                </article>)}
            </section>}
        </div>
        {expandable && <button className="assistant-expand" type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(v => !v)}>
            {expanded ? 'Show fewer results' : `Show all ${list.length + credentials.length} results`}{expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
        </button>}
    </div>;
});
export const Suggestions = memo(function Suggestions({ items, onSubmit, disabled }) {
    return <div className="assistant-suggestions" aria-label="Suggested questions">{items.map(s => <button type="button" key={s} disabled={disabled} onClick={() => onSubmit(s)}>{s}</button>)}</div>;
});
