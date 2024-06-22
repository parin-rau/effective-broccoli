# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

RUN addgroup app && adduser -S -G app app



# Install all node_modules, including dev dependencies
FROM base AS deps

#RUN mkdir /app
WORKDIR /app

USER root
RUN chmod -R u+w .
RUN chown -R app:app .

USER app

ADD package.json package-lock.json ./
RUN npm ci

# Setup production node_modules
FROM base AS production-deps

ENV NODE_ENV=production

#RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
RUN npm prune --omit=dev

# Build the app
FROM base AS build

#RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD prisma /app/prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# USER root
# RUN chown app:app prod.db
# USER app

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV NODE_ENV=production
ENV DATABASE_URL=file:./dev.db
ENV COOKIE_SECRET=cookie_secret

#RUN mkdir /app
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .

CMD ["npm", "run", "prodStart"]