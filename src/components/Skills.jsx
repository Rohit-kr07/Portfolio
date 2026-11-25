import React, { useState } from "react";
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  GitBranch, 
  Sparkles,
  Layers,
  Cpu,
  CheckCircle,
  FileCode,
  Orbit
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import Interactive3DTechOrbit from "./Interactive3DTechOrbit";
import Interactive3DTiltCard from "./Interactive3DTiltCard";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("orbit"); // "orbit" | "matrix"
  const { skills } = portfolioData;

  const categories = [
    { id: "all", label: "All Skills", icon: <Layers size={15} /> },
    { id: "frontend", label: "Frontend", icon: <Layout size={15} /> },
    { id: "backend", label: "Backend", icon: <Server size={15} /> },
    { id: "databases", label: "Databases", icon: <Database size={15} /> },
    { id: "devops", label: "DevOps & CI/CD", icon: <Cpu size={15} /> },
    { id: "languages", label: "Languages", icon: <Code2 size={15} /> },
    { id: "tools", label: "Tools", icon: <GitBranch size={15} /> },
  ];

  return (
    <section
      id="skills"
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "40px" }}>
          <div>
            <span className="section-badge">
              <Sparkles size={14} />
              02. TECHNICAL ARSENAL
            </span>
            <h2 className="section-title">
              Skills & Interactive Tech Universe
            </h2>
            <p className="section-subtitle">
              Interactive 3D constellation and verified breakdown across full-stack engineering, database systems, and DevOps pipelines.
            </p>
          </div>

          {/* Mode Switcher */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              padding: "4px 8px",
              borderRadius: "9999px",
            }}
          >
            <button
              onClick={() => setViewMode("orbit")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                background: viewMode === "orbit" ? "var(--gradient-brand)" : "transparent",
                color: viewMode === "orbit" ? "#050b14" : "var(--text-muted)",
                transition: "all 0.2s ease",
              }}
            >
              <Orbit size={14} />
              3D Constellation
            </button>

            <button
              onClick={() => setViewMode("matrix")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                background: viewMode === "matrix" ? "var(--gradient-brand)" : "transparent",
                color: viewMode === "matrix" ? "#050b14" : "var(--text-muted)",
                transition: "all 0.2s ease",
              }}
            >
              <Layers size={14} />
              Detailed Matrix
            </button>
          </div>
        </div>

        {/* 3D Tech Orbit Component */}
        {viewMode === "orbit" && (
          <div style={{ marginBottom: "50px" }}>
            <Interactive3DTechOrbit />
          </div>
        )}

        {/* Category Filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "35px",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: isActive
                    ? "1px solid var(--accent-cyan)"
                    : "1px solid var(--border-subtle)",
                  background: isActive
                    ? "var(--accent-cyan-glow)"
                    : "var(--bg-surface)",
                  color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skill Grids with 3D Tilt */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* Frontend Section */}
          {(activeTab === "all" || activeTab === "frontend") && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <Layout size={20} color="var(--accent-cyan)" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                  Frontend Architecture
                </h3>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {skills.frontend.map((skill, index) => (
                  <Interactive3DTiltCard key={index} maxTilt={8}>
                    <div className="glass-panel" style={{ padding: "22px", height: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>{skill.name}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--accent-cyan)" }}>{skill.level}%</span>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "var(--bg-surface-elevated)", borderRadius: "3px", overflow: "hidden", marginBottom: "12px" }}>
                        <div
                          style={{
                            width: `${skill.level}%`,
                            height: "100%",
                            background: "var(--gradient-brand)",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{skill.desc}</p>
                    </div>
                  </Interactive3DTiltCard>
                ))}
              </div>
            </div>
          )}

          {/* Backend Section */}
          {(activeTab === "all" || activeTab === "backend") && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <Server size={20} color="var(--accent-blue)" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                  Backend Engineering & APIs
                </h3>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {skills.backend.map((skill, index) => (
                  <Interactive3DTiltCard key={index} maxTilt={8}>
                    <div className="glass-panel" style={{ padding: "22px", height: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>{skill.name}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--accent-blue)" }}>{skill.level}%</span>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "var(--bg-surface-elevated)", borderRadius: "3px", overflow: "hidden", marginBottom: "12px" }}>
                        <div
                          style={{
                            width: `${skill.level}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{skill.desc}</p>
                    </div>
                  </Interactive3DTiltCard>
                ))}
              </div>
            </div>
          )}

          {/* Databases Section */}
          {(activeTab === "all" || activeTab === "databases") && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <Database size={20} color="var(--accent-indigo)" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                  Databases & Data Handling
                </h3>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {skills.databases.map((skill, index) => (
                  <Interactive3DTiltCard key={index} maxTilt={8}>
                    <div className="glass-panel" style={{ padding: "22px", height: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>{skill.name}</span>
                        {skill.name === "MSSQL" ? (
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-emerald)", background: "var(--accent-emerald-glow)", padding: "2px 8px", borderRadius: "4px" }}>
                            Project Exp
                          </span>
                        ) : (
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--accent-indigo)" }}>{skill.level}%</span>
                        )}
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "var(--bg-surface-elevated)", borderRadius: "3px", overflow: "hidden", marginBottom: "12px" }}>
                        <div
                          style={{
                            width: `${skill.level}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{skill.desc}</p>
                    </div>
                  </Interactive3DTiltCard>
                ))}
              </div>
            </div>
          )}

          {/* DevOps & CI/CD */}
          {(activeTab === "all" || activeTab === "devops") && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <Cpu size={20} color="var(--accent-emerald)" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                  DevOps & Continuous Integration
                </h3>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {skills.devops.map((skill, index) => (
                  <Interactive3DTiltCard key={index} maxTilt={8}>
                    <div className="glass-panel" style={{ padding: "22px", height: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>{skill.name}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--accent-emerald)" }}>{skill.level}%</span>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "var(--bg-surface-elevated)", borderRadius: "3px", overflow: "hidden", marginBottom: "12px" }}>
                        <div
                          style={{
                            width: `${skill.level}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #10b981, #06b6d4)",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{skill.desc}</p>
                    </div>
                  </Interactive3DTiltCard>
                ))}
              </div>
            </div>
          )}

          {/* Programming Languages */}
          {(activeTab === "all" || activeTab === "languages") && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <Code2 size={20} color="var(--accent-purple)" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                  Programming Languages
                </h3>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "16px",
                }}
              >
                {skills.languages.map((lang, index) => (
                  <Interactive3DTiltCard key={index} maxTilt={8}>
                    <div
                      className="glass-panel"
                      style={{
                        padding: "18px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <FileCode size={18} color="var(--accent-purple)" />
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>{lang.name}</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>
                        {lang.level}%
                      </span>
                    </div>
                  </Interactive3DTiltCard>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Workflow */}
          {(activeTab === "all" || activeTab === "tools") && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <GitBranch size={20} color="var(--accent-cyan)" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                  Tools & Development Ecosystem
                </h3>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {skills.tools.map((tool, index) => (
                  <Interactive3DTiltCard key={index} maxTilt={8}>
                    <div className="glass-panel" style={{ padding: "20px", height: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>{tool.name}</span>
                        <CheckCircle size={15} color="var(--accent-cyan)" />
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{tool.desc}</p>
                    </div>
                  </Interactive3DTiltCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
