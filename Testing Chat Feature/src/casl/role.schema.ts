import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Document } from 'mongoose';
import { RoleType } from '../constants/role-type';
import { Permission } from './permission.schema';
export type RoleDocument = Role & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Role {
  id: string;

  @IsEnum(RoleType)
  @ApiProperty()
  @Prop({ enum: RoleType, default: RoleType.USER })
  role: string;

  @ApiProperty()
  permissions: [Permission];
}

const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.virtual('id').get(function (this: RoleDocument) {
  return this._id.toString();
});
export { RoleSchema };
export const permissionJsonSchema = validationMetadatasToSchemas();
