FROM node:18-alpine


WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]