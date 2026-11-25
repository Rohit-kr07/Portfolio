import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  FileText, 
  ArrowRight
} from "lucide-react";

const Navbar = ({ theme, toggleTheme, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "skills", "experience", "projects", "education", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: isScrolled
          ? "var(--bg-glass)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        padding: isScrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand Logo */}
        <a
          href="#hero"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "var(--text-primary)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "var(--gradient-brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#050b14",
              fontWeight: 800,
              fontFamily: "var(--font-mono)",
              fontSize: "17px",
              boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
            }}
          >
            RK
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "18px",
                letterSpacing: "-0.5px",
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              ROHIT KUMAR
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--accent-cyan)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Full Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "4px",
            background: "var(--bg-surface)",
            padding: "6px 10px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-subtle)",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                  background: isActive ? "var(--bg-surface-elevated)" : "transparent",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  transition: "all 0.2s ease",
                  border: isActive ? "1px solid rgba(0, 229, 255, 0.2)" : "1px solid transparent",
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle, Resume & Mobile Menu Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="btn-icon"
            style={{ width: "38px", height: "38px" }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Resume CTA Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="btn-primary"
            style={{
              padding: "9px 18px",
              fontSize: "13px",
              display: "none",
            }}
            id="nav-resume-btn"
          >
            <FileText size={15} />
            Resume
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="btn-icon mobile-menu-btn"
            style={{ display: "inline-flex" }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--bg-card)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "20px 24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 20px 30px rgba(0,0,0,0.4)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--text-primary)",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: activeSection === link.href.substring(1) ? "var(--bg-surface-elevated)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>{link.label}</span>
              <ArrowRight size={16} color="var(--accent-cyan)" />
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className="btn-primary"
            style={{
              marginTop: "8px",
              justifyContent: "center",
              width: "100%",
              padding: "12px",
            }}
          >
            <FileText size={16} />
            View & Download Resume
          </button>
        </div>
      )}

      {/* Responsive Inline CSS rules for navbar elements */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          #nav-resume-btn {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
