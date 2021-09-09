FROM registry.access.redhat.com/ubi8/nodejs-14 as appbase

USER root

RUN dnf config-manager --add-repo https://dl.yarnpkg.com/rpm/yarn.repo && \
    dnf -y install yarn

WORKDIR /kaavapino-ui

ENV APP_NAME kaavapino-ui

COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean --all

RUN useradd kaavapinouser && groupadd kaavapinogroup
USER kaavapinouser:kaavapinogroup


# =============================
FROM appbase as development
# =============================

# copy in our source code last, as it changes the most
COPY --chown=kaavapinouser:kaavapinogroup . .

CMD ["yarn", "start"]

# ===================================
FROM appbase as staticbuilder
# ===================================

COPY . . 
RUN yarn build

# =============================
FROM nginx:1.17 as production
# =============================

# Nginx runs with user "nginx" by default
COPY --from=staticbuilder --chown=nginx:nginx /kaavapino-ui/build /usr/share/nginx/html

# Copy nginx config
COPY nginx/deploy.conf /etc/nginx/conf.d/default.conf

#for running as non-root
RUN sed -i 's/\/var\/run\/nginx.pid/\/tmp\/nginx.pid/g' /etc/nginx/nginx.conf

EXPOSE 8080
