import './Skills.css';

import claudeIcon from '../../../assets/svgs/skills/claude.svg';
import dockerIcon from '../../../assets/svgs/skills/docker.svg';
import expressIcon from '../../../assets/svgs/skills/express.svg';
import huggingfaceIcon from '../../../assets/svgs/skills/huggingface.svg';
import jsonwebtokensIcon from '../../../assets/svgs/skills/jsonwebtokens.svg';
import kubernetesIcon from '../../../assets/svgs/skills/kubernetes.svg';
import mongodbIcon from '../../../assets/svgs/skills/mongodb.svg';
import nodedotjsIcon from '../../../assets/svgs/skills/nodedotjs.svg';
import postgresqlIcon from '../../../assets/svgs/skills/postgresql.svg';
import pythonIcon from '../../../assets/svgs/skills/python.svg';
import pytorchIcon from '../../../assets/svgs/skills/pytorch.svg';
import reactIcon from '../../../assets/svgs/skills/react.svg';

const skills = [
    {
        name: 'React',
        icon: reactIcon,
        order: 1,
    },
    {
        name: 'Node.js',
        icon: nodedotjsIcon,
        order: 9,
    },
    {
        name: 'Express',
        icon: expressIcon,
        order: 5,
    },
    {
        name: 'MongoDB',
        icon: mongodbIcon,
        order: 7,
    },
    {
        name: 'PostgreSQL',
        icon: postgresqlIcon,
        order: 11,
    },
    {
        name: 'Python',
        icon: pythonIcon,
        order: 0,
    },
    {
        name: 'PyTorch',
        icon: pytorchIcon,
        order: 8,
    },
    {
        name: 'Hugging Face',
        icon: huggingfaceIcon,
        order: 4,
    },
    {
        name: 'Claude',
        icon: claudeIcon,
        order: 10,
    },
    {
        name: 'Docker',
        icon: dockerIcon,
        order: 6,
    },
    {
        name: 'Kubernetes',
        icon: kubernetesIcon,
        order: 2,
    },
    {
        name: 'JSON Web Tokens',
        icon: jsonwebtokensIcon,
        order: 3,
    },
];

function Skills() {
    return (
        <section className="skills" id="skills">
            <div className="skills-stage">
                <div className="skills-container">
                    <div className="skills-content">

                        <div className="skills-copy">
                            <div className="skills-description">
                                <p>
                                    My engineering foundation is rooted in
                                    JavaScript and modern full-stack development,
                                    with hands-on experience across React, Node.js,
                                    Express, APIs, databases, authentication,
                                    deployment and responsive web architecture. I
                                    also work with Python, SQL, MongoDB and
                                    PostgreSQL, and continue to expand into
                                    cloud-native and DevOps practices.
                                </p>

                                <p>
                                    More recently, my development has increasingly
                                    focused on AI-enabled software, including LLM
                                    integration, Retrieval-Augmented Generation
                                    (RAG), prompt engineering, external AI
                                    services and agentic workflows. I’m
                                    particularly interested in how these
                                    capabilities can be integrated into
                                    conventional software architecture to create
                                    useful, production-oriented applications rather
                                    than isolated AI demonstrations.
                                </p>
                            </div>
                        </div>

                        <div className="skills-video">
                            <div className="skills-video-placeholder">
                                <div className="skills-mosaic-grid">
                                    {skills.map((skill) => (
                                        <div
                                            className="skills-mosaic-tile"
                                            key={skill.name}
                                            style={{
                                                '--tile-order': skill.order,
                                            }}
                                        >
                                            <img
                                                className="skills-mosaic-icon"
                                                src={skill.icon}
                                                alt=""
                                            />

                                            <span className="skills-mosaic-name">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;