FROM node:18.16.0-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

CMD npm run build
CMD npm start