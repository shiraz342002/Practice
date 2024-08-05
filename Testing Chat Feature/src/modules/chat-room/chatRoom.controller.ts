import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatRoomService } from './chatRoom.service';
import { ChatRoom } from './schema/chatRoom.schema';
import { constTexts } from 'src/constants';
import { Auth, AuthUser } from 'src/decorators';
import { User } from '../user/user.schema';
import { Action } from 'src/casl/userRoles';

@ApiTags('chat-room')
@Controller('chat-room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post(constTexts.chatRoute.create)
  @ApiOperation({ summary: 'Create a chat room' })
  @Auth(Action.Create, "Post")
  @ApiResponse({ status: 201, description: 'The chat room has been successfully created.', type: ChatRoom })
  async create(@Param('id')id:string,
  @AuthUser() user: User   

) {
    return this.chatRoomService.create(user.id,id);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get chat room by ID' })
  @ApiResponse({ status: 200, description: 'Chat room details.', type: ChatRoom })
  async findById(@Param('id') id: string) {
    return this.chatRoomService.findById(id);
  }
}
