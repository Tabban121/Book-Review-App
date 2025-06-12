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

# Expose the port your app runs on (example: 8000)
EXPOSE 8000

# Run the app
CMD ["npm", "start"]
