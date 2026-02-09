import { useEffect, useRef } from "react";

const SpotlightBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    if (!container || !spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, hsl(152 40% 15% / 0.15), transparent 60%)`;
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div ref={spotlightRef} className="absolute inset-0 transition-all duration-300 ease-out" />
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/10 animate-pulse-glow"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />
    </div>
  );
};

export default SpotlightBackground;
