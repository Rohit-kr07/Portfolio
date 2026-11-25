import React from "react";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import Interactive3DTiltCard from "./Interactive3DTiltCard";

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: "50px" }}>
          <span className="section-badge">
            <Sparkles size={14} />
            03. CAREER MILESTONES
          </span>
          <h2 className="section-title">
            Professional Experience & Internships
          </h2>
          <p className="section-subtitle">
            Demonstrated engineering experience developing production web applications, backend APIs, and database integrations.
          </p>
        </div>

        {/* Experience Timeline */}
        <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {experience.map((exp, index) => (
              <Interactive3DTiltCard key={index} maxTilt={6}>
                <div
                  className="glass-panel"
                  style={{
                    padding: "36px",
                    position: "relative",
                    borderLeft: "4px solid var(--accent-cyan)",
                    height: "100%",
                  }}
                >
                  {/* Header Meta Info */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                          }}
                        >
                          {exp.role}
                        </h3>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "12px",
                            color: "var(--accent-cyan)",
                            background: "var(--accent-cyan-glow)",
                            padding: "3px 10px",
                            borderRadius: "var(--radius-full)",
                            border: "1px solid rgba(0, 229, 255, 0.3)",
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "var(--accent-cyan)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <Briefcase size={18} />
                          {exp.company}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          <Calendar size={15} />
                          {exp.duration}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          <MapPin size={15} />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <span className="status-pill" style={{ fontSize: "12px" }}>
                      Verified Internship Record
                    </span>
                  </div>

                  {/* Core Responsibilities */}
                  <div style={{ marginBottom: "24px" }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: "var(--text-secondary)",
                        marginBottom: "14px",
                      }}
                    >
                      Key Contributions & Engineering Impact:
                    </h4>
                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {exp.highlights.map((point, pIndex) => (
                        <li
                          key={pIndex}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            fontSize: "15px",
                            lineHeight: "1.65",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <CheckCircle2
                            size={18}
                            color="var(--accent-cyan)"
                            style={{ flexShrink: 0, marginTop: "3px" }}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Used Pills */}
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: "var(--text-muted)",
                        marginBottom: "10px",
                      }}
                    >
                      Stack Utilized:
                    </h4>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {exp.technologies.map((tech, tIndex) => (
                        <span
                          key={tIndex}
                          style={{
                            fontSize: "13px",
                            fontFamily: "var(--font-mono)",
                            background: "var(--bg-surface-elevated)",
                            color: "var(--text-primary)",
                            padding: "5px 12px",
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Interactive3DTiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
