"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowedCountries = void 0;
// src/auth/countries.decorator.ts
const common_1 = require("@nestjs/common");
const AllowedCountries = (...countries) => (0, common_1.SetMetadata)('allowedCountries', countries);
exports.AllowedCountries = AllowedCountries;
