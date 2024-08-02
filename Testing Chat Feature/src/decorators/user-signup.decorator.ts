import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from "@nestjs/common";
import { UserService } from "./../modules/user/user.service";
import { ErrorCodesMeta, ResponseCode } from "./../exceptions/index";

@Injectable()
export class IsUserUnique implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { email, phone } = req.body;
    let userWithEmail;
    let userWithPhone;
    if (email)
      userWithEmail = await this.userService.findOne({
        email: email.toLowerCase(),
      });
    if (phone) {
      userWithPhone = await this.userService.findOne({
        phone: phone.toLowerCase(),
      });
    }
    if (userWithEmail) {
      throw new HttpException(
        ErrorCodesMeta.USER_ALREADY_EXISTS.message,
        ResponseCode.ALREADY_EXIST
      );
    } else if (userWithPhone) {
      throw new HttpException(
        ErrorCodesMeta.USER_ALREADY_EXISTS_PHONE.message,
        ResponseCode.ALREADY_EXIST
      );
    } else {
      return true;
    }
  }
}
