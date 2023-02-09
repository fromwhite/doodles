# STAGE 1
FROM node:current-alpine AS build

RUN mkdir /app
WORKDIR /app
RUN chmod +x /app

RUN true &&
    ln -sf /usr/share/zoneinfo/PRC /etc/localtime

RUN true &&
    npm config set registry https://registry.npm.taobao.org

VOLUME package.json ./
RUN yarn install
COPY . /app
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

# STAGE 2
FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
