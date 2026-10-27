import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowUp, ChevronDown, Download } from "lucide-react";
import { useEffect, useState } from "react";
import CVDocument from "./CVDocument.jsx";
import { cvByType, cvVersions, defaultCVType } from "./data/versions.js";
import "./CV.css";

export default function CV() {
  const [params, setParams] = useSearchParams();
  const requestedType = params.get("type");
  const selectedType = Object.hasOwn(cvByType, requestedType) ? requestedType : defaultCVType;
  const version = cvByType[selectedType];
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (requestedType === selectedType) return;
    setParams(previous => {
      const next = new URLSearchParams(previous);
      next.set("type", selectedType);
      return next;
    }, { replace: true, preventScrollReset: true });
  }, [requestedType, selectedType, setParams]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function selectVersion(type) {
    setParams(previous => {
      const next = new URLSearchParams(previous);
      next.set("type", type);
      return next;
    }, { preventScrollReset: true });
  }

  return (
    <main className="cv">
      <div className="cv-page-controls">
        <Link className="cv-page-control cv-back" to="/"><ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" /><span>Back to Portfolio</span></Link>
        <div className="cv-role-controls">
          <div className="cv-version-field">
            <label htmlFor="cv-version">CV version</label>
            <div className="cv-version-select">
              <select id="cv-version" value={selectedType} onChange={event => selectVersion(event.target.value)}>
                {cvVersions.map(option => <option key={option.key} value={option.key}>{option.label}</option>)}
              </select>
              <ChevronDown size={14} strokeWidth={1.7} aria-hidden="true" />
            </div>
          </div>
          <a className="cv-page-control cv-download" href={version.pdf} download={version.downloadFilename} aria-label={`Download CV — ${version.label} (PDF)`}>
            <span>Download CV</span><Download size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </div>
      <p className="cv-sr-only" role="status">Showing the {version.label} CV.</p>
      <CVDocument version={version} />
      {showScrollTop && <button className="cv-scroll-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={15} strokeWidth={1.8} aria-hidden="true" /></button>}
    </main>
  );
}
