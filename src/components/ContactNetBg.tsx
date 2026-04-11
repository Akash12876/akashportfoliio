import { useEffect, useRef } from "react";

export default function ContactNetBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const points: { x: number; y: number; vx: number; vy: number }[] = [];
    const POINTS = 32;
    for (let i = 0; i < POINTS; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
      });
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Draw lines
      for (let i = 0; i < POINTS; i++) {
        for (let j = i + 1; j < POINTS; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.strokeStyle = `rgba(130,130,255,${1 - dist / 180})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw points
      for (let i = 0; i < POINTS; i++) {
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#8b8bff";
        ctx.shadowColor = "#8b8bff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    function animate() {
      for (let i = 0; i < POINTS; i++) {
        points[i].x += points[i].vx;
        points[i].y += points[i].vy;
        if (points[i].x < 0 || points[i].x > width) points[i].vx *= -1;
        if (points[i].y < 0 || points[i].y > height) points[i].vy *= -1;
      }
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
