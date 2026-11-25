import React, { useRef, useState, useEffect, useCallback } from "react";
import { Rotate3D, Cpu } from "lucide-react";

export default function Interactive3DTechOrbit() {
  const containerRef = useRef(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const techs = [
    { name: "React.js", category: "Frontend", level: "90%", color: "#00f0ff", icon: "⚛️" },
    { name: "Node.js", category: "Backend", level: "85%", color: "#22c55e", icon: "🟢" },
    { name: "Express.js", category: "Backend", level: "88%", color: "#cbd5e1", icon: "⚡" },
    { name: "MSSQL", category: "Database", level: "86%", color: "#ef4444", icon: "🗄️" },
    { name: "Docker", category: "DevOps", level: "78%", color: "#38bdf8", icon: "🐳" },
    { name: "Jenkins", category: "CI/CD", level: "75%", color: "#f59e0b", icon: "⚙️" },
    { name: "MongoDB", category: "Database", level: "80%", color: "#10b981", icon: "🍃" },
    { name: "JavaScript", category: "Core", level: "90%", color: "#facc15", icon: "📜" },
    { name: "Swagger", category: "API Docs", level: "90%", color: "#84cc16", icon: "📑" },
    { name: "Git / GitHub", category: "Version Control", level: "90%", color: "#f97316", icon: "🐙" },
    { name: "Python", category: "Language", level: "80%", color: "#60a5fa", icon: "🐍" },
    { name: "MySQL", category: "Database", level: "85%", color: "#0ea5e9", icon: "🐬" },
  ];

  // 3D Orbit Angles and physics
  const orbitRef = useRef({
    angleY: 0,
    angleX: 0.25,
    velY: 0.004,
    velX: 0.001,
    isPointerDown: false,
    startX: 0,
    startY: 0,
  });

  const [positions, setPositions] = useState([]);

  // Distribute items uniformly on a 3D sphere (Fibonacci sphere distribution)
  const sphereNodes = useRef(
    techs.map((tech, i) => {
      const n = techs.length;
      const phi = Math.acos(1 - 2 * (i + 0.5) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const radius = 170; // 3D sphere radius

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi) * 0.75; // flatten slightly vertically
      const z = radius * Math.sin(phi) * Math.sin(theta);

      return { tech, x, y, z };
    })
  ).current;

  // Animation frame loop
  useEffect(() => {
    let animId;

    const update3DPositions = () => {
      const orbit = orbitRef.current;

      if (!orbit.isPointerDown) {
        orbit.angleY += orbit.velY;
        orbit.angleX += orbit.velX;
      }

      const cosY = Math.cos(orbit.angleY);
      const sinY = Math.sin(orbit.angleY);
      const cosX = Math.cos(orbit.angleX);
      const sinX = Math.sin(orbit.angleX);

      const computed = sphereNodes.map(({ tech, x, y, z }) => {
        // Rotate around Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate around X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Scale and opacity according to Z depth
        const radius = 170;
        const depthNorm = (z2 + radius) / (2 * radius); // 0 to 1
        const scale = 0.7 + depthNorm * 0.45; // 0.7 to 1.15
        const opacity = Math.max(0.25, Math.min(1, 0.35 + depthNorm * 0.65));
        const zIndex = Math.floor(depthNorm * 100);

        return {
          tech,
          x: x1,
          y: y2,
          z: z2,
          scale,
          opacity,
          zIndex,
        };
      });

      // Sort by Z index for clean layering
      computed.sort((a, b) => a.z - b.z);

      setPositions(computed);
      animId = requestAnimationFrame(update3DPositions);
    };

    animId = requestAnimationFrame(update3DPositions);
    return () => cancelAnimationFrame(animId);
  }, [sphereNodes]);

  // Pointer interactions
  const handlePointerDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsInteracting(true);
    orbitRef.current.isPointerDown = true;
    orbitRef.current.startX = clientX;
    orbitRef.current.startY = clientY;
  };

  const handlePointerMove = useCallback((e) => {
    if (!orbitRef.current.isPointerDown) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - orbitRef.current.startX;
    const deltaY = clientY - orbitRef.current.startY;

    orbitRef.current.angleY += deltaX * 0.007;
    orbitRef.current.angleX -= deltaY * 0.007;

    orbitRef.current.velY = deltaX * 0.003;
    orbitRef.current.velX = -deltaY * 0.003;

    orbitRef.current.startX = clientX;
    orbitRef.current.startY = clientY;
  }, []);

  const handlePointerUp = () => {
    setIsInteracting(false);
    orbitRef.current.isPointerDown = false;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: "20px 0",
      }}
    >
      {/* 3D Sphere Stage */}
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          height: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          touchAction: "none",
          cursor: isInteracting ? "grabbing" : "grab",
        }}
      >
        {/* Core Pulsing Ambient Light */}
        <div
          style={{
            position: "absolute",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, rgba(112, 0, 255, 0.1) 60%, transparent 80%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        {/* Center Tech Core Emblem */}
        <div
          style={{
            position: "absolute",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "rgba(13, 20, 36, 0.85)",
            border: "1px solid rgba(0, 240, 255, 0.4)",
            boxShadow: "0 0 25px rgba(0, 240, 255, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            backdropFilter: "blur(10px)",
          }}
        >
          <Cpu size={24} color="#00f0ff" />
        </div>

        {/* 3D Orbiting Technology Nodes */}
        {positions.map(({ tech, x, y, scale, opacity, zIndex }) => {
          const isSelected = selectedTech?.name === tech.name;

          return (
            <div
              key={tech.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTech(tech);
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`,
                zIndex,
                opacity,
                filter: opacity < 0.6 ? `blur(${((1 - opacity) * 1.5).toFixed(1)}px)` : "none",
                transition: "opacity 0.1s linear, filter 0.1s linear",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "7px 14px",
                  borderRadius: "9999px",
                  background: isSelected
                    ? "rgba(0, 240, 255, 0.25)"
                    : "rgba(15, 23, 42, 0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: isSelected
                    ? `2px solid ${tech.color}`
                    : "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: isSelected
                    ? `0 0 20px ${tech.color}`
                    : "0 6px 18px rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                <span>{tech.icon}</span>
                <span>{tech.name}</span>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    color: tech.color,
                    background: "rgba(255, 255, 255, 0.08)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  {tech.level}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbit Helper & Detail Inspector */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "520px",
          padding: "10px 18px",
          borderRadius: "14px",
          background: "rgba(14, 20, 34, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Rotate3D size={15} color="#00f0ff" />
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            Swipe / Drag 3D Tech Orbit
          </span>
        </div>

        {selectedTech ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: selectedTech.color }}>
              {selectedTech.name}
            </span>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              ({selectedTech.category}) • {selectedTech.level}
            </span>
          </div>
        ) : (
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Tap any node to inspect
          </span>
        )}
      </div>
    </div>
  );
}
