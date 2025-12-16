import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuiteamDto } from './dto/create-menu-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('menu')
export class MenuController {
  constructor(private service: MenuService) {}

  // ADMIN ONLY: Create menu item
  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateMenuiteamDto) {
    return this.service.create(dto);
  }

  // PUBLIC: Get all menu items for a restaurant
  @Get('restaurant/:id')
  getByRestaurant(@Param('id') id: string) {
    return this.service.findByRestaurant(id);
  }
  //  @Get('restaurant/:id')
  // getMenuForRestaurant(@Param('id') id: string) {
  //   return this.service.getRestaurantMenu(id);
  // }

  // ADMIN ONLY: Update menu item
  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: number, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  // ADMIN ONLY: Delete menu item
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Post('manager')
  @Roles('manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  createForManager(@Req() req:any, @Body() dto:any) {
  return this.service.createForManager(req.user.id, dto);
}
}
