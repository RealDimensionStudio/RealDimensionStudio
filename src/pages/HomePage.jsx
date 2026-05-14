import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import OurTeam from "../components/OurTeam";
import Services from "../components/Services";
import OurWork from "../components/OurWork";
import Contact from "../components/Contact";
import SplashScreen from "../components/SplashScreen";
import CreativeBackground from "../components/CreativeBackground";
import Scroll3DEffects from "../components/Scroll3DEffects";
import Seo from "../components/Seo";
import studioData from "../data/studioData";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="relative text-brand-lightYellow min-h-screen noise-overlay">
      <Seo
        title={studioData.studio.seo.title}
        description={studioData.studio.seo.description}
        path="/"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: studioData.studio.name,
            url: studioData.studio.seo.canonicalUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${studioData.studio.seo.canonicalUrl}/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />

      <CreativeBackground />

      <div className="relative z-10 min-h-screen">
        {showSplash ? <SplashScreen onComplete={() => setShowSplash(false)} /> : null}
        <Scroll3DEffects />
        <Header />
        <main>
          <Hero />
          <About />
          <OurTeam />
          <Services />
          <OurWork />
          <Contact />
        </main>
      </div>
    </div>
  );
}