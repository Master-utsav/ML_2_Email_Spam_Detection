#!/bin/bash

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

PM2_PATH="/home/ubuntu/.nvm/versions/node/v24.15.0/bin/pm2"

echo "Starting deployment..."

cd /home/ubuntu/ML_2_Email_Spam_Detection/web || exit

echo "Fetching latest changes from GitHub..."
git fetch origin main

echo "Resetting to latest GitHub version..."
git reset --hard origin/main

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Restarting PM2 app..."
$PM2_PATH restart mlp0-web --update-env || $PM2_PATH start npm --name "mlp0-web" -- start

echo "Saving PM2 process list..."
$PM2_PATH save

echo "Deployment completed successfully!"