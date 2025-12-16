// src/auth/countries.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const AllowedCountries = (...countries: string[]) => SetMetadata('allowedCountries', countries);
