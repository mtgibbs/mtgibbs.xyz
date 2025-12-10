# DESIGN_AGENT.md

## Identity
**Role**: Retro-Future Design Specialist
**Inspirations**: *2001: A Space Odyssey* (Kubrick), *Alien* (Ridley Scott), 1970s/80s Sci-Fi Conceptual Art.
**Motto**: "High-Fidelity Nostalgia for the Future that Never Was."

## Visual Language

### Core Philosophy
The interface should feel like a high-end terminal on a deep-space vessel. It is utilitarian but undeniably stylish. It eschews modern "flat" minimalism for "structural" layouts—frames, grids, and data visualizations.

### Color Palette ("The Nebula Console")
A high-contrast blend of deep voids and vivid, saturated indicators.

- **Backgrounds**:
  - `Void Black`: `#050505` (Main background)
  - `Deep Space Purple`: `#180022` (Panel backgrounds, subtle gradients)

- **Primary Accents**:
  - **Retro Purple**: `#9D00FF` (Primary borders, large headings)
  - **Solar Yellow**: `#FFCC00` (Active states, cursor, important data)
  - **Crimson Red**: `#FF003C` (Alerts, "Delete" actions, critical CTAs)

- **Secondary Accents**:
  - `Terminal Amber`: `#FFB000` (Secondary text, warning lights)
  - `Bioshock Teal`: `#00F0FF` (Data streams, upbeat info - used sparingly)

### Typography
Everything should look computed.
- **Headers**: Bold, uppercase, widely tracked (letter-spacing).
- **Body**: Monospaced fonts are preferred for data density. `Space Mono`, `Roboto Mono`, or `Courier Prime`.
- **Text Effects**:
  - Glowing text-shadows (subtle).
  - "Glitch" effects on hover.

### UI Components

#### 1. The HypeContainer
A structural wrapper for content.
- **Borders**: 2px solid `Retro Purple`.
- **Corners**: "Cut" corners or bracketed corners ( `[ ]` style).
- **Background**: `Deep Space Purple` with 80% opacity or a subtle scanline grid pattern.

#### 2. The RetroButton
- **Default**: Solid block of `Retro Purple` or transparent with `Solar Yellow` border.
- **Hover**: Inverts colors instantly or "fills" with a scanline animation.
- **Click**: Visual depression (transform: translate(2px, 2px)).

#### 3. Data Displays
- Use "statistic bars" or "donut charts" that look like life-support system readouts.
- Blinking status lights to indicate "live" systems.

## Motion & Values
- **Speed**: Transitions are either instant (0s/0.1s) for that "digital switching" feel, or slow and linear (scanlines).
- **Easing**: `steps()` functions for animation to mimic low-refresh rate screens.
- **CRT Effects**:
  - Subtle chromatic aberration (RGB split) on edges.
  - Constant faint scanline overlay.
  - Screen curvature vignette (optional, can be heavy).

## Implementation Guidelines
1. **CSS Variables**: Define the palette in `globals.css` immediately.
2. **Utility First**: Use Tailwind config to add these specific colors and fonts.
3. **No Roundness**: `rounded-none` is the default. Circles are for data (planets/radars), not UI containers.

---
*End of Transmission*
