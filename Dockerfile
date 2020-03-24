FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm build-prod

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
