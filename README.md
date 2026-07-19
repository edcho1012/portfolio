# Edward Cho — Portfolio

A single-page, scroll-driven portfolio built around one idea: **the whole site behaves like a body of water.** Color drifts like paint dissolving in a pool, ripples chase the cursor, small droplets fall and splash at the edges of the screen, and every navigation is a "dive" into color rather than a page change. It's built with React + Vite, ported 1:1 from an original vanilla-JS single-file HTML build.

## Why water

I wanted the site to feel calm and alive at the same time, the opposite of a static resume. Water fit for a few reasons:

- **Motion without noise.** Everything moves (blobs drifting, ripples spreading, particles rising) but slowly and softly, so it reads as ambience, not distraction.
- **Color as meaning, not decoration.** Each life area gets its own color drawn from an actual mood, not a random palette:
  - **Violet — About** — "the deep": who I am, underneath everything else
  - **Rose — Career** — "the warmth": what moved me, and the people I've shown up for
  - **Cobalt — Education** — "the clear": what I carry, the skills settled at the bottom
  - **Gold — Projects** — "the shimmer": what I made, catching the light
- **A closing note underneath the motion.** There's a small modal (triggered from a verse icon) that says the site is water in motion, but that stillness surfaces when you stop moving and let it settle, and that for me, that stillness comes from God, not from anything I built. That's the one honest, unbuilt thing in a site that is otherwise all custom-built animation. It's meant to be found, not forced on anyone, so it lives in an optional modal rather than the main flow.

Visually, the type pairing (Fraunces for display type, Familjen Grotesk for body text, IBM Plex Mono for labels and data rows) is meant to feel like an editorial field notebook, precise and slightly scientific, sitting on top of something organic and fluid.

## How it's structured to browse

- **Main screen:** four soft color "pools" sit over a canvas background, one per section (About, Career, Education, Projects). Hovering one highlights it; scrolling down while hovering "dives" into it.
- **Diving into a section:** the section's color spreads outward from the exact point you clicked, like paint released into water, while the ambient background blobs keep drifting underneath, untouched.
- **Inside a section:** sub-nodes (e.g. under About: Name, Education, Contact) sit over a solid-colored background. Scrolling down on a highlighted sub-node opens its detail card; scrolling up at the top of a section swims back out to the main screen.
- **Detail cards** expand from the clicked point with a circular reveal (clip-path), starting from the top so the title surfaces first.
- **Ambient life:** even when you're not doing anything, small droplets fall at the screen edges and splash into ripples, faint caustic light drifts across the surface, and tiny particles rise and fade, so the main screen never feels frozen.
- **Cursor glow:** a soft light follows the cursor with real motion physics (it lags slightly behind, stretches in the direction of travel, and pulses on click) rather than snapping to the pointer.
- **Sound:** an optional ambient cave-drip loop, toggled by a button or the spacebar, that crossfades in and out instead of cutting abruptly.

## How it's implemented

- **1:1 port, not a rewrite.** The original site was a single self-contained HTML file. To avoid introducing regressions while moving to React, all of the original `<script>` logic (canvas rendering, scroll/gesture handling, audio crossfade, section/detail state) was moved essentially unchanged into one `useEffect` in `src/App.jsx`, rather than being split into separate hooks or components. The state lives in plain closures, exactly as it did in the original vanilla-JS version.
- **Canvas-based rendering.** All of the paint blobs, ripples, droplets, caustics, sparkles, and cursor glow are drawn every frame on a single `<canvas>` with `requestAnimationFrame`, using layered `globalCompositeOperation` blend modes (`multiply` for the paint blobs, `soft-light` for caustics) so the colors mix the way real pigment in water would.
- **Scroll is a gesture, not a scrollbar.** There's no traditional page scroll. Wheel events are intercepted and accumulated to decide when a "dive," a "surface," or a detail open/close should fire, with gesture-locking so a single long trackpad scroll doesn't fire multiple transitions or leak into a transition that's already playing.
- **`React.StrictMode` is intentionally not used** in `src/main.jsx`. StrictMode double-invokes `useEffect` on mount in development, but this app's setup logic (event listeners, the animation loop) is written to run exactly once, with no cleanup step. Removing StrictMode keeps local dev behaving the same as production instead of breaking on double-mount.
- **Audio is embedded, not linked.** The ambient cave-drip sound is stored as a base64 string directly inside `App.jsx`, matching how the original single-file HTML worked, so the whole experience stays self-contained in one bundle. This does make the JS bundle noticeably larger than a typical React app.

## Project structure

- `index.html` — Vite entry point. The `<head>` (Google Fonts, viewport meta) is carried over unchanged from the original.
- `src/main.jsx` — React mount point.
- `src/App.jsx` — the original `<body>` markup (converted to JSX) plus the original `<script>` logic, inside one `useEffect`.
- `src/portfolio.css` — the original `<style>` block, unchanged.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Building

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploying to Vercel

Same flow used for other projects like PiTTime:

1. Push this folder to a GitHub repo.
2. Import it as a new project in Vercel.
3. Framework Preset: **Vite** (auto-detected) — Build Command `vite build`, Output Directory `dist`.
4. Deploy.

## A note on bundle size

Because the ambient sound is embedded as base64 inside `App.jsx` (matching the original HTML's approach), the JS bundle is larger than it would be with a linked audio file. If that ever needs optimizing, moving the sound to a real file (e.g. `public/cave-drip.mp3`) and loading it via `<audio src="/cave-drip.mp3">` would shrink the bundle significantly. For now, exact parity with the original was prioritized over bundle size.
