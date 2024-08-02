import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslService } from './casl.service';
import { Permission, PermissionSchema } from './permission.schema';
import { Role, RoleSchema } from './role.schema';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [CaslAbilityFactory, CaslService],
  exports: [CaslAbilityFactory, CaslService],
})
export class CaslModule {}
