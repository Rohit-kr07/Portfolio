import React from "react";
import { X, Printer } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { personal, education, experience, projects, careerObjective } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--bg-primary)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-subtle)",
          width: "100%",
          maxWidth: "850px",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
        className="resume-modal-content"
      >
        {/* Modal Action Header (hidden in print) */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "var(--bg-surface-elevated)",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--border-subtle)",
            zIndex: 10,
          }}
          className="no-print"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-primary)" }}>
              Rohit Kumar — Verified Resume
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--accent-emerald)",
                background: "var(--accent-emerald-glow)",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              PDF Printable
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={handlePrint} className="btn-primary" style={{ padding: "8px 16px", fontSize: "13px" }}>
              <Printer size={15} />
              Print / Save PDF
            </button>
            <button onClick={onClose} className="btn-icon" style={{ width: "36px", height: "36px" }} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div style={{ padding: "36px 40px" }} id="printable-resume">
          {/* Header */}
          <div style={{ textAlign: "center", borderBottom: "2px solid var(--accent-cyan)", paddingBottom: "20px", marginBottom: "24px" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "6px" }}>
              ROHIT KUMAR
            </h1>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "14px", flexWrap: "wrap", fontSize: "14px", color: "var(--text-secondary)" }}>
              <span>{personal.phone}</span>
              <span>•</span>
              <a href={`mailto:${personal.email}`} style={{ color: "var(--accent-cyan)", textDecoration: "none" }}>
                {personal.email}
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "14px", flexWrap: "wrap", fontSize: "13px", color: "var(--text-muted)", marginTop: "6px", fontFamily: "var(--font-mono)" }}>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--accent-blue)", textDecoration: "none" }}>
                LinkedIn: {personal.linkedin}
              </a>
              <span>||</span>
              <a href={personal.github} target="_blank" rel="noreferrer" style={{ color: "var(--accent-blue)", textDecoration: "none" }}>
                GitHub: {personal.github}
              </a>
            </div>
          </div>

          {/* Objective */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, letterSpacing: "1px", color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "8px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "4px" }}>
              OBJECTIVE
            </h2>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--text-secondary)" }}>
              {careerObjective}
            </p>
          </div>

          {/* Education */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, letterSpacing: "1px", color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "4px" }}>
              EDUCATION
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {education.map((edu, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <strong style={{ fontSize: "15px", color: "var(--text-primary)" }}>{edu.degree}</strong>
                    <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{edu.institution}, {edu.location}</div>
                    {edu.score && <div style={{ fontSize: "13px", color: "var(--accent-emerald)", fontWeight: 600 }}>Percentage: {edu.score}</div>}
                    {edu.status && !edu.score && <div style={{ fontSize: "13px", color: "var(--accent-cyan)", fontStyle: "italic" }}>{edu.status}</div>}
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)" }}>{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Abilities */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, letterSpacing: "1px", color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "4px" }}>
              SKILLS & ABILITIES
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Programming Languages: </strong>
                <span style={{ color: "var(--text-secondary)" }}>C, C++, Java, Python, JavaScript</span>
              </div>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Web Development: </strong>
                <span style={{ color: "var(--text-secondary)" }}>HTML, CSS, React.js, Node.js, Express.js</span>
              </div>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Databases: </strong>
                <span style={{ color: "var(--text-secondary)" }}>MySQL, MongoDB, MSSQL (Having project experience)</span>
              </div>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Tools & Technologies: </strong>
                <span style={{ color: "var(--text-secondary)" }}>VS Code, IntelliJ, Git, GitHub, Figma, VirtualBox, Swagger</span>
              </div>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>DevOps & CI/CD: </strong>
                <span style={{ color: "var(--text-secondary)" }}>Docker, Jenkins</span>
              </div>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Soft Skills: </strong>
                <span style={{ color: "var(--text-secondary)" }}>Practical issue resolution, Strong team contributor, Absorbs information well, Eager to improve</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, letterSpacing: "1px", color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "4px" }}>
              EXPERIENCE
            </h2>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", marginBottom: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "var(--text-primary)" }}>
                    {exp.role} — {exp.company}
                  </strong>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)" }}>
                    [ {exp.duration} ]
                  </span>
                </div>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px", color: "var(--text-secondary)", fontSize: "13.5px" }}>
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, letterSpacing: "1px", color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "4px" }}>
              PROJECTS
            </h2>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", marginBottom: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "var(--text-primary)" }}>
                    {proj.title}
                  </strong>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)" }}>
                    [ {proj.date} ]
                  </span>
                </div>
                <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px", color: "var(--text-secondary)", fontSize: "13.5px" }}>
                  {proj.keyFeatures.map((kf, kfIdx) => (
                    <li key={kfIdx}>{kf}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Extra-Curricular */}
          <div>
            <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, letterSpacing: "1px", color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "12px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "4px" }}>
              EXTRA-CURRICULAR ACTIVITIES
            </h2>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px", color: "var(--text-secondary)", fontSize: "13.5px" }}>
              <li>Participated in cricket and volleyball tournaments. [ January 2026 ]</li>
              <li>Contributed to team activities and event organization. [ September 2025 ]</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Print Specific CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume, #printable-resume * {
            visibility: visible;
          }
          #printable-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: #fff !important;
            color: #000 !important;
            padding: 20px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeModal;
