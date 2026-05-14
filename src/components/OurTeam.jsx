import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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

function TeamProfileModal({
  selectedMember,
  onClose,
  creditsTab,
  setCreditsTab,
  hasTabbedCredits,
  currentCredits,
  teamImages,
  logoB,
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    (
      <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/90 px-0 pt-2 backdrop-blur-sm">
        <div className="absolute inset-0" aria-hidden="true" onClick={onClose} />

        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-[90vh] w-full flex-col overflow-hidden rounded-t-[16px] bg-brand-gray shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:w-[60vw] md:rounded-t-[18px] md:rounded-b-none"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 border-b border-brand-lightYellow/10 px-3 py-3 md:px-4">
            <div>
              <div className="mb-2 h-1 w-10 rounded-full bg-brand-lightYellow/20" />
              <p className="text-xs uppercase tracking-[0.35em] text-brand-red">Team Profile</p>
              <h3
                className="mt-1 text-xl text-brand-lightYellow md:text-2xl"
                style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
              >
                {selectedMember.name}
              </h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-brand-lightYellow/40 md:text-xs">
                {selectedMember.role}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-lightYellow/15 text-brand-lightYellow/70 transition-all duration-200 hover:border-brand-red hover:bg-brand-red hover:text-brand-lightYellow md:h-10 md:w-10"
              aria-label="Close profile"
            >
              X
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden md:grid md:grid-rows-[40%_60%]">
            <div className="px-4 py-4 md:px-6 md:py-4 md:overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden border border-brand-red/20 bg-brand-darker md:h-24 md:w-24">
                  <img
                    src={teamImages[selectedMember.name] || selectedMember.image || logoB}
                    alt={selectedMember.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3
                    className="text-3xl font-normal text-brand-red"
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                  >
                    {selectedMember.name}
                  </h3>
                  <p className="text-brand-red text-xs tracking-widest uppercase">{selectedMember.role}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-brand-lightYellow/80">{selectedMember.bio}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedMember.expertise.map((expertise, index) => (
                  <span key={index} className="border border-brand-red/30 px-3 py-1 text-xs uppercase text-brand-red">
                    {expertise}
                  </span>
                ))}
              </div>
            </div>

            {currentCredits.length > 0 ? (
              <div className="flex-1 overflow-y-auto px-4 pb-4 md:px-6 md:pb-5 md:pt-2">
                {hasTabbedCredits ? (
                  <div className="flex border-b border-brand-lightYellow/10">
                    {selectedMember.hollywoodCredits ? (
                      <button
                        type="button"
                        onClick={() => setCreditsTab("hollywood")}
                        className={`px-4 py-2 text-xs uppercase ${creditsTab === "hollywood" ? "border-b-2 border-brand-red text-brand-lightYellow" : "text-brand-lightYellow/40"}`}
                      >
                        Hollywood
                      </button>
                    ) : null}
                    {selectedMember.indianCredits ? (
                      <button
                        type="button"
                        onClick={() => setCreditsTab("india")}
                        className={`px-4 py-2 text-xs uppercase ${creditsTab === "india" ? "border-b-2 border-brand-red text-brand-lightYellow" : "text-brand-lightYellow/40"}`}
                      >
                        Indian Cinema
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <p className="border-b border-brand-lightYellow/10 pb-2 text-xs uppercase tracking-[0.3em] text-brand-lightYellow/40">
                    Credits
                  </p>
                )}

                <div className="mt-4 space-y-2">
                  {currentCredits.map((credit, index) => (
                    <div key={index} className="flex justify-between border-b border-brand-lightYellow/5 py-2 text-sm">
                      <span className="text-brand-lightYellow/80">{credit.title}</span>
                      <span className="text-brand-lightYellow/40">{credit.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="h-px w-full bg-brand-lightYellow/10" />
        </motion.div>
      </div>
    ),
    document.body
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
      const absDistance = Math.min(Math.abs(distance), 1.05);
      const frontLift = Math.max(0, 1 - absDistance);

      return {
        scale: 1 - absDistance * 0.1,
        rotateY: -distance * 18,
        rotateX: absDistance * 2,
        translateY: absDistance * 8,
        translateZ: frontLift * 24,
        zIndex: Math.round(100 - absDistance * 100),
        opacity: 1 - absDistance * 0.2,
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

  useEffect(() => {
    if (!selectedMember) {
      return;
    }

    setCreditsTab("hollywood");
  }, [selectedMember]);

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
            perspective: "2600px",
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
                <Tilt glareEnable glareMaxOpacity={0.05} glareColor="#e63946" tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1400} scale={1.01}>
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
          <TeamProfileModal
            selectedMember={selectedMember}
            onClose={() => setSelectedMember(null)}
            creditsTab={creditsTab}
            setCreditsTab={setCreditsTab}
            hasTabbedCredits={hasTabbedCredits}
            currentCredits={currentCredits}
            teamImages={teamImages}
            logoB={logoB}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
