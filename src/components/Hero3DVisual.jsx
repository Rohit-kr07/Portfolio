import React, { useRef, useEffect, useState, useCallback } from "react";
import { Rotate3D, Sparkles, Orbit, Eye } from "lucide-react";

export default function Hero3DVisual() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [mode, setMode] = useState("prism"); // "prism" | "galaxy" | "mesh"
  const [isDragging, setIsDragging] = useState(false);
  const [activePreset, setActivePreset] = useState("cyan");

  // Physics state kept in ref to prevent re-renders on every animation frame
  const stateRef = useRef({
    rotX: 0.35,
    rotY: 0.6,
    rotZ: 0.1,
    velX: 0.003,
    velY: 0.006,
    targetVelX: 0.003,
    targetVelY: 0.006,
    lastMouseX: 0,
    lastMouseY: 0,
    isPointerDown: false,
    particles: [],
    mode: "prism",
    colorPreset: "cyan",
  });

  stateRef.current.mode = mode;
  stateRef.current.colorPreset = activePreset;

  // Define 3D Polyhedron (Truncated Icosahedron / Cyber Gem vertices)
  const vertices = useRef([
    // Golden ratio phi = (1 + sqrt(5)) / 2 approx 1.618
    [-1, 1.618, 0], [1, 1.618, 0], [-1, -1.618, 0], [1, -1.618, 0],
    [0, -1, 1.618], [0, 1, 1.618], [0, -1, -1.618], [0, 1, -1.618],
    [1.618, 0, -1], [1.618, 0, 1], [-1.618, 0, -1], [-1.618, 0, 1]
  ].map(([x, y, z]) => {
    // Normalize and scale to radius 120
    const len = Math.sqrt(x * x + y * y + z * z);
    return [ (x / len) * 115, (y / len) * 115, (z / len) * 115 ];
  })).current;

  // Icosahedron faces (triangles)
  const faces = useRef([
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
  ]).current;

  // Initialize orbital galaxy particles
  useEffect(() => {
    const pts = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      const radius = 135 + Math.random() * 85;
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const tilt = (Math.random() - 0.5) * 1.8;
      pts.push({
        baseRadius: radius,
        angle: angle,
        speed: 0.008 + Math.random() * 0.012,
        tilt: tilt,
        size: Math.random() * 2.5 + 1.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    stateRef.current.particles = pts;
  }, []);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 380; // Perspective focal length

      ctx.clearRect(0, 0, width, height);

      const state = stateRef.current;

      // Physics damping / inertia
      if (!state.isPointerDown) {
        state.velX += (state.targetVelX - state.velX) * 0.05;
        state.velY += (state.targetVelY - state.velY) * 0.05;
        state.rotX += state.velX;
        state.rotY += state.velY;
      }

      const cosX = Math.cos(state.rotX);
      const sinX = Math.sin(state.rotX);
      const cosY = Math.cos(state.rotY);
      const sinY = Math.sin(state.rotY);

      // 3D rotation transform function
      const project = (x, y, z) => {
        // Rotate around Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate around X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective projection
        const scale = fov / (fov + z2 + 180);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;

        return { px, py, z: z2, scale, x1, y2 };
      };

      // Draw ambient backdrop glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width * 0.48);
      if (state.colorPreset === "cyan") {
        glowGrad.addColorStop(0, "rgba(0, 240, 255, 0.16)");
        glowGrad.addColorStop(0.5, "rgba(112, 0, 255, 0.08)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else if (state.colorPreset === "emerald") {
        glowGrad.addColorStop(0, "rgba(0, 245, 160, 0.18)");
        glowGrad.addColorStop(0.5, "rgba(0, 187, 249, 0.08)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        glowGrad.addColorStop(0, "rgba(255, 183, 3, 0.18)");
        glowGrad.addColorStop(0.5, "rgba(255, 0, 110, 0.08)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Project vertices
      const projVertices = vertices.map(([x, y, z]) => project(x, y, z));

      // Calculate face depths and normals for realistic 3D shading
      const faceData = faces.map((faceIndices) => {
        const p0 = projVertices[faceIndices[0]];
        const p1 = projVertices[faceIndices[1]];
        const p2 = projVertices[faceIndices[2]];

        const avgZ = (p0.z + p1.z + p2.z) / 3;

        // Normal cross product in 2D space for backface culling / lighting
        const ux = p1.px - p0.px;
        const uy = p1.py - p0.py;
        const vx = p2.px - p0.px;
        const vy = p2.py - p0.py;
        const normalZ = ux * vy - uy * vx;

        return {
          indices: faceIndices,
          avgZ,
          normalZ,
          p0, p1, p2,
        };
      });

      // Sort faces by depth (painter's algorithm)
      faceData.sort((a, b) => b.avgZ - a.avgZ);


      // Render mode: PRISM (3D Shaded Crystalline Faces)
      if (state.mode === "prism" || state.mode === "mesh") {
        faceData.forEach(({ normalZ, avgZ, p0, p1, p2 }) => {
          if (normalZ < 0) return; // Backface culling for solid prism

          // Lighting factor based on depth and angle
          const lightIntensity = Math.max(0.12, Math.min(0.9, (avgZ + 120) / 240));

          ctx.beginPath();
          ctx.moveTo(p0.px, p0.py);
          ctx.lineTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.closePath();

          if (state.mode === "prism") {
            let fillColor;
            if (state.colorPreset === "cyan") {
              const alpha = (0.2 + lightIntensity * 0.45).toFixed(2);
              fillColor = `rgba(0, ${Math.floor(180 + lightIntensity * 75)}, 255, ${alpha})`;
            } else if (state.colorPreset === "emerald") {
              const alpha = (0.2 + lightIntensity * 0.45).toFixed(2);
              fillColor = `rgba(0, 245, ${Math.floor(120 + lightIntensity * 100)}, ${alpha})`;
            } else {
              const alpha = (0.2 + lightIntensity * 0.45).toFixed(2);
              fillColor = `rgba(255, ${Math.floor(140 + lightIntensity * 100)}, 50, ${alpha})`;
            }
            ctx.fillStyle = fillColor;
            ctx.fill();
          }

          // Glowing wireframe edge
          ctx.strokeStyle = state.colorPreset === "cyan"
            ? `rgba(0, 240, 255, ${0.4 + lightIntensity * 0.5})`
            : state.colorPreset === "emerald"
            ? `rgba(0, 245, 160, ${0.4 + lightIntensity * 0.5})`
            : `rgba(255, 183, 3, ${0.4 + lightIntensity * 0.5})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });
      }

      // Draw vertex glowing nodes
      projVertices.forEach(({ px, py, z }) => {
        const alpha = Math.max(0.2, (z + 120) / 240);
        const radius = Math.max(1.8, 3.8 * ((z + 140) / 280));

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = state.colorPreset === "cyan"
          ? `rgba(255, 255, 255, ${alpha})`
          : state.colorPreset === "emerald"
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(255, 240, 200, ${alpha})`;
        ctx.fill();

        // Node specular glow
        ctx.beginPath();
        ctx.arc(px, py, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = state.colorPreset === "cyan"
          ? `rgba(0, 240, 255, ${alpha * 0.4})`
          : `rgba(0, 245, 160, ${alpha * 0.4})`;
        ctx.fill();
      });

      // Render 3D Orbital Galaxy Rings & Particles
      const particles = state.particles;
      particles.forEach((p) => {
        p.angle += p.speed;
        p.pulse += 0.03;

        // 3D coordinates for tilted orbital ring
        const ox = Math.cos(p.angle) * p.baseRadius;
        const oy = Math.sin(p.angle) * p.baseRadius * Math.sin(p.tilt);
        const oz = Math.sin(p.angle) * p.baseRadius * Math.cos(p.tilt);

        const proj = project(ox, oy, oz);

        const depthAlpha = Math.max(0.15, Math.min(0.95, (proj.z + 160) / 320));
        const pulseSize = p.size * (1 + 0.3 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(proj.px, proj.py, pulseSize * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = state.colorPreset === "cyan"
          ? `rgba(0, 240, 255, ${depthAlpha})`
          : state.colorPreset === "emerald"
          ? `rgba(0, 245, 160, ${depthAlpha})`
          : `rgba(255, 200, 50, ${depthAlpha})`;
        ctx.fill();

        // Orbit connection lines for galaxy mode
        if (state.mode === "galaxy" && Math.random() < 0.05) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(proj.px, proj.py);
          ctx.strokeStyle = `rgba(0, 240, 255, ${depthAlpha * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [vertices, faces]);

  // Pointer & Drag Handlers for full 3D interactive manipulation
  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    stateRef.current.isPointerDown = true;
    stateRef.current.lastMouseX = clientX;
    stateRef.current.lastMouseY = clientY;
  };

  const handlePointerMove = useCallback((e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (stateRef.current.isPointerDown) {
      const deltaX = clientX - stateRef.current.lastMouseX;
      const deltaY = clientY - stateRef.current.lastMouseY;

      stateRef.current.rotY += deltaX * 0.009;
      stateRef.current.rotX -= deltaY * 0.009;

      stateRef.current.velY = deltaX * 0.005;
      stateRef.current.velX = -deltaY * 0.005;

      stateRef.current.lastMouseX = clientX;
      stateRef.current.lastMouseY = clientY;
    } else {
      // Gentle ambient tracking when hovering
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const normX = (clientX - rect.left) / rect.width - 0.5;
      const normY = (clientY - rect.top) / rect.height - 0.5;

      stateRef.current.targetVelY = normX * 0.015;
      stateRef.current.targetVelX = -normY * 0.015;
    }
  }, []);

  const handlePointerUp = () => {
    setIsDragging(false);
    stateRef.current.isPointerDown = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "480px",
        height: "440px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: isDragging ? "grabbing" : "grab",
          display: "block",
          borderRadius: "24px",
        }}
      />

      {/* Interactive Controls Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(10, 15, 26, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "9999px",
          padding: "6px 12px",
          zIndex: 10,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--accent-cyan)",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            paddingRight: "6px",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Rotate3D size={13} />
          Drag 3D
        </span>

        {/* Mode Selectors */}
        <button
          onClick={() => setMode("prism")}
          title="3D Polyhedron Core"
          style={{
            background: mode === "prism" ? "rgba(0, 240, 255, 0.2)" : "transparent",
            color: mode === "prism" ? "#00f0ff" : "var(--text-muted)",
            border: "none",
            borderRadius: "6px",
            padding: "4px 8px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Sparkles size={11} />
          Solid
        </button>

        <button
          onClick={() => setMode("mesh")}
          title="Wireframe Mesh"
          style={{
            background: mode === "mesh" ? "rgba(0, 240, 255, 0.2)" : "transparent",
            color: mode === "mesh" ? "#00f0ff" : "var(--text-muted)",
            border: "none",
            borderRadius: "6px",
            padding: "4px 8px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Eye size={11} />
          Mesh
        </button>

        <button
          onClick={() => setMode("galaxy")}
          title="Particle Cosmos"
          style={{
            background: mode === "galaxy" ? "rgba(0, 240, 255, 0.2)" : "transparent",
            color: mode === "galaxy" ? "#00f0ff" : "var(--text-muted)",
            border: "none",
            borderRadius: "6px",
            padding: "4px 8px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Orbit size={11} />
          Galaxy
        </button>

        {/* Color Palette Switcher */}
        <div style={{ display: "flex", gap: "4px", marginLeft: "4px" }}>
          <button
            onClick={() => setActivePreset("cyan")}
            title="Electric Cyan"
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#00f0ff",
              border: activePreset === "cyan" ? "2px solid #fff" : "1px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
            }}
          />
          <button
            onClick={() => setActivePreset("emerald")}
            title="Cyber Emerald"
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#00f5a0",
              border: activePreset === "emerald" ? "2px solid #fff" : "1px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
            }}
          />
          <button
            onClick={() => setActivePreset("amber")}
            title="Solar Amber"
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#ffb703",
              border: activePreset === "amber" ? "2px solid #fff" : "1px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* Floating 3D Badge Indicator */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          background: "rgba(10, 15, 26, 0.65)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 240, 255, 0.25)",
          borderRadius: "8px",
          padding: "6px 12px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-secondary)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#00f0ff",
            boxShadow: "0 0 8px #00f0ff",
          }}
        />
        <span>WebGL / Vector Math</span>
      </div>
    </div>
  );
}
