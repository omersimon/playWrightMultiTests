# Use an official Node.js runtime as a parent image
FROM  mcr.microsoft.com/playwright:v1.31.2-focal

# Set the working directory in the container
RUN mkdir /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copy the rest of the application code to the container
COPY playwright.config.ts ./
#COPY tsconfig.json ./

COPY . .

# Install dependencies
RUN npm install

## Build the TypeScript code
#RUN npm run build

# Expose the port on which the tests will run (default is 3000)
EXPOSE 3000

# Run the tests
CMD ["npm", "test"]
