import { useEffect, useRef } from "react";

export default function ProjectModal({ onClose, groups, title = "Technology stack" }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const page = dialogRef.current.closest("main");
    const background = [...page.children].filter(child => !child.contains(dialogRef.current));
    const previousInert = background.map(child => child.inert);
    background.forEach(child => { child.inert = true; });
    document.body.style.overflow = "hidden";
    dialogRef.current.focus({ preventScroll: true });
    const onKeyDown = event => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = [...dialogRef.current.querySelectorAll('button, a[href], [tabindex="0"]')];
        const first = focusable[0]; const last = focusable.at(-1);
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      background.forEach((child, index) => { child.inert = previousInert[index]; });
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);
  return (
    <div className="project-modal-overlay" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="project-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
        <button className="project-modal-close" type="button" aria-label="Close technology stack" onClick={onClose}><span aria-hidden="true">×</span></button>
        <div className="project-modal-groups">
          {groups.map(group => <section className="project-modal-group" key={group.heading}>
            <h3>{group.heading}</h3>
            {group.note && <p>{group.note}</p>}
            <div className="project-modal-pills">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
          </section>)}
        </div>
      </div>
    </div>
  );
}
