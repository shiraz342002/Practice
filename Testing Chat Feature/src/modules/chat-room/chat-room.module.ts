import { Module } from '@nestjs/common';
import { ChatRoomService } from './chatRoom.service';
import { ChatRoomController } from './chatRoom.controller';
import { ChatRoomSchema } from './schema/chatRoom.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from '../../../chat.gateway'; // Adjust the path if needed
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ChatRoom', schema: ChatRoomSchema }])
 , MessagesModule]
 ,
  providers: [ChatRoomService, ChatGateway],
  controllers: [ChatRoomController],
})
export class ChatRoomModule {}
