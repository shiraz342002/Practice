import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'This is a comment.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
