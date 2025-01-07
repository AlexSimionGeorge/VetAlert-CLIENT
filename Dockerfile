# Stage 1: Build
FROM node:latest AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install 

# Copy application code and build
COPY . .
RUN npx ng build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:latest

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app
COPY --from=build /app/dist/vet-alert-client/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80
