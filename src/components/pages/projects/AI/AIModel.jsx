import { ArrowLeft, ArrowRight, ExternalLink, ArrowUp } from 'lucide-react';

import './AIModel.css';

import { useEffect, useState } from 'react';

import aiPreviewVideo from '../../../../assets/projects/ai/videos/preview_ai_1.mp4';
import aiImage1 from '../../../../assets/projects/ai/2.png';
import aiImage2 from '../../../../assets/projects/ai/3.png';

import aiImage3 from '../../../../assets/projects/ai/7.png';
import aiPreviewVideo2 from '../../../../assets/projects/ai/videos/preview_ai_3.mp4';

import aiPreviewVideo3 from '../../../../assets/projects/ai/videos/preview_ai_2.mp4';
import aiImage4 from '../../../../assets/projects/ai/4.png';

function AIModel() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <main className="ai-project">

            {/* Back to portfolio */}

            <a
                className="ai-project-back"
                href="/"
            >
                <ArrowLeft
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                />

                <span>Back to Portfolio</span>
            </a>


            {/* Hero */}

            <section className="ai-project-hero">

                <div className="ai-project-hero-content">

                    <div className="ai-project-hero-meta">
                        <span>Generative AI</span>
                        <span>AI Model</span>
                    </div>

                    <h1>AI Model</h1>

                    <p className="ai-project-hero-description">
                        A Generative AI application exploring LLM integration,
                        prompt engineering, Retrieval-Augmented Generation and
                        the architecture of intelligent, context-aware
                        software systems.
                    </p>

                    <div className="ai-project-actions">

                        <a
                            className="ai-project-button ai-project-button-primary"
                            target='_blank'
                            href="https://ai-entity-5gof-npotlei52-keenosmith-dels-projects.vercel.app/"
                        >
                            Go to Site
                        </a>

                        <a
                            className="ai-project-button ai-project-button-secondary"
                            target='_blank'
                            href="https://github.com/keenosmith-del/ai-entity"
                        >
                            GitHub Repo
                        </a>

                    </div>

                </div>

            </section>


            {/* Image showcase */}

            <section className="ai-project-gallery">

                <div className="ai-project-gallery-item ai-project-gallery-large">
                    <video
                        src={aiPreviewVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label="AI Assistant application preview"
                    />
                </div>

                <div className="ai-project-gallery-row">

                    <div className="ai-project-gallery-item">
                        <img
                            src={aiImage1}
                            alt="AI Assistant application interface"
                        />
                    </div>

                    <div className="ai-project-gallery-item">
                        <img
                            src={aiImage2}
                            alt="AI Assistant application interface"
                        />
                    </div>

                </div>

            </section>


            {/* Overview */}

            <section className="ai-project-section ai-project-overview">

                <div className="ai-project-section-label">
                    <span>(01)</span>
                    <span>Project overview</span>
                </div>

                <div className="ai-project-section-content">

                    <h2>
                        Building an AI application around
                        context, interaction and intelligence.
                    </h2>

                    <p>
                        This project explores how modern generative AI
                        capabilities can be integrated into a practical
                        software application rather than treated as an
                        isolated model or API experiment.
                    </p>

                    <p>
                        The application brings together language models,
                        prompt engineering, contextual information and
                        application logic to create a more useful and
                        responsive interaction between the user and the
                        underlying AI system.
                    </p>

                </div>

            </section>


            {/* Feature section one */}

            <section className="ai-project-feature">

                <div className="ai-project-feature-content">

                    <div className="ai-project-feature-label">
                        <span>(02)</span>
                        <span>AI architecture</span>
                    </div>

                    <h2>
                        From user input to
                        intelligent output.
                    </h2>

                    <p>
                        The application connects the user interface,
                        backend services and AI capabilities into a
                        structured workflow designed around meaningful
                        context and reliable interaction.
                    </p>

                    <div className="ai-project-tech-list">
                        <span>LLM integration</span>
                        <span>Prompt engineering</span>
                        <span>RAG</span>
                        <span>Context management</span>
                    </div>

                </div>

                <div className="ai-project-feature-media">
                    <img
                        src={aiImage3}
                        alt="AI Assistant application interface"
                    />
                </div>

            </section>


            {/* Feature section two */}

            <section className="ai-project-feature ai-project-feature-reverse">

                <div className="ai-project-feature-content">

                    <div className="ai-project-feature-label">
                        <span>(03)</span>
                        <span>Application development</span>
                    </div>

                    <h2>
                        Generative AI inside
                        a full-stack application.
                    </h2>

                    <p>
                        The project demonstrates the engineering required
                        to move beyond a simple AI interface and integrate
                        generative capabilities into a complete application
                        architecture.
                    </p>

                    <div className="ai-project-tech-list">
                        <span>React</span>
                        <span>Node.js</span>
                        <span>APIs</span>
                        <span>Application architecture</span>
                    </div>

                </div>

                {/* needs to be wider */}
                <div className="ai-project-feature-media">
                    <video
                        src={aiPreviewVideo2}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label="AI Assistant application demonstration"
                    />
                </div>

            </section>


            {/* Skills */}

            <section className="ai-project-skills">

                <div className="ai-project-section-label">
                    <span>(04)</span>
                    <span>Skills &amp; technology</span>
                </div>

                <div className="ai-project-skills-content">

                    <h2>
                        Technologies and capabilities
                        demonstrated throughout the project.
                    </h2>

                    <div className="ai-project-skills-grid">

                        <div>
                            <span>01</span>
                            <h3>Generative AI</h3>
                            <p>
                                LLM integration, prompt engineering and
                                context-aware AI interactions.
                            </p>
                        </div>

                        <div>
                            <span>02</span>
                            <h3>AI Architecture</h3>
                            <p>
                                Retrieval-Augmented Generation and
                                structured AI application workflows.
                            </p>
                        </div>

                        <div>
                            <span>03</span>
                            <h3>Full-Stack Engineering</h3>
                            <p>
                                Frontend, backend and API integration
                                across the application.
                            </p>
                        </div>

                        <div>
                            <span>04</span>
                            <h3>Product Thinking</h3>
                            <p>
                                Designing AI functionality around practical
                                user interaction and application experience.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Additional visual showcase */}

            <section className="ai-project-visual-showcase">

                <div className="ai-project-visual-strip">

                    <video
                        src={aiPreviewVideo3}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label="AI Assistant application demonstration"
                    />

                </div>

                <div className="ai-project-visual-strip">

                    <img
                        src={aiImage4}
                        alt="AI Assistant application interface"
                    />

                </div>

            </section>


            {/* Closing */}

            <section className="ai-project-closing">

                <div className="ai-project-closing-inner">

                    <p>
                        A practical exploration of how generative AI,
                        software engineering and product thinking can
                        converge into a single application.
                    </p>

                    <div className="ai-project-closing-actions">

                        <a
                            className="ai-project-closing-button"
                            href="/"
                        >
                            Back to Portfolio
                        </a>

                        <button
                            className="ai-project-closing-top"
                            type="button"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                        >
                            <ArrowUp
                                size={16}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </button>

                    </div>

                </div>

            </section>

            {showBackToTop && (
                <button
                    className="ai-project-top"
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >
                    <ArrowUp
                        size={16}
                        strokeWidth={1.7}
                        aria-hidden="true"
                    />
                </button>
            )}

        </main>
    );
}

export default AIModel;