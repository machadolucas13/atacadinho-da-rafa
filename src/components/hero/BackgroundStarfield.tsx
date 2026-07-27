"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  baseOpacity: number;
  phase: number;
  speed: number;
  amplitude: number;
  color: string;
};

type Planet = {
  x: number;
  y: number;
  radius: number;
  color: string;
  glow: string;
  ringColor?: string;
  speed: number;
  orbit: number;
  baseX: number;
  baseY: number;
  tilt: number;
};

const STAR_COLORS = [
  "rgba(255,255,255,0.95)",
  "rgba(244,167,185,0.85)",
  "rgba(246,194,170,0.75)",
  "rgba(255,220,180,0.85)",
  "rgba(180,210,255,0.75)",
  "rgba(244,162,97,0.65)",
  "rgba(167,199,231,0.7)",
  "rgba(231,167,199,0.65)",
];

export default function BackgroundStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    let planets: Planet[] = [];
    let nebulae: { x: number; y: number; r: number; color: string }[] = [];
    let time = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const createStars = () => {
      const count = Math.min(Math.floor((w * h) / 10000), 180);
      points = Array.from({ length: count }, () => {
        const colorIndex = Math.floor(Math.random() * STAR_COLORS.length);
        const baseRadius = Math.random() < 0.04 ? Math.random() * 2 + 1.4 : Math.random() * 1.1 + 0.3;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          radius: baseRadius,
          baseOpacity: Math.random() * 0.6 + 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.0015 + 0.0006,
          amplitude: Math.random() * 50 + 15,
          color: STAR_COLORS[colorIndex],
        };
      });
      points.sort((a, b) => a.radius - b.radius);
    };

    const createPlanets = () => {
      planets = [
        {
          x: w * 0.78,
          y: h * 0.22,
          radius: Math.min(w, h) * 0.038,
          color: "rgba(200,225,255,0.4)",
          glow: "rgba(180,220,255,0.12)",
          ringColor: "rgba(255,255,255,0.06)",
          speed: 0.00035,
          orbit: 16,
          baseX: w * 0.78,
          baseY: h * 0.22,
          tilt: 0.4,
        },
        {
          x: w * 0.14,
          y: h * 0.74,
          radius: Math.min(w, h) * 0.022,
          color: "rgba(244,180,165,0.45)",
          glow: "rgba(244,167,185,0.1)",
          speed: 0.0005,
          orbit: 22,
          baseX: w * 0.14,
          baseY: h * 0.74,
          tilt: 0,
        },
        {
          x: w * 0.55,
          y: h * 0.30,
          radius: Math.min(w, h) * 0.016,
          color: "rgba(246,224,180,0.5)",
          glow: "rgba(255,220,150,0.12)",
          ringColor: "rgba(255,255,255,0.04)",
          speed: 0.0007,
          orbit: 12,
          baseX: w * 0.55,
          baseY: h * 0.30,
          tilt: 0.25,
        },
      ];
    };

    const createNebulae = () => {
      nebulae = [
        { x: w * 0.35, y: h * 0.45, r: Math.max(w, h) * 0.35, color: "rgba(120,110,160,0.045)" },
        { x: w * 0.70, y: h * 0.70, r: Math.max(w, h) * 0.28, color: "rgba(160,120,140,0.035)" },
        { x: w * 0.20, y: h * 0.20, r: Math.max(w, h) * 0.22, color: "rgba(110,140,160,0.03)" },
      ];
    };

    const drawNebulae = () => {
      for (let i = 0; i < nebulae.length; i++) {
        const n = nebulae[i];
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    };

    createStars();
    createPlanets();
    createNebulae();

    const draw = () => {
      time += 0.005;

      ctx.fillStyle = "rgb(10,10,20)";
      ctx.fillRect(0, 0, w, h);

      drawNebulae();

      for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        const px = planet.baseX + Math.sin(time * planet.speed * 900) * planet.orbit;
        const py = planet.baseY + Math.cos(time * planet.speed * 700) * planet.orbit * 0.65;
        planet.x = px;
        planet.y = py;

        const glowGrad = ctx.createRadialGradient(px, py, planet.radius * 0.2, px, py, planet.radius * 3.5);
        glowGrad.addColorStop(0, planet.glow);
        glowGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(px, py, planet.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        if (planet.ringColor) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(planet.tilt);
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.radius * 1.8, planet.radius * 0.55, 0, 0, Math.PI * 2);
          ctx.strokeStyle = planet.ringColor;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(px, py, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();
      }

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const offsetX = Math.sin(time * p.speed * 550 + p.phase) * p.amplitude;
        const offsetY = Math.cos(time * p.speed * 450 + p.phase * 1.3) * p.amplitude * 0.65;

        p.x = p.baseX + offsetX;
        p.y = p.baseY + offsetY;

        const alpha = Math.max(0.1, Math.min(1, p.baseOpacity + Math.sin(time + p.phase) * 0.16));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(255,255,255,0.028)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = Math.min(80, Math.max(40, w * 0.032));
          if (dist < threshold && points[i].radius > 1 && points[j].radius > 1) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = newW * newDpr;
      canvas.height = newH * newDpr;
      canvas.style.width = `${newW}px`;
      canvas.style.height = `${newH}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(newDpr, newDpr);
      points = [];
      planets = [];
      nebulae = [];
      createStars();
      createPlanets();
      createNebulae();
    };

    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(handleResize, 220);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full"
      style={{ pointerEvents: "none", willChange: "transform", zIndex: 0 }}
    />
  );
}

