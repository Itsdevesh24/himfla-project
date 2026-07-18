## Plan

### 1. Hero videos (multiple, behind HIMFLA)
- Copy uploaded `a.mp4`, `1.mp4`, `2.mp4` plus existing `hero-spices.mp4` into the public assets pipeline.
- Replace the single `<video>` with a rotating background that cycles through all 4 videos (cross-fade or sequential `onEnded`), keeping autoplay/muted/loop/playsInline and the dark overlay.
- Centered overlay updated to:
  - HIMFLA (logo-styled heading)
  - "Since 2013 · Devbhoomi Uttarakhand" line directly below HIMFLA
  - Tagline + "Save the Glaciers" badge (kept, made a touch more prominent)

### 2. Logo cleanup
- Run an AI edit on `src/assets/himfla-logo.png` to remove the white background (transparent PNG, circular crop) and sharpen for clarity.
- Use the cleaner logo in: header, hero (optional), and a new centered footer logo.
- Add "Jai Himal · Jai Himfla" line directly under the new bottom logo.

### 3. Header / search
- Change search placeholder from "Search Himalayan products..." to "Search HIMFLA products...".

### 4. Section headings
- Rename "Our Collection" → "Explore HIMFLA".

### 5. Bottom nav active state
- Replace the static `active: true` on Home with a real `activeTab` state.
- Clicking Categories / Cart / My Orders / Profile highlights that tab the same way Home is highlighted today (amber color + scale on press).
- Keep hash-link scroll behavior.

### 6. Footer
- Add the cleaned circular HIMFLA logo centered at the very bottom (above the slogan).
- Slogan line below logo: "Jai Himal · Jai Himfla".
- Replace `new Date().getFullYear()` (currently 2026) with hardcoded `2023` in the copyright line.

### Files touched
- `src/routes/index.tsx` — main implementation
- `src/assets/himfla-logo.png` — regenerate transparent circular logo
- `public/hero-a.mp4`, `public/hero-1.mp4`, `public/hero-2.mp4` — new uploaded videos copied in

No backend, schema, or business-logic changes.