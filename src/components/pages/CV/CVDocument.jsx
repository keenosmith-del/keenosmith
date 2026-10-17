function Section({ id, title, children }) {
  return (
    <section className="cv-document-section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <div className="cv-document-section-body">{children}</div>
    </section>
  );
}

function LabelledParagraph({ label, text }) {
  return <p><strong>{label}:</strong> {text}</p>;
}

export default function CVDocument({ version }) {
  return (
    <article className="cv-page" data-cv-type={version.key} aria-labelledby="cv-name">
      <header className="cv-document-intro">
        <div className="cv-document-name">
          <h1 id="cv-name">{version.name}</h1>
          <p className="cv-document-headline">{version.headline}</p>
          <p className="cv-document-emphasis">{version.emphasis}</p>
        </div>
        <div className="cv-document-contact">
          <p>{version.location}</p>
          <p><a href={version.phoneHref}>{version.phone}</a><span aria-hidden="true"> · </span><a href={`mailto:${version.email}`}>{version.email}</a></p>
          {version.profiles.map(profile => <p key={profile.label}><a href={profile.href} target="_blank" rel="noopener noreferrer">{profile.label}: {profile.text}</a></p>)}
        </div>
      </header>

      <Section id="cv-summary" title="Professional Summary">
        {version.summary.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </Section>
      <Section id="cv-technical-skills" title="Technical Skills">
        <div className="cv-document-skills">
          {version.skills.map(skill => <LabelledParagraph key={skill.label} {...skill} />)}
        </div>
      </Section>
      <Section id="cv-experience" title="Experience">
        {version.experience.map(job => (
          <div className="cv-document-entry" key={job.title}>
            <h3>{job.title}</h3>
            <p className="cv-document-meta"><strong>{job.employer}</strong><span aria-hidden="true"> | </span>{job.dates}</p>
            {job.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {job.bullets.length > 0 && <ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
            {job.clientWork && <div className="cv-document-client-work">
              <h4>{job.clientWork.heading}</h4>
              {job.clientWork.entries.map(entry => <LabelledParagraph key={entry.label} {...entry} />)}
            </div>}
          </div>
        ))}
      </Section>
      <Section id="cv-education" title="Education">
        {version.education.map(entry => <LabelledParagraph key={entry.label} {...entry} />)}
      </Section>
      <Section id="cv-projects" title="Selected Projects">
        <p className="cv-document-project-intro">{version.projectsIntro}</p>
        {version.projects.map(project => (
          <div className="cv-document-entry" key={project.title}>
            <h3>{project.title}</h3>
            <p className="cv-document-technologies">{project.technologies}</p>
            <p>{project.description}</p>
            <p className="cv-document-repository"><a href={project.repository} target="_blank" rel="noopener noreferrer">Repository: {project.repository}</a></p>
          </div>
        ))}
      </Section>
      <Section id="cv-credentials" title="Selected Credentials and Professional Development">
        {version.credentials.map(entry => <LabelledParagraph key={entry.label} {...entry} />)}
      </Section>
    </article>
  );
}
