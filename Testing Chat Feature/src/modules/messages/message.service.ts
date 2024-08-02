import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schema/message.schema';
import { CreateMessageDto } from './dto/createMessage.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = new this.messageModel(createMessageDto);
    return message.save();
  }

  async findByChatRoomId(chatRoomId: string): Promise<Message[]> {
    return this.messageModel.find({ chatRoomId }).exec();
  }

  async findById(id: string): Promise<Message> {
    const message = await this.messageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async sendMessage(chatRoomId: string, senderId: string, content: string ): Promise<Message> {
    const createMessageDto: CreateMessageDto = {
      chatRoomId,
      senderId,
      content,
    };
    return this.create(createMessageDto);
  }
}