import type { CV } from "../types";
import { GlobeIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

// One-page A4 CV. Rendered at /print.html and turned into a PDF by scripts/generate-pdf.mjs.

export default function PrintCV({ cv }: { cv: CV }) {
  return (
    <div className="page">
      <header>
        <img src={cv.photo} alt="" />
        <div className="head-text">
          <div className="name">{cv.name}</div>
          <div className="title">{cv.title}</div>
          <hr />
          <div className="contact">
            <span><PhoneIcon />{cv.phone}</span>
            <span><MailIcon />{cv.email}</span>
            <span><PinIcon />{cv.location}</span>
            <span><GlobeIcon /><a href={`https://${cv.website}`}>{cv.website}</a></span>
          </div>
        </div>
      </header>

      <h2>About me</h2>
      <div className="inner"><p>{cv.about}</p></div>

      <h2>Projects</h2>
      <div className="inner">
        {cv.projects.map((p) => (
          <div className="proj" key={p.name}>
            <h3>
              {p.name} — {p.kind} <span className="stack">· {p.stack.join(", ")}</span>
            </h3>
            <div className="desc">{p.description}</div>
          </div>
        ))}
      </div>

      <h2>Work experience</h2>
      <div className="inner">
        {cv.experience.map((e) => (
          <div className="row" key={e.company + e.period}>
            <div className="date">{e.period}</div>
            <div>
              <h3>{e.company} | {e.role}</h3>
              <div className="desc">{e.description}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Education</h2>
      <div className="inner">
        {cv.education.map((e) => (
          <div className="row" key={e.school}>
            <div className="date">{e.period}</div>
            <div>
              <h3>{e.school} | {e.field}</h3>
              <div className="desc">{e.description}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Technical skills</h2>
      <div className="inner">
        <div className="skills">
          {cv.skills.map((g) => (
            <div className="skill-row" key={g.group}>
              <div className="k">{g.group}</div>
              <div>{g.items.join(", ")}</div>
            </div>
          ))}
        </div>
      </div>

      <h2>Languages &amp; interests</h2>
      <div className="inner">
        <div className="langs">
          {cv.languages.map((l) => (
            <span key={l.name}>{l.name} - {l.level}</span>
          ))}
        </div>
        <p className="interests"><b>Interests:</b> {cv.interests}</p>
      </div>

      <div className="gdpr">{cv.gdpr}</div>
    </div>
  );
}
