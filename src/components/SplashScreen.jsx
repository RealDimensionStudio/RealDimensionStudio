import { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/RDS Logo final_V04.png";

export default function SplashScreen({ onComplete }) {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    // Progress bar fill
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2,
      ease: "power1.inOut",
    })
      .to({}, { duration: 0.3 })
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
      });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(230,57,70,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red glow behind logo */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-15 animate-pulse-slow pointer-events-none"
        style={{ background: "radial-gradient(circle, #e63946 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Actual logo — scales in with bounce */}
        <div
          className="relative"
        >
          {/* Outer rotating ring */}
          <div
            className="absolute -inset-4 rounded-full border border-brand-red/20"
            style={{ animation: "spin 12s linear infinite" }}
          />
          {/* Inner ring */}
          <div
            className="absolute -inset-2 rounded-full border border-brand-red/10"
            style={{ animation: "spin 8s linear infinite reverse" }}
          />
          <img
            src={logo}
            alt="Real Dimension Studio"
            className="w-44 h-44 object-contain drop-shadow-[0_0_40px_rgba(230,57,70,0.5)]"
          />
        </div>

        {/* Tagline fade in */}
        <p
          className="text-brand-muted text-xs tracking-[0.5em] uppercase"
        >
          Post Production Studio
        </p>

        {/* Progress bar */}
        <div className="w-56 h-px bg-brand-lightYellow/10 relative overflow-hidden mt-2">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full bg-brand-red"
            style={{ width: "0%" }}
          />
        </div>

        {/* Expanding glow line */}
        <div
          ref={lineRef}
          className="w-56 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent"
          style={{ transform: "scaleX(0)", transformOrigin: "center" }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-brand-red/40" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-brand-red/40" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-brand-red/40" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-brand-red/40" />
    </div>
  );
}
