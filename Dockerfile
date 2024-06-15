# Stage 1: Build the React application
FROM node:18 AS build
# FROM: Specifies the base image for the build stage.
# node:18: Uses the official Node.js 18 image from Docker Hub as the base image.
# AS build: Names this build stage "build". This is useful for multi-stage builds.

# Set working directory
WORKDIR /app
# WORKDIR: Sets the working directory inside the container to /app. All subsequent commands will be run from this directory.


# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./
# COPY: Copies files from the host machine into the container.
# package.json yarn.lock: These are the files being copied.
# ./: The destination within the container, which is the current working directory (/app).

# Install dependencies
RUN yarn install
# RUN: Executes a command in the container.
# yarn install: Installs the project dependencies specified in package.json and yarn.lock.

# Copy the rest of the application code
COPY . .
# COPY: Copies files and directories from the host machine into the container.
# . .: The first . refers to the current directory on the host machine. The second . refers to the current directory in the container (/app).

# Build the application
RUN yarn build
# RUN: Executes a command in the container.
# yarn build: Runs the build script defined in package.json, which builds the React application for production.

# Stage 2: Serve the React application with a static server
FROM nginx:alpine AS production
# FROM: Specifies the base image for the production stage.
# nginx: Uses the official Nginx image based on Alpine Linux, which is lightweight.
# AS production: Names this build stage "production".

# Copy the build output to Nginx static files directory
COPY --from=build /app/dist /usr/share/nginx/html
# COPY: Copies files from one location to another.
# --from=build: Specifies that the files should be copied from the "build" stage.
# /app/dist: The source directory in the "build" stage where the built files are located.
# /usr/share/nginx/html: The destination directory in the "production" stage where Nginx serves static files.

# Expose port 80
EXPOSE 80
# Informs Docker that the container will listen on the specified network port at runtime. This does not actually publish the port; it serves as documentation and can be used by the docker run command to automatically bind the port.

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
# CMD: Specifies the command to run when the container starts.
# nginx: The command to start the Nginx server.
# -g "daemon off;": An argument to Nginx to run it in the foreground, which is necessary for Docker containers to keep running.
