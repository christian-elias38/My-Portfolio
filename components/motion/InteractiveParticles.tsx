"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

const COLORS = [
  "rgba(244, 169, 198, ", // soft pink (#f4a9c6)
  "rgba(226, 120, 159, ", // dusty rose (#e2789f)
  "rgba(255, 203, 224, ", // blush pink (#ffcbe0)
  "rgba(197, 101, 141, ", // warm plum (#c5658d)
  "rgba(168, 85, 247, ",  // purple glow (#a855f7)
];

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 180,
      isHovered: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.isHovered = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(Math.floor((width * height) / 10000), 120);
    let particles: Particle[] = [];

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const colorPrefix = COLORS[Math.floor(Math.random() * COLORS.length)];
        const baseAlpha = Math.random() * 0.45 + 0.15;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.15,
          size: Math.random() * 2.5 + 1.2,
          color: colorPrefix,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    }

    initParticles();

    function render() {
      if (!ctx) return;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let offsetX = 0;
        let offsetY = 0;

        if (dist < mouse.radius && mouse.isHovered) {
          const force = 1 - dist / mouse.radius;
          const angle = Math.atan2(dy, dx);
          const pushAmount = force * 45;
          offsetX = -Math.cos(angle) * pushAmount;
          offsetY = -Math.sin(angle) * pushAmount;
          p.alpha = Math.min(1, p.baseAlpha + force * 0.5);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        const renderX = p.x + offsetX;
        const renderY = p.y + offsetY;

        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p.x + offsetX - p2.x;
          const pdy = p.y + offsetY - p2.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pdist < 100) {
            const lineAlpha = (1 - pdist / 100) * 0.12 * p.alpha;
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(226, 120, 159, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
