import { useEffect } from "react";

export default function Scroll3DEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll("main > section"));
    let frame = 0;

    sections.forEach((section) => {
      section.classList.add("rds-3d-section");
      const content = Array.from(section.children).find((child) => {
        const classes = child.className?.toString() || "";
        return classes.includes("max-w-") || classes.includes("relative z-10");
      });

      if (content) {
        content.classList.add("rds-3d-content");
      }
    });

    const update = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = (sectionCenter - viewportCenter) / Math.max(window.innerHeight, 1);
        const clamped = Math.max(-1, Math.min(1, distance));
        const visibility = Math.max(0, 1 - Math.abs(clamped));

        section.style.setProperty("--scroll-tilt-x", `${(-clamped * 2.2).toFixed(3)}deg`);
        section.style.setProperty("--scroll-tilt-y", `${(clamped * visibility * 0.6).toFixed(3)}deg`);
        section.style.setProperty("--scroll-lift", `${(visibility * 7).toFixed(3)}px`);
        section.style.setProperty("--scroll-depth", visibility.toFixed(3));
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      sections.forEach((section) => {
        section.classList.remove("rds-3d-section");
        section.style.removeProperty("--scroll-tilt-x");
        section.style.removeProperty("--scroll-tilt-y");
        section.style.removeProperty("--scroll-lift");
        section.style.removeProperty("--scroll-depth");
        Array.from(section.children).forEach((child) => child.classList?.remove("rds-3d-content"));
      });
    };
  }, []);

  return null;
}
