import { motion } from "framer-motion";
void motion;
import studioData from "../data/studioData";

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

  return (
    <section id="about" className="relative bg-transparent py-16 md:py-20 overflow-hidden">
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
          className="max-w-4xl mx-auto mb-12 text-center"
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
    </section>
  );
}
