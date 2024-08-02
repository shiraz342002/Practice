import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { generateHash, getCharacterString } from "../../common/utils";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import {
  ErrorCodesMeta,
  ResponseCode,
  ResponseMessage,
} from "../../exceptions";
import type { Optional } from "../../types";
import { ResetPasswordDto } from "../auth/dto/reset-password.dto";
import { VerifyOtpDto } from "../auth/dto/verify-otp.dto";
import { MailService } from "../mail/mail.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument, userJsonSchema } from "./user.schema";
import { ForgotPasswordDto } from "../auth/dto/forgot-password.dto";
import { VerifyAccountDto } from "../auth/dto/verify-account.dto";
import { UserSignupDto } from "../auth/dto/user.signup.dto";
import { VerifyAccountOnlyDto } from "../auth/dto/verify-account-only.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private sendMail: MailService
  ) {}
  /**
   * get user schema
   * @returns
   */
  async sendForgetPassword(ForgetPasswordDto: ForgotPasswordDto) {
    const getFourDigitRandomNumber = this.generateString(4);
    const sendOTP = await this.userModel.findOneAndUpdate(
      { email: ForgetPasswordDto.email },
      {
        $set: {
          otp: (await getFourDigitRandomNumber).toString(),
          isOtpUsed: false,
        },
      }
    );
    if (!sendOTP) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
        ResponseCode.UNAUTHORIZED
      );
    }
    const user = {
      email: ForgetPasswordDto.email,
      otp: (await getFourDigitRandomNumber).toString(),
    };
    await this.sendMail.sendForgetPasswordEmail(user);
    return {
      message: ResponseMessage.SUCCESS,
      successCode: ResponseCode.SUCCESS,
    };
  }

  /**
   * get user schema
   * @returns
   */
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const otp = await this.userModel.findOneAndUpdate(
      { otp: verifyOtpDto.otp, isOtpUsed: false },
      {
        $set: {
          isOtpUsed: true,
        },
      }
    );
    if (!otp) {
      throw new HttpException(
        ErrorCodesMeta.INVALID_OTP,
        ResponseCode.UNAUTHORIZED
      );
    }

    return {
      email: otp.email,
    };
  }

  async logout(userId: string): Promise<any> {
    return await this.userModel
      .findByIdAndUpdate(userId, { tokens: [] })
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }

  /**
   * get user schema
   * @returns
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    resetPasswordDto.password = generateHash(resetPasswordDto.password);
    const data = await this.userModel.findOneAndUpdate(
      {
        email: resetPasswordDto.email,
        isOtpUsed: true,
        otp: resetPasswordDto.otp,
      },
      {
        $set: {
          password: resetPasswordDto.password,
          isOtpUsed: false,
        },
      }
    );
    if (!data) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
        ResponseCode.UNAUTHORIZED
      );
    }
    data.password = "";
    data.otp = "";
    return {
      data,
    };
  }
  /**
   * get user schema
   * @returns
   */
  async getSchema() {
    return await userJsonSchema.Category;
  }

  /**
   * verify the account
   * @param email
   * @returns
   */
  async verifyAccount(dto: VerifyAccountDto): Promise<any> {
    const accExist = await this.findOne({
      email: dto.email,
      otp: dto.otp,
    });
    console.log(accExist);
    
    if (!accExist) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
        ResponseCode.UNAUTHORIZED
      );
    }
    const data = await this.userModel.updateOne(
      { email: dto.email, otp: dto.otp },
      {
        $set: {
          verify: "true",
          isOtpUsed: false,
        },
      }
    );

    if (data) {
      return accExist;
    }
  }
  /**
   * Get User
   * @param pageOptionsDto
   * @returns
   */

  async getOne(id: string): Promise<User> {
    const data = await this.userModel.findById({ _id: id }).catch((err) => {
      throw new HttpException(err.message, ResponseCode.NOT_FOUND);
    });

    (data.password = ""), (data.otp = "");
    return data;
  }

  /**
   * Find single user
   *
   *
   */
  async findOne(findData: any): Promise<User | null> {
    const user = await this.userModel.findOne(findData).catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
    return user;
  }
  /**
   * Find single user by email
   *
   *
   */
  async findByEmail(
    options: Partial<{ email: string }>
  ): Promise<Optional<User>> {
    const user = await this.userModel
      .findOne({ email: options.email })
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return user;
  }

  async generateString(length) {
    let result = "";
    const characters = getCharacterString();
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  /**
   * create single user
   *
   *S
   */
  async createUser(userRegisterDto: UserSignupDto): Promise<UserSignupDto> {
    const createdUser = await new this.userModel(userRegisterDto).save().catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST); });     
    if (createdUser) {
      const getFourDigitRandomNumber = this.generateString(4);
      await this.userModel.findOneAndUpdate(
        { email: userRegisterDto.email },
        {
          $set: {
            otp: (await getFourDigitRandomNumber).toString(),
            isOtpUsed: false,
          }
        }
      );
      
      return createdUser;
    }}
  /**
   * resend OTP
   *
   *
   */

  async resendOTP(dto: VerifyAccountOnlyDto): Promise<any> {
    const accExist = await this.findOne({
      email: dto.email,
    });
    if (!accExist) {
      throw new HttpException(
        ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL,
        ResponseCode.UNAUTHORIZED
      );
    }

    const getFourDigitRandomNumber = this.generateString(4);
    const data = await this.userModel
      .findOneAndUpdate(
        { email: dto.email },
        {
          $set: {
            otp: (await getFourDigitRandomNumber).toString(),
            isOtpUsed: false,
          },
        }
      )
      .exec();

    if (data) {
      return { message: "OTP resend successfully" };
    }
  }

  /**
   * Find all users
   *
   *
   */
  async getUsers(pageOptionsDto: PageOptionsDto): Promise<User[]> {
    //let regex = new RegExp(value.searchQuery,'i');
    //{ $and: [ { $or: [{title: regex },{description: regex}] }, {category: value.category}, {city:value.city} ] }
    const queryBuilder = await this.userModel
      .aggregate([
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [
              { $sort: { [pageOptionsDto.column]: pageOptionsDto.order } },
              { $skip: pageOptionsDto.skip },
              { $limit: pageOptionsDto.take },
            ],
          },
        },
        {
          $project: {
            data: 1,
            // Get total from the first element of the metadata array
            total: { $arrayElemAt: ["$metadata.total", 0] },
          },
        },
      ])
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return queryBuilder;
  }

  /**
   * update single user
   *
   *
   */
  async update(userId: string, userUpdateDto: UpdateUserDto) {
    if (userUpdateDto.password) {
      userUpdateDto.password = generateHash(userUpdateDto.password);
    }
    const returnObj = await this.userModel
      .findByIdAndUpdate(userId, userUpdateDto, { new: true })
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return { data: returnObj };
  }

  async getProfileData(userId: string) {
    const data = await this.userModel
      .findById(userId)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    data.password = "";
    return data;
  }

  async delete(userId: string) {
    return await this.userModel
      .findByIdAndDelete(userId)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }
  async viewProfile(userId:string){
    const fieldsToSelect = 'name avatar address email phone about';
    const data = await this.userModel.findById(userId).select(fieldsToSelect).exec().catch((err)=>{
      throw new HttpException(err.message,ResponseCode.NOT_FOUND);
    })
    return data
  }

  async viewOtherProfile(userId:string){    
    const fieldsToSelect = 'avatar name profession ratings createdAt task_completed city zip_code about';
    const data = await this.userModel.findById(userId).select(fieldsToSelect).exec().catch((err)=>{
      throw new HttpException(err.message,ResponseCode.NOT_FOUND);
    })
    return data
  }

  async findCustomData(userId:string,custom_fields){
    const data = await this.userModel.findById(userId).select(custom_fields).exec().catch((err)=>{
      throw new HttpException(err.message,ResponseCode.NOT_FOUND);
    })
    return data
  }


}


