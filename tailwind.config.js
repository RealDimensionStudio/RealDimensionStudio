/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#e63946",
          orange: "#f4a261",
          gold: "#e9c46a",
          dark: "#141414", // Lightened from 0a0a0a
          darker: "#0d0d0d", // Lightened from 050505
          gray: "#1c1c1c", // Lightened from 111111
          grayLight: "#262626", // Lightened from 1a1a1a
          muted: "#aaaaaa", // Lightened from 888888
          lightYellow: "#fceaa4",
        },
      },
      fontFamily: {
        heading: ["'Bebas Neue'", "cursive"],
        body: ["'Inter'", "sans-serif"],
        accent: ["'Rajdhani'", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-reverse": "floatReverse 8s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
        "marquee2": "marquee2 25s linear infinite",
        "scan-line": "scanLine 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-15px) translateX(10px)" },
          "66%": { transform: "translateY(10px) translateX(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: 0.4, transform: "scale(1)" },
          "50%": { opacity: 0.8, transform: "scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
}
