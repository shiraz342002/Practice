import { PartialType, PickType } from "@nestjs/swagger";
import { PostEntity } from "../schema/post.schema";

export class UpdatePostDto extends PartialType(PickType(PostEntity, [
  'title',
  'description',
  'images',
  'city',
  'streetAddress',
  'state',
  'zipCode',
  'location',
  'isUrgent',
  'isHelpFree',
  'obo',
  'price'
] as const)) { }
