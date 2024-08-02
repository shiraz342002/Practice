import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { RoleType, TokenType } from "../../constants";

import { UserService } from "../user/user.service";
import { AppConfig } from "./../../configuration/app.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AppConfig.authConfig.publicKey,
    });
  }

  async validate(args: { userId: string; role: RoleType; type: TokenType }) {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }
   

    const user = await this.userService.findOne({
      _id: args.userId,
      role: args.role,
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
