import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './src/modules/messages/message.service';
import { CreateMessageDto } from './src/modules/messages/dto/createMessage.dto';
import { Auth, AuthUser } from 'src/decorators';
import { User } from 'src/modules/user/schema/user.schema';
import { Action } from 'src/casl/userRoles';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust this for your needs
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessagesService) {}

  private server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  @Auth(Action.Create, "Post")
  async handleMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
    @AuthUser() user: User,
  ) {
    try {
      const message = await this.messageService.createMessage(createMessageDto.chatRoomId, user.id, createMessageDto.content);
      this.server.to(createMessageDto.chatRoomId).emit('new_message', message);
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(@MessageBody() chatRoomId: string, @ConnectedSocket() client: Socket) {
    client.join(chatRoomId);
  }

  @SubscribeMessage('leave_room')
  handleLeaveRoom(@MessageBody() chatRoomId: string, @ConnectedSocket() client: Socket) {
    client.leave(chatRoomId);
  }
}
