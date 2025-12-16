import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private service: RestaurantsService) {}

  // PUBLIC: Get all restaurants
  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
getOne(@Param('id') id: string) {
  return this.service.findOne(id);
}
 

  // ADMIN: Create restaurant
  @Post()
  @Roles('admin','manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateRestaurantDto) {
    return this.service.create(dto);
  }

  // ADMIN: Update restaurant
  @Put(':id')
  @Roles('admin','manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: number, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  // ADMIN: Delete restaurant
  @Delete(':id')
  @Roles('admin','manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Post('manager')
  @Roles('manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  createRestaurantForManager(@Req() req:any, @Body() dto:any) {
  return this.service.createForManager(req.user.id, dto);
  }

  @Put('manager/:id')
  @Roles('manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateManagerRestaurant(@Req() req:any, @Param('id') id: string, @Body() dto:any) {
  return this.service.updateManagerRestaurant(req.user.id, id, dto);
  }


}
