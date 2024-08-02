import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";

@Module({
  providers: [MailService],
  controllers: [],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
