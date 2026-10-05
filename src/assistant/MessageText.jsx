import { Link } from 'react-router-dom';

// Presentation only: retain every word from the engine while making its
// paragraph labels and project explanations easier to scan.
export default function MessageText({ text, projects = [], education = false, onNavigate }) {
    return <div className="assistant-prose">{text.split(/\n\n+/).filter(Boolean).map((paragraph, index) => {
        const project = projects.find(item => paragraph.startsWith(`${item.title}:`));
        const section = /^(Recognised requirements|Demonstrated strengths|Limited or uncertain evidence):\s*/.exec(paragraph);
        if (section || project) {
            const heading = section ? section[1] : project.title;
            const body = paragraph.slice(section ? section[0].length : project.title.length + 1).trim();
            const strengths = section?.[1] === 'Demonstrated strengths' ? body.split(/(?<=\))\s+(?=[^()]+\()/) : null;
            return <div className="assistant-text-section" key={index}><h3>{heading}</h3>
                {strengths?.length > 1 ? <ul className="assistant-alignment-list">{strengths.map((item, n) => <li key={n}>{item.trim()}</li>)}</ul> : <p>{body}</p>}
            </div>;
        }
        if (education && paragraph.includes(' — ')) {
            const [title, ...body] = paragraph.split(' — ');
            return <div className="assistant-education-record" key={index}><h3>{title}</h3><p>{body.join(' — ')}</p><Link to="/cv" onClick={onNavigate}>View education record</Link></div>;
        }
        return <p key={index}>{paragraph}</p>;
    })}</div>;
}
