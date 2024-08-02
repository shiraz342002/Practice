import { ApiProperty, PartialType } from "@nestjs/swagger";
import { JSONSchema } from "class-validator-jsonschema";
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Prop } from "@nestjs/mongoose";
import { UserUpdateDto } from "src/modules/auth/dto/user.update.dto";

export class UpdateUserDto extends PartialType(UserUpdateDto) {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(40)
  @ApiProperty()
  @JSONSchema({
    description: "Name of User",
    title: "Name",
  })
  @Prop({ type: "string", trim: true, required: false })
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
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
  @IsOptional()
  @MinLength(6)
  @ApiProperty()
  @JSONSchema({
    description: "Password of User",
    title: "Password",
  })
  @Prop({ type: "string", trim: true, required: false, default: "" })
  password: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @ApiProperty()
  @JSONSchema({
    description: "Information about User",
    title: "About",
  })
  @Prop({ type: "string", default: "" })
  about: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty()
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
    description: "Phone",
    title: "Phone",
  })
  @Prop({ type: "string", trim: true, default: "" })
  phone?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty()
  @JSONSchema({
    description: "Address of the User",
    title: "Address",
  })
  @Prop({ type: "string", trim: true, required: false })
  address?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @ApiProperty()
  @JSONSchema({
    description: "Profession of the User",
    title: "Profession",
  })
  @Prop({ type: "string", trim: true, required: false })
  profession?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Zip Code",
    title: "Zip Code",
  })
  @Prop({ type: "string", trim: true, required: false, default: "" })
  zip_code?: number;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @ApiProperty()
  @JSONSchema({
    description: "City of the User",
    title: "City",
  })
  @Prop({ type: "string", trim: true, required: false, default: "" })
  city?: string;
}
