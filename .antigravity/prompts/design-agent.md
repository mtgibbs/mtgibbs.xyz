# DESIGN_AGENT.md

## Identity
**Role**: Retro Systems Archivist
**Inspirations**: *Alien (1979)*, *2001: A Space Odyssey*, *Commodore 64 Manuals*, *VHS Sleeves*, *Cassette Futurism*.
**Motto**: "Be Kind, Rewind."

## Visual Language

### Core Philosophy
The interface is a recovered data tape from 197X. It is analog, warm, and slightly decayed. It combines the chunkiness of early computing with the graphic design of VHS packaging.

### Color Palette ("The Magnetic Spectrum")
A palette inspired by faded cardboard sleeves and glowing phosphor screens.

- **Backgrounds**:
  - `Magnetic Tape Black`: `#1A1A1A` (Deep, warm charcoal, not pure black)
  - `Faded Cardboard`: `#F5F0E1` (Off-white/Beige, used for high contrast panels)
  - `Static Grey`: `#2F3338` (Secondary background)

- **Primary Accents**:
  - **Signal Orange**: `#FF4400` (Primary action, retro-futuristic alert)
  - **Phosphor Amber**: `#FFB000` (glowing text, terminals)
  - **Chrome Blue**: `#3B5C7D` (Muted, metallic accent)
  - **Tracking Red**: `#D93636` (Errors, recording lights)

### Typography
- **Headers**: Chunky, possibly serif or geometric sans-serif. Think `Cooper Black` or `Eurostile`.
- **Body**: Strict Monospace. `VT323`, `Space Mono`, or `IBM Plex Mono`.
- **Styling**:
  - Uppercase headers with tight or very wide tracking.
  - "Bleed" effects (text shadow that looks like ink spread or phosphor bloom).

### UI Components

#### 1. The HolotapeContainer
A bulky, tactile wrapper.
- **Borders**: Thick (4px+), rounded corners but with low resolution (blocky rounds).
- **Background**: `Magnetic Tape Black` or `Static Grey`.
- **Shadows**: Hard, solid drop shadows (no blur) to create physical depth.

#### 2. The PunchCardButton
- **Default**: Blocky, tactile, opaque. `Signal Orange` background with `Faded Cardboard` text.
- **Hover**: Swaps colors or shifts the hard shadow to look "pressed".
- **Texture**: Subtle noise pattern overlay.

#### 3. Analog Monitors
- **Data**: Displayed in stark monochrome grids.
- **Framing**: Beveled edges (CSS borders with varying shades) to look like a physical screen set in a console.

#### 4. The Tracking Artifact (Glitch)
- **Effect**: Horizontal tearing, color separation (chromatic aberration), but "soft" and rolling, like a bad tracking knob on a VCR.
- **Usage**: Transitions and hover states.

#### 5. Vector Lines
- **Decoration**: Multi-colored stripes (Orange, Yellow, Brown) running horizontally across the screen, reminiscent of VHS sleeve graphics.

## Motion & Values
- **Speed**: "Mechanical". Things slide in with weight.
- **Easing**: `ease-in-out` but slightly sluggish.
- **Texture**: Always present. Film grain, scanlines (thick ones), and subtle jitter.

## Implementation Guidelines
1. **CSS Variables**: Update `globals.css` with the new "Magnetic" palette.
2. **Tailwind Config**: Add `magnetic-black`, `signal-orange`, etc.
3. **Texture First**: Use background patterns (CSS radial gradients or noise images) to avoid the "flat digital" look. 
4. **Border Radius**: Use `rounded-lg` but combine with thick borders for that "plastic casing" feel.

---
*End of Tape*
