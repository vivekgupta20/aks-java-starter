# Use an official Node.js runtime as a parent image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY ./ ./

# Add environment variables for backend services
ENV REACT_APP_CATALOG_API=http://catalog-svc:8080
ENV REACT_APP_ORDER_API=http://order-svc:8080
ENV REACT_APP_IDENTITY_API=http://identity-svc:8080

# Build the React app
RUN npm run build

# Use an official nginx image to serve the React app
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
