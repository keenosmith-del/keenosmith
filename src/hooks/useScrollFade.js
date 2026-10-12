import { useEffect } from 'react';
import '../styles/scrollFade.css';

// Scope each section's fade targets without changing layout or React state on scroll.
export default function useScrollFade(sectionRef) {
    useEffect(() => {
        const section = sectionRef.current;
        const targets = [...section.querySelectorAll('[data-scroll-fade]')];
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = null;
        const loadedAt = performance.now();
        const loadDuration = 800;
        const update = () => {
            frame = null;
            const loadProgress = reducedMotion.matches ? 1 : Math.min(1, (performance.now() - loadedAt) / loadDuration);
            const loadOpacity = 1 - Math.pow(1 - loadProgress, 3);
            targets.forEach(target => {
                const { top, bottom } = target.getBoundingClientRect();
                const range = Math.min(window.innerHeight * 0.22, 240);
                const opacity = reducedMotion.matches ? 1 : Math.max(0, Math.min(1,
                    (window.innerHeight - top) / Math.max(range, 1),
                    bottom / Math.max(range, 1)));
                target.style.setProperty('--scroll-fade-opacity', String(opacity));
                target.style.setProperty('--scroll-load-opacity', String(loadOpacity));
            });
            if (loadProgress < 1) frame = window.requestAnimationFrame(update);
        };
        const schedule = () => {
            if (frame === null) frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        reducedMotion.addEventListener('change', schedule);
        const observer = new ResizeObserver(schedule);
        targets.forEach(target => observer.observe(target));
        return () => {
            if (frame !== null) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            reducedMotion.removeEventListener('change', schedule);
            observer.disconnect();
        };
    }, [sectionRef]);
}
