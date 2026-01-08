# ANTIGRAVITY.md

This file provides guidance to Antigravity when working with code in this repository.

## ⚠️ CRITICAL WORKFLOW RULE

**Before performing any work or verification**, you MUST ensure the development server is running.
1. Check if the dev server is running (e.g., check for an active terminal process or `curl localhost:3000` to see if it's up).
2. If it is NOT running, start it using `npm run dev` in a background terminal.
3. Wait for it to define itself as "ready" before proceeding with verification or UI checks.

## 🐙 Pull Request Protocol

**When asked to "finalize", "ship", or "make a PR" for a feature:**
1.  **Stage & Commit**: Ensure all changes are added and committed with a descriptive conventional commit message.
2.  **Push**: Push the feature branch to `origin`.
3.  **Open PR**: IMMEDIATELY use `gh pr create` to open the Pull Request.
    *   **Do not** just push and ask the user to open it.
    *   **Command**: `gh pr create --title "feat: <title>" --body "<summary>"`
    *   **Target**: The primary branch is `mater`.

## Project Overview

Personal portfolio website for Matt Gibbs built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The site is a single-page application showcasing professional experience, skills, and contact information.

**Note:** The primary branch for this repository is `mater` (Latin for "mother").

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build production bundle
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Docker Deployment

The site is deployed to Heroku and GHCR via Docker containers:

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
- Example: `components/project-deck/` contains:
  - `project-deck.tsx` - Main component (The "Mainframe" Dashboard)
  - `NavVisualizer.tsx` - Sub-component (Radar)
  - `model/project.ts` - Interface definitions

### Data Layer

All static content is centralized in `/data` directory:

- `experience-items.constants.ts` - Professional experience data
- `skills-icons.constants.ts` - Technology icon configurations
- `index.ts` - Re-exports all constants for easy importing
- **Dynamic Data:**
    - **GitHub GraphQL API**: Fetches pinned repositories during build time (`getStaticProps`) to populate the Project Deck.
    - **Spotify API**: Real-time fetching of "Now Playing" status via Next.js API Routes.

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

## Accessibility Standards
- **A11y First**: All new features and UI components must be accessible-by-default.
- **Compliance**: Aim for WCAG 2.1 AA standards.
- **Testing**: Verify interactive elements with keyboard navigation (Tab, Enter, Space).
- **Semantics**: Use proper HTML5 semantic elements (nav, main, article, button vs div).

## Key Patterns

- **Interface naming**: Prefix with `I` (e.g., `IExperienceItem`, `IDevIconOptions`)
- **Enum usage**: `DevIconStyles` enum for icon style variants
- **Component props**: Strongly typed with imported interfaces
- **Readonly arrays**: Data constants use `readonly` for immutability
- **Next.js config**: `output: 'standalone'` for Docker deployment optimization
- **Versioning**: Integrated GH Actions timestamp builds baked into `NEXT_PUBLIC_VERSION`
- **Secrets**: `GH_ACCESS_TOKEN` (renamed from `GITHUB_...` for Actions compatibility) is required for build-time data fetching.

## 🤖 The Team (Agent Personas)

This project is staffed by specialized agent personas stored in `.antigravity/prompts/`. When starting a task, "summon" the relevant expert by instructing the IDE to adopt their persona.

### Available Agents

*   **Retro Architect** (`.antigravity/prompts/retro-architect.md`)
    *   **Role:** Frontend Specialist (Next.js 16, Tailwind).
    *   **Use when:** Building UI components, implementing the "Retro Sci-Fi" look.
*   **Design Agent** (`.antigravity/prompts/design-agent.md`)
    *   **Role:** Retro Systems Archivist (Visual Language).
    *   **Use when:** Defining colors, shapes, and aesthetic guidelines ("Alien" style).
*   **Data Officer** (`.antigravity/prompts/data-officer.md`)
    *   **Role:** TypeScript & Data Guardian.
    *   **Use when:** Modifying `/data`, defining interfaces, or handling state.
*   **Mission Control** (`.antigravity/prompts/mission-control.md`)
    *   **Role:** DevOps & Release Manager.
    *   **Use when:** Deploying, fixing CI/CD, or merging PRs.

### 🧠 Agent Routing Logic (For Orchestrator)
*   **IF** request involves **Visuals, Colors, CSS, or Aesthetics** -> Consult **Design Agent** first, then **Retro Architect**.
*   **IF** request involves **React Components, Layout, or Animation** -> Summon **Retro Architect**.
*   **IF** request involves **New Content, Type Errors, or `/data`** -> Summon **Data Officer**.
*   **IF** request involves **Deploy, Build Errors, or GitHub Actions** -> Summon **Mission Control**.

### How to Summon
In your prompt, simply state:
> "Act as the **Retro Architect** (see `.antigravity/prompts/retro-architect.md`) to implement..."

## 🚀 Feature Roadmap (Retro Sci-Fi)

- [x] **System Logs Activity Feed**: Real-time (or cached) GitHub commit stream styled as raw mainframe output.
- [x] **VHS/VCR Tracking Toggle**: Global switch for CRT distortion, chromatic aberration, and scanline jitter.
- [x] **Interactive "Mainframe" Dashboard**: A 70s NASA-style control panel (Project Deck) with physical-looking buttons, radar visualization, and "offline" simulation modes.
