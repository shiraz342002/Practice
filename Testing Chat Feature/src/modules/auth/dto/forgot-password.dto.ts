import { PickType } from "@nestjs/swagger";
import { User } from "../../user/user.schema";
import { IsNotEmpty } from "class-validator";

export class ForgotPasswordDto extends PickType(User, ["email"] as const) {
  @IsNotEmpty()
  email: string;
}
