import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { LoggerService } from "../../logger/logger.service";
import { MailService } from "../mail/mail.service";
import { PostsModule } from "../posts/posts.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => PostsModule),
  ],
  controllers: [UserController],
  providers: [UserService, LoggerService, MailService],
  exports: [UserService],
})
export class UserModule { }
