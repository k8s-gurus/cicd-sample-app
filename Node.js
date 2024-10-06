# Dockerfile
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["npm", "start"]