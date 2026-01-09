#!/bin/sh
set -e

echo "Starting Umami tracking server..."

echo "Running check-db..."
npm run check-db

echo "Running update-tracker..."
npm run update-tracker

echo "Starting Next.js server on port $PORT..."
node_modules/.bin/next start -p $PORT
