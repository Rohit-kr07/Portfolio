import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { portfolioData } from "../data/portfolioData";

const Footer = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "60px 0 30px",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            paddingBottom: "40px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          {/* Brand & Tagline */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "var(--gradient-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#050b14",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                }}
              >
                RK
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                }}
              >
                ROHIT KUMAR
              </span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "420px" }}>
              Full Stack Software Developer specializing in React, Node.js, REST APIs, and DevOps practices.
            </p>
          </div>

          {/* Quick Footer Links */}
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <a href="#about" style={{ textDecoration: "none", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 600 }}>
              About
            </a>
            <a href="#skills" style={{ textDecoration: "none", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 600 }}>
              Skills
            </a>
            <a href="#experience" style={{ textDecoration: "none", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 600 }}>
              Experience
            </a>
            <a href="#projects" style={{ textDecoration: "none", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 600 }}>
              Projects
            </a>
            <a href="#education" style={{ textDecoration: "none", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 600 }}>
              Education
            </a>
            <a href="#contact" style={{ textDecoration: "none", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 600 }}>
              Contact
            </a>
          </div>

          {/* Back to Top & Socials */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-icon"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="btn-icon"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <button
              onClick={scrollToTop}
              className="btn-icon"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            paddingTop: "24px",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          <span>© {new Date().getFullYear()} Rohit Kumar. All rights reserved.</span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            Engineered with React.js, WebGL Vector 3D & Modern UI Standards
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
