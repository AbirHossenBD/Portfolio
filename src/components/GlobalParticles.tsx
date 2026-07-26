"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
}

export function GlobalParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse / Touch Position
    const pointer = {
      x: -1000,
      y: -1000,
      radius: 120,
    };

    // Scroll Physics Tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Responsive Particle Count
    const particleCount = Math.floor((width * height) / 18000);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.8, // 0.8px to 2.3px
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.2 + 0.20,
      });
    }

    // Window Resize Handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Touch & Pointer Handlers (Works on Android & iOS)
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        if (e.touches.length > 0) {
          pointer.x = e.touches[0].clientX;
          pointer.y = e.touches[0].clientY;
        }
      } else {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      }
    };

    const handlePointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    // Scroll Handler
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      // Positive velocity when scrolling down, negative when scrolling up
      scrollVelocity = delta * 0.4;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("touchend", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly decay scroll velocity back to normal drift
      scrollVelocity *= 0.92;

      // Determine shooting star tail length based on speed
      const speedMagnitude = Math.abs(scrollVelocity);
      const isFastScroll = speedMagnitude > 5.0;

      particles.forEach((p) => {
        // Apply scroll movement:
        // Scrolling DOWN -> particles move UP (simulating moving downward through space)
        // Scrolling UP   -> particles move DOWN
        p.y -= scrollVelocity;
        p.x += p.vx;

        // Wrap particles around screen edges
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Touch / Cursor Repulsion Physics
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < pointer.radius) {
          const force = (pointer.radius - distance) / pointer.radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 3.5;
          p.y -= Math.sin(angle) * force * 3.5;
        }

        // Render Particle (Shooting Star Trail when fast vs Dot when slow)
        ctx.beginPath();

        if (isFastScroll) {
          // Draw streak/line tail when scrolling fast
          const tailLength = Math.min(scrollVelocity * 2.5, 45); // Max streak height
          ctx.lineWidth = p.size;
          ctx.strokeStyle = `rgba(56, 189, 248, ${Math.min(p.alpha * 1.5, 0.8)})`;
          ctx.lineCap = "round";

          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + tailLength);
          ctx.stroke();
        } else {
          // Normal ambient dot
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("touchend", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}