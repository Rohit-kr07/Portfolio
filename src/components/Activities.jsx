import React from "react";
import { Trophy, Users, Calendar, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Activities = () => {
  const { activities } = portfolioData;

  return (
    <section
      id="activities"
      style={{
        padding: "80px 0",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="section-badge">
            <Sparkles size={14} />
            06. LEADERSHIP & INTERESTS
          </span>
          <h2 className="section-title">
            Extracurricular Activities & Team Coordination
          </h2>
          <p className="section-subtitle">
            Demonstrating active teamwork, organizational commitment, and
            sportsmanship beyond software development.
          </p>
        </div>

        {/* Activities Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {activities.map((act, index) => (
            <div
              key={index}
              className="glass-panel glass-panel-hover"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "var(--bg-surface-elevated)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {act.type.includes("Sports") ? (
                    <Trophy size={22} color="var(--accent-cyan)" />
                  ) : (
                    <Users size={22} color="var(--accent-indigo)" />
                  )}
                </div>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Calendar size={13} />
                  {act.date}
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--accent-cyan)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  {act.type}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "19px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {act.title}
                </h3>
              </div>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "var(--text-secondary)",
                }}
              >
                {act.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
