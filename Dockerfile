# Generic Dockerfile for the admin backend dashboard
# Replace the build and start steps if your backend uses a different stack.
FROM node:20-alpine

WORKDIR /app

# Copy package manifests and install dependencies.
COPY package*.json ./
RUN npm install --production

# Copy the application source.
COPY . .

EXPOSE 4000

# Change this command to match your backend startup command.
CMD ["npm", "run", "start"]
