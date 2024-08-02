import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './../modules/user/user.service';
import { ResponseCode, ErrorCodesMeta } from '../exceptions';

@Injectable()
export class UserSignUpMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { email, userName, refCode } = req.body;
    const userWithEmail = await this.userService.findOne({
      email: email.toLowerCase(),
    });
    const userWithUserName = await this.userService.findOne({
      userName: userName,
    });
    if (refCode) {
      const userWithRefCode = await this.userService.findOne({
        refCode,
      });
      if (!userWithRefCode) {
        throw new HttpException(
          ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_REF_CODE.message,
          ResponseCode.NOT_FOUND,
        );
      }
    }

    if (userWithEmail) {
      throw new HttpException(
        ErrorCodesMeta.USER_ALREADY_EXISTS.message,
        ResponseCode.ALREADY_EXIST,
      );
    } else if (userWithUserName) {
      throw new HttpException(
        ErrorCodesMeta.USER_ALREADY_EXISTS_WITH_USERNAME.message,
        ResponseCode.ALREADY_EXIST,
      );
    } else {
      next();
    }
  }
}
