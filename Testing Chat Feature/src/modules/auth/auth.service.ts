import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { validateHash } from "../../common/utils";
import { TokenType } from "../../constants";
import { ErrorCodesMeta, ResponseCode } from "../../exceptions";
import type { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { TokenPayloadDto } from "./dto/TokenPayloadDto";
import { UserLoginDto } from "./dto/user.login.dto";
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async createAccessToken(user: User): Promise<TokenPayloadDto> {
    user.password = "";
    return new TokenPayloadDto({
      user: user,
      accessToken: await this.jwtService.signAsync({
        userId: user.id,
        role: user.role,
        type: TokenType.ACCESS_TOKEN,
        user,
      }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const user: User = <User>await this.userService.findByEmail(userLoginDto);
    if (!user) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL.message,
        ResponseCode.NOT_FOUND
      );
    }
    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password
    );
    if (!isPasswordValid) {
      throw new HttpException(
        ErrorCodesMeta.YOUR_PASSWORD_IS_INCORRECT.message,
        ResponseCode.UNAUTHORIZED
      );
    }

    return user;
  }
}
