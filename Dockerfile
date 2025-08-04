# Use Node.js 22.2.0 image
FROM node:22.2.0

# Set the working directory
WORKDIR /usr/src/app

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the application listens on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]