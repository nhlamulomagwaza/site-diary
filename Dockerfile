FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./
RUN npm ci --omit=dev

COPY server/ ./
COPY client/dist ./public

ENV SERVE_CLIENT=true
ENV PORT=80

RUN mkdir -p data

EXPOSE 80

CMD ["node", "server.js"]
