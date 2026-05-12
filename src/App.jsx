import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import OurTeam from "./components/OurTeam";
import Services from "./components/Services";
import OurWork from "./components/OurWork";
import Contact from "./components/Contact";
import SplashScreen from "./components/SplashScreen";
import CreativeBackground from "./components/CreativeBackground";
import Scroll3DEffects from "./components/Scroll3DEffects";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="relative text-brand-lightYellow min-h-screen noise-overlay">
      {/* Dynamic 3D / VFX Background Component */}
      <CreativeBackground />
      
      {/* Content wrapper with transparent overlay to ensure readability while displaying CGI depth */}
      <div className="relative z-10 min-h-screen">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
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
