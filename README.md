# RealDimension Studio

RealDimension Studio is a cinematic portfolio and studio landing page built with React and Vite. It presents the studio's services, featured work, show reels, and contact details through a bold, motion-heavy visual experience.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- GSAP
- React Scroll
- React Parallax Tilt
- React Three Fiber / Three.js
- EmailJS

## Features

- Animated splash screen on first load
- Full-screen hero section with particle and grid effects
- About, services, work, reels, and contact sections
- Horizontal service cards with drag-to-scroll interaction
- Data-driven content stored in `src/data/studioData.js`
- Responsive layout designed for desktop and mobile

## Project Structure

- `src/main.jsx` - App entry point
- `src/App.jsx` - Main layout and section order
- `src/components/` - Reusable page sections and UI pieces
- `src/data/studioData.js` - Studio copy, services, work, and navigation data
- `src/index.css` - Global styles and utility classes

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Notes

- The site content is currently driven by local data files rather than a backend.
- Studio copy and contact details can be updated in `src/data/studioData.js`.
