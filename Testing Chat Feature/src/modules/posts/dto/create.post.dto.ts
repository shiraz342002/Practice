import { PickType } from '@nestjs/swagger';
import { PostEntity } from '../schema/post.schema';

export class CreatePostDto extends PickType(PostEntity, [
  'streetAddress',
  'city',
  'zipCode',
  'state',
  'images',
  'userId',
  "title"
] as const) {}
