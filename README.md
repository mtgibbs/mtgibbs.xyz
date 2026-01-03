# mtgibbs.xyz

## Overview

The source for my personal site [mtgibbs.xyz](https://mtgibbs.xyz). It is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development Server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

This project uses **GitHub Actions** for automated CI/CD.

### Automated Flow
Pushes to the `mater` branch trigger the following:
1. **Build**: A Docker image is built for the Next.js application.
2. **Push**: The image is pushed to the Heroku Container Registry.
3. **Release**: The container is released to the Heroku app (`mtgibbs`).
4. **Purge**: The Cloudflare cache is automatically purged to ensure the latest version is live.

### Required Secrets
The following GitHub Secrets must be configured for the workflow to run:
- `HEROKU_API_KEY`: Your Heroku API key.
- `HEROKU_APP_NAME`: `mtgibbs`
- `HEROKU_EMAIL`: Your Heroku account email.
- `CLOUDFLARE_ZONE`: The Zone ID for mtgibbs.xyz.
- `CLOUDFLARE_TOKEN`: A Cloudflare API Token with "Purge Cache" permissions.

## Manual Commands (Reference)

If you ever need to manually deploy via Docker:

```bash
$> docker build -t registry.heroku.com/mtgibbs/web .
$> docker push registry.heroku.com/mtgibbs/web
$> heroku container:release web --app mtgibbs
```
