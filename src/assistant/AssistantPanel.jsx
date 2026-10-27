import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArrowDown, ArrowRight, SquarePen, X } from "lucide-react";
import mascot from "../assets/images/mascot/mascot.webp";
import { respond, starterQuestions } from "./conversation.js";
import { Evidence, Suggestions } from "./Evidence.jsx";
import MessageText from "./MessageText.jsx";
import TypedResponse from "./TypedResponse.jsx";
import { Link } from "react-router-dom";

const welcome =
  "Hi! I can help you explore Keeno's skills, projects, experience and qualifications. You can also ask how his experience aligns with a particular role.";
const initial = {
  id: "welcome",
  role: "assistant",
  text: welcome,
  suggestions: starterQuestions,
};
const ConversationMessage = memo(function ConversationMessage({
  message,
  onNavigate,
}) {
  if (message.role === "user")
    return (
      <div className="assistant-message user">
        <div className="assistant-message-content">
          <p>{message.text}</p>
        </div>
      </div>
    );
  return (
    <div
      className={`assistant-message assistant ${message.id === "welcome" ? "assistant-welcome" : ""}`}
    >
      <img className="assistant-avatar" src={mascot} alt="" />
      <div className="assistant-message-content">
        <span className="assistant-sender">
          {message.id === "welcome"
            ? "Here's a little guidance.."
            : "Portfolio Assistant"}
        </span>
        <MessageText
          text={message.text}
          projects={message.projects}
          education={message.interpretation?.intent === "education"}
          onNavigate={onNavigate}
        />
        <Evidence response={message} onNavigate={onNavigate} />
        {message.interpretation?.intent === "role" && (
          <div className="assistant-card-actions">
            <Link
              to="/recruiter-view"
              state={{ description: message.context?.roles?.[0] || "" }}
              onClick={onNavigate}
            >
              Open Recruiter View <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});

export default function AssistantPanel({ open, onClose, panelRef, closeRef }) {
  const [messages, setMessages] = useState([initial]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [mounted, setMounted] = useState(open);
  const [away, setAway] = useState(false);
  const [newestUserId, setNewestUserId] = useState(null);
  const [newestResponseId, setNewestResponseId] = useState(null);
  const userRef = useRef(null), responseId = useRef(null);
  const threadRef = useRef(null), anchorActive = useRef(false), expectedScroll = useRef(0);
  const context = useRef({}),
    sequence = useRef(0),
    busy = useRef(false);
  const request = useRef(null);
  const timer = useRef(null),
    scrollRef = useRef(null),
    inputRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(mq.matches);
    mq.addEventListener("change", change);
    return () => {
      mq.removeEventListener("change", change);
      clearTimeout(timer.current);
      request.current?.abort();
      busy.current = false;
    };
  }, []);
  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(frame);
    }
    const closing = setTimeout(() => setMounted(false), reduced ? 0 : 160);
    return () => clearTimeout(closing);
  }, [open, reduced]);
  useEffect(() => {
    if (open && mounted) inputRef.current?.focus({ preventScroll: true });
  }, [open, mounted]);
  const updateLatest = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const remaining = container.scrollHeight - container.clientHeight - container.scrollTop;
    setAway(container.scrollHeight > container.clientHeight + 2 && remaining > 24);
  }, []);
  const anchorUser = useCallback(() => {
    const container = scrollRef.current, user = userRef.current;
    if (!open || !mounted || !anchorActive.current || !container || !user) return;
    const padding = parseFloat(getComputedStyle(container).paddingTop) || 0;
    let top = 0, node = user;
    while (node && node !== container) { top += node.offsetTop; node = node.offsetParent; }
    // Scroll as far as real content permits. Never add a spacer to force an anchor.
    container.scrollTop = Math.max(0, top - padding);
    expectedScroll.current = container.scrollTop;
    updateLatest();
  }, [open, mounted, updateLatest]);
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto";
      input.style.height = `${Math.min(input.scrollHeight, 132)}px`;
    }
    anchorUser();
    updateLatest();
  }, [messages, pending, draft, open, mounted, anchorUser, updateLatest]);
  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => { anchorUser(); updateLatest(); });
    if (scrollRef.current) observer.observe(scrollRef.current);
    if (threadRef.current) observer.observe(threadRef.current);
    return () => observer.disconnect();
  }, [anchorUser, updateLatest]);
  const finish = useCallback((result) => {
    if (!busy.current) return;
    clearTimeout(timer.current);
    context.current = result.context;
    setMessages((m) => [
      ...m,
      { ...result, id: responseId.current, role: "assistant" },
    ]);
    setPending(null);
    busy.current = false;
    setAnnouncement(result.text);
  }, []);
  const submit = useCallback(
    (value) => {
      const question = value.trim();
      if (!question || busy.current) return;
      busy.current = true;
      anchorActive.current = true;
      setAway(false);
      setDraft("");
      setAnnouncement("");
      const userId = `u-${++sequence.current}`;
      setNewestUserId(userId);
      setMessages((m) => [
        ...m,
        { id: userId, role: "user", text: question },
      ]);
      responseId.current = `a-${++sequence.current}`;
      setNewestResponseId(responseId.current);
      setPending({ processing: true });
      const id = responseId.current;
      request.current = new AbortController();
      const signal = AbortSignal.any([request.current.signal, AbortSignal.timeout(14000)]);
      const started = performance.now();
      timer.current = setTimeout(async () => {
        const result = await respond(question, context.current, messages.filter((m) => m.id !== "welcome"), { signal });
        if (!busy.current || responseId.current !== id) return;
        const show = () => {
          if (busy.current && responseId.current === id) setPending({ result });
        };
        // A brief minimum thinking phase, without adding latency to slower providers.
        timer.current = setTimeout(show, Math.max(0, 750 - (performance.now() - started)));
      }, 0);
    },
    [messages],
  );
  const clear = () => {
    clearTimeout(timer.current);
    request.current?.abort();
    busy.current = false;
    context.current = {};
    responseId.current = null;
    setNewestUserId(null);
    setNewestResponseId(null);
    anchorActive.current = false;
    setPending(null);
    setMessages([initial]);
    setDraft("");
    setAway(false);
    expectedScroll.current = 0;
    setAnnouncement("Conversation cleared.");
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    inputRef.current?.focus({ preventScroll: true });
  };
  const latest = messages[messages.length - 1];
  return (
    <section
      ref={panelRef}
      hidden={!mounted && !open}
      inert={!open ? true : undefined}
      data-open={open}
      className="portfolio-chat-panel"
      role="dialog"
      aria-labelledby="portfolio-chat-title"
      id="portfolio-chat-panel"
    >
      <div className="portfolio-chat-header">
        <img src={mascot} alt="Keeno's company mascot" />
        <div>
          <h2 id="portfolio-chat-title">Portfolio Assistant</h2>
          <small>Portfolio intelligence</small>
        </div>
        {messages.length > 1 && (
          <button
            className="assistant-clear"
            type="button"
            onClick={clear}
            aria-label="Start new chat"
            title="Start new chat"
          >
            <SquarePen size={15} aria-hidden="true" />
          </button>
        )}
        <button
          ref={closeRef}
          type="button"
          aria-label="Close chat"
          onClick={onClose}
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>
      <div className="assistant-conversation-shell">
        <div
          className="portfolio-chat-body"
          ref={scrollRef}
          aria-label="Conversation history"
          tabIndex={0}
          onWheel={() => { anchorActive.current = false; }}
          onTouchMove={() => { anchorActive.current = false; }}
          onKeyDown={(e) => {
            if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) anchorActive.current = false;
          }}
          onScroll={() => {
            const el = scrollRef.current;
            if (Math.abs(el.scrollTop - expectedScroll.current) > 2) anchorActive.current = false;
            updateLatest();
          }}
        >
          <div className="assistant-thread" ref={threadRef}>
            {messages.map((m) => (
              <div key={m.id} data-message-id={m.id}
                ref={m.id === newestUserId ? userRef : undefined}>
                <ConversationMessage message={m} onNavigate={onClose} />
                {!pending && m.id === latest.id && m.role === "assistant" && (
                  <div
                    className={`assistant-followups ${m.id === "welcome" ? "assistant-starters" : ""}`}
                  >
                    <span className="assistant-section-label">
                      {m.id === "welcome" ? "Try asking" : "Explore further"}
                    </span>
                    <Suggestions items={m.suggestions || []} onSubmit={submit} />
                    {m.id !== "welcome" && (
                      <details className="assistant-card-details">
                        <summary>Original questions</summary>
                        <Suggestions items={initial.suggestions} onSubmit={submit} />
                      </details>
                    )}
                  </div>
                )}
              </div>
            ))}
            {pending?.processing && (
              <div className="assistant-message assistant assistant-pending">
                <img className="assistant-avatar" src={mascot} alt="" />
                <div
                  className="assistant-activity"
                  role="status"
                  aria-label="Preparing response"
                >
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
            {pending?.result && (
              <div data-message-id={newestResponseId}>
                <TypedResponse
                  result={pending.result}
                  reduced={reduced}
                  onComplete={finish}
                />
              </div>
            )}
          </div>
        </div>
        {away && (
          <button
            className="assistant-jump"
            type="button"
            onClick={() => {
              anchorActive.current = false;
              const container = scrollRef.current;
              container.scrollTop = container.scrollHeight;
              expectedScroll.current = container.scrollTop;
              updateLatest();
            }}
          >
            <ArrowDown size={13} aria-hidden="true" /> Latest message
          </button>
        )}
      </div>
      <div
        className="assistant-sr"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="assistant-composer-area">
        <form
          className="assistant-composer"
          onSubmit={(e) => {
            e.preventDefault();
            submit(draft);
          }}
        >
          <label className="assistant-sr" htmlFor="assistant-input">
            Ask about Keeno or paste a job description
          </label>
          <textarea
            id="assistant-input"
            ref={inputRef}
            placeholder="Ask me anything..."
            value={draft}
            maxLength={16000}
            rows={1}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                submit(draft);
              }
            }}
          />
          <button
            type="submit"
            disabled={!!pending || !draft.trim()}
            aria-label="Send message"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </form>
        <div className="portfolio-chat-footer">
          <span>
            Built by my own Hybrid Intelligence system · <strong>kailor</strong>
          </span>
        </div>
        <div className="assistant-footer-secondary">
          Keeno Smith © September 2026
        </div>
      </div>
    </section>
  );
}
