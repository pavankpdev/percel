// src/websockets/websocket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(9002, { cors: true, path: '/' })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    const channel = data;
    client.join(channel);
    client.emit('message', `Joined ${channel}`);
  }

  sendMessage(channel: string, message: string): void {
    this.server.to(channel).emit('message', message);
  }
}
