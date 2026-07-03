# Design Philosophy — Terminal-Brutalist Collage

The distilled fingerprint of mtgibbs.xyz. Preserve and SHARPEN, don't replace.
Carried over from the sandbox design session (2026-07). `PRODUCT.md` holds the
strategic context; this file holds the visual language.

## The Fingerprint

- **Base:** WARM charcoal (~`#17181a` / current token `magnetic-black #1A1A1A`) —
  never pure black, never cold matrix-green.
- **Primary accent:** amber/orange monospace (~`#d98a2b` / current token
  `phosphor-amber #FFB000`) — code IS the content (plausible bash/systemd,
  never lorem).
- **Hot accent:** red-orange (~`#e8442a` / current tokens `signal-orange #FF4400`,
  `tracking-red #D93636`) sticker label with heavy border + slight rotation —
  exactly ONE element wins the eye per view.
- **Energy:** diagonal light-streaks (yellow `#f2c14e`, electric blue `#3b82f6`,
  orange, red).
- **SIGNATURE:** monospace contrasted with a hand-drawn MARKER script font,
  slanted — the human hand against the machine.
- **Motifs:** retro-hardware — `NO_CARRIER`, `OFFLINE`, CPU load,
  `//ADDR: 0x...`, `[CRITICAL]`/`RESOLVED`.
- **Composition:** layered/offset collage — overlap, slight angles, break the
  grid. Thin-bordered framed elements.
- **Voice:** technical, self-aware, warm, playful.

## Guardrails

- Warmth over cold green.
- Keep the mono↔marker contrast.
- Restraint inside the chaos — one clear focal hierarchy per view.
- No generic dark-SaaS hero.
- No ghost-gray low-contrast text.
- No motion for its own sake — subtle only (cursor blink, streak shimmer),
  with `prefers-reduced-motion` alternatives.
- Real content only.
- Responsive down to 390px.

## Working Loop

Implement → screenshot (Playwright/Firefox MCP) → actually look at it →
critique against this philosophy → fix the single weakest thing → repeat
until genuinely striking. Check desktop (1280) AND mobile (390×844).
