#!/bin/bash

echo "Starting deployment..."

cd /home/ubuntu/ML_2_Email_Spam_Detection/web || exit

echo "Pulling latest changes from GitHub..."
git reset --hard HEAD
git pull origin main

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Restarting PM2 app..."
pm2 restart mlp0-web --update-env || pm2 start npm --name "mlp0-web" -- start

echo "Saving PM2 process list..."
pm2 save

echo "Deployment completed successfully!"