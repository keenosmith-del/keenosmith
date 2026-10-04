import { useEffect, useRef, useState } from 'react';
import { ArrowUp, MessageCircle, X } from 'lucide-react';
import './PortfolioActions.css';

export default function PortfolioActions() {
    const [showTop, setShowTop] = useState(false);
    const [isHelperOpen, setIsHelperOpen] = useState(false);
    const triggerRef = useRef(null);
    const closeRef = useRef(null);
    const panelRef = useRef(null);
    const actionsRef = useRef(null);

    useEffect(() => {
        const update = () => setShowTop(window.scrollY > 300);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    useEffect(() => {
        if (!isHelperOpen) return;
        const trigger = triggerRef.current;
        closeRef.current?.focus();
        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsHelperOpen(false);
                trigger?.focus();
            }
        };
        const onOutside = (event) => {
            if (!panelRef.current?.contains(event.target) && !actionsRef.current?.contains(event.target)) {
                setIsHelperOpen(false);
            }
        };
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('pointerdown', onOutside);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('pointerdown', onOutside);
        };
    }, [isHelperOpen]);

    return (
        <div className="portfolio-actions-anchor">
            {isHelperOpen && (
                <section ref={panelRef} className="portfolio-chat-panel" role="dialog"
                    aria-labelledby="portfolio-chat-title" id="portfolio-chat-panel">
                    <div className="portfolio-chat-header">
                        <h2 id="portfolio-chat-title"><MessageCircle size={15} aria-hidden="true" />Ask about Keeno</h2>
                        <button ref={closeRef} type="button" aria-label="Close chat"
                            onClick={() => { setIsHelperOpen(false); triggerRef.current?.focus(); }}>
                            <X size={14} aria-hidden="true" />
                        </button>
                    </div>
                    <div className="portfolio-chat-body">
                        <p>Questions about my skills, projects or experience?</p>
                        <p className="portfolio-chat-message">The chat helper is being built. Soon you’ll be able to ask questions here.</p>
                        <span>For example</span>
                        <p className="portfolio-chat-example">Does Keeno know React?</p>
                        <p className="portfolio-chat-example">How does Keeno’s experience fit this role?</p>
                    </div>
                    <div className="portfolio-chat-footer">Chat coming soon</div>
                </section>
            )}
            <div ref={actionsRef} className="portfolio-actions" aria-label="Portfolio actions">
                <button ref={triggerRef} className="portfolio-skills-helper" type="button"
                    aria-haspopup="dialog" aria-controls="portfolio-chat-panel" aria-expanded={isHelperOpen}
                    onClick={() => setIsHelperOpen((open) => !open)}>
                    <MessageCircle size={13} strokeWidth={1.7} aria-hidden="true" />Ask about Keeno
                </button>
                {showTop && (
                    <button className="portfolio-back-top" type="button" aria-label="Back to top"
                        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>
                        <ArrowUp size={15} strokeWidth={1.7} aria-hidden="true" />
                    </button>
                )}
            </div>
        </div>
    );
}
