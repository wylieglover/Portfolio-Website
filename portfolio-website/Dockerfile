FROM node:20.9.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install vite --save-dev

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev"]