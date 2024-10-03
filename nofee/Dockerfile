FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run","dev"]


EXPOSE 5173
