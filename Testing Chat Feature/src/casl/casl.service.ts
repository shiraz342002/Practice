import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseCode } from '../exceptions';
import { PermissionDto } from './dto/permission.dto';
import { Permission, PermissionDocument } from './permission.schema';
import { Role, RoleDocument } from './role.schema';
@Injectable()
export class CaslService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async findAllPermissionsOfUser(role: any): Promise<Role | null> {
    const userRole = await this.roleModel.findOne(role).catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
    return userRole;
  }
  async createPermissionOfUser(
    permission: PermissionDto,
  ): Promise<Permission | null> {
    const createdPermission: Permission = await new this.permissionModel(
      permission,
    )
      .save()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
    return createdPermission;
  }
  async createRoleOfUser(role: any): Promise<Role | null> {
    const userRole = await this.roleModel.findOne(role).catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
    return userRole;
  }
}
