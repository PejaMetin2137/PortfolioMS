import type { ReactNode } from "react";
import type { CV } from "../types";
import { DownloadIcon, GitHubIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

// The website (mikolajsuchodolski.dev). All content comes from cv.json.

function Section({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <section className={className}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((t) => (
        <span className="tag" key={t}>{t}</span>
      ))}
    </div>
  );
}

export default function Site({ cv }: { cv: CV }) {
  const year = new Date().getFullYear();

  return (
    <div className="wrap">
      <header className="hero">
        <img className="avatar" src={cv.photo} alt={`Photo of ${cv.name}`} />
        <div>
          <h1>{cv.name}</h1>
          <div className="role">{cv.title}</div>
          <div className="contact">
            <a href={`mailto:${cv.email}`}><MailIcon />{cv.email}</a>
            <a href={`tel:${cv.phone.replace(/\s/g, "")}`}><PhoneIcon />{cv.phone}</a>
            <span><PinIcon />{cv.locationFull}</span>
          </div>
          <div className="actions">
            <a className="btn primary" href={cv.pdfFile} download>
              <DownloadIcon />Download CV (PDF)
            </a>
            <a className="btn" href={cv.github} target="_blank" rel="noopener">
              <GitHubIcon />GitHub
            </a>
          </div>
        </div>
      </header>

      <Section title="About me" className="about">
        <p>{cv.about}</p>
      </Section>

      <Section title="Projects">
        <div className="projects">
          {cv.projects.map((p) => (
            <article className="project" key={p.name}>
              <h3>
                {p.link ? <a href={p.link} target="_blank" rel="noopener">{p.name}</a> : p.name}
                {" — "}{p.kind}
              </h3>
              <p>{p.description}</p>
              <Tags items={p.stack} />
              {p.repo && <a className="repo-link" href={p.repo} target="_blank" rel="noopener">View code →</a>}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Work experience">
        {cv.experience.map((e) => (
          <div className="timeline-item" key={e.company + e.period}>
            <div className="date">{e.period}</div>
            <div>
              <h3>{e.role} <span className="org">· {e.company}</span></h3>
              <p>{e.description}</p>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Education">
        {cv.education.map((e) => (
          <div className="timeline-item" key={e.school}>
            <div className="date">{e.period}</div>
            <div>
              <h3>{e.field} <span className="org">· {e.school}</span></h3>
              <p>{e.description}</p>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Technical skills">
        {cv.skills.map((g) => (
          <div className="skills-group" key={g.group}>
            <h3>{g.group}</h3>
            <Tags items={g.items} />
          </div>
        ))}
      </Section>

      <Section title="Languages & interests">
        <div className="langs">
          {cv.languages.map((l) => (
            <div className="lang" key={l.name}>
              <div className="name">{l.name}</div>
              <div className="lvl">{l.level}</div>
              <div className="bar"><div style={{ width: `${l.percent}%` }} /></div>
            </div>
          ))}
        </div>
        <p className="interests"><strong>Interests:</strong> {cv.interests}</p>
      </Section>

      <footer>© {year} {cv.name} · Built with React + TypeScript, deployed by GitHub Actions</footer>
    </div>
  );
}
