import { useCallback, useEffect, useRef, useState } from 'react';
import mascot from '../assets/images/mascot/mascot.png';
import MessageText from './MessageText.jsx';

// Only this in-flight message renders on a typing tick. Completed cards and
// conversation messages are memoised independently from presentation timers.
export default function TypedResponse({ result, onComplete, onProgress, reduced }) {
    const [visible, setVisible] = useState(0);
    const [active, setActive] = useState(true);
    const done = useRef(false);
    const complete = useCallback(() => {
        if (done.current) return;
        done.current = true;
        onComplete(result);
    }, [onComplete, result]);
    useEffect(() => {
        let timer;
        if (reduced) {
            complete();
            return;
        }
        let count = 0;
        const step = Math.max(12, Math.ceil(result.text.length / 42));
        const tick = () => {
            if (done.current) return;
            count = Math.min(result.text.length, count + step);
            // Finish at word boundaries to avoid flickering half-word fragments.
            const boundary = result.text.indexOf(' ', count);
            if (boundary >= count && boundary - count < 18) count = boundary + 1;
            setVisible(count);
            if (count >= result.text.length) complete();
            else timer = setTimeout(tick, 28);
        };
        timer = setTimeout(() => { setActive(false); tick(); }, 240);
        return () => clearTimeout(timer);
    }, [result, reduced, complete]);
    useEffect(() => { onProgress(); }, [visible, active, onProgress]);
    return <div className="assistant-message assistant assistant-pending" aria-busy="true">
        <img className="assistant-avatar" src={mascot} alt="" />
        <div className="assistant-message-content">
            <span className="assistant-sender">Keeno's Assistant</span>
            {active ? <div className="assistant-activity" role="status" aria-label="Preparing response"><i /><i /><i /></div> : <>
                <MessageText text={result.text.slice(0, visible)} projects={result.projects} />
                <button type="button" className="assistant-complete" onClick={complete}>Show full response</button>
            </>}
        </div>
    </div>;
}
