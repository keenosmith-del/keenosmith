import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowUp,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import './Certifications.css';

import { certificationGroups } from '../../../data/credentials.js';

function CertificationTile({ certification }) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className={`certification-tile ${isHovered ? 'is-hovered' : ''
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className="certification-visual">

                {certification.image ? (
                    <img
                        src={certification.image}
                        alt=""
                        className="certification-image"
                    />
                ) : (
                    <div className="certification-visual-placeholder">
                        <span>Certificate preview</span>
                    </div>
                )}

            </div>

            <div className="certification-overlay" />

            <div className="certification-tile-content">

                <div className="certification-tile-top">

                    <div className="certification-issuer">

                        <span>
                            {certification.issuer}
                        </span>

                        {certification.issuerDetail && (
                            <small>
                                {certification.issuerDetail}
                            </small>
                        )}

                    </div>

                    {certification.icons?.length > 0 && (
                        <div className="certification-icons">

                            {certification.icons.map((icon, index) => (
                                <img
                                    key={`${certification.id}-icon-${index}`}
                                    src={icon}
                                    alt=""
                                />
                            ))}

                        </div>
                    )}

                </div>


                <div className="certification-tile-main">

                    <h3>
                        {certification.name}
                    </h3>

                    <span className="certification-date">
                        {certification.date}
                    </span>

                </div>

            </div>

        </article>
    );
}


// =========================================================
// CERTIFICATION DETAILS
// =========================================================

function CertificationDetails({ certification }) {

    return (
        <div className="certification-details">

            <div className="certification-detail-heading">

                <div>

                    <h3>
                        {certification.name}
                    </h3>

                    <span>
                        {certification.issuer}
                    </span>

                </div>


                {certification.badges?.length > 0 && (
                    <div className="certification-badges">

                        {certification.badges.map((badge, index) => (
                            <img
                                key={`${certification.id}-badge-${index}`}
                                src={badge}
                                alt=""
                            />
                        ))}

                    </div>
                )}

            </div>


            <div className="certification-detail-meta">

                <span>
                    {certification.date}
                </span>

            </div>


            <p>
                {certification.description}
            </p>

        </div>
    );
}


// =========================================================
// CERTIFICATION GROUP
// =========================================================

function CertificationGroup({ group }) {

    return (
        <section
            className="certification-group"
            id={`certifications-${group.id}`}
        >

            <div className="certification-group-heading">

                <h2>
                    {group.name}
                </h2>

                <p>
                    {group.description}
                </p>

            </div>


            <div className="certification-row">

                {group.certifications.map((certification) => (

                    <div
                        className="certification-item"
                        key={certification.id}
                    >

                        <CertificationTile
                            certification={certification}
                        />

                        <CertificationDetails
                            certification={certification}
                        />

                    </div>

                ))}

            </div>

        </section>
    );
}


// =========================================================
// PAGE
// =========================================================

function Certifications() {

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
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
        <main className="certifications-page">

            <Link
                className="certifications-back"
                to="/"
            >
                <ArrowLeft
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                />

                <span>Back to Portfolio</span>
            </Link>

            {/* =================================================
                HERO
            ================================================= */}

            <section className="certifications-hero">

                <div className="certifications-hero-inner">


                    <h1>
                        Engineering
                        <br />
                        credentials.
                    </h1>


                    <div className="certifications-hero-bottom">

                        <p>
                            A curated collection of professional certifications,
                            programmes and technical credentials spanning
                            software engineering, artificial intelligence,
                            cloud infrastructure and developer tooling.
                        </p>

                    </div>


                    <a
                        className="certifications-wallet-button"
                        href="https://www.credly.com/users/keeno-smith"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Skills Wallet
                    </a>

                </div>

            </section>


            {/* =================================================
                CERTIFICATION COLLECTION
            ================================================= */}

            <section className="certifications-collection">

                <div className="certification-groups">

                    {certificationGroups.map((group) => (

                        <CertificationGroup
                            key={group.id}
                            group={group}
                        />

                    ))}

                </div>

            </section>


            {/* =================================================
                CLOSING
            ================================================= */}

            <section className="certifications-closing">

                <div className="certifications-closing-inner">

                    <h2>
                        Credentials that
                        <br />
                        support the engineering.
                    </h2>

                    <p>
                        A continuously evolving collection of technical
                        certifications and professional learning across
                        software, AI, cloud and infrastructure.
                    </p>

                    <div className="certifications-closing-actions">

                        <Link
                            to="/"
                            className="certifications-closing-button"
                        >
                            Back to Portfolio
                        </Link>

                        <button
                            type="button"
                            className="certifications-closing-top"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                        >
                            <ArrowUp
                                size={16}
                                strokeWidth={1.7}
                            />
                        </button>

                    </div>

                </div>

            </section>

            {showBackToTop && (
                <button
                    className="certifications-top"
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >
                    <ArrowUp
                        size={17}
                        strokeWidth={1.7}
                    />
                </button>
            )}

        </main>
    );
}

export default Certifications;