import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  // UseInterceptors,
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
// import { ApiConsumes } from "@nestjs/swagger";
import { getCharacterString } from "../../common/utils";
import { Action } from "../../casl/userRoles";
import { constTexts } from "../../constants";
import { Auth, AuthUser, Public } from "../../decorators";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { IsUserUnique } from "./../../decorators/user-signup.decorator";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user.login.dto";
import { TokenPayloadDto } from "./dto/TokenPayloadDto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ErrorCodesMeta, ResponseCode } from "src/exceptions";
import { VerifyAccountDto } from "./dto/verify-account.dto";
import { UserSignupDto } from "./dto/user.signup.dto";
import { VerifyAccountOnlyDto } from "./dto/verify-account-only.dto";

// import { FileInterceptor } from "@nestjs/platform-express";

@Controller(constTexts.authRoute.name)
@ApiTags(constTexts.authRoute.name)
export class AuthController {
  loggerService: any;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  async generateString(length) {
    let result = "";
    const characters = getCharacterString();
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  @Public()
  @Post(constTexts.authRoute.verifyAccount)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: "any",
    description: "Email Account verify",
  })
  async verifyToken(@Body() dto: VerifyAccountDto): Promise<any> {
    const data = await this.userService.verifyAccount(dto);
    console.log(data);

    if (data) {
      const token: TokenPayloadDto =
        await this.authService.createAccessToken(data);
      return token;
    }
  }

  @Public()
  @Post(constTexts.authRoute.login)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokenPayloadDto,
    description: "User info with access token",
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto
  ): Promise<TokenPayloadDto> {
    const userEntity: User = await this.authService.validateUser(userLoginDto);
    if (!userEntity.verify) {
      throw new HttpException(
        ErrorCodesMeta.USER_EMAIL_NOT_VERIFIED,
        ResponseCode.UNAUTHORIZED
      );
    } else {
      const token: TokenPayloadDto =
        await this.authService.createAccessToken(userEntity);
      return token;
    }
  }

  @Public()
  @Post(constTexts.authRoute.signUp)
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: User, description: "Successfully Registered" })
  @UseGuards(IsUserUnique)
  async userRegister(
    @Body() userRegisterDto: UserSignupDto
  ): Promise<UserSignupDto> {
    const user = await this.userService.createUser(userRegisterDto);
    
    return user;
  }

  @Post(constTexts.authRoute.forgetPassword)
  @HttpCode(HttpStatus.OK)
  sendForgetPassword(
    @Body() ForgetPasswordDto: ForgotPasswordDto
  ): Promise<any> {
    return this.userService.sendForgetPassword(ForgetPasswordDto);
  }

  @Post(constTexts.authRoute.resetPassword)
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(resetPasswordDto);
  }

  @Post(constTexts.authRoute.verifyOtp)
  @HttpCode(HttpStatus.OK)
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.userService.verifyOtp(verifyOtpDto);
  }
  @Post(constTexts.authRoute.otpResend)
  @HttpCode(HttpStatus.OK)
  OtpResend(@Body() dto: VerifyAccountOnlyDto) {
    return this.userService.resendOTP(dto);
  }

  // @Version('1')
  @Get(constTexts.authRoute.me)
  @HttpCode(HttpStatus.OK)
  @Auth(Action.Read, "User")
  @ApiOkResponse({ type: User, description: "current user info" })
  getCurrentUser(@AuthUser() user: User) {
    return this.userService.getProfileData(user.id);
  }

  @Get(constTexts.authRoute.logOut)
  @HttpCode(HttpStatus.OK)
  @Auth(Action.Read, "User")
  @ApiOkResponse({ type: User, description: "current user info" })
  logOut(@AuthUser() user: User) {
    return this.userService.logout(user.id);
  }
}
