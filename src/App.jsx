import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import OurWork from "./components/OurWork";
import ShowReels from "./components/ShowReels";
import Contact from "./components/Contact";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="bg-brand-darker text-brand-lightYellow">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <OurWork />
        <ShowReels />
        <Contact />
      </main>
    </div>
  );
}
