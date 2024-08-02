import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
 
  @IsString()
  @IsNotEmpty()
  chatRoomId: string;

 @IsString()

  @IsString()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty({
    description: 'Content of the message',
    example: 'Hello, how are you?',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
