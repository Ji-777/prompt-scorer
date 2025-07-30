#!/bin/bash

# This script deploys the project to Vercel using the current directory and pulls .env variables

echo "✅ Pulling latest .env variables from Vercel..."
vercel env pull .env.local

echo "🚀 Deploying to Vercel production..."
vercel --prod
