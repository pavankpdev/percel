import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WebsocketGateway } from './app.gateway';
import { RedisService } from './redis.service';
import { WinstonModule } from 'nest-winston';
import { Logger, transports } from 'winston';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      transports: [new transports.File({ filename: 'logs/logs.log' })],
    }),
  ],
  providers: [AppService, WebsocketGateway, RedisService, Logger],
})
export class AppModule {}
