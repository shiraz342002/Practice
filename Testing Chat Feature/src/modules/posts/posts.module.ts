import { forwardRef, Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";
import { PostEntity, PostSchema } from "./schema/post.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostEntity.name, schema: PostSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule { }
