import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import studioData from "../data/studioData";
import logo from "../assets/RDS Logo final_V04.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { nav, studio } = studioData;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-brand-darker/90 backdrop-blur-md border-b border-brand-lightYellow/5 py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="home" smooth duration={600} className="cursor-pointer group flex items-center gap-2">
            <img
              src={logo}
              alt="Real Dimension Studio"
              className="h-10 w-10 object-contain group-hover:drop-shadow-[0_0_12px_rgba(230,57,70,0.7)] transition-all duration-300"
            />
            <div className="flex flex-col leading-none">
              <span
                className="text-brand-red text-sm font-normal tracking-widest"
                style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
              >
                REAL DIMENSION
              </span>
              <span className="text-brand-lightYellow text-[9px] tracking-[0.25em] uppercase">
                Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                smooth
                duration={600}
                offset={-70}
                spy
                activeClass="text-brand-red"
                className="text-brand-lightYellow/60 hover:text-brand-lightYellow text-sm tracking-widest uppercase font-medium transition-colors duration-300 cursor-pointer relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="contact"
              smooth
              duration={600}
              offset={-70}
              className="hidden md:flex items-center gap-2 px-5 py-2 border border-brand-red text-brand-red text-xs tracking-widest uppercase font-normal hover:bg-brand-red hover:text-brand-lightYellow transition-all duration-300 cursor-pointer"
            >
              Get In Touch
            </Link>

            <button
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-6 h-px bg-brand-lightYellow block" />
              <span className="w-4 h-px bg-brand-red block" />
              <span className="w-6 h-px bg-brand-lightYellow block" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-brand-darker flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Grid bg */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(230,57,70,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.3) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <div className="relative z-10 flex flex-col h-full px-8 py-6">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Real Dimension Studio" className="h-10 w-10 object-contain" />
                  <span
                    className="text-brand-red text-lg font-normal tracking-widest"
                    style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
                  >
                    REAL DIMENSION
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-brand-lightYellow/20 text-brand-lightYellow/60 hover:text-brand-lightYellow hover:border-brand-lightYellow transition-colors"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col gap-2 flex-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      to={item.href}
                      smooth
                      duration={600}
                      offset={-70}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-4 py-4 border-b border-brand-lightYellow/5 cursor-pointer"
                    >
                      <span className="text-brand-red/40 text-xs font-mono">
                        0{i + 1}
                      </span>
                      <span
                        className="text-brand-lightYellow/70 group-hover:text-brand-lightYellow text-4xl font-normal tracking-wider transition-colors duration-300"
                        style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom contact */}
              <motion.div
                className="text-brand-muted text-xs tracking-widest mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p>{studio.email}</p>
                <p className="mt-1">{studio.phone}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
