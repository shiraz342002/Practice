import { PickType } from "@nestjs/swagger";
import { User } from "../../user/schema/user.schema";

export class UserUpdateDto extends PickType(User, [
  "name",
  "email",
  "password",
  "city",
  "address",
  "zip_code",
  "phone",
  "avatar",
  "about",
  "profession",
,
] as const) {}
