import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllUsers() {
   return this.usersService.findAll();
  }

//   @Get('profile')
//   @UseGuards(JwtAuthGuard)
//   getProfile(@Req() req:any) {
//   return req.user;
// }
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@Req() req: any) {
  return this.usersService.getProfile(req.user.id);
}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.usersService.register(dto);
  }
  
}
