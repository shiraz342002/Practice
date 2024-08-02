import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagesService } from './message.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from './schema/message.schema';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully.', type: Message })
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get(':chatRoomId')
  @ApiOperation({ summary: 'Get messages by chat room ID' })
  @ApiResponse({ status: 200, description: 'List of messages in the chat room.', type: [Message] })
  async findByChatRoomId(@Param('chatRoomId') chatRoomId: string) {
    return this.messagesService.findByChatRoomId(chatRoomId);
  }
}
