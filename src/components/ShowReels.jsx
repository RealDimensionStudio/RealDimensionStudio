import { useState } from "react";
import studioData from "../data/studioData";

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px bg-brand-red" />
      <span className="text-brand-red text-xs tracking-[0.35em] uppercase font-normal">{text}</span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="6,4 20,12 6,20" fill="currentColor" />
    </svg>
  );
}

export default function ShowReels() {
  const { reels } = studioData;
  const [activeReel, setActiveReel] = useState(null);

  const getEmbedUrl = (videoId, platform) => {
    if (platform === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`;
    }
    if (platform === "instagram") {
      return `https://www.instagram.com/reel/${videoId}/embed/`;
    }
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
  };

  return (
    <section id="reels" className="relative bg-brand-darker py-32 overflow-hidden">
      {/* BG radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e63946 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className="text-center mb-16"
        >
          <SectionLabel text="In Motion" />
          <h2
            className="text-5xl md:text-7xl font-normal text-brand-red"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            {reels.headline}
          </h2>
          <p className="text-brand-muted text-sm tracking-widest uppercase mt-2">
            {reels.subHeadline}
          </p>
          <p className="text-brand-lightYellow/40 text-sm mt-4 max-w-lg mx-auto">{reels.description}</p>
        </div>

        {/* Featured Reel */}
        <div
          className="relative mb-12 max-w-4xl mx-auto"
        >
          <div
            className="relative w-full overflow-hidden border border-brand-lightYellow/5"
            style={{ aspectRatio: "16/9" }}
          >
            <iframe
              src={getEmbedUrl(reels.featured.videoId, reels.featured.platform)}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              frameBorder="0"
              title={reels.featured.title}
            />
          </div>

          {/* Cinematic bars */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-black" />
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-black" />
        </div>

        {/* Reel cards grid */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
          {reels.reels.map((reel) => (
            <div
              key={reel.id}
              className="min-w-[82%] sm:min-w-[60%] md:min-w-0 md:w-auto snap-start"
            >
              {/* Video embed displayed directly in grid */}
              <div
                className="relative overflow-hidden border border-brand-lightYellow/5 hover:border-brand-red/40 transition-all duration-300 group"
                style={{ aspectRatio: "16/9" }}
              >
                <iframe
                  src={getEmbedUrl(reel.videoId, reel.platform)}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen"
                  frameBorder="0"
                  title={reel.title}
                />
              </div>

              <div className="mt-3">
                <span
                  className="text-[10px] tracking-widest uppercase font-normal"
                  style={{ color: "#e63946" }}
                >
                  {reel.category}
                </span>
                <p
                  className="text-brand-lightYellow text-sm font-normal mt-0.5 transition-colors duration-300"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  {reel.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for reel playback */}
      {activeReel && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setActiveReel(null)}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-brand-lightYellow/50 hover:text-brand-lightYellow text-sm tracking-widest uppercase flex items-center gap-2"
                onClick={() => setActiveReel(null)}
              >
                Close ✕
              </button>
              <div
                className="relative w-full border border-brand-lightYellow/10"
                style={{ aspectRatio: "16/9" }}
              >
                <div className="absolute top-0 left-0 right-0 h-3 bg-black" />
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-black" />
                <iframe
                  src={getEmbedUrl(activeReel.videoId, activeReel.platform)}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen"
                  frameBorder="0"
                  title={activeReel.title}
                />
              </div>
              <div className="mt-4">
                <h2
                  className="text-2xl font-normal text-brand-lightYellow"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  {activeReel.title}
                </h2>

              </div>
            </div>
          </div>
        )}
      
    </section>
  );
}
