import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

export default function OurWork() {
  const { work } = studioData;
  const [activeCategory, setActiveCategory] = useState("All");
  const portfolioGridRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(10);
  const showMoreButtonRef = useRef(null);
  const previousButtonTopRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = (event) => {
      setIsMobile(event.matches);
      setMobileVisibleCount(10);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const filtered =
    activeCategory === "All"
      ? work.projects
      : work.projects.filter((p) => p.category === activeCategory);

  const initialMobileCount = Math.min(10, filtered.length);
  const visibleProjects = isMobile ? filtered.slice(0, mobileVisibleCount) : filtered;

  useLayoutEffect(() => {
    if (previousButtonTopRef.current === null) {
      return;
    }

    const currentTop = showMoreButtonRef.current?.getBoundingClientRect().top;
    if (typeof currentTop === "number") {
      window.scrollBy({
        top: currentTop - previousButtonTopRef.current,
        behavior: "auto",
      });
    }

    previousButtonTopRef.current = null;
  }, [mobileVisibleCount]);

  const handleShowMore = () => {
    previousButtonTopRef.current = showMoreButtonRef.current?.getBoundingClientRect().top ?? null;
    setMobileVisibleCount((currentCount) => {
      const next = Math.min(currentCount + 5, filtered.length);
      return next;
    });
  };

  const handleShowLess = () => {
    previousButtonTopRef.current = showMoreButtonRef.current?.getBoundingClientRect().top ?? null;
    setMobileVisibleCount((currentCount) => Math.max(initialMobileCount, currentCount - 5));
  };

  return (
    <section id="work" className="relative bg-brand-dark py-32 overflow-hidden">
      {/* BG glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e63946 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="Portfolio" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="text-5xl md:text-7xl font-normal text-brand-red"
              style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
            >
              {work.headline}
              <br />
              <span className="text-brand-lightYellow">{work.subHeadline}</span>
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {work.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-xs tracking-widest uppercase font-normal border transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-brand-red border-brand-red text-brand-lightYellow"
                      : "border-brand-lightYellow/10 text-brand-lightYellow/40 hover:border-brand-lightYellow/30 hover:text-brand-lightYellow"
                  }`}

                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          ref={portfolioGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-2"
          layout
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Tilt
                  glareEnable
                  glareMaxOpacity={0.1}
                  glareColor="#e63946"
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={900}
                  scale={1.02}
                >
                  <div
                    className="relative overflow-hidden border border-brand-lightYellow/5 bg-brand-grayLight group cursor-pointer max-w-[290px] mx-auto w-full"
                    style={{ aspectRatio: "1/1.18" }}
                  >
                    {/* Thumbnail placeholder with gradient */}
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, #1a1a1a 0%, #111 50%, #0a0a0a 100%)`,
                      }}
                    >
                      {/* Decorative lines */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="w-20 h-20 border border-brand-lightYellow rounded-full" />
                        <div className="absolute w-14 h-14 border border-brand-lightYellow/50 rounded-full" />
                      </div>
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(circle at 30% 70%, #e63946 0%, transparent 50%)`,
                        }}
                      />
                      {/* Year badge */}
                      <span
                        className="absolute top-2 right-2 text-brand-lightYellow/10 text-4xl font-normal"
                        style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
                      >
                        {project.year}
                      </span>
                    </div>

                    {/* Featured badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-1 bg-brand-red text-brand-lightYellow text-[9px] tracking-widest uppercase font-normal">
                        {project.year}
                      </span>
                    </div>

                    {/* Information Overlay — Always Visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/40 to-transparent flex flex-col justify-end p-3 md:p-4 z-10">
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {project.tags.map((tag, ti) => (
                          <span
                            key={ti}
                            className="px-2 py-0.5 text-[10px] border border-brand-red/40 text-brand-red tracking-wider uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3
                        className="text-base font-normal text-brand-red mb-1"
                        style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-brand-lightYellow/70 text-[11px] leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-brand-lightYellow/40 text-[9px] tracking-widest uppercase">
                        <span>{project.type}</span>
                        <span className="w-1 h-1 bg-brand-red rounded-full" />
                        <span>{project.category}</span>
                        {project.imdbRating && (
                          <>
                            <span className="w-1 h-1 bg-brand-red rounded-full" />
                            <span className="text-yellow-500">★ {project.imdbRating}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {isMobile && filtered.length > mobileVisibleCount && (
          <div className="mt-8 text-center md:hidden">
            <button
              ref={showMoreButtonRef}
              className="px-6 py-2.5 border border-brand-lightYellow/20 text-brand-lightYellow text-xs tracking-widest uppercase hover:border-brand-red hover:text-brand-red transition-all duration-300"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}

        {isMobile && mobileVisibleCount > initialMobileCount && (
          <div className="mt-8 text-center md:hidden">
            <button
              ref={showMoreButtonRef}
              className="px-6 py-2.5 border border-brand-lightYellow/20 text-brand-lightYellow text-xs tracking-widest uppercase hover:border-brand-red hover:text-brand-red transition-all duration-300"
              onClick={handleShowLess}
            >
              Show Less
            </button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-brand-lightYellow/30 text-sm tracking-widest uppercase mb-4">
            Want to see more?
          </p>
          <button
            className="px-8 py-3 border border-brand-lightYellow/20 text-brand-lightYellow text-sm tracking-widest uppercase hover:border-brand-red hover:text-brand-red transition-all duration-300"
            onClick={() => {
              setActiveCategory("All");
              portfolioGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            View Full Portfolio
          </button>
        </motion.div>
      </div>
    </section>
  );
}
