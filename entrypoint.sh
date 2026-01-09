#!/bin/sh
set -e

# Change to app directory to ensure we find node_modules
cd /app

echo "Starting Next.js server on port $PORT..."
# Use npx to locate next binary reliably
npx next start -p $PORT
