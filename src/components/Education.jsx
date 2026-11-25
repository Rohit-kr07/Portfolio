import React from "react";
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import Interactive3DTiltCard from "./Interactive3DTiltCard";

const Education = () => {
  const { education } = portfolioData;

  return (
    <section
      id="education"
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
            05. ACADEMIC FOUNDATION
          </span>
          <h2 className="section-title">
            Education & Qualifications
          </h2>
          <p className="section-subtitle">
            Formal computer science degrees, foundational coursework, and academic milestones achieved.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {education.map((item, index) => (
            <Interactive3DTiltCard key={index} maxTilt={6}>
              <div
                className="glass-panel"
                style={{
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  borderLeft: index === 0 ? "4px solid var(--accent-cyan)" : "4px solid var(--accent-blue)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <GraduationCap size={22} color="var(--accent-cyan)" />
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.degree}
                      </h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flexWrap: "wrap",
                        fontSize: "15px",
                        color: "var(--accent-cyan)",
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <BookOpen size={16} />
                        {item.institution}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)" }}>
                        <MapPin size={15} />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    {item.score && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--accent-emerald)",
                          background: "var(--accent-emerald-glow)",
                          padding: "4px 12px",
                          borderRadius: "var(--radius-full)",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Award size={14} />
                        Score: {item.score}
                      </span>
                    )}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                        background: "var(--bg-surface-elevated)",
                        padding: "4px 12px",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Calendar size={13} />
                      {item.period}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: "14px", lineHeight: "1.65", color: "var(--text-secondary)" }}>
                  {item.details}
                </p>
              </div>
            </Interactive3DTiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
