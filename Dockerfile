FROM node:14.17.3

COPY . ./

RUN npm install --peer-dependency

EXPOSE 4000

CMD ["npm", "run", "dev"]