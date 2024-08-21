import { PickType } from "@nestjs/swagger";
import { User } from "../../user/schema/user.schema";

export class VerifyAccountDto extends PickType(User, [
  "otp",
  "email",
] as const) {}
