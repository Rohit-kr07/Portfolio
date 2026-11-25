import React, { useState } from "react";
import { 
  Terminal, 
  Layers, 
  Server, 
  Database, 
  Sparkles, 
  CheckCircle,
  ExternalLink,
  Code2
} from "lucide-react";
import { Github } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import Interactive3DTiltCard from "./Interactive3DTiltCard";

const Projects = () => {
  const { projects } = portfolioData;
  const project = projects[0]; // ERP Web Application

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedApiEndpoint, setSelectedApiEndpoint] = useState(0);

  const apiEndpoints = [
    {
      method: "GET",
      path: "/api/v1/erp/modules",
      summary: "List all accessible ERP modules & permission roles",
      status: 200,
      response: {
        status: "success",
        timestamp: "2026-02-18T10:30:00Z",
        modules: [
          { id: 1, name: "Employee Directory", status: "active", permissions: ["read", "write"] },
          { id: 2, name: "Resource Allocation", status: "active", permissions: ["admin"] },
          { id: 3, name: "Financial Ledger & Invoicing", status: "syncing", permissions: ["finance"] },
        ],
      },
    },
    {
      method: "POST",
      path: "/api/v1/erp/auth/session",
      summary: "Authenticate user and issue verified token",
      status: 201,
      response: {
        status: "authenticated",
        role: "FullStackDeveloper",
        tokenType: "Bearer",
        expiresIn: "8h",
        user: { name: "Rohit Kumar", email: "rohitkrmodi07@gmail.com" },
      },
    },
    {
      method: "GET",
      path: "/api/v1/erp/analytics/summary",
      summary: "Aggregate operational metrics & database transactions",
      status: 200,
      response: {
        totalRecords: 14250,
        queryExecutionAvgMs: 14.2,
        cacheHitRate: "94.6%",
        databaseEngine: "MSSQL / MySQL Relational Cluster",
      },
    },
  ];

  return (
    <section
      id="projects"
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
            04. FEATURED WORK
          </span>
          <h2 className="section-title">
            Enterprise Application Engineering
          </h2>
          <p className="section-subtitle">
            Flagship full-stack system engineered with component-driven React architecture, Node.js REST API services, and Swagger documentation.
          </p>
        </div>

        {/* Flagship Project Card with 3D Tilt */}
        <Interactive3DTiltCard maxTilt={5} scale={1.01}>
          <div
            className="glass-panel"
            style={{
              overflow: "hidden",
              border: "1px solid var(--border-glow)",
              boxShadow: "0 20px 40px -15px rgba(0, 229, 255, 0.15)",
            }}
          >
            {/* Card Top Banner / Meta */}
            <div
              style={{
                padding: "32px 36px 24px",
                background: "var(--bg-surface-elevated)",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span className="status-pill" style={{ fontSize: "11px", padding: "4px 10px" }}>
                    <span className="status-dot"></span>
                    {project.status || "Production Ready"}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                    }}
                  >
                    Completed: {project.date}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 4vw, 32px)",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.5px",
                    marginBottom: "6px",
                  }}
                >
                  {project.title}
                </h3>
                <p style={{ fontSize: "16px", color: "var(--accent-cyan)", fontWeight: 600 }}>
                  {project.tagline}
                </p>
              </div>

              {/* Links and Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <a
                  href={project.githubUrl || "https://github.com/Rohit-kr07"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: "10px 18px", fontSize: "14px" }}
                >
                  <Github size={16} />
                  GitHub Repository
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Interactive Navigation Tabs for Case Study */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
                overflowX: "auto",
                padding: "0 24px",
              }}
            >
              {[
                { id: "overview", label: "Overview & Features", icon: <Layers size={16} /> },
                { id: "architecture", label: "System Architecture", icon: <Server size={16} /> },
                { id: "swagger", label: "Live Swagger API Simulator", icon: <Terminal size={16} /> },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "16px 20px",
                      background: "transparent",
                      border: "none",
                      borderBottom: isActive ? "3px solid var(--accent-cyan)" : "3px solid transparent",
                      color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Display */}
            <div style={{ padding: "36px 28px" }}>
              {/* 1. OVERVIEW & FEATURES */}
              {activeTab === "overview" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }} className="project-detail-grid">
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "12px",
                      }}
                    >
                      Project Scope & Engineering Role
                    </h4>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.75",
                        color: "var(--text-secondary)",
                        marginBottom: "20px",
                      }}
                    >
                      {project.description}
                    </p>

                    <div
                      style={{
                        background: "var(--bg-surface-elevated)",
                        padding: "18px 22px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-subtle)",
                        marginBottom: "24px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          color: "var(--accent-cyan)",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        Assigned Responsibility
                      </span>
                      <strong style={{ fontSize: "16px", color: "var(--text-primary)" }}>
                        {project.role}
                      </strong>
                    </div>

                    <h4
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: "var(--text-muted)",
                        marginBottom: "12px",
                      }}
                    >
                      Key Accomplishments:
                    </h4>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {project.keyFeatures.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            fontSize: "14px",
                            lineHeight: "1.6",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <CheckCircle size={16} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: "3px" }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right side: Tech tags and architectural pillars */}
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "14px",
                      }}
                    >
                      Technologies & Architecture Stack
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                      {project.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "13px",
                            background: "var(--bg-surface-elevated)",
                            color: "var(--accent-cyan)",
                            padding: "6px 14px",
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Visual Workflow Cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div
                        style={{
                          padding: "16px 18px",
                          background: "var(--bg-surface)",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                          <Layers size={17} color="var(--accent-cyan)" />
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                            React UI Layer
                          </span>
                        </div>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          Reusable, state-managed components designed with responsive layouts for high usability across viewports.
                        </p>
                      </div>

                      <div
                        style={{
                          padding: "16px 18px",
                          background: "var(--bg-surface)",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                          <Server size={17} color="var(--accent-blue)" />
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                            Node & Express Backend
                          </span>
                        </div>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          Clean RESTful routing, input sanitization, error propagation, and database connection pools.
                        </p>
                      </div>

                      <div
                        style={{
                          padding: "16px 18px",
                          background: "var(--bg-surface)",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                          <Database size={17} color="var(--accent-indigo)" />
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                            Relational Data Handling
                          </span>
                        </div>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          Schema design and relational mapping ensuring low query latency and consistent data records.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. ARCHITECTURE DIAGRAM / SPECIFICATION */}
              {activeTab === "architecture" && (
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "16px",
                    }}
                  >
                    System Flow & Architectural Pipeline
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "16px",
                      marginBottom: "28px",
                    }}
                  >
                    <Interactive3DTiltCard maxTilt={8}>
                      <div
                        style={{
                          background: "var(--bg-surface)",
                          padding: "24px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-subtle)",
                          textAlign: "center",
                          height: "100%",
                        }}
                      >
                        <span style={{ fontSize: "28px", display: "block", marginBottom: "10px" }}>💻</span>
                        <h5 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                          React UI Client
                        </h5>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          Reusable view components, Axios/Fetch REST requests, and interactive user state.
                        </p>
                      </div>
                    </Interactive3DTiltCard>

                    <Interactive3DTiltCard maxTilt={8}>
                      <div
                        style={{
                          background: "var(--bg-surface)",
                          padding: "24px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-subtle)",
                          textAlign: "center",
                          height: "100%",
                        }}
                      >
                        <span style={{ fontSize: "28px", display: "block", marginBottom: "10px" }}>⚡</span>
                        <h5 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                          Express API Gateway
                        </h5>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          Routing middleware, request authentication, validation, and JSON formatting.
                        </p>
                      </div>
                    </Interactive3DTiltCard>

                    <Interactive3DTiltCard maxTilt={8}>
                      <div
                        style={{
                          background: "var(--bg-surface)",
                          padding: "24px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-subtle)",
                          textAlign: "center",
                          height: "100%",
                        }}
                      >
                        <span style={{ fontSize: "28px", display: "block", marginBottom: "10px" }}>🗄️</span>
                        <h5 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                          Relational Database
                        </h5>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          MSSQL / MySQL relational tables with foreign keys and transactional operations.
                        </p>
                      </div>
                    </Interactive3DTiltCard>

                    <Interactive3DTiltCard maxTilt={8}>
                      <div
                        style={{
                          background: "var(--bg-surface)",
                          padding: "24px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-subtle)",
                          textAlign: "center",
                          height: "100%",
                        }}
                      >
                        <span style={{ fontSize: "28px", display: "block", marginBottom: "10px" }}>📑</span>
                        <h5 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                          Swagger OpenAPI
                        </h5>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                          Contract-first API documentation for developer testing and endpoint verification.
                        </p>
                      </div>
                    </Interactive3DTiltCard>
                  </div>
                </div>
              )}

              {/* 3. INTERACTIVE SWAGGER API SIMULATOR */}
              {activeTab === "swagger" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        Swagger / OpenAPI Endpoint Inspector
                      </h4>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                        Click any documented endpoint below to simulate the REST API request/response workflow tested during development.
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--accent-cyan)",
                        background: "var(--accent-cyan-glow)",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-full)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Code2 size={12} />
                      OpenAPI Spec 3.0
                    </span>
                  </div>

                  {/* Endpoint Selector Tabs */}
                  <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
                    {apiEndpoints.map((ep, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedApiEndpoint(i)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: selectedApiEndpoint === i ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)",
                          background: selectedApiEndpoint === i ? "var(--bg-surface-elevated)" : "var(--bg-surface)",
                          cursor: "pointer",
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          color: "var(--text-primary)",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            color: ep.method === "GET" ? "var(--accent-blue)" : "var(--accent-emerald)",
                          }}
                        >
                          {ep.method}
                        </span>
                        <span>{ep.path}</span>
                      </button>
                    ))}
                  </div>

                  {/* Live Output Box */}
                  <div
                    style={{
                      background: "#080c14",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-subtle)",
                      overflow: "hidden",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 16px",
                        background: "rgba(255, 255, 255, 0.03)",
                        borderBottom: "1px solid var(--border-subtle)",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        color: "var(--text-muted)",
                      }}
                    >
                      <span>{apiEndpoints[selectedApiEndpoint].summary}</span>
                      <span style={{ color: "var(--accent-emerald)" }}>
                        Response: {apiEndpoints[selectedApiEndpoint].status} OK
                      </span>
                    </div>
                    <pre
                      style={{
                        padding: "18px 20px",
                        margin: 0,
                        fontSize: "13px",
                        lineHeight: "1.6",
                        color: "#a5f3fc",
                        overflowX: "auto",
                      }}
                    >
                      {JSON.stringify(apiEndpoints[selectedApiEndpoint].response, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Interactive3DTiltCard>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .project-detail-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
