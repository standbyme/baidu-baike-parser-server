FROM node:8

ADD . /app/
WORKDIR /app

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 1234

CMD ["npm", "start"]