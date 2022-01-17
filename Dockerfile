FROM node:14.16.0-alpine
MAINTAINER zhangwenrou

RUN mkdir -p /usr/src/app
COPY . /usr/src/app/
WORKDIR /usr/src/app

RUN node -v
RUN npm install --registry=http://registry.npm.taobao.org
RUN npm run build

EXPOSE 8080
CMD [ "node", "server.js" ]
