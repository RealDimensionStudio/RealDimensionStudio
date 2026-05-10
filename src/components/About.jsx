import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function About() {
  const { about } = studioData;
  const [selectedMember, setSelectedMember] = useState(null);
  const [creditsTab, setCreditsTab] = useState("hollywood");
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const teamImages = {
    "Ravi Jadaun": raviJadaunImg,
    "Ravi K. Parashar (I)": raviParasharImg,
    "Shivam Singh": shivamImg,
    "Harendra Singh": harendraImg,
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
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section id="about" className="relative bg-brand-dark py-32 overflow-hidden">
      {/* BG decorations */}
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
        {/* Top section: badge + headline */}
        <motion.div
          className="max-w-4xl mx-auto mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-px bg-brand-lightYellow/30" />
            <span className="text-brand-lightYellow text-xs tracking-[0.35em] uppercase font-normal">{about.badge}</span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-normal text-brand-lightYellow leading-tight"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
          >
            You <span className="text-brand-red">DREAM</span>. We Make Them a <span className="text-brand-red">REALITY</span>.
          </h2>
          <p className="text-brand-red tracking-widest text-sm mt-2 uppercase">
            {about.subHeadline}
          </p>
        </motion.div>

        {/* Two-column: text + team card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="space-y-3 text-center">
            {about.description.map((para, i) => (
              <motion.p
                key={i}
                className="text-brand-lightYellow/60 text-sm leading-snug"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                {para}
              </motion.p>
            ))}

            <motion.blockquote
              className="border-t border-b border-brand-red py-3 my-4"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.45 }}
            >
              <p className="text-brand-red italic text-lg font-medium">
                "{about.philosophy}"
              </p>
            </motion.blockquote>

            <div className="mt-2">
              <a
                href="/RealDimensionStudio_Brochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-brand-red/30 bg-brand-red/10 text-brand-lightYellow text-sm tracking-widest uppercase rounded-full hover:bg-brand-red/20 hover:border-brand-red/60 hover:text-brand-lightYellow transition-all duration-200"
                title="Download PDF - More about us"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="text-sm">More about us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-24">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left">
              <h3 className="text-4xl font-normal text-brand-red tracking-wider uppercase mb-3" style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}>
                Our Team
              </h3>
              <div className="w-20 h-1 bg-brand-red mx-auto md:mx-0" />
            </div>

            {/* Navigation Arrows */}
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
            className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide select-none"
            onScroll={checkScroll}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {about.team.map((teamMember, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                className="flex-shrink-0 w-[320px] md:w-[400px]"
              >
                <Tilt
                  glareEnable
                  glareMaxOpacity={0.10}
                  glareColor="#e63946"
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={1000}
                  scale={1.02}
                >
                  <div className="relative bg-brand-grayLight border border-brand-lightYellow/5 p-8 cursor-pointer group h-full flex flex-col"
                    onClick={() => setSelectedMember(teamMember)}
                  >
                    <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-brand-red/50 group-hover:border-brand-red transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-brand-red/20 group-hover:border-brand-red/60 transition-colors duration-300" />

                    {teamMember.upcomingProject && (
                      <div className="absolute top-0 right-0 bg-brand-red text-brand-lightYellow text-[10px] font-normal tracking-widest uppercase px-3 py-1.5 flex flex-col items-end shadow-lg rounded-bl-lg">
                        <span className="opacity-80 text-[8px] mb-0.5">Upcoming Project</span>
                        <span className="mb-0.5">{teamMember.upcomingProject.title}</span>
                        <span className="opacity-90">{teamMember.upcomingProject.role} • {teamMember.upcomingProject.type}</span>
                      </div>
                    )}

                    {teamMember.isDragSupported && (
                      <div className="absolute top-0 left-0 text-brand-red opacity-30 p-2">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="5" cy="5" r="1"/><circle cx="19" cy="5" r="1"/><circle cx="5" cy="19" r="1"/><circle cx="19" cy="19" r="1"/><circle cx="12" cy="12" r="1"/><path d="M5 12h14M12 5v14"/>
                        </svg>
                      </div>
                    )}

                    <div className="w-20 h-20 mb-6 overflow-hidden border border-brand-red/20 bg-brand-darker flex-shrink-0">
                      <img
                        src={teamImages[teamMember.name] || teamMember.image || logoB}
                        alt={teamMember.name}
                        className="w-full h-full object-cover"
                      />
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <motion.h3 className="text-center text-brand-lightYellow/40 text-xs tracking-[0.4em] uppercase mb-10">We Serve</motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {about.highlights.map((item, i) => (
              <motion.div key={i} className="flex flex-col items-center gap-3 p-5 border border-brand-lightYellow/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-brand-lightYellow/60 group-hover:text-brand-lightYellow text-xs tracking-widest uppercase text-center">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="relative bg-brand-gray border border-brand-lightYellow/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <button className="absolute top-4 right-4 text-brand-lightYellow/60 hover:text-brand-lightYellow" onClick={() => setSelectedMember(null)}>✕</button>
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 overflow-hidden border border-brand-red/20 bg-brand-darker flex-shrink-0">
                    <img
                      src={teamImages[selectedMember.name] || selectedMember.image || logoB}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-normal text-brand-red" style={{ fontFamily: "'Bebas Neue', cursive" }}>{selectedMember.name}</h3>
                    <p className="text-brand-red text-xs tracking-widest uppercase">{selectedMember.role}</p>
                  </div>
                </div>
                <p className="text-brand-lightYellow/80 text-sm leading-relaxed mt-5">{selectedMember.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedMember.expertise.map((e, i) => (
                    <span key={i} className="px-3 py-1 border border-brand-red/30 text-brand-red text-xs uppercase">{e}</span>
                  ))}
                </div>

                {(selectedMember.hollywoodCredits || selectedMember.indianCredits) && (
                  <div className="mt-8">
                    <div className="flex border-b border-brand-lightYellow/10">
                      {selectedMember.hollywoodCredits && (
                        <button onClick={() => setCreditsTab("hollywood")} className={`px-4 py-2 text-xs uppercase ${creditsTab === "hollywood" ? "border-b-2 border-brand-red text-brand-lightYellow" : "text-brand-lightYellow/40"}`}>Hollywood</button>
                      )}
                      {selectedMember.indianCredits && (
                        <button onClick={() => setCreditsTab("india")} className={`px-4 py-2 text-xs uppercase ${creditsTab === "india" ? "border-b-2 border-brand-red text-brand-lightYellow" : "text-brand-lightYellow/40"}`}>Indian Cinema</button>
                      )}
                    </div>
                    <div className="mt-4 space-y-2">
                      {(creditsTab === "hollywood" ? selectedMember.hollywoodCredits : selectedMember.indianCredits || []).map((credit, i) => (
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
