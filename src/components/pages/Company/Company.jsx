import { Link } from 'react-router-dom';
import LaunchCountdown from '../../shared/LaunchCountdown.jsx';
import '../../sections/Skills/Skills.css';

const companies = {
    kailor: { name: 'kailor', description: 'An AI company focused on assessing business needs and identifying where AI can help. I’m building the company and its website alongside my software engineering work.' },
    kai: { name: 'kai', description: 'Kailor’s sister company: a hub for AI insights, research and articles. I’m creating a place to explore developments in AI and what they mean in practice.' },
};

export default function Company({ company }) {
    const { name, description } = companies[company];
    return <main className="skills-project-preview">
        <span>Website in progress</span>
        <h1>{name}</h1>
        <p>{description}</p>
        <LaunchCountdown />
        <p style={{ marginTop: 20 }}>Planned launch: 15 October 2026. The website is being prepared.</p>
        <Link className="skills-button" to="/">Back to portfolio</Link>
    </main>;
}
