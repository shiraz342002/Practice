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

  async createMessage(chatRoomId: string, senderId: string, content: string): Promise<Message> {
    const createMessageDto: CreateMessageDto = { chatRoomId, senderId, content };
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


  //This just for testing that db is taking data fine
  async create(chatRoomId:string,userId:string,content:string){
    console.log(chatRoomId);
    console.log(userId);
    console.log(content);
    
    const message={chatRoomId,userId,content}
    return this.messageModel.create(message)
  }
}
