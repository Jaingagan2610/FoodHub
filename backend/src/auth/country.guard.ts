import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CountryGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredCountries = this.reflector.get<string[]>('allowedCountries', ctx.getHandler());
    if (!requiredCountries) return true; // no restriction

    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user?.country) throw new ForbiddenException('User country not set');

    if (requiredCountries.includes(user.country)) return true;

    throw new ForbiddenException('Access denied for your country');
  }
}
