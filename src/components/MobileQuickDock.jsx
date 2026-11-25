import React, { useState, useEffect } from "react";
import { 
  Home, 
  Cpu, 
  FolderGit2, 
  FileText, 
  Mail 
} from "lucide-react";

export default function MobileQuickDock({ onOpenResume }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide slightly when scrolling down deeply, show on scroll up
      if (currentScrollY > 300 && currentScrollY > lastScrollY + 15) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 8 || currentScrollY < 150) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Section spy
      const sections = ["hero", "skills", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className="mobile-quick-dock"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: `translateX(-50%) translateY(${isVisible ? "0px" : "100px"})`,
        opacity: isVisible ? 1 : 0,
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 999,
        display: "none", // enabled via media query in index.css
        alignItems: "center",
        gap: "6px",
        background: "rgba(10, 15, 26, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        borderRadius: "9999px",
        padding: "8px 14px",
        boxShadow: "0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.15)",
      }}
    >
      <a
        href="#hero"
        title="Hero 3D"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 10px",
          borderRadius: "9999px",
          color: activeSection === "hero" ? "#00f0ff" : "var(--text-muted)",
          textDecoration: "none",
          background: activeSection === "hero" ? "rgba(0, 240, 255, 0.12)" : "transparent",
          transition: "all 0.2s ease",
        }}
      >
        <Home size={18} />
        <span style={{ fontSize: "10px", fontWeight: 600 }}>Home</span>
      </a>

      <a
        href="#skills"
        title="Skills"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 10px",
          borderRadius: "9999px",
          color: activeSection === "skills" ? "#00f0ff" : "var(--text-muted)",
          textDecoration: "none",
          background: activeSection === "skills" ? "rgba(0, 240, 255, 0.12)" : "transparent",
          transition: "all 0.2s ease",
        }}
      >
        <Cpu size={18} />
        <span style={{ fontSize: "10px", fontWeight: 600 }}>Skills</span>
      </a>

      <a
        href="#projects"
        title="Projects"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 10px",
          borderRadius: "9999px",
          color: activeSection === "projects" ? "#00f0ff" : "var(--text-muted)",
          textDecoration: "none",
          background: activeSection === "projects" ? "rgba(0, 240, 255, 0.12)" : "transparent",
          transition: "all 0.2s ease",
        }}
      >
        <FolderGit2 size={18} />
        <span style={{ fontSize: "10px", fontWeight: 600 }}>Work</span>
      </a>

      <button
        onClick={onOpenResume}
        title="Open Resume"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 10px",
          borderRadius: "9999px",
          color: "#00f5a0",
          background: "rgba(0, 245, 160, 0.12)",
          border: "1px solid rgba(0, 245, 160, 0.3)",
          cursor: "pointer",
        }}
      >
        <FileText size={18} />
        <span style={{ fontSize: "10px", fontWeight: 700 }}>CV</span>
      </button>

      <a
        href="#contact"
        title="Contact"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 10px",
          borderRadius: "9999px",
          color: activeSection === "contact" ? "#00f0ff" : "var(--text-muted)",
          textDecoration: "none",
          background: activeSection === "contact" ? "rgba(0, 240, 255, 0.12)" : "transparent",
          transition: "all 0.2s ease",
        }}
      >
        <Mail size={18} />
        <span style={{ fontSize: "10px", fontWeight: 600 }}>Contact</span>
      </a>
    </nav>
  );
}
