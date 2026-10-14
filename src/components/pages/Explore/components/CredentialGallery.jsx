import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { credentialIndex } from "../utils/exploreIndex.js";
import CredentialSeal from "./CredentialSeal.jsx";
import "./CredentialGallery.css";

const tones = new Map(
  credentialIndex.map((credential, index) => [
    credential.id,
    { 2: "sage", 9: "blue", 16: "peach", 21: "warm" }[index] ||
      (index % 3 === 0 ? "paper" : "neutral"),
  ]),
);
const wreathVariants = new Map(
  credentialIndex.map((credential, index) => [credential.id, index % 3]),
);

export function CredentialCard({ credential, badgeMode }) {
  const [expanded, setExpanded] = useState(false);
  const type = badgeMode ? "Badges" : credential.type;
  return (
    <article
      data-explore-id={credential.id}
      className={`credential-tile credential-tone-${tones.get(credential.id)} ${expanded ? "is-expanded" : ""}`}
    >
      <button
        type="button"
        className="credential-toggle"
        aria-label={`${expanded ? "Hide" : "Show"} details: ${credential.name}, ${credential.issuer}`}
        aria-expanded={expanded}
        aria-controls={`credential-info-${credential.id}`}
        onClick={() => setExpanded((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setExpanded(false);
        }}
      >
        <span className="credential-top">
          <span className="credential-type">{type}</span>
          <span className="credential-date">{credential.date}</span>
        </span>
        <span className="credential-identity">
          <CredentialSeal
            issuer={credential.issuer}
            date={credential.date}
            wreathVariant={wreathVariants.get(credential.id)}
          />
          <span className="credential-issuer">{credential.issuer}</span>
        </span>
        <span className="credential-action" aria-hidden="true">
          <ArrowRight size={17} strokeWidth={1.7} />
        </span>
      </button>
      <div
        className="credential-information"
        tabIndex={0}
        role="region"
        aria-label={`${credential.name} details`}
        id={`credential-info-${credential.id}`}
      >
        <small>{credential.issuer}</small>
        <h2>{credential.name}</h2>
        <p className="credential-detail-meta">
          {credential.date} · {type}
        </p>
        <p>{credential.description}</p>
        <p className="credential-status">{credential.status}</p>
        {!!credential.technologies.length && (
          <div className="credential-subjects">
            {credential.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        )}
        {credential.verification && (
          <a
            className="credential-verification"
            href={credential.verification}
            target="_blank"
            rel="noopener noreferrer"
          >
            Issuer profile <ArrowRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
export default function CredentialGallery({ items, badgeMode }) {
  return (
    <div className="credential-collection">
      {items.map((credential) => (
        <CredentialCard key={credential.id} credential={credential} badgeMode={badgeMode} />
      ))}
    </div>
  );
}
