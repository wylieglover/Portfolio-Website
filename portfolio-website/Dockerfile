FROM node:20.9.0-alpine

ENV NODE_ENV development

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install
RUN npm i -g vite --save-dev

EXPOSE 3000

CMD [ "npm", "run", "dev"]
