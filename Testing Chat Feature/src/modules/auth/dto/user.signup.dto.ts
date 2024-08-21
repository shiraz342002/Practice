import { PickType } from "@nestjs/swagger";
import { User } from "../../user/schema/user.schema";

export class UserSignupDto extends PickType(User, [
  "name",
  "email",
  "password",
  "city",
  
] as const) {}
