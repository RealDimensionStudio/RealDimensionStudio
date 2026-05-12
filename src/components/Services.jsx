import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import studioData from "../data/studioData";

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px bg-brand-red" />
      <span className="text-brand-red text-xs tracking-[0.35em] uppercase font-normal">{text}</span>
    </div>
  );
}

export default function Services() {
  const { services } = studioData;
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [cardTransforms, setCardTransforms] = useState([]);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);

  // Check scroll positions to show/hide arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const updateCardTransforms = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const transforms = cardRefs.current.map((card) => {
      if (!card) return { scale: 0.88, rotateY: 0, rotateX: 0, translateY: 0, translateZ: 0, opacity: 0.4, zIndex: 1 };
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = (cardCenter - containerCenter) / container.clientWidth;
        const absDistance = Math.min(Math.abs(distance), 1.05);
        const frontLift = Math.max(0, 1 - absDistance);
        return {
        scale: 1 - absDistance * 0.1,
        rotateY: -distance * 20,
        rotateX: absDistance * 2,
        translateY: absDistance * 8,
        translateZ: frontLift * 28,
        zIndex: Math.round(100 - absDistance * 100),
        opacity: 1 - absDistance * 0.22,
      };
    });
    setCardTransforms(transforms);
  };

  useEffect(() => {
    checkScroll();
    updateCardTransforms();
    window.addEventListener("resize", checkScroll);
    window.addEventListener("resize", updateCardTransforms);
    return () => {
      window.removeEventListener("resize", checkScroll);
      window.removeEventListener("resize", updateCardTransforms);
    }
  }, []);

  useEffect(() => {
    updateCardTransforms();
  }, [services.length]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
      setTimeout(() => {
        checkScroll();
        updateCardTransforms();
      }, 400);
    }
  };

  // Mouse drag to scroll
  const onMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    scrollStart.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const delta = dragStart.current - e.clientX;
    scrollRef.current.scrollLeft = scrollStart.current + delta;
    checkScroll();
  };

  const onMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  return (
    <section id="services" className="relative bg-transparent py-16 md:py-20 overflow-hidden">
      {/* BG grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="What We Do" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              className="text-5xl md:text-7xl font-normal text-brand-red"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Our Services
            </h2>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-brand-lightYellow/40 text-sm max-w-xs md:text-right">
                <span>Drag</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <circle cx="5" cy="5" r="1"/>
                  <circle cx="19" cy="5" r="1"/>
                  <circle cx="5" cy="19" r="1"/>
                  <circle cx="19" cy="19" r="1"/>
                  <circle cx="12" cy="12" r="1"/>
                  <path d="M5 12h14M12 5v14"/>
                </svg>
                <span>to explore → Full-service post production solutions from frame one to final delivery.</span>
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <AnimatePresence>
                  {canScrollLeft && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      onClick={() => scroll("prev")}
                      className="w-12 h-12 border border-brand-red/30 flex items-center justify-center text-brand-red hover:bg-brand-red hover:text-brand-lightYellow transition-all duration-300 rounded-full"
                      aria-label="Previous"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
                
                <AnimatePresence>
                  {canScrollRight && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      onClick={() => scroll("next")}
                      className="w-12 h-12 border border-brand-red/30 flex items-center justify-center text-brand-red hover:bg-brand-red hover:text-brand-lightYellow transition-all duration-300 rounded-full"
                      aria-label="Next"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Horizontal scroll track */}
        <div style={{ perspective: "2600px" }}>
          <div
            ref={scrollRef}
            className="flex gap-8 md:gap-10 overflow-x-auto py-12 px-4 cursor-grab select-none scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", transformStyle: "preserve-3d" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onScroll={(e) => {
              checkScroll();
              updateCardTransforms();
            }}
          >
            {services.map((service, i) => {
              const transform = cardTransforms[i] || {
                scale: 0.9,
                rotateY: 0,
                rotateX: 0,
                translateY: 0,
                translateZ: 0,
                opacity: 0.3,
                zIndex: 1,
              };

              return (
                <div
                  key={service.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="flex-shrink-0 w-72 sm:w-80 snap-center transition-all duration-300 ease-out"
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  style={{
                    transform: `
                      scale(${transform.scale})
                      rotateY(${transform.rotateY}deg)
                      rotateX(${transform.rotateX}deg)
                      translateY(${transform.translateY}px)
                      translateZ(${transform.translateZ}px)
                    `,
                    zIndex: transform.zIndex,
                    opacity: transform.opacity,
                  }}
                >
                  <Tilt
                    glareEnable
                    glareMaxOpacity={0.06}
                    glareColor={service.color}
                    tiltMaxAngleX={4}
                    tiltMaxAngleY={4}
                    perspective={1400}
                    scale={1.01}
                  >
                    <div
                      className={`relative h-[340px] p-7 border transition-all duration-400 cursor-pointer group flex flex-col justify-between backdrop-blur-md ${
                        activeIndex === i
                          ? "border-opacity-70 bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                      style={{
                        borderColor: activeIndex === i ? service.color : undefined,
                      }}
                    >
                      {/* Number */}
                      <span className="absolute top-5 right-5 text-brand-lightYellow/10 text-4xl font-normal"
                        style={{ fontFamily: "'Bebas Neue', cursive" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                  {/* Color accent bar */}
                  <div
                    className="absolute top-0 left-0 w-full h-0.5 transition-all duration-300"
                    style={{
                      background: service.color,
                      opacity: activeIndex === i ? 1 : 0.3,
                    }}
                  />

                  <div>
                    {/* Icon + category */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-3xl">{service.icon}</span>
                      <span
                        className="text-[10px] tracking-[0.3em] uppercase font-normal"
                        style={{ color: service.color }}
                      >
                        {service.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl font-normal text-brand-lightYellow mb-3 group-hover:text-opacity-90"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-brand-lightYellow/45 text-sm leading-relaxed line-clamp-3 group-hover:text-brand-lightYellow/65 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {service.tools.map((tool, ti) => (
                      <span
                        key={ti}
                        className="px-2 py-0.5 text-[10px] tracking-wider border border-brand-lightYellow/10 text-brand-lightYellow/30 group-hover:border-brand-lightYellow/20 transition-colors duration-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </div>
          );
        })}
        </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-6 gap-1">
          {services.map((_, i) => (
            <div
              key={i}
              className="h-px transition-all duration-300"
              style={{
                width: activeIndex === i ? "24px" : "8px",
                background: activeIndex === i ? "#e63946" : "rgba(252,234,164,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
