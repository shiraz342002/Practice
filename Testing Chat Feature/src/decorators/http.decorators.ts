import {
  SetMetadata,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/auth.guard';

import { Action } from '../casl/userRoles';
import { AppAbility } from '../casl/casl-ability.factory';
import { CheckPolicies, PoliciesGuard } from '../guards/PoliciesGuard';
import { AuthUserInterceptor } from '../interceptors/auth-user-interceptor.service';

export function Auth(roles: Action, options: string): MethodDecorator {
  return applyDecorators(
    UseGuards(JwtAuthGuard, PoliciesGuard),
    CheckPolicies((ability: AppAbility) => ability.can(roles, options)),
    ApiBearerAuth(),
    UseInterceptors(AuthUserInterceptor),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
