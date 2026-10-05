import { useState } from 'react';
import { Link } from 'react-router-dom';
import { skillGroups } from '../../../data/skillGroups.js';
import '../../sections/Skills/Skills.css';

export default function Explore() {
    const [query, setQuery] = useState('');
    const groups = skillGroups.map(group => ({ ...group, skills: group.skills.filter(skill =>
        `${group.title} ${skill}`.toLowerCase().includes(query.trim().toLowerCase())) })).filter(group => group.skills.length);
    return <main className="skills-explore">
        <Link className="skills-button" to="/">Back to portfolio</Link>
        <h1>Explore skills</h1>
        <label htmlFor="skill-search">Search by skill or category</label>
        <input id="skill-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="React, cloud, Python…" />
        <div className="skills-modal-grid">
            {groups.map(group => <section className="skills-modal-group" key={group.title}>
                <h3>{group.title}</h3><div className="skills-modal-list">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
            </section>)}
        </div>
        {!groups.length && <p role="status">No skills match your search.</p>}
    </main>;
}
