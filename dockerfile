# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the TypeScript app
RUN npm run build

# Expose the port your app runs on (example: 5000)
EXPOSE 5000

# Run the app
CMD ["npm", "start"]
