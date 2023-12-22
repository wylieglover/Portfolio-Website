# Use an official Node.js runtime as the base image
FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm install -g npm@latest
RUN npm install react-scripts@5.0.1 -g --silent

COPY package.json package-lock.json ./
COPY . ./

CMD ["npm", "start"]
