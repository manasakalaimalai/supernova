# supernova

Standalone landing page for Supernova — Bangalore, October 10 2026.

A single static HTML file plus assets. No framework, no build step: open
`index.html`, edit, refresh. Deployed on Vercel as a static site.

## Local

```bash
npx serve .          # http://localhost:3000
```

## Structure

```
index.html           the whole page — markup, CSS and JS in one file
assets/              images, video, favicons, OG card
vercel.json          long cache on /assets, no cache on the HTML
```

## Notes for future edits

- **Design rule:** one light source per viewport. Every section has exactly one
  heat source (the hero bloom, the horizon line, a lit card, the inferno).
  If two things glow at once, something's wrong.
- **No border-radius** anywhere except the 2px CTA. This page has edges, not pills.
- **Three typefaces only:** Archivo (display + body), Instrument Serif italic
  (one emphasis phrase per section), Space Mono (all metadata, always uppercase).
- The hero glow tracks the cursor from `mousemove` directly, *not* from the
  `requestAnimationFrame` loop — rAF gets throttled when a tab is backgrounded and
  the glow would silently stop following.
- Applications are live via Founderboard (external link, opens in a new tab);
  the `.cta-soon` style is kept for reuse once applications close.

## Social links

The footer Instagram and X links currently point at the platform homepages —
replace with the real Nova handles before sharing widely.
