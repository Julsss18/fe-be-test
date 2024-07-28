FROM node:20-alpine

ENV DBHOST 'host.docker.internal'
ENV PORT '3307'

WORKDIR /usr/src/app

COPY backend/package*.json ./
RUN npm install

COPY backend/. .

EXPOSE 8080
CMD ["npm", "run", "start"]