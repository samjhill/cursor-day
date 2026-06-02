"use client";

import { useEffect, useRef } from "react";
import type { WheelSegment } from "./types";

interface WheelCanvasProps {
  segments: WheelSegment[];
  rotation: number;
  spinning: boolean;
}

export function WheelCanvas({ segments, rotation, spinning }: WheelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 420;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 12;
    const count = segments.length;
    const slice = (2 * Math.PI) / count;

    ctx.clearRect(0, 0, size, size);

    // Outer glow ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 6, 0, 2 * Math.PI);
    ctx.strokeStyle = spinning ? "rgba(124, 58, 237, 0.6)" : "rgba(124, 58, 237, 0.25)";
    ctx.lineWidth = spinning ? 4 : 2;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((rotation * Math.PI) / 180);

    segments.forEach((seg, i) => {
      const start = -Math.PI / 2 + i * slice;
      const end = start + slice;

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();

      // Segment border
      ctx.strokeStyle = "rgba(12, 10, 9, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.rotate(start + slice / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Inter, system-ui, sans-serif";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 4;

      const label = seg.label.length > 14 ? `${seg.label.slice(0, 12)}…` : seg.label;
      ctx.fillText(label, radius - 20, 5);
      ctx.restore();
    });

    // Center hub
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, 2 * Math.PI);
    const hubGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
    hubGrad.addColorStop(0, "#292524");
    hubGrad.addColorStop(1, "#1c1917");
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 18px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎡", 0, 1);

    ctx.restore();

    // Pointer (fixed, not rotated)
    ctx.save();
    ctx.translate(cx, 8);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-14, -24);
    ctx.lineTo(14, -24);
    ctx.closePath();
    ctx.fillStyle = "#f59e0b";
    ctx.shadowColor = "rgba(245, 158, 11, 0.6)";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }, [segments, rotation, spinning]);

  return (
    <canvas
      ref={canvasRef}
      className="drop-shadow-2xl"
      aria-hidden
    />
  );
}
