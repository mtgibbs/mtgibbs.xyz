# mtgibbs.xyz

## Overview

The source for my personal site [mtgibbs.xyz](https://mtgibbs.xyz). It is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development Server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Docker

Instructions to my future self for deploying the docker image to heroku.

TODO: Make Github Actions do this.

```bash
$> docker build -t mtgibbs-next-docker .
$> heroku container:push web
$> heroku container:release web
$> heroku open
```
