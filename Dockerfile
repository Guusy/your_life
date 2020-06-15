FROM node:12.16.1-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production
RUN npm install pm2 -g

COPY . .

EXPOSE 3000


CMD ["pm2-runtime", "index.js"]