FROM node:20

WORKDIR /app

# Install all dependencies (gets Linux binaries for native modules)
COPY package.json package-lock.json ./
RUN npm ci

# Copy pre-built app
COPY . .

# Rebuild native modules for Linux (replaces any Windows binaries in .next/node_modules)
RUN npm rebuild better-sqlite3

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

CMD ["npm", "start"]
