import { PickType } from "@nestjs/swagger";
import { User } from "../../user/user.schema";

export class VerifyAccountOnlyDto extends PickType(User, [
  "email",
] as const) {}
