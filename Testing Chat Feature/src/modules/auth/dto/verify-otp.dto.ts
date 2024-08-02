import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/user.schema';

export class VerifyOtpDto extends PickType(User, ['otp'] as const) {
  @IsNotEmpty()
  otp: string;
}
