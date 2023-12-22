# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining app files to the container
COPY . .

# Build the React app (replace 'npm run build' with your build command)
RUN npm run build

# Specify the command to run the React app (serve the production build)
CMD ["npm", "start"]