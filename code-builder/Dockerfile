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
COPY ./utils ./utils
COPY ./provider ./provider
COPY ./ ./

ENV AWS_ACCESS_KEY=AKIAZV3G4GUJN3RKPLBJ
ENV AWS_SECRET_KEY=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
ENV REDIS_EP=redis://default:1632855036514099ba87062cef28310c@us1-actual-lemming-38829.upstash.io:38829


RUN npm install

RUN chmod +x entrypoint.sh
RUN chmod +x main.ts

ENTRYPOINT ["/home/app/entrypoint.sh"]