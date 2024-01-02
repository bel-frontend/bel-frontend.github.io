FROM node:20

WORKDIR /app

COPY  .  .

RUN yarn install

EXPOSE 3000

RUN yarn build

CMD ["yarn","run", "start"]
