import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

export default function ParticleBackground({
  particleCount = 50,
  className = "",
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const colors = [
    "rgba(139, 92, 246, 0.6)", // purple-500
    "rgba(236, 72, 153, 0.6)", // pink-500
    "rgba(59, 130, 246, 0.6)", // blue-500
    "rgba(16, 185, 129, 0.6)", // emerald-500
    "rgba(245, 158, 11, 0.6)", // amber-500
  ];

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 100,
    };
  };

  const updateParticle = (particle: Particle, canvas: HTMLCanvasElement) => {
    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Update life
    particle.life++;

    // Update opacity based on life
    const lifeRatio = particle.life / particle.maxLife;
    particle.opacity = (1 - lifeRatio) * 0.6;

    // Mouse interaction
    const dx = mouseRef.current.x - particle.x;
    const dy = mouseRef.current.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      const force = (100 - distance) / 100;
      particle.vx += (dx / distance) * force * 0.01;
      particle.vy += (dy / distance) * force * 0.01;
    }

    // Apply slight gravity/drift
    particle.vy += 0.001;
    particle.vx *= 0.999;
    particle.vy *= 0.999;

    // Wrap around edges
    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    // Reset particle if it's dead
    if (particle.life >= particle.maxLife) {
      Object.assign(particle, createParticle(canvas));
    }
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();

    // Create radial gradient for glow effect
    const gradient = ctx.createRadialGradient(
      particle.x,
      particle.y,
      0,
      particle.x,
      particle.y,
      particle.size * 2,
    );
    gradient.addColorStop(
      0,
      particle.color.replace("0.6", particle.opacity.toString()),
    );
    gradient.addColorStop(1, particle.color.replace("0.6", "0"));

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
    ctx.fill();

    // Core particle
    ctx.fillStyle = particle.color.replace(
      "0.6",
      (particle.opacity * 1.5).toString(),
    );
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const drawConnections = (
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
  ) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const opacity = ((80 - distance) / 80) * 0.1;
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      updateParticle(particle, canvas);
      drawParticle(ctx, particle);
    });

    // Draw connections between nearby particles
    drawConnections(ctx, particlesRef.current);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouseRef.current.x = event.clientX;
    mouseRef.current.y = event.clientY;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    handleResize();

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(canvas),
    );

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: "transparent" }}
    />
  );
}
