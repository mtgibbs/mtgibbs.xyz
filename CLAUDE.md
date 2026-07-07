# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Matt Gibbs built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The site is a single-page application showcasing professional experience, skills, and contact information.

**Note:** The primary branch for this repository is `mater` (Latin for "mother"). See `ANTIGRAVITY.md` for branching rules, agent personas, and the retro sci-fi feature roadmap.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
# Requires the 1Password CLI (`op`) — secrets are injected via `op run`
npm run dev

# Build production bundle
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Docker Deployment

Pushes to `mater` trigger `.github/workflows/deploy.yml`, which ships prod (Heroku + Cloudflare purge) and publishes a timestamp-tagged image to GHCR. Flux on the pi-cluster (`~/dev/pi-cluster`, `clusters/pi-k3s/mtgibbs-site/`) auto-deploys the newest GHCR tag to https://site.lab.mtgibbs.dev. Pushes to `redesign` publish to GHCR only (lab preview without touching prod).

Manual Heroku deployment:

```bash
# Build the Docker image
docker build -t mtgibbs-next-docker .

# Push to Heroku
heroku container:push web

# Release the new version
heroku container:release web

# Open the deployed site
heroku open
```

## Architecture

### Component Organization

Components are organized by feature in the `/components` directory with a consistent pattern:

- Each component has its own directory
- Related model/interface definitions are in a `model/` subdirectory
- Example: `components/experience-list/` contains:
  - `experience-list.tsx` - Main component
  - `experience-item.tsx` - Child component
  - `model/experience-list-item.ts` - Interface definitions

### Data Layer

All static content is centralized in `/data` directory:

- `experience-items.constants.ts` - Professional experience data
- `skills-icons.constants.ts` - Technology icon configurations
- `index.ts` - Re-exports all constants for easy importing

Components consume this data through props, maintaining separation between content and presentation.

### Styling Approach

- **Tailwind CSS** with custom color palette defined in `tailwind.config.js`
- Custom colors: purple, magenta, red, orange, yellow, black, white, blue (with variants: darkest, dark, DEFAULT, light, lightest)
- Mix of Tailwind utility classes and CSS modules (`*.module.css`)
- Global styles in `styles/globals.css`

### External Dependencies

Loaded via CDN in `pages/index.tsx`:

- **Devicons** (v2.14.0) - Technology icons from jsdelivr
- **Font Awesome** (kit 911564e118) - Social media and UI icons
- **Umami Analytics** - Self-hosted analytics on mtgibbs-tracking.herokuapp.com

### Page Structure

Single-page layout (`pages/index.tsx`) with three main sections:

1. **Hero Section** (white background) - Introduction with CodeHero component and social links
2. **Experience Section** (blue gradient) - Professional history using ExperienceList
3. **Technologies Section** (white background) - Skills visualization using DevIconList

### TypeScript Configuration

- Strict mode enabled
- Target: ES5 for broad compatibility
- JSX preservation for Next.js handling
- No emit (Next.js handles compilation)

## Key Patterns

- **Interface naming**: Prefix with `I` (e.g., `IExperienceItem`, `IDevIconOptions`)
- **Enum usage**: `DevIconStyles` enum for icon style variants
- **Component props**: Strongly typed with imported interfaces
- **Readonly arrays**: Data constants use `readonly` for immutability
- **Next.js config**: `outputStandalone: true` for Docker deployment optimization
