FROM node:20

WORKDIR /app

# Install dependencies (gets Linux binary for better-sqlite3)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy pre-built app (built locally, committed to repo)
COPY . .

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

CMD ["npm", "start"]
