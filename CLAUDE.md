# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Matt Gibbs built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Features a retro sci-fi aesthetic with CRT effects, glitch animations, and a "NASA mission control" design language.

## Development Commands

```bash
# Start development server (uses 1Password CLI for secrets)
npm run dev

# Build production bundle
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

Note: Development requires 1Password CLI (`op`) for injecting secrets from the vault.

## Deployment

### Main Site (mtgibbs.xyz)

Deployed via GitHub Actions (`.github/workflows/deploy.yml`):
- Triggers on push to `mater` branch
- Builds Docker image and pushes to Heroku (`mtgibbs` app)
- Also publishes multi-arch images to GHCR for Raspberry Pi support
- Purges Cloudflare cache after deployment

### Umami Analytics (mtgibbs-tracking.herokuapp.com)

Self-hosted Umami v3.0.3 for privacy-focused analytics. Deployed via the `mtgibbs/umami` fork on GitHub.

**Fork location**: https://github.com/mtgibbs/umami (branch: `heroku-deploy`)

**Key modifications for Heroku**:
- `heroku-postbuild` script runs migrations during build
- `heroku-cleanup` script removes node_modules for small slug size (~172MB)
- Uses Next.js standalone output mode
- Procfile: `web: cd .next/standalone && node server.js`

**To deploy Umami changes**:
```bash
cd /path/to/umami-fork
git push heroku heroku-deploy:main
```

**Required Heroku config vars** (mtgibbs-tracking app):
- `DATABASE_URL` - Heroku Postgres (auto-set by addon)
- `APP_SECRET` - Random string for session encryption
- `HASH_SALT` - Salt for hashing
- `NODE_TLS_REJECT_UNAUTHORIZED=0` - Required for Heroku Postgres SSL

## Architecture

### Component Organization

Components are organized by feature in `/components`:
- Each component has its own directory
- Model/interface definitions in `model/` subdirectory
- Example: `components/experience-list/` contains main, child, and interface files

### Data Layer

Static content centralized in `/data`:
- `experience-items.constants.ts` - Professional experience
- `skills-icons.constants.ts` - Technology icons
- `projects.constants.ts` - GitHub projects
- `system-anomalies.ts` - Easter egg content

Dynamic data:
- **GitHub API** (GraphQL): Pinned repositories fetched at build time
- **Spotify API**: "Now Playing" status via runtime API routes
- **Umami**: Analytics via proxy at `/api/analytics/[...path].ts`

### Styling

Tailwind CSS with custom retro sci-fi palette in `tailwind.config.js`:
- `magnetic-black`, `faded-cardboard` - Base colors
- `signal-orange`, `phosphor-amber`, `tracking-red` - Accents
- Custom animations: `glitch`, `scanline`, `cursor`, `pulse-fast`

### Context Providers

- `VhsContext` - Toggle VHS/CRT distortion effects
- `GPUContext` - GPU rendering state
- Konami code handler for high-contrast mode

## Key Patterns

- **Interface naming**: Prefix with `I` (e.g., `IExperienceItem`)
- **Enum usage**: `DevIconStyles` for icon variants
- **Readonly arrays**: Data constants use `readonly`
- **Secret management**: 1Password CLI (`op://`) for local dev
- **Analytics proxy**: `/api/analytics/[...path].ts` forwards to Umami, gracefully handles upstream failures

## External Integrations

- **GitHub GraphQL API** - Pinned repositories (build-time)
- **Spotify API** - Now Playing (runtime)
- **Umami Analytics** - Self-hosted at mtgibbs-tracking.herokuapp.com
- **Cloudflare** - CDN and cache purging
- **Devicons CDN** - Technology icons
- **Font Awesome** - UI icons

## Git Workflow

- Primary branch: `mater` (Latin for "mother")
- See `ANTIGRAVITY.md` for detailed workflow guide and agent personas
