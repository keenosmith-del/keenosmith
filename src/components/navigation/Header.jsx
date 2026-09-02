import { useEffect, useState } from 'react';

import './Header.css';

import avatar from '../../assets/images/avatar/avatar.png';
import githubIcon from '../../assets/svgs/github.svg';
import linkedinIcon from '../../assets/svgs/linkedin.svg';
import homeIcon from '../../assets/svgs/home.svg';

function Header() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const isFormValid =
        formData.name.trim() !== '' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
        formData.subject.trim() !== '' &&
        formData.message.trim() !== '';

    const handleChatOpen = () => {
        setIsChatOpen(true);
    };

    const handleChatClose = () => {
        setIsChatOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isFormValid) {
            return;
        }

        // Submission logic will be added later.
    };

    useEffect(() => {
        if (!isChatOpen) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                handleChatClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isChatOpen]);

    return (
        <>
            <header className="site-header">
                <nav className="navigation-pill" aria-label="Main navigation">

                    <div className="navigation-left">
                        <a
                            className="navigation-avatar"
                            href="#top"
                            aria-label="Return to top"
                        >
                            <img
                                src={avatar}
                                alt="Keeno Smith"
                            />
                        </a>

                        <div className="navigation-links">
                            <a href="#top">Home</a>
                            <a href="#skills">Skills</a>
                            <a href="#about">About</a>
                            <a href="#projects">Projects</a>
                            <a href="#links">Links</a>
                        </div>
                    </div>

                    <a
                        className="navigation-home"
                        href="#top"
                        aria-label="Home"
                    >
                        <img
                            src={homeIcon}
                            alt=""
                        />
                    </a>

                    <div className="navigation-right">
                        <div className="navigation-socials">
                            <a
                                href="https://github.com/keenosmith-del"
                                aria-label="GitHub"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={githubIcon}
                                    alt=""
                                />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/keenotreysmith/"
                                aria-label="LinkedIn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={linkedinIcon}
                                    alt=""
                                />
                            </a>
                        </div>

                        <button
                            className="navigation-chat"
                            type="button"
                            onClick={handleChatOpen}
                        >
                            Let's chat
                        </button>
                    </div>

                </nav>
            </header>

            {isChatOpen && (
                <div
                    className="chat-modal-overlay"
                    onMouseDown={handleChatClose}
                >
                    <div
                        className="chat-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="chat-modal-title"
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <button
                            className="chat-modal-close"
                            type="button"
                            onClick={handleChatClose}
                            aria-label="Close contact form"
                        >
                            <span aria-hidden="true">×</span>
                        </button>

                        <div className="chat-modal-header">
                            <p className="chat-modal-eyebrow">
                                Get in touch
                            </p>

                            <h2 id="chat-modal-title">
                                Let's chat
                            </h2>

                            <p>
                                Have a project, idea, or opportunity in mind?
                            </p>
                        </div>

                        <form
                            className="chat-form"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="chat-form-row">
                                <div className="chat-form-field">
                                    <label htmlFor="chat-name">
                                        Name
                                    </label>

                                    <input
                                        id="chat-name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        autoComplete="name"
                                        required
                                    />
                                </div>

                                <div className="chat-form-field">
                                    <label htmlFor="chat-email">
                                        Email
                                    </label>

                                    <input
                                        id="chat-email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="chat-form-field">
                                <label htmlFor="chat-subject">
                                    Subject
                                </label>

                                <input
                                    id="chat-subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="chat-form-field">
                                <label htmlFor="chat-message">
                                    Message
                                </label>

                                <textarea
                                    id="chat-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="6"
                                    required
                                />
                            </div>

                            <div className="chat-form-actions">
                                <button
                                    className="chat-button chat-button-cancel"
                                    type="button"
                                    onClick={handleChatClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="chat-button chat-button-send"
                                    type="submit"
                                    disabled={!isFormValid}
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;