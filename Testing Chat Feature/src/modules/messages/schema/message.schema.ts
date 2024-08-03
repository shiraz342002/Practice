import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
 
  @Prop({ type: String, required: true, ref: 'ChatRoom' })
  chatRoomId: string;

  @Prop({ type: String, required: true })
  senderId: string;

  @ApiProperty({ example: 'Hello, how are you?', description: 'Content of the message' })
  @Prop({ type: String, required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
