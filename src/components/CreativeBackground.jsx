import React from 'react';

export default function CreativeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      
      {/* 3D CGI Wireframe Image (Very VFX / Modeling vibe) */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1633511090333-e5eeb430d413?q=80&w=2564&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'hue-rotate(320deg) saturate(1.5)',
          transform: 'scale(1.1)'
        }}
      />

      {/* Grid Overlay for 3D Workspace Feel */}
      <div className="absolute inset-0"
           style={{
               backgroundImage: 'linear-gradient(rgba(230, 57, 70, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(230, 57, 70, 0.05) 1px, transparent 1px)',
               backgroundSize: '40px 40px',
               perspective: '1000px',
               opacity: '0.4'
           }}>
        <div className="w-full h-full" style={{
            background: 'radial-gradient(circle at center, transparent 0%, #050505 80%)'
        }}></div>
      </div>

      {/* Cinematic Glowing Orbs (Animates without needing intense config) */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-brand-red/10 blur-[120px] mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-brand-gold/5 blur-[150px] mix-blend-screen animate-float"></div>
      
      {/* Moving Light Leak */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
            background: 'linear-gradient(45deg, transparent 40%, rgba(230,57,70,0.15) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: 'gradientMove 15s ease infinite'
        }}
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      {/* Dark Vignette to ground the design */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
    </div>
  );
}
