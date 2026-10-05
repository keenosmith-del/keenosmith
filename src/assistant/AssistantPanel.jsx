import { useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import mascot from '../assets/images/mascot/mascot.png';
import { answer } from './engine.js';
import { Evidence, Suggestions } from './Evidence.jsx';
const welcome="Hi! I can help you explore Keeno's skills, projects, experience and qualifications. You can also ask how his experience aligns with a particular role.";
const initial={id:'welcome',role:'assistant',text:welcome,suggestions:['Does Keeno know React?','What certifications does Keeno have?','Would Keeno fit a Full-Stack AI Engineer role?']};
export default function AssistantPanel({open,onClose,panelRef,closeRef}) {
 const [messages,setMessages]=useState([initial]),[draft,setDraft]=useState(''),[pending,setPending]=useState(null),[announcement,setAnnouncement]=useState('');
 const context=useRef({}),sequence=useRef(0),busy=useRef(false),timer=useRef(null),scrollRef=useRef(null),inputRef=useRef(null),latest=useRef(null);
 const reduced=useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>{reduced.current=mq.matches;if(mq.matches&&latest.current)finish(latest.current);};mq.addEventListener('change',change);return()=>{mq.removeEventListener('change',change);clearTimeout(timer.current);};},[]);
 useEffect(()=>{if(open)inputRef.current?.focus();},[open]);
 useEffect(()=>{if(open&&scrollRef.current)scrollRef.current.scrollTop=scrollRef.current.scrollHeight;},[messages,pending,open]);
 function finish(result) {clearTimeout(timer.current);latest.current=null;context.current=result.context;setMessages(m=>[...m,{...result,id:`a-${++sequence.current}`,role:'assistant'}]);setPending(null);busy.current=false;setAnnouncement(result.text);}
 function submit(value=draft) {
  const question=value.trim();if(!question||busy.current)return;
  busy.current=true;setDraft('');setAnnouncement('');setMessages(m=>[...m,{id:`u-${++sequence.current}`,role:'user',text:question}]);setPending({phase:'activity',text:''});
  timer.current=setTimeout(()=>{
   try {const result=answer(question,context.current);latest.current=result;if(reduced.current){finish(result);return;}
    let n=0;const tick=()=>{n=Math.min(result.text.length,n+Math.max(20,Math.ceil(result.text.length/45)));setPending({phase:'typing',text:result.text.slice(0,n)});if(n===result.text.length)finish(result);else timer.current=setTimeout(tick,24);};
    timer.current=setTimeout(tick,320);
   }catch {finish({text:'I could not process that question. Please try a shorter portfolio question.',projects:[],credentials:[],indicators:[],suggestions:initial.suggestions,context:context.current});}
  },0);
 }
 return <section ref={panelRef} hidden={!open} className="portfolio-chat-panel" role="dialog" aria-labelledby="portfolio-chat-title" id="portfolio-chat-panel">
 <div className="portfolio-chat-header"><img src={mascot} alt="Keeno's company mascot"/><div><h2 id="portfolio-chat-title">Keeno's Assistant</h2><small>Local portfolio intelligence</small></div><button ref={closeRef} type="button" aria-label="Close chat" onClick={onClose}><X size={18}/></button></div>
 <div className="portfolio-chat-body" ref={scrollRef} aria-label="Conversation history">
 {messages.map(m=><div key={m.id} className={`assistant-message ${m.role}`}>
 {m.role==='assistant'&&<img src={mascot} alt=""/>}<div className="assistant-message-content"><p>{m.text}</p>{m.role==='assistant'&&<><Evidence response={m} onNavigate={onClose}/><Suggestions items={m.suggestions||[]} onSubmit={submit} disabled={!!pending}/></>}</div></div>)}
 {pending&&<div className="assistant-message assistant"><img src={mascot} alt=""/><div className="assistant-message-content">{pending.phase==='activity'?<div className="assistant-activity" aria-label="Preparing response"><i/><i/><i/></div>:<><p>{pending.text}<span className="assistant-cursor" aria-hidden="true">▎</span></p><button className="assistant-complete" onClick={()=>latest.current&&finish(latest.current)}>Show full response</button></>}</div></div>}
 </div><div className="assistant-sr" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
 <form className="assistant-composer" onSubmit={e=>{e.preventDefault();submit();}}><label className="assistant-sr" htmlFor="assistant-input">Ask about Keeno or paste a job description</label><textarea id="assistant-input" ref={inputRef} placeholder="Ask me anything..." value={draft} maxLength={16000} rows={2} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();submit();}}}/><button type="submit" disabled={!!pending||!draft.trim()} aria-label="Send message"><Send size={17}/></button></form>
 <div className="portfolio-chat-footer">Powered by Hybrid Intelligence · <strong>KAILOR</strong></div>
 </section>;
}
