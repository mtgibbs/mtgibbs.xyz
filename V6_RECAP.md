# V6_RECAP.md — the "SHIPBOARD" sessions

Session log and prior-art index for the v6 redesign (2026-07-03 →
2026-07-09). `DESIGN.md` is the living spec; this file is the history —
what was tried, what won, what died, and where the bodies are buried.
Don't delete `public/comps/`: it is the prior art this file indexes.

## The arc

v5's terminal-brutalist collage was sharpened into **v6 "SHIPBOARD"**:
the whole site as one continuous 197X shipboard computer display
(MU/TH/UR 6000, HAL 9000's panel array). Flat signal-on-glass in warm
phosphor, no physical-world skeuomorphism, diegetic honesty throughout —
every readout corresponds to something real. Shipped to prod across
PRs #100–#110.

## Prototype inventory — `public/comps/`

Every comp is a self-contained HTML file served by the dev server at
`/comps/<name>.html`. Fonts load from `/fonts/`.

### Round 1 — direction studies (2026-07-04, shape brief)

| File | Direction | Verdict |
|---|---|---|
| `hardware-bezel.html` | Physical CRT set with plastic bezel chrome | REJECTED — physical-object skeuomorphism banned |
| `paper-phosphor.html` | Paper/print artifacts against phosphor | REJECTED — no paper, screens only |
| `phosphor-maximal.html` | All-screen warm-phosphor maximalism | Won in spirit — became SHIPBOARD |
| `recovered-tape.html` | Salvaged-media / degraded-tape fiction | REJECTED — object fiction, not display fiction |

The critique of this set produced the CONFIRMED direction (SHIPBOARD)
and the standing rule: **no objects, only screens.**

### Round 2 — SHIPBOARD grammar prototypes (2026-07-04)

| File | Explored | Verdict |
|---|---|---|
| `proto-a-muthur.html` | Sparse interrogative terminal, line-by-line draw | KEPT as motion vocabulary for sparse moments |
| `proto-b-hal.html` | Dense HAL mnemonic panel grid + LOG line grammar | KEPT — panel grammar (content only, never section headers) + LOG grammar (§4) |
| `proto-c-semiotic.html` | Cobb iconography / warning-label system | SCRAPPED and deleted in `002d302` ("construction aspect") — do not resurrect |
| `proto-d-telemetry.html` | Flip clock, strip charts, drifting readouts, ticker, tracking sweep | KEPT — motion vocabulary (§5) |

### Round 3 — instruments (2026-07-04)

| File | Explored | Verdict |
|---|---|---|
| `proto-e-crt-filter.html` | Phosphor CRT filter bench with FPS meter; "New: Phosphor" mode | SHIPPED site-wide (§1); bench remains the tuning reference |
| `proto-f-nav-radar.html` | 3D NAV project radar, lorem bodies | Superseded by proto-g |
| `proto-g-starfield.html` | Full real-GitHub-catalog star chart: shells, uplinks, factions, classified contacts | SHIPPED as `components/project-deck/StarChart.tsx` (§2) |

### Round 4 — component restyles (2026-07-07 → 07-08)

| File | Explored | Verdict |
|---|---|---|
| `proto-h-spotify-waveform.html` | Spotify scope-trace waveform candidates + H5 enclosure studies | SHIPPED as the footer visualizer (PRs #103/#105) |
| `proto-h-log-telemetry.html` | 3 LOG restyle variants: H1 HAL panel / H2 telemetry deck / H3 signal manifest | H2+H3 hybrid SHIPPED as the SystemLogs telemetry deck (PR #107) |

(Naming note: two comps share the `proto-h` prefix — parallel sessions
collided. Live with it; renaming breaks prior-art links.)

## Decision log

- **SHIPBOARD confirmed** (2026-07-04) — see `DESIGN.md` for the spec.
- **Sacred, never regress:** code hero typing mechanic (decade lineage),
  site-wide noise + scanlines, VHS toggle, Magnetic Spectrum tokens,
  and the **v5 rotated glitch section plates** — HAL headers were tried
  as section headers (2026-07-05), rejected hard ("my old headers were
  good shit"), reverted in `78ea025`. HAL grammar is for panel CONTENT.
- **Diegetic honesty enforced:** fake heartbeats (`CORE_TEMP 38°C`,
  random memory stats) removed from SystemLogs in #107. Every readout
  on the site now derives from real data (GitHub events, real commits,
  real clocks). The hack-in boot theater stays — it dumps the repo's
  actual git log (#106).
- **API reality:** GitHub's public events API ships `commits: null` on
  PushEvents now. Log lines show the head SHA (`@abc1234`); don't
  resurrect the commit-message path without a separate fetch.

## Ship log (merged to `mater`)

| PR | What |
|---|---|
| #100 | v6 SHIPBOARD redesign (the big one: filter, star chart, deck layout) |
| #101 | AI-initiatives copy + star chart factions and trade routes |
| #102 | AI tooling + homelab stack icons |
| #103 / #105 | Spotify scope-trace waveform; offline dimming |
| #104 | Real Discord icon on the social link |
| #106 | Hack-in boot tails the repo's real git log |
| #107 | SystemLogs → telemetry deck (census header, real-signal instruments, ticker) |
| #108 | Perf: scroll-jank backdrop-filters killed, dead CRT keyframes retired (−792 lines) |
| #109 | Konami egg: PHOSPHOR CAL. deck (↑↑↓↓←→←→BA), CRT tube-on animation |
| #110 | Matt's phosphor calibration baked as the shipped defaults |

## Performance doctrine (hard-won, don't relearn)

1. **Glyph fuzz is static, life is composited.** Never animate
   `text-shadow` — it repaints every glyph every frame.
2. **Blurred text-shadow is scoped** to `.phosphor-text` terminal
   surfaces, never site-wide.
3. **No large `backdrop-filter` regions.** Measured on a 6s scripted
   scroll: 11 dropped frames with them, 1 without. Solid 90–95%
   backgrounds over static layers read identically.
4. **Canvas rAF loops cancel offscreen** (IntersectionObserver
   starts/stops the loop — don't schedule-and-early-return).
5. **Cap decorative layers to the viewport** they're visible in;
   no huge transformed layers left animating.
6. **Per-frame DOM style writes only for composited properties**;
   paint properties (box-shadow, background) only on actual change.
7. **Marquee/ticker spans get `will-change: transform`** so main-thread
   paints can't stutter them.

## Verification gotchas (agent field notes)

- An **occluded Playwright window suspends rAF, IntersectionObserver,
  AND CSS animation clocks.** Symptoms: benches return one giant frame,
  boot gates never fire, `opacity: 0`-start animations freeze invisible.
  Check `frames` count for bench validity; inject `animation: none` to
  screenshot animated UI; judge motion with the window visible.
- Cloudflare caches prod HTML — cache-bust before judging a deploy.
- Two dev servers can coexist: check `lsof -iTCP:3000` before assuming
  the server on :3000 serves your checkout (parallel agent worktrees).

## Tuning

The phosphor stack lives as `--pt-*` custom properties in
`globals.css :root`. Re-tune via the Konami egg (↑↑↓↓←→←→BA →
PHOSPHOR CAL. deck → COPY CSS) or `?tune` on a dev build. Current
values are Matt's 2026-07-09 calibration — see `DESIGN.md` §1.
