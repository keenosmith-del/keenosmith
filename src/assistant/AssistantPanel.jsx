import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, X, Zap } from 'lucide-react';
import mascot from '../assets/images/mascot/mascot.png';
import { answer } from './engine.js';
import { Evidence, Suggestions } from './Evidence.jsx';
import MessageText from './MessageText.jsx';
import TypedResponse from './TypedResponse.jsx';
import { Link } from 'react-router-dom';

const welcome = "Hi! I can help you explore Keeno's skills, projects, experience and qualifications. You can also ask how his experience aligns with a particular role.";
const initial = { id: 'welcome', role: 'assistant', text: welcome, suggestions: ['Does Keeno know React?', 'Show me his AI projects', 'What certifications does he have?'] };
const ConversationMessage = memo(function ConversationMessage({ message, onNavigate }) {
    if (message.role === 'user') return <div className="assistant-message user"><div className="assistant-message-content"><p>{message.text}</p></div></div>;
    return <div className={`assistant-message assistant ${message.id === 'welcome' ? 'assistant-welcome' : ''}`}>
        <img className="assistant-avatar" src={mascot} alt="" />
        <div className="assistant-message-content">
            <span className="assistant-sender">{message.id === 'welcome' ? "Here's a little guidance.." : "Keeno's Assistant"}</span>
            <MessageText text={message.text} projects={message.projects} education={message.interpretation?.intent === 'education'} onNavigate={onNavigate} />
            <Evidence response={message} onNavigate={onNavigate} />
            {message.interpretation?.intent === 'role' && <div className="assistant-card-actions"><Link to="/recruiter-view" state={{ description: message.context?.roles?.[0] || '' }} onClick={onNavigate}>Open Recruiter View <ArrowRight size={13} aria-hidden="true" /></Link></div>}
        </div>
    </div>;
});

export default function AssistantPanel({ open, onClose, panelRef, closeRef }) {
    const [messages, setMessages] = useState([initial]);
    const [draft, setDraft] = useState('');
    const [pending, setPending] = useState(null);
    const [announcement, setAnnouncement] = useState('');
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [mounted, setMounted] = useState(open);
    const [away, setAway] = useState(false);
    const context = useRef({}), sequence = useRef(0), busy = useRef(false);
    const timer = useRef(null), scrollRef = useRef(null), inputRef = useRef(null), pinned = useRef(true);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const change = () => setReduced(mq.matches);
        mq.addEventListener('change', change);
        return () => { mq.removeEventListener('change', change); clearTimeout(timer.current); };
    }, []);
    useEffect(() => {
        if (open) {
            const frame = requestAnimationFrame(() => setMounted(true));
            return () => cancelAnimationFrame(frame);
        }
        const closing = setTimeout(() => setMounted(false), reduced ? 0 : 160);
        return () => clearTimeout(closing);
    }, [open, reduced]);
    useEffect(() => { if (open && mounted) inputRef.current?.focus({ preventScroll: true }); }, [open, mounted]);
    const followScroll = useCallback(() => {
        if (pinned.current && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, []);
    useLayoutEffect(followScroll, [messages, pending, mounted, followScroll]);
    useLayoutEffect(() => {
        const input = inputRef.current;
        if (!input) return;
        input.style.height = 'auto';
        input.style.height = `${Math.min(input.scrollHeight, 132)}px`;
    }, [draft, mounted]);
    const finish = useCallback(result => {
        if (!busy.current) return;
        clearTimeout(timer.current);
        context.current = result.context;
        setMessages(m => [...m, { ...result, id: `a-${++sequence.current}`, role: 'assistant' }]);
        setPending(null);
        busy.current = false;
        setAnnouncement(result.text);
    }, []);
    const submit = useCallback(value => {
        const question = value.trim();
        if (!question || busy.current) return;
        busy.current = true;
        pinned.current = true;
        setAway(false);
        setDraft('');
        setAnnouncement('');
        setMessages(m => [...m, { id: `u-${++sequence.current}`, role: 'user', text: question }]);
        setPending({ processing: true });
        timer.current = setTimeout(() => {
            try { setPending({ result: answer(question, context.current) }); }
            catch { finish({ text: 'I could not process that question. Please try a shorter portfolio question.', projects: [], credentials: [], indicators: [], suggestions: initial.suggestions, context: context.current }); }
        }, 0);
    }, [finish]);
    const latest = messages[messages.length - 1];
    return <section ref={panelRef} hidden={!mounted && !open} inert={!open ? true : undefined} data-open={open} className="portfolio-chat-panel" role="dialog" aria-labelledby="portfolio-chat-title" id="portfolio-chat-panel">
        <div className="portfolio-chat-header">
            <img src={mascot} alt="Keeno's company mascot" />
            <div><h2 id="portfolio-chat-title">Keeno's Assistant</h2><small>Portfolio intelligence</small></div>
            <button ref={closeRef} type="button" aria-label="Close chat" onClick={onClose}><X size={15} aria-hidden="true" /></button>
        </div>
        <div className="assistant-conversation-shell">
            <div className="portfolio-chat-body" ref={scrollRef} aria-label="Conversation history" tabIndex={0} onScroll={() => {
                const el = scrollRef.current;
                pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 70;
                setAway(!pinned.current);
            }}>
                {messages.map(m => <ConversationMessage key={m.id} message={m} onNavigate={onClose} />)}
                {pending?.processing && <div className="assistant-message assistant assistant-pending"><img className="assistant-avatar" src={mascot} alt="" /><div className="assistant-activity" role="status" aria-label="Preparing response"><i /><i /><i /></div></div>}
                {pending?.result && <TypedResponse result={pending.result} reduced={reduced} onComplete={finish} onProgress={followScroll} />}
                {!pending && latest.role === 'assistant' && <div className={`assistant-followups ${latest.id === 'welcome' ? 'assistant-starters' : ''}`}>
                    <span className="assistant-section-label">{latest.id === 'welcome' ? 'Try asking' : 'Explore further'}</span>
                    <Suggestions items={latest.suggestions || []} onSubmit={submit} />
                </div>}
            </div>
            {away && <button className="assistant-jump" type="button" onClick={() => { pinned.current = true; setAway(false); followScroll(); }}><ArrowDown size={13} aria-hidden="true" /> Latest message</button>}
        </div>
        <div className="assistant-sr" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
        <div className="assistant-composer-area">
            <form className="assistant-composer" onSubmit={e => { e.preventDefault(); submit(draft); }}>
                <label className="assistant-sr" htmlFor="assistant-input">Ask about Keeno or paste a job description</label>
                <textarea id="assistant-input" ref={inputRef} placeholder="Ask me anything..." value={draft} maxLength={16000} rows={1} onChange={e => setDraft(e.target.value)} onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit(draft); }
                }} />
                <button type="submit" disabled={!!pending || !draft.trim()} aria-label="Send message"><ArrowRight size={16} aria-hidden="true" /></button>
            </form>
            <div className="portfolio-chat-footer"><Zap className="assistant-footer-zap" size={10} aria-hidden="true" /><span>Powered by my own Hybrid Intelligence system · <strong>KAILOR</strong></span></div>
            <div className="assistant-footer-secondary">Built and designed by Keeno Smith © September 2026</div>
        </div>
    </section>;
}
