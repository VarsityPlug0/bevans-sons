FROM node:20

WORKDIR /app

# Install all dependencies (gets Linux binaries for native modules)
COPY package.json package-lock.json ./
RUN npm ci

# Copy pre-built app (built locally, .next committed without node_modules)
COPY . .

# Restore Turbopack's server-external packages with Linux-compatible binaries.
# These paths are hardcoded in the .next server bundle by Turbopack.
RUN mkdir -p .next/node_modules && \
    cp -r node_modules/better-sqlite3/. .next/node_modules/better-sqlite3-90e2652d1716b047/ && \
    cp -r node_modules/cloudinary/. .next/node_modules/cloudinary-f9f069d0ba9c5439/ && \
    cp -r node_modules/nodemailer/. .next/node_modules/nodemailer-9c35dd349a8aaa9f/

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

CMD ["npm", "start"]
