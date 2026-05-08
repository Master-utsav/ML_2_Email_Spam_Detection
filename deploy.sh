#!/bin/bash

echo "Starting deployment..."

# Go to project folder
cd ~/Spam\ Email\ Detector/web || exit

echo "Pulling latest changes from GitHub..."
git pull origin main

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Restarting PM2 app..."

# If app already exists, restart it
pm2 restart mlp0-web || pm2 start npm --name "mlp0-web" -- start

echo "Saving PM2 process list..."
pm2 save

echo "Deployment completed successfully!"