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
  speed: number;
  orbit: number;
  baseX: number;
  baseY: number;
};

const STAR_COLORS = [
  "rgba(255,255,255,0.9)",
  "rgba(244,167,185,0.8)",
  "rgba(246,194,170,0.7)",
  "rgba(255,220,180,0.8)",
  "rgba(180,210,255,0.7)",
  "rgba(244,162,97,0.6)",
];

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    let planets: Planet[] = [];
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
      const count = Math.min(Math.floor((w * h) / 9000), 140);
      points = Array.from({ length: count }, () => {
        const colorIndex = Math.floor(Math.random() * STAR_COLORS.length);
        const baseRadius = Math.random() < 0.06 ? Math.random() * 2 + 1.2 : Math.random() * 1.2 + 0.4;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          radius: baseRadius,
          baseOpacity: Math.random() * 0.55 + 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.0018 + 0.0008,
          amplitude: Math.random() * 55 + 20,
          color: STAR_COLORS[colorIndex],
        };
      });
      points.sort((a, b) => a.radius - b.radius);
    };

    const createPlanets = () => {
      planets = [
        {
          x: w * 0.75,
          y: h * 0.22,
          radius: Math.min(w, h) * 0.045,
          color: "rgba(180,220,255,0.35)",
          glow: "rgba(180,220,255,0.08)",
          speed: 0.0004,
          orbit: 18,
          baseX: w * 0.75,
          baseY: h * 0.22,
        },
        {
          x: w * 0.18,
          y: h * 0.72,
          radius: Math.min(w, h) * 0.025,
          color: "rgba(244,167,185,0.45)",
          glow: "rgba(244,167,185,0.1)",
          speed: 0.0006,
          orbit: 24,
          baseX: w * 0.18,
          baseY: h * 0.72,
        },
      ];
    };

    const drawGalaxy = () => {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
      grad.addColorStop(0, "rgba(120,140,180,0.06)");
      grad.addColorStop(0.4, "rgba(100,120,160,0.03)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    };

    createStars();
    createPlanets();

    const draw = () => {
      time += 0.006;

      ctx.fillStyle = "rgb(10,10,20)";
      ctx.fillRect(0, 0, w, h);

      drawGalaxy();

      for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        const px = planet.baseX + Math.sin(time * planet.speed * 1000) * planet.orbit;
        const py = planet.baseY + Math.cos(time * planet.speed * 800) * planet.orbit * 0.6;
        planet.x = px;
        planet.y = py;

        const glowGrad = ctx.createRadialGradient(px, py, planet.radius * 0.2, px, py, planet.radius * 3);
        glowGrad.addColorStop(0, planet.glow);
        glowGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(px, py, planet.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();
      }

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const offsetX = Math.sin(time * p.speed * 600 + p.phase) * p.amplitude;
        const offsetY = Math.cos(time * p.speed * 500 + p.phase * 1.3) * p.amplitude * 0.7;

        p.x = p.baseX + offsetX;
        p.y = p.baseY + offsetY;

        const alpha = Math.max(0.12, Math.min(1, p.baseOpacity + Math.sin(time + p.phase) * 0.18));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(255,255,255,0.035)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = Math.min(90, Math.max(50, w * 0.04));
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
      createStars();
      createPlanets();
    };

    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(handleResize, 200);
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
      style={{ pointerEvents: "none", willChange: "transform", zIndex: -1 }}
    />
  );
}
