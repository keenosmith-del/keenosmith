import './Skills.css';

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
                                <span>Video</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;