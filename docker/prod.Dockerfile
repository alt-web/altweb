FROM node:lts AS builder
WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm install

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build project
COPY . .
RUN npm run build

# Make a smaller container
FROM node:lts
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy additional files
COPY ./next.config.js ./

EXPOSE 3000
HEALTHCHECK --start-period=30s --timeout=5s CMD curl --fail http://localhost:3000/api/health

ENTRYPOINT ["npm", "start"]
