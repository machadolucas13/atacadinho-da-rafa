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

    const ctx = canvas.getContext("2d", { alpha: false });
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
      const count = Math.min(Math.floor((w * h) / 8000), 100);
      points = Array.from({ length: count }, () => {
        const colorIndex = Math.floor(Math.random() * STAR_COLORS.length);
        const baseRadius = Math.random() * 1.4 + 0.4;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          radius: baseRadius,
          baseOpacity: Math.random() * 0.6 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.002 + 0.001,
          amplitude: Math.random() * 60 + 20,
          color: STAR_COLORS[colorIndex],
        };
      });
      points.sort((a, b) => a.radius - b.radius);
    };

    createStars();

    const draw = () => {
      time += 0.006;

      ctx.fillStyle = "rgb(10,10,20)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const offsetX = Math.sin(time * p.speed * 600 + p.phase) * p.amplitude;
        const offsetY = Math.cos(time * p.speed * 500 + p.phase * 1.3) * p.amplitude * 0.7;

        p.x = p.baseX + offsetX;
        p.y = p.baseY + offsetY;

        const alpha = Math.max(0.15, Math.min(1, p.baseOpacity + Math.sin(time + p.phase) * 0.2));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();
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
      createStars();
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
      style={{ pointerEvents: "none", willChange: "transform", zIndex: 0 }}
    />
  );
}
