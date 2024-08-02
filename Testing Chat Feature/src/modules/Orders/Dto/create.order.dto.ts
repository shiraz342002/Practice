import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the service provider who is handling the order',
    example: '60d21b4667d0d8992e610c85', 
  })
  readonly serviceProviderId: Types.ObjectId;

  @ApiProperty({
    description: 'The ID of the client who is placing the order',
    example: '60d21b4667d0d8992e610c85', 
  })
  readonly clientId: Types.ObjectId;

  @ApiProperty({
    description: 'The status of the task for this order',
    example: false, 
    type: Boolean,
  })
  readonly taskStatus?: boolean; 
}
