FROM node:20

WORKDIR /src

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY ./ ./

EXPOSE 3002
EXPOSE 9000

CMD [ "npm", "run","start:dev" ]