import { useEffect, useRef, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import './PortfolioActions.css';
import AssistantPanel from '../../assistant/AssistantPanel.jsx';

export default function PortfolioActions() {
    const [showTop, setShowTop] = useState(false);
    const [isHelperOpen, setIsHelperOpen] = useState(false);
    const triggerRef = useRef(null);
    const closeRef = useRef(null);
    const panelRef = useRef(null);
    const actionsRef = useRef(null);

    useEffect(() => {
        const viewport = window.visualViewport;
        if (!viewport) return;
        const update = () => {
            const covered = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
            document.documentElement.style.setProperty('--assistant-keyboard-offset', `${covered}px`);
            document.documentElement.style.setProperty('--assistant-viewport-height', `${viewport.height}px`);
        };
        update();
        viewport.addEventListener('resize', update);
        viewport.addEventListener('scroll', update);
        return () => {
            viewport.removeEventListener('resize', update);
            viewport.removeEventListener('scroll', update);
            document.documentElement.style.removeProperty('--assistant-keyboard-offset');
            document.documentElement.style.removeProperty('--assistant-viewport-height');
        };
    }, []);

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
            <AssistantPanel open={isHelperOpen} panelRef={panelRef} closeRef={closeRef}
                onClose={() => { setIsHelperOpen(false); triggerRef.current?.focus(); }} />
            <div ref={actionsRef} className="portfolio-actions" aria-label="Portfolio actions">
                <button ref={triggerRef} className="portfolio-skills-helper" type="button"
                    aria-haspopup="dialog" aria-controls="portfolio-chat-panel" aria-expanded={isHelperOpen}
                    onClick={() => setIsHelperOpen((open) => !open)}>
                    <MessageCircle size={13} strokeWidth={1.7} aria-hidden="true" />Ask my Assistant
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
