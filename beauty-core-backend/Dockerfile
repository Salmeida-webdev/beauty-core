FROM node:20-alpine AS deps

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm ci


FROM deps AS builder

WORKDIR /app

COPY prisma ./prisma
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

RUN npx prisma generate
RUN npm run build


FROM deps AS prod-deps

WORKDIR /app

ENV NODE_ENV=production

COPY prisma ./prisma

RUN npx prisma generate
RUN npm prune --omit=dev


FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache openssl wget dumb-init \
  && addgroup -S appgroup \
  && adduser -S appuser -G appgroup

COPY --from=prod-deps --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/prisma ./prisma
COPY --chown=appuser:appgroup package*.json ./

RUN mkdir -p /app/uploads/public /app/uploads/private /app/uploads/temp \
  && chown -R appuser:appgroup /app/uploads


# Chat 43 - runtime writable directories for backup/recovery operations
RUN mkdir -p /app/backups/postgres /app/backups/redis /app/backups/uploads /app/logs/backups \
  && chown -R appuser:appgroup /app/backups /app/logs
USER appuser
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=30s \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["dumb-init", "node", "dist/src/main.js"]
