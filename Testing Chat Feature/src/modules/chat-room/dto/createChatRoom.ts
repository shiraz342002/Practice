import { IsArray, IsString } from 'class-validator';

export class CreateChatRoomDto {
  readonly type?: string;

  @IsArray()
  @IsString({ each: true })
  readonly participants: string[];
}
