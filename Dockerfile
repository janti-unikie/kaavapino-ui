FROM registry.access.redhat.com/ubi8/nodejs-14

WORKDIR /kaavapino-ui

ENV APP_NAME kaavapino-ui

COPY package.json yarn.lock ./
RUN npm install && npm cache clean --force

COPY . .

CMD ["yarn", "start"]