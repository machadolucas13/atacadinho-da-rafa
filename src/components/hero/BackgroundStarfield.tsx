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

const STAR_COLORS = [
  "rgba(255,255,255,0.9)",
  "rgba(244,167,185,0.8)",
  "rgba(246,194,170,0.7)",
  "rgba(255,220,180,0.8)",
  "rgba(180,210,255,0.7)",
  "rgba(244,162,97,0.6)",
];

export default function BackgroundStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
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
      const count = Math.min(Math.floor((w * h) / 4000), 220);
      points = Array.from({ length: count }, () => {
        const colorIndex = Math.floor(Math.random() * STAR_COLORS.length);
        const baseRadius = Math.random() < 0.08 ? Math.random() * 2.8 + 1.8 : Math.random() * 1.6 + 0.4;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          radius: baseRadius,
          baseOpacity: Math.random() * 0.7 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.003 + 0.001,
          amplitude: Math.random() * 100 + 40,
          color: STAR_COLORS[colorIndex],
        };
      });
      points.sort((a, b) => a.radius - b.radius);
    };

    createStars();

    const draw = () => {
      if (!ctx) return;
      time += 0.008;

      ctx.fillStyle = "rgb(10,10,20)";
      ctx.fillRect(0, 0, w, h);
      points.forEach((p) => {
        const offsetX = Math.sin(time * p.speed * 800 + p.phase) * p.amplitude;
        const offsetY = Math.cos(time * p.speed * 600 + p.phase * 1.3) * p.amplitude * 0.8;

        p.x = p.baseX + offsetX;
        p.y = p.baseY + offsetY;

        const alpha = Math.max(0.1, Math.min(1, p.baseOpacity + Math.sin(time * 1.2 + p.phase) * 0.25));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
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
      if (typeof window === "undefined") return;
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
      createStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  );
}
