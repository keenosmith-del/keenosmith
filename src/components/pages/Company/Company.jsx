import { Link } from 'react-router-dom';
import LaunchCountdown from '../../shared/LaunchCountdown.jsx';
import { companyLaunchLabel } from '../../../data/companyLaunch.js';
import '../ProjectPreview/ProjectPreview.css';

const companies = {
    kailor: { name: 'Kailor', description: 'An AI company focused on assessing business needs and identifying where AI can help. I’m building the company and its website alongside my software engineering work.' },
    kai: { name: 'Kai', description: 'Kailor’s sister company: a hub for AI insights, research and articles. I’m creating a place to explore developments in AI and what they mean in practice.' },
};

export default function Company({ company }) {
    const { name, description } = companies[company];
    return <main className="project-preview">
        <span>Website in progress</span>
        <h1>{name}</h1>
        <p>{description}</p>
        <LaunchCountdown />
        <p style={{ marginTop: 20 }}>Planned launch: {companyLaunchLabel}. The website is being prepared.</p>
        <Link className="project-preview-button" to="/">Back to portfolio</Link>
    </main>;
}
