import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import axios from 'axios';
import { WebsocketGateway } from './app.gateway';

@Injectable()
export class RedisService implements OnModuleInit {
  private subscriber: Redis;

  constructor(private websocketGateway: WebsocketGateway) {
    this.subscriber = new Redis(process.env.REDIS_EP);
  }

  async onModuleInit() {
    await this.initRedisSubscribe();
  }

  private async initRedisSubscribe() {
    console.log('Subscribed to logs....');
    this.subscriber.psubscribe('logs:*');
    this.subscriber.on('pmessage', (pattern, channel, message) => {
      console.log('REDIS:', message);
      const elasticsearchURL = process.env.ELASTIC_SEARCH_HOST;
      const indexName = 'nodejs-app';
      const typeName = '_doc';

      axios.post(`${elasticsearchURL}/${indexName}/${typeName}`, {
        timestamp: new Date().toISOString(),
        level: 'info',
        message,
      });
      this.websocketGateway.sendMessage(channel, message);
    });
  }
}
