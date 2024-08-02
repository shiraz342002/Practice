import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ChatRoomDocument = ChatRoom & Document;

@Schema({ timestamps: true })
export class ChatRoom {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, enum: ['one-to-one', 'group'], default: 'one-to-one' })
  type: string;

  @ApiProperty({ type: [String], description: 'List of user IDs participating in the chat room' })
  @Prop({ type: [String], required: true })
  participants: string[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
