import { useState } from "react";
import { motion } from "framer-motion";
void motion;
import studioData from "../data/studioData";
import PdfPreviewModal from "./PdfPreviewModal";

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px bg-brand-red" />
      <span className="text-brand-red text-xs tracking-[0.35em] uppercase font-normal">{text}</span>
    </div>
  );
}

export default function Contact() {
  const { contact, studio } = studioData;
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <section id="contact" className="relative bg-transparent py-16 md:py-20 overflow-hidden">
      {/* BG accent */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-5 pointer-events-none"
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
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel text="Get In Touch" />
          <h2
            className="text-5xl md:text-7xl font-normal text-brand-red"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
          >
            {contact.headline}
          </h2>
          <p className="text-brand-red tracking-widest text-sm mt-2 uppercase">
            {contact.subHeadline}
          </p>
          <p className="text-brand-lightYellow/40 text-sm mt-4 max-w-lg mx-auto">{contact.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6 mb-12">
              {contact.info.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="w-10 h-10 flex-shrink-0 border border-brand-lightYellow/10 flex items-center justify-center text-lg group-hover:border-brand-red/50 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-brand-lightYellow/30 text-xs tracking-widest uppercase mb-0.5">
                      {item.label}
                    </p>
                    {item.type === "pdf" ? (
                      <button
                        type="button"
                        onClick={() => setIsPdfOpen(true)}
                        className="relative z-[60] inline-flex touch-manipulation cursor-pointer pointer-events-auto items-center gap-2 rounded-full border border-brand-red/35 bg-brand-red/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-brand-lightYellow transition-all duration-200 hover:border-brand-red hover:bg-brand-red hover:text-brand-lightYellow active:scale-[0.98]"
                        title={item.label}
                      >
                        <span>{studio.companyProfile.contactLabel}</span>
                        <span aria-hidden="true">View</span>
                      </button>
                    ) : item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-50 text-brand-lightYellow/80 text-sm font-medium hover:text-brand-red transition-colors duration-200 cursor-pointer pointer-events-auto"
                        title={item.label}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-brand-lightYellow/80 text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-brand-lightYellow/30 text-xs tracking-[0.35em] uppercase mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { label: "Instagram", href: studio.instagram, icon: "📸" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-50 w-10 h-10 border border-brand-lightYellow/10 flex items-center justify-center text-lg hover:border-brand-red/50 hover:bg-brand-red/5 transition-all duration-300 cursor-pointer pointer-events-auto"
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-16 border-l-2 border-brand-red pl-6">
              <p
                className="text-3xl font-normal text-brand-lightYellow leading-tight"
                style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}
              >
                You Imagine.
                <br />
                <span className="text-brand-red">We Create.</span>
              </p>
            </div>
          </motion.div>

          {/* Right: Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full border border-brand-lightYellow/10 rounded-lg overflow-hidden h-[400px]">
              <iframe
                title="Real Dimension Studio Location"
                src={`https://maps.google.com/maps?q=19.1359559,72.8292074&z=17&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 text-sm text-brand-lightYellow/80">
              <p className="font-medium">Address</p>
              <address className="not-italic">245, Laxmi Plaza, Sab Tv lane,<br/>Andheri West, Mumbai 400053</address>
              <p className="mt-2"><a href="https://www.google.com/maps/place/Laxmi+Plaza,+Laxmi+Industrial+Estate,+Suresh+Nagar,+Andheri+West,+Mumbai,+Maharashtra+400053/@19.1355734,72.8288198,17.85z" target="_blank" rel="noopener noreferrer" className="text-brand-red">Open in Google Maps →</a></p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="mt-12 border-t border-brand-lightYellow/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-brand-lightYellow/20 text-xs tracking-widest">
            © {new Date().getFullYear()} Real Dimension Studio. All rights reserved.
          </span>
          <span className="text-brand-lightYellow/10 text-xs tracking-widest uppercase">
            Mumbai, India
          </span>
        </div>
      </div>
      {isPdfOpen ? (
        <PdfPreviewModal
          onClose={() => setIsPdfOpen(false)}
          title={studio.companyProfile.title}
          previewUrl={studio.companyProfile.previewHref}
          externalUrl={studio.companyProfile.href}
        />
      ) : null}
    </section>
  );
}
