import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
void motion;
import Tilt from "react-parallax-tilt";
import studioData from "../data/studioData";
import logoB from "../assets/RDS Logo_b_V04.png";
import raviJadaunImg from "../assets/Ravijadaun.jpg";
import raviParasharImg from "../assets/RaviParashar.jpg";
import shivamImg from "../assets/shivam.jpg";
import harendraImg from "../assets/Harendra.jpg";

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px bg-brand-red" />
      <span className="text-brand-red text-xs tracking-[0.35em] uppercase font-normal">{text}</span>
    </div>
  );
}

export default function OurTeam() {
  const { about } = studioData;
  const [selectedMember, setSelectedMember] = useState(null);
  const [creditsTab, setCreditsTab] = useState("hollywood");
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [cardTransforms, setCardTransforms] = useState([]);
  const teamImages = {
    "Ravi Jadaun": raviJadaunImg,
    "Ravi K. Parashar": raviParasharImg,
    "Shivam Singh": shivamImg,
    "Harendra Singh": harendraImg,
  };

  const updateCardTransforms = () => {
    if (!scrollRef.current) {
      return;
    }

    const container = scrollRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const transforms = cardRefs.current.map((card) => {
      if (!card) {
        return { scale: 0.88, rotateY: 0, rotateX: 0, translateY: 0, translateZ: 0, opacity: 0.4 };
      }

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = (cardCenter - containerCenter) / container.clientWidth;
      const absDistance = Math.min(Math.abs(distance), 1.15);
      const frontLift = Math.max(0, 1 - absDistance);

      return {
        scale: 1 - absDistance * 0.16,
        rotateY: -distance * 85, // Enhanced for 3D circle effect
        rotateX: absDistance * 8,
        translateY: absDistance * 18,
        translateZ: frontLift * 150, // Pushed forward more to fix overlap feeling
        zIndex: Math.round(100 - absDistance * 100), // Higher index for centered items
        opacity: 1 - absDistance * 0.5,
      };
    });

    setCardTransforms(transforms);
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    updateCardTransforms();
    window.addEventListener("resize", checkScroll);
    window.addEventListener("resize", updateCardTransforms);

    return () => {
      window.removeEventListener("resize", checkScroll);
      window.removeEventListener("resize", updateCardTransforms);
    };
  }, []);

  useEffect(() => {
    updateCardTransforms();
  }, [about.team.length]);

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

  const getMemberCredits = (member) => {
    if (member.hollywoodCredits?.length || member.indianCredits?.length) {
      return {
        tabType: "tabs",
        sections: {
          hollywood: member.hollywoodCredits || [],
          india: member.indianCredits || [],
        },
      };
    }

    const genericCredits = member.credits || member.knownFor || [];

    return {
      tabType: "credits",
      sections: {
        credits: genericCredits,
      },
    };
  };

  const creditsConfig = selectedMember ? getMemberCredits(selectedMember) : null;
  const hasTabbedCredits = creditsConfig?.tabType === "tabs";
  const currentCredits = selectedMember
    ? hasTabbedCredits
      ? creditsTab === "hollywood"
        ? creditsConfig.sections.hollywood
        : creditsConfig.sections.india
      : creditsConfig.sections.credits
    : [];

  return (
    <section id="our-team" className="relative bg-transparent py-16 md:py-20 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e63946 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <SectionLabel text="Our Team" />
            <h3
              className="text-4xl font-normal text-brand-red tracking-wider uppercase mb-3"
              style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
            >
              Team Behind the Studio
            </h3>
            <div className="w-20 h-1 bg-brand-red mx-auto md:mx-0" />
          </div>

          <div className="flex items-center justify-center gap-3">
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
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto pb-16 pt-8 px-[10vw] scrollbar-hide select-none snap-x snap-mandatory"
          onScroll={() => {
            checkScroll();
            updateCardTransforms();
          }}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            perspective: "1800px",
            transformStyle: "preserve-3d",
          }}
        >
          {about.team.map((teamMember, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="flex-shrink-0 w-[320px] md:w-[400px] will-change-transform snap-center"
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              style={{
                opacity: cardTransforms[index]?.opacity ?? 0.5,
                zIndex: cardTransforms[index]?.zIndex ?? 1,
              }}
            >
              <div
                className="h-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateY(${cardTransforms[index]?.translateY ?? 0}px) translateZ(${cardTransforms[index]?.translateZ ?? 0}px) rotateY(${cardTransforms[index]?.rotateY ?? 0}deg) rotateX(${cardTransforms[index]?.rotateX ?? 0}deg) scale(${cardTransforms[index]?.scale ?? 0.88})`,
                  transition: "transform 220ms ease-out, opacity 220ms ease-out, z-index 220ms",
                }}
              >
                <Tilt glareEnable glareMaxOpacity={0.1} glareColor="#e63946" tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02}>
                  <div className="relative backdrop-blur-md bg-white/5 border border-white/10 p-8 cursor-pointer group h-full flex flex-col" onClick={() => setSelectedMember(teamMember)}>
                    <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-brand-red/50 group-hover:border-brand-red transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-brand-red/20 group-hover:border-brand-red/60 transition-colors duration-300" />

                    {teamMember.upcomingProject && (
                      <div className="absolute top-0 right-0 bg-brand-red text-brand-lightYellow text-[10px] font-normal tracking-widest uppercase px-3 py-1.5 flex flex-col items-end shadow-lg rounded-bl-lg">
                        <span className="opacity-80 text-[8px] mb-0.5">Upcoming Project</span>
                        <span className="mb-0.5">{teamMember.upcomingProject.title}</span>
                        <span className="opacity-90">
                          {teamMember.upcomingProject.role} • {teamMember.upcomingProject.type}
                        </span>
                      </div>
                    )}

                    <div className="w-20 h-20 mb-6 overflow-hidden border border-brand-red/20 bg-brand-darker flex-shrink-0">
                      <img src={teamImages[teamMember.name] || teamMember.image || logoB} alt={teamMember.name} className="w-full h-full object-cover" />
                    </div>

                    <h3 className="text-2xl font-normal text-brand-red mb-1" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                      {teamMember.name}
                    </h3>
                    <p className="text-brand-red text-xs tracking-widest uppercase mb-3">{teamMember.role}</p>

                    {teamMember.imdb && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-[10px] tracking-wider font-normal">
                          ★ IMDb Verified
                        </span>
                      </div>
                    )}

                    <p className="text-brand-lightYellow/80 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">{teamMember.bio}</p>

                    <button className="mt-auto flex items-center gap-2 text-brand-red text-xs tracking-widest uppercase font-normal">
                      View Profile →
                    </button>
                  </div>
                </Tilt>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedMember(null)}>
            <motion.div className="relative bg-brand-gray border border-brand-lightYellow/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-8">
                <button className="absolute top-4 right-4 text-brand-lightYellow/60 hover:text-brand-lightYellow" onClick={() => setSelectedMember(null)}>
                  ✕
                </button>
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 overflow-hidden border border-brand-red/20 bg-brand-darker flex-shrink-0">
                    <img src={teamImages[selectedMember.name] || selectedMember.image || logoB} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-normal text-brand-red" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                      {selectedMember.name}
                    </h3>
                    <p className="text-brand-red text-xs tracking-widest uppercase">{selectedMember.role}</p>
                  </div>
                </div>
                <p className="text-brand-lightYellow/80 text-sm leading-relaxed mt-5">{selectedMember.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedMember.expertise.map((e, i) => (
                    <span key={i} className="px-3 py-1 border border-brand-red/30 text-brand-red text-xs uppercase">
                      {e}
                    </span>
                  ))}
                </div>

                {currentCredits.length > 0 && (
                  <div className="mt-8">
                    {hasTabbedCredits ? (
                      <div className="flex border-b border-brand-lightYellow/10">
                        {selectedMember.hollywoodCredits && (
                          <button onClick={() => setCreditsTab("hollywood")} className={`px-4 py-2 text-xs uppercase ${creditsTab === "hollywood" ? "border-b-2 border-brand-red text-brand-lightYellow" : "text-brand-lightYellow/40"}`}>
                            Hollywood
                          </button>
                        )}
                        {selectedMember.indianCredits && (
                          <button onClick={() => setCreditsTab("india")} className={`px-4 py-2 text-xs uppercase ${creditsTab === "india" ? "border-b-2 border-brand-red text-brand-lightYellow" : "text-brand-lightYellow/40"}`}>
                            Indian Cinema
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-brand-lightYellow/40 text-xs tracking-[0.3em] uppercase border-b border-brand-lightYellow/10 pb-2">
                        Credits
                      </p>
                    )}
                    <div className="mt-4 space-y-2">
                      {currentCredits.map((credit, i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-brand-lightYellow/5 text-sm">
                          <span className="text-brand-lightYellow/80">{credit.title}</span>
                          <span className="text-brand-lightYellow/40">{credit.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
