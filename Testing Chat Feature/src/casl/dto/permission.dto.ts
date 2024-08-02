import { PartialType } from '@nestjs/swagger';
import { Permission } from '../permission.schema';

export class PermissionDto extends PartialType(Permission) {}
