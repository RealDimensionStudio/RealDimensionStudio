import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import OurWork from "./components/OurWork";
import ShowReels from "./components/ShowReels";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="bg-brand-darker text-brand-lightYellow">
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
