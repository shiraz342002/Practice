import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatRoomService } from './chatRoom.service';
import { CreateChatRoomDto } from './dto/createChatRoom';
import { ChatRoom } from './schema/chatRoom.schema';

@ApiTags('chat-room')
@Controller('chat-room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post()
  @ApiOperation({ summary: 'Create a chat room' })
  @ApiResponse({ status: 201, description: 'The chat room has been successfully created.', type: ChatRoom })
  async create(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatRoomService.create(createChatRoomDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get chat room by ID' })
  @ApiResponse({ status: 200, description: 'Chat room details.', type: ChatRoom })
  async findById(@Param('id') id: string) {
    return this.chatRoomService.findById(id);
  }
}
