import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import {
  JSONSchema,
  validationMetadatasToSchemas,
} from "class-validator-jsonschema";
import { Document } from "mongoose";
import { generateHash } from "../../common/utils";
import { RoleType } from "../../constants/role-type";
export type UserDocument = User & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @ApiProperty()
  @JSONSchema({
    description: "Name of User",
    title: "Name",
  })
  @Prop({ type: "string", trim: true, required: true})
  name: string;

  @ApiProperty()
  @IsEmail()
  @JSONSchema({
    description: "Email of User",
    title: "Email",
  })
  @Prop({
    type: "string",
    required: false,
    trim: true,
    lowercase: true,
    default: "",
  })
  email: string;

  @IsString()
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @JSONSchema({
    description: "Password of User",
    title: "Password",
  })
  @Prop({ type: "string", trim: true, required: false, default: "" })
  password: string;

 

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @JSONSchema({
    description: "Information about User",
    title: "About",
  })
  @Prop({ type: "string", default: "" })
  about: string;

  @ApiProperty()
  @JSONSchema({
    description: "User email verification",
    title: "Email Verify",
  })
  @Prop({ type: "boolean", default: false })
  verify: boolean;

  @IsEnum(RoleType)
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Role of User",
    title: "Role",
  })
  @Prop({ type: "string", required: false, trim: true, default: RoleType.USER })
  role: string;

  @ApiProperty()
  @Prop({ type: "string", trim: true, default: "" })
  otp: string;

  @ApiProperty()
  @Prop({ type: "Boolean", default: false })
  isOtpUsed: boolean;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: "Avatar of User",
    title: "Avatar",
    type: 'string',
    format: 'binary',
    required: true,})
  @JSONSchema({
    description: "Avatar of User",
    title: "Avatar",
  })
  @Prop({ type: "string", trim: true, default: "" })
  avatar: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @JSONSchema({
    description: "phone",
    title: "phone",
  })
  @Prop({ type: "string", trim: true, default: "" })
  phone?: string;


  @IsString()
  @ApiProperty()
  @MinLength(3)
  @JSONSchema({
    description:"Address of the User",
    title:"Address"
  })
  @Prop({type:"string",trim:true,required:false})
  address?:string;

  @IsString()
  @ApiProperty()
  @MinLength(2)
  @JSONSchema({
    description:"Profession of the User",
    title:"Profession"
  })
  @Prop({type:"string",trim:true,required:false})
  profession?:string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @ApiHideProperty()
  @JSONSchema({
    description:"Completed Task of the User",
    title:"Completed Task"
  })
  @Prop({type:"string",trim:true,required:false,default:0})
  task_completed?:number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @ApiHideProperty()
  @JSONSchema({
    description:"Completed Order of the User",
    title:"Completed Order"
  })
  @Prop({type:"string",trim:true,required:false,default:0})
  my_orders?:number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @MinLength(0)
  @MaxLength(5)
  @ApiHideProperty()
  @JSONSchema({
    
    description:"Rating of the User",
    title:"Rating"
  })
  @Prop({type:"string",trim:true,required:false,default:0})
  ratings?:number;

  @IsString()
  @ApiProperty()
  @JSONSchema({
    description:"Zip Code",
    title:"Zip Code"
  })
  @Prop({type:"string",trim:true,required:false,default:""})
  zip_code?:number;

  @IsString()
  @ApiProperty()
  @MinLength(2)
  @JSONSchema({
    description:"City of the User",
    title:"City"
  })
  @Prop({type:"string",trim:true,required:false,default:""})
  city?:string;
}



const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ userName: "text" });
// Hooks
UserSchema.pre<UserDocument>("save", async function (next) {
  this.password = generateHash(this.password);
  this.email = this.email.toLowerCase();
  next();
});

UserSchema.virtual("id").get(function (this: UserDocument) {
  return this._id.toString();
});
export { UserSchema };
export const userJsonSchema = validationMetadatasToSchemas();
