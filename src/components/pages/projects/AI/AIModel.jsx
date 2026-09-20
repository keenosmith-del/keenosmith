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

                    {/* add more chips */}
                    <div className="ai-project-hero-meta">
                        <span>Generative AI</span>
                        <span>RAG</span>
                        <span>LLM</span>
                        <span>SaaS</span>
                        <span>Semantic Embeddings</span>
                        <span>Vector Retrieval</span>
                        <span>Knowledge Engineering</span>
                        <span>ONNX</span>
                        <span>Groq</span>
                        <span>Full-Stack</span>
                    </div>

                    {/* change hero title */}
                    <h1>AI Model</h1>

                    {/* change description */}
                    <p className="ai-project-hero-description">
                        A full-stack SaaS platform engineered around LLM inference,
                        Retrieval-Augmented Generation, semantic embeddings, vector similarity
                        retrieval and knowledge engineering, combining context orchestration, document
                        processing and streamed AI generation
                        within a modular React, Node.js, Express and MongoDB architecture.
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

            <div className="ai-project-supporting-document">
                <a
                    className="ai-project-button ai-project-button-primary"
                    href="/documents/supporting-doc-project-3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Technical Executive Summary
                </a>
            </div>

            {/* Overview */}

            <section className="ai-project-section ai-project-overview">

                <div className="ai-project-section-label">
                    <span></span>
                    <span>Project overview</span>
                </div>

                <div className="ai-project-section-content">

                    <h2>
                        Implementation of context management, knowledge processing and AI
                        inference workflows.
                    </h2>

                    <p>
                        The platform was developed as a full-stack software system in which application
                        state, persistent data, document processing and model
                        inference are coordinated through defined frontend and backend service boundaries.
                    </p>

                    <p>
                        The engineering scope includes conversation and memory persistence,
                        configurable context assembly, knowledge ingestion, document chunking,
                        embedding generation, similarity-based retrieval and streamed model responses,
                        with React, Node.js, Express and MongoDB forming the application foundation.
                    </p>

                </div>

            </section>


            {/* Feature section one */}

            <section className="ai-project-feature">

                <div className="ai-project-feature-content">

                    <div className="ai-project-feature-label">
                        <span></span>
                        <span>AI engineering</span>
                    </div>

                    <h2>
                        Semantic embeddings, vector similarity and Top-K retrieval.
                    </h2>

                    <p>
                        The knowledge pipeline applies document chunking, local ONNX-based
                        embedding generation and cosine similarity calculations to transform source
                        material into searchable vector representations. Query embeddings are compared
                        against stored knowledge chunks
                        and ranked to produce Top-K retrieval results for downstream context construction
                    </p>

                    <div className="ai-project-tech-list">
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
                        <span></span>
                        <span>LLM inference</span>
                    </div>

                    <h2>
                        Model inference with configurable generation parameters.
                    </h2>

                    <p>
                        Server-side LLM integration is implemented through the Groq SDK,
                        with model inference isolated behind the Express API. Generation parameters
                        include model selection, temperature and response-token limits, while streamed
                        inference is converted into Server-Sent Events for incremental client-side processing. Provider credentials are isolated
                        through environment configuration using <code>process.env.GROQ_API_KEY</code>.
                    </p>

                    <div className="ai-project-tech-list">

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
                    <span></span>
                    <span>Skills &amp; technology</span>
                </div>

                <div className="ai-project-skills-content">

                    <h2>
                        Engineering disciplines applied across
                        the AI application lifecycle.
                    </h2>

                    <div className="ai-project-skills-grid">

                        <div>
                            <span>01</span>
                            <h3>Knowledge Engineering</h3>
                            <p>
                                Multi-format document ingestion using Multer, PDF Parse
                                and <strong>Mammoth</strong>, with content extraction, validation,
                                normalisation and persistent knowledge processing.
                            </p>
                        </div>

                        <div>
                            <span>02</span>
                            <h3>Prompt &amp; Context Engineering</h3>
                            <p>
                                Structured prompt construction with configurable
                                conversation history, memory, knowledge and personality
                                parameters controlling the information supplied to inference.
                            </p>
                        </div>

                        <div>
                            <span>03</span>
                            <h3>SaaS Application Architecture</h3>
                            <p>
                                Modular application design spanning resource APIs,
                                persistent application state, configurable workflows
                                and independent frontend and backend service boundaries.
                            </p>
                        </div>

                        <div>
                            <span>04</span>
                            <h3>Model Orchestration</h3>
                            <p>
                                Model configuration architecture supporting provider and
                                model selection alongside generation parameters including
                                temperature and maximum response-token limits.
                            </p>
                        </div>

                        <div>
                            <span>05</span>
                            <h3>Security &amp; API Boundaries</h3>
                            <p>
                                Server-side credential management, environment-based
                                configuration, <strong>CORS policy</strong>, request validation and
                                controlled file-upload handling across the API layer.
                            </p>
                        </div>

                        <div>
                            <span>06</span>
                            <h3>Quality &amp; Maintenance</h3>
                            <p>
                                Input validation, runtime error handling, streaming
                                cancellation, build verification, linting and ongoing
                                dependency and application maintenance.
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
                        A modular software implementation integrating AI inference, semantic retrieval, context engineering and configurable application workflows.
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