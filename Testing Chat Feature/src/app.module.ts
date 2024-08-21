import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CaslModule } from "./casl/casl.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { ConfigurationService } from "./configuration/configuration.service";
import { LoggerModule } from "./logger/logger.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MailModule } from "./modules/mail/mail.module";
import { AppConfig } from "./configuration/app.config";
import { PostsModule } from "./modules/posts/posts.module";
import { CommentsModule } from "./modules/comments/comments.module";
import { MessagesModule } from './modules/messages/messages.module';
import { ChatRoomModule } from './modules/chat-room/chat-room.module';
import { ReviewsModule } from "./modules/Reviews/review.module";
@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MailModule,
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      transport: {
        // host: 'smtp.example.com',
        host: AppConfig.sendGridConfig.host,
        secure: AppConfig.sendGridConfig.secure,
        // port: AppConfig.sendGridConfig.port,
        auth: {
          user: AppConfig.sendGridConfig.user,
          pass: AppConfig.sendGridConfig.password,
        },
      },
      defaults: {
        from: AppConfig.sendGridConfig.email,
      },
      template: {
        dir: join(__dirname, "../src/views"),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) =>
        configService.mongooseConfig,
      inject: [ConfigurationService],
    }),
    LoggerModule,
    AuthModule,
    CaslModule,
    PostsModule,
    CommentsModule,
    MessagesModule,
    ChatRoomModule,
    ReviewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule],
})
export class AppModule {}
