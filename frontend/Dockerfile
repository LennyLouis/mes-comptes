# Use an official Node.js runtime as a parent image
FROM node:18.7.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 5173

# Define the command to run your app
CMD ["npm","run","dev","--","--host"]

