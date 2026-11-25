import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  Sparkles,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { portfolioData } from "../data/portfolioData";

const Contact = () => {
  const { personal } = portfolioData;

  const [copiedType, setCopiedType] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopy = (text, type) => {
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    } catch (err) {
      // ignore
    }
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
          formState.subject || "Portfolio Inquiry from " + formState.name
        )}&body=${encodeURIComponent(
          `Hi Rohit,\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email})`
        )}`;
        window.location.href = mailtoUrl;
      }, 800);
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "100px 0 120px",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: "50px" }}>
          <span className="section-badge">
            <Sparkles size={14} />
            07. GET IN TOUCH
          </span>
          <h2 className="section-title">
            {"Let's Discuss Opportunities & Engineering"}
          </h2>
          <p className="section-subtitle">
            Whether you have an open full-time position, internship opportunity, or want to discuss a full-stack project, my inbox is always open.
          </p>
        </div>

        {/* Contact Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "36px",
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Contact Info & Socials */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Email Card with Copy Button */}
            <div
              className="glass-panel"
              style={{
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "var(--bg-surface-elevated)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-cyan)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    EMAIL ADDRESS
                  </span>
                  <a
                    href={`mailto:${personal.email}`}
                    style={{
                      display: "block",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    {personal.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(personal.email, "email")}
                className="btn-secondary"
                style={{ padding: "8px 16px", fontSize: "13px" }}
              >
                {copiedType === "email" ? (
                  <>
                    <Check size={14} color="var(--accent-emerald)" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Phone Card with Copy Button */}
            <div
              className="glass-panel"
              style={{
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "var(--bg-surface-elevated)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-blue)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    DIRECT PHONE
                  </span>
                  <a
                    href={`tel:${personal.phone}`}
                    style={{
                      display: "block",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    {personal.phone}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(personal.phone, "phone")}
                className="btn-secondary"
                style={{ padding: "8px 16px", fontSize: "13px" }}
              >
                {copiedType === "phone" ? (
                  <>
                    <Check size={14} color="var(--accent-emerald)" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Location Card */}
            <div
              className="glass-panel"
              style={{
                padding: "24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "12px",
                  background: "var(--bg-surface-elevated)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-indigo)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  LOCATION
                </span>
                <span style={{ display: "block", fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
                  {personal.location}
                </span>
              </div>
            </div>

            {/* Social Links Panel */}
            <div
              className="glass-panel"
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                PROFESSIONAL NETWORKS
              </span>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ flex: "1 1 180px", justifyContent: "center" }}
                >
                  <Linkedin size={17} color="var(--accent-blue)" />
                  LinkedIn Profile
                  <ExternalLink size={14} />
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ flex: "1 1 180px", justifyContent: "center" }}
                >
                  <Github size={17} color="var(--accent-cyan)" />
                  GitHub Repos
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="glass-panel" style={{ padding: "36px" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <MessageSquare size={20} color="var(--accent-cyan)" />
              Send a Direct Message
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Leave a note with your project or job requirements. I reply within 24 hours.
            </p>

            {formSubmitted ? (
              <div
                style={{
                  background: "var(--accent-emerald-glow)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  borderRadius: "var(--radius-md)",
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "var(--accent-emerald)",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Check size={28} />
                </div>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                  Message Drafted Successfully!
                </h4>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "420px", margin: "0 auto" }}>
                  Opening your default email client to send this message directly to {personal.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@company.com"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Full Stack Opportunity / Technical Interview"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                    }}
                  >
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hello Rohit, we reviewed your ERP web app and React/Node experience..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "14px",
                    marginTop: "6px",
                  }}
                >
                  <Send size={16} />
                  Send Message Directly
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .contact-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
