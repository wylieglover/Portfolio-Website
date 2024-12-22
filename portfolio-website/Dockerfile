FROM node:23

ENV NODE_ENV production

WORKDIR /app

COPY package*.json /app

COPY . .

RUN npm install

RUN npm install -g serve

RUN npm run build

CMD ["serve", "-s", "build"]