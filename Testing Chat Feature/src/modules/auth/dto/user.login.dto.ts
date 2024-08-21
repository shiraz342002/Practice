import { PickType } from "@nestjs/swagger";
import { User } from "../../user/schema/user.schema";

export class UserLoginDto extends PickType(User, [
  "email",
  "password",
] as const) {}
