# DESIGN.md — v6 "SHIPBOARD"

The confirmed visual direction for the v6 redesign, distilled from the
shape brief and prototype rounds (2026-07-04). `DESIGN_PHILOSOPHY.md` is
superseded where it conflicts (its "zine/collage/marker" language was
drift); `.antigravity/prompts/design-agent.md` remains the DNA source.

## Direction

The site is one continuous **197X shipboard computer display** — flat
signal-on-glass in warm phosphor. Anchors: MU/TH/UR 6000 (*Alien*, 1979),
HAL 9000's multi-panel array (*2001*). **No physical-world skeuomorphism**:
no paper, no plastic bezels, no objects — screens only.

## Sacred (never regress)

- The **code hero** and its typing mechanic (decade lineage, since 2.0.1/2017)
- Site-wide analog noise + scanline overlay
- The **VHS toggle** (becomes the decay master-dial)
- The Magnetic Spectrum tokens in `tailwind.config.js`

## Approved components (prototyped in `public/comps/`)

### 1. Phosphor CRT filter — `proto-e-crt-filter.html`, "New: Phosphor" mode
Replaces the current Alec-Lownes-style filter. The rule: **glyph fuzz is
static, life is composited.**
- Tight pixel fuzz via STATIC `text-shadow`: `0 0 1px currentColor` +
  `±0.6px` red/blue misconvergence fringe + `0 0 7px` amber bloom.
  Painted once — never animate `text-shadow` (the old filter's perf sin:
  it repaints every glyph every frame).
- Fine warm grain (SVG turbulence tile, static) + slot-mask triads (3px
  repeating gradient, static) + roll-bar sweep (`transform`-only) +
  breathing veil (full-screen `opacity` steps — the cheap replacement for
  the old flicker).
- Judge perf with the bench's FPS meter with the window VISIBLE
  (occluded windows throttle rAF to ~1fps and lie).

### 2. NAV 3D project radar — `proto-g-starfield.html` (DEFINITE KEEP)
Canvas star chart of the WHOLE GitHub account as bodies in 3D space
(`proto-f-nav-radar.html` is the earlier lorem version). Camera pitch
~0.52 rad so rings render as ellipses.
- **Pinned repos = navigable targets**: demo-mode auto-cycle until the
  user takes control (PREV/NEXT) — after that, no auto behavior; they
  chose their target. Zoom-to-lock with camera PAN that centers the
  target, reticle brackets, side readout (class/epoch/last-signal/status).
- **No sweep beam** (it slid off-pivot under camera pan). Orientation
  comes from a fixed faint X/Y/Z axis tripod at the world origin plus
  the age-shell rings. Rotation is slow (0.07 rad/s, 0.03 when locked).
- **Every other repo = ambient star** (non-selectable): position is
  diegetic — created-year sets the orbital shell (2013 core → 2026 rim),
  name-hash sets azimuth, push-recency sets brightness, repo size sets
  dot radius. Forks render dim chrome-blue ("derelict hulls").
- **Uplink signals**: dashed lines with a moving pulse between related
  bodies (e.g. mtgibbs.xyz ↔ pi-cluster ↔ pi-cluster-mcp). Extend with a
  relations map in /data later.
- **Private repos = classified contacts**: unnamed red open-circle
  blips; only the COUNT ships publicly ("CLASSIFIED n // SIGNAL
  WITHHELD"). Never bake private repo names into the public site.
- Orientation: center datum crosshair at the world origin (always on);
  X/Y/Z tripod exists behind a `SHOW_AXES` flag, default OFF.
- Ambient star alpha floor 0.28 so old bodies survive the scanlines.
- Census readout: charted / navigable / derelict / classified / signals.
- SHIPPED as `components/project-deck/StarChart.tsx` (replaces
  NavVisualizer): baked build-time catalog (GraphQL pinned + authed
  REST list + private COUNT) renders instantly and survives offline;
  the client then live-refreshes from the PUBLIC repos endpoint via
  SWR (5 min) — the site's cached-then-live pattern. The deck owns
  selection; the chart follows `current` with zoom-to-lock + pan.
  Prototype remains at public/comps/proto-g-starfield.html.

### 3. HAL mnemonic panels — `proto-b-hal.html`
Panel grammar for CONTENT modules: framed displays on a strict grid,
owned by a fat Heavitas 3-letter mnemonic tile with the full name in
small mono beside it. One-frame resync roll on hover.
**NOT for section headers** — the v5 rotated glitch section plates are
SACRED (tried 2026-07-05, rejected hard, reverted in 78ea025). Do not
replace SectionTitle again.

### 4. LOG event stream — `proto-b-hal.html` LOG panel
Approved pattern for existing readouts (System Logs etc.):
`[time] NAME >> detail [OK]` in dim cardboard with amber accents.

### 5. Motion vocabulary — `proto-d-telemetry.html`
Flip-digit counters (steps scaleY), self-drawing strip charts
(stroke-dashoffset, draw once and hold), drifting numeric readouts,
scrolling ticker, slow full-screen tracking sweep. Plus MU/TH/UR
line-by-line text draw for sparse moments (`proto-a-muthur.html`).

## Motion rules

- Composited properties only (`transform`, `opacity`); no animated
  text-shadow, no layout-property animation.
- Blurred text-shadow (`.phosphor-text`) is scoped to terminal surfaces
  only — NEVER site-wide (it taxes every rasterized scroll region).
- No huge animated layers: cap decorative backdrops to the viewport
  they're visible in (see CyberGrid), and canvas rAF loops must sleep
  when offscreen (IntersectionObserver) and on hidden tabs.
- Blinks and state changes use `steps()` — mechanical, not smooth.
- Easing is slightly sluggish ease-in-out ("mechanical weight").
- Every animation has a `prefers-reduced-motion` fallback (final state
  rendered instantly).

## Rejected (do not resurrect)

- Physical-object skeuomorphism (CRT sets, cassette sleeves, bezels, paper)
- Zine collage, torn edges, riso, marker script (Lazer84 retired from
  structural grammar)
- Construction/hazard-stripe semiotic graphics (proto C, scrapped)
- Cold matrix green, synthwave purple, pure black backgrounds
- Rotated stickers as section grammar (v5 pattern; v6 is tight/aligned)

## Type

- `Heavitas` — mnemonics, display headers (engraved-flat, no gradients)
- `Nineteen Ninety Seven` / mono stack — body, readouts, labels
- Uppercase with wide tracking for silkscreen-style labels; body mono
  stays mixed-case where prose length demands readability.
