import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom, ChatRoomDocument } from './schema/chatRoom.schema';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(ChatRoom.name) private readonly chatRoomModel: Model<ChatRoomDocument>,
  ) {}

  async create(userId: string, recipientId: string): Promise<ChatRoom> {
    const participants = [userId, recipientId];
    const chatRoom = new this.chatRoomModel({ participants });
    return chatRoom.save();
  }

  async findById(id: string): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomModel.findById(id).exec();
    if (!chatRoom) {
      throw new NotFoundException(`ChatRoom with ID ${id} not found`);
    }
    return chatRoom;
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomModel.find().exec();
  }
}
