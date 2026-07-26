# Vansh Jangid — Portfolio

A modern, animated portfolio showcasing AI engineering and automation expertise. Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.

## Features

- Smooth intro animation with multilingual greetings
- Custom cursor and animated visual effects
- Fully responsive design
- Fast builds with Vite
- Interactive project showcase
- Resume download

## Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Build:** Vite (static SPA — no server runtime required)
- **Deployment:** Any static host (Vercel, Cloudflare Pages, Netlify, GitHub Pages)
- **Icons & UI:** Custom components with Radix UI patterns

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

Output goes to `dist/` — a fully static folder (HTML, CSS, JS). No Node server, no serverless function, no edge runtime is needed to host it.

### Preview the production build locally

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx              # Main page (all sections)
├── main.tsx             # App entry point
├── components/
│   ├── Preloader.tsx    # Intro animation
│   ├── ProjectVisual.tsx # Project showcase
│   ├── ContactForm.tsx  # Contact section
│   └── ui/              # UI components
├── lib/                 # Utilities
├── hooks/               # Custom hooks
└── styles.css           # Global styles

public/
├── favicon.ico
└── Vansh_Resume_SDE.pdf
```

## Deployment

Push to GitHub, then import the repo in Vercel (or Cloudflare Pages / Netlify):
- **Build command:** `npm run build`
- **Output directory:** `dist`

That's it — no other configuration needed.

---

**Vansh Jangid**
Applied AI Engineer | RPA Developer | New Delhi, India
