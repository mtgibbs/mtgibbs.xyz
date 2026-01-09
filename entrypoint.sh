#!/bin/sh
set -e

# echo "Starting Umami tracking server..."
# Check-db was hanging, so we are skipping it to ensure the app boots.
# Next.js will likely fail if DB is truly gone, which is fine.

echo "Starting Next.js server on port $PORT..."
node_modules/.bin/next start -p $PORT
