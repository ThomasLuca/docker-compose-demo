# It's probable best for using full distro image for development. Seems like some tools are missing
# from alpine images we do need in development.
# This would also mean it's best to split up the Dockerfile,
# into Dockerfile and Dockerfile.dev

# Base
FROM node:16.13.0-alpine3.14 as base
WORKDIR /app
COPY package*.json ./

# Development Stage
FROM base as development-stage
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]

# Stop at a specific build stage🔗
# When you build your image, you don’t necessarily need to build the entire Dockerfile
# including every stage. You can specify a target build stage.
# The following command assumes you are using the previous Dockerfile but
# stops at the stage.
#
# development-stage is also build when targetting production-stage.
# I think order here matters !

# Build Stage
FROM base as build-stage
# RUN npm install --production    # Also need cli for building
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:1.19.2-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]