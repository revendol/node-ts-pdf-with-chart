ARG NODE_VERSION=20.3.1
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
# Add package file
COPY package*.json .
# Install deps
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN npm install
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /usr/src/app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /usr/src/app
USER pptruser
COPY . .

# Start production image build
FROM node:${NODE_VERSION}-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci --only=${NODE_ENV}
RUN npm run build
COPY . .


CMD ["npm","start"]