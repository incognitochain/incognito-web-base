# build environment
FROM node:16 as build
ARG BUILD_ENV=production

WORKDIR /app
COPY package.json ./
COPY yarn.lock* ./
COPY . ./

# https://create-react-app.dev/docs/adding-custom-environment-variables#what-other-env-files-can-be-used
COPY .env.${BUILD_ENV} .env.local

RUN mkdir -p src/locales
RUN yarn install
RUN yarn i18n:compile
RUN yarn build:$BUILD_ENV

# Incognito website 3.0 Landing page
FROM ghcr.io/incognitochain/incognito-website-3.0:production as build-landing
RUN \
   cd /usr/share/nginx/html/ \
    && find . -type f -exec sed -i "s/static\//static-landing\//g" {} \; \
    && mv static static-landing


# production environment
FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build-landing /usr/share/nginx/html /usr/share/nginx/html-landing
# new
COPY etc/nginx/nginx-docker-landing.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
