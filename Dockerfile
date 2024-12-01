# Use a Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./ ./

# Build the TypeScript project
RUN npm run build

# Expose the port your app will listen on
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]