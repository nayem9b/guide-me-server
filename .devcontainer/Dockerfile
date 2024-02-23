FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y git
FROM node:alpine
RUN mkdir -p /service/app
WORKDIR /service/app
COPY . .
RUN yarn install --frozen-lockfile
EXPOSE 5000
CMD ["node", "dist/server.js"]