# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application code and build it
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine

# Set environment to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/build /app/build

# Install global dependencies
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Default command
CMD ["serve", "-s", "build"]
