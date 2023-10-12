FROM node:ts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5128
CMD [ "node", "index.js"]