import React from "react";
import { 
  Code, 
  Server, 
  Database, 
  Terminal, 
  Cpu, 
  GraduationCap, 
  MapPin, 
  Sparkles,
  Check
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import Interactive3DTiltCard from "./Interactive3DTiltCard";

const About = () => {
  const { personal, careerObjective, skills } = portfolioData;

  const developmentPrinciples = [
    {
      icon: <Code size={22} color="var(--accent-cyan)" />,
      title: "Modular Frontend Architecture",
      desc: "Creating reusable, maintainable React components with high visual polish, fluid responsiveness, and stateful clarity.",
    },
    {
      icon: <Server size={22} color="var(--accent-blue)" />,
      title: "Clean RESTful APIs",
      desc: "Designing secure, structured backend endpoints in Node.js & Express, thoroughly documented and validated via Swagger.",
    },
    {
      icon: <Database size={22} color="var(--accent-indigo)" />,
      title: "Relational & NoSQL Data",
      desc: "Handling structured MSSQL and MySQL schemas alongside agile MongoDB document models for reliable data transactions.",
    },
    {
      icon: <Cpu size={22} color="var(--accent-purple)" />,
      title: "DevOps & Pipeline Awareness",
      desc: "Streamlining application deployment workflows using Docker containerization and Jenkins automated build configurations.",
    },
  ];

  return (
    <section
      id="about"
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
            01. ABOUT ME
          </span>
          <h2 className="section-title">
            Passionate Developer Driven by Curiosity & Engineering Standards
          </h2>
          <p className="section-subtitle">
            Bridging frontend design, backend reliability, and DevOps workflows to craft impactful digital solutions.
          </p>
        </div>

        {/* Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "36px",
          }}
          className="about-grid"
        >
          {/* Left Column: Narrative & Objective */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Interactive3DTiltCard maxTilt={6}>
              <div
                className="glass-panel"
                style={{
                  padding: "32px",
                  borderLeft: "4px solid var(--accent-cyan)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: 700,
                    marginBottom: "14px",
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Terminal size={20} color="var(--accent-cyan)" />
                  Career Objective • {personal.name}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.75",
                    color: "var(--text-secondary)",
                  }}
                >
                  &ldquo;{careerObjective}&rdquo;
                </p>
              </div>
            </Interactive3DTiltCard>

            {/* Background Narrative */}
            <div className="glass-panel" style={{ padding: "32px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "16px",
                  color: "var(--text-primary)",
                }}
              >
                Who I Am
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.8",
                  color: "var(--text-secondary)",
                  marginBottom: "16px",
                }}
              >
                I am a dedicated software engineer based in <strong style={{ color: "var(--text-primary)" }}>{personal.location}</strong>. 
                Currently pursuing my <strong style={{ color: "var(--text-primary)" }}>B.Tech in Computer Science</strong> at YBN University, 
                I hold a solid academic background having completed my Diploma in CSE from Government Polytechnic Ranchi with an 
                impressive <strong style={{ color: "var(--accent-cyan)" }}>81.5% score</strong>.
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.8",
                  color: "var(--text-secondary)",
                }}
              >
                During my professional internship at <strong style={{ color: "var(--text-primary)" }}>Eimple Labs</strong>, I worked on 
                production-grade web applications, crafting modular UI components, integrating RESTful backend architectures with 
                MSSQL, and ensuring robust API documentation with Swagger. My goal is to continually elevate code quality, collaborate 
                closely within teams, and build solutions that matter.
              </p>
            </div>

            {/* Soft Skills Badges */}
            <div className="glass-panel" style={{ padding: "28px" }}>
              <h4
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--accent-cyan)",
                  marginBottom: "16px",
                }}
              >
                Key Strengths & Working Style
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "14px",
                }}
              >
                {skills.softSkills.map((soft, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      background: "var(--bg-surface)",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <Check size={18} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", display: "block" }}>
                        {soft.title}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        {soft.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Principles & Highlights */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              My Development Pillars
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {developmentPrinciples.map((item, index) => (
                <Interactive3DTiltCard key={index} maxTilt={6}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: "24px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "18px",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "var(--bg-surface-elevated)",
                        border: "1px solid var(--border-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          marginBottom: "6px",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "1.6",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Interactive3DTiltCard>
              ))}
            </div>

            {/* Quick Facts Card with 3D Tilt */}
            <Interactive3DTiltCard maxTilt={6}>
              <div
                className="glass-panel"
                style={{
                  padding: "24px",
                  background: "var(--gradient-accent)",
                  border: "1px solid var(--border-glow)",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  Quick Facts
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <MapPin size={16} color="var(--accent-cyan)" />
                    <span>Located in <strong>{personal.location}</strong> (Open to Relocation & Remote)</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <GraduationCap size={16} color="var(--accent-blue)" />
                    <span>B.Tech CSE (2024–2027) & Diploma CSE with <strong>81.5%</strong></span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Server size={16} color="var(--accent-indigo)" />
                    <span>Completed 1 Year Full Stack Internship at <strong>Eimple Labs</strong></span>
                  </li>
                </ul>
              </div>
            </Interactive3DTiltCard>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .about-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
