import winston from "winston";

export const logger = winston.createLogger({
    level: 'silly',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/build.log' }),
    ],
});