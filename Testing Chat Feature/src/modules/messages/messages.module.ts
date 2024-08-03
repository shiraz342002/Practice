import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';
import { MessagesService } from './message.service';
import { MessagesController } from './message.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
  providers: [MessagesService],
  controllers:[MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
