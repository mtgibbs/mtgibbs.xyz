#!/bin/sh
set -e

cd /app/.next/standalone

echo "Starting Umami (Standalone mode)..."
node server.js
