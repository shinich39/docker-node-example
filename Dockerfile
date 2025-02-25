FROM node:22-alpine
WORKDIR /app
COPY ./node/package.json ./node/package-lock.json ./
RUN npm ci
COPY ./node .
CMD ["node", "bin/app.js"]
EXPOSE 3000