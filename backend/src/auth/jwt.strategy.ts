import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MY_SUPER_SECRET', // move to .env later
    });
  }

  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => {
//           // 🔥 FIRST: Authorization header
//           if (req.headers.authorization) {
//             return req.headers.authorization.replace('Bearer ', '');
//           }

//           // 🔥 SECOND: Cookie fallback
//           return req.cookies?.token;
//         },
//       ]),
//       secretOrKey: process.env.JWT_SECRET || 'secret123',
//     });
//   }

//   async validate(payload: any) {
//     console.log("JWT PAYLOAD:", payload);
//     return {
//       id: payload.sub,
//       email: payload.email,
//       role: payload.role,
//     };
//   }
// }
