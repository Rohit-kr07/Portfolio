import React, { useState } from "react";
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Terminal,
  Sparkles,
  Rotate3D,
  Zap,
  Code2
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { portfolioData } from "../data/portfolioData";
import Hero3DVisual from "./Hero3DVisual";
import Interactive3DTiltCard from "./Interactive3DTiltCard";

const Hero = ({ onOpenResume }) => {
  const { personal, stats } = portfolioData;
  const [heroView, setHeroView] = useState("3d"); // "3d" | "terminal"

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "120px",
        paddingBottom: "70px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "44px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Introductions & CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {/* Live Availability Badge & Micro-Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div className="status-pill">
                <span className="status-dot"></span>
                <span>{personal.status}</span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Zap size={13} color="var(--accent-amber)" />
                {personal.location}
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-cyan)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  marginBottom: "8px",
                }}
              >
                <Sparkles size={16} />
                Hi, my name is
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 6vw, 68px)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  lineHeight: 1.05,
                  letterSpacing: "-1.5px",
                  marginBottom: "12px",
                }}
              >
                {personal.name}.
              </h1>
              <h2
                className="gradient-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px, 4vw, 42px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.5px",
                }}
              >
                {personal.tagline}
              </h2>
            </div>

            {/* Bio Summary */}
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                maxWidth: "580px",
              }}
            >
              {personal.headline} Experienced in crafting interactive UI components with{" "}
              <strong style={{ color: "var(--accent-cyan)" }}>React.js</strong>, architecting 
              REST APIs with <strong style={{ color: "var(--accent-blue)" }}>Node.js & Express</strong>, 
              and optimizing database workflows with <strong style={{ color: "var(--accent-indigo)" }}>MSSQL & MongoDB</strong>.
            </p>

            {/* CTA Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", paddingTop: "6px" }}>
              <a href="#projects" className="btn-primary">
                Explore Projects
                <ArrowRight size={17} />
              </a>

              <button onClick={onOpenResume} className="btn-secondary">
                <Download size={16} />
                Download CV
              </button>

              <a href="#contact" className="btn-secondary">
                <Mail size={16} />
                Contact Me
              </a>
            </div>

            {/* Social Connectivity */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "4px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                Connect:
              </span>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="btn-icon"
                title="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-icon"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="btn-icon"
                title="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Showcase & Developer Persona Terminal */}
          <div style={{ position: "relative" }}>
            {/* Ambient Radial Backlight Glow */}
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "10%",
                width: "80%",
                height: "80%",
                background: "var(--gradient-brand)",
                filter: "blur(90px)",
                opacity: 0.18,
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />

            {/* Card Container with Mode Switcher */}
            <div
              className="glass-panel"
              style={{
                overflow: "hidden",
                border: "1px solid var(--border-glow)",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Header Bar with View Toggle */}
              <div
                style={{
                  background: "var(--bg-surface-elevated)",
                  padding: "10px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
                  <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
                </div>

                {/* View Switcher: 3D Core vs Terminal */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "rgba(0, 0, 0, 0.4)",
                    padding: "3px 6px",
                    borderRadius: "9999px",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <button
                    onClick={() => setHeroView("3d")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      border: "none",
                      borderRadius: "9999px",
                      padding: "4px 10px",
                      fontSize: "11px",
                      fontFamily: "var(--font-mono)",
                      cursor: "pointer",
                      background: heroView === "3d" ? "var(--gradient-brand)" : "transparent",
                      color: heroView === "3d" ? "#050b14" : "var(--text-muted)",
                      fontWeight: 700,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Rotate3D size={12} />
                    3D Interactive
                  </button>

                  <button
                    onClick={() => setHeroView("terminal")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      border: "none",
                      borderRadius: "9999px",
                      padding: "4px 10px",
                      fontSize: "11px",
                      fontFamily: "var(--font-mono)",
                      cursor: "pointer",
                      background: heroView === "terminal" ? "var(--gradient-brand)" : "transparent",
                      color: heroView === "terminal" ? "#050b14" : "var(--text-muted)",
                      fontWeight: 700,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Terminal size={12} />
                    Terminal
                  </button>
                </div>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--accent-emerald)",
                    background: "var(--accent-emerald-glow)",
                    padding: "2px 7px",
                    borderRadius: "4px",
                  }}
                >
                  Active
                </span>
              </div>

              {/* View Content: 3D Canvas vs Developer Terminal */}
              {heroView === "3d" ? (
                <div style={{ padding: "16px 10px 8px 10px", position: "relative" }}>
                  <Hero3DVisual />
                </div>
              ) : (
                <div
                  style={{
                    padding: "22px 24px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    lineHeight: "1.75",
                    color: "var(--text-secondary)",
                    backgroundColor: "rgba(9, 13, 22, 0.85)",
                    overflowX: "auto",
                    minHeight: "440px",
                  }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <span style={{ color: "var(--accent-cyan)" }}>$</span> curl -X GET https://api.rohitkumar.dev/v1/profile
                  </div>

                  <div style={{ color: "var(--text-muted)", fontStyle: "italic", marginBottom: "8px" }}>
                    {"// Verified Payload: Academic & Internship Records"}
                  </div>

                  <div>
                    <span style={{ color: "#f43f5e" }}>&#123;</span>
                    <div style={{ paddingLeft: "18px" }}>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"developer"</span>: <span style={{ color: "#a5f3fc" }}>"{personal.name}"</span>,
                      </div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"role"</span>: <span style={{ color: "#a5f3fc" }}>"Full Stack Developer"</span>,
                      </div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"currentEducation"</span>: <span style={{ color: "#fef08a" }}>"B.Tech CSE @ YBN University"</span>,
                      </div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"internship"</span>: <span style={{ color: "#86efac" }}>"Eimple Labs (Full Stack)"</span>,
                      </div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"stack"</span>: &#91;
                        <span style={{ color: "#e2e8f0" }}>"React.js", "Node.js", "Express.js", "MSSQL", "Docker"</span>&#93;,
                      </div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"recentProject"</span>: <span style={{ color: "#f472b6" }}>"ERP Web Application"</span>,
                      </div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"apiDocTesting"</span>: <span style={{ color: "#fef08a" }}>"Swagger / OpenAPI"</span>,
                      </div>
                      <div>
                        <span style={{ color: "#38bdf8" }}>"readyForHiring"</span>: <span style={{ color: "var(--accent-emerald)", fontWeight: 700 }}>true</span>
                      </div>
                    </div>
                    <span style={{ color: "#f43f5e" }}>&#125;</span>
                  </div>

                  {/* Terminal Prompt */}
                  <div style={{ marginTop: "18px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "var(--accent-emerald)" }}>➜</span>
                    <span style={{ color: "var(--accent-cyan)" }}>projects</span>
                    <span style={{ color: "var(--text-muted)" }}>git:(main)</span>
                    <span
                      style={{
                        width: "8px",
                        height: "15px",
                        background: "var(--accent-cyan)",
                        display: "inline-block",
                        animation: "pulseDot 1.2s infinite",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3D Tilt Quick Stats Grid Under Hero */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "60px",
          }}
        >
          {stats.map((stat, i) => (
            <Interactive3DTiltCard key={i} maxTilt={10}>
              <div
                className="glass-panel"
                style={{
                  padding: "22px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  borderLeft: "3px solid var(--accent-cyan)",
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "28px",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {stat.value}
                  </span>
                  <Code2 size={18} color="var(--accent-cyan)" opacity={0.6} />
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </Interactive3DTiltCard>
          ))}
        </div>
      </div>

      {/* Responsive layout styles for hero */}
      <style>{`
        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
