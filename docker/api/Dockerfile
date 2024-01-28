FROM node:alpine

WORKDIR /home/node/app

VOLUME /home/node/app
VOLUME /home/node/app/node_modules

COPY ./build /home/node/app/
COPY ./src/adapters/driving/api/node_modules /home/node/app/node_modules
COPY ./src/adapters/driven/mariadb/node_modules /home/node/app/node_modules

EXPOSE 3000

CMD [ "node", "./adapters/driving/api/index.js" ]