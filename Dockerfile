FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY tsup.config.ts ./
COPY src ./src

RUN npm install

RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./

RUN npm install --only=production

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/index.js"]
