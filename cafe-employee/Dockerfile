FROM node:20-alpine

ENV REACT_APP_API_HOST 'host.docker.internal'
ENV REACT_APP_API_PORT '9001'

WORKDIR /app

COPY cafe-employee/package*.json ./

RUN npm install

COPY cafe-employee/. .

EXPOSE 3000

CMD ["npm", "run", "start"]