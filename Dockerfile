FROM node:10.6.0-alpine

WORKDIR /kaavapino-ui

ENV APP_NAME kaavapino-ui

COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean --force

COPY . .

CMD ["yarn", "start"]
