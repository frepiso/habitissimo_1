FROM node:10-slim

RUN mkdir -p /usr/src/cli

WORKDIR /usr/src/cli

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "start"]
