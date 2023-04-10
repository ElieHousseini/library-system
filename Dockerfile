# Use the official Node.js image as the base image
FROM node:19.6.1

# Set the working directory for the container
WORKDIR /app

# Copy package.json and yarn.lock files into the container
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your application will run on
EXPOSE 3000

# Start the application using Yarn
CMD ["yarn", "start"]
