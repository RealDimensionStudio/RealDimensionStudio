import CreativeBackground from "../components/CreativeBackground";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import About from "../components/About";
import studioData from "../data/studioData";

export default function AboutPage({ currentPath = "/about", onNavigate }) {
  const { studio, about } = studioData;

  return (
    <div className="relative text-brand-lightYellow min-h-screen noise-overlay">
      <Seo
        title="About Real Dimension Studio"
        description={`${studio.name} is a post production studio based in Mumbai. Learn about the founder, services, location, and brand story.`}
        path="/about"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Real Dimension Studio",
            url: `${studio.seo.canonicalUrl}/about`,
            description: studio.description,
          },
        ]}
      />

      <CreativeBackground />

      <div className="relative z-10 min-h-screen">
        <PageHeader currentPath={currentPath} onNavigate={onNavigate} />
        <main>
          <section className="relative py-16 md:py-20 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <p className="text-brand-red tracking-[0.35em] uppercase text-xs mb-4">About Us</p>
              <h1 className="text-5xl md:text-7xl font-normal text-brand-lightYellow leading-tight" style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}>
                Real Dimension Studio
              </h1>
              <h2 className="mt-4 text-xl md:text-2xl text-brand-lightYellow/80 leading-snug">
                Post Production Studio for VFX, CGI, Video Editing, Color Grading & Motion Graphics
              </h2>
              <p className="mt-6 text-brand-lightYellow/60 text-base md:text-lg leading-relaxed">
                {studio.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-brand-lightYellow/60">
                <span>{studio.location}</span>
                <span className="text-brand-red">•</span>
                <span>Founder: {studio.owner.name}</span>
                <span className="text-brand-red">•</span>
                <span>Established {studio.established}</span>
              </div>
            </div>
          </section>

          <About />

          <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-20">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border border-brand-lightYellow/10 bg-white/[0.02] p-6">
                <p className="text-brand-red text-xs tracking-[0.35em] uppercase mb-3">Founder / Owner</p>
                <h3 className="text-2xl font-normal text-brand-lightYellow" style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}>
                  {about.team[0].name}
                </h3>
                <p className="mt-2 text-brand-lightYellow/60 text-sm leading-relaxed">
                  {about.team[0].role}
                </p>
              </div>
              <div className="border border-brand-lightYellow/10 bg-white/[0.02] p-6">
                <p className="text-brand-red text-xs tracking-[0.35em] uppercase mb-3">Services</p>
                <p className="text-brand-lightYellow/60 text-sm leading-relaxed">
                  VFX, CGI integration, editing, color grading, DI, motion graphics, and cinematic finishing.
                </p>
              </div>
              <div className="border border-brand-lightYellow/10 bg-white/[0.02] p-6">
                <p className="text-brand-red text-xs tracking-[0.35em] uppercase mb-3">Contact</p>
                <p className="text-brand-lightYellow/60 text-sm leading-relaxed">{studio.email}</p>
                <p className="text-brand-lightYellow/60 text-sm leading-relaxed mt-1">{studio.phone}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}