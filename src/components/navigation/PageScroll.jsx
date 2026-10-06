import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const positionKey = 'portfolio.scrollY';

function readPosition() {
    try { return Number(sessionStorage.getItem(positionKey)) || 0; }
    catch { return 0; }
}

function savePosition() {
    try { sessionStorage.setItem(positionKey, String(window.scrollY)); }
    catch { /* Navigation still works when browser storage is unavailable. */ }
}

export default function PageScroll() {
    const location = useLocation();
    const previousPath = useRef(null);

    useLayoutEffect(() => {
        const previousRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
        const handlePageShow = (event) => {
            if (event.persisted && window.location.pathname !== '/') {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
        };
        window.addEventListener('pageshow', handlePageShow);
        return () => {
            window.history.scrollRestoration = previousRestoration;
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);

    useLayoutEffect(() => {
        const enteringHome = location.pathname === '/' && previousPath.current !== '/';
        previousPath.current = location.pathname;
        if (location.pathname !== '/' || enteringHome) {
            window.scrollTo({ top: enteringHome ? readPosition() : 0, left: 0, behavior: 'instant' });
        }
        if (location.pathname !== '/') return;
        window.addEventListener('scroll', savePosition, { passive: true });
        window.addEventListener('pagehide', savePosition);
        // Capture the position before both router links and ordinary links leave home.
        document.addEventListener('click', savePosition, true);
        return () => {
            window.removeEventListener('scroll', savePosition);
            window.removeEventListener('pagehide', savePosition);
            document.removeEventListener('click', savePosition, true);
        };
    }, [location.pathname]);

    return null;
}
