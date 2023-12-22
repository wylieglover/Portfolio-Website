# Use an official Node.js runtime as the base image
FROM node:18-alpine

RUN npm install -g npm@latest

COPY package.json package-lock.json ./
COPY . .
CMD ["npm", "start"]
