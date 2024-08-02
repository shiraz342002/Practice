import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";
import { AppConfig } from "./../../configuration/app.config";
// import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: AppConfig.authConfig.publicKey,
        signOptions: {
          // expiresIn: AppConfig.authConfig.jwtExpirationTime,
        },
      }),
    }),
    // HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
