import { PickType } from "@nestjs/swagger";
import { User } from "../../user/user.schema";

export class ResetPasswordDto extends PickType(User, [
  "otp",
  "email",
  "password",
] as const) {}
