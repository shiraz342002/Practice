import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { Chat, ChatSchema } from './schemas/chat.schemas';
import { UsersModule } from '../users/users.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    UsersModule, 
  ],
  providers: [
    ChatGateway,
    ChatsService,
  ],
  exports: [
    ChatsService,
  ],
})
export class ChatsModule {}
