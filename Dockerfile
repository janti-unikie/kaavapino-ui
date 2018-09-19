FROM node:10.6.0-alpine

WORKDIR /kaavapino-ui

ENV APP_NAME kaavapino-ui

COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "start"]