#!/bin/sh
set -e

cd /app

echo "Starting Umami using npm script..."
# Use internal script to bypass check-db but handle paths correctly
npm run start-server -- -p $PORT
