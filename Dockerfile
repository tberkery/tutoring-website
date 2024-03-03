# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for server
WORKDIR /usr/src/app/server
COPY server/package*.json ./
RUN npm install

# Install dependencies for client
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install

# Move back to the root directory
WORKDIR /usr/src/app

# Install dependencies for root
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start:all"]
