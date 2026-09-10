# Use Node.js as the base image
FROM node:20

# Set the working directory inside the image/container
WORKDIR /app

# copy everything: first dot means copy from root folder, second dot means put into /app folder
# Copy files from the build context into /app
COPY . .

# Install dependencies
RUN npm install

EXPOSE 3000

# Command to run when the container starts
CMD ["node", "/app/src/index.js"]

# *****************************