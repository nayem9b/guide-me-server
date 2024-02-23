FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn tsc
EXPOSE 5000
CMD ["node", "dist/server.js"]