# Use Node.js version 20 slim image
FROM node:20-slim

# Install curl and unzip
RUN apt-get update

RUN apt-get install git -y

# Set the working directory
WORKDIR /home/app

COPY main.ts main.ts
COPY entrypoint.sh entrypoint.sh
COPY package*.json .

RUN npm install

RUN chmod +x entrypoint.sh
RUN chmod +x main.ts

ENTRYPOINT ["/home/app/entrypoint.sh"]