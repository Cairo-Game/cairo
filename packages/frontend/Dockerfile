FROM node:16.15.1

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --force

USER node

COPY --chown=node:node . .

EXPOSE 3000

CMD npm run build