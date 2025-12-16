import { Controller, Post, Body, Get, UseGuards, Req, Put, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  // USER: Create order
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req:any, @Body() dto:CreateOrderDto) {
    return this.service.create(req.user.id, dto);
  }

  // USER: Get own orders
  @Get('my')
  @UseGuards(JwtAuthGuard)
  myOrders(@Req() req:any) {
    return this.service.findMyOrders(req.user.id);
  }

  // ADMIN: Get all orders
  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAll() {
    return this.service.findAll();
  }

  @Put(':id/status')
@Roles('admin','manager')
@UseGuards(JwtAuthGuard, RolesGuard)
updateStatus(
  @Param('id') id: string,
  @Body() dto: UpdateStatusDto
) {
  return this.service.updateStatus(id, dto.status);
}

@Get('manager')
@Roles('manager')
@UseGuards(JwtAuthGuard, RolesGuard)
getManagerOrders(@Req() req:any) {
  return this.service.findForManager(req.user.id);
}
}
