FROM node:18-alpine

ENV NODE_ENV development

WORKDIR /app

COPY package*.json /app

COPY . .

RUN npm install

RUN npm install -g serve

RUN npm run build

CMD ["serve", "-s", "build"]