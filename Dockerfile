FROM node:20

WORKDIR /app

# Install dependencies (node:20 includes python3, make, g++ for native modules)
COPY package.json package-lock.json ./
RUN npm ci

# Build app
COPY . .
RUN npm run build

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

CMD ["npm", "start"]
