import CreativeBackground from "../components/CreativeBackground";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Contact from "../components/Contact";
import studioData from "../data/studioData";

export default function ContactPage({ currentPath = "/contact", onNavigate }) {
  const { studio } = studioData;

  return (
    <div className="relative text-brand-lightYellow min-h-screen noise-overlay">
      <Seo
        title="Contact Real Dimension Studio"
        description={`${studio.name} contact details, location, and social profiles for post production, VFX, CGI, editing, and color grading projects.`}
        path="/contact"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Real Dimension Studio",
            url: `${studio.seo.canonicalUrl}/contact`,
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
              <p className="text-brand-red tracking-[0.35em] uppercase text-xs mb-4">Contact</p>
              <h1 className="text-5xl md:text-7xl font-normal text-brand-lightYellow leading-tight" style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.05em" }}>
                Real Dimension Studio
              </h1>
              <h2 className="mt-4 text-xl md:text-2xl text-brand-lightYellow/80 leading-snug">
                Post Production Studio for VFX, CGI, Video Editing, Color Grading & Motion Graphics
              </h2>
              <p className="mt-6 text-brand-lightYellow/60 text-base md:text-lg leading-relaxed">
                Reach out for feature films, ads, music videos, OTT, and all post production work.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-brand-lightYellow/60">
                <span>{studio.location}</span>
                <span className="text-brand-red">•</span>
                <span>{studio.email}</span>
                <span className="text-brand-red">•</span>
                <span>{studio.phone}</span>
              </div>
            </div>
          </section>

          <Contact />
        </main>
      </div>
    </div>
  );
}