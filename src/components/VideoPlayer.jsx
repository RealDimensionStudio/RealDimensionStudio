import { useRef, useEffect } from "react";

export default function VideoPlayer({ videoId, title }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    let player;

    const loadVimeoApi = () => {
      if (window.Vimeo) return Promise.resolve();
      return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://player.vimeo.com/api/player.js";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load Vimeo API"));
        document.head.appendChild(s);
      });
    };

    loadVimeoApi()
      .then(() => {
        try {
          player = new window.Vimeo.Player(iframeRef.current);
          // Ensure player is muted before attempting autoplay to avoid browser blocks
          if (typeof player.setMuted === "function") {
            player
              .setMuted(true)
              .then(() => player.play())
              .catch(() => {
                // fallback to play without mute change
                player.play().catch(() => {});
              });
          } else if (typeof player.setVolume === "function") {
            player
              .setVolume(0)
              .then(() => player.play())
              .catch(() => player.play().catch(() => {}));
          } else {
            player.play().catch(() => {});
          }
        } catch {
          // ignore
        }
      })
      .catch(() => {});

    return () => {
      if (player && typeof player.unload === "function") {
        player.unload().catch(() => {});
      }
    };
  }, [videoId]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border-2 border-brand-lightYellow/20 shadow-[0_0_80px_rgba(230,57,70,0.2)] group">
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=0&controls=1&title=0&byline=0&portrait=0&autopause=0&badge=0&dnt=1`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
        className="w-full h-full"
      />

      {/* no external player badge */}
    </div>
  );
}
