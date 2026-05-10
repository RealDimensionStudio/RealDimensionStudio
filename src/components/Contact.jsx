import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import studioData from "../data/studioData";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "VFX",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", service: "VFX", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative bg-brand-dark py-32 overflow-hidden">
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
                    <p className="text-brand-lightYellow/80 text-sm font-medium">{item.value}</p>
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
                  { label: "YouTube", href: studio.youtube, icon: "🎬" },
                  { label: "LinkedIn", href: studio.linkedin, icon: "💼" },
                  { label: "Vimeo", href: studio.vimeo, icon: "🎥" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-brand-lightYellow/10 flex items-center justify-center text-lg hover:border-brand-red/50 hover:bg-brand-red/5 transition-all duration-300"
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

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="block text-brand-lightYellow/40 text-xs tracking-widest uppercase mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-white/[0.03] border border-brand-lightYellow/10 focus:border-brand-red/60 text-brand-lightYellow placeholder-brand-lightYellow/20 px-4 py-3 text-sm outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-brand-lightYellow/40 text-xs tracking-widest uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-white/[0.03] border border-brand-lightYellow/10 focus:border-brand-red/60 text-brand-lightYellow placeholder-brand-lightYellow/20 px-4 py-3 text-sm outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-brand-lightYellow/40 text-xs tracking-widest uppercase mb-2">
                  Service Needed
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-[#141414] border border-brand-lightYellow/10 focus:border-brand-red/60 text-brand-lightYellow px-4 py-3 text-sm outline-none transition-colors duration-300 appearance-none cursor-pointer"
                >
                  {contact.formFields.find(f => f.name === "service").options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-brand-lightYellow/40 text-xs tracking-widest uppercase mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/[0.03] border border-brand-lightYellow/10 focus:border-brand-red/60 text-brand-lightYellow placeholder-brand-lightYellow/20 px-4 py-3 text-sm outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-4 text-sm tracking-widest uppercase font-normal transition-all duration-300 ${
                  status === "success"
                    ? "bg-green-600 text-brand-lightYellow"
                    : status === "sending"
                    ? "bg-white/10 text-brand-lightYellow/40 cursor-not-allowed"
                    : "bg-brand-red text-brand-lightYellow hover:bg-red-700"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message Sent!"
                  : "Send Message"}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center tracking-widest">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="mt-24 border-t border-brand-lightYellow/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-brand-lightYellow/20 text-xs tracking-widest">
            © {new Date().getFullYear()} RealDimension Studio. All rights reserved.
          </span>
          <span className="text-brand-lightYellow/10 text-xs tracking-widest uppercase">
            Mumbai, India
          </span>
        </div>
      </div>
    </section>
  );
}
