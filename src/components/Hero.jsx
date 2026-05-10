import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
void motion;
import { Link } from "react-scroll";
import gsap from "gsap";
import studioData from "../data/studioData";
import VideoPlayer from "./VideoPlayer";
import nameLogo from "../assets/nameLogo.png";

// Floating particle
function Particle({ x, y, size, delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export default function Hero() {
  const { hero } = studioData;
  const titleRef = useRef(null);
  const canvasRef = useRef(null);

  // Animated noise/particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 57, 70, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(230, 57, 70, ${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP headline stagger
  useEffect(() => {
    if (!titleRef.current) return;
    const lines = titleRef.current.querySelectorAll(".hero-line");
    gsap.fromTo(
      lines,
      { y: 120, opacity: 0, skewY: 5 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        delay: 0.3,
      }
    );
  }, []);

  const particles = [
    { x: 10, y: 20, size: 4, delay: 0, color: "rgba(230,57,70,0.5)" },
    { x: 85, y: 15, size: 3, delay: 1, color: "rgba(244,162,97,0.5)" },
    { x: 70, y: 70, size: 5, delay: 2, color: "rgba(230,57,70,0.3)" },
    { x: 20, y: 80, size: 3, delay: 0.5, color: "rgba(233,196,106,0.4)" },
    { x: 50, y: 10, size: 2, delay: 1.5, color: "rgba(230,57,70,0.4)" },
    { x: 90, y: 50, size: 4, delay: 0.8, color: "rgba(244,162,97,0.3)" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-darker"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none animate-float"
        style={{ background: "radial-gradient(circle, #e63946 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none animate-float-reverse"
        style={{ background: "radial-gradient(circle, #f4a261 0%, transparent 70%)" }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-[120rem] mx-auto px-4 pt-32 pb-20 w-full">
        {/* Divider */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
        </motion.div>

        {/* Studio name + featured videos */}
        <motion.div
          className="flex flex-col items-center justify-center mb-12 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Main Logo Image */}
          <div ref={titleRef} className="text-center overflow-hidden flex justify-center w-full">
            <img 
              src={nameLogo} 
              alt="Real Dimension Studio" 
              className="w-full max-w-[80vw] md:max-w-[600px] h-auto object-contain hero-line drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" 
            />
          </div>

          {/* Featured Videos Grid */}
          <div className="w-full max-w-[100rem] grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video 1 */}
            <VideoPlayer videoId="985739245" title="Real Dimension Studio Featured Video 1" />

            {/* Video 2 */}
            <VideoPlayer videoId="1029611770" title="Real Dimension Studio Featured Video 2" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 text-brand-red text-xs tracking-[0.3em] uppercase">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            {hero.badge}
          </span>
        </motion.div>

        {/* Subheadline + description */}
        <motion.div
          className="text-center mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-brand-red tracking-[0.2em] uppercase text-sm mb-4">
            {hero.subHeadline}
          </p>
          <p className="text-brand-lightYellow/50 text-base leading-relaxed">{hero.description}</p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link
            to={hero.cta.href}
            smooth
            duration={600}
            offset={-70}
            className="group relative px-8 py-4 bg-brand-red text-brand-lightYellow text-sm tracking-widest uppercase font-normal cursor-pointer overflow-hidden"
          >
            <span className="relative z-10">{hero.cta.label}</span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]" style={{ mixBlendMode: "difference" }} />
          </Link>
          <Link
            to={hero.ctaSecondary.href}
            smooth
            duration={600}
            offset={-70}
            className="group flex items-center gap-3 px-8 py-4 border border-brand-lightYellow/20 text-brand-lightYellow text-sm tracking-widest uppercase font-medium cursor-pointer hover:border-brand-lightYellow/60 transition-colors duration-300"
          >
            <span className="w-8 h-8 rounded-full border border-brand-lightYellow/30 flex items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red/10 transition-all duration-300">
              ▶
            </span>
            {hero.ctaSecondary.label}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-brand-lightYellow/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {hero.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-brand-lightYellow/[0.02] hover:bg-brand-lightYellow/[0.04] transition-colors duration-300 p-6 text-center border border-brand-lightYellow/[0.03] group"
            >
              <div
                className="text-4xl font-normal text-brand-lightYellow group-hover:text-brand-red transition-colors duration-300"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                {stat.value}
              </div>
              <div className="text-brand-muted text-xs tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-brand-lightYellow/5 bg-brand-red/5 py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...hero.marqueeItems, ...hero.marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-brand-lightYellow/30 text-xs tracking-[0.3em] uppercase mx-8 font-medium"
            >
              {item} <span className="text-brand-red mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 right-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-brand-lightYellow/20 text-[10px] tracking-[0.3em] uppercase rotate-90 mb-4">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-red to-transparent" />
      </motion.div>
    </section>
  );
}
