import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UserReportDetailsDto {
  @ApiProperty()
  @IsOptional()
  submitted: {
    name: string;
    email: string;
  };

  @ApiProperty()
  reported: {
    name: string;
    email: string;
  };
}
export class ContactUsDto {
  @ApiProperty()
  body: string;
}
