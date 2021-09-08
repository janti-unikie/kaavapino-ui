FROM registry.access.redhat.com/ubi8/nodejs-14

USER root

RUN dnf config-manager --add-repo https://dl.yarnpkg.com/rpm/yarn.repo && \
    dnf -y install yarn

WORKDIR /kaavapino-ui

ENV APP_NAME kaavapino-ui

COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean --all

COPY . .

RUN useradd kaavapinouser && groupadd kaavapinogroup
USER kaavapinouser:kaavapinogroup

CMD ["yarn", "start"]