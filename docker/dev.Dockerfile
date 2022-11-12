FROM node:lts
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE 3000

COPY next.config.js next-env.d.ts tsconfig.json ./

ENTRYPOINT ["npm", "run", "dev"]
